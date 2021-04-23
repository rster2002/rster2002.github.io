
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let stylesheet;
    let active = 0;
    let current_rules = {};
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        if (!current_rules[name]) {
            if (!stylesheet) {
                const style = element('style');
                document.head.appendChild(style);
                stylesheet = style.sheet;
            }
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        node.style.animation = (node.style.animation || '')
            .split(', ')
            .filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        )
            .join(', ');
        if (name && !--active)
            clear_rules();
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            current_rules = {};
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.19.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const newWorker = writable({});
    const updateFound = writable(false);

    function registerServiceWorker() {
        if (window.navigator === undefined) return;
        if (navigator.serviceWorker === undefined) return;
        const { serviceWorker } = navigator;
        
        serviceWorker.register("./serviceWorker.js")
            .then(registration => {
                console.log("Success", registration);

                registration.addEventListener("updateFound", () => {
                    newWorker.set(registration.installing);
                    newWorker.get().addEventListener("statechange", () => {
                        if  (newWorker.get().state === "installed") {
                            updateFound.set(true);
                        }
                    });
                });
            })
            .catch(error => console.log("Fail", error));
    }

    function prepareStore(store) {
        store.get = () => {
            var resultValue = {};
            var unsubscribe = store.subscribe(data => {
                resultValue = data;
            });

            unsubscribe();
            return resultValue;
        };

        store.getList = () => Object.values(store.get());
        store.set = value => store.update(_ => value);
        store.arrayPush = item => {
            var items = store.get();
            items.push(item);

            store.set(items);
        };

        store.arrayRemove = item => {
            var items = store.get();
            var index = items.indexOf(item);

            items.splice(index, 1);
            store.set(items);
        };
    }

    function linkStore(store, storeLocation) {
        store.subscribe(data => {
            if (data !== undefined) {
                if (typeof data === "object") {
                    data = JSON.stringify(data);
                }

                localStorage.setItem(storeLocation, data);
            }
        });
    }

    function prepareStoreLinked(store, storeLocation, defaultData = null) {
        prepareStore(store);

        var storeData = store.get();
        if (storeData) {
            defaultData = storeData;
        }

        var localData = localStorage.getItem(storeLocation);

        if (localData) {
            if (typeof defaultData === "object") {
                store.set(JSON.parse(localData));
            } else {
                store.set(localData);
            }
        } else {
            store.set(defaultData);
        }

        linkStore(store, storeLocation);

        return store;
    }

    function writable$1(data) {
        var store = writable(data);
        prepareStore(store);

        return store;
    }

    function writableLinked(location, data) {
        location = "aut-ov-" + location;

        var store = writable(data);
        prepareStoreLinked(store, location);

        return store;
    }

    // const baseURL = "https://aut-ns-backend.rster2002.vercel.app";
    const baseURL = "http://localhost:5000";
    const ignoreCache = false;

    const stationCodes = writable$1({});
    const stationCodesSearchable = writable$1({});
    const stationLocations = writable$1({});
    const stationsFullDetails = writable$1({});

    async function preloadAssets() {
        return Promise.all([
            preloadUrl(stationCodes, "./json/stationCodes.json"),
            preloadUrl(stationCodesSearchable, "./json/stationCodesSearchable.json"),
            preloadUrl(stationLocations, "./json/stationLocations.json"),
            preloadUrl(stationsFullDetails, "./json/stationsFullDetails.json"),
        ]);
    }

    function preloadUrl(store, url) {
        return new Promise((res, rej) => {
            fetch(url).then(r => r.json())
                .then(data => {
                    store.set(data);
                    res(data);
                })
                .catch(err => rej(err));
        });
    }

    function cleanupCache() {
        var now = Date.now();
        var keys = Object.keys(localStorage);

        for (var key of keys) {
            try {
                var data = JSON.parse(localStorage.getItem(key));

                if (data.maxAge !== undefined && data.timestamp !== undefined) {
                    if (now - data.timestamp > data.maxAge) {
                        localStorage.removeItem(key);
                    }
                }
            } catch(e) {}
        }
    }

    async function serverRequest(endpoint, maxAge = 60000) {
        var now = Date.now();
        cleanupCache();

        var local = localStorage.getItem(endpoint);

        if (local !== null && !ignoreCache) {
            let localData = JSON.parse(local);

            if (now - localData.timestamp < maxAge) {
                return localData;
            }
        }

        var data = await fetch(baseURL + endpoint)
            .then(r => r.json());

        localStorage.setItem(endpoint, JSON.stringify({
            ...data,
            timestamp: now,
            maxAge,
        }));

        return data;
    }

    async function graphQLRequest(gql = "", variables = {}) {
        return await fetch(baseURL + "/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: gql,
                variables,
            }),
        })
            .then(r => r.json());
    }

    /* src\components\HeaderButton.svelte generated by Svelte v3.19.2 */
    const file = "src\\components\\HeaderButton.svelte";

    function create_fragment(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1rjhhsy");
    			add_location(span, file, 1, 4, 54);
    			attr_dev(button, "class", "headerButton svelte-1rjhhsy");
    			add_location(button, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			dispose = listen_dev(button, "click", /*onClick*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1rjhhsy")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { icon } = $$props;

    	// Functions
    	function onClick() {
    		dispatch("click");
    	}

    	const writable_props = ["icon"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeaderButton> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("HeaderButton", $$slots, []);

    	$$self.$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		icon,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [icon, onClick];
    }

    class HeaderButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { icon: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeaderButton",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[0] === undefined && !("icon" in props)) {
    			console.warn("<HeaderButton> was created without expected prop 'icon'");
    		}
    	}

    	get icon() {
    		throw new Error("<HeaderButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<HeaderButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function regexparam (str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.19.2 */

    const { Error: Error_1, Object: Object_1 } = globals;

    // (185:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(185:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (183:0) {#if componentParams}
    function create_if_block(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return {
    			props: { params: /*componentParams*/ ctx[1] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*componentParams*/ 2) switch_instance_changes.params = /*componentParams*/ ctx[1];

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(183:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(route, userData, ...conditions) {
    	// Check if we don't have userData
    	if (userData && typeof userData == "function") {
    		conditions = conditions && conditions.length ? conditions : [];
    		conditions.unshift(userData);
    		userData = undefined;
    	}

    	// Parameter route and each item of conditions must be functions
    	if (!route || typeof route != "function") {
    		throw Error("Invalid parameter route");
    	}

    	if (conditions && conditions.length) {
    		for (let i = 0; i < conditions.length; i++) {
    			if (!conditions[i] || typeof conditions[i] != "function") {
    				throw Error("Invalid parameter conditions[" + i + "]");
    			}
    		}
    	}

    	// Returns an object that contains all the functions to execute too
    	const obj = { route, userData };

    	if (conditions && conditions.length) {
    		obj.conditions = conditions;
    	}

    	// The _sveltesparouter flag is to confirm the object was created by this router
    	Object.defineProperty(obj, "_sveltesparouter", { value: true });

    	return obj;
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf("#/");

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: "/";

    	// Check if there's a querystring
    	const qsPosition = location.indexOf("?");

    	let querystring = "";

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(getLocation(), // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener("hashchange", update, false);

    	return function stop() {
    		window.removeEventListener("hashchange", update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);

    function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
    		throw Error("Invalid parameter location");
    	}

    	// Execute this code when the current call stack is complete
    	setTimeout(
    		() => {
    			window.location.hash = (location.charAt(0) == "#" ? "" : "#") + location;
    		},
    		0
    	);
    }

    function pop() {
    	// Execute this code when the current call stack is complete
    	setTimeout(
    		() => {
    			window.history.back();
    		},
    		0
    	);
    }

    function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
    		throw Error("Invalid parameter location");
    	}

    	// Execute this code when the current call stack is complete
    	setTimeout(
    		() => {
    			const dest = (location.charAt(0) == "#" ? "" : "#") + location;
    			history.replaceState(undefined, undefined, dest);

    			// The method above doesn't trigger the hashchange event, so let's do that manually
    			window.dispatchEvent(new Event("hashchange"));
    		},
    		0
    	);
    }

    function link(node) {
    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != "a") {
    		throw Error("Action \"link\" can only be used with <a> tags");
    	}

    	// Destination must start with '/'
    	const href = node.getAttribute("href");

    	if (!href || href.length < 1 || href.charAt(0) != "/") {
    		throw Error("Invalid value for \"href\" attribute");
    	}

    	// Add # to every href attribute
    	node.setAttribute("href", "#" + href);
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $loc,
    		$$unsubscribe_loc = noop;

    	validate_store(loc, "loc");
    	component_subscribe($$self, loc, $$value => $$invalidate(4, $loc = $$value));
    	$$self.$$.on_destroy.push(() => $$unsubscribe_loc());
    	let { routes = {} } = $$props;
    	let { prefix = "" } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent} component - Svelte component for the route
     */
    		constructor(path, component) {
    			if (!component || typeof component != "function" && (typeof component != "object" || component._sveltesparouter !== true)) {
    				throw Error("Invalid component object");
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
    				throw Error("Invalid value for \"path\" argument");
    			}

    			const { pattern, keys } = regexparam(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == "object" && component._sveltesparouter === true) {
    				this.component = component.route;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    			} else {
    				this.component = component;
    				this.conditions = [];
    				this.userData = undefined;
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, remove it before we run the matching
    			if (prefix && path.startsWith(prefix)) {
    				path = path.substr(prefix.length) || "/";
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				out[this._keys[i]] = matches[++i] || null;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {SvelteComponent} component - Svelte component
     * @property {string} name - Name of the Svelte component
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {Object} [userData] - Custom data passed by the user
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {bool} Returns true if all the conditions succeeded
     */
    		checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	const dispatchNextTick = (name, detail) => {
    		// Execute this code when the current call stack is complete
    		setTimeout(
    			() => {
    				dispatch(name, detail);
    			},
    			0
    		);
    	};

    	const writable_props = ["routes", "prefix"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Router", $$slots, []);

    	$$self.$set = $$props => {
    		if ("routes" in $$props) $$invalidate(2, routes = $$props.routes);
    		if ("prefix" in $$props) $$invalidate(3, prefix = $$props.prefix);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		derived,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		push,
    		pop,
    		replace,
    		link,
    		createEventDispatcher,
    		regexparam,
    		routes,
    		prefix,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		dispatch,
    		dispatchNextTick,
    		$loc
    	});

    	$$self.$inject_state = $$props => {
    		if ("routes" in $$props) $$invalidate(2, routes = $$props.routes);
    		if ("prefix" in $$props) $$invalidate(3, prefix = $$props.prefix);
    		if ("component" in $$props) $$invalidate(0, component = $$props.component);
    		if ("componentParams" in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*component, $loc*/ 17) {
    			// Handle hash change events
    			// Listen to changes in the $loc store and update the page
    			 {
    				// Find a route matching the location
    				$$invalidate(0, component = null);

    				let i = 0;

    				while (!component && i < routesList.length) {
    					const match = routesList[i].match($loc.location);

    					if (match) {
    						const detail = {
    							component: routesList[i].component,
    							name: routesList[i].component.name,
    							location: $loc.location,
    							querystring: $loc.querystring,
    							userData: routesList[i].userData
    						};

    						// Check if the route can be loaded - if all conditions succeed
    						if (!routesList[i].checkConditions(detail)) {
    							// Trigger an event to notify the user
    							dispatchNextTick("conditionsFailed", detail);

    							break;
    						}

    						$$invalidate(0, component = routesList[i].component);

    						// Set componentParams onloy if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    						// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    						if (match && typeof match == "object" && Object.keys(match).length) {
    							$$invalidate(1, componentParams = match);
    						} else {
    							$$invalidate(1, componentParams = null);
    						}

    						dispatchNextTick("routeLoaded", detail);
    					}

    					i++;
    				}
    			}
    		}
    	};

    	return [component, componentParams, routes, prefix];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { routes: 2, prefix: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\MenuButton.svelte generated by Svelte v3.19.2 */
    const file$1 = "src\\components\\MenuButton.svelte";

    function create_fragment$2(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let t;
    	let button_class_value;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1yte4dn");
    			add_location(span, file$1, 1, 4, 85);
    			attr_dev(button, "class", button_class_value = "menuButton " + (/*isCurrentPage*/ ctx[1] ? "current" : "") + " svelte-1yte4dn");
    			add_location(button, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    			dispose = listen_dev(button, "click", /*onClick*/ ctx[2], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1yte4dn")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 64) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[6], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null));
    			}

    			if (!current || dirty & /*isCurrentPage*/ 2 && button_class_value !== (button_class_value = "menuButton " + (/*isCurrentPage*/ ctx[1] ? "current" : "") + " svelte-1yte4dn")) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $location;
    	validate_store(location, "location");
    	component_subscribe($$self, location, $$value => $$invalidate(4, $location = $$value));
    	const dispatch = createEventDispatcher();
    	var { icon } = $$props;
    	var { path = null } = $$props;

    	// Functions
    	function onClick() {
    		dispatch("click");
    		if (path) push(path);
    	}

    	const writable_props = ["icon", "path"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuButton> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("MenuButton", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("path" in $$props) $$invalidate(3, path = $$props.path);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		location,
    		pushRoute: push,
    		createEventDispatcher,
    		dispatch,
    		icon,
    		path,
    		onClick,
    		isCurrentPage,
    		$location
    	});

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("path" in $$props) $$invalidate(3, path = $$props.path);
    		if ("isCurrentPage" in $$props) $$invalidate(1, isCurrentPage = $$props.isCurrentPage);
    	};

    	let isCurrentPage;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, $location*/ 24) {
    			// Computed
    			 $$invalidate(1, isCurrentPage = path === $location);
    		}
    	};

    	return [icon, isCurrentPage, onClick, path, $location, dispatch, $$scope, $$slots];
    }

    class MenuButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { icon: 0, path: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuButton",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[0] === undefined && !("icon" in props)) {
    			console.warn("<MenuButton> was created without expected prop 'icon'");
    		}
    	}

    	get icon() {
    		throw new Error("<MenuButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<MenuButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get path() {
    		throw new Error("<MenuButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<MenuButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.19.2 */
    const file$2 = "src\\components\\Header.svelte";

    // (10:8) <MenuButton icon="compass-outline" on:click={closeMenu} path="/">
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Navigatie");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(10:8) <MenuButton icon=\\\"compass-outline\\\" on:click={closeMenu} path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (11:8) <MenuButton icon="bookmark-multiple-outline" on:click={closeMenu} path="/addressbook">
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Address boek");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(11:8) <MenuButton icon=\\\"bookmark-multiple-outline\\\" on:click={closeMenu} path=\\\"/addressbook\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:8) <MenuButton icon="cog-outline" on:click={closeMenu} path="/settings">
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Instellingen");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(12:8) <MenuButton icon=\\\"cog-outline\\\" on:click={closeMenu} path=\\\"/settings\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let header;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let t3;
    	let t4;
    	let header_class_value;
    	let t5;
    	let div3;
    	let div3_class_value;
    	let current;
    	let dispose;
    	const headerbutton0 = new HeaderButton({ props: { icon: "menu" }, $$inline: true });
    	headerbutton0.$on("click", /*toggleMenuOpen*/ ctx[1]);

    	const headerbutton1 = new HeaderButton({
    			props: { icon: "magnify" },
    			$$inline: true
    		});

    	const menubutton0 = new MenuButton({
    			props: {
    				icon: "compass-outline",
    				path: "/",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menubutton0.$on("click", /*closeMenu*/ ctx[2]);

    	const menubutton1 = new MenuButton({
    			props: {
    				icon: "bookmark-multiple-outline",
    				path: "/addressbook",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menubutton1.$on("click", /*closeMenu*/ ctx[2]);

    	const menubutton2 = new MenuButton({
    			props: {
    				icon: "cog-outline",
    				path: "/settings",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menubutton2.$on("click", /*closeMenu*/ ctx[2]);

    	const block = {
    		c: function create() {
    			header = element("header");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			create_component(headerbutton0.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(headerbutton1.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			create_component(menubutton0.$$.fragment);
    			t3 = space();
    			create_component(menubutton1.$$.fragment);
    			t4 = space();
    			create_component(menubutton2.$$.fragment);
    			t5 = space();
    			div3 = element("div");
    			if (img.src !== (img_src_value = "./img/header-image.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-10lt554");
    			add_location(img, file$2, 1, 4, 47);
    			attr_dev(div0, "class", "leftButtons svelte-10lt554");
    			add_location(div0, file$2, 2, 4, 94);
    			attr_dev(div1, "class", "rightButtons svelte-10lt554");
    			add_location(div1, file$2, 5, 4, 203);
    			attr_dev(div2, "class", "menuContent svelte-10lt554");
    			add_location(div2, file$2, 8, 4, 290);
    			attr_dev(header, "class", header_class_value = "" + (null_to_empty(/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-10lt554"));
    			add_location(header, file$2, 0, 0, 0);
    			attr_dev(div3, "class", div3_class_value = "menuScim " + (/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-10lt554");
    			add_location(div3, file$2, 14, 0, 662);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, img);
    			append_dev(header, t0);
    			append_dev(header, div0);
    			mount_component(headerbutton0, div0, null);
    			append_dev(header, t1);
    			append_dev(header, div1);
    			mount_component(headerbutton1, div1, null);
    			append_dev(header, t2);
    			append_dev(header, div2);
    			mount_component(menubutton0, div2, null);
    			append_dev(div2, t3);
    			mount_component(menubutton1, div2, null);
    			append_dev(div2, t4);
    			mount_component(menubutton2, div2, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			current = true;
    			dispose = listen_dev(div3, "click", self(/*closeMenu*/ ctx[2]), false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			const menubutton0_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				menubutton0_changes.$$scope = { dirty, ctx };
    			}

    			menubutton0.$set(menubutton0_changes);
    			const menubutton1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				menubutton1_changes.$$scope = { dirty, ctx };
    			}

    			menubutton1.$set(menubutton1_changes);
    			const menubutton2_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				menubutton2_changes.$$scope = { dirty, ctx };
    			}

    			menubutton2.$set(menubutton2_changes);

    			if (!current || dirty & /*menuOpen*/ 1 && header_class_value !== (header_class_value = "" + (null_to_empty(/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-10lt554"))) {
    				attr_dev(header, "class", header_class_value);
    			}

    			if (!current || dirty & /*menuOpen*/ 1 && div3_class_value !== (div3_class_value = "menuScim " + (/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-10lt554")) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headerbutton0.$$.fragment, local);
    			transition_in(headerbutton1.$$.fragment, local);
    			transition_in(menubutton0.$$.fragment, local);
    			transition_in(menubutton1.$$.fragment, local);
    			transition_in(menubutton2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headerbutton0.$$.fragment, local);
    			transition_out(headerbutton1.$$.fragment, local);
    			transition_out(menubutton0.$$.fragment, local);
    			transition_out(menubutton1.$$.fragment, local);
    			transition_out(menubutton2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(headerbutton0);
    			destroy_component(headerbutton1);
    			destroy_component(menubutton0);
    			destroy_component(menubutton1);
    			destroy_component(menubutton2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	var menuOpen = false;

    	// Functions
    	function toggleMenuOpen() {
    		$$invalidate(0, menuOpen = !menuOpen);
    	}

    	function closeMenu() {
    		$$invalidate(0, menuOpen = false);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);

    	$$self.$capture_state = () => ({
    		HeaderButton,
    		MenuButton,
    		menuOpen,
    		toggleMenuOpen,
    		closeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ("menuOpen" in $$props) $$invalidate(0, menuOpen = $$props.menuOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [menuOpen, toggleMenuOpen, closeMenu];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Spinner.svelte generated by Svelte v3.19.2 */

    const file$3 = "src\\components\\Spinner.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "spinner " + (/*center*/ ctx[0] && "center") + " svelte-4la4mf");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*center*/ 1 && div_class_value !== (div_class_value = "spinner " + (/*center*/ ctx[0] && "center") + " svelte-4la4mf")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	var { center = true } = $$props;
    	var { image = false } = $$props;
    	const writable_props = ["center", "image"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Spinner> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Spinner", $$slots, []);

    	$$self.$set = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    		if ("image" in $$props) $$invalidate(1, image = $$props.image);
    	};

    	$$self.$capture_state = () => ({ center, image });

    	$$self.$inject_state = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    		if ("image" in $$props) $$invalidate(1, image = $$props.image);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [center, image];
    }

    class Spinner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { center: 0, image: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spinner",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get center() {
    		throw new Error("<Spinner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<Spinner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<Spinner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<Spinner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function decodePolyline(polyline) {

      var _ = {};

      _.Ya = function(a, b, c) {
        null != b && (a = Math.max(a, b));
        null != c && (a = Math.min(a, c));
        return a
      };
      _.Za = function(a, b, c) { c -= b; return ((a - b) % c + c) % c + b };
      _.w = function(a) { return a ? a.length : 0 };

      _.E = function(a, b, c) {
        a -= 0;
        b -= 0;
        c || (a = _.Ya(a, -90, 90), 180 != b && (b = _.Za(b, -180, 180)));
        this.lat = function() { return a };
        this.lng = function() { return b };
      };

      function decodePath(a) {
        for (var b = _.w(a), c = Array(Math.floor(a.length / 2)), d = 0, e = 0, f = 0, g = 0; d < b; ++g) {
          var h = 1,
            l = 0,
            n;
          do n = a.charCodeAt(d++) - 63 - 1, h += n << l, l += 5; while (31 <= n);
          e += h & 1 ? ~(h >> 1) : h >> 1;
          h = 1;
          l = 0;
          do n = a.charCodeAt(d++) - 63 - 1, h += n << l, l += 5; while (31 <= n);
          f += h & 1 ? ~(h >> 1) : h >> 1;
          c[g] = new _.E(1E-5 * e, 1E-5 * f, !0);
        }
        c.length = g;
        return c
      }

      var result = decodePath(polyline).map(function(el) {
          return {lat:Number(el.lat().toFixed(5)),lng:Number(el.lng().toFixed(5))};
      });

      return result;

    }

    var decodeGoogleMapPolyline=decodePolyline;

    /* src\components\RouteStep\Walking.svelte generated by Svelte v3.19.2 */

    const file$4 = "src\\components\\RouteStep\\Walking.svelte";

    function create_fragment$5(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			t1 = text(/*durationInMinutes*/ ctx[0]);
    			t2 = space();
    			t3 = text(/*minuteText*/ ctx[1]);
    			attr_dev(span, "class", "mdi mdi-walk");
    			add_location(span, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*durationInMinutes*/ 1) set_data_dev(t1, /*durationInMinutes*/ ctx[0]);
    			if (dirty & /*minuteText*/ 2) set_data_dev(t3, /*minuteText*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Walking> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Walking", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({ step, durationInMinutes, minuteText });

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("durationInMinutes" in $$props) $$invalidate(0, durationInMinutes = $$props.durationInMinutes);
    		if ("minuteText" in $$props) $$invalidate(1, minuteText = $$props.minuteText);
    	};

    	let durationInMinutes;
    	let minuteText;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 4) {
    			// Computed
    			 $$invalidate(0, durationInMinutes = Math.round(step.duration.value / 60));
    		}

    		if ($$self.$$.dirty & /*durationInMinutes*/ 1) {
    			 $$invalidate(1, minuteText = durationInMinutes > 1 ? "minuten" : "minuut");
    		}
    	};

    	return [durationInMinutes, minuteText, step];
    }

    class Walking extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { step: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Walking",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[2] === undefined && !("step" in props)) {
    			console.warn("<Walking> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Walking>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Walking>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function toTimeString(timestamp) {
        timestamp = standardizeTimestamp(timestamp);

        var d = new Date(timestamp);
        var hours = toFixedLength(d.getHours());
        var minutes = toFixedLength(d.getMinutes());

        return `${hours}:${minutes}`;
    }

    function standardizeTimestamp(timestamp) {
        var isISO = timestamp > 2000000000;

        if (isISO) {
            return timestamp;
        } else {
            return timestamp * 1000;
        }
    }

    function toFixedLength(value) {
        if (value < 10) {
            return "0" + value;
        } else {
            return String(value);
        }
    }

    const locationStore = writable({
        lat: 0,
        long: 0,
    });

    prepareStore(locationStore);
    var locationWatcher;

    function readToLocation(geolocation) {
        return {
            lat: geolocation.coords.latitude,
            long: geolocation.coords.longitude,
        }
    }

    function locationIsValid() {
        var location = locationStore.get();
        return location.lat !== 0 && location.long !== 0;
    }

    function startLocation() {
        if (locationWatcher !== undefined) return;

        if (navigator !== undefined && navigator.geolocation !== undefined) {
            locationWatcher = navigator.geolocation.watchPosition(position => {
                locationStore.set(readToLocation(position));
            });
        }
    }

    function isValidPosition(position) {
        var { lat, long } = position;

        if (lat === 0 && long === 0) return false;
        else return true;
    }

    function getDirectDistance(positionA, positionB) {
        var positionAValid = isValidPosition(positionA);
        var positionBValid = isValidPosition(positionB);

        if (!positionAValid || !positionBValid) return Infinity;

        var differenceLat = Math.abs(positionA.lat - positionB.lat);
        var differenceLong = Math.abs(positionA.long - positionB.long);

        var directDistance = Math.sqrt(differenceLat ** 2 + differenceLong ** 2);

        return directDistance;
    }

    class Observable {
        constructor() {
            this.observers = [];
        }

        subscribe(fn) {
            if (typeof fn !== "function") throw new Error("You have to provide a function");
            this.observers.push(fn);
        }

        remove(fn) {
            var index = this.observers.indexOf(fn);
            this.observers.splice(index, 1);
        }

        update(value) {
            this.observers.forEach(observer => observer(value));
        }
    }

    const facilityIconMap = {
        WIFI: "wifi-strength-4",
        TOILET: "human-male-female",
        STILTE: "volume-mute",
        FIETS: "bicycle",
        STROOM: "power-socket-eu",
    };

    function getFacilityIcon(facility) {
        return facilityIconMap[facility];
    }

    function getFullDetailsByCode(code) {
        var stations = [...stationsFullDetails.get()];

        stations = stations.filter(station => station.code === code);

        if (stations.length === 0) return null;
        else return stations[0];
    }

    function getFullDetailsByLocation(lat, long) {
        var station = getStationCodeByLocation(lat, long);
        var code = station.stationCode;
        var directDistance = station.directDistance;

        return {
            ...getFullDetailsByCode(code),
            directDistance,
        }
    }

    function getStationCodeByLocation(lat, long) {
        var stations = [...stationLocations.get()];   

        stations = stations.map(station => {
            var directDistance = getDirectDistance(station, {
                lat,
                long,
            });

            return {
                ...station,
                directDistance,
            }
        })
        .sort((a, b) => a.directDistance - b.directDistance);

        return stations[0];
    }

    async function getTrainTrip(step) {
        var tripNumber = step.transit_details.trip_short_name;
        var startLocation = step.start_location;
        var endLocation = step.end_location;

        var startStation = getStationCodeByLocation(startLocation.lat, startLocation.lng).stationCode;
        var endStation = getStationCodeByLocation(endLocation.lat, endLocation.lng).stationCode;

        var { trips } = await serverRequest(`/trainTrip/${startStation}/${endStation}`);
        trips = trips.filter(trip => {
            return trip.legs.some(leg => leg.name.includes(tripNumber))
        });

        return trips;
    }

    async function refreshTrainTrip(uid) {
        var trip = await serverRequest(`/refreshTrainTrip?refreshToken=${uid}`);
        return trip;
    }

    class LiveTrainLocation extends Observable {
        constructor(tripNumber) {
            super();

            this.tripNumber = tripNumber;
            this.timer = null;
            this.refreshInterval = 60 * 1000; // 60 seconds
        }

        destroy() {
            this.clearTimer();
        }

        clearTimer() {
            if (this.timer) clearInterval(this.timer);
        }

        start() {
            this.clearTimer();
            this.timer = setInterval(() => this.tick(), this.refreshInterval);
            this.tick();
        }

        async tick() {
            var { lat, long } = locationStore.get();
            var response = await serverRequest(`/trainLocations?location=${lat},${long}&tripNumber=${this.tripNumber}`, this.refreshInterval - 1000);

            console.log(response, this.tripNumber);

            if (response.locations.length > 0) {
                var trainLocation = response.locations[0];

                var response = {
                    ...trainLocation,
                    closestStation: getFullDetailsByLocation(trainLocation.lat, trainLocation.lng),
                };

                console.log(response);

                this.update(response);
            } else {
                this.update(null);
            }
        }
    }

    /* src\components\InfoRow.svelte generated by Svelte v3.19.2 */

    const file$5 = "src\\components\\InfoRow.svelte";
    const get_right_slot_changes = dirty => ({});
    const get_right_slot_context = ctx => ({});
    const get_center_slot_changes = dirty => ({});
    const get_center_slot_context = ctx => ({});
    const get_left_slot_changes = dirty => ({});
    const get_left_slot_context = ctx => ({});

    function create_fragment$6(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let span;
    	let t1;
    	let div1;
    	let current;
    	const left_slot_template = /*$$slots*/ ctx[1].left;
    	const left_slot = create_slot(left_slot_template, ctx, /*$$scope*/ ctx[0], get_left_slot_context);
    	const center_slot_template = /*$$slots*/ ctx[1].center;
    	const center_slot = create_slot(center_slot_template, ctx, /*$$scope*/ ctx[0], get_center_slot_context);
    	const right_slot_template = /*$$slots*/ ctx[1].right;
    	const right_slot = create_slot(right_slot_template, ctx, /*$$scope*/ ctx[0], get_right_slot_context);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if (left_slot) left_slot.c();
    			t0 = space();
    			span = element("span");
    			if (center_slot) center_slot.c();
    			t1 = space();
    			div1 = element("div");
    			if (right_slot) right_slot.c();
    			attr_dev(div0, "class", "left svelte-k8gzu4");
    			add_location(div0, file$5, 1, 4, 27);
    			attr_dev(span, "class", "center svelte-k8gzu4");
    			add_location(span, file$5, 4, 4, 93);
    			attr_dev(div1, "class", "right svelte-k8gzu4");
    			add_location(div1, file$5, 7, 4, 165);
    			attr_dev(div2, "class", "infoRow svelte-k8gzu4");
    			add_location(div2, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);

    			if (left_slot) {
    				left_slot.m(div0, null);
    			}

    			append_dev(div2, t0);
    			append_dev(div2, span);

    			if (center_slot) {
    				center_slot.m(span, null);
    			}

    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			if (right_slot) {
    				right_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (left_slot && left_slot.p && dirty & /*$$scope*/ 1) {
    				left_slot.p(get_slot_context(left_slot_template, ctx, /*$$scope*/ ctx[0], get_left_slot_context), get_slot_changes(left_slot_template, /*$$scope*/ ctx[0], dirty, get_left_slot_changes));
    			}

    			if (center_slot && center_slot.p && dirty & /*$$scope*/ 1) {
    				center_slot.p(get_slot_context(center_slot_template, ctx, /*$$scope*/ ctx[0], get_center_slot_context), get_slot_changes(center_slot_template, /*$$scope*/ ctx[0], dirty, get_center_slot_changes));
    			}

    			if (right_slot && right_slot.p && dirty & /*$$scope*/ 1) {
    				right_slot.p(get_slot_context(right_slot_template, ctx, /*$$scope*/ ctx[0], get_right_slot_context), get_slot_changes(right_slot_template, /*$$scope*/ ctx[0], dirty, get_right_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left_slot, local);
    			transition_in(center_slot, local);
    			transition_in(right_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left_slot, local);
    			transition_out(center_slot, local);
    			transition_out(right_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (left_slot) left_slot.d(detaching);
    			if (center_slot) center_slot.d(detaching);
    			if (right_slot) right_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<InfoRow> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("InfoRow", $$slots, ['left','center','right']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class InfoRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InfoRow",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\HeadSign.svelte generated by Svelte v3.19.2 */

    const file$6 = "src\\components\\HeadSign.svelte";

    function create_fragment$7(ctx) {
    	let span1;
    	let span0;
    	let span0_class_value;
    	let t;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span0, "class", span0_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-rxuxws");
    			add_location(span0, file$6, 1, 4, 94);
    			attr_dev(span1, "class", "headSign svelte-rxuxws");
    			set_style(span1, "background-color", /*backgroundColor*/ ctx[1]);
    			set_style(span1, "color", /*textColor*/ ctx[2]);
    			add_location(span1, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t);

    			if (default_slot) {
    				default_slot.m(span1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 1 && span0_class_value !== (span0_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-rxuxws")) {
    				attr_dev(span0, "class", span0_class_value);
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}

    			if (!current || dirty & /*backgroundColor*/ 2) {
    				set_style(span1, "background-color", /*backgroundColor*/ ctx[1]);
    			}

    			if (!current || dirty & /*textColor*/ 4) {
    				set_style(span1, "color", /*textColor*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	var { icon } = $$props;
    	var { backgroundColor = "#000000" } = $$props;
    	var { textColor = "#ffffff" } = $$props;
    	const writable_props = ["icon", "backgroundColor", "textColor"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeadSign> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("HeadSign", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("backgroundColor" in $$props) $$invalidate(1, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(2, textColor = $$props.textColor);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ icon, backgroundColor, textColor });

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("backgroundColor" in $$props) $$invalidate(1, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(2, textColor = $$props.textColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [icon, backgroundColor, textColor, $$scope, $$slots];
    }

    class HeadSign extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			icon: 0,
    			backgroundColor: 1,
    			textColor: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeadSign",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[0] === undefined && !("icon" in props)) {
    			console.warn("<HeadSign> was created without expected prop 'icon'");
    		}
    	}

    	get icon() {
    		throw new Error("<HeadSign>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<HeadSign>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backgroundColor() {
    		throw new Error("<HeadSign>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backgroundColor(value) {
    		throw new Error("<HeadSign>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textColor() {
    		throw new Error("<HeadSign>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textColor(value) {
    		throw new Error("<HeadSign>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    const flyDown = { y: -16, duration: 150 };
    const flyUp = { y: 16, duration: 150 };

    /* src\components\DropDown.svelte generated by Svelte v3.19.2 */
    const file$7 = "src\\components\\DropDown.svelte";

    // (2:0) {#if open}
    function create_if_block$1(ctx) {
    	let div;
    	let div_intro;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "dropDownContent svelte-473m8e");
    			add_location(div, file$7, 2, 4, 100);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fly, flyDown);
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(2:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let p;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let if_block_anchor;
    	let current;
    	let dispose;
    	let if_block = /*open*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(/*text*/ ctx[1]);
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(span, "class", "mdi mdi-chevron-down");
    			add_location(span, file$7, 0, 29, 29);
    			attr_dev(p, "class", "svelte-473m8e");
    			add_location(p, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			insert_dev(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    			dispose = listen_dev(p, "click", /*toggleDropdown*/ ctx[2], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	var { text = "Meer Info" } = $$props;
    	var { open = false } = $$props;

    	// Functions
    	function toggleDropdown() {
    		$$invalidate(0, open = !open);
    	}

    	const writable_props = ["text", "open"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DropDown> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("DropDown", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ fly, flyDown, text, open, toggleDropdown });

    	$$self.$inject_state = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [open, text, toggleDropdown, $$scope, $$slots];
    }

    class DropDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { text: 1, open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropDown",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get text() {
    		throw new Error("<DropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<DropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<DropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<DropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\RouteStep\Train.svelte generated by Svelte v3.19.2 */
    const file$8 = "src\\components\\RouteStep\\Train.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[31] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[31] = list[i];
    	return child_ctx;
    }

    // (2:4) <span slot="left">
    function create_left_slot_6(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*startTimeString*/ ctx[7]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$8, 1, 4, 15);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*startTimeString*/ 128) set_data_dev(t, /*startTimeString*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_6.name,
    		type: "slot",
    		source: "(2:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (4:8) <HeadSign icon="train" {backgroundColor} {textColor}>
    function create_default_slot_8(ctx) {
    	let t_value = /*line*/ ctx[4].short_name + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*line*/ 16 && t_value !== (t_value = /*line*/ ctx[4].short_name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(4:8) <HeadSign icon=\\\"train\\\" {backgroundColor} {textColor}>",
    		ctx
    	});

    	return block;
    }

    // (3:4) <span slot="center">
    function create_center_slot(ctx) {
    	let span;
    	let current;

    	const headsign = new HeadSign({
    			props: {
    				icon: "train",
    				backgroundColor: /*backgroundColor*/ ctx[5],
    				textColor: /*textColor*/ ctx[6],
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(headsign.$$.fragment);
    			attr_dev(span, "slot", "center");
    			add_location(span, file$8, 2, 4, 63);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(headsign, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headsign_changes = {};
    			if (dirty[0] & /*backgroundColor*/ 32) headsign_changes.backgroundColor = /*backgroundColor*/ ctx[5];
    			if (dirty[0] & /*textColor*/ 64) headsign_changes.textColor = /*textColor*/ ctx[6];

    			if (dirty[0] & /*line*/ 16 | dirty[1] & /*$$scope*/ 256) {
    				headsign_changes.$$scope = { dirty, ctx };
    			}

    			headsign.$set(headsign_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headsign.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headsign.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(headsign);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_center_slot.name,
    		type: "slot",
    		source: "(3:4) <span slot=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (6:4) <span slot="right">
    function create_right_slot_5(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*endTimeString*/ ctx[8]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 5, 4, 193);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*endTimeString*/ 256) set_data_dev(t, /*endTimeString*/ ctx[8]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_5.name,
    		type: "slot",
    		source: "(6:4) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (1:0) <InfoRow>
    function create_default_slot_7(ctx) {
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = space();
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(1:0) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (8:0) {#if cancelled}
    function create_if_block_5(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text("\r\n        Deze trein is geannuleerd");
    			attr_dev(span, "class", "mdi mdi-alert");
    			add_location(span, file$8, 9, 8, 300);
    			attr_dev(p, "class", "cancelled svelte-hntb53");
    			add_location(p, file$8, 8, 4, 269);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(8:0) {#if cancelled}",
    		ctx
    	});

    	return block;
    }

    // (15:4) <span slot="left">
    function create_left_slot_5(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*transitDetails*/ ctx[3].departure_stop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-arrow-expand-right");
    			add_location(span1, file$8, 14, 22, 422);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 14, 4, 404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*transitDetails*/ 8 && t1_value !== (t1_value = /*transitDetails*/ ctx[3].departure_stop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_5.name,
    		type: "slot",
    		source: "(15:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (16:4) <span slot="right">
    function create_right_slot_4(ctx) {
    	let span;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("spoor ");
    			t1 = text(/*originPlatform*/ ctx[9]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 15, 4, 520);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*originPlatform*/ 512) set_data_dev(t1, /*originPlatform*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_4.name,
    		type: "slot",
    		source: "(16:4) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (14:0) <InfoRow>
    function create_default_slot_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(14:0) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (19:4) <span slot="left">
    function create_left_slot_4(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*transitDetails*/ ctx[3].arrival_stop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-arrow-collapse-right");
    			add_location(span1, file$8, 18, 22, 615);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 18, 4, 597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*transitDetails*/ 8 && t1_value !== (t1_value = /*transitDetails*/ ctx[3].arrival_stop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_4.name,
    		type: "slot",
    		source: "(19:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:4) <span slot="right">
    function create_right_slot_3(ctx) {
    	let span;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("spoor ");
    			t1 = text(/*destinationPlatform*/ ctx[10]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 19, 4, 713);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*destinationPlatform*/ 1024) set_data_dev(t1, /*destinationPlatform*/ ctx[10]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_3.name,
    		type: "slot",
    		source: "(20:4) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (18:0) <InfoRow>
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(18:0) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (27:8) {:else}
    function create_else_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Geen live data beschikbaar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(27:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:8) {#if liveDataAvailable}
    function create_if_block_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*liveMessage*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*liveMessage*/ 4) set_data_dev(t, /*liveMessage*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(25:8) {#if liveDataAvailable}",
    		ctx
    	});

    	return block;
    }

    // (23:4) <span slot="left">
    function create_left_slot_3(ctx) {
    	let span0;
    	let span1;
    	let span1_class_value;
    	let t;

    	function select_block_type(ctx, dirty) {
    		if (/*liveDataAvailable*/ ctx[13]) return create_if_block_4;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t = space();
    			if_block.c();
    			attr_dev(span1, "class", span1_class_value = "mdi mdi-rss " + (/*liveDataAvailable*/ ctx[13] ? "liveDataActive" : "") + " svelte-hntb53");
    			add_location(span1, file$8, 23, 8, 823);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 22, 4, 795);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t);
    			if_block.m(span0, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*liveDataAvailable*/ 8192 && span1_class_value !== (span1_class_value = "mdi mdi-rss " + (/*liveDataAvailable*/ ctx[13] ? "liveDataActive" : "") + " svelte-hntb53")) {
    				attr_dev(span1, "class", span1_class_value);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(span0, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_3.name,
    		type: "slot",
    		source: "(23:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (66:42) 
    function create_if_block_3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Error";
    			add_location(p, file$8, 66, 8, 2629);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(66:42) ",
    		ctx
    	});

    	return block;
    }

    // (33:4) {#if trainDataStatus === "loaded"}
    function create_if_block$2(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let each1_anchor;
    	let current;
    	let each_value_2 = /*trainData*/ ctx[1].materieeldelen;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let if_block = /*exitDirection*/ ctx[11] && create_if_block_1(ctx);

    	const inforow0 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_3],
    					right: [create_right_slot_2],
    					left: [create_left_slot_2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_2$1],
    					right: [create_right_slot_1],
    					left: [create_left_slot_1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*trainData*/ ctx[1].materieeldelen;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(inforow0.$$.fragment);
    			t2 = space();
    			create_component(inforow1.$$.fragment);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each1_anchor = empty();
    			attr_dev(div, "class", "trainImages svelte-hntb53");
    			add_location(div, file$8, 33, 8, 1120);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div, null);
    			}

    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(inforow0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(inforow1, target, anchor);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2) {
    				each_value_2 = /*trainData*/ ctx[1].materieeldelen;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (/*exitDirection*/ ctx[11]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const inforow0_changes = {};

    			if (dirty[0] & /*transitDetails*/ 8 | dirty[1] & /*$$scope*/ 256) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);
    			const inforow1_changes = {};

    			if (dirty[0] & /*trainData*/ 2 | dirty[1] & /*$$scope*/ 256) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);

    			if (dirty[0] & /*trainData*/ 2) {
    				each_value = /*trainData*/ ctx[1].materieeldelen;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(33:4) {#if trainDataStatus === \\\"loaded\\\"}",
    		ctx
    	});

    	return block;
    }

    // (35:12) {#each trainData.materieeldelen as trainPart}
    function create_each_block_2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "trainPartImage svelte-hntb53");
    			if (img.src !== (img_src_value = /*trainPart*/ ctx[31].afbeelding)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Train part");
    			add_location(img, file$8, 35, 16, 1222);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2 && img.src !== (img_src_value = /*trainPart*/ ctx[31].afbeelding)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(35:12) {#each trainData.materieeldelen as trainPart}",
    		ctx
    	});

    	return block;
    }

    // (39:8) {#if exitDirection}
    function create_if_block_1(ctx) {
    	let p;

    	function select_block_type_2(ctx, dirty) {
    		if (/*exitDirection*/ ctx[11] === "LEFT") return create_if_block_2;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type_2(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if_block.c();
    			attr_dev(p, "class", "exitDirection svelte-hntb53");
    			add_location(p, file$8, 39, 12, 1376);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			if_block.m(p, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type_2(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(p, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(39:8) {#if exitDirection}",
    		ctx
    	});

    	return block;
    }

    // (43:16) {:else}
    function create_else_block$1(ctx) {
    	let t;
    	let span;

    	const block = {
    		c: function create() {
    			t = text("Rechts uitstappen ");
    			span = element("span");
    			attr_dev(span, "class", "mdi mdi-chevron-triple-right");
    			add_location(span, file$8, 43, 38, 1602);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:16) {#if exitDirection === "LEFT"}
    function create_if_block_2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(" Links uitstappen");
    			attr_dev(span, "class", "mdi mdi-chevron-triple-left");
    			add_location(span, file$8, 41, 20, 1471);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(41:16) {#if exitDirection === \\\"LEFT\\\"}",
    		ctx
    	});

    	return block;
    }

    // (49:12) <span slot="left">
    function create_left_slot_2(ctx) {
    	let span0;
    	let span1;
    	let t;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t = text(" Richting");
    			attr_dev(span1, "class", "mdi mdi-routes");
    			add_location(span1, file$8, 48, 30, 1759);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 48, 12, 1741);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_2.name,
    		type: "slot",
    		source: "(49:12) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (50:12) <span slot="right">
    function create_right_slot_2(ctx) {
    	let span;
    	let t_value = /*transitDetails*/ ctx[3].headsign + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 49, 12, 1825);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*transitDetails*/ 8 && t_value !== (t_value = /*transitDetails*/ ctx[3].headsign + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_2.name,
    		type: "slot",
    		source: "(50:12) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (48:8) <InfoRow>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(48:8) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (53:12) <span slot="left">
    function create_left_slot_1(ctx) {
    	let span0;
    	let span1;
    	let t;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t = text(" Lengte");
    			attr_dev(span1, "class", "mdi mdi-ruler");
    			add_location(span1, file$8, 52, 30, 1947);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 52, 12, 1929);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1.name,
    		type: "slot",
    		source: "(53:12) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (54:12) <span slot="right">
    function create_right_slot_1(ctx) {
    	let span;
    	let b;
    	let t0_value = /*trainData*/ ctx[1].lengte + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = text(" delen");
    			add_location(b, file$8, 53, 31, 2029);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 53, 12, 2010);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, b);
    			append_dev(b, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2 && t0_value !== (t0_value = /*trainData*/ ctx[1].lengte + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_1.name,
    		type: "slot",
    		source: "(54:12) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (52:8) <InfoRow>
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(52:8) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (58:16) <span slot="left">
    function create_left_slot(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*trainPart*/ ctx[31].materieelnummer + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = text(" Treinstel ");
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-barcode");
    			add_location(span1, file$8, 57, 34, 2201);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$8, 57, 16, 2183);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2 && t1_value !== (t1_value = /*trainPart*/ ctx[31].materieelnummer + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot.name,
    		type: "slot",
    		source: "(58:16) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:20) {#each trainPart.faciliteiten as facility}
    function create_each_block_1(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "facilityIcon mdi mdi-" + getFacilityIcon(/*facility*/ ctx[34]) + " svelte-hntb53");
    			add_location(span, file$8, 60, 24, 2410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2 && span_class_value !== (span_class_value = "facilityIcon mdi mdi-" + getFacilityIcon(/*facility*/ ctx[34]) + " svelte-hntb53")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(60:20) {#each trainPart.faciliteiten as facility}",
    		ctx
    	});

    	return block;
    }

    // (59:16) <span slot="right">
    function create_right_slot(ctx) {
    	let span;
    	let each_value_1 = /*trainPart*/ ctx[31].faciliteiten;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "slot", "right");
    			add_location(span, file$8, 58, 16, 2301);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*trainData*/ 2) {
    				each_value_1 = /*trainPart*/ ctx[31].faciliteiten;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(span, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot.name,
    		type: "slot",
    		source: "(59:16) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (57:12) <InfoRow>
    function create_default_slot_1$1(ctx) {
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = space();
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(57:12) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (56:8) {#each trainData.materieeldelen as trainPart}
    function create_each_block(ctx) {
    	let current;

    	const inforow = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_1$1],
    					right: [create_right_slot],
    					left: [create_left_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow_changes = {};

    			if (dirty[0] & /*trainData*/ 2 | dirty[1] & /*$$scope*/ 256) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(56:8) {#each trainData.materieeldelen as trainPart}",
    		ctx
    	});

    	return block;
    }

    // (32:0) <DropDown>
    function create_default_slot$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_3];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*trainDataStatus*/ ctx[0] === "loaded") return 0;
    		if (/*trainDataStatus*/ ctx[0] === "error") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(32:0) <DropDown>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let current;

    	const inforow0 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_7],
    					right: [create_right_slot_5],
    					center: [create_center_slot],
    					left: [create_left_slot_6]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*cancelled*/ ctx[12] && create_if_block_5(ctx);

    	const inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_6],
    					right: [create_right_slot_4],
    					left: [create_left_slot_5]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow2 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_5],
    					right: [create_right_slot_3],
    					left: [create_left_slot_4]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow3 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const dropdown = new DropDown({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(inforow1.$$.fragment);
    			t2 = space();
    			create_component(inforow2.$$.fragment);
    			t3 = space();
    			create_component(inforow3.$$.fragment);
    			t4 = space();
    			create_component(dropdown.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow0, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(inforow1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(inforow2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(inforow3, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow0_changes = {};

    			if (dirty[0] & /*endTimeString, backgroundColor, textColor, line, startTimeString*/ 496 | dirty[1] & /*$$scope*/ 256) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);

    			if (/*cancelled*/ ctx[12]) {
    				if (!if_block) {
    					if_block = create_if_block_5(ctx);
    					if_block.c();
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const inforow1_changes = {};

    			if (dirty[0] & /*originPlatform, transitDetails*/ 520 | dirty[1] & /*$$scope*/ 256) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const inforow2_changes = {};

    			if (dirty[0] & /*destinationPlatform, transitDetails*/ 1032 | dirty[1] & /*$$scope*/ 256) {
    				inforow2_changes.$$scope = { dirty, ctx };
    			}

    			inforow2.$set(inforow2_changes);
    			const inforow3_changes = {};

    			if (dirty[0] & /*liveMessage, liveDataAvailable*/ 8196 | dirty[1] & /*$$scope*/ 256) {
    				inforow3_changes.$$scope = { dirty, ctx };
    			}

    			inforow3.$set(inforow3_changes);
    			const dropdown_changes = {};

    			if (dirty[0] & /*trainData, transitDetails, exitDirection, trainDataStatus*/ 2059 | dirty[1] & /*$$scope*/ 256) {
    				dropdown_changes.$$scope = { dirty, ctx };
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(inforow2.$$.fragment, local);
    			transition_in(inforow3.$$.fragment, local);
    			transition_in(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(inforow2.$$.fragment, local);
    			transition_out(inforow3.$$.fragment, local);
    			transition_out(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(inforow2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(inforow3, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function findClosestPoint(points, lat, long) {
    	points = points.map(point => {
    		var differenceLat = Math.abs(point.lat - lat);
    		var differenceLong = Math.abs(point.long - long);
    		var directDifference = Math.sqrt(differenceLat ** 2 + differenceLong ** 2);
    		return { ...point, directDifference };
    	}).sort((a, b) => a.directDifference - b.directDifference);

    	return points[0];
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $stepStore;
    	var { step } = $$props;

    	// Data
    	const refreshRate = 60 * 1000; // 60 seconds

    	var stepStore = createStepStore(step.id, {});
    	validate_store(stepStore, "stepStore");
    	component_subscribe($$self, stepStore, value => $$invalidate(19, $stepStore = value));
    	set_store_value(stepStore, $stepStore.maxAge = 60 * 60 * 1000, $stepStore); // 60 minutes;
    	set_store_value(stepStore, $stepStore.timestamp = Date.now(), $stepStore);
    	var trainDataStatus = "";
    	var trainData;
    	var trainTrip;
    	var liveData;
    	var liveMessage;
    	var polyline = [];

    	// Functions
    	async function refreshTrip() {
    		if ($stepStore.tripRefreshCode) {
    			$$invalidate(16, trainTrip = await refreshTrainTrip($stepStore.tripRefreshCode));
    			var stopCodes = getStopCodes(trainTrip.legs[0].stops);
    			var { coords } = await serverRequest(`/trainRouteCoords?stations=${stopCodes.join(",")}`, 60 * 60 * 1000); // Cached for an hour
    			polyline = coords;
    		}
    	}

    	function getStopCodes(stops) {
    		var codes = stops.map(stop => getStationCodeByLocation(stop.lat, stop.lng).stationCode);
    		return codes;
    	}

    	// On create
    	const refreshTimer = setInterval(refreshTrip, refreshRate);

    	refreshTrip();

    	// On mount
    	onMount(async () => {
    		try {
    			liveData = new LiveTrainLocation(tripNumber);
    			$$invalidate(1, trainData = await serverRequest("/virtualTrain/" + tripNumber));

    			liveData.subscribe(data => {
    				if (!data) {
    					$$invalidate(2, liveMessage = null);
    					return;
    				}

    				var closestPoint = findClosestPoint(polyline, data.lat, data.lng);

    				if (closestPoint) {
    					var closestStation = getFullDetailsByCode(closestPoint.code);

    					if (data.snelheid === 0) {
    						$$invalidate(2, liveMessage = `Trein aangekomen op ${closestStation.namen.middel}`);
    					} else {
    						$$invalidate(2, liveMessage = `Trein rijd naar ${closestStation.namen.middel}`);
    					}
    				} else {
    					$$invalidate(2, liveMessage = null);
    				}
    			});

    			liveData.start();
    			$$invalidate(0, trainDataStatus = "loaded");
    		} catch(error) {
    			$$invalidate(0, trainDataStatus = "error");
    			throw error;
    		}

    		if ($stepStore.tripRefreshCode === undefined) {
    			var tripData = await getTrainTrip(step);

    			if (tripData.length > 0) {
    				$$invalidate(16, trainTrip = tripData[0]);
    				set_store_value(stepStore, $stepStore.tripRefreshCode = trainTrip.uid, $stepStore);
    				stepStore.set($stepStore);
    			}
    		}
    	});

    	// On destroy
    	onDestroy(() => {
    		clearInterval(refreshTimer);
    		liveData.destroy();
    	});

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Train> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Train", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(15, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		serverRequest,
    		getStepColor,
    		getStepTextColor,
    		createStepStore,
    		standardizeTimestamp,
    		toTimeString,
    		getFacilityIcon,
    		getTrainTrip,
    		refreshTrainTrip,
    		getStationCodeByLocation,
    		getFullDetailsByCode,
    		LiveTrainLocation,
    		InfoRow,
    		HeadSign,
    		DropDown,
    		step,
    		refreshRate,
    		stepStore,
    		trainDataStatus,
    		trainData,
    		trainTrip,
    		liveData,
    		liveMessage,
    		polyline,
    		refreshTrip,
    		getStopCodes,
    		findClosestPoint,
    		refreshTimer,
    		$stepStore,
    		transitDetails,
    		tripNumber,
    		line,
    		backgroundColor,
    		textColor,
    		startTimestamp,
    		startTimeString,
    		endTimestamp,
    		endTimeString,
    		tripRefreshCode,
    		tripLoaded,
    		trainTripLeg,
    		originPlatform,
    		destinationPlatform,
    		exitDirection,
    		cancelled,
    		stops,
    		liveDataAvailable
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(15, step = $$props.step);
    		if ("stepStore" in $$props) $$invalidate(14, stepStore = $$props.stepStore);
    		if ("trainDataStatus" in $$props) $$invalidate(0, trainDataStatus = $$props.trainDataStatus);
    		if ("trainData" in $$props) $$invalidate(1, trainData = $$props.trainData);
    		if ("trainTrip" in $$props) $$invalidate(16, trainTrip = $$props.trainTrip);
    		if ("liveData" in $$props) liveData = $$props.liveData;
    		if ("liveMessage" in $$props) $$invalidate(2, liveMessage = $$props.liveMessage);
    		if ("polyline" in $$props) polyline = $$props.polyline;
    		if ("transitDetails" in $$props) $$invalidate(3, transitDetails = $$props.transitDetails);
    		if ("tripNumber" in $$props) tripNumber = $$props.tripNumber;
    		if ("line" in $$props) $$invalidate(4, line = $$props.line);
    		if ("backgroundColor" in $$props) $$invalidate(5, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(6, textColor = $$props.textColor);
    		if ("startTimestamp" in $$props) $$invalidate(21, startTimestamp = $$props.startTimestamp);
    		if ("startTimeString" in $$props) $$invalidate(7, startTimeString = $$props.startTimeString);
    		if ("endTimestamp" in $$props) $$invalidate(22, endTimestamp = $$props.endTimestamp);
    		if ("endTimeString" in $$props) $$invalidate(8, endTimeString = $$props.endTimeString);
    		if ("tripRefreshCode" in $$props) $$invalidate(23, tripRefreshCode = $$props.tripRefreshCode);
    		if ("tripLoaded" in $$props) $$invalidate(24, tripLoaded = $$props.tripLoaded);
    		if ("trainTripLeg" in $$props) $$invalidate(25, trainTripLeg = $$props.trainTripLeg);
    		if ("originPlatform" in $$props) $$invalidate(9, originPlatform = $$props.originPlatform);
    		if ("destinationPlatform" in $$props) $$invalidate(10, destinationPlatform = $$props.destinationPlatform);
    		if ("exitDirection" in $$props) $$invalidate(11, exitDirection = $$props.exitDirection);
    		if ("cancelled" in $$props) $$invalidate(12, cancelled = $$props.cancelled);
    		if ("stops" in $$props) stops = $$props.stops;
    		if ("liveDataAvailable" in $$props) $$invalidate(13, liveDataAvailable = $$props.liveDataAvailable);
    	};

    	let transitDetails;
    	let tripNumber;
    	let line;
    	let backgroundColor;
    	let textColor;
    	let startTimestamp;
    	let startTimeString;
    	let endTimestamp;
    	let endTimeString;
    	let tripRefreshCode;
    	let tripLoaded;
    	let trainTripLeg;
    	let originPlatform;
    	let destinationPlatform;
    	let exitDirection;
    	let cancelled;
    	let stops;
    	let liveDataAvailable;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*step*/ 32768) {
    			// Computed
    			 $$invalidate(3, transitDetails = step.transit_details);
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 tripNumber = transitDetails.trip_short_name;
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 $$invalidate(4, line = transitDetails.line);
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 $$invalidate(5, backgroundColor = getStepColor("train", transitDetails));
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 $$invalidate(6, textColor = getStepTextColor("train", transitDetails));
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 $$invalidate(21, startTimestamp = standardizeTimestamp(transitDetails.departure_time.value));
    		}

    		if ($$self.$$.dirty[0] & /*startTimestamp*/ 2097152) {
    			 $$invalidate(7, startTimeString = toTimeString(startTimestamp));
    		}

    		if ($$self.$$.dirty[0] & /*transitDetails*/ 8) {
    			 $$invalidate(22, endTimestamp = standardizeTimestamp(transitDetails.arrival_time.value));
    		}

    		if ($$self.$$.dirty[0] & /*endTimestamp*/ 4194304) {
    			 $$invalidate(8, endTimeString = toTimeString(endTimestamp));
    		}

    		if ($$self.$$.dirty[0] & /*$stepStore*/ 524288) {
    			 $$invalidate(23, tripRefreshCode = $stepStore.tripRefreshCode);
    		}

    		if ($$self.$$.dirty[0] & /*trainTrip, tripRefreshCode*/ 8454144) {
    			 $$invalidate(24, tripLoaded = trainTrip !== undefined && tripRefreshCode !== undefined);
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTrip*/ 16842752) {
    			 $$invalidate(25, trainTripLeg = tripLoaded ? trainTrip.legs[0] : null);
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTripLeg*/ 50331648) {
    			 $$invalidate(9, originPlatform = tripLoaded ? trainTripLeg.origin.plannedTrack : "?");
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTripLeg*/ 50331648) {
    			 $$invalidate(10, destinationPlatform = tripLoaded ? trainTripLeg.destination.plannedTrack : "?");
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTripLeg*/ 50331648) {
    			 $$invalidate(11, exitDirection = tripLoaded ? trainTripLeg.destination.exitSide : false);
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTripLeg*/ 50331648) {
    			 $$invalidate(12, cancelled = tripLoaded ? trainTripLeg.cancelled : false);
    		}

    		if ($$self.$$.dirty[0] & /*tripLoaded, trainTripLeg*/ 50331648) {
    			 stops = tripLoaded ? trainTripLeg.stops : [];
    		}

    		if ($$self.$$.dirty[0] & /*liveMessage*/ 4) {
    			 $$invalidate(13, liveDataAvailable = liveMessage);
    		}
    	};

    	return [
    		trainDataStatus,
    		trainData,
    		liveMessage,
    		transitDetails,
    		line,
    		backgroundColor,
    		textColor,
    		startTimeString,
    		endTimeString,
    		originPlatform,
    		destinationPlatform,
    		exitDirection,
    		cancelled,
    		liveDataAvailable,
    		stepStore,
    		step
    	];
    }

    class Train extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { step: 15 }, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Train",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[15] === undefined && !("step" in props)) {
    			console.warn("<Train> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Train>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Train>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    async function getBusStop(lat, long) {
        var response = await serverRequest(`/busStop?latLong=${lat},${long}`);
        return response.busStops[0];
    }

    function findDeparture(searchDepartureTime, expectedNumber, passes) {
        searchDepartureTime = standardizeTimestamp(searchDepartureTime);

        const maxSearchDifference = 5 * 60 * 1000; // 5 minutes
        const maxCurrentDifference = 10 * 60 * 1000; // 10 minutes

        return Object.entries(passes)
            // Maps in the key so it can be retrieved within the array
            .map(([key, value]) => {
                return {
                    ...value,
                    key,
                }
            })

            // Filter out any passes that don't have the correct code
            .filter(pass => {
                var { key } = pass;
                var [agency, localAuthority, linePlanningNumber, journeyNumber, fortifyOrderNumber] = key.split("_");

                console.log(linePlanningNumber, expectedNumber);

                return linePlanningNumber.includes(expectedNumber);
            })

            // Maps in the difference to the search time and the current time
            .map(pass => {
                // Parse the timestamp
                var departureDateTime = new Date(pass.ExpectedArrivalTime);
                var departureTimeStamp = standardizeTimestamp(departureDateTime.getTime());

                // Compute the differences
                var differenceToExpectedTime = departureTimeStamp - searchDepartureTime; // Difference to the search time
                var differenceToCurrentTime = Date.now() - departureTimeStamp; // Difference to current time

                return {
                    ...pass,
                    differenceToExpectedTime,
                    differenceToCurrentTime,
                }
            })

            // Filters out any passes that are not within the set parameters
            .filter(pass => {
                var passedExpectedTimeDifference = pass.differenceToExpectedTime >= -maxSearchDifference && pass.differenceToExpectedTime <= maxSearchDifference;
                var passedCurrentTimeDifference = pass.differenceToCurrentTime <= maxCurrentDifference;

                return passedExpectedTimeDifference && passedCurrentTimeDifference;
            })

            // Sort the array asc to show the most likely match first
            .sort((a, b) => a.differenceToExpectedTime - b.differenceToExpectedTime);
    }

    async function getBusTrip(code) {
        return serverRequest(`/busJourney/${code}`);
    }

    function getBusStopsFromJourney(journey) {
        if (journey === undefined || journey.Stops === undefined) return [];
        var stops = Object.values(journey.Stops);
        var foundCurrent = false;

        // Maps in whether or not the stop is the current one
        stops = stops.map(stop => {
            stop.isCurrentStop = false;

            // Sets the first stop with 'driving' to the current step
            if ((stop.TripStopStatus === "DRIVING" || stop.TripStopStatus === "ARRIVED") && !foundCurrent) {
                stop.isCurrentStop = true;
                foundCurrent = true;
            }

            return stop;
        });

        return stops;
    }

    function getCurrentStop(stops) {
        for (var stop of stops) {
            if (stop.isCurrentStop) {
                return stop;
            }
        }

        return null;
    }

    // Returns the last, current and two next stops
    function getActiveStops(stops) {
        var currentStop = getCurrentStop(stops);
        var index = stops.indexOf(currentStop);

        if (index === -1) return [];

        var result = [];

        var last = stops[index - 1];
        var nextOne = stops[index + 1];
        var nextTwo = stops[index + 2];

        if (last !== undefined) result.push(last);

        result.push(currentStop);

        if (nextOne !== undefined) result.push(nextOne);
        if (nextTwo !== undefined) result.push(nextTwo);

        return result;
    }

    /* src\components\RouteStep\Stop.svelte generated by Svelte v3.19.2 */

    const file$9 = "src\\components\\RouteStep\\Stop.svelte";

    function create_fragment$a(ctx) {
    	let div;
    	let p;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			if (default_slot) default_slot.c();
    			attr_dev(p, "class", "svelte-csyeyn");
    			add_location(p, file$9, 1, 4, 54);
    			attr_dev(div, "class", div_class_value = "busStop " + (/*current*/ ctx[0] ? "current" : "") + " svelte-csyeyn");
    			add_location(div, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 2) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    			}

    			if (!current || dirty & /*current*/ 1 && div_class_value !== (div_class_value = "busStop " + (/*current*/ ctx[0] ? "current" : "") + " svelte-csyeyn")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	var { current = false } = $$props;
    	const writable_props = ["current"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Stop> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Stop", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ current });

    	$$self.$inject_state = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [current, $$scope, $$slots];
    }

    class Stop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { current: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stop",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get current() {
    		throw new Error("<Stop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set current(value) {
    		throw new Error("<Stop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\RouteStep\BusStop.svelte generated by Svelte v3.19.2 */
    const file$a = "src\\components\\RouteStep\\BusStop.svelte";

    // (1:0) <Stop current={stop.isCurrentStop}>
    function create_default_slot$2(ctx) {
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*stop*/ ctx[0].TimingPointName + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[1]);
    			add_location(span, file$a, 1, 4, 41);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 2 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[1])) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*stop*/ 1 && t1_value !== (t1_value = /*stop*/ ctx[0].TimingPointName + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(1:0) <Stop current={stop.isCurrentStop}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let current;

    	const stop_1 = new Stop({
    			props: {
    				current: /*stop*/ ctx[0].isCurrentStop,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(stop_1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(stop_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const stop_1_changes = {};
    			if (dirty & /*stop*/ 1) stop_1_changes.current = /*stop*/ ctx[0].isCurrentStop;

    			if (dirty & /*$$scope, stop, icon*/ 7) {
    				stop_1_changes.$$scope = { dirty, ctx };
    			}

    			stop_1.$set(stop_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stop_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stop_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stop_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getIcon(stop) {
    	var status = stop.TripStopStatus;
    	if (status === "PASSED") return "check-all"; else if (status === "ARRIVED") return "check"; else return "alarm";
    }

    function instance$b($$self, $$props, $$invalidate) {
    	var { stop } = $$props;
    	const writable_props = ["stop"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BusStop> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BusStop", $$slots, []);

    	$$self.$set = $$props => {
    		if ("stop" in $$props) $$invalidate(0, stop = $$props.stop);
    	};

    	$$self.$capture_state = () => ({ Stop, stop, getIcon, icon });

    	$$self.$inject_state = $$props => {
    		if ("stop" in $$props) $$invalidate(0, stop = $$props.stop);
    		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
    	};

    	let icon;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*stop*/ 1) {
    			// Computed
    			 $$invalidate(1, icon = getIcon(stop));
    		}
    	};

    	return [stop, icon];
    }

    class BusStop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { stop: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BusStop",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*stop*/ ctx[0] === undefined && !("stop" in props)) {
    			console.warn("<BusStop> was created without expected prop 'stop'");
    		}
    	}

    	get stop() {
    		throw new Error("<BusStop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stop(value) {
    		throw new Error("<BusStop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\RouteStep\BusTimeline.svelte generated by Svelte v3.19.2 */

    const { console: console_1 } = globals;
    const file$b = "src\\components\\RouteStep\\BusTimeline.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (1:0) {#if enabled}
    function create_if_block$3(ctx) {
    	let div1;
    	let t;
    	let div0;
    	let span;
    	let each_value = /*stops*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div0 = element("div");
    			span = element("span");
    			attr_dev(span, "class", "mdi mdi-chevron-right svelte-1vc6hv");
    			add_location(span, file$b, 6, 12, 214);
    			attr_dev(div0, "class", "currentPosition svelte-1vc6hv");
    			add_location(div0, file$b, 5, 8, 171);
    			attr_dev(div1, "class", "busTimeline svelte-1vc6hv");
    			add_location(div1, file$b, 1, 4, 19);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getStyle, stops*/ 5) {
    				each_value = /*stops*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(1:0) {#if enabled}",
    		ctx
    	});

    	return block;
    }

    // (3:8) {#each stops as stop}
    function create_each_block$1(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "busSection svelte-1vc6hv");
    			attr_dev(div, "style", div_style_value = /*getStyle*/ ctx[2](/*stop*/ ctx[5]));
    			add_location(div, file$b, 3, 12, 89);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stops*/ 1 && div_style_value !== (div_style_value = /*getStyle*/ ctx[2](/*stop*/ ctx[5]))) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(3:8) {#each stops as stop}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let if_block_anchor;
    	let if_block = /*enabled*/ ctx[1] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*enabled*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	var { stops = [] } = $$props;

    	// Functions
    	function getStyle(stop) {
    		var color = "transparent";
    		var status = stop.TripStopStatus;

    		if (stop === currentStop) {
    			color = "var(--stepBusCurrent)";
    		} else if (status === "PASSED" || status === "ARRIVED") {
    			color = "var(--stepBusPassed)";
    		}

    		return `width: ${percentage}%; background-color: ${color};`;
    	}

    	const writable_props = ["stops"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<BusTimeline> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BusTimeline", $$slots, []);

    	$$self.$set = $$props => {
    		if ("stops" in $$props) $$invalidate(0, stops = $$props.stops);
    	};

    	$$self.$capture_state = () => ({
    		getCurrentStop,
    		stops,
    		getStyle,
    		enabled,
    		percentage,
    		currentStop
    	});

    	$$self.$inject_state = $$props => {
    		if ("stops" in $$props) $$invalidate(0, stops = $$props.stops);
    		if ("enabled" in $$props) $$invalidate(1, enabled = $$props.enabled);
    		if ("percentage" in $$props) percentage = $$props.percentage;
    		if ("currentStop" in $$props) currentStop = $$props.currentStop;
    	};

    	let enabled;
    	let percentage;
    	let currentStop;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*stops*/ 1) {
    			// Computed
    			 $$invalidate(1, enabled = stops.length > 0);
    		}

    		if ($$self.$$.dirty & /*stops*/ 1) {
    			 percentage = 100 / stops.length;
    		}

    		if ($$self.$$.dirty & /*stops*/ 1) {
    			 currentStop = getCurrentStop(stops);
    		}

    		if ($$self.$$.dirty & /*stops*/ 1) {
    			 console.log(stops);
    		}
    	};

    	return [stops, enabled, getStyle];
    }

    class BusTimeline extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { stops: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BusTimeline",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get stops() {
    		throw new Error("<BusTimeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stops(value) {
    		throw new Error("<BusTimeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\RouteStep\Bus.svelte generated by Svelte v3.19.2 */

    const { console: console_1$1 } = globals;
    const file$c = "src\\components\\RouteStep\\Bus.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[27] = list[i];
    	return child_ctx;
    }

    // (2:4) <span slot="left">
    function create_left_slot_4$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*startTimeString*/ ctx[4]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$c, 1, 4, 15);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*startTimeString*/ 16) set_data_dev(t, /*startTimeString*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_4$1.name,
    		type: "slot",
    		source: "(2:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (4:8) <HeadSign icon="bus" {backgroundColor} {textColor}>
    function create_default_slot_6$1(ctx) {
    	let t_value = /*line*/ ctx[1].short_name + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*line*/ 2 && t_value !== (t_value = /*line*/ ctx[1].short_name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(4:8) <HeadSign icon=\\\"bus\\\" {backgroundColor} {textColor}>",
    		ctx
    	});

    	return block;
    }

    // (3:4) <span slot="center">
    function create_center_slot$1(ctx) {
    	let span;
    	let current;

    	const headsign = new HeadSign({
    			props: {
    				icon: "bus",
    				backgroundColor: /*backgroundColor*/ ctx[2],
    				textColor: /*textColor*/ ctx[3],
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(headsign.$$.fragment);
    			attr_dev(span, "slot", "center");
    			add_location(span, file$c, 2, 4, 63);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(headsign, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headsign_changes = {};
    			if (dirty & /*backgroundColor*/ 4) headsign_changes.backgroundColor = /*backgroundColor*/ ctx[2];
    			if (dirty & /*textColor*/ 8) headsign_changes.textColor = /*textColor*/ ctx[3];

    			if (dirty & /*$$scope, line*/ 1073741826) {
    				headsign_changes.$$scope = { dirty, ctx };
    			}

    			headsign.$set(headsign_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headsign.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headsign.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(headsign);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_center_slot$1.name,
    		type: "slot",
    		source: "(3:4) <span slot=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (6:4) <span slot="right">
    function create_right_slot$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*endTimeString*/ ctx[5]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$c, 5, 4, 191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*endTimeString*/ 32) set_data_dev(t, /*endTimeString*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot$1.name,
    		type: "slot",
    		source: "(6:4) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (1:0) <InfoRow>
    function create_default_slot_5$1(ctx) {
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = space();
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(1:0) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (9:4) <span slot="left">
    function create_left_slot_3$1(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*transitDetails*/ ctx[0].departure_stop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-arrow-expand-right");
    			add_location(span1, file$c, 8, 22, 279);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$c, 8, 4, 261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*transitDetails*/ 1 && t1_value !== (t1_value = /*transitDetails*/ ctx[0].departure_stop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_3$1.name,
    		type: "slot",
    		source: "(9:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:4) <span slot="left">
    function create_left_slot_2$1(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*transitDetails*/ ctx[0].arrival_stop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-arrow-collapse-right");
    			add_location(span1, file$c, 11, 22, 418);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$c, 11, 4, 400);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*transitDetails*/ 1 && t1_value !== (t1_value = /*transitDetails*/ ctx[0].arrival_stop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_2$1.name,
    		type: "slot",
    		source: "(12:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (15:4) <span slot="left">
    function create_left_slot_1$1(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(/*currentStopText*/ ctx[7]);
    			attr_dev(span1, "class", "mdi mdi-rss");
    			add_location(span1, file$c, 14, 22, 557);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$c, 14, 4, 539);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentStopText*/ 128) set_data_dev(t1, /*currentStopText*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1$1.name,
    		type: "slot",
    		source: "(15:4) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (19:8) <span slot="left">
    function create_left_slot$1(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1_value = /*transitDetails*/ ctx[0].line.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span1, "class", "mdi mdi-arrow-left-right");
    			add_location(span1, file$c, 18, 26, 682);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$c, 18, 8, 664);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*transitDetails*/ 1 && t1_value !== (t1_value = /*transitDetails*/ ctx[0].line.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$1.name,
    		type: "slot",
    		source: "(19:8) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#each activeStops as stop}
    function create_each_block$2(ctx) {
    	let current;

    	const busstop = new BusStop({
    			props: { stop: /*stop*/ ctx[27] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(busstop.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(busstop, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const busstop_changes = {};
    			if (dirty & /*activeStops*/ 64) busstop_changes.stop = /*stop*/ ctx[27];
    			busstop.$set(busstop_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(busstop.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(busstop.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(busstop, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(22:4) {#each activeStops as stop}",
    		ctx
    	});

    	return block;
    }

    // (17:0) <DropDown>
    function create_default_slot$3(ctx) {
    	let t;
    	let each_1_anchor;
    	let current;

    	const inforow = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*activeStops*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			create_component(inforow.$$.fragment);
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow, target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow_changes = {};

    			if (dirty & /*$$scope, transitDetails*/ 1073741825) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);

    			if (dirty & /*activeStops*/ 64) {
    				each_value = /*activeStops*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow, detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(17:0) <DropDown>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const inforow0 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_5$1],
    					right: [create_right_slot$1],
    					center: [create_center_slot$1],
    					left: [create_left_slot_4$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow1 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow2 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow3 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const dropdown = new DropDown({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			create_component(inforow1.$$.fragment);
    			t1 = space();
    			create_component(inforow2.$$.fragment);
    			t2 = space();
    			create_component(inforow3.$$.fragment);
    			t3 = space();
    			create_component(dropdown.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(inforow1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(inforow2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(inforow3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inforow0_changes = {};

    			if (dirty & /*$$scope, endTimeString, backgroundColor, textColor, line, startTimeString*/ 1073741886) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);
    			const inforow1_changes = {};

    			if (dirty & /*$$scope, transitDetails*/ 1073741825) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const inforow2_changes = {};

    			if (dirty & /*$$scope, transitDetails*/ 1073741825) {
    				inforow2_changes.$$scope = { dirty, ctx };
    			}

    			inforow2.$set(inforow2_changes);
    			const inforow3_changes = {};

    			if (dirty & /*$$scope, currentStopText*/ 1073741952) {
    				inforow3_changes.$$scope = { dirty, ctx };
    			}

    			inforow3.$set(inforow3_changes);
    			const dropdown_changes = {};

    			if (dirty & /*$$scope, activeStops, transitDetails*/ 1073741889) {
    				dropdown_changes.$$scope = { dirty, ctx };
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(inforow2.$$.fragment, local);
    			transition_in(inforow3.$$.fragment, local);
    			transition_in(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(inforow2.$$.fragment, local);
    			transition_out(inforow3.$$.fragment, local);
    			transition_out(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(inforow2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(inforow3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $stepStore;
    	var { step } = $$props;

    	// Data
    	const maxTimeAfterStart = 15 * 60 * 1000; // 15 minutes. The time after which the app should stop refreshing the data because it's eather invalid or non existent

    	const refreshTime = 15 * 1000; // 30 seconds. The interfal at which the app will ping the server for updates after it found the trip
    	const checkInterval = 30 * 1000; // 30 seconds. Delay the checks should wait before trying again.
    	const checkStartBuffer = 5 * 60 * 1000; // 5 minutes. How many minutes before the expected departute time it should checking.
    	const checkEndBuffer = 5 * 50 * 1000; // 5 minutes. How many minutes it should keep checking after the exptected departure time.
    	var stepStore = createStepStore(step.id, {});
    	validate_store(stepStore, "stepStore");
    	component_subscribe($$self, stepStore, value => $$invalidate(13, $stepStore = value));
    	set_store_value(stepStore, $stepStore.maxAge = 15 * 60 * 1000, $stepStore); // 15 minutes;
    	set_store_value(stepStore, $stepStore.timestamp = Date.now(), $stepStore);
    	var refreshTripTimer = setInterval(refreshBusJourney, refreshTime);
    	var busStop;
    	var busJourney;
    	var busJourneyFoundTimestamp;

    	// Functions
    	async function refreshBusJourney() {
    		if (Date.now() - busJourneyFoundTimestamp > maxTimeAfterStart) {
    			if (refreshTripTimer) clearInterval(refreshTripTimer);
    			return;
    		}

    		if (busJourneyFound) {
    			$$invalidate(11, busJourney = await getBusTrip($stepStore.busJourneyCode));
    		}
    	}

    	function getCurrentStopText(currentStop) {
    		if (!currentStop) return "Geen live data";

    		if (currentStop.TripStopStatus === "ARRIVED") {
    			return `Aangekomen op ${currentStop.TimingPointName}`;
    		} else {
    			// Driving
    			return `Rijd naar ${currentStop.TimingPointName}`;
    		}
    	}

    	// On create
    	onMount(async () => {
    		// Get the location of the busstop and meta data from server
    		var { lat, lng } = step.start_location;

    		busStop = await getBusStop(lat, lng);

    		// Early exit if the journeyCode is found in local storage
    		if (busJourneyFound) {
    			busJourneyFoundTimestamp = Date.now();

    			// Do an initial check
    			refreshBusJourney();
    		}

    		// Recursive function for finding the departure
    		const checkDeparture = delay => {
    			setTimeout(
    				async () => {
    					if (Date.now() - startTimestamp > checkEndBuffer) return false;
    					busStop = await getBusStop(lat, lng);
    					var departures = findDeparture(step.transit_details.departure_time.value, line.short_name, busStop.Passes);

    					if (departures.length > 0) {
    						set_store_value(stepStore, $stepStore.busJourneyCode = departures[0].key, $stepStore);
    						busJourneyFoundTimestamp = Date.now();
    						queueMicrotask(refreshBusJourney);
    					} else {
    						checkDeparture(checkInterval);
    					}
    				},
    				delay
    			);
    		};

    		var now = Date.now();
    		var startCheckAfter = startTimestamp - now - checkStartBuffer;

    		// Do a check now if there is a wait and start the timer
    		if (startCheckAfter > 0) checkDeparture(0);

    		checkDeparture(startCheckAfter);
    	});

    	// On destroy
    	onDestroy(() => {
    		clearInterval(refreshTripTimer);
    	});

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<Bus> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Bus", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(9, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		getBusStop,
    		findDeparture,
    		getBusStopsFromJourney,
    		getBusTrip,
    		getActiveStops,
    		getCurrentStop,
    		getStepColor,
    		getStepTextColor,
    		createStepStore,
    		standardizeTimestamp,
    		toTimeString,
    		InfoRow,
    		HeadSign,
    		DropDown,
    		BusStop,
    		BusTimeline,
    		step,
    		maxTimeAfterStart,
    		refreshTime,
    		checkInterval,
    		checkStartBuffer,
    		checkEndBuffer,
    		stepStore,
    		refreshTripTimer,
    		busStop,
    		busJourney,
    		busJourneyFoundTimestamp,
    		refreshBusJourney,
    		getCurrentStopText,
    		$stepStore,
    		transitDetails,
    		line,
    		backgroundColor,
    		textColor,
    		startTimestamp,
    		startTimeString,
    		endTimestamp,
    		endTimeString,
    		busJourneyFound,
    		stops,
    		activeStops,
    		currentStop,
    		currentStopText
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(9, step = $$props.step);
    		if ("stepStore" in $$props) $$invalidate(8, stepStore = $$props.stepStore);
    		if ("refreshTripTimer" in $$props) refreshTripTimer = $$props.refreshTripTimer;
    		if ("busStop" in $$props) busStop = $$props.busStop;
    		if ("busJourney" in $$props) $$invalidate(11, busJourney = $$props.busJourney);
    		if ("busJourneyFoundTimestamp" in $$props) busJourneyFoundTimestamp = $$props.busJourneyFoundTimestamp;
    		if ("transitDetails" in $$props) $$invalidate(0, transitDetails = $$props.transitDetails);
    		if ("line" in $$props) $$invalidate(1, line = $$props.line);
    		if ("backgroundColor" in $$props) $$invalidate(2, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(3, textColor = $$props.textColor);
    		if ("startTimestamp" in $$props) $$invalidate(14, startTimestamp = $$props.startTimestamp);
    		if ("startTimeString" in $$props) $$invalidate(4, startTimeString = $$props.startTimeString);
    		if ("endTimestamp" in $$props) $$invalidate(15, endTimestamp = $$props.endTimestamp);
    		if ("endTimeString" in $$props) $$invalidate(5, endTimeString = $$props.endTimeString);
    		if ("busJourneyFound" in $$props) $$invalidate(16, busJourneyFound = $$props.busJourneyFound);
    		if ("stops" in $$props) $$invalidate(17, stops = $$props.stops);
    		if ("activeStops" in $$props) $$invalidate(6, activeStops = $$props.activeStops);
    		if ("currentStop" in $$props) $$invalidate(18, currentStop = $$props.currentStop);
    		if ("currentStopText" in $$props) $$invalidate(7, currentStopText = $$props.currentStopText);
    	};

    	let transitDetails;
    	let line;
    	let backgroundColor;
    	let textColor;
    	let startTimestamp;
    	let startTimeString;
    	let endTimestamp;
    	let endTimeString;
    	let busJourneyFound;
    	let stops;
    	let activeStops;
    	let currentStop;
    	let currentStopText;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 512) {
    			// Computed
    			 $$invalidate(0, transitDetails = step.transit_details);
    		}

    		if ($$self.$$.dirty & /*transitDetails*/ 1) {
    			 $$invalidate(1, line = transitDetails.line);
    		}

    		if ($$self.$$.dirty & /*transitDetails*/ 1) {
    			 $$invalidate(2, backgroundColor = getStepColor("bus", transitDetails));
    		}

    		if ($$self.$$.dirty & /*transitDetails*/ 1) {
    			 $$invalidate(3, textColor = getStepTextColor("bus", transitDetails));
    		}

    		if ($$self.$$.dirty & /*transitDetails*/ 1) {
    			 $$invalidate(14, startTimestamp = standardizeTimestamp(transitDetails.departure_time.value));
    		}

    		if ($$self.$$.dirty & /*startTimestamp*/ 16384) {
    			 $$invalidate(4, startTimeString = toTimeString(startTimestamp));
    		}

    		if ($$self.$$.dirty & /*transitDetails*/ 1) {
    			 $$invalidate(15, endTimestamp = standardizeTimestamp(transitDetails.arrival_time.value));
    		}

    		if ($$self.$$.dirty & /*endTimestamp*/ 32768) {
    			 $$invalidate(5, endTimeString = toTimeString(endTimestamp));
    		}

    		if ($$self.$$.dirty & /*$stepStore*/ 8192) {
    			 $$invalidate(16, busJourneyFound = $stepStore.busJourneyCode !== undefined);
    		}

    		if ($$self.$$.dirty & /*busJourney*/ 2048) {
    			 $$invalidate(17, stops = getBusStopsFromJourney(busJourney));
    		}

    		if ($$self.$$.dirty & /*stops*/ 131072) {
    			 $$invalidate(6, activeStops = getActiveStops(stops));
    		}

    		if ($$self.$$.dirty & /*stops*/ 131072) {
    			 $$invalidate(18, currentStop = getCurrentStop(stops));
    		}

    		if ($$self.$$.dirty & /*currentStop*/ 262144) {
    			 $$invalidate(7, currentStopText = getCurrentStopText(currentStop));
    		}

    		if ($$self.$$.dirty & /*$stepStore, busJourneyFound*/ 73728) {
    			 console.log($stepStore, busJourneyFound);
    		}
    	};

    	return [
    		transitDetails,
    		line,
    		backgroundColor,
    		textColor,
    		startTimeString,
    		endTimeString,
    		activeStops,
    		currentStopText,
    		stepStore,
    		step
    	];
    }

    class Bus extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { step: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bus",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[9] === undefined && !("step" in props)) {
    			console_1$1.warn("<Bus> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Bus>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Bus>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\RouteStep\PlatformChange.svelte generated by Svelte v3.19.2 */

    const file$d = "src\\components\\RouteStep\\PlatformChange.svelte";

    function create_fragment$e(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			t1 = text(/*durationInMinutes*/ ctx[0]);
    			t2 = space();
    			t3 = text(/*minuteText*/ ctx[1]);
    			attr_dev(span, "class", "mdi mdi-swap-horizontal");
    			add_location(span, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*durationInMinutes*/ 1) set_data_dev(t1, /*durationInMinutes*/ ctx[0]);
    			if (dirty & /*minuteText*/ 2) set_data_dev(t3, /*minuteText*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PlatformChange> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("PlatformChange", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({ step, durationInMinutes, minuteText });

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("durationInMinutes" in $$props) $$invalidate(0, durationInMinutes = $$props.durationInMinutes);
    		if ("minuteText" in $$props) $$invalidate(1, minuteText = $$props.minuteText);
    	};

    	let durationInMinutes;
    	let minuteText;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 4) {
    			// Computed
    			 $$invalidate(0, durationInMinutes = Math.round(step.duration.value / 60));
    		}

    		if ($$self.$$.dirty & /*durationInMinutes*/ 1) {
    			 $$invalidate(1, minuteText = durationInMinutes > 1 ? "minuten" : "minuut");
    		}
    	};

    	return [durationInMinutes, minuteText, step];
    }

    class PlatformChange extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { step: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PlatformChange",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[2] === undefined && !("step" in props)) {
    			console.warn("<PlatformChange> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<PlatformChange>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<PlatformChange>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const stepTypeComponentMap = {
        walking: Walking,
        train: Train,
        bus: Bus,
        platformChange: PlatformChange,
    };

    function getStepInfoComponent(stepType) {
        return stepTypeComponentMap[stepType];
    }

    function getStepType(step) {
        if (step.stepType !== undefined) return step.stepType;

        var travelMode = step.travel_mode.toLowerCase();

        if (travelMode === "transit") {
            var htmlInstructions = step.html_instructions.toLowerCase();

            if (htmlInstructions.includes("bus")) {
                return "bus";
            } else if (htmlInstructions.includes("train")) {
                return "train";
            }
        } else {
            return travelMode;
        }
    }

    function getStepColor(stepType, transitDetails) {
        if (typeof stepType !== "string") {
            transitDetails = stepType.transit_details;
            stepType = getStepType(stepType);
        }

        if (stepType === "walking" || stepType === "platformChange") return "var(--stepWalkingColor)";

        if (stepType === "bus") {
            return transitDetails.line.color;
        }

        if (stepType === "train") {
            var trainType = getTrainType(transitDetails);

            if (trainType === "intercity") {
                return "var(--stepTrainIntercityColor)";
            } else {
                return "var(--stepTrainSprinterColor)";
            }
        }
    }

    function getStepTextColor(stepType, transitDetails) {
        if (stepType === "walking" || stepType === "platformChange") return "";

        if (stepType === "bus") {
            return transitDetails.line.text_color;
        }

        if (stepType === "train") {
            var trainType = getTrainType(transitDetails);

            if (trainType === "intercity") {
                return "var(--stepTrainIntercityTextColor)";
            } else {
                return "var(--stepTrainSprinterTextColor)";
            }
        }
    }

    function getStepIcon({ travelMode }) {
        if (travelMode === "walking") return "walk";

        return travelMode.toLowerCase();
    }

    function getStepBorderStyle(step) {
        var stepType = getStepType(step);

        if (stepType === "bus") return "dashed";
        else if (stepType === "train") return "solid";
        else return "dotted";
    }

    function getStepBorderStyling(step) {
        return `border-style: ${getStepBorderStyle(step)};
    border-color: ${getStepColor(step)};`
    }

    function getTrainType(transitDetails) {
        return transitDetails.line.short_name.toLowerCase();
    }

    function createStepStore(storeName, data = {}) {
        var store = writable({
            ...data,
        });

        prepareStoreLinked(store, "store_" + storeName);

        return store;
    }

    /**
     * @id quickHash
     * @function quickHash
     * Murmur hash optimized for performance, not collision avoidance.
     * @param {string} key - the string to hash
     * @param {number} seed - a seed for hashing
     * @returns {string} hashOfKey - A string of 5 to 7 alpha-numeric characters
     */
    var lib = function (key, seed) {
      var remainder, bytes, h1, h1b, c1, c2, k1, i;
      seed = 1;
      remainder = key.length & 3; // key.length % 4
      bytes = key.length - remainder;
      h1 = seed;
      c1 = 0xcc9e2d51;
      c2 = 0x1b873593;
      i = 0;

      while (i < bytes) {
        k1 =
          ((key.charCodeAt(i) & 0xff)) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;

        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
      }

      k1 = 0;

      // @todo: replace with if else (faster)
      switch (remainder) {
        case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16; //eslint-disable-line
        case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8; //eslint-disable-line
        case 1: k1 ^= (key.charCodeAt(i) & 0xff); //eslint-disable-line
          k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
          k1 = (k1 << 15) | (k1 >>> 17);
          k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
          h1 ^= k1;
      }

      h1 ^= key.length;

      h1 ^= h1 >>> 16;
      h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= h1 >>> 13;
      h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
      h1 ^= h1 >>> 16;

      return (h1 >>> 0).toString(36)
    };

    const routeStore = writable({});

    prepareStoreLinked(routeStore, "currentRoute");

    function getGlobalPolyline() {
        return getSteps()
            .map(step => {
                var points = decodeGoogleMapPolyline(step.polyline.points);

                return points.map(point => {
                    return {
                        ...point,
                        step,
                    }
                });
            })
            .flat(1);
    }

    function getSteps() {
        if (Object.keys(routeStore.get()).length === 0) return [];

        return processSteps(routeStore.get().legs[0].steps);
    }

    function startRoute(route) {
        endRoute();

        // Done to make sure svelte re-renders the UI
        queueMicrotask(() => {
            routeStore.set(route);
        });
    }

    function endRoute() {
        routeStore.set({});
    }

    function processSteps(steps) {
        // Add step type to every step
        steps = steps.map((step, index) => {
            return {
                ...step,
                index,
                stepType: getStepType(step),
                travelMode: step.travel_mode.toLowerCase(),
                id: lib(JSON.stringify(step)),
            }
        });

        // Filter's out intermediary walking steps
        steps = steps.map((step, index) => {
            var lastStep = null;
            var nextStep = null;

            if (index > 0) {
                lastStep = steps[index - 1];
            }

            if (index < steps.length - 1) {
                nextStep = steps[index + 1];
            }

            // Filters out any walking steps that show 2 minutes
            var shouldFilter = Math.round(step.duration.value / 120) === 1;

            if (step.stepType === "walking" && shouldFilter && lastStep && nextStep) {
                if (lastStep.travelMode === "transit" && nextStep.travelMode === "transit") {
                    return {
                        ...step,
                        stepType: "platformChange"
                    };
                }
            }

            return step;
        });

        return steps;
    }

    function getCurrentStep() {
        if (getSteps().length === 0 || !locationIsValid()) return 9999999;

        var { lat, long } = locationStore.get();
        var polyline = getGlobalPolyline();
        
        polyline = polyline.map(location => {
            var locationLat = location.lat;
            var locationLong = location.lng;

            var differenceLat = lat - locationLat;
            var differenceLong = long - locationLong;

            var distance = Math.sqrt(differenceLat ** 2 + differenceLong ** 2);

            return {
                ...location,
                distance,
            }
        })
        .sort((a, b) => a.distance - b.distance);

        return polyline[0].step;
    }

    /* src\components\Layout\LayoutCenter.svelte generated by Svelte v3.19.2 */

    const file$e = "src\\components\\Layout\\LayoutCenter.svelte";

    function create_fragment$f(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-cijaaz");
    			add_location(div, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LayoutCenter> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("LayoutCenter", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class LayoutCenter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LayoutCenter",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\components\Layout\LayoutExpanded.svelte generated by Svelte v3.19.2 */

    const file$f = "src\\components\\Layout\\LayoutExpanded.svelte";

    function create_fragment$g(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-ajjwrz");
    			add_location(div, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LayoutExpanded> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("LayoutExpanded", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class LayoutExpanded extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LayoutExpanded",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src\components\Step.svelte generated by Svelte v3.19.2 */
    const file$g = "src\\components\\Step.svelte";

    // (1:0) {#if isCurrentStep && firstStep}
    function create_if_block_1$1(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = LayoutCenter;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, travelMode, stepType, borderColor*/ 8206) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = LayoutCenter)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(1:0) {#if isCurrentStep && firstStep}",
    		ctx
    	});

    	return block;
    }

    // (2:4) <svelte:component this={LayoutCenter}>
    function create_default_slot_2$2(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[1] + " " + /*stepType*/ ctx[2] + " svelte-1308ywp");
    			set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			add_location(div, file$g, 2, 8, 86);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*travelMode, stepType*/ 6 && div_class_value !== (div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[1] + " " + /*stepType*/ ctx[2] + " svelte-1308ywp")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*borderColor*/ 8) {
    				set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(2:4) <svelte:component this={LayoutCenter}>",
    		ctx
    	});

    	return block;
    }

    // (6:0) <svelte:component this={currentLayout}>
    function create_default_slot_1$2(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	var switch_value = /*stepInfoComponent*/ ctx[4];

    	function switch_props(ctx) {
    		return {
    			props: { step: /*step*/ ctx[0] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div, "class", div_class_value = "routeStep " + /*travelMode*/ ctx[1] + " " + (/*isCurrentStep*/ ctx[5] && "current") + " " + /*stepType*/ ctx[2] + " svelte-1308ywp");
    			set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			add_location(div, file$g, 6, 4, 265);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*step*/ 1) switch_instance_changes.step = /*step*/ ctx[0];

    			if (switch_value !== (switch_value = /*stepInfoComponent*/ ctx[4])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			if (!current || dirty & /*travelMode, isCurrentStep, stepType*/ 38 && div_class_value !== (div_class_value = "routeStep " + /*travelMode*/ ctx[1] + " " + (/*isCurrentStep*/ ctx[5] && "current") + " " + /*stepType*/ ctx[2] + " svelte-1308ywp")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*borderColor*/ 8) {
    				set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(6:0) <svelte:component this={currentLayout}>",
    		ctx
    	});

    	return block;
    }

    // (11:0) {#if isCurrentStep && lastStep}
    function create_if_block$4(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = LayoutCenter;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, travelMode, stepType, borderColor*/ 8206) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = LayoutCenter)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(11:0) {#if isCurrentStep && lastStep}",
    		ctx
    	});

    	return block;
    }

    // (12:4) <svelte:component this={LayoutCenter}>
    function create_default_slot$4(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[1] + " " + /*stepType*/ ctx[2] + " svelte-1308ywp");
    			set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			add_location(div, file$g, 12, 8, 560);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*travelMode, stepType*/ 6 && div_class_value !== (div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[1] + " " + /*stepType*/ ctx[2] + " svelte-1308ywp")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*borderColor*/ 8) {
    				set_style(div, "border-color", /*borderColor*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(12:4) <svelte:component this={LayoutCenter}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let t0;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*isCurrentStep*/ ctx[5] && /*firstStep*/ ctx[6] && create_if_block_1$1(ctx);
    	var switch_value = /*currentLayout*/ ctx[8];

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	let if_block1 = /*isCurrentStep*/ ctx[5] && /*lastStep*/ ctx[7] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isCurrentStep*/ ctx[5] && /*firstStep*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, travelMode, isCurrentStep, stepType, borderColor, stepInfoComponent, step*/ 8255) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*currentLayout*/ ctx[8])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, t1.parentNode, t1);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			if (/*isCurrentStep*/ ctx[5] && /*lastStep*/ ctx[7]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let $locationStore;
    	validate_store(locationStore, "locationStore");
    	component_subscribe($$self, locationStore, $$value => $$invalidate(11, $locationStore = $$value));
    	var { step } = $$props;

    	// Functions
    	function getIsCurrentStep() {
    		var currentStep = getCurrentStep();
    		return currentStep.index === step.index;
    	}

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Step> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Step", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		getStepColor,
    		getStepTextColor,
    		getStepType,
    		getStepInfoComponent,
    		onMount,
    		locationStore,
    		getCurrentStep,
    		routeStore,
    		getSteps,
    		toTimeString,
    		LayoutCenter,
    		LayoutExpanded,
    		step,
    		getIsCurrentStep,
    		travelMode,
    		transitDetails,
    		stepType,
    		borderColor,
    		textColor,
    		stepInfoComponent,
    		isCurrentStep,
    		$locationStore,
    		firstStep,
    		lastStep,
    		currentLayout
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("travelMode" in $$props) $$invalidate(1, travelMode = $$props.travelMode);
    		if ("transitDetails" in $$props) $$invalidate(9, transitDetails = $$props.transitDetails);
    		if ("stepType" in $$props) $$invalidate(2, stepType = $$props.stepType);
    		if ("borderColor" in $$props) $$invalidate(3, borderColor = $$props.borderColor);
    		if ("textColor" in $$props) textColor = $$props.textColor;
    		if ("stepInfoComponent" in $$props) $$invalidate(4, stepInfoComponent = $$props.stepInfoComponent);
    		if ("isCurrentStep" in $$props) $$invalidate(5, isCurrentStep = $$props.isCurrentStep);
    		if ("firstStep" in $$props) $$invalidate(6, firstStep = $$props.firstStep);
    		if ("lastStep" in $$props) $$invalidate(7, lastStep = $$props.lastStep);
    		if ("currentLayout" in $$props) $$invalidate(8, currentLayout = $$props.currentLayout);
    	};

    	let travelMode;
    	let transitDetails;
    	let stepType;
    	let borderColor;
    	let textColor;
    	let stepInfoComponent;
    	let isCurrentStep;
    	let firstStep;
    	let lastStep;
    	let currentLayout;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 1) {
    			// Computed
    			 $$invalidate(1, travelMode = step.travel_mode.toLowerCase());
    		}

    		if ($$self.$$.dirty & /*travelMode, step*/ 3) {
    			 $$invalidate(9, transitDetails = travelMode === "transit" ? step.transit_details : {});
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			 $$invalidate(2, stepType = getStepType(step));
    		}

    		if ($$self.$$.dirty & /*stepType, transitDetails*/ 516) {
    			 $$invalidate(3, borderColor = getStepColor(stepType, transitDetails));
    		}

    		if ($$self.$$.dirty & /*stepType, transitDetails*/ 516) {
    			 textColor = getStepTextColor(stepType, transitDetails);
    		}

    		if ($$self.$$.dirty & /*stepType*/ 4) {
    			 $$invalidate(4, stepInfoComponent = getStepInfoComponent(stepType));
    		}

    		if ($$self.$$.dirty & /*$locationStore*/ 2048) {
    			 $$invalidate(5, isCurrentStep = getIsCurrentStep());
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			 $$invalidate(6, firstStep = step.index === 0);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			 $$invalidate(7, lastStep = step.index === getSteps().length - 1);
    		}

    		if ($$self.$$.dirty & /*isCurrentStep*/ 32) {
    			 $$invalidate(8, currentLayout = isCurrentStep ? LayoutExpanded : LayoutCenter);
    		}
    	};

    	return [
    		step,
    		travelMode,
    		stepType,
    		borderColor,
    		stepInfoComponent,
    		isCurrentStep,
    		firstStep,
    		lastStep,
    		currentLayout
    	];
    }

    class Step extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Step",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console.warn("<Step> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Step>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Step>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\ButtonContainer.svelte generated by Svelte v3.19.2 */

    const file$h = "src\\components\\ButtonContainer.svelte";

    function create_fragment$i(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "buttonContainer svelte-i1ruvr");
    			add_location(div, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 2) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	var { buttons = 1 } = $$props;
    	const writable_props = ["buttons"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ButtonContainer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ButtonContainer", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("buttons" in $$props) $$invalidate(0, buttons = $$props.buttons);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ buttons });

    	$$self.$inject_state = $$props => {
    		if ("buttons" in $$props) $$invalidate(0, buttons = $$props.buttons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [buttons, $$scope, $$slots];
    }

    class ButtonContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { buttons: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonContainer",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get buttons() {
    		throw new Error("<ButtonContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttons(value) {
    		throw new Error("<ButtonContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Button.svelte generated by Svelte v3.19.2 */
    const file$i = "src\\components\\Button.svelte";

    // (2:4) {#if iconPresent}
    function create_if_block$5(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-192njyv");
    			add_location(span, file$i, 2, 8, 83);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-192njyv")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(2:4) {#if iconPresent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let button;
    	let t;
    	let button_disabled_value;
    	let current;
    	let dispose;
    	let if_block = /*iconPresent*/ ctx[2] && create_if_block$5(ctx);
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			button.disabled = button_disabled_value = !/*enabled*/ ctx[1];
    			attr_dev(button, "class", "svelte-192njyv");
    			add_location(button, file$i, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block) if_block.m(button, null);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    			dispose = listen_dev(button, "click", /*clickEvent*/ ctx[3], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*iconPresent*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 32) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[5], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null));
    			}

    			if (!current || dirty & /*enabled*/ 2 && button_disabled_value !== (button_disabled_value = !/*enabled*/ ctx[1])) {
    				prop_dev(button, "disabled", button_disabled_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { icon = null } = $$props;
    	var { enabled = true } = $$props;

    	// Function
    	function clickEvent() {
    		dispatch("click");
    	}

    	const writable_props = ["icon", "enabled"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("enabled" in $$props) $$invalidate(1, enabled = $$props.enabled);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		icon,
    		enabled,
    		clickEvent,
    		iconPresent
    	});

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("enabled" in $$props) $$invalidate(1, enabled = $$props.enabled);
    		if ("iconPresent" in $$props) $$invalidate(2, iconPresent = $$props.iconPresent);
    	};

    	let iconPresent;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 1) {
    			// Computed
    			 $$invalidate(2, iconPresent = icon !== null);
    		}
    	};

    	return [icon, enabled, iconPresent, clickEvent, dispatch, $$scope, $$slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { icon: 0, enabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get icon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set enabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\EmptyState.svelte generated by Svelte v3.19.2 */

    const file$j = "src\\components\\EmptyState.svelte";

    function create_fragment$k(ctx) {
    	let div;
    	let h3;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "class", "svelte-10cpu1e");
    			add_location(h3, file$j, 1, 4, 30);
    			attr_dev(div, "class", "emptyState svelte-10cpu1e");
    			add_location(div, file$j, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);

    			if (default_slot) {
    				default_slot.m(h3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<EmptyState> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("EmptyState", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class EmptyState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EmptyState",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src\components\RouteGuide.svelte generated by Svelte v3.19.2 */

    const file$k = "src\\components\\RouteGuide.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (12:4) {:else}
    function create_else_block$2(ctx) {
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layoutcenter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutcenter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutcenter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(12:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (2:4) {#if started}
    function create_if_block_1$2(ctx) {
    	let div0;
    	let p0;
    	let span0;
    	let t0;
    	let b0;
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let p1;
    	let span1;
    	let t4;
    	let b1;
    	let t5;
    	let current;
    	let each_value = /*steps*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			p0 = element("p");
    			span0 = element("span");
    			t0 = text(" Vertrek om ");
    			b0 = element("b");
    			t1 = text(/*departureTime*/ ctx[2]);
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div1 = element("div");
    			p1 = element("p");
    			span1 = element("span");
    			t4 = text(" Aankomst om ");
    			b1 = element("b");
    			t5 = text(/*arrivalTime*/ ctx[3]);
    			attr_dev(span0, "class", "mdi mdi-flag svelte-l9i1sn");
    			add_location(span0, file$k, 3, 15, 97);
    			add_location(b0, file$k, 3, 61, 143);
    			attr_dev(p0, "class", "svelte-l9i1sn");
    			add_location(p0, file$k, 3, 12, 94);
    			attr_dev(div0, "class", "tripStartInfo svelte-l9i1sn");
    			add_location(div0, file$k, 2, 8, 53);
    			attr_dev(span1, "class", "mdi mdi-flag-checkered svelte-l9i1sn");
    			add_location(span1, file$k, 9, 15, 316);
    			add_location(b1, file$k, 9, 72, 373);
    			attr_dev(p1, "class", "svelte-l9i1sn");
    			add_location(p1, file$k, 9, 12, 313);
    			attr_dev(div1, "class", "tripStartInfo svelte-l9i1sn");
    			add_location(div1, file$k, 8, 8, 272);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, p0);
    			append_dev(p0, span0);
    			append_dev(p0, t0);
    			append_dev(p0, b0);
    			append_dev(b0, t1);
    			insert_dev(target, t2, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p1);
    			append_dev(p1, span1);
    			append_dev(p1, t4);
    			append_dev(p1, b1);
    			append_dev(b1, t5);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*departureTime*/ 4) set_data_dev(t1, /*departureTime*/ ctx[2]);

    			if (dirty & /*steps*/ 1) {
    				each_value = /*steps*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(t3.parentNode, t3);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*arrivalTime*/ 8) set_data_dev(t5, /*arrivalTime*/ ctx[3]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(2:4) {#if started}",
    		ctx
    	});

    	return block;
    }

    // (14:12) <EmptyState>
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Geen route gestart");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(14:12) <EmptyState>",
    		ctx
    	});

    	return block;
    }

    // (13:8) <LayoutCenter>
    function create_default_slot_3$1(ctx) {
    	let current;

    	const emptystate = new EmptyState({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(emptystate.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(emptystate, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const emptystate_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				emptystate_changes.$$scope = { dirty, ctx };
    			}

    			emptystate.$set(emptystate_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(emptystate.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(emptystate.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(emptystate, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(13:8) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    // (6:8) {#each steps as step}
    function create_each_block$3(ctx) {
    	let current;

    	const step = new Step({
    			props: { step: /*step*/ ctx[6] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(step.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(step, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const step_changes = {};
    			if (dirty & /*steps*/ 1) step_changes.step = /*step*/ ctx[6];
    			step.$set(step_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(step.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(step.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(step, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(6:8) {#each steps as step}",
    		ctx
    	});

    	return block;
    }

    // (19:12) {#if started}
    function create_if_block$6(ctx) {
    	let current;

    	const button = new Button({
    			props: {
    				icon: "stop-circle-outline",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", endRoute);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(19:12) {#if started}",
    		ctx
    	});

    	return block;
    }

    // (20:16) <Button on:click={endRoute} icon="stop-circle-outline">
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Stop route");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(20:16) <Button on:click={endRoute} icon=\\\"stop-circle-outline\\\">",
    		ctx
    	});

    	return block;
    }

    // (18:8) <ButtonContainer buttons={1}>
    function create_default_slot_1$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*started*/ ctx[1] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*started*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(18:8) <ButtonContainer buttons={1}>",
    		ctx
    	});

    	return block;
    }

    // (17:4) <LayoutCenter>
    function create_default_slot$5(ctx) {
    	let current;

    	const buttoncontainer = new ButtonContainer({
    			props: {
    				buttons: 1,
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(buttoncontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttoncontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttoncontainer_changes = {};

    			if (dirty & /*$$scope, started*/ 514) {
    				buttoncontainer_changes.$$scope = { dirty, ctx };
    			}

    			buttoncontainer.$set(buttoncontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttoncontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttoncontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttoncontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(17:4) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*started*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			t = space();
    			create_component(layoutcenter.$$.fragment);
    			attr_dev(div, "class", "routeGuide svelte-l9i1sn");
    			add_location(div, file$k, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t);
    			mount_component(layoutcenter, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, t);
    			}

    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, started*/ 514) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(layoutcenter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(layoutcenter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			destroy_component(layoutcenter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let $routeStore;
    	validate_store(routeStore, "routeStore");
    	component_subscribe($$self, routeStore, $$value => $$invalidate(4, $routeStore = $$value));
    	startLocation();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RouteGuide> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("RouteGuide", $$slots, []);

    	$$self.$capture_state = () => ({
    		startLocation,
    		toTimeString,
    		Step,
    		ButtonContainer,
    		Button,
    		EmptyState,
    		LayoutCenter,
    		routeStore,
    		getSteps,
    		endRoute,
    		steps,
    		$routeStore,
    		started,
    		leg,
    		departureTime,
    		arrivalTime
    	});

    	$$self.$inject_state = $$props => {
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    		if ("started" in $$props) $$invalidate(1, started = $$props.started);
    		if ("leg" in $$props) $$invalidate(5, leg = $$props.leg);
    		if ("departureTime" in $$props) $$invalidate(2, departureTime = $$props.departureTime);
    		if ("arrivalTime" in $$props) $$invalidate(3, arrivalTime = $$props.arrivalTime);
    	};

    	let steps;
    	let started;
    	let leg;
    	let departureTime;
    	let arrivalTime;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$routeStore*/ 16) {
    			// Computed
    			 $$invalidate(0, steps = getSteps());
    		}

    		if ($$self.$$.dirty & /*steps*/ 1) {
    			 $$invalidate(1, started = steps.length > 0);
    		}

    		if ($$self.$$.dirty & /*started, $routeStore*/ 18) {
    			 $$invalidate(5, leg = started ? $routeStore.legs[0] : {});
    		}

    		if ($$self.$$.dirty & /*started, leg*/ 34) {
    			 $$invalidate(2, departureTime = started ? toTimeString(leg.departure_time.value) : "");
    		}

    		if ($$self.$$.dirty & /*started, leg*/ 34) {
    			 $$invalidate(3, arrivalTime = started ? toTimeString(leg.arrival_time.value) : "");
    		}
    	};

    	return [steps, started, departureTime, arrivalTime];
    }

    class RouteGuide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RouteGuide",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    const addressStore = writableLinked("addresses", {
        home: {
            name: "Huis",
            icon: "home-outline",
            canBeDeleted: false,
            address: "",
            location: {
                lat: 0,
                long: 0,
            },
        },
        work: {
            name: "Werk",
            icon: "briefcase-outline",
            canBeDeleted: false,
            address: "",
            location: {
                lat: 0,
                long: 0,
            },
        },
    });

    const autoAddress = {
        name: "Auto",
        id: "auto",
        icon: "arrow-decision-auto-outline",
        canBeDeleted: false,
        get address() {
            return getAutoLocation().address + " (auto)";
        },
        get location() {
            return getAutoLocation().location;
        }
    };

    const currentLocationAddress = {
        name: "Huidige locatie",
        id: "currentLocation",
        icon: "crosshairs-gps",
        canBeDeleted: false,
        address: "Gebruik GPS locatie",
        location: {
            lat: 0,
            long: 0,
        },
    };

    const defaultAddress = {
        name: "Nieuw addres",
        id: "invalid",
        icon: "crosshairs-gps",
        canBeDeleted: true,
        address: "",
        location: {
            lat: 0,
            long: 0,
        },
    };

    function saveAddress(id, object) {
        object = {
            ...defaultAddress,
            ...object,
            id,
        };

        let storeContent = addressStore.get();
        storeContent[id] = object;

        addressStore.set(storeContent);
    }

    function getAddressById(id) {
        if (id === "auto") {
            return getAutoLocation();
        } else if (id === "currentLocation") {
            let instance = { ...currentLocationAddress };
            instance.location = locationStore.get();

            return instance;
        } else {
            let addresses = addressStore.get();
            let match = addresses[id];

            return match;
        }
    }

    function getAutoLocation() {
        var addresses = addressStore.get();
        var home = addresses.home;
        var work = addresses.work;

        home.id = "home";
        work.id = "work";

        var homeLocation = home.location;
        var workLocation = work.location;
        var currentLocation = locationStore.get();

        var directDistanceHome = getDirectDistance(homeLocation, currentLocation);
        var directDistanceWork = getDirectDistance(workLocation, currentLocation);

        return directDistanceHome < directDistanceWork ? addresses.work : addresses.home;
    }

    function getAddresses() {
        var addresses = addressStore.get();

        return Object.entries(addresses)
            .map(([key, value]) => {
                return {
                    canBeDeleted: true,
                    id: key,
                    ...value,
                }
            });
    }

    function getCompleteAddressMap() {
        return {
            ...addressStore.get(),
            currentLocation: currentLocationAddress,
            auto: autoAddress,
        }
    }

    function getOriginAddresses() {
        return [
            ...getAddresses(),
            currentLocationAddress,
        ]
    }

    function getDestinationAddresses() {
        return [
            ...getAddresses(),
            autoAddress,
        ]
    }

    function matchLocationFromId(id) {
        var address = getAddressById(id);
        if (address) return address.location;
    }

    // Stores
    const fromIdStore = writableLinked("fromId", "currentLocation");
    const toIdStore = writableLinked("toId", "auto");

    const availableTripsStore = writable$1([]);
    const currentRouteMode = writable$1({
        address: "auto",
    });

    async function doSearch(fromId = fromIdStore.get(), toId = toIdStore.get()) {
        console.log("a", { fromId, toId });
        var response = await getTripsFromIds(fromId, toId);
        
        if (response === undefined || response.routes === undefined) return [];
        if (response.status !== "OK") return [];

        try {
            availableTripsStore.set(response.routes);
        } catch(e) {
            return [];
        }
    }

    async function getTripsFromIds(fromId, toId) {
        if (fromId === toId) return;

        console.log({ fromId, toId });

        let fromLocation = matchLocationFromId(fromId);
        let toLocation = matchLocationFromId(toId);

        console.log(fromLocation, toLocation);

        return await getTrips(fromLocation, toLocation);
    }

    async function getTrips(startLocation, endLocation) {
        if (!isValidPosition(startLocation)) return;
        if (!isValidPosition(endLocation)) return;

        let response = await graphQLRequest(`query($fromLat: Float!, $fromLong: Float!, $toLat: Float!, $toLong: Float!) {
        tripsFromLocations(fromLat: $fromLat, fromLong: $fromLong, toLat: $toLat, toLong: $toLong) {
            status
            trips {
                departureTime {
                    timeString
                }
                arrivalTime {
                    timeString
                }
                travelDuration {
                    string
                }
                toAddress {
                    streetName
                }
                steps {
                    travelMode
                }
            }
        }
    }`, {
            fromLat: startLocation.lat,
            fromLong: startLocation.long,
            toLat: endLocation.lat,
            toLong: endLocation.long,
        });

        return response.data.tripsFromLocations;
    }

    var locationWatcher$1;
    var currentAutoRoute = null;
    function startAutoPlanner() {
        locationWatcher$1 = locationStore.subscribe(currentPosition => {
            if (!currentPosition || !isValidPosition(currentPosition)) return;

            if (toIdStore.get() === "auto") {
                let autoRoute = getAutoLocation().id;
                
                if (currentAutoRoute === null || currentAutoRoute !== autoRoute) {
                    console.log("a", autoRoute);
                    doSearch(fromIdStore.get(), autoRoute);
                }

                currentAutoRoute = autoRoute;
            } else {
                doSearch();
            }
        });
    }

    function getTripFromAddress() {
        var id = fromIdStore.get();
        return getAddressById(id);
    }

    function getTripToAddress() {
        var id = toIdStore.get();
        return getAddressById(id);
    }

    /* src\components\TripOverviewBar.svelte generated by Svelte v3.19.2 */

    const { console: console_1$2 } = globals;
    const file$l = "src\\components\\TripOverviewBar.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (2:4) {#each steps as step}
    function create_each_block$4(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "tripSection svelte-58ylv0");
    			attr_dev(div, "style", div_style_value = /*getStyle*/ ctx[1](/*step*/ ctx[3]));
    			add_location(div, file$l, 2, 8, 66);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*steps*/ 1 && div_style_value !== (div_style_value = /*getStyle*/ ctx[1](/*step*/ ctx[3]))) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(2:4) {#each steps as step}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let div;
    	let each_value = /*steps*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "tripOverviewBar svelte-58ylv0");
    			add_location(div, file$l, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*getStyle, steps*/ 3) {
    				each_value = /*steps*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	var { steps } = $$props;
    	console.log(steps);

    	// Functions
    	function getStyle(step) {
    		return `width: ${getWidth(step)}%;
    border-color: ${getStepColor(step)};
    border-style: ${getStepBorderStyle(step)}`;
    	}

    	function getWidth(step) {
    		var stepDuration = step.duration.value;
    		var totalTime = steps.reduce((acc, step) => acc + step.duration.value, 0);
    		return stepDuration / totalTime * 100;
    	}

    	const writable_props = ["steps"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<TripOverviewBar> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TripOverviewBar", $$slots, []);

    	$$self.$set = $$props => {
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    	};

    	$$self.$capture_state = () => ({
    		getStepBorderStyle,
    		getStepColor,
    		steps,
    		getStyle,
    		getWidth
    	});

    	$$self.$inject_state = $$props => {
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [steps, getStyle];
    }

    class TripOverviewBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { steps: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripOverviewBar",
    			options,
    			id: create_fragment$m.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*steps*/ ctx[0] === undefined && !("steps" in props)) {
    			console_1$2.warn("<TripOverviewBar> was created without expected prop 'steps'");
    		}
    	}

    	get steps() {
    		throw new Error("<TripOverviewBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set steps(value) {
    		throw new Error("<TripOverviewBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\SoftButton.svelte generated by Svelte v3.19.2 */
    const file$m = "src\\components\\SoftButton.svelte";

    function create_fragment$n(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let t;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-jxzbue");
    			add_location(span, file$m, 1, 4, 36);
    			attr_dev(button, "class", "svelte-jxzbue");
    			add_location(button, file$m, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    			dispose = listen_dev(button, "click", /*clickEvent*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-jxzbue")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { icon = "" } = $$props;

    	// Function
    	function clickEvent() {
    		dispatch("click");
    	}

    	const writable_props = ["icon"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SoftButton> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SoftButton", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		icon,
    		clickEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [icon, clickEvent, dispatch, $$scope, $$slots];
    }

    class SoftButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { icon: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SoftButton",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get icon() {
    		throw new Error("<SoftButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<SoftButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\StepSmall.svelte generated by Svelte v3.19.2 */
    const file$n = "src\\components\\StepSmall.svelte";

    function create_fragment$o(ctx) {
    	let div;
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*step*/ ctx[0].html_instructions + "";
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[2] + " svelte-zohrbc");
    			add_location(span, file$n, 1, 7, 48);
    			attr_dev(p, "class", "svelte-zohrbc");
    			add_location(p, file$n, 1, 4, 45);
    			attr_dev(div, "class", "stepSmall svelte-zohrbc");
    			attr_dev(div, "style", /*styling*/ ctx[1]);
    			add_location(div, file$n, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, span);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icon*/ 4 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[2] + " svelte-zohrbc")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].html_instructions + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*styling*/ 2) {
    				attr_dev(div, "style", /*styling*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<StepSmall> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("StepSmall", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		getStepBorderStyling,
    		getStepIcon,
    		step,
    		styling,
    		icon
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("styling" in $$props) $$invalidate(1, styling = $$props.styling);
    		if ("icon" in $$props) $$invalidate(2, icon = $$props.icon);
    	};

    	let styling;
    	let icon;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 1) {
    			// Computed
    			 $$invalidate(1, styling = getStepBorderStyling(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			 $$invalidate(2, icon = getStepIcon(step));
    		}
    	};

    	return [step, styling, icon];
    }

    class StepSmall extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StepSmall",
    			options,
    			id: create_fragment$o.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console.warn("<StepSmall> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<StepSmall>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<StepSmall>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TripStepDetail.svelte generated by Svelte v3.19.2 */

    const { console: console_1$3 } = globals;

    const file$o = "src\\components\\TripStepDetail.svelte";

    // (3:8) <span slot="left">
    function create_left_slot$2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*startTimeString*/ ctx[0]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$o, 2, 8, 53);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*startTimeString*/ 1) set_data_dev(t, /*startTimeString*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$2.name,
    		type: "slot",
    		source: "(3:8) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div;
    	let current;

    	const inforow = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(inforow.$$.fragment);
    			attr_dev(div, "class", "tripStepDetail svelte-1ix1vj");
    			add_location(div, file$o, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(inforow, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inforow_changes = {};

    			if (dirty & /*$$scope, startTimeString*/ 5) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(inforow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	var { step } = $$props;
    	console.log(step);
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$3.warn(`<TripStepDetail> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TripStepDetail", $$slots, []);

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate(1, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		toTimeString,
    		InfoRow,
    		step,
    		startTimeString
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(1, step = $$props.step);
    		if ("startTimeString" in $$props) $$invalidate(0, startTimeString = $$props.startTimeString);
    	};

    	let startTimeString;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 2) {
    			// Computed
    			 $$invalidate(0, startTimeString = toTimeString(step.departure_time.value));
    		}
    	};

    	return [startTimeString, step];
    }

    class TripStepDetail extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { step: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripStepDetail",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[1] === undefined && !("step" in props)) {
    			console_1$3.warn("<TripStepDetail> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<TripStepDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<TripStepDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Trip.svelte generated by Svelte v3.19.2 */

    const { console: console_1$4 } = globals;
    const file$p = "src\\components\\Trip.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (4:12) <span slot="left">
    function create_left_slot_1$2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*endName*/ ctx[3]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$p, 3, 12, 108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*endName*/ 8) set_data_dev(t, /*endName*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1$2.name,
    		type: "slot",
    		source: "(4:12) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (7:12) <span slot="left">
    function create_left_slot$3(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*departureTimeString*/ ctx[5]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$p, 6, 12, 195);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*departureTimeString*/ 32) set_data_dev(t, /*departureTimeString*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$3.name,
    		type: "slot",
    		source: "(7:12) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (11:16) {#each icons as icon}
    function create_each_block_1$1(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[15] + " svelte-aixisg");
    			add_location(span, file$p, 11, 20, 386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icons*/ 128 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[15] + " svelte-aixisg")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(11:16) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    // (10:12) <span class="tripIcons" slot="center">
    function create_center_slot$2(ctx) {
    	let span;
    	let each_value_1 = /*icons*/ ctx[7];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "tripIcons svelte-aixisg");
    			attr_dev(span, "slot", "center");
    			add_location(span, file$p, 9, 12, 287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icons*/ 128) {
    				each_value_1 = /*icons*/ ctx[7];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(span, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_center_slot$2.name,
    		type: "slot",
    		source: "(10:12) <span class=\\\"tripIcons\\\" slot=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (15:12) <span slot="right">
    function create_right_slot$2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*arrivalTimeString*/ ctx[4]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$p, 14, 12, 482);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*arrivalTimeString*/ 16) set_data_dev(t, /*arrivalTimeString*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot$2.name,
    		type: "slot",
    		source: "(15:12) <span slot=\\\"right\\\">",
    		ctx
    	});

    	return block;
    }

    // (6:8) <InfoRow>
    function create_default_slot_3$2(ctx) {
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = space();
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(6:8) <InfoRow>",
    		ctx
    	});

    	return block;
    }

    // (21:12) <SoftButton on:click="{() => loadTrip(trip)}" icon="play-circle-outline">
    function create_default_slot_2$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Start");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(21:12) <SoftButton on:click=\\\"{() => loadTrip(trip)}\\\" icon=\\\"play-circle-outline\\\">",
    		ctx
    	});

    	return block;
    }

    // (27:16) {:else}
    function create_else_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Minder Info");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(27:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:16) {#if !open}
    function create_if_block_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Meer Info");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(25:16) {#if !open}",
    		ctx
    	});

    	return block;
    }

    // (24:12) <SoftButton icon={toggleOpenButtonIcon} on:click={toggleOpen}>
    function create_default_slot_1$4(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (!/*open*/ ctx[1]) return create_if_block_1$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(24:12) <SoftButton icon={toggleOpenButtonIcon} on:click={toggleOpen}>",
    		ctx
    	});

    	return block;
    }

    // (32:8) {#if open}
    function create_if_block$7(ctx) {
    	let div;
    	let current;
    	let each_value = /*steps*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "tripSteps svelte-aixisg");
    			add_location(div, file$p, 32, 12, 1078);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*steps*/ 4) {
    				each_value = /*steps*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(32:8) {#if open}",
    		ctx
    	});

    	return block;
    }

    // (34:16) {#each steps as step}
    function create_each_block$5(ctx) {
    	let current;

    	const stepsmall = new StepSmall({
    			props: { step: /*step*/ ctx[12] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(stepsmall.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stepsmall, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const stepsmall_changes = {};
    			if (dirty & /*steps*/ 4) stepsmall_changes.step = /*step*/ ctx[12];
    			stepsmall.$set(stepsmall_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stepsmall.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stepsmall.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stepsmall, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(34:16) {#each steps as step}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <svelte:component this={currentLayout}>
    function create_default_slot$6(ctx) {
    	let div1;
    	let t0;
    	let t1;
    	let t2;
    	let div0;
    	let t3;
    	let t4;
    	let div1_class_value;
    	let current;

    	const inforow0 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					default: [create_default_slot_3$2],
    					right: [create_right_slot$2],
    					center: [create_center_slot$2],
    					left: [create_left_slot$3]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const tripoverviewbar = new TripOverviewBar({
    			props: { steps: /*steps*/ ctx[2] },
    			$$inline: true
    		});

    	const softbutton0 = new SoftButton({
    			props: {
    				icon: "play-circle-outline",
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton0.$on("click", /*click_handler*/ ctx[11]);

    	const softbutton1 = new SoftButton({
    			props: {
    				icon: toggleOpenButtonIcon,
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton1.$on("click", /*toggleOpen*/ ctx[9]);
    	let if_block = /*open*/ ctx[1] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			create_component(inforow1.$$.fragment);
    			t1 = space();
    			create_component(tripoverviewbar.$$.fragment);
    			t2 = space();
    			div0 = element("div");
    			create_component(softbutton0.$$.fragment);
    			t3 = space();
    			create_component(softbutton1.$$.fragment);
    			t4 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "buttons svelte-aixisg");
    			add_location(div0, file$p, 19, 8, 626);
    			attr_dev(div1, "class", div1_class_value = "trip " + /*openClass*/ ctx[6] + " svelte-aixisg");
    			add_location(div1, file$p, 1, 4, 45);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(inforow0, div1, null);
    			append_dev(div1, t0);
    			mount_component(inforow1, div1, null);
    			append_dev(div1, t1);
    			mount_component(tripoverviewbar, div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			mount_component(softbutton0, div0, null);
    			append_dev(div0, t3);
    			mount_component(softbutton1, div0, null);
    			append_dev(div1, t4);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow0_changes = {};

    			if (dirty & /*$$scope, endName*/ 262152) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);
    			const inforow1_changes = {};

    			if (dirty & /*$$scope, arrivalTimeString, icons, departureTimeString*/ 262320) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const tripoverviewbar_changes = {};
    			if (dirty & /*steps*/ 4) tripoverviewbar_changes.steps = /*steps*/ ctx[2];
    			tripoverviewbar.$set(tripoverviewbar_changes);
    			const softbutton0_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				softbutton0_changes.$$scope = { dirty, ctx };
    			}

    			softbutton0.$set(softbutton0_changes);
    			const softbutton1_changes = {};

    			if (dirty & /*$$scope, open*/ 262146) {
    				softbutton1_changes.$$scope = { dirty, ctx };
    			}

    			softbutton1.$set(softbutton1_changes);

    			if (/*open*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*openClass*/ 64 && div1_class_value !== (div1_class_value = "trip " + /*openClass*/ ctx[6] + " svelte-aixisg")) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(tripoverviewbar.$$.fragment, local);
    			transition_in(softbutton0.$$.fragment, local);
    			transition_in(softbutton1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(tripoverviewbar.$$.fragment, local);
    			transition_out(softbutton0.$$.fragment, local);
    			transition_out(softbutton1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(inforow0);
    			destroy_component(inforow1);
    			destroy_component(tripoverviewbar);
    			destroy_component(softbutton0);
    			destroy_component(softbutton1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(1:0) <svelte:component this={currentLayout}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*currentLayout*/ ctx[8];

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, openClass, steps, open, trip, arrivalTimeString, icons, departureTimeString, endName*/ 262399) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*currentLayout*/ ctx[8])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getEndName(leg) {
    	var address = leg.end_address.split(", ");
    	address.pop();
    	address.pop();
    	return address.join(", ");
    }

    function loadTrip(trip) {
    	document.querySelector("main").scrollTo(0, 0);
    	startRoute(trip);
    }

    function instance$q($$self, $$props, $$invalidate) {
    	var { trip } = $$props;
    	console.log(trip);

    	// Data
    	var open = false;

    	function getTripIcons(steps) {
    		return steps.map(step => getStepIcon(step));
    	}

    	function toggleOpen() {
    		$$invalidate(1, open = !open);
    	}

    	const writable_props = ["trip"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$4.warn(`<Trip> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Trip", $$slots, []);
    	const click_handler = () => loadTrip(trip);

    	$$self.$set = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    	};

    	$$self.$capture_state = () => ({
    		standardizeTimestamp,
    		toTimeString,
    		getStepIcon,
    		processSteps,
    		startRoute,
    		InfoRow,
    		TripOverviewBar,
    		SoftButton,
    		StepSmall,
    		TripStepDetail,
    		LayoutCenter,
    		LayoutExpanded,
    		trip,
    		open,
    		getEndName,
    		getTripIcons,
    		loadTrip,
    		toggleOpen,
    		steps,
    		endName,
    		arrivalTimeString,
    		departureTimeString,
    		openClass,
    		icons,
    		currentLayout
    	});

    	$$self.$inject_state = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    		if ("open" in $$props) $$invalidate(1, open = $$props.open);
    		if ("steps" in $$props) $$invalidate(2, steps = $$props.steps);
    		if ("endName" in $$props) $$invalidate(3, endName = $$props.endName);
    		if ("arrivalTimeString" in $$props) $$invalidate(4, arrivalTimeString = $$props.arrivalTimeString);
    		if ("departureTimeString" in $$props) $$invalidate(5, departureTimeString = $$props.departureTimeString);
    		if ("openClass" in $$props) $$invalidate(6, openClass = $$props.openClass);
    		if ("icons" in $$props) $$invalidate(7, icons = $$props.icons);
    		if ("currentLayout" in $$props) $$invalidate(8, currentLayout = $$props.currentLayout);
    	};

    	let steps;
    	let endName;
    	let arrivalTimeString;
    	let departureTimeString;
    	let openClass;
    	let icons;
    	let currentLayout;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*trip*/ 1) {
    			// Computed
    			 $$invalidate(2, steps = trip.steps);
    		}

    		if ($$self.$$.dirty & /*trip*/ 1) {
    			// $: leg = trip.legs[0];
    			// $: lastStep = leg.steps[leg.steps.length - 1];
    			 $$invalidate(3, endName = trip.toAddress.streetAddress);
    		}

    		if ($$self.$$.dirty & /*trip*/ 1) {
    			// $: hasDepartureTime = leg.departure_time !== undefined;
    			// $: hasArrivalTime = leg.arrival_time !== undefined;
    			// $: departureTimetamp = hasDepartureTime ? standardizeTimestamp(leg.departure_time.value) : 0;
    			// $: arrivalTimetamp = hasArrivalTime ? standardizeTimestamp(leg.arrival_time.value) : 0;
    			// $:  = toTimeString(departureTimetamp);
    			 $$invalidate(4, arrivalTimeString = trip.arrivalTime.timeString);
    		}

    		if ($$self.$$.dirty & /*trip*/ 1) {
    			 $$invalidate(5, departureTimeString = trip.departureTime.timeString);
    		}

    		if ($$self.$$.dirty & /*open*/ 2) {
    			// $: steps = processSteps(leg.steps);
    			 $$invalidate(6, openClass = open ? "open" : "");
    		}

    		if ($$self.$$.dirty & /*steps*/ 4) {
    			// $: toggleOpenButtonIcon = !open ? "plus-circle-outline" : "minus-circle-outline"
    			 $$invalidate(7, icons = getTripIcons(steps));
    		}

    		if ($$self.$$.dirty & /*open*/ 2) {
    			 $$invalidate(8, currentLayout = open ? LayoutExpanded : LayoutCenter);
    		}
    	};

    	return [
    		trip,
    		open,
    		steps,
    		endName,
    		arrivalTimeString,
    		departureTimeString,
    		openClass,
    		icons,
    		currentLayout,
    		toggleOpen,
    		getTripIcons,
    		click_handler
    	];
    }

    class Trip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { trip: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Trip",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trip*/ ctx[0] === undefined && !("trip" in props)) {
    			console_1$4.warn("<Trip> was created without expected prop 'trip'");
    		}
    	}

    	get trip() {
    		throw new Error("<Trip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trip(value) {
    		throw new Error("<Trip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\AddressRouteHeader.svelte generated by Svelte v3.19.2 */
    const file$q = "src\\components\\AddressRouteHeader.svelte";

    function create_fragment$r(ctx) {
    	let div2;
    	let div0;
    	let span;
    	let span_class_value;
    	let t0;
    	let div1;
    	let p0;
    	let t1_value = /*address*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = /*address*/ ctx[0].address + "";
    	let t3;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-17y56su");
    			add_location(span, file$q, 2, 8, 92);
    			attr_dev(div0, "class", "iconWrapper svelte-17y56su");
    			add_location(div0, file$q, 1, 4, 57);
    			attr_dev(p0, "class", "name svelte-17y56su");
    			add_location(p0, file$q, 5, 8, 189);
    			attr_dev(p1, "class", "address svelte-17y56su");
    			add_location(p1, file$q, 6, 8, 233);
    			attr_dev(div1, "class", "textWrapper svelte-17y56su");
    			add_location(div1, file$q, 4, 4, 154);
    			attr_dev(div2, "class", "addressRouteHeader svelte-17y56su");
    			add_location(div2, file$q, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p1);
    			append_dev(p1, t3);
    			dispose = listen_dev(div2, "click", /*onClick*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*address*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-17y56su")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*address*/ 1 && t1_value !== (t1_value = /*address*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*address*/ 1 && t3_value !== (t3_value = /*address*/ ctx[0].address + "")) set_data_dev(t3, t3_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { address = {} } = $$props;

    	// Functions
    	function onClick() {
    		dispatch("click");
    	}

    	const writable_props = ["address"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressRouteHeader> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AddressRouteHeader", $$slots, []);

    	$$self.$set = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		address,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [address, onClick];
    }

    class AddressRouteHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { address: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressRouteHeader",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get address() {
    		throw new Error("<AddressRouteHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set address(value) {
    		throw new Error("<AddressRouteHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\AddressRouteOption.svelte generated by Svelte v3.19.2 */
    const file$r = "src\\components\\AddressRouteOption.svelte";

    function create_fragment$s(ctx) {
    	let div2;
    	let div0;
    	let span;
    	let span_class_value;
    	let t0;
    	let div1;
    	let h4;
    	let t1_value = /*address*/ ctx[0].address + "";
    	let t1;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			div1 = element("div");
    			h4 = element("h4");
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-sqvbs2");
    			add_location(span, file$r, 2, 8, 92);
    			attr_dev(div0, "class", "iconWrapper svelte-sqvbs2");
    			add_location(div0, file$r, 1, 4, 57);
    			attr_dev(h4, "class", "svelte-sqvbs2");
    			add_location(h4, file$r, 5, 8, 189);
    			attr_dev(div1, "class", "textWrapper svelte-sqvbs2");
    			add_location(div1, file$r, 4, 4, 154);
    			attr_dev(div2, "class", "addressRouteOption svelte-sqvbs2");
    			add_location(div2, file$r, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h4);
    			append_dev(h4, t1);
    			dispose = listen_dev(div2, "click", /*onClick*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*address*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-sqvbs2")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*address*/ 1 && t1_value !== (t1_value = /*address*/ ctx[0].address + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { address } = $$props;

    	// Functions
    	function onClick() {
    		dispatch("click", address);
    	}

    	const writable_props = ["address"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressRouteOption> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AddressRouteOption", $$slots, []);

    	$$self.$set = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		address,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [address, onClick];
    }

    class AddressRouteOption extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { address: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressRouteOption",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*address*/ ctx[0] === undefined && !("address" in props)) {
    			console.warn("<AddressRouteOption> was created without expected prop 'address'");
    		}
    	}

    	get address() {
    		throw new Error("<AddressRouteOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set address(value) {
    		throw new Error("<AddressRouteOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\LabelDivider.svelte generated by Svelte v3.19.2 */

    const file$s = "src\\components\\LabelDivider.svelte";

    function create_fragment$t(ctx) {
    	let div;
    	let t0;
    	let h6;
    	let span;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			h6 = element("h6");
    			span = element("span");
    			t1 = text(/*text*/ ctx[0]);
    			attr_dev(div, "class", "divider svelte-1fchm1b");
    			add_location(div, file$s, 0, 0, 0);
    			attr_dev(span, "class", "svelte-1fchm1b");
    			add_location(span, file$s, 1, 4, 33);
    			attr_dev(h6, "class", "svelte-1fchm1b");
    			add_location(h6, file$s, 1, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h6, anchor);
    			append_dev(h6, span);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 1) set_data_dev(t1, /*text*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	var { text = "" } = $$props;
    	const writable_props = ["text"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LabelDivider> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("LabelDivider", $$slots, []);

    	$$self.$set = $$props => {
    		if ("text" in $$props) $$invalidate(0, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ text });

    	$$self.$inject_state = $$props => {
    		if ("text" in $$props) $$invalidate(0, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text];
    }

    class LabelDivider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, { text: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LabelDivider",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get text() {
    		throw new Error("<LabelDivider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<LabelDivider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\SmallDropDown.svelte generated by Svelte v3.19.2 */
    const file$t = "src\\components\\SmallDropDown.svelte";

    // (2:0) {#if open}
    function create_if_block$8(ctx) {
    	let div;
    	let div_intro;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "dropDownContent");
    			add_location(div, file$t, 2, 4, 118);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fly, flyDown);
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(2:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1;
    	let t2;
    	let if_block_anchor;
    	let current;
    	let dispose;
    	let if_block = /*open*/ ctx[0] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(/*text*/ ctx[1]);
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(span, "class", span_class_value = "mdi mdi-chevron-" + (/*open*/ ctx[0] ? "up" : "down"));
    			add_location(span, file$t, 0, 29, 29);
    			attr_dev(p, "class", "svelte-21asn");
    			add_location(p, file$t, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			insert_dev(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    			dispose = listen_dev(p, "click", /*toggleDropdown*/ ctx[2], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*open*/ 1 && span_class_value !== (span_class_value = "mdi mdi-chevron-" + (/*open*/ ctx[0] ? "up" : "down"))) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	var { text = "Meer Info" } = $$props;
    	var { open = false } = $$props;

    	// Functions
    	function toggleDropdown() {
    		$$invalidate(0, open = !open);
    	}

    	const writable_props = ["text", "open"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SmallDropDown> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SmallDropDown", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ fly, flyDown, text, open, toggleDropdown });

    	$$self.$inject_state = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [open, text, toggleDropdown, $$scope, $$slots];
    }

    class SmallDropDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { text: 1, open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmallDropDown",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get text() {
    		throw new Error("<SmallDropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<SmallDropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<SmallDropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<SmallDropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TripComposer.svelte generated by Svelte v3.19.2 */

    const { console: console_1$5 } = globals;
    const file$u = "src\\components\\TripComposer.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    // (2:4) {#if !selectOriginOpen}
    function create_if_block_1$4(ctx) {
    	let div;
    	let div_intro;
    	let current;

    	const addressrouteheader = new AddressRouteHeader({
    			props: { address: /*selectedOrigin*/ ctx[4] },
    			$$inline: true
    		});

    	addressrouteheader.$on("click", /*click_handler*/ ctx[14]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(addressrouteheader.$$.fragment);
    			add_location(div, file$u, 2, 8, 48);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(addressrouteheader, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const addressrouteheader_changes = {};
    			if (dirty & /*selectedOrigin*/ 16) addressrouteheader_changes.address = /*selectedOrigin*/ ctx[4];
    			addressrouteheader.$set(addressrouteheader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addressrouteheader.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fly, flyUp);
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addressrouteheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(addressrouteheader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(2:4) {#if !selectOriginOpen}",
    		ctx
    	});

    	return block;
    }

    // (8:8) {#each originAddresses as address}
    function create_each_block_1$2(ctx) {
    	let current;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[15](/*address*/ ctx[20], ...args);
    	}

    	const addressrouteoption = new AddressRouteOption({
    			props: { address: /*address*/ ctx[20] },
    			$$inline: true
    		});

    	addressrouteoption.$on("click", click_handler_1);

    	const block = {
    		c: function create() {
    			create_component(addressrouteoption.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(addressrouteoption, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const addressrouteoption_changes = {};
    			if (dirty & /*originAddresses*/ 4) addressrouteoption_changes.address = /*address*/ ctx[20];
    			addressrouteoption.$set(addressrouteoption_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addressrouteoption.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addressrouteoption.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(addressrouteoption, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(8:8) {#each originAddresses as address}",
    		ctx
    	});

    	return block;
    }

    // (7:4) <SmallDropDown text="Selecteer startlocatie" bind:open={selectOriginOpen}>
    function create_default_slot_2$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*originAddresses*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*originAddresses, selectOriginAddress*/ 68) {
    				each_value_1 = /*originAddresses*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(7:4) <SmallDropDown text=\\\"Selecteer startlocatie\\\" bind:open={selectOriginOpen}>",
    		ctx
    	});

    	return block;
    }

    // (15:4) {#if !selectDestinationOpen}
    function create_if_block$9(ctx) {
    	let div;
    	let div_intro;
    	let current;

    	const addressrouteheader = new AddressRouteHeader({
    			props: { address: /*selectedDestination*/ ctx[5] },
    			$$inline: true
    		});

    	addressrouteheader.$on("click", /*click_handler_2*/ ctx[17]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(addressrouteheader.$$.fragment);
    			add_location(div, file$u, 15, 8, 538);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(addressrouteheader, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const addressrouteheader_changes = {};
    			if (dirty & /*selectedDestination*/ 32) addressrouteheader_changes.address = /*selectedDestination*/ ctx[5];
    			addressrouteheader.$set(addressrouteheader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addressrouteheader.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fly, flyUp);
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addressrouteheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(addressrouteheader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(15:4) {#if !selectDestinationOpen}",
    		ctx
    	});

    	return block;
    }

    // (21:8) {#each destinationAddresses as address}
    function create_each_block$6(ctx) {
    	let current;

    	function click_handler_3(...args) {
    		return /*click_handler_3*/ ctx[18](/*address*/ ctx[20], ...args);
    	}

    	const addressrouteoption = new AddressRouteOption({
    			props: { address: /*address*/ ctx[20] },
    			$$inline: true
    		});

    	addressrouteoption.$on("click", click_handler_3);

    	const block = {
    		c: function create() {
    			create_component(addressrouteoption.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(addressrouteoption, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const addressrouteoption_changes = {};
    			if (dirty & /*destinationAddresses*/ 8) addressrouteoption_changes.address = /*address*/ ctx[20];
    			addressrouteoption.$set(addressrouteoption_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addressrouteoption.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addressrouteoption.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(addressrouteoption, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(21:8) {#each destinationAddresses as address}",
    		ctx
    	});

    	return block;
    }

    // (20:4) <SmallDropDown text="Selecteer bestemming" bind:open={selectDestinationOpen}>
    function create_default_slot_1$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*destinationAddresses*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*destinationAddresses, selectDestinationAddress*/ 136) {
    				each_value = /*destinationAddresses*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(20:4) <SmallDropDown text=\\\"Selecteer bestemming\\\" bind:open={selectDestinationOpen}>",
    		ctx
    	});

    	return block;
    }

    // (26:4) <Button icon="magnify" on:click={searchTrips}>
    function create_default_slot$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Zoek");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(26:4) <Button icon=\\\"magnify\\\" on:click={searchTrips}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let section;
    	let t0;
    	let updating_open;
    	let t1;
    	let t2;
    	let t3;
    	let updating_open_1;
    	let t4;
    	let current;
    	let if_block0 = !/*selectOriginOpen*/ ctx[0] && create_if_block_1$4(ctx);

    	function smalldropdown0_open_binding(value) {
    		/*smalldropdown0_open_binding*/ ctx[16].call(null, value);
    	}

    	let smalldropdown0_props = {
    		text: "Selecteer startlocatie",
    		$$slots: { default: [create_default_slot_2$5] },
    		$$scope: { ctx }
    	};

    	if (/*selectOriginOpen*/ ctx[0] !== void 0) {
    		smalldropdown0_props.open = /*selectOriginOpen*/ ctx[0];
    	}

    	const smalldropdown0 = new SmallDropDown({
    			props: smalldropdown0_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(smalldropdown0, "open", smalldropdown0_open_binding));
    	const labeldivider = new LabelDivider({ props: { text: "Naar" }, $$inline: true });
    	let if_block1 = !/*selectDestinationOpen*/ ctx[1] && create_if_block$9(ctx);

    	function smalldropdown1_open_binding(value) {
    		/*smalldropdown1_open_binding*/ ctx[19].call(null, value);
    	}

    	let smalldropdown1_props = {
    		text: "Selecteer bestemming",
    		$$slots: { default: [create_default_slot_1$5] },
    		$$scope: { ctx }
    	};

    	if (/*selectDestinationOpen*/ ctx[1] !== void 0) {
    		smalldropdown1_props.open = /*selectDestinationOpen*/ ctx[1];
    	}

    	const smalldropdown1 = new SmallDropDown({
    			props: smalldropdown1_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(smalldropdown1, "open", smalldropdown1_open_binding));

    	const button = new Button({
    			props: {
    				icon: "magnify",
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*searchTrips*/ ctx[8]);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(smalldropdown0.$$.fragment);
    			t1 = space();
    			create_component(labeldivider.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(smalldropdown1.$$.fragment);
    			t4 = space();
    			create_component(button.$$.fragment);
    			attr_dev(section, "class", "svelte-14gbar7");
    			add_location(section, file$u, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			if (if_block0) if_block0.m(section, null);
    			append_dev(section, t0);
    			mount_component(smalldropdown0, section, null);
    			append_dev(section, t1);
    			mount_component(labeldivider, section, null);
    			append_dev(section, t2);
    			if (if_block1) if_block1.m(section, null);
    			append_dev(section, t3);
    			mount_component(smalldropdown1, section, null);
    			append_dev(section, t4);
    			mount_component(button, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*selectOriginOpen*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_1$4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(section, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const smalldropdown0_changes = {};

    			if (dirty & /*$$scope, originAddresses*/ 33554436) {
    				smalldropdown0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*selectOriginOpen*/ 1) {
    				updating_open = true;
    				smalldropdown0_changes.open = /*selectOriginOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			smalldropdown0.$set(smalldropdown0_changes);

    			if (!/*selectDestinationOpen*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$9(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(section, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const smalldropdown1_changes = {};

    			if (dirty & /*$$scope, destinationAddresses*/ 33554440) {
    				smalldropdown1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open_1 && dirty & /*selectDestinationOpen*/ 2) {
    				updating_open_1 = true;
    				smalldropdown1_changes.open = /*selectDestinationOpen*/ ctx[1];
    				add_flush_callback(() => updating_open_1 = false);
    			}

    			smalldropdown1.$set(smalldropdown1_changes);
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 33554432) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(smalldropdown0.$$.fragment, local);
    			transition_in(labeldivider.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(smalldropdown1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(smalldropdown0.$$.fragment, local);
    			transition_out(labeldivider.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(smalldropdown1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block0) if_block0.d();
    			destroy_component(smalldropdown0);
    			destroy_component(labeldivider);
    			if (if_block1) if_block1.d();
    			destroy_component(smalldropdown1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let $addressStore;
    	let $fromIdStore;
    	let $toIdStore;
    	validate_store(addressStore, "addressStore");
    	component_subscribe($$self, addressStore, $$value => $$invalidate(10, $addressStore = $$value));
    	validate_store(fromIdStore, "fromIdStore");
    	component_subscribe($$self, fromIdStore, $$value => $$invalidate(11, $fromIdStore = $$value));
    	validate_store(toIdStore, "toIdStore");
    	component_subscribe($$self, toIdStore, $$value => $$invalidate(12, $toIdStore = $$value));
    	const dispatch = createEventDispatcher();

    	// Data
    	var selectOriginOpen = false;

    	var selectDestinationOpen = false;

    	// Functions
    	function selectOriginAddress(address) {
    		$$invalidate(0, selectOriginOpen = false);
    		set_store_value(fromIdStore, $fromIdStore = address.id);
    	}

    	function selectDestinationAddress(address) {
    		$$invalidate(1, selectDestinationOpen = false);
    		set_store_value(toIdStore, $toIdStore = address.id);
    	}

    	async function searchTrips() {
    		let trips = await getTripsFromIds($fromIdStore, $toIdStore);
    		console.log(trips);
    		dispatch("search", trips);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$5.warn(`<TripComposer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TripComposer", $$slots, []);
    	const click_handler = () => $$invalidate(0, selectOriginOpen = true);
    	const click_handler_1 = address => selectOriginAddress(address);

    	function smalldropdown0_open_binding(value) {
    		selectOriginOpen = value;
    		$$invalidate(0, selectOriginOpen);
    	}

    	const click_handler_2 = () => $$invalidate(1, selectDestinationOpen = true);
    	const click_handler_3 = address => selectDestinationAddress(address);

    	function smalldropdown1_open_binding(value) {
    		selectDestinationOpen = value;
    		$$invalidate(1, selectDestinationOpen);
    	}

    	$$self.$capture_state = () => ({
    		addressStore,
    		getCompleteAddressMap,
    		getOriginAddresses,
    		getDestinationAddresses,
    		fromIdStore,
    		toIdStore,
    		getTripsFromIds,
    		createEventDispatcher,
    		fly,
    		flyUp,
    		dispatch,
    		AddressRouteHeader,
    		AddressRouteOption,
    		LabelDivider,
    		SmallDropDown,
    		Button,
    		selectOriginOpen,
    		selectDestinationOpen,
    		selectOriginAddress,
    		selectDestinationAddress,
    		searchTrips,
    		addressMap,
    		$addressStore,
    		originAddresses,
    		destinationAddresses,
    		selectedOrigin,
    		$fromIdStore,
    		selectedDestination,
    		$toIdStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectOriginOpen" in $$props) $$invalidate(0, selectOriginOpen = $$props.selectOriginOpen);
    		if ("selectDestinationOpen" in $$props) $$invalidate(1, selectDestinationOpen = $$props.selectDestinationOpen);
    		if ("addressMap" in $$props) $$invalidate(9, addressMap = $$props.addressMap);
    		if ("originAddresses" in $$props) $$invalidate(2, originAddresses = $$props.originAddresses);
    		if ("destinationAddresses" in $$props) $$invalidate(3, destinationAddresses = $$props.destinationAddresses);
    		if ("selectedOrigin" in $$props) $$invalidate(4, selectedOrigin = $$props.selectedOrigin);
    		if ("selectedDestination" in $$props) $$invalidate(5, selectedDestination = $$props.selectedDestination);
    	};

    	let addressMap;
    	let originAddresses;
    	let destinationAddresses;
    	let selectedOrigin;
    	let selectedDestination;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$addressStore*/ 1024) {
    			// Computed
    			 $$invalidate(9, addressMap = getCompleteAddressMap());
    		}

    		if ($$self.$$.dirty & /*$addressStore*/ 1024) {
    			 $$invalidate(2, originAddresses = getOriginAddresses());
    		}

    		if ($$self.$$.dirty & /*$addressStore*/ 1024) {
    			 $$invalidate(3, destinationAddresses = getDestinationAddresses());
    		}

    		if ($$self.$$.dirty & /*addressMap, $fromIdStore*/ 2560) {
    			 $$invalidate(4, selectedOrigin = addressMap[$fromIdStore]);
    		}

    		if ($$self.$$.dirty & /*addressMap, $toIdStore*/ 4608) {
    			 $$invalidate(5, selectedDestination = addressMap[$toIdStore]);
    		}
    	};

    	return [
    		selectOriginOpen,
    		selectDestinationOpen,
    		originAddresses,
    		destinationAddresses,
    		selectedOrigin,
    		selectedDestination,
    		selectOriginAddress,
    		selectDestinationAddress,
    		searchTrips,
    		addressMap,
    		$addressStore,
    		$fromIdStore,
    		$toIdStore,
    		dispatch,
    		click_handler,
    		click_handler_1,
    		smalldropdown0_open_binding,
    		click_handler_2,
    		click_handler_3,
    		smalldropdown1_open_binding
    	];
    }

    class TripComposer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripComposer",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    function inject(node, argument = "body") {
        var targetNode;

        if (typeof argument !== "string") {
            targetNode = argument;
        } else {
            targetNode = document.querySelector(argument);
        }

        targetNode.appendChild(node);

        return {
            destroy() {
                node.remove();
            }
        }
    }

    /* src\components\Popup.svelte generated by Svelte v3.19.2 */
    const file$v = "src\\components\\Popup.svelte";

    // (1:0) {#if open}
    function create_if_block$a(ctx) {
    	let div1;
    	let div0;
    	let inject_action;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "box svelte-14rina7");
    			add_location(div0, file$v, 2, 8, 86);
    			attr_dev(div1, "class", "scim svelte-14rina7");
    			add_location(div1, file$v, 1, 4, 16);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			dispose = [
    				action_destroyer(inject_action = inject.call(null, div1, "main")),
    				listen_dev(div1, "click", self(/*close*/ ctx[1]), false, false, false)
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(1:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*open*/ ctx[0] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { open = false } = $$props;

    	// Functions
    	function close() {
    		$$invalidate(0, open = false);
    		dispatch("close");
    	}

    	const writable_props = ["open"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Popup> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Popup", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		inject,
    		createEventDispatcher,
    		dispatch,
    		open,
    		close
    	});

    	$$self.$inject_state = $$props => {
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [open, close, dispatch, $$scope, $$slots];
    }

    class Popup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, { open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Popup",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get open() {
    		throw new Error("<Popup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Popup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TripList.svelte generated by Svelte v3.19.2 */
    const file$w = "src\\components\\TripList.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (3:8) {#if !showResults}
    function create_if_block_1$5(ctx) {
    	let current;
    	const tripcomposer = new TripComposer({ $$inline: true });
    	tripcomposer.$on("search", /*onSearch*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(tripcomposer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tripcomposer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tripcomposer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tripcomposer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tripcomposer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(3:8) {#if !showResults}",
    		ctx
    	});

    	return block;
    }

    // (2:4) <LayoutCenter>
    function create_default_slot_4$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !/*showResults*/ ctx[0] && create_if_block_1$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*showResults*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block_1$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(2:4) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    // (7:4) {#if showResults}
    function create_if_block$b(ctx) {
    	let t;
    	let each_1_anchor;
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot_2$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*trips*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$4(ctx);
    	}

    	const block = {
    		c: function create() {
    			create_component(layoutcenter.$$.fragment);
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();

    			if (each_1_else) {
    				each_1_else.c();
    			}
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutcenter, target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);

    			if (each_1_else) {
    				each_1_else.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);

    			if (dirty & /*trips*/ 2) {
    				each_value = /*trips*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!each_value.length && each_1_else) {
    				each_1_else.p(ctx, dirty);
    			} else if (!each_value.length) {
    				each_1_else = create_else_block$4(ctx);
    				each_1_else.c();
    				each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
    			} else if (each_1_else) {
    				each_1_else.d(1);
    				each_1_else = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutcenter, detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    			if (each_1_else) each_1_else.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(7:4) {#if showResults}",
    		ctx
    	});

    	return block;
    }

    // (9:12) <Button on:click={redoSearch}>
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Zoek opnieuw");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(9:12) <Button on:click={redoSearch}>",
    		ctx
    	});

    	return block;
    }

    // (8:8) <LayoutCenter>
    function create_default_slot_2$6(ctx) {
    	let current;

    	const button = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*redoSearch*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$6.name,
    		type: "slot",
    		source: "(8:8) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    // (13:8) {:else}
    function create_else_block$4(ctx) {
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layoutcenter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutcenter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutcenter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(13:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:16) <EmptyState>
    function create_default_slot_1$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Geen routes gevonden");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(15:16) <EmptyState>",
    		ctx
    	});

    	return block;
    }

    // (14:12) <LayoutCenter>
    function create_default_slot$8(ctx) {
    	let t;
    	let current;

    	const emptystate = new EmptyState({
    			props: {
    				$$slots: { default: [create_default_slot_1$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(emptystate.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(emptystate, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const emptystate_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				emptystate_changes.$$scope = { dirty, ctx };
    			}

    			emptystate.$set(emptystate_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(emptystate.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(emptystate.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(emptystate, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(14:12) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    // (11:8) {#each trips as trip}
    function create_each_block$7(ctx) {
    	let current;

    	const trip = new Trip({
    			props: { trip: /*trip*/ ctx[7] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(trip.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(trip, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const trip_changes = {};
    			if (dirty & /*trips*/ 2) trip_changes.trip = /*trip*/ ctx[7];
    			trip.$set(trip_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trip.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trip.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(trip, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(11:8) {#each trips as trip}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let section;
    	let t;
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*showResults*/ ctx[0] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(layoutcenter.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(section, "class", "trips svelte-1l2yk9q");
    			add_location(section, file$w, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(layoutcenter, section, null);
    			append_dev(section, t);
    			if (if_block) if_block.m(section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, showResults*/ 1025) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);

    			if (/*showResults*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(section, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(layoutcenter);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let $availableTripsStore;
    	validate_store(availableTripsStore, "availableTripsStore");
    	component_subscribe($$self, availableTripsStore, $$value => $$invalidate(5, $availableTripsStore = $$value));
    	var showResults = false;
    	var trips = [];

    	// Function
    	function onSearch({ detail }) {
    		$$invalidate(0, showResults = true);
    		$$invalidate(1, trips = detail.trips);
    	}

    	function redoSearch() {
    		$$invalidate(0, showResults = false);
    	}

    	// On create
    	startAutoPlanner();

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripList> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TripList", $$slots, []);

    	$$self.$capture_state = () => ({
    		availableTripsStore,
    		startAutoPlanner,
    		getTripFromAddress,
    		getTripToAddress,
    		addressStore,
    		Trip,
    		LayoutCenter,
    		EmptyState,
    		TripComposer,
    		Popup,
    		Button,
    		showResults,
    		trips,
    		onSearch,
    		redoSearch,
    		fromAddress,
    		$availableTripsStore,
    		toAddress
    	});

    	$$self.$inject_state = $$props => {
    		if ("showResults" in $$props) $$invalidate(0, showResults = $$props.showResults);
    		if ("trips" in $$props) $$invalidate(1, trips = $$props.trips);
    		if ("fromAddress" in $$props) fromAddress = $$props.fromAddress;
    		if ("toAddress" in $$props) toAddress = $$props.toAddress;
    	};

    	let fromAddress;
    	let toAddress;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$availableTripsStore*/ 32) {
    			// Computed
    			 fromAddress = getTripFromAddress();
    		}

    		if ($$self.$$.dirty & /*$availableTripsStore*/ 32) {
    			 toAddress = getTripFromAddress();
    		}
    	};

    	return [showResults, trips, onSearch, redoSearch];
    }

    class TripList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripList",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    /* src\components\Divider.svelte generated by Svelte v3.19.2 */

    const file$x = "src\\components\\Divider.svelte";

    function create_fragment$y(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "divider svelte-77ikm");
    			add_location(div, file$x, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Divider> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Divider", $$slots, []);
    	return [];
    }

    class Divider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Divider",
    			options,
    			id: create_fragment$y.name
    		});
    	}
    }

    /* src\views\DashboardView.svelte generated by Svelte v3.19.2 */
    const file$y = "src\\views\\DashboardView.svelte";

    // (2:4) {#if !hasGPS}
    function create_if_block_1$6(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text(" Locatie kan niet worden gevonden");
    			attr_dev(span, "class", "mdi mdi-crosshairs-question");
    			add_location(span, file$y, 2, 11, 55);
    			attr_dev(p, "class", "svelte-9kh0hl");
    			add_location(p, file$y, 2, 8, 52);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(2:4) {#if !hasGPS}",
    		ctx
    	});

    	return block;
    }

    // (5:4) {#if !online}
    function create_if_block$c(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text(" Je bent offline. Gegevens worden niet bijgewerkt");
    			attr_dev(span, "class", "mdi mdi-wifi-strength-alert-outline");
    			add_location(span, file$y, 5, 11, 184);
    			attr_dev(p, "class", "svelte-9kh0hl");
    			add_location(p, file$y, 5, 8, 181);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(5:4) {#if !online}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;
    	let if_block0 = !/*hasGPS*/ ctx[1] && create_if_block_1$6(ctx);
    	let if_block1 = !/*online*/ ctx[0] && create_if_block$c(ctx);
    	const routeguide = new RouteGuide({ $$inline: true });
    	const divider = new Divider({ $$inline: true });
    	const triplist = new TripList({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			create_component(routeguide.$$.fragment);
    			t2 = space();
    			create_component(divider.$$.fragment);
    			t3 = space();
    			create_component(triplist.$$.fragment);
    			attr_dev(div, "class", "container");
    			add_location(div, file$y, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t1);
    			mount_component(routeguide, div, null);
    			append_dev(div, t2);
    			mount_component(divider, div, null);
    			append_dev(div, t3);
    			mount_component(triplist, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*hasGPS*/ ctx[1]) {
    				if (!if_block0) {
    					if_block0 = create_if_block_1$6(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*online*/ ctx[0]) {
    				if (!if_block1) {
    					if_block1 = create_if_block$c(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(routeguide.$$.fragment, local);
    			transition_in(divider.$$.fragment, local);
    			transition_in(triplist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(routeguide.$$.fragment, local);
    			transition_out(divider.$$.fragment, local);
    			transition_out(triplist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(routeguide);
    			destroy_component(divider);
    			destroy_component(triplist);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let $locationStore;
    	validate_store(locationStore, "locationStore");
    	component_subscribe($$self, locationStore, $$value => $$invalidate(2, $locationStore = $$value));
    	var online = navigator.onLine || true;
    	window.addEventListener("online", () => $$invalidate(0, online = true));
    	window.addEventListener("offline", () => $$invalidate(0, online = false));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DashboardView> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("DashboardView", $$slots, []);

    	$$self.$capture_state = () => ({
    		startRoute,
    		serverRequest,
    		locationStore,
    		locationIsValid,
    		RouteGuide,
    		TripList,
    		Divider,
    		InfoRow,
    		online,
    		hasGPS,
    		$locationStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("online" in $$props) $$invalidate(0, online = $$props.online);
    		if ("hasGPS" in $$props) $$invalidate(1, hasGPS = $$props.hasGPS);
    	};

    	let hasGPS;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$locationStore*/ 4) {
    			// Computed
    			 $$invalidate(1, hasGPS = locationIsValid());
    		}
    	};

    	return [online, hasGPS];
    }

    class DashboardView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DashboardView",
    			options,
    			id: create_fragment$z.name
    		});
    	}
    }

    function clickOutside(node, onEventFunction) {
        const isNestedChild = (parent, child) => {
            var currentNode = child;

            while (currentNode !== null) {
                if (currentNode.parentNode === parent) {
                    return true;
                } else {
                    currentNode = currentNode.parentNode;
                }
            }

            return false;
        };

        const handleClick = event => {
            var { target } = event;

            if (!node.isSameNode(target) && !isNestedChild(node, target)) {
                onEventFunction();
            }
        };

        document.addEventListener("click", handleClick);

        return {
            destroy() {
                document.removeEventListener("click", handleClick);
            }
        }
    }

    /* src\components\Layout\SpaceBetween.svelte generated by Svelte v3.19.2 */

    const file$z = "src\\components\\Layout\\SpaceBetween.svelte";

    function create_fragment$A(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-kz40a4");
    			add_location(div, file$z, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SpaceBetween> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SpaceBetween", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class SpaceBetween extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SpaceBetween",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    /* src\components\SearchBar.svelte generated by Svelte v3.19.2 */
    const file$A = "src\\components\\SearchBar.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (8:4) {#if resultsAvailable}
    function create_if_block$d(ctx) {
    	let div;
    	let each_value = /*results*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "searchResults");
    			add_location(div, file$A, 8, 8, 318);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*clickedOnResult, results*/ 20) {
    				each_value = /*results*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(8:4) {#if resultsAvailable}",
    		ctx
    	});

    	return block;
    }

    // (10:12) {#each results as result}
    function create_each_block$8(ctx) {
    	let div2;
    	let div0;
    	let span;
    	let span_class_value;
    	let t0;
    	let div1;
    	let p;
    	let t1_value = /*result*/ ctx[8].name + "";
    	let t1;
    	let t2;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[7](/*result*/ ctx[8], ...args);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			div1 = element("div");
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*result*/ ctx[8].icon + " svelte-v9vsqt");
    			add_location(span, file$A, 12, 24, 545);
    			attr_dev(div0, "class", "iconWrapper svelte-v9vsqt");
    			add_location(div0, file$A, 11, 20, 494);
    			attr_dev(p, "class", "svelte-v9vsqt");
    			add_location(p, file$A, 15, 24, 689);
    			attr_dev(div1, "class", "textWrapper svelte-v9vsqt");
    			add_location(div1, file$A, 14, 20, 638);
    			attr_dev(div2, "class", "searchBarResult svelte-v9vsqt");
    			add_location(div2, file$A, 10, 16, 402);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			dispose = listen_dev(div2, "click", click_handler, false, false, false);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*results*/ 4 && span_class_value !== (span_class_value = "mdi mdi-" + /*result*/ ctx[8].icon + " svelte-v9vsqt")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*results*/ 4 && t1_value !== (t1_value = /*result*/ ctx[8].name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(10:12) {#each results as result}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let span;
    	let t0;
    	let input;
    	let div1_class_value;
    	let t1;
    	let dispose;
    	let if_block = /*resultsAvailable*/ ctx[3] && create_if_block$d(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(span, "class", "mdi mdi-magnify svelte-v9vsqt");
    			add_location(span, file$A, 3, 12, 151);
    			attr_dev(div0, "class", "iconWrapper svelte-v9vsqt");
    			add_location(div0, file$A, 2, 8, 112);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[1]);
    			attr_dev(input, "class", "svelte-v9vsqt");
    			add_location(input, file$A, 5, 8, 214);
    			attr_dev(div1, "class", div1_class_value = "searchBar " + (/*resultsAvailable*/ ctx[3] && "resultsAvailable") + " svelte-v9vsqt");
    			add_location(div1, file$A, 1, 4, 38);
    			attr_dev(div2, "class", "searchBarContainer");
    			add_location(div2, file$A, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(div1, t0);
    			append_dev(div1, input);
    			set_input_value(input, /*value*/ ctx[0]);
    			append_dev(div2, t1);
    			if (if_block) if_block.m(div2, null);
    			dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[6]);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholder*/ 2) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[1]);
    			}

    			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (dirty & /*resultsAvailable*/ 8 && div1_class_value !== (div1_class_value = "searchBar " + (/*resultsAvailable*/ ctx[3] && "resultsAvailable") + " svelte-v9vsqt")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (/*resultsAvailable*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$d(ctx);
    					if_block.c();
    					if_block.m(div2, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { placeholder = "" } = $$props;
    	var { value = "" } = $$props;
    	var { results = [] } = $$props;

    	// Functions
    	function clickedOnResult(result) {
    		dispatch("pickedResult", result);
    	}

    	const writable_props = ["placeholder", "value", "results"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SearchBar> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SearchBar", $$slots, []);

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	const click_handler = result => clickedOnResult(result);

    	$$self.$set = $$props => {
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("results" in $$props) $$invalidate(2, results = $$props.results);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		placeholder,
    		value,
    		results,
    		clickedOnResult,
    		resultsAvailable
    	});

    	$$self.$inject_state = $$props => {
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("results" in $$props) $$invalidate(2, results = $$props.results);
    		if ("resultsAvailable" in $$props) $$invalidate(3, resultsAvailable = $$props.resultsAvailable);
    	};

    	let resultsAvailable;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*results*/ 4) {
    			// Computed
    			 $$invalidate(3, resultsAvailable = results.length > 0);
    		}
    	};

    	return [
    		value,
    		placeholder,
    		results,
    		resultsAvailable,
    		clickedOnResult,
    		dispatch,
    		input_input_handler,
    		click_handler
    	];
    }

    class SearchBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { placeholder: 1, value: 0, results: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SearchBar",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get placeholder() {
    		throw new Error("<SearchBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<SearchBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<SearchBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<SearchBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get results() {
    		throw new Error("<SearchBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set results(value) {
    		throw new Error("<SearchBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\SearchBarResult.svelte generated by Svelte v3.19.2 */

    function create_fragment$C(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SearchBarResult> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SearchBarResult", $$slots, []);
    	return [];
    }

    class SearchBarResult extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SearchBarResult",
    			options,
    			id: create_fragment$C.name
    		});
    	}
    }

    /* src\components\AddressSearchBar.svelte generated by Svelte v3.19.2 */

    function create_fragment$D(ctx) {
    	let updating_value;
    	let current;

    	function searchbar_value_binding(value) {
    		/*searchbar_value_binding*/ ctx[8].call(null, value);
    	}

    	let searchbar_props = { results: /*results*/ ctx[1] };

    	if (/*query*/ ctx[0] !== void 0) {
    		searchbar_props.value = /*query*/ ctx[0];
    	}

    	const searchbar = new SearchBar({ props: searchbar_props, $$inline: true });
    	binding_callbacks.push(() => bind(searchbar, "value", searchbar_value_binding));
    	searchbar.$on("pickedResult", /*pickedResult_handler*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(searchbar.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(searchbar, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const searchbar_changes = {};
    			if (dirty & /*results*/ 2) searchbar_changes.results = /*results*/ ctx[1];

    			if (!updating_value && dirty & /*query*/ 1) {
    				updating_value = true;
    				searchbar_changes.value = /*query*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			searchbar.$set(searchbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(searchbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(searchbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(searchbar, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { query = "" } = $$props;

    	// Data
    	var results = [];

    	var timer;
    	var firstResult = true;

    	// Functions
    	function trySearch() {
    		if (timer) clearTimeout(timer);
    		timer = setTimeout(() => doSearch(), 1000);
    	}

    	async function doSearch() {
    		if (firstResult) {
    			firstResult = !firstResult;
    			return;
    		}

    		if (query === "") return;
    		var response = await fetch(`https://1313.nl/geocoder/${query}*`).then(r => r.json());

    		$$invalidate(1, results = response.features.map(result => {
    			var [long, lat] = result.geometry.coordinates;

    			return {
    				icon: "map-marker-circle",
    				name: result.properties.search,
    				location: { lat, long },
    				...result
    			};
    		}));
    	}

    	function pickResult({ detail: result }) {
    		$$invalidate(1, results = []);
    		$$invalidate(0, query = result.name);

    		// Timer needs to be cleared after svelte has updated the listeners
    		queueMicrotask(() => {
    			if (timer) clearTimeout(timer);
    		});

    		result.address = result.name;
    		result.name = "Zoek resultaat";
    		dispatch("pickedResult", result);
    	}

    	const writable_props = ["query"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressSearchBar> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AddressSearchBar", $$slots, []);

    	function searchbar_value_binding(value) {
    		query = value;
    		$$invalidate(0, query);
    	}

    	const pickedResult_handler = result => pickResult(result);

    	$$self.$set = $$props => {
    		if ("query" in $$props) $$invalidate(0, query = $$props.query);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		SearchBar,
    		SearchBarResult,
    		query,
    		results,
    		timer,
    		firstResult,
    		trySearch,
    		doSearch,
    		pickResult
    	});

    	$$self.$inject_state = $$props => {
    		if ("query" in $$props) $$invalidate(0, query = $$props.query);
    		if ("results" in $$props) $$invalidate(1, results = $$props.results);
    		if ("timer" in $$props) timer = $$props.timer;
    		if ("firstResult" in $$props) firstResult = $$props.firstResult;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*query*/ 1) {
    			// Computed
    			 trySearch();
    		}
    	};

    	return [
    		query,
    		results,
    		pickResult,
    		timer,
    		firstResult,
    		dispatch,
    		trySearch,
    		doSearch,
    		searchbar_value_binding,
    		pickedResult_handler
    	];
    }

    class AddressSearchBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { query: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressSearchBar",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get query() {
    		throw new Error("<AddressSearchBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<AddressSearchBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\AddressEditor.svelte generated by Svelte v3.19.2 */

    const { console: console_1$6 } = globals;

    // (4:8) <Button icon="content-save-outline" on:click={save}>
    function create_default_slot_2$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Sla op");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$7.name,
    		type: "slot",
    		source: "(4:8) <Button icon=\\\"content-save-outline\\\" on:click={save}>",
    		ctx
    	});

    	return block;
    }

    // (3:4) <ButtonContainer>
    function create_default_slot_1$7(ctx) {
    	let current;

    	const button = new Button({
    			props: {
    				icon: "content-save-outline",
    				$$slots: { default: [create_default_slot_2$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*save*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(3:4) <ButtonContainer>",
    		ctx
    	});

    	return block;
    }

    // (1:0) <SpaceBetween>
    function create_default_slot$9(ctx) {
    	let t;
    	let current;

    	const addresssearchbar = new AddressSearchBar({
    			props: { query: /*addressObject*/ ctx[0].address },
    			$$inline: true
    		});

    	addresssearchbar.$on("pickedResult", /*selectResult*/ ctx[1]);

    	const buttoncontainer = new ButtonContainer({
    			props: {
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(addresssearchbar.$$.fragment);
    			t = space();
    			create_component(buttoncontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(addresssearchbar, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(buttoncontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const addresssearchbar_changes = {};
    			if (dirty & /*addressObject*/ 1) addresssearchbar_changes.query = /*addressObject*/ ctx[0].address;
    			addresssearchbar.$set(addresssearchbar_changes);
    			const buttoncontainer_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				buttoncontainer_changes.$$scope = { dirty, ctx };
    			}

    			buttoncontainer.$set(buttoncontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addresssearchbar.$$.fragment, local);
    			transition_in(buttoncontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addresssearchbar.$$.fragment, local);
    			transition_out(buttoncontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(addresssearchbar, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(buttoncontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(1:0) <SpaceBetween>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let current;

    	const spacebetween = new SpaceBetween({
    			props: {
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(spacebetween.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(spacebetween, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const spacebetween_changes = {};

    			if (dirty & /*$$scope, addressObject*/ 65) {
    				spacebetween_changes.$$scope = { dirty, ctx };
    			}

    			spacebetween.$set(spacebetween_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spacebetween.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spacebetween.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(spacebetween, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	var { addressId } = $$props;

    	// Data
    	var selectedResult = null;

    	// Functions
    	function selectResult({ detail: result }) {
    		console.log(result);
    		selectedResult = result;
    	}

    	function save() {
    		let addressObjectCopy = { ...addressObject };

    		if (selectedResult) {
    			addressObjectCopy.location = selectedResult.location;
    			addressObjectCopy.address = selectedResult.address;
    		}

    		saveAddress(addressId, addressObjectCopy);
    		dispatch("saved");
    	}

    	const writable_props = ["addressId"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$6.warn(`<AddressEditor> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AddressEditor", $$slots, []);

    	$$self.$set = $$props => {
    		if ("addressId" in $$props) $$invalidate(3, addressId = $$props.addressId);
    	};

    	$$self.$capture_state = () => ({
    		getAddressById,
    		saveAddress,
    		createEventDispatcher,
    		dispatch,
    		SpaceBetween,
    		AddressSearchBar,
    		ButtonContainer,
    		Button,
    		addressId,
    		selectedResult,
    		selectResult,
    		save,
    		addressObject
    	});

    	$$self.$inject_state = $$props => {
    		if ("addressId" in $$props) $$invalidate(3, addressId = $$props.addressId);
    		if ("selectedResult" in $$props) selectedResult = $$props.selectedResult;
    		if ("addressObject" in $$props) $$invalidate(0, addressObject = $$props.addressObject);
    	};

    	let addressObject;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*addressId*/ 8) {
    			// Computed
    			 $$invalidate(0, addressObject = getAddressById(addressId));
    		}
    	};

    	return [addressObject, selectResult, save, addressId];
    }

    class AddressEditor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { addressId: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressEditor",
    			options,
    			id: create_fragment$E.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*addressId*/ ctx[3] === undefined && !("addressId" in props)) {
    			console_1$6.warn("<AddressEditor> was created without expected prop 'addressId'");
    		}
    	}

    	get addressId() {
    		throw new Error("<AddressEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addressId(value) {
    		throw new Error("<AddressEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Address.svelte generated by Svelte v3.19.2 */
    const file$B = "src\\components\\Address.svelte";

    // (7:8) <span slot="left">
    function create_left_slot$4(ctx) {
    	let span0;
    	let span1;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span1 = element("span");
    			t0 = space();
    			t1 = text(/*physicalAddress*/ ctx[3]);
    			attr_dev(span1, "class", "mdi mdi-road-variant");
    			add_location(span1, file$B, 6, 26, 243);
    			attr_dev(span0, "slot", "left");
    			add_location(span0, file$B, 6, 8, 225);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, span1);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*physicalAddress*/ 8) set_data_dev(t1, /*physicalAddress*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$4.name,
    		type: "slot",
    		source: "(7:8) <span slot=\\\"left\\\">",
    		ctx
    	});

    	return block;
    }

    // (10:8) <SoftButton icon="pencil" on:click={() => editOpen = true}>
    function create_default_slot_2$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Pas aan");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$8.name,
    		type: "slot",
    		source: "(10:8) <SoftButton icon=\\\"pencil\\\" on:click={() => editOpen = true}>",
    		ctx
    	});

    	return block;
    }

    // (11:8) <SoftButton icon="format-list-numbered">
    function create_default_slot_1$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Regels");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$8.name,
    		type: "slot",
    		source: "(11:8) <SoftButton icon=\\\"format-list-numbered\\\">",
    		ctx
    	});

    	return block;
    }

    // (14:0) <Popup bind:open={editOpen}>
    function create_default_slot$a(ctx) {
    	let current;

    	const addresseditor = new AddressEditor({
    			props: { addressId: /*address*/ ctx[0].id },
    			$$inline: true
    		});

    	addresseditor.$on("saved", /*saved_handler*/ ctx[7]);

    	const block = {
    		c: function create() {
    			create_component(addresseditor.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(addresseditor, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const addresseditor_changes = {};
    			if (dirty & /*address*/ 1) addresseditor_changes.addressId = /*address*/ ctx[0].id;
    			addresseditor.$set(addresseditor_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addresseditor.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addresseditor.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(addresseditor, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(14:0) <Popup bind:open={editOpen}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let div1;
    	let h3;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*address*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let t3;
    	let div0;
    	let t4;
    	let div1_class_value;
    	let outsideClick_action;
    	let t5;
    	let updating_open;
    	let current;
    	let dispose;

    	const inforow = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const softbutton0 = new SoftButton({
    			props: {
    				icon: "pencil",
    				$$slots: { default: [create_default_slot_2$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton0.$on("click", /*click_handler*/ ctx[6]);

    	const softbutton1 = new SoftButton({
    			props: {
    				icon: "format-list-numbered",
    				$$slots: { default: [create_default_slot_1$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function popup_open_binding(value) {
    		/*popup_open_binding*/ ctx[8].call(null, value);
    	}

    	let popup_props = {
    		$$slots: { default: [create_default_slot$a] },
    		$$scope: { ctx }
    	};

    	if (/*editOpen*/ ctx[2] !== void 0) {
    		popup_props.open = /*editOpen*/ ctx[2];
    	}

    	const popup = new Popup({ props: popup_props, $$inline: true });
    	binding_callbacks.push(() => bind(popup, "open", popup_open_binding));

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h3 = element("h3");
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			create_component(inforow.$$.fragment);
    			t3 = space();
    			div0 = element("div");
    			create_component(softbutton0.$$.fragment);
    			t4 = space();
    			create_component(softbutton1.$$.fragment);
    			t5 = space();
    			create_component(popup.$$.fragment);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-1x1ek8l");
    			add_location(span, file$B, 2, 8, 121);
    			attr_dev(h3, "class", "header svelte-1x1ek8l");
    			add_location(h3, file$B, 1, 4, 92);
    			attr_dev(div0, "class", "buttons svelte-1x1ek8l");
    			add_location(div0, file$B, 8, 4, 332);
    			attr_dev(div1, "class", div1_class_value = "address " + (/*currentTab*/ ctx[1] !== "" ? "tabOpen" : "") + " svelte-1x1ek8l");
    			add_location(div1, file$B, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h3);
    			append_dev(h3, span);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			append_dev(div1, t2);
    			mount_component(inforow, div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			mount_component(softbutton0, div0, null);
    			append_dev(div0, t4);
    			mount_component(softbutton1, div0, null);
    			insert_dev(target, t5, anchor);
    			mount_component(popup, target, anchor);
    			current = true;
    			dispose = action_destroyer(outsideClick_action = clickOutside.call(null, div1, /*closeTab*/ ctx[4]));
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*address*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-1x1ek8l")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if ((!current || dirty & /*address*/ 1) && t1_value !== (t1_value = /*address*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			const inforow_changes = {};

    			if (dirty & /*$$scope, physicalAddress*/ 520) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);
    			const softbutton0_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				softbutton0_changes.$$scope = { dirty, ctx };
    			}

    			softbutton0.$set(softbutton0_changes);
    			const softbutton1_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				softbutton1_changes.$$scope = { dirty, ctx };
    			}

    			softbutton1.$set(softbutton1_changes);

    			if (!current || dirty & /*currentTab*/ 2 && div1_class_value !== (div1_class_value = "address " + (/*currentTab*/ ctx[1] !== "" ? "tabOpen" : "") + " svelte-1x1ek8l")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			const popup_changes = {};

    			if (dirty & /*$$scope, address, editOpen*/ 517) {
    				popup_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*editOpen*/ 4) {
    				updating_open = true;
    				popup_changes.open = /*editOpen*/ ctx[2];
    				add_flush_callback(() => updating_open = false);
    			}

    			popup.$set(popup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow.$$.fragment, local);
    			transition_in(softbutton0.$$.fragment, local);
    			transition_in(softbutton1.$$.fragment, local);
    			transition_in(popup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			transition_out(softbutton0.$$.fragment, local);
    			transition_out(softbutton1.$$.fragment, local);
    			transition_out(popup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(inforow);
    			destroy_component(softbutton0);
    			destroy_component(softbutton1);
    			if (detaching) detach_dev(t5);
    			destroy_component(popup, detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	var { address } = $$props;

    	// Data
    	var currentTab = "";

    	var editOpen = false;

    	// Functions
    	function openTab(tab) {
    		$$invalidate(1, currentTab = tab);
    	}

    	function closeTab() {
    		$$invalidate(1, currentTab = "");
    	}

    	const writable_props = ["address"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Address> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Address", $$slots, []);
    	const click_handler = () => $$invalidate(2, editOpen = true);
    	const saved_handler = () => $$invalidate(2, editOpen = false);

    	function popup_open_binding(value) {
    		editOpen = value;
    		$$invalidate(2, editOpen);
    	}

    	$$self.$set = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    	};

    	$$self.$capture_state = () => ({
    		outsideClick: clickOutside,
    		AddressEditor,
    		InfoRow,
    		SoftButton,
    		ButtonContainer,
    		Popup,
    		address,
    		currentTab,
    		editOpen,
    		openTab,
    		closeTab,
    		physicalAddress
    	});

    	$$self.$inject_state = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    		if ("currentTab" in $$props) $$invalidate(1, currentTab = $$props.currentTab);
    		if ("editOpen" in $$props) $$invalidate(2, editOpen = $$props.editOpen);
    		if ("physicalAddress" in $$props) $$invalidate(3, physicalAddress = $$props.physicalAddress);
    	};

    	let physicalAddress;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*address*/ 1) {
    			// Computed
    			 $$invalidate(3, physicalAddress = address.address
    			? address.address
    			: "(geen address ingesteld)");
    		}
    	};

    	return [
    		address,
    		currentTab,
    		editOpen,
    		physicalAddress,
    		closeTab,
    		openTab,
    		click_handler,
    		saved_handler,
    		popup_open_binding
    	];
    }

    class Address extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, { address: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Address",
    			options,
    			id: create_fragment$F.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*address*/ ctx[0] === undefined && !("address" in props)) {
    			console.warn("<Address> was created without expected prop 'address'");
    		}
    	}

    	get address() {
    		throw new Error("<Address>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set address(value) {
    		throw new Error("<Address>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\views\AddressView.svelte generated by Svelte v3.19.2 */

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[4] = list;
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (2:4) {#each addresses as address}
    function create_each_block$9(ctx) {
    	let updating_address;
    	let current;

    	function address_address_binding(value) {
    		/*address_address_binding*/ ctx[2].call(null, value, /*address*/ ctx[3], /*each_value*/ ctx[4], /*address_index*/ ctx[5]);
    	}

    	let address_props = {};

    	if (/*address*/ ctx[3] !== void 0) {
    		address_props.address = /*address*/ ctx[3];
    	}

    	const address = new Address({ props: address_props, $$inline: true });
    	binding_callbacks.push(() => bind(address, "address", address_address_binding));
    	address.$on("change", onChange);

    	const block = {
    		c: function create() {
    			create_component(address.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(address, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const address_changes = {};

    			if (!updating_address && dirty & /*addresses*/ 1) {
    				updating_address = true;
    				address_changes.address = /*address*/ ctx[3];
    				add_flush_callback(() => updating_address = false);
    			}

    			address.$set(address_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(address.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(address.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(address, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(2:4) {#each addresses as address}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <LayoutCenter>
    function create_default_slot$b(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*addresses*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*addresses, onChange*/ 1) {
    				each_value = /*addresses*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(1:0) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layoutcenter.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutcenter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, addresses*/ 65) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutcenter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function onChange() {
    	
    }

    function instance$G($$self, $$props, $$invalidate) {
    	let $addressStore;
    	validate_store(addressStore, "addressStore");
    	component_subscribe($$self, addressStore, $$value => $$invalidate(1, $addressStore = $$value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressView> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AddressView", $$slots, []);

    	function address_address_binding(value, address, each_value, address_index) {
    		each_value[address_index] = value;
    		($$invalidate(0, addresses), $$invalidate(1, $addressStore));
    	}

    	$$self.$capture_state = () => ({
    		getAddresses,
    		addressStore,
    		Address,
    		LayoutCenter,
    		onChange,
    		addresses,
    		$addressStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("addresses" in $$props) $$invalidate(0, addresses = $$props.addresses);
    	};

    	let addresses;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$addressStore*/ 2) {
    			// Computed
    			 $$invalidate(0, addresses = getAddresses());
    		}
    	};

    	return [addresses, $addressStore, address_address_binding];
    }

    class AddressView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressView",
    			options,
    			id: create_fragment$G.name
    		});
    	}
    }

    const settingsStore = writableLinked("settings", {});

    settingsStore.set({
        preferPopup: false,
        experimentalFeatures: false,
        logUsage: true,
        ...settingsStore.get(),
    });

    /* src\components\Checkbox.svelte generated by Svelte v3.19.2 */

    const file$C = "src\\components\\Checkbox.svelte";

    // (2:4) {#if checked}
    function create_if_block$e(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdi mdi-check svelte-bjippw");
    			add_location(span, file$C, 2, 8, 92);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(2:4) {#if checked}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$H(ctx) {
    	let div;
    	let div_class_value;
    	let dispose;
    	let if_block = /*checked*/ ctx[0] && create_if_block$e(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = "checkbox " + (/*checked*/ ctx[0] && "checked") + " svelte-bjippw");
    			add_location(div, file$C, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			dispose = listen_dev(div, "click", /*toggle*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*checked*/ ctx[0]) {
    				if (!if_block) {
    					if_block = create_if_block$e(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*checked*/ 1 && div_class_value !== (div_class_value = "checkbox " + (/*checked*/ ctx[0] && "checked") + " svelte-bjippw")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props, $$invalidate) {
    	var { checked = false } = $$props;
    	var { handleChecked = true } = $$props;

    	// Functions
    	function toggle() {
    		if (handleChecked) $$invalidate(0, checked = !checked);
    	}

    	const writable_props = ["checked", "handleChecked"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Checkbox> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Checkbox", $$slots, []);

    	$$self.$set = $$props => {
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("handleChecked" in $$props) $$invalidate(2, handleChecked = $$props.handleChecked);
    	};

    	$$self.$capture_state = () => ({ checked, handleChecked, toggle });

    	$$self.$inject_state = $$props => {
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("handleChecked" in $$props) $$invalidate(2, handleChecked = $$props.handleChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, toggle, handleChecked];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, { checked: 0, handleChecked: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$H.name
    		});
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get handleChecked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set handleChecked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Setting.svelte generated by Svelte v3.19.2 */
    const file$D = "src\\components\\Setting.svelte";

    function create_fragment$I(ctx) {
    	let div4;
    	let div3;
    	let div1;
    	let div0;
    	let t0;
    	let div2;
    	let p;
    	let t1;
    	let t2;
    	let current;
    	let dispose;

    	const checkbox = new Checkbox({
    			props: {
    				handleChecked: false,
    				checked: /*value*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(checkbox.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			p = element("p");
    			t1 = text(/*text*/ ctx[1]);
    			t2 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "innerFloater svelte-1xmnbfn");
    			add_location(div0, file$D, 3, 12, 130);
    			attr_dev(div1, "class", "checkboxWrapper svelte-1xmnbfn");
    			add_location(div1, file$D, 2, 8, 87);
    			attr_dev(p, "class", "svelte-1xmnbfn");
    			add_location(p, file$D, 8, 12, 317);
    			attr_dev(div2, "class", "settingTitleWrapper svelte-1xmnbfn");
    			add_location(div2, file$D, 7, 8, 270);
    			attr_dev(div3, "class", "settingHeader svelte-1xmnbfn");
    			add_location(div3, file$D, 1, 4, 27);
    			attr_dev(div4, "class", "setting");
    			add_location(div4, file$D, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			mount_component(checkbox, div0, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, p);
    			append_dev(p, t1);
    			append_dev(div4, t2);

    			if (default_slot) {
    				default_slot.m(div4, null);
    			}

    			current = true;
    			dispose = listen_dev(div3, "click", /*toggleValue*/ ctx[2], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			const checkbox_changes = {};
    			if (dirty & /*value*/ 1) checkbox_changes.checked = /*value*/ ctx[0];
    			checkbox.$set(checkbox_changes);
    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 8) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(checkbox);
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props, $$invalidate) {
    	var { value = false } = $$props;
    	var { text = "" } = $$props;

    	// Functions
    	function toggleValue(event) {
    		$$invalidate(0, value = !value);
    	}

    	const writable_props = ["value", "text"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Setting> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Setting", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Checkbox, value, text, toggleValue });

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, text, toggleValue, $$scope, $$slots];
    }

    class Setting extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, { value: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Setting",
    			options,
    			id: create_fragment$I.name
    		});
    	}

    	get value() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\views\SettingsView.svelte generated by Svelte v3.19.2 */
    const file$E = "src\\views\\SettingsView.svelte";

    // (4:12) <Setting bind:value={$settingsStore.preferPopup} text="Extra informatie in popup">
    function create_default_slot_7$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Als deze instelling aan staat krijg je een popup als je op meer info drukt in plaats van een dropdown.";
    			attr_dev(p, "class", "svelte-1rf1ezo");
    			add_location(p, file$E, 4, 16, 179);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(4:12) <Setting bind:value={$settingsStore.preferPopup} text=\\\"Extra informatie in popup\\\">",
    		ctx
    	});

    	return block;
    }

    // (7:12) <Setting bind:value={$settingsStore.experimentalFeatures} text="Experimentele functies">
    function create_default_slot_6$2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Als deze instelling aan staat kan je nieuwe functies uitproberen voordat ze officeel klaar zijn. Houd er wel rekening mee dat dit ervoor kan zorgen dat de app minder of zelfs helemaal niet meer werkt. Dus wees heel voorzichtig met deze instelling.";
    			attr_dev(p, "class", "svelte-1rf1ezo");
    			add_location(p, file$E, 7, 16, 432);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(7:12) <Setting bind:value={$settingsStore.experimentalFeatures} text=\\\"Experimentele functies\\\">",
    		ctx
    	});

    	return block;
    }

    // (13:20) <Button icon="view-list-outline">
    function create_default_slot_5$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Bekijk log");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(13:20) <Button icon=\\\"view-list-outline\\\">",
    		ctx
    	});

    	return block;
    }

    // (14:20) <Button icon="download">
    function create_default_slot_4$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Download");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(14:20) <Button icon=\\\"download\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:16) <ButtonContainer>
    function create_default_slot_3$4(ctx) {
    	let t;
    	let current;

    	const button0 = new Button({
    			props: {
    				icon: "view-list-outline",
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button1 = new Button({
    			props: {
    				icon: "download",
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t = space();
    			create_component(button1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(12:16) <ButtonContainer>",
    		ctx
    	});

    	return block;
    }

    // (10:12) <Setting bind:value={$settingsStore.logUsage} text="Log gebruik">
    function create_default_slot_2$9(ctx) {
    	let p;
    	let t1;
    	let current;

    	const buttoncontainer = new ButtonContainer({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Als deze instelling aan staat wordt er een log bijgehouden over wat de app doet. Dit blijft op jou apparaat todat je ervoor kiest om dit te delen. Als je de log deelt, kan je ervoor kiezen day alle addressen verwijderd uit de log. Verder kan je ervoor kiezen of coordinaten worden gehusselt wat wil zeggen dat in plaats van de exacte locatie in het log staat, het een locatie in de buurt is. Of als je echt niet wilt dat er persoonlijke gegevens worden gestuurd kan je ervoor kiezen om alle addressen en coordinaten uit het log te verwijderen.";
    			t1 = space();
    			create_component(buttoncontainer.$$.fragment);
    			attr_dev(p, "class", "svelte-1rf1ezo");
    			add_location(p, file$E, 10, 16, 807);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(buttoncontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttoncontainer_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				buttoncontainer_changes.$$scope = { dirty, ctx };
    			}

    			buttoncontainer.$set(buttoncontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttoncontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttoncontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			destroy_component(buttoncontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$9.name,
    		type: "slot",
    		source: "(10:12) <Setting bind:value={$settingsStore.logUsage} text=\\\"Log gebruik\\\">",
    		ctx
    	});

    	return block;
    }

    // (3:8) <SpaceBetween>
    function create_default_slot_1$9(ctx) {
    	let updating_value;
    	let t0;
    	let updating_value_1;
    	let t1;
    	let updating_value_2;
    	let current;

    	function setting0_value_binding(value) {
    		/*setting0_value_binding*/ ctx[1].call(null, value);
    	}

    	let setting0_props = {
    		text: "Extra informatie in popup",
    		$$slots: { default: [create_default_slot_7$1] },
    		$$scope: { ctx }
    	};

    	if (/*$settingsStore*/ ctx[0].preferPopup !== void 0) {
    		setting0_props.value = /*$settingsStore*/ ctx[0].preferPopup;
    	}

    	const setting0 = new Setting({ props: setting0_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting0, "value", setting0_value_binding));

    	function setting1_value_binding(value) {
    		/*setting1_value_binding*/ ctx[2].call(null, value);
    	}

    	let setting1_props = {
    		text: "Experimentele functies",
    		$$slots: { default: [create_default_slot_6$2] },
    		$$scope: { ctx }
    	};

    	if (/*$settingsStore*/ ctx[0].experimentalFeatures !== void 0) {
    		setting1_props.value = /*$settingsStore*/ ctx[0].experimentalFeatures;
    	}

    	const setting1 = new Setting({ props: setting1_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting1, "value", setting1_value_binding));

    	function setting2_value_binding(value) {
    		/*setting2_value_binding*/ ctx[3].call(null, value);
    	}

    	let setting2_props = {
    		text: "Log gebruik",
    		$$slots: { default: [create_default_slot_2$9] },
    		$$scope: { ctx }
    	};

    	if (/*$settingsStore*/ ctx[0].logUsage !== void 0) {
    		setting2_props.value = /*$settingsStore*/ ctx[0].logUsage;
    	}

    	const setting2 = new Setting({ props: setting2_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting2, "value", setting2_value_binding));

    	const block = {
    		c: function create() {
    			create_component(setting0.$$.fragment);
    			t0 = space();
    			create_component(setting1.$$.fragment);
    			t1 = space();
    			create_component(setting2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(setting1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(setting2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const setting0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				setting0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*$settingsStore*/ 1) {
    				updating_value = true;
    				setting0_changes.value = /*$settingsStore*/ ctx[0].preferPopup;
    				add_flush_callback(() => updating_value = false);
    			}

    			setting0.$set(setting0_changes);
    			const setting1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				setting1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_1 && dirty & /*$settingsStore*/ 1) {
    				updating_value_1 = true;
    				setting1_changes.value = /*$settingsStore*/ ctx[0].experimentalFeatures;
    				add_flush_callback(() => updating_value_1 = false);
    			}

    			setting1.$set(setting1_changes);
    			const setting2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				setting2_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_2 && dirty & /*$settingsStore*/ 1) {
    				updating_value_2 = true;
    				setting2_changes.value = /*$settingsStore*/ ctx[0].logUsage;
    				add_flush_callback(() => updating_value_2 = false);
    			}

    			setting2.$set(setting2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting0.$$.fragment, local);
    			transition_in(setting1.$$.fragment, local);
    			transition_in(setting2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting0.$$.fragment, local);
    			transition_out(setting1.$$.fragment, local);
    			transition_out(setting2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(setting1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(setting2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$9.name,
    		type: "slot",
    		source: "(3:8) <SpaceBetween>",
    		ctx
    	});

    	return block;
    }

    // (1:0) <LayoutCenter>
    function create_default_slot$c(ctx) {
    	let div;
    	let current;

    	const spacebetween = new SpaceBetween({
    			props: {
    				$$slots: { default: [create_default_slot_1$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(spacebetween.$$.fragment);
    			attr_dev(div, "class", "padding svelte-1rf1ezo");
    			add_location(div, file$E, 1, 4, 20);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(spacebetween, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const spacebetween_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 17) {
    				spacebetween_changes.$$scope = { dirty, ctx };
    			}

    			spacebetween.$set(spacebetween_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spacebetween.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spacebetween.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(spacebetween);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(1:0) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$J(ctx) {
    	let current;

    	const layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layoutcenter.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutcenter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 17) {
    				layoutcenter_changes.$$scope = { dirty, ctx };
    			}

    			layoutcenter.$set(layoutcenter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutcenter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutcenter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutcenter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, "settingsStore");
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SettingsView> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SettingsView", $$slots, []);

    	function setting0_value_binding(value) {
    		$settingsStore.preferPopup = value;
    		settingsStore.set($settingsStore);
    	}

    	function setting1_value_binding(value) {
    		$settingsStore.experimentalFeatures = value;
    		settingsStore.set($settingsStore);
    	}

    	function setting2_value_binding(value) {
    		$settingsStore.logUsage = value;
    		settingsStore.set($settingsStore);
    	}

    	$$self.$capture_state = () => ({
    		settingsStore,
    		LayoutCenter,
    		SpaceBetween,
    		Setting,
    		Button,
    		ButtonContainer,
    		$settingsStore
    	});

    	return [
    		$settingsStore,
    		setting0_value_binding,
    		setting1_value_binding,
    		setting2_value_binding
    	];
    }

    class SettingsView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SettingsView",
    			options,
    			id: create_fragment$J.name
    		});
    	}
    }

    var routes = {
        "/": DashboardView,
        "/addressbook": AddressView,
        "/settings": SettingsView,
    };

    /* src\App.svelte generated by Svelte v3.19.2 */

    const file$F = "src\\App.svelte";

    // (5:4) {:else}
    function create_else_block$5(ctx) {
    	let current;
    	const router = new Router({ props: { routes }, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(5:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (3:4) {#if loading}
    function create_if_block$f(ctx) {
    	let h6;

    	const block = {
    		c: function create() {
    			h6 = element("h6");
    			h6.textContent = "Loading";
    			attr_dev(h6, "class", "svelte-1y707n6");
    			add_location(h6, file$F, 3, 8, 51);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h6, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(3:4) {#if loading}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$K(ctx) {
    	let main;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const header = new Header({ $$inline: true });
    	const if_block_creators = [create_if_block$f, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loading*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			if_block.c();
    			attr_dev(main, "class", "svelte-1y707n6");
    			add_location(main, file$F, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$K.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$K($$self, $$props, $$invalidate) {
    	var loading = true;

    	// Create
    	// registerServiceWorker();
    	preloadAssets().then(() => $$invalidate(0, loading = false));

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		registerServiceWorker,
    		preloadAssets,
    		Header,
    		Spinner,
    		Router,
    		routes,
    		loading
    	});

    	$$self.$inject_state = $$props => {
    		if ("loading" in $$props) $$invalidate(0, loading = $$props.loading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [loading];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$K.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
