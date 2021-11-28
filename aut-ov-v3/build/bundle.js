
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * Session Status
     */
    var SessionStatus;
    (function (SessionStatus) {
        /** JSDoc */
        SessionStatus["Ok"] = "ok";
        /** JSDoc */
        SessionStatus["Exited"] = "exited";
        /** JSDoc */
        SessionStatus["Crashed"] = "crashed";
        /** JSDoc */
        SessionStatus["Abnormal"] = "abnormal";
    })(SessionStatus || (SessionStatus = {}));
    var RequestSessionStatus;
    (function (RequestSessionStatus) {
        /** JSDoc */
        RequestSessionStatus["Ok"] = "ok";
        /** JSDoc */
        RequestSessionStatus["Errored"] = "errored";
        /** JSDoc */
        RequestSessionStatus["Crashed"] = "crashed";
    })(RequestSessionStatus || (RequestSessionStatus = {}));

    /** JSDoc */
    // eslint-disable-next-line import/export
    var Severity;
    (function (Severity) {
        /** JSDoc */
        Severity["Fatal"] = "fatal";
        /** JSDoc */
        Severity["Error"] = "error";
        /** JSDoc */
        Severity["Warning"] = "warning";
        /** JSDoc */
        Severity["Log"] = "log";
        /** JSDoc */
        Severity["Info"] = "info";
        /** JSDoc */
        Severity["Debug"] = "debug";
        /** JSDoc */
        Severity["Critical"] = "critical";
    })(Severity || (Severity = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace, import/export
    (function (Severity) {
        /**
         * Converts a string-based level into a {@link Severity}.
         *
         * @param level string representation of Severity
         * @returns Severity
         */
        function fromString(level) {
            switch (level) {
                case 'debug':
                    return Severity.Debug;
                case 'info':
                    return Severity.Info;
                case 'warn':
                case 'warning':
                    return Severity.Warning;
                case 'error':
                    return Severity.Error;
                case 'fatal':
                    return Severity.Fatal;
                case 'critical':
                    return Severity.Critical;
                case 'log':
                default:
                    return Severity.Log;
            }
        }
        Severity.fromString = fromString;
    })(Severity || (Severity = {}));

    /** The status of an event. */
    // eslint-disable-next-line import/export
    var Status;
    (function (Status) {
        /** The status could not be determined. */
        Status["Unknown"] = "unknown";
        /** The event was skipped due to configuration or callbacks. */
        Status["Skipped"] = "skipped";
        /** The event was sent to Sentry successfully. */
        Status["Success"] = "success";
        /** The client is currently rate limited and will try again later. */
        Status["RateLimit"] = "rate_limit";
        /** The event could not be processed. */
        Status["Invalid"] = "invalid";
        /** A server-side error occurred during submission. */
        Status["Failed"] = "failed";
    })(Status || (Status = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace, import/export
    (function (Status) {
        /**
         * Converts a HTTP status code into a {@link Status}.
         *
         * @param code The HTTP response status code.
         * @returns The send status or {@link Status.Unknown}.
         */
        function fromHttpCode(code) {
            if (code >= 200 && code < 300) {
                return Status.Success;
            }
            if (code === 429) {
                return Status.RateLimit;
            }
            if (code >= 400 && code < 500) {
                return Status.Invalid;
            }
            if (code >= 500) {
                return Status.Failed;
            }
            return Status.Unknown;
        }
        Status.fromHttpCode = fromHttpCode;
    })(Status || (Status = {}));

    var TransactionSamplingMethod;
    (function (TransactionSamplingMethod) {
        TransactionSamplingMethod["Explicit"] = "explicitly_set";
        TransactionSamplingMethod["Sampler"] = "client_sampler";
        TransactionSamplingMethod["Rate"] = "client_rate";
        TransactionSamplingMethod["Inheritance"] = "inheritance";
    })(TransactionSamplingMethod || (TransactionSamplingMethod = {}));

    var Outcome;
    (function (Outcome) {
        Outcome["BeforeSend"] = "before_send";
        Outcome["EventProcessor"] = "event_processor";
        Outcome["NetworkError"] = "network_error";
        Outcome["QueueOverflow"] = "queue_overflow";
        Outcome["RateLimitBackoff"] = "ratelimit_backoff";
        Outcome["SampleRate"] = "sample_rate";
    })(Outcome || (Outcome = {}));

    /**
     * Consumes the promise and logs the error when it rejects.
     * @param promise A promise to forget.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function forget(promise) {
        void promise.then(null, function (e) {
            // TODO: Use a better logging mechanism
            // eslint-disable-next-line no-console
            console.error(e);
        });
    }

    /**
     * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
     * you must either a) use `console.log` rather than the logger, or b) put your function elsewhere.
     */
    /**
     * Checks whether we're in the Node.js or Browser environment
     *
     * @returns Answer to given question
     */
    function isNodeEnv() {
        return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
    }
    /**
     * Requires a module which is protected against bundler minification.
     *
     * @param request The module path to resolve
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    function dynamicRequire(mod, request) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return mod.require(request);
    }
    /**
     * Helper for dynamically loading module that should work with linked dependencies.
     * The problem is that we _should_ be using `require(require.resolve(moduleName, { paths: [cwd()] }))`
     * However it's _not possible_ to do that with Webpack, as it has to know all the dependencies during
     * build time. `require.resolve` is also not available in any other way, so we cannot create,
     * a fake helper like we do with `dynamicRequire`.
     *
     * We always prefer to use local package, thus the value is not returned early from each `try/catch` block.
     * That is to mimic the behavior of `require.resolve` exactly.
     *
     * @param moduleName module name to require
     * @returns possibly required module
     */
    function loadModule(moduleName) {
        var mod;
        try {
            mod = dynamicRequire(module, moduleName);
        }
        catch (e) {
            // no-empty
        }
        try {
            var cwd = dynamicRequire(module, 'process').cwd;
            mod = dynamicRequire(module, cwd() + "/node_modules/" + moduleName);
        }
        catch (e) {
            // no-empty
        }
        return mod;
    }

    /**
     * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
     * you must either a) use `console.log` rather than the logger, or b) put your function elsewhere.
     */
    var fallbackGlobalObject = {};
    /**
     * Safely get global scope object
     *
     * @returns Global scope object
     */
    function getGlobalObject() {
        return (isNodeEnv()
            ? global
            : typeof window !== 'undefined' // eslint-disable-line no-restricted-globals
                ? window // eslint-disable-line no-restricted-globals
                : typeof self !== 'undefined'
                    ? self
                    : fallbackGlobalObject);
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /**
     * Checks whether given value's type is one of a few Error or Error-like
     * {@link isError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isError(wat) {
        switch (Object.prototype.toString.call(wat)) {
            case '[object Error]':
                return true;
            case '[object Exception]':
                return true;
            case '[object DOMException]':
                return true;
            default:
                return isInstanceOf(wat, Error);
        }
    }
    /**
     * Checks whether given value's type is ErrorEvent
     * {@link isErrorEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isErrorEvent(wat) {
        return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
    }
    /**
     * Checks whether given value's type is DOMError
     * {@link isDOMError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMError(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMError]';
    }
    /**
     * Checks whether given value's type is DOMException
     * {@link isDOMException}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMException(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMException]';
    }
    /**
     * Checks whether given value's type is a string
     * {@link isString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isString(wat) {
        return Object.prototype.toString.call(wat) === '[object String]';
    }
    /**
     * Checks whether given value's is a primitive (undefined, null, number, boolean, string, bigint, symbol)
     * {@link isPrimitive}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPrimitive(wat) {
        return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
    }
    /**
     * Checks whether given value's type is an object literal
     * {@link isPlainObject}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPlainObject(wat) {
        return Object.prototype.toString.call(wat) === '[object Object]';
    }
    /**
     * Checks whether given value's type is an Event instance
     * {@link isEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isEvent(wat) {
        return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
    }
    /**
     * Checks whether given value's type is an Element instance
     * {@link isElement}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isElement(wat) {
        return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
    }
    /**
     * Checks whether given value's type is an regexp
     * {@link isRegExp}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isRegExp(wat) {
        return Object.prototype.toString.call(wat) === '[object RegExp]';
    }
    /**
     * Checks whether given value has a then function.
     * @param wat A value to be checked.
     */
    function isThenable(wat) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Boolean(wat && wat.then && typeof wat.then === 'function');
    }
    /**
     * Checks whether given value's type is a SyntheticEvent
     * {@link isSyntheticEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isSyntheticEvent(wat) {
        return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
    }
    /**
     * Checks whether given value's type is an instance of provided constructor.
     * {@link isInstanceOf}.
     *
     * @param wat A value to be checked.
     * @param base A constructor to be used in a check.
     * @returns A boolean representing the result.
     */
    function isInstanceOf(wat, base) {
        try {
            return wat instanceof base;
        }
        catch (_e) {
            return false;
        }
    }

    /**
     * Given a child DOM element, returns a query-selector statement describing that
     * and its ancestors
     * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function htmlTreeAsString(elem, keyAttrs) {
        // try/catch both:
        // - accessing event.target (see getsentry/raven-js#838, #768)
        // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
        // - can throw an exception in some circumstances.
        try {
            var currentElem = elem;
            var MAX_TRAVERSE_HEIGHT = 5;
            var MAX_OUTPUT_LEN = 80;
            var out = [];
            var height = 0;
            var len = 0;
            var separator = ' > ';
            var sepLength = separator.length;
            var nextStr = void 0;
            // eslint-disable-next-line no-plusplus
            while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
                nextStr = _htmlElementAsString(currentElem, keyAttrs);
                // bail out if
                // - nextStr is the 'html' element
                // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
                //   (ignore this limit if we are on the first iteration)
                if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
                    break;
                }
                out.push(nextStr);
                len += nextStr.length;
                currentElem = currentElem.parentNode;
            }
            return out.reverse().join(separator);
        }
        catch (_oO) {
            return '<unknown>';
        }
    }
    /**
     * Returns a simple, query-selector representation of a DOM element
     * e.g. [HTMLElement] => input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function _htmlElementAsString(el, keyAttrs) {
        var _a, _b;
        var elem = el;
        var out = [];
        var className;
        var classes;
        var key;
        var attr;
        var i;
        if (!elem || !elem.tagName) {
            return '';
        }
        out.push(elem.tagName.toLowerCase());
        // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
        var keyAttrPairs = ((_a = keyAttrs) === null || _a === void 0 ? void 0 : _a.length) ? keyAttrs.filter(function (keyAttr) { return elem.getAttribute(keyAttr); }).map(function (keyAttr) { return [keyAttr, elem.getAttribute(keyAttr)]; })
            : null;
        if ((_b = keyAttrPairs) === null || _b === void 0 ? void 0 : _b.length) {
            keyAttrPairs.forEach(function (keyAttrPair) {
                out.push("[" + keyAttrPair[0] + "=\"" + keyAttrPair[1] + "\"]");
            });
        }
        else {
            if (elem.id) {
                out.push("#" + elem.id);
            }
            // eslint-disable-next-line prefer-const
            className = elem.className;
            if (className && isString(className)) {
                classes = className.split(/\s+/);
                for (i = 0; i < classes.length; i++) {
                    out.push("." + classes[i]);
                }
            }
        }
        var allowedAttrs = ['type', 'name', 'title', 'alt'];
        for (i = 0; i < allowedAttrs.length; i++) {
            key = allowedAttrs[i];
            attr = elem.getAttribute(key);
            if (attr) {
                out.push("[" + key + "=\"" + attr + "\"]");
            }
        }
        return out.join('');
    }
    /**
     * A safe form of location.href
     */
    function getLocationHref() {
        var global = getGlobalObject();
        try {
            return global.document.location.href;
        }
        catch (oO) {
            return '';
        }
    }

    var setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
    /**
     * setPrototypeOf polyfill using __proto__
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function setProtoOf(obj, proto) {
        // @ts-ignore __proto__ does not exist on obj
        obj.__proto__ = proto;
        return obj;
    }
    /**
     * setPrototypeOf polyfill using mixin
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function mixinProperties(obj, proto) {
        for (var prop in proto) {
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                // @ts-ignore typescript complains about indexing so we remove
                obj[prop] = proto[prop];
            }
        }
        return obj;
    }

    /** An error emitted by Sentry SDKs and related utilities. */
    var SentryError = /** @class */ (function (_super) {
        __extends(SentryError, _super);
        function SentryError(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = _newTarget.prototype.constructor.name;
            setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return SentryError;
    }(Error));

    /** Regular expression used to parse a Dsn. */
    var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    /** Error message */
    var ERROR_MESSAGE = 'Invalid Dsn';
    /** The Sentry Dsn, identifying a Sentry instance and project. */
    var Dsn = /** @class */ (function () {
        /** Creates a new Dsn component */
        function Dsn(from) {
            if (typeof from === 'string') {
                this._fromString(from);
            }
            else {
                this._fromComponents(from);
            }
            this._validate();
        }
        /**
         * Renders the string representation of this Dsn.
         *
         * By default, this will render the public representation without the password
         * component. To get the deprecated private representation, set `withPassword`
         * to true.
         *
         * @param withPassword When set to true, the password will be included.
         */
        Dsn.prototype.toString = function (withPassword) {
            if (withPassword === void 0) { withPassword = false; }
            var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, publicKey = _a.publicKey;
            return (protocol + "://" + publicKey + (withPassword && pass ? ":" + pass : '') +
                ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
        };
        /** Parses a string into this Dsn. */
        Dsn.prototype._fromString = function (str) {
            var match = DSN_REGEX.exec(str);
            if (!match) {
                throw new SentryError(ERROR_MESSAGE);
            }
            var _a = __read(match.slice(1), 6), protocol = _a[0], publicKey = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
            var path = '';
            var projectId = lastPath;
            var split = projectId.split('/');
            if (split.length > 1) {
                path = split.slice(0, -1).join('/');
                projectId = split.pop();
            }
            if (projectId) {
                var projectMatch = projectId.match(/^\d+/);
                if (projectMatch) {
                    projectId = projectMatch[0];
                }
            }
            this._fromComponents({ host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, publicKey: publicKey });
        };
        /** Maps Dsn components into this instance. */
        Dsn.prototype._fromComponents = function (components) {
            // TODO this is for backwards compatibility, and can be removed in a future version
            if ('user' in components && !('publicKey' in components)) {
                components.publicKey = components.user;
            }
            this.user = components.publicKey || '';
            this.protocol = components.protocol;
            this.publicKey = components.publicKey || '';
            this.pass = components.pass || '';
            this.host = components.host;
            this.port = components.port || '';
            this.path = components.path || '';
            this.projectId = components.projectId;
        };
        /** Validates this Dsn and throws on error. */
        Dsn.prototype._validate = function () {
            var _this = this;
            ['protocol', 'publicKey', 'host', 'projectId'].forEach(function (component) {
                if (!_this[component]) {
                    throw new SentryError(ERROR_MESSAGE + ": " + component + " missing");
                }
            });
            if (!this.projectId.match(/^\d+$/)) {
                throw new SentryError(ERROR_MESSAGE + ": Invalid projectId " + this.projectId);
            }
            if (this.protocol !== 'http' && this.protocol !== 'https') {
                throw new SentryError(ERROR_MESSAGE + ": Invalid protocol " + this.protocol);
            }
            if (this.port && isNaN(parseInt(this.port, 10))) {
                throw new SentryError(ERROR_MESSAGE + ": Invalid port " + this.port);
            }
        };
        return Dsn;
    }());

    // TODO: Implement different loggers for different environments
    var global$9 = getGlobalObject();
    /** Prefix for logging strings */
    var PREFIX = 'Sentry Logger ';
    /**
     * Temporarily unwrap `console.log` and friends in order to perform the given callback using the original methods.
     * Restores wrapping after the callback completes.
     *
     * @param callback The function to run against the original `console` messages
     * @returns The results of the callback
     */
    function consoleSandbox(callback) {
        var global = getGlobalObject();
        var levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];
        if (!('console' in global)) {
            return callback();
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        var originalConsole = global.console;
        var wrappedLevels = {};
        // Restore all wrapped console methods
        levels.forEach(function (level) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (level in global.console && originalConsole[level].__sentry_original__) {
                wrappedLevels[level] = originalConsole[level];
                originalConsole[level] = originalConsole[level].__sentry_original__;
            }
        });
        // Perform callback manipulations
        var result = callback();
        // Revert restoration to wrapped state
        Object.keys(wrappedLevels).forEach(function (level) {
            originalConsole[level] = wrappedLevels[level];
        });
        return result;
    }
    /** JSDoc */
    var Logger = /** @class */ (function () {
        /** JSDoc */
        function Logger() {
            this._enabled = false;
        }
        /** JSDoc */
        Logger.prototype.disable = function () {
            this._enabled = false;
        };
        /** JSDoc */
        Logger.prototype.enable = function () {
            this._enabled = true;
        };
        /** JSDoc */
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._enabled) {
                return;
            }
            consoleSandbox(function () {
                global$9.console.log(PREFIX + "[Log]: " + args.join(' '));
            });
        };
        /** JSDoc */
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._enabled) {
                return;
            }
            consoleSandbox(function () {
                global$9.console.warn(PREFIX + "[Warn]: " + args.join(' '));
            });
        };
        /** JSDoc */
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._enabled) {
                return;
            }
            consoleSandbox(function () {
                global$9.console.error(PREFIX + "[Error]: " + args.join(' '));
            });
        };
        return Logger;
    }());
    // Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used
    global$9.__SENTRY__ = global$9.__SENTRY__ || {};
    var logger = global$9.__SENTRY__.logger || (global$9.__SENTRY__.logger = new Logger());

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /**
     * Memo class used for decycle json objects. Uses WeakSet if available otherwise array.
     */
    var Memo = /** @class */ (function () {
        function Memo() {
            this._hasWeakSet = typeof WeakSet === 'function';
            this._inner = this._hasWeakSet ? new WeakSet() : [];
        }
        /**
         * Sets obj to remember.
         * @param obj Object to remember
         */
        Memo.prototype.memoize = function (obj) {
            if (this._hasWeakSet) {
                if (this._inner.has(obj)) {
                    return true;
                }
                this._inner.add(obj);
                return false;
            }
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (var i = 0; i < this._inner.length; i++) {
                var value = this._inner[i];
                if (value === obj) {
                    return true;
                }
            }
            this._inner.push(obj);
            return false;
        };
        /**
         * Removes object from internal storage.
         * @param obj Object to forget
         */
        Memo.prototype.unmemoize = function (obj) {
            if (this._hasWeakSet) {
                this._inner.delete(obj);
            }
            else {
                for (var i = 0; i < this._inner.length; i++) {
                    if (this._inner[i] === obj) {
                        this._inner.splice(i, 1);
                        break;
                    }
                }
            }
        };
        return Memo;
    }());

    var defaultFunctionName = '<anonymous>';
    /**
     * Safely extract function name from itself
     */
    function getFunctionName(fn) {
        try {
            if (!fn || typeof fn !== 'function') {
                return defaultFunctionName;
            }
            return fn.name || defaultFunctionName;
        }
        catch (e) {
            // Just accessing custom props in some Selenium environments
            // can cause a "Permission denied" exception (see raven-js#495).
            return defaultFunctionName;
        }
    }

    /**
     * Truncates given string to the maximum characters count
     *
     * @param str An object that contains serializable values
     * @param max Maximum number of characters in truncated string (0 = unlimited)
     * @returns string Encoded
     */
    function truncate(str, max) {
        if (max === void 0) { max = 0; }
        if (typeof str !== 'string' || max === 0) {
            return str;
        }
        return str.length <= max ? str : str.substr(0, max) + "...";
    }
    /**
     * Join values in array
     * @param input array of values to be joined together
     * @param delimiter string to be placed in-between values
     * @returns Joined values
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function safeJoin(input, delimiter) {
        if (!Array.isArray(input)) {
            return '';
        }
        var output = [];
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (var i = 0; i < input.length; i++) {
            var value = input[i];
            try {
                output.push(String(value));
            }
            catch (e) {
                output.push('[value cannot be serialized]');
            }
        }
        return output.join(delimiter);
    }
    /**
     * Checks if the value matches a regex or includes the string
     * @param value The string value to be checked against
     * @param pattern Either a regex or a string that must be contained in value
     */
    function isMatchingPattern(value, pattern) {
        if (!isString(value)) {
            return false;
        }
        if (isRegExp(pattern)) {
            return pattern.test(value);
        }
        if (typeof pattern === 'string') {
            return value.indexOf(pattern) !== -1;
        }
        return false;
    }

    /**
     * Replace a method in an object with a wrapped version of itself.
     *
     * @param source An object that contains a method to be wrapped.
     * @param name The name of the method to be wrapped.
     * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
     * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
     * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
     * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
     * @returns void
     */
    function fill(source, name, replacementFactory) {
        if (!(name in source)) {
            return;
        }
        var original = source[name];
        var wrapped = replacementFactory(original);
        // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
        // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
        if (typeof wrapped === 'function') {
            try {
                wrapped.prototype = wrapped.prototype || {};
                Object.defineProperties(wrapped, {
                    __sentry_original__: {
                        enumerable: false,
                        value: original,
                    },
                });
            }
            catch (_Oo) {
                // This can throw if multiple fill happens on a global object like XMLHttpRequest
                // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
            }
        }
        source[name] = wrapped;
    }
    /**
     * Encodes given object into url-friendly format
     *
     * @param object An object that contains serializable values
     * @returns string Encoded
     */
    function urlEncode(object) {
        return Object.keys(object)
            .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
            .join('&');
    }
    /**
     * Transforms any object into an object literal with all its attributes
     * attached to it.
     *
     * @param value Initial source that we have to transform in order for it to be usable by the serializer
     */
    function getWalkSource(value) {
        if (isError(value)) {
            var error = value;
            var err = {
                message: error.message,
                name: error.name,
                stack: error.stack,
            };
            for (var i in error) {
                if (Object.prototype.hasOwnProperty.call(error, i)) {
                    err[i] = error[i];
                }
            }
            return err;
        }
        if (isEvent(value)) {
            var event_1 = value;
            var source = {};
            // Accessing event attributes can throw (see https://github.com/getsentry/sentry-javascript/issues/768 and
            // https://github.com/getsentry/sentry-javascript/issues/838), but accessing `type` hasn't been wrapped in a
            // try-catch in at least two years and no one's complained, so that's likely not an issue anymore
            source.type = event_1.type;
            try {
                source.target = isElement(event_1.target)
                    ? htmlTreeAsString(event_1.target)
                    : Object.prototype.toString.call(event_1.target);
            }
            catch (_oO) {
                source.target = '<unknown>';
            }
            try {
                source.currentTarget = isElement(event_1.currentTarget)
                    ? htmlTreeAsString(event_1.currentTarget)
                    : Object.prototype.toString.call(event_1.currentTarget);
            }
            catch (_oO) {
                source.currentTarget = '<unknown>';
            }
            if (typeof CustomEvent !== 'undefined' && isInstanceOf(value, CustomEvent)) {
                source.detail = event_1.detail;
            }
            for (var attr in event_1) {
                if (Object.prototype.hasOwnProperty.call(event_1, attr)) {
                    source[attr] = event_1[attr];
                }
            }
            return source;
        }
        return value;
    }
    /** Calculates bytes size of input string */
    function utf8Length(value) {
        // eslint-disable-next-line no-bitwise
        return ~-encodeURI(value).split(/%..|./).length;
    }
    /** Calculates bytes size of input object */
    function jsonSize(value) {
        return utf8Length(JSON.stringify(value));
    }
    /** JSDoc */
    function normalizeToSize(object, 
    // Default Node.js REPL depth
    depth, 
    // 100kB, as 200kB is max payload size, so half sounds reasonable
    maxSize) {
        if (depth === void 0) { depth = 3; }
        if (maxSize === void 0) { maxSize = 100 * 1024; }
        var serialized = normalize(object, depth);
        if (jsonSize(serialized) > maxSize) {
            return normalizeToSize(object, depth - 1, maxSize);
        }
        return serialized;
    }
    /**
     * Transform any non-primitive, BigInt, or Symbol-type value into a string. Acts as a no-op on strings, numbers,
     * booleans, null, and undefined.
     *
     * @param value The value to stringify
     * @returns For non-primitive, BigInt, and Symbol-type values, a string denoting the value's type, type and value, or
     *  type and `description` property, respectively. For non-BigInt, non-Symbol primitives, returns the original value,
     *  unchanged.
     */
    function serializeValue(value) {
        var type = Object.prototype.toString.call(value);
        // Node.js REPL notation
        if (typeof value === 'string') {
            return value;
        }
        if (type === '[object Object]') {
            return '[Object]';
        }
        if (type === '[object Array]') {
            return '[Array]';
        }
        var normalized = normalizeValue(value);
        return isPrimitive(normalized) ? normalized : type;
    }
    /**
     * normalizeValue()
     *
     * Takes unserializable input and make it serializable friendly
     *
     * - translates undefined/NaN values to "[undefined]"/"[NaN]" respectively,
     * - serializes Error objects
     * - filter global objects
     */
    function normalizeValue(value, key) {
        if (key === 'domain' && value && typeof value === 'object' && value._events) {
            return '[Domain]';
        }
        if (key === 'domainEmitter') {
            return '[DomainEmitter]';
        }
        if (typeof global !== 'undefined' && value === global) {
            return '[Global]';
        }
        // It's safe to use `window` and `document` here in this manner, as we are asserting using `typeof` first
        // which won't throw if they are not present.
        // eslint-disable-next-line no-restricted-globals
        if (typeof window !== 'undefined' && value === window) {
            return '[Window]';
        }
        // eslint-disable-next-line no-restricted-globals
        if (typeof document !== 'undefined' && value === document) {
            return '[Document]';
        }
        // React's SyntheticEvent thingy
        if (isSyntheticEvent(value)) {
            return '[SyntheticEvent]';
        }
        if (typeof value === 'number' && value !== value) {
            return '[NaN]';
        }
        if (value === void 0) {
            return '[undefined]';
        }
        if (typeof value === 'function') {
            return "[Function: " + getFunctionName(value) + "]";
        }
        // symbols and bigints are considered primitives by TS, but aren't natively JSON-serilaizable
        if (typeof value === 'symbol') {
            return "[" + String(value) + "]";
        }
        if (typeof value === 'bigint') {
            return "[BigInt: " + String(value) + "]";
        }
        return value;
    }
    /**
     * Walks an object to perform a normalization on it
     *
     * @param key of object that's walked in current iteration
     * @param value object to be walked
     * @param depth Optional number indicating how deep should walking be performed
     * @param memo Optional Memo class handling decycling
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function walk(key, value, depth, memo) {
        if (depth === void 0) { depth = +Infinity; }
        if (memo === void 0) { memo = new Memo(); }
        // If we reach the maximum depth, serialize whatever has left
        if (depth === 0) {
            return serializeValue(value);
        }
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        // If value implements `toJSON` method, call it and return early
        if (value !== null && value !== undefined && typeof value.toJSON === 'function') {
            return value.toJSON();
        }
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
        // If normalized value is a primitive, there are no branches left to walk, so we can just bail out, as theres no point in going down that branch any further
        var normalized = normalizeValue(value, key);
        if (isPrimitive(normalized)) {
            return normalized;
        }
        // Create source that we will use for next itterations, either objectified error object (Error type with extracted keys:value pairs) or the input itself
        var source = getWalkSource(value);
        // Create an accumulator that will act as a parent for all future itterations of that branch
        var acc = Array.isArray(value) ? [] : {};
        // If we already walked that branch, bail out, as it's circular reference
        if (memo.memoize(value)) {
            return '[Circular ~]';
        }
        // Walk all keys of the source
        for (var innerKey in source) {
            // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
            if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
                continue;
            }
            // Recursively walk through all the child nodes
            acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
        }
        // Once walked through all the branches, remove the parent from memo storage
        memo.unmemoize(value);
        // Return accumulated values
        return acc;
    }
    /**
     * normalize()
     *
     * - Creates a copy to prevent original input mutation
     * - Skip non-enumerablers
     * - Calls `toJSON` if implemented
     * - Removes circular references
     * - Translates non-serializeable values (undefined/NaN/Functions) to serializable format
     * - Translates known global objects/Classes to a string representations
     * - Takes care of Error objects serialization
     * - Optionally limit depth of final output
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function normalize(input, depth) {
        try {
            return JSON.parse(JSON.stringify(input, function (key, value) { return walk(key, value, depth); }));
        }
        catch (_oO) {
            return '**non-serializable**';
        }
    }
    /**
     * Given any captured exception, extract its keys and create a sorted
     * and truncated list that will be used inside the event message.
     * eg. `Non-error exception captured with keys: foo, bar, baz`
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function extractExceptionKeysForMessage(exception, maxLength) {
        if (maxLength === void 0) { maxLength = 40; }
        var keys = Object.keys(getWalkSource(exception));
        keys.sort();
        if (!keys.length) {
            return '[object has no keys]';
        }
        if (keys[0].length >= maxLength) {
            return truncate(keys[0], maxLength);
        }
        for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
            var serialized = keys.slice(0, includedKeys).join(', ');
            if (serialized.length > maxLength) {
                continue;
            }
            if (includedKeys === keys.length) {
                return serialized;
            }
            return truncate(serialized, maxLength);
        }
        return '';
    }
    /**
     * Given any object, return the new object with removed keys that value was `undefined`.
     * Works recursively on objects and arrays.
     */
    function dropUndefinedKeys(val) {
        var e_1, _a;
        if (isPlainObject(val)) {
            var obj = val;
            var rv = {};
            try {
                for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (typeof obj[key] !== 'undefined') {
                        rv[key] = dropUndefinedKeys(obj[key]);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return rv;
        }
        if (Array.isArray(val)) {
            return val.map(dropUndefinedKeys);
        }
        return val;
    }

    /**
     * Tells whether current environment supports Fetch API
     * {@link supportsFetch}.
     *
     * @returns Answer to the given question.
     */
    function supportsFetch() {
        if (!('fetch' in getGlobalObject())) {
            return false;
        }
        try {
            new Headers();
            new Request('');
            new Response();
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * isNativeFetch checks if the given function is a native implementation of fetch()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function isNativeFetch(func) {
        return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
    }
    /**
     * Tells whether current environment supports Fetch API natively
     * {@link supportsNativeFetch}.
     *
     * @returns true if `window.fetch` is natively implemented, false otherwise
     */
    function supportsNativeFetch() {
        if (!supportsFetch()) {
            return false;
        }
        var global = getGlobalObject();
        // Fast path to avoid DOM I/O
        // eslint-disable-next-line @typescript-eslint/unbound-method
        if (isNativeFetch(global.fetch)) {
            return true;
        }
        // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
        // so create a "pure" iframe to see if that has native fetch
        var result = false;
        var doc = global.document;
        // eslint-disable-next-line deprecation/deprecation
        if (doc && typeof doc.createElement === "function") {
            try {
                var sandbox = doc.createElement('iframe');
                sandbox.hidden = true;
                doc.head.appendChild(sandbox);
                if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    result = isNativeFetch(sandbox.contentWindow.fetch);
                }
                doc.head.removeChild(sandbox);
            }
            catch (err) {
                logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
            }
        }
        return result;
    }
    /**
     * Tells whether current environment supports Referrer Policy API
     * {@link supportsReferrerPolicy}.
     *
     * @returns Answer to the given question.
     */
    function supportsReferrerPolicy() {
        // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
        // https://caniuse.com/#feat=referrer-policy
        // It doesn't. And it throw exception instead of ignoring this parameter...
        // REF: https://github.com/getsentry/raven-js/issues/1233
        if (!supportsFetch()) {
            return false;
        }
        try {
            new Request('_', {
                referrerPolicy: 'origin',
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Tells whether current environment supports History API
     * {@link supportsHistory}.
     *
     * @returns Answer to the given question.
     */
    function supportsHistory() {
        // NOTE: in Chrome App environment, touching history.pushState, *even inside
        //       a try/catch block*, will cause Chrome to output an error to console.error
        // borrowed from: https://github.com/angular/angular.js/pull/13945/files
        var global = getGlobalObject();
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var chrome = global.chrome;
        var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
        var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
        return !isChromePackagedApp && hasHistoryApi;
    }

    var global$8 = getGlobalObject();
    /**
     * Instrument native APIs to call handlers that can be used to create breadcrumbs, APM spans etc.
     *  - Console API
     *  - Fetch API
     *  - XHR API
     *  - History API
     *  - DOM API (click/typing)
     *  - Error API
     *  - UnhandledRejection API
     */
    var handlers = {};
    var instrumented = {};
    /** Instruments given API */
    function instrument(type) {
        if (instrumented[type]) {
            return;
        }
        instrumented[type] = true;
        switch (type) {
            case 'console':
                instrumentConsole();
                break;
            case 'dom':
                instrumentDOM();
                break;
            case 'xhr':
                instrumentXHR();
                break;
            case 'fetch':
                instrumentFetch();
                break;
            case 'history':
                instrumentHistory();
                break;
            case 'error':
                instrumentError();
                break;
            case 'unhandledrejection':
                instrumentUnhandledRejection();
                break;
            default:
                logger.warn('unknown instrumentation type:', type);
        }
    }
    /**
     * Add handler that will be called when given type of instrumentation triggers.
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addInstrumentationHandler(handler) {
        if (!handler || typeof handler.type !== 'string' || typeof handler.callback !== 'function') {
            return;
        }
        handlers[handler.type] = handlers[handler.type] || [];
        handlers[handler.type].push(handler.callback);
        instrument(handler.type);
    }
    /** JSDoc */
    function triggerHandlers(type, data) {
        var e_1, _a;
        if (!type || !handlers[type]) {
            return;
        }
        try {
            for (var _b = __values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                try {
                    handler(data);
                }
                catch (e) {
                    logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + getFunctionName(handler) + "\nError: " + e);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    /** JSDoc */
    function instrumentConsole() {
        if (!('console' in global$8)) {
            return;
        }
        ['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(function (level) {
            if (!(level in global$8.console)) {
                return;
            }
            fill(global$8.console, level, function (originalConsoleLevel) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    triggerHandlers('console', { args: args, level: level });
                    // this fails for some browsers. :(
                    if (originalConsoleLevel) {
                        Function.prototype.apply.call(originalConsoleLevel, global$8.console, args);
                    }
                };
            });
        });
    }
    /** JSDoc */
    function instrumentFetch() {
        if (!supportsNativeFetch()) {
            return;
        }
        fill(global$8, 'fetch', function (originalFetch) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var handlerData = {
                    args: args,
                    fetchData: {
                        method: getFetchMethod(args),
                        url: getFetchUrl(args),
                    },
                    startTimestamp: Date.now(),
                };
                triggerHandlers('fetch', __assign({}, handlerData));
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return originalFetch.apply(global$8, args).then(function (response) {
                    triggerHandlers('fetch', __assign(__assign({}, handlerData), { endTimestamp: Date.now(), response: response }));
                    return response;
                }, function (error) {
                    triggerHandlers('fetch', __assign(__assign({}, handlerData), { endTimestamp: Date.now(), error: error }));
                    // NOTE: If you are a Sentry user, and you are seeing this stack frame,
                    //       it means the sentry.javascript SDK caught an error invoking your application code.
                    //       This is expected behavior and NOT indicative of a bug with sentry.javascript.
                    throw error;
                });
            };
        });
    }
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /** Extract `method` from fetch call arguments */
    function getFetchMethod(fetchArgs) {
        if (fetchArgs === void 0) { fetchArgs = []; }
        if ('Request' in global$8 && isInstanceOf(fetchArgs[0], Request) && fetchArgs[0].method) {
            return String(fetchArgs[0].method).toUpperCase();
        }
        if (fetchArgs[1] && fetchArgs[1].method) {
            return String(fetchArgs[1].method).toUpperCase();
        }
        return 'GET';
    }
    /** Extract `url` from fetch call arguments */
    function getFetchUrl(fetchArgs) {
        if (fetchArgs === void 0) { fetchArgs = []; }
        if (typeof fetchArgs[0] === 'string') {
            return fetchArgs[0];
        }
        if ('Request' in global$8 && isInstanceOf(fetchArgs[0], Request)) {
            return fetchArgs[0].url;
        }
        return String(fetchArgs[0]);
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    /** JSDoc */
    function instrumentXHR() {
        if (!('XMLHttpRequest' in global$8)) {
            return;
        }
        // Poor man's implementation of ES6 `Map`, tracking and keeping in sync key and value separately.
        var requestKeys = [];
        var requestValues = [];
        var xhrproto = XMLHttpRequest.prototype;
        fill(xhrproto, 'open', function (originalOpen) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var xhr = this;
                var url = args[1];
                xhr.__sentry_xhr__ = {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    method: isString(args[0]) ? args[0].toUpperCase() : args[0],
                    url: args[1],
                };
                // if Sentry key appears in URL, don't capture it as a request
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (isString(url) && xhr.__sentry_xhr__.method === 'POST' && url.match(/sentry_key/)) {
                    xhr.__sentry_own_request__ = true;
                }
                var onreadystatechangeHandler = function () {
                    if (xhr.readyState === 4) {
                        try {
                            // touching statusCode in some platforms throws
                            // an exception
                            if (xhr.__sentry_xhr__) {
                                xhr.__sentry_xhr__.status_code = xhr.status;
                            }
                        }
                        catch (e) {
                            /* do nothing */
                        }
                        try {
                            var requestPos = requestKeys.indexOf(xhr);
                            if (requestPos !== -1) {
                                // Make sure to pop both key and value to keep it in sync.
                                requestKeys.splice(requestPos);
                                var args_1 = requestValues.splice(requestPos)[0];
                                if (xhr.__sentry_xhr__ && args_1[0] !== undefined) {
                                    xhr.__sentry_xhr__.body = args_1[0];
                                }
                            }
                        }
                        catch (e) {
                            /* do nothing */
                        }
                        triggerHandlers('xhr', {
                            args: args,
                            endTimestamp: Date.now(),
                            startTimestamp: Date.now(),
                            xhr: xhr,
                        });
                    }
                };
                if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
                    fill(xhr, 'onreadystatechange', function (original) {
                        return function () {
                            var readyStateArgs = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                readyStateArgs[_i] = arguments[_i];
                            }
                            onreadystatechangeHandler();
                            return original.apply(xhr, readyStateArgs);
                        };
                    });
                }
                else {
                    xhr.addEventListener('readystatechange', onreadystatechangeHandler);
                }
                return originalOpen.apply(xhr, args);
            };
        });
        fill(xhrproto, 'send', function (originalSend) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                requestKeys.push(this);
                requestValues.push(args);
                triggerHandlers('xhr', {
                    args: args,
                    startTimestamp: Date.now(),
                    xhr: this,
                });
                return originalSend.apply(this, args);
            };
        });
    }
    var lastHref;
    /** JSDoc */
    function instrumentHistory() {
        if (!supportsHistory()) {
            return;
        }
        var oldOnPopState = global$8.onpopstate;
        global$8.onpopstate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var to = global$8.location.href;
            // keep track of the current URL state, as we always receive only the updated state
            var from = lastHref;
            lastHref = to;
            triggerHandlers('history', {
                from: from,
                to: to,
            });
            if (oldOnPopState) {
                // Apparently this can throw in Firefox when incorrectly implemented plugin is installed.
                // https://github.com/getsentry/sentry-javascript/issues/3344
                // https://github.com/bugsnag/bugsnag-js/issues/469
                try {
                    return oldOnPopState.apply(this, args);
                }
                catch (_oO) {
                    // no-empty
                }
            }
        };
        /** @hidden */
        function historyReplacementFunction(originalHistoryFunction) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args.length > 2 ? args[2] : undefined;
                if (url) {
                    // coerce to string (this is what pushState does)
                    var from = lastHref;
                    var to = String(url);
                    // keep track of the current URL state, as we always receive only the updated state
                    lastHref = to;
                    triggerHandlers('history', {
                        from: from,
                        to: to,
                    });
                }
                return originalHistoryFunction.apply(this, args);
            };
        }
        fill(global$8.history, 'pushState', historyReplacementFunction);
        fill(global$8.history, 'replaceState', historyReplacementFunction);
    }
    var debounceDuration = 1000;
    var debounceTimerID;
    var lastCapturedEvent;
    /**
     * Decide whether the current event should finish the debounce of previously captured one.
     * @param previous previously captured event
     * @param current event to be captured
     */
    function shouldShortcircuitPreviousDebounce(previous, current) {
        // If there was no previous event, it should always be swapped for the new one.
        if (!previous) {
            return true;
        }
        // If both events have different type, then user definitely performed two separate actions. e.g. click + keypress.
        if (previous.type !== current.type) {
            return true;
        }
        try {
            // If both events have the same type, it's still possible that actions were performed on different targets.
            // e.g. 2 clicks on different buttons.
            if (previous.target !== current.target) {
                return true;
            }
        }
        catch (e) {
            // just accessing `target` property can throw an exception in some rare circumstances
            // see: https://github.com/getsentry/sentry-javascript/issues/838
        }
        // If both events have the same type _and_ same `target` (an element which triggered an event, _not necessarily_
        // to which an event listener was attached), we treat them as the same action, as we want to capture
        // only one breadcrumb. e.g. multiple clicks on the same button, or typing inside a user input box.
        return false;
    }
    /**
     * Decide whether an event should be captured.
     * @param event event to be captured
     */
    function shouldSkipDOMEvent(event) {
        // We are only interested in filtering `keypress` events for now.
        if (event.type !== 'keypress') {
            return false;
        }
        try {
            var target = event.target;
            if (!target || !target.tagName) {
                return true;
            }
            // Only consider keypress events on actual input elements. This will disregard keypresses targeting body
            // e.g.tabbing through elements, hotkeys, etc.
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return false;
            }
        }
        catch (e) {
            // just accessing `target` property can throw an exception in some rare circumstances
            // see: https://github.com/getsentry/sentry-javascript/issues/838
        }
        return true;
    }
    /**
     * Wraps addEventListener to capture UI breadcrumbs
     * @param handler function that will be triggered
     * @param globalListener indicates whether event was captured by the global event listener
     * @returns wrapped breadcrumb events handler
     * @hidden
     */
    function makeDOMEventHandler(handler, globalListener) {
        if (globalListener === void 0) { globalListener = false; }
        return function (event) {
            // It's possible this handler might trigger multiple times for the same
            // event (e.g. event propagation through node ancestors).
            // Ignore if we've already captured that event.
            if (!event || lastCapturedEvent === event) {
                return;
            }
            // We always want to skip _some_ events.
            if (shouldSkipDOMEvent(event)) {
                return;
            }
            var name = event.type === 'keypress' ? 'input' : event.type;
            // If there is no debounce timer, it means that we can safely capture the new event and store it for future comparisons.
            if (debounceTimerID === undefined) {
                handler({
                    event: event,
                    name: name,
                    global: globalListener,
                });
                lastCapturedEvent = event;
            }
            // If there is a debounce awaiting, see if the new event is different enough to treat it as a unique one.
            // If that's the case, emit the previous event and store locally the newly-captured DOM event.
            else if (shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)) {
                handler({
                    event: event,
                    name: name,
                    global: globalListener,
                });
                lastCapturedEvent = event;
            }
            // Start a new debounce timer that will prevent us from capturing multiple events that should be grouped together.
            clearTimeout(debounceTimerID);
            debounceTimerID = global$8.setTimeout(function () {
                debounceTimerID = undefined;
            }, debounceDuration);
        };
    }
    /** JSDoc */
    function instrumentDOM() {
        if (!('document' in global$8)) {
            return;
        }
        // Make it so that any click or keypress that is unhandled / bubbled up all the way to the document triggers our dom
        // handlers. (Normally we have only one, which captures a breadcrumb for each click or keypress.) Do this before
        // we instrument `addEventListener` so that we don't end up attaching this handler twice.
        var triggerDOMHandler = triggerHandlers.bind(null, 'dom');
        var globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
        global$8.document.addEventListener('click', globalDOMEventHandler, false);
        global$8.document.addEventListener('keypress', globalDOMEventHandler, false);
        // After hooking into click and keypress events bubbled up to `document`, we also hook into user-handled
        // clicks & keypresses, by adding an event listener of our own to any element to which they add a listener. That
        // way, whenever one of their handlers is triggered, ours will be, too. (This is needed because their handler
        // could potentially prevent the event from bubbling up to our global listeners. This way, our handler are still
        // guaranteed to fire at least once.)
        ['EventTarget', 'Node'].forEach(function (target) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            var proto = global$8[target] && global$8[target].prototype;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
            if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
                return;
            }
            fill(proto, 'addEventListener', function (originalAddEventListener) {
                return function (type, listener, options) {
                    if (type === 'click' || type == 'keypress') {
                        try {
                            var el = this;
                            var handlers_1 = (el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {});
                            var handlerForType = (handlers_1[type] = handlers_1[type] || { refCount: 0 });
                            if (!handlerForType.handler) {
                                var handler = makeDOMEventHandler(triggerDOMHandler);
                                handlerForType.handler = handler;
                                originalAddEventListener.call(this, type, handler, options);
                            }
                            handlerForType.refCount += 1;
                        }
                        catch (e) {
                            // Accessing dom properties is always fragile.
                            // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
                        }
                    }
                    return originalAddEventListener.call(this, type, listener, options);
                };
            });
            fill(proto, 'removeEventListener', function (originalRemoveEventListener) {
                return function (type, listener, options) {
                    if (type === 'click' || type == 'keypress') {
                        try {
                            var el = this;
                            var handlers_2 = el.__sentry_instrumentation_handlers__ || {};
                            var handlerForType = handlers_2[type];
                            if (handlerForType) {
                                handlerForType.refCount -= 1;
                                // If there are no longer any custom handlers of the current type on this element, we can remove ours, too.
                                if (handlerForType.refCount <= 0) {
                                    originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                                    handlerForType.handler = undefined;
                                    delete handlers_2[type]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
                                }
                                // If there are no longer any custom handlers of any type on this element, cleanup everything.
                                if (Object.keys(handlers_2).length === 0) {
                                    delete el.__sentry_instrumentation_handlers__;
                                }
                            }
                        }
                        catch (e) {
                            // Accessing dom properties is always fragile.
                            // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
                        }
                    }
                    return originalRemoveEventListener.call(this, type, listener, options);
                };
            });
        });
    }
    var _oldOnErrorHandler = null;
    /** JSDoc */
    function instrumentError() {
        _oldOnErrorHandler = global$8.onerror;
        global$8.onerror = function (msg, url, line, column, error) {
            triggerHandlers('error', {
                column: column,
                error: error,
                line: line,
                msg: msg,
                url: url,
            });
            if (_oldOnErrorHandler) {
                // eslint-disable-next-line prefer-rest-params
                return _oldOnErrorHandler.apply(this, arguments);
            }
            return false;
        };
    }
    var _oldOnUnhandledRejectionHandler = null;
    /** JSDoc */
    function instrumentUnhandledRejection() {
        _oldOnUnhandledRejectionHandler = global$8.onunhandledrejection;
        global$8.onunhandledrejection = function (e) {
            triggerHandlers('unhandledrejection', e);
            if (_oldOnUnhandledRejectionHandler) {
                // eslint-disable-next-line prefer-rest-params
                return _oldOnUnhandledRejectionHandler.apply(this, arguments);
            }
            return true;
        };
    }

    /**
     * UUID4 generator
     *
     * @returns string Generated UUID4.
     */
    function uuid4() {
        var global = getGlobalObject();
        var crypto = global.crypto || global.msCrypto;
        if (!(crypto === void 0) && crypto.getRandomValues) {
            // Use window.crypto API if available
            var arr = new Uint16Array(8);
            crypto.getRandomValues(arr);
            // set 4 in byte 7
            // eslint-disable-next-line no-bitwise
            arr[3] = (arr[3] & 0xfff) | 0x4000;
            // set 2 most significant bits of byte 9 to '10'
            // eslint-disable-next-line no-bitwise
            arr[4] = (arr[4] & 0x3fff) | 0x8000;
            var pad = function (num) {
                var v = num.toString(16);
                while (v.length < 4) {
                    v = "0" + v;
                }
                return v;
            };
            return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
        }
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line no-bitwise
            var r = (Math.random() * 16) | 0;
            // eslint-disable-next-line no-bitwise
            var v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    /**
     * Parses string form of URL into an object
     * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
     * // intentionally using regex and not <a/> href parsing trick because React Native and other
     * // environments where DOM might not be available
     * @returns parsed URL object
     */
    function parseUrl(url) {
        if (!url) {
            return {};
        }
        var match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!match) {
            return {};
        }
        // coerce to undefined values to empty string so we don't get 'undefined'
        var query = match[6] || '';
        var fragment = match[8] || '';
        return {
            host: match[4],
            path: match[5],
            protocol: match[2],
            relative: match[5] + query + fragment,
        };
    }
    /**
     * Extracts either message or type+value from an event that can be used for user-facing logs
     * @returns event's description
     */
    function getEventDescription(event) {
        if (event.message) {
            return event.message;
        }
        if (event.exception && event.exception.values && event.exception.values[0]) {
            var exception = event.exception.values[0];
            if (exception.type && exception.value) {
                return exception.type + ": " + exception.value;
            }
            return exception.type || exception.value || event.event_id || '<unknown>';
        }
        return event.event_id || '<unknown>';
    }
    /**
     * Adds exception values, type and value to an synthetic Exception.
     * @param event The event to modify.
     * @param value Value of the exception.
     * @param type Type of the exception.
     * @hidden
     */
    function addExceptionTypeValue(event, value, type) {
        event.exception = event.exception || {};
        event.exception.values = event.exception.values || [];
        event.exception.values[0] = event.exception.values[0] || {};
        event.exception.values[0].value = event.exception.values[0].value || value || '';
        event.exception.values[0].type = event.exception.values[0].type || type || 'Error';
    }
    /**
     * Adds exception mechanism data to a given event. Uses defaults if the second parameter is not passed.
     *
     * @param event The event to modify.
     * @param newMechanism Mechanism data to add to the event.
     * @hidden
     */
    function addExceptionMechanism(event, newMechanism) {
        var _a;
        if (!event.exception || !event.exception.values) {
            return;
        }
        var exceptionValue0 = event.exception.values[0];
        var defaultMechanism = { type: 'generic', handled: true };
        var currentMechanism = exceptionValue0.mechanism;
        exceptionValue0.mechanism = __assign(__assign(__assign({}, defaultMechanism), currentMechanism), newMechanism);
        if (newMechanism && 'data' in newMechanism) {
            var mergedData = __assign(__assign({}, (_a = currentMechanism) === null || _a === void 0 ? void 0 : _a.data), newMechanism.data);
            exceptionValue0.mechanism.data = mergedData;
        }
    }
    var defaultRetryAfter = 60 * 1000; // 60 seconds
    /**
     * Extracts Retry-After value from the request header or returns default value
     * @param now current unix timestamp
     * @param header string representation of 'Retry-After' header
     */
    function parseRetryAfterHeader(now, header) {
        if (!header) {
            return defaultRetryAfter;
        }
        var headerDelay = parseInt("" + header, 10);
        if (!isNaN(headerDelay)) {
            return headerDelay * 1000;
        }
        var headerDate = Date.parse("" + header);
        if (!isNaN(headerDate)) {
            return headerDate - now;
        }
        return defaultRetryAfter;
    }
    /**
     * Checks whether or not we've already captured the given exception (note: not an identical exception - the very object
     * in question), and marks it captured if not.
     *
     * This is useful because it's possible for an error to get captured by more than one mechanism. After we intercept and
     * record an error, we rethrow it (assuming we've intercepted it before it's reached the top-level global handlers), so
     * that we don't interfere with whatever effects the error might have had were the SDK not there. At that point, because
     * the error has been rethrown, it's possible for it to bubble up to some other code we've instrumented. If it's not
     * caught after that, it will bubble all the way up to the global handlers (which of course we also instrument). This
     * function helps us ensure that even if we encounter the same error more than once, we only record it the first time we
     * see it.
     *
     * Note: It will ignore primitives (always return `false` and not mark them as seen), as properties can't be set on
     * them. {@link: Object.objectify} can be used on exceptions to convert any that are primitives into their equivalent
     * object wrapper forms so that this check will always work. However, because we need to flag the exact object which
     * will get rethrown, and because that rethrowing happens outside of the event processing pipeline, the objectification
     * must be done before the exception captured.
     *
     * @param A thrown exception to check or flag as having been seen
     * @returns `true` if the exception has already been captured, `false` if not (with the side effect of marking it seen)
     */
    function checkOrSetAlreadyCaught(exception) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if ((_a = exception) === null || _a === void 0 ? void 0 : _a.__sentry_captured__) {
            return true;
        }
        try {
            // set it this way rather than by assignment so that it's not ennumerable and therefore isn't recorded by the
            // `ExtraErrorData` integration
            Object.defineProperty(exception, '__sentry_captured__', {
                value: true,
            });
        }
        catch (err) {
            // `exception` is a primitive, so we can't mark it seen
        }
        return false;
    }

    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    /** SyncPromise internal states */
    var States;
    (function (States) {
        /** Pending */
        States["PENDING"] = "PENDING";
        /** Resolved / OK */
        States["RESOLVED"] = "RESOLVED";
        /** Rejected / Error */
        States["REJECTED"] = "REJECTED";
    })(States || (States = {}));
    /**
     * Thenable class that behaves like a Promise and follows it's interface
     * but is not async internally
     */
    var SyncPromise = /** @class */ (function () {
        function SyncPromise(executor) {
            var _this = this;
            this._state = States.PENDING;
            this._handlers = [];
            /** JSDoc */
            this._resolve = function (value) {
                _this._setResult(States.RESOLVED, value);
            };
            /** JSDoc */
            this._reject = function (reason) {
                _this._setResult(States.REJECTED, reason);
            };
            /** JSDoc */
            this._setResult = function (state, value) {
                if (_this._state !== States.PENDING) {
                    return;
                }
                if (isThenable(value)) {
                    void value.then(_this._resolve, _this._reject);
                    return;
                }
                _this._state = state;
                _this._value = value;
                _this._executeHandlers();
            };
            // TODO: FIXME
            /** JSDoc */
            this._attachHandler = function (handler) {
                _this._handlers = _this._handlers.concat(handler);
                _this._executeHandlers();
            };
            /** JSDoc */
            this._executeHandlers = function () {
                if (_this._state === States.PENDING) {
                    return;
                }
                var cachedHandlers = _this._handlers.slice();
                _this._handlers = [];
                cachedHandlers.forEach(function (handler) {
                    if (handler.done) {
                        return;
                    }
                    if (_this._state === States.RESOLVED) {
                        if (handler.onfulfilled) {
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            handler.onfulfilled(_this._value);
                        }
                    }
                    if (_this._state === States.REJECTED) {
                        if (handler.onrejected) {
                            handler.onrejected(_this._value);
                        }
                    }
                    handler.done = true;
                });
            };
            try {
                executor(this._resolve, this._reject);
            }
            catch (e) {
                this._reject(e);
            }
        }
        /** JSDoc */
        SyncPromise.resolve = function (value) {
            return new SyncPromise(function (resolve) {
                resolve(value);
            });
        };
        /** JSDoc */
        SyncPromise.reject = function (reason) {
            return new SyncPromise(function (_, reject) {
                reject(reason);
            });
        };
        /** JSDoc */
        SyncPromise.all = function (collection) {
            return new SyncPromise(function (resolve, reject) {
                if (!Array.isArray(collection)) {
                    reject(new TypeError("Promise.all requires an array as input."));
                    return;
                }
                if (collection.length === 0) {
                    resolve([]);
                    return;
                }
                var counter = collection.length;
                var resolvedCollection = [];
                collection.forEach(function (item, index) {
                    void SyncPromise.resolve(item)
                        .then(function (value) {
                        resolvedCollection[index] = value;
                        counter -= 1;
                        if (counter !== 0) {
                            return;
                        }
                        resolve(resolvedCollection);
                    })
                        .then(null, reject);
                });
            });
        };
        /** JSDoc */
        SyncPromise.prototype.then = function (onfulfilled, onrejected) {
            var _this = this;
            return new SyncPromise(function (resolve, reject) {
                _this._attachHandler({
                    done: false,
                    onfulfilled: function (result) {
                        if (!onfulfilled) {
                            // TODO: ¯\_(ツ)_/¯
                            // TODO: FIXME
                            resolve(result);
                            return;
                        }
                        try {
                            resolve(onfulfilled(result));
                            return;
                        }
                        catch (e) {
                            reject(e);
                            return;
                        }
                    },
                    onrejected: function (reason) {
                        if (!onrejected) {
                            reject(reason);
                            return;
                        }
                        try {
                            resolve(onrejected(reason));
                            return;
                        }
                        catch (e) {
                            reject(e);
                            return;
                        }
                    },
                });
            });
        };
        /** JSDoc */
        SyncPromise.prototype.catch = function (onrejected) {
            return this.then(function (val) { return val; }, onrejected);
        };
        /** JSDoc */
        SyncPromise.prototype.finally = function (onfinally) {
            var _this = this;
            return new SyncPromise(function (resolve, reject) {
                var val;
                var isRejected;
                return _this.then(function (value) {
                    isRejected = false;
                    val = value;
                    if (onfinally) {
                        onfinally();
                    }
                }, function (reason) {
                    isRejected = true;
                    val = reason;
                    if (onfinally) {
                        onfinally();
                    }
                }).then(function () {
                    if (isRejected) {
                        reject(val);
                        return;
                    }
                    resolve(val);
                });
            });
        };
        /** JSDoc */
        SyncPromise.prototype.toString = function () {
            return '[object SyncPromise]';
        };
        return SyncPromise;
    }());

    /** A simple queue that holds promises. */
    var PromiseBuffer = /** @class */ (function () {
        function PromiseBuffer(_limit) {
            this._limit = _limit;
            /** Internal set of queued Promises */
            this._buffer = [];
        }
        /**
         * Says if the buffer is ready to take more requests
         */
        PromiseBuffer.prototype.isReady = function () {
            return this._limit === undefined || this.length() < this._limit;
        };
        /**
         * Add a promise (representing an in-flight action) to the queue, and set it to remove itself on fulfillment.
         *
         * @param taskProducer A function producing any PromiseLike<T>; In previous versions this used to be `task:
         *        PromiseLike<T>`, but under that model, Promises were instantly created on the call-site and their executor
         *        functions therefore ran immediately. Thus, even if the buffer was full, the action still happened. By
         *        requiring the promise to be wrapped in a function, we can defer promise creation until after the buffer
         *        limit check.
         * @returns The original promise.
         */
        PromiseBuffer.prototype.add = function (taskProducer) {
            var _this = this;
            if (!this.isReady()) {
                return SyncPromise.reject(new SentryError('Not adding Promise due to buffer limit reached.'));
            }
            // start the task and add its promise to the queue
            var task = taskProducer();
            if (this._buffer.indexOf(task) === -1) {
                this._buffer.push(task);
            }
            void task
                .then(function () { return _this.remove(task); })
                // Use `then(null, rejectionHandler)` rather than `catch(rejectionHandler)` so that we can use `PromiseLike`
                // rather than `Promise`. `PromiseLike` doesn't have a `.catch` method, making its polyfill smaller. (ES5 didn't
                // have promises, so TS has to polyfill when down-compiling.)
                .then(null, function () {
                return _this.remove(task).then(null, function () {
                    // We have to add another catch here because `this.remove()` starts a new promise chain.
                });
            });
            return task;
        };
        /**
         * Remove a promise from the queue.
         *
         * @param task Can be any PromiseLike<T>
         * @returns Removed promise.
         */
        PromiseBuffer.prototype.remove = function (task) {
            var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];
            return removedTask;
        };
        /**
         * This function returns the number of unresolved promises in the queue.
         */
        PromiseBuffer.prototype.length = function () {
            return this._buffer.length;
        };
        /**
         * Wait for all promises in the queue to resolve or for timeout to expire, whichever comes first.
         *
         * @param timeout The time, in ms, after which to resolve to `false` if the queue is still non-empty. Passing `0` (or
         * not passing anything) will make the promise wait as long as it takes for the queue to drain before resolving to
         * `true`.
         * @returns A promise which will resolve to `true` if the queue is already empty or drains before the timeout, and
         * `false` otherwise
         */
        PromiseBuffer.prototype.drain = function (timeout) {
            var _this = this;
            return new SyncPromise(function (resolve) {
                // wait for `timeout` ms and then resolve to `false` (if not cancelled first)
                var capturedSetTimeout = setTimeout(function () {
                    if (timeout && timeout > 0) {
                        resolve(false);
                    }
                }, timeout);
                // if all promises resolve in time, cancel the timer and resolve to `true`
                void SyncPromise.all(_this._buffer)
                    .then(function () {
                    clearTimeout(capturedSetTimeout);
                    resolve(true);
                })
                    .then(null, function () {
                    resolve(true);
                });
            });
        };
        return PromiseBuffer;
    }());

    /**
     * A TimestampSource implementation for environments that do not support the Performance Web API natively.
     *
     * Note that this TimestampSource does not use a monotonic clock. A call to `nowSeconds` may return a timestamp earlier
     * than a previously returned value. We do not try to emulate a monotonic behavior in order to facilitate debugging. It
     * is more obvious to explain "why does my span have negative duration" than "why my spans have zero duration".
     */
    var dateTimestampSource = {
        nowSeconds: function () { return Date.now() / 1000; },
    };
    /**
     * Returns a wrapper around the native Performance API browser implementation, or undefined for browsers that do not
     * support the API.
     *
     * Wrapping the native API works around differences in behavior from different browsers.
     */
    function getBrowserPerformance() {
        var performance = getGlobalObject().performance;
        if (!performance || !performance.now) {
            return undefined;
        }
        // Replace performance.timeOrigin with our own timeOrigin based on Date.now().
        //
        // This is a partial workaround for browsers reporting performance.timeOrigin such that performance.timeOrigin +
        // performance.now() gives a date arbitrarily in the past.
        //
        // Additionally, computing timeOrigin in this way fills the gap for browsers where performance.timeOrigin is
        // undefined.
        //
        // The assumption that performance.timeOrigin + performance.now() ~= Date.now() is flawed, but we depend on it to
        // interact with data coming out of performance entries.
        //
        // Note that despite recommendations against it in the spec, browsers implement the Performance API with a clock that
        // might stop when the computer is asleep (and perhaps under other circumstances). Such behavior causes
        // performance.timeOrigin + performance.now() to have an arbitrary skew over Date.now(). In laptop computers, we have
        // observed skews that can be as long as days, weeks or months.
        //
        // See https://github.com/getsentry/sentry-javascript/issues/2590.
        //
        // BUG: despite our best intentions, this workaround has its limitations. It mostly addresses timings of pageload
        // transactions, but ignores the skew built up over time that can aversely affect timestamps of navigation
        // transactions of long-lived web pages.
        var timeOrigin = Date.now() - performance.now();
        return {
            now: function () { return performance.now(); },
            timeOrigin: timeOrigin,
        };
    }
    /**
     * Returns the native Performance API implementation from Node.js. Returns undefined in old Node.js versions that don't
     * implement the API.
     */
    function getNodePerformance() {
        try {
            var perfHooks = dynamicRequire(module, 'perf_hooks');
            return perfHooks.performance;
        }
        catch (_) {
            return undefined;
        }
    }
    /**
     * The Performance API implementation for the current platform, if available.
     */
    var platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
    var timestampSource = platformPerformance === undefined
        ? dateTimestampSource
        : {
            nowSeconds: function () { return (platformPerformance.timeOrigin + platformPerformance.now()) / 1000; },
        };
    /**
     * Returns a timestamp in seconds since the UNIX epoch using the Date API.
     */
    var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
    /**
     * Returns a timestamp in seconds since the UNIX epoch using either the Performance or Date APIs, depending on the
     * availability of the Performance API.
     *
     * See `usingPerformanceAPI` to test whether the Performance API is used.
     *
     * BUG: Note that because of how browsers implement the Performance API, the clock might stop when the computer is
     * asleep. This creates a skew between `dateTimestampInSeconds` and `timestampInSeconds`. The
     * skew can grow to arbitrary amounts like days, weeks or months.
     * See https://github.com/getsentry/sentry-javascript/issues/2590.
     */
    var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
    // Re-exported with an old name for backwards-compatibility.
    var timestampWithMs = timestampInSeconds;
    /**
     * The number of milliseconds since the UNIX epoch. This value is only usable in a browser, and only when the
     * performance API is available.
     */
    var browserPerformanceTimeOrigin = (function () {
        // Unfortunately browsers may report an inaccurate time origin data, through either performance.timeOrigin or
        // performance.timing.navigationStart, which results in poor results in performance data. We only treat time origin
        // data as reliable if they are within a reasonable threshold of the current time.
        var performance = getGlobalObject().performance;
        if (!performance || !performance.now) {
            return undefined;
        }
        var threshold = 3600 * 1000;
        var performanceNow = performance.now();
        var dateNow = Date.now();
        // if timeOrigin isn't available set delta to threshold so it isn't used
        var timeOriginDelta = performance.timeOrigin
            ? Math.abs(performance.timeOrigin + performanceNow - dateNow)
            : threshold;
        var timeOriginIsReliable = timeOriginDelta < threshold;
        // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
        // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
        // Also as of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always
        // a valid fallback. In the absence of an initial time provided by the browser, fallback to the current time from the
        // Date API.
        // eslint-disable-next-line deprecation/deprecation
        var navigationStart = performance.timing && performance.timing.navigationStart;
        var hasNavigationStart = typeof navigationStart === 'number';
        // if navigationStart isn't available set delta to threshold so it isn't used
        var navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
        var navigationStartIsReliable = navigationStartDelta < threshold;
        if (timeOriginIsReliable || navigationStartIsReliable) {
            // Use the more reliable time origin
            if (timeOriginDelta <= navigationStartDelta) {
                return performance.timeOrigin;
            }
            else {
                return navigationStart;
            }
        }
        return dateNow;
    })();

    /**
     * Absolute maximum number of breadcrumbs added to an event.
     * The `maxBreadcrumbs` option cannot be higher than this value.
     */
    var MAX_BREADCRUMBS = 100;
    /**
     * Holds additional event information. {@link Scope.applyToEvent} will be
     * called by the client before an event will be sent.
     */
    var Scope = /** @class */ (function () {
        function Scope() {
            /** Flag if notifying is happening. */
            this._notifyingListeners = false;
            /** Callback for client to receive scope changes. */
            this._scopeListeners = [];
            /** Callback list that will be called after {@link applyToEvent}. */
            this._eventProcessors = [];
            /** Array of breadcrumbs. */
            this._breadcrumbs = [];
            /** User */
            this._user = {};
            /** Tags */
            this._tags = {};
            /** Extra */
            this._extra = {};
            /** Contexts */
            this._contexts = {};
        }
        /**
         * Inherit values from the parent scope.
         * @param scope to clone.
         */
        Scope.clone = function (scope) {
            var newScope = new Scope();
            if (scope) {
                newScope._breadcrumbs = __spread(scope._breadcrumbs);
                newScope._tags = __assign({}, scope._tags);
                newScope._extra = __assign({}, scope._extra);
                newScope._contexts = __assign({}, scope._contexts);
                newScope._user = scope._user;
                newScope._level = scope._level;
                newScope._span = scope._span;
                newScope._session = scope._session;
                newScope._transactionName = scope._transactionName;
                newScope._fingerprint = scope._fingerprint;
                newScope._eventProcessors = __spread(scope._eventProcessors);
                newScope._requestSession = scope._requestSession;
            }
            return newScope;
        };
        /**
         * Add internal on change listener. Used for sub SDKs that need to store the scope.
         * @hidden
         */
        Scope.prototype.addScopeListener = function (callback) {
            this._scopeListeners.push(callback);
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.addEventProcessor = function (callback) {
            this._eventProcessors.push(callback);
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setUser = function (user) {
            this._user = user || {};
            if (this._session) {
                this._session.update({ user: user });
            }
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.getUser = function () {
            return this._user;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.getRequestSession = function () {
            return this._requestSession;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setRequestSession = function (requestSession) {
            this._requestSession = requestSession;
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setTags = function (tags) {
            this._tags = __assign(__assign({}, this._tags), tags);
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setTag = function (key, value) {
            var _a;
            this._tags = __assign(__assign({}, this._tags), (_a = {}, _a[key] = value, _a));
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setExtras = function (extras) {
            this._extra = __assign(__assign({}, this._extra), extras);
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setExtra = function (key, extra) {
            var _a;
            this._extra = __assign(__assign({}, this._extra), (_a = {}, _a[key] = extra, _a));
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setFingerprint = function (fingerprint) {
            this._fingerprint = fingerprint;
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setLevel = function (level) {
            this._level = level;
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setTransactionName = function (name) {
            this._transactionName = name;
            this._notifyScopeListeners();
            return this;
        };
        /**
         * Can be removed in major version.
         * @deprecated in favor of {@link this.setTransactionName}
         */
        Scope.prototype.setTransaction = function (name) {
            return this.setTransactionName(name);
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setContext = function (key, context) {
            var _a;
            if (context === null) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this._contexts[key];
            }
            else {
                this._contexts = __assign(__assign({}, this._contexts), (_a = {}, _a[key] = context, _a));
            }
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setSpan = function (span) {
            this._span = span;
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.getSpan = function () {
            return this._span;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.getTransaction = function () {
            var _a, _b, _c, _d;
            // often, this span will be a transaction, but it's not guaranteed to be
            var span = this.getSpan();
            // try it the new way first
            if ((_a = span) === null || _a === void 0 ? void 0 : _a.transaction) {
                return (_b = span) === null || _b === void 0 ? void 0 : _b.transaction;
            }
            // fallback to the old way (known bug: this only finds transactions with sampled = true)
            if ((_d = (_c = span) === null || _c === void 0 ? void 0 : _c.spanRecorder) === null || _d === void 0 ? void 0 : _d.spans[0]) {
                return span.spanRecorder.spans[0];
            }
            // neither way found a transaction
            return undefined;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.setSession = function (session) {
            if (!session) {
                delete this._session;
            }
            else {
                this._session = session;
            }
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.getSession = function () {
            return this._session;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.update = function (captureContext) {
            if (!captureContext) {
                return this;
            }
            if (typeof captureContext === 'function') {
                var updatedScope = captureContext(this);
                return updatedScope instanceof Scope ? updatedScope : this;
            }
            if (captureContext instanceof Scope) {
                this._tags = __assign(__assign({}, this._tags), captureContext._tags);
                this._extra = __assign(__assign({}, this._extra), captureContext._extra);
                this._contexts = __assign(__assign({}, this._contexts), captureContext._contexts);
                if (captureContext._user && Object.keys(captureContext._user).length) {
                    this._user = captureContext._user;
                }
                if (captureContext._level) {
                    this._level = captureContext._level;
                }
                if (captureContext._fingerprint) {
                    this._fingerprint = captureContext._fingerprint;
                }
                if (captureContext._requestSession) {
                    this._requestSession = captureContext._requestSession;
                }
            }
            else if (isPlainObject(captureContext)) {
                // eslint-disable-next-line no-param-reassign
                captureContext = captureContext;
                this._tags = __assign(__assign({}, this._tags), captureContext.tags);
                this._extra = __assign(__assign({}, this._extra), captureContext.extra);
                this._contexts = __assign(__assign({}, this._contexts), captureContext.contexts);
                if (captureContext.user) {
                    this._user = captureContext.user;
                }
                if (captureContext.level) {
                    this._level = captureContext.level;
                }
                if (captureContext.fingerprint) {
                    this._fingerprint = captureContext.fingerprint;
                }
                if (captureContext.requestSession) {
                    this._requestSession = captureContext.requestSession;
                }
            }
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.clear = function () {
            this._breadcrumbs = [];
            this._tags = {};
            this._extra = {};
            this._user = {};
            this._contexts = {};
            this._level = undefined;
            this._transactionName = undefined;
            this._fingerprint = undefined;
            this._requestSession = undefined;
            this._span = undefined;
            this._session = undefined;
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
            var maxCrumbs = typeof maxBreadcrumbs === 'number' ? Math.min(maxBreadcrumbs, MAX_BREADCRUMBS) : MAX_BREADCRUMBS;
            // No data has been changed, so don't notify scope listeners
            if (maxCrumbs <= 0) {
                return this;
            }
            var mergedBreadcrumb = __assign({ timestamp: dateTimestampInSeconds() }, breadcrumb);
            this._breadcrumbs = __spread(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxCrumbs);
            this._notifyScopeListeners();
            return this;
        };
        /**
         * @inheritDoc
         */
        Scope.prototype.clearBreadcrumbs = function () {
            this._breadcrumbs = [];
            this._notifyScopeListeners();
            return this;
        };
        /**
         * Applies the current context and fingerprint to the event.
         * Note that breadcrumbs will be added by the client.
         * Also if the event has already breadcrumbs on it, we do not merge them.
         * @param event Event
         * @param hint May contain additional information about the original exception.
         * @hidden
         */
        Scope.prototype.applyToEvent = function (event, hint) {
            var _a;
            if (this._extra && Object.keys(this._extra).length) {
                event.extra = __assign(__assign({}, this._extra), event.extra);
            }
            if (this._tags && Object.keys(this._tags).length) {
                event.tags = __assign(__assign({}, this._tags), event.tags);
            }
            if (this._user && Object.keys(this._user).length) {
                event.user = __assign(__assign({}, this._user), event.user);
            }
            if (this._contexts && Object.keys(this._contexts).length) {
                event.contexts = __assign(__assign({}, this._contexts), event.contexts);
            }
            if (this._level) {
                event.level = this._level;
            }
            if (this._transactionName) {
                event.transaction = this._transactionName;
            }
            // We want to set the trace context for normal events only if there isn't already
            // a trace context on the event. There is a product feature in place where we link
            // errors with transaction and it relies on that.
            if (this._span) {
                event.contexts = __assign({ trace: this._span.getTraceContext() }, event.contexts);
                var transactionName = (_a = this._span.transaction) === null || _a === void 0 ? void 0 : _a.name;
                if (transactionName) {
                    event.tags = __assign({ transaction: transactionName }, event.tags);
                }
            }
            this._applyFingerprint(event);
            event.breadcrumbs = __spread((event.breadcrumbs || []), this._breadcrumbs);
            event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;
            return this._notifyEventProcessors(__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
        };
        /**
         * This will be called after {@link applyToEvent} is finished.
         */
        Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
            var _this = this;
            if (index === void 0) { index = 0; }
            return new SyncPromise(function (resolve, reject) {
                var processor = processors[index];
                if (event === null || typeof processor !== 'function') {
                    resolve(event);
                }
                else {
                    var result = processor(__assign({}, event), hint);
                    if (isThenable(result)) {
                        void result
                            .then(function (final) { return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve); })
                            .then(null, reject);
                    }
                    else {
                        void _this._notifyEventProcessors(processors, result, hint, index + 1)
                            .then(resolve)
                            .then(null, reject);
                    }
                }
            });
        };
        /**
         * This will be called on every set call.
         */
        Scope.prototype._notifyScopeListeners = function () {
            var _this = this;
            // We need this check for this._notifyingListeners to be able to work on scope during updates
            // If this check is not here we'll produce endless recursion when something is done with the scope
            // during the callback.
            if (!this._notifyingListeners) {
                this._notifyingListeners = true;
                this._scopeListeners.forEach(function (callback) {
                    callback(_this);
                });
                this._notifyingListeners = false;
            }
        };
        /**
         * Applies fingerprint from the scope to the event if there's one,
         * uses message if there's one instead or get rid of empty fingerprint
         */
        Scope.prototype._applyFingerprint = function (event) {
            // Make sure it's an array first and we actually have something in place
            event.fingerprint = event.fingerprint
                ? Array.isArray(event.fingerprint)
                    ? event.fingerprint
                    : [event.fingerprint]
                : [];
            // If we have something on the scope, then merge it with event
            if (this._fingerprint) {
                event.fingerprint = event.fingerprint.concat(this._fingerprint);
            }
            // If we have no data at all, remove empty array default
            if (event.fingerprint && !event.fingerprint.length) {
                delete event.fingerprint;
            }
        };
        return Scope;
    }());
    /**
     * Returns the global event processors.
     */
    function getGlobalEventProcessors() {
        /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access  */
        var global = getGlobalObject();
        global.__SENTRY__ = global.__SENTRY__ || {};
        global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [];
        return global.__SENTRY__.globalEventProcessors;
        /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
    }
    /**
     * Add a EventProcessor to be kept globally.
     * @param callback EventProcessor to add
     */
    function addGlobalEventProcessor(callback) {
        getGlobalEventProcessors().push(callback);
    }

    /**
     * @inheritdoc
     */
    var Session = /** @class */ (function () {
        function Session(context) {
            this.errors = 0;
            this.sid = uuid4();
            this.duration = 0;
            this.status = SessionStatus.Ok;
            this.init = true;
            this.ignoreDuration = false;
            // Both timestamp and started are in seconds since the UNIX epoch.
            var startingTime = timestampInSeconds();
            this.timestamp = startingTime;
            this.started = startingTime;
            if (context) {
                this.update(context);
            }
        }
        /** JSDoc */
        // eslint-disable-next-line complexity
        Session.prototype.update = function (context) {
            if (context === void 0) { context = {}; }
            if (context.user) {
                if (!this.ipAddress && context.user.ip_address) {
                    this.ipAddress = context.user.ip_address;
                }
                if (!this.did && !context.did) {
                    this.did = context.user.id || context.user.email || context.user.username;
                }
            }
            this.timestamp = context.timestamp || timestampInSeconds();
            if (context.ignoreDuration) {
                this.ignoreDuration = context.ignoreDuration;
            }
            if (context.sid) {
                // Good enough uuid validation. — Kamil
                this.sid = context.sid.length === 32 ? context.sid : uuid4();
            }
            if (context.init !== undefined) {
                this.init = context.init;
            }
            if (!this.did && context.did) {
                this.did = "" + context.did;
            }
            if (typeof context.started === 'number') {
                this.started = context.started;
            }
            if (this.ignoreDuration) {
                this.duration = undefined;
            }
            else if (typeof context.duration === 'number') {
                this.duration = context.duration;
            }
            else {
                var duration = this.timestamp - this.started;
                this.duration = duration >= 0 ? duration : 0;
            }
            if (context.release) {
                this.release = context.release;
            }
            if (context.environment) {
                this.environment = context.environment;
            }
            if (!this.ipAddress && context.ipAddress) {
                this.ipAddress = context.ipAddress;
            }
            if (!this.userAgent && context.userAgent) {
                this.userAgent = context.userAgent;
            }
            if (typeof context.errors === 'number') {
                this.errors = context.errors;
            }
            if (context.status) {
                this.status = context.status;
            }
        };
        /** JSDoc */
        Session.prototype.close = function (status) {
            if (status) {
                this.update({ status: status });
            }
            else if (this.status === SessionStatus.Ok) {
                this.update({ status: SessionStatus.Exited });
            }
            else {
                this.update();
            }
        };
        /** JSDoc */
        Session.prototype.toJSON = function () {
            return dropUndefinedKeys({
                sid: "" + this.sid,
                init: this.init,
                // Make sure that sec is converted to ms for date constructor
                started: new Date(this.started * 1000).toISOString(),
                timestamp: new Date(this.timestamp * 1000).toISOString(),
                status: this.status,
                errors: this.errors,
                did: typeof this.did === 'number' || typeof this.did === 'string' ? "" + this.did : undefined,
                duration: this.duration,
                attrs: dropUndefinedKeys({
                    release: this.release,
                    environment: this.environment,
                    ip_address: this.ipAddress,
                    user_agent: this.userAgent,
                }),
            });
        };
        return Session;
    }());

    /**
     * API compatibility version of this hub.
     *
     * WARNING: This number should only be increased when the global interface
     * changes and new methods are introduced.
     *
     * @hidden
     */
    var API_VERSION = 4;
    /**
     * Default maximum number of breadcrumbs added to an event. Can be overwritten
     * with {@link Options.maxBreadcrumbs}.
     */
    var DEFAULT_BREADCRUMBS = 100;
    /**
     * @inheritDoc
     */
    var Hub = /** @class */ (function () {
        /**
         * Creates a new instance of the hub, will push one {@link Layer} into the
         * internal stack on creation.
         *
         * @param client bound to the hub.
         * @param scope bound to the hub.
         * @param version number, higher number means higher priority.
         */
        function Hub(client, scope, _version) {
            if (scope === void 0) { scope = new Scope(); }
            if (_version === void 0) { _version = API_VERSION; }
            this._version = _version;
            /** Is a {@link Layer}[] containing the client and scope */
            this._stack = [{}];
            this.getStackTop().scope = scope;
            if (client) {
                this.bindClient(client);
            }
        }
        /**
         * @inheritDoc
         */
        Hub.prototype.isOlderThan = function (version) {
            return this._version < version;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.bindClient = function (client) {
            var top = this.getStackTop();
            top.client = client;
            if (client && client.setupIntegrations) {
                client.setupIntegrations();
            }
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.pushScope = function () {
            // We want to clone the content of prev scope
            var scope = Scope.clone(this.getScope());
            this.getStack().push({
                client: this.getClient(),
                scope: scope,
            });
            return scope;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.popScope = function () {
            if (this.getStack().length <= 1)
                return false;
            return !!this.getStack().pop();
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.withScope = function (callback) {
            var scope = this.pushScope();
            try {
                callback(scope);
            }
            finally {
                this.popScope();
            }
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.getClient = function () {
            return this.getStackTop().client;
        };
        /** Returns the scope of the top stack. */
        Hub.prototype.getScope = function () {
            return this.getStackTop().scope;
        };
        /** Returns the scope stack for domains or the process. */
        Hub.prototype.getStack = function () {
            return this._stack;
        };
        /** Returns the topmost scope layer in the order domain > local > process. */
        Hub.prototype.getStackTop = function () {
            return this._stack[this._stack.length - 1];
        };
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        Hub.prototype.captureException = function (exception, hint) {
            var eventId = (this._lastEventId = uuid4());
            var finalHint = hint;
            // If there's no explicit hint provided, mimic the same thing that would happen
            // in the minimal itself to create a consistent behavior.
            // We don't do this in the client, as it's the lowest level API, and doing this,
            // would prevent user from having full control over direct calls.
            if (!hint) {
                var syntheticException = void 0;
                try {
                    throw new Error('Sentry syntheticException');
                }
                catch (exception) {
                    syntheticException = exception;
                }
                finalHint = {
                    originalException: exception,
                    syntheticException: syntheticException,
                };
            }
            this._invokeClient('captureException', exception, __assign(__assign({}, finalHint), { event_id: eventId }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.captureMessage = function (message, level, hint) {
            var eventId = (this._lastEventId = uuid4());
            var finalHint = hint;
            // If there's no explicit hint provided, mimic the same thing that would happen
            // in the minimal itself to create a consistent behavior.
            // We don't do this in the client, as it's the lowest level API, and doing this,
            // would prevent user from having full control over direct calls.
            if (!hint) {
                var syntheticException = void 0;
                try {
                    throw new Error(message);
                }
                catch (exception) {
                    syntheticException = exception;
                }
                finalHint = {
                    originalException: message,
                    syntheticException: syntheticException,
                };
            }
            this._invokeClient('captureMessage', message, level, __assign(__assign({}, finalHint), { event_id: eventId }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.captureEvent = function (event, hint) {
            var eventId = uuid4();
            if (event.type !== 'transaction') {
                this._lastEventId = eventId;
            }
            this._invokeClient('captureEvent', event, __assign(__assign({}, hint), { event_id: eventId }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.lastEventId = function () {
            return this._lastEventId;
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
            var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
            if (!scope || !client)
                return;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            var _b = (client.getOptions && client.getOptions()) || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = _c === void 0 ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = _d === void 0 ? DEFAULT_BREADCRUMBS : _d;
            if (maxBreadcrumbs <= 0)
                return;
            var timestamp = dateTimestampInSeconds();
            var mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
            var finalBreadcrumb = beforeBreadcrumb
                ? consoleSandbox(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })
                : mergedBreadcrumb;
            if (finalBreadcrumb === null)
                return;
            scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.setUser = function (user) {
            var scope = this.getScope();
            if (scope)
                scope.setUser(user);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.setTags = function (tags) {
            var scope = this.getScope();
            if (scope)
                scope.setTags(tags);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.setExtras = function (extras) {
            var scope = this.getScope();
            if (scope)
                scope.setExtras(extras);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.setTag = function (key, value) {
            var scope = this.getScope();
            if (scope)
                scope.setTag(key, value);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.setExtra = function (key, extra) {
            var scope = this.getScope();
            if (scope)
                scope.setExtra(key, extra);
        };
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Hub.prototype.setContext = function (name, context) {
            var scope = this.getScope();
            if (scope)
                scope.setContext(name, context);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.configureScope = function (callback) {
            var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
            if (scope && client) {
                callback(scope);
            }
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.run = function (callback) {
            var oldHub = makeMain(this);
            try {
                callback(this);
            }
            finally {
                makeMain(oldHub);
            }
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.getIntegration = function (integration) {
            var client = this.getClient();
            if (!client)
                return null;
            try {
                return client.getIntegration(integration);
            }
            catch (_oO) {
                logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
                return null;
            }
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.startSpan = function (context) {
            return this._callExtensionMethod('startSpan', context);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.startTransaction = function (context, customSamplingContext) {
            return this._callExtensionMethod('startTransaction', context, customSamplingContext);
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.traceHeaders = function () {
            return this._callExtensionMethod('traceHeaders');
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.captureSession = function (endSession) {
            if (endSession === void 0) { endSession = false; }
            // both send the update and pull the session from the scope
            if (endSession) {
                return this.endSession();
            }
            // only send the update
            this._sendSessionUpdate();
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.endSession = function () {
            var _a, _b, _c, _d, _e;
            (_c = (_b = (_a = this.getStackTop()) === null || _a === void 0 ? void 0 : _a.scope) === null || _b === void 0 ? void 0 : _b.getSession()) === null || _c === void 0 ? void 0 : _c.close();
            this._sendSessionUpdate();
            // the session is over; take it off of the scope
            (_e = (_d = this.getStackTop()) === null || _d === void 0 ? void 0 : _d.scope) === null || _e === void 0 ? void 0 : _e.setSession();
        };
        /**
         * @inheritDoc
         */
        Hub.prototype.startSession = function (context) {
            var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
            var _b = (client && client.getOptions()) || {}, release = _b.release, environment = _b.environment;
            // Will fetch userAgent if called from browser sdk
            var global = getGlobalObject();
            var userAgent = (global.navigator || {}).userAgent;
            var session = new Session(__assign(__assign(__assign({ release: release,
                environment: environment }, (scope && { user: scope.getUser() })), (userAgent && { userAgent: userAgent })), context));
            if (scope) {
                // End existing session if there's one
                var currentSession = scope.getSession && scope.getSession();
                if (currentSession && currentSession.status === SessionStatus.Ok) {
                    currentSession.update({ status: SessionStatus.Exited });
                }
                this.endSession();
                // Afterwards we set the new session on the scope
                scope.setSession(session);
            }
            return session;
        };
        /**
         * Sends the current Session on the scope
         */
        Hub.prototype._sendSessionUpdate = function () {
            var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
            if (!scope)
                return;
            var session = scope.getSession && scope.getSession();
            if (session) {
                if (client && client.captureSession) {
                    client.captureSession(session);
                }
            }
        };
        /**
         * Internal helper function to call a method on the top client if it exists.
         *
         * @param method The method to call on the client.
         * @param args Arguments to pass to the client function.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Hub.prototype._invokeClient = function (method) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
            if (client && client[method]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (_a = client)[method].apply(_a, __spread(args, [scope]));
            }
        };
        /**
         * Calls global extension method and binding current instance to the function call
         */
        // @ts-ignore Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Hub.prototype._callExtensionMethod = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var carrier = getMainCarrier();
            var sentry = carrier.__SENTRY__;
            if (sentry && sentry.extensions && typeof sentry.extensions[method] === 'function') {
                return sentry.extensions[method].apply(this, args);
            }
            logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
        };
        return Hub;
    }());
    /**
     * Returns the global shim registry.
     *
     * FIXME: This function is problematic, because despite always returning a valid Carrier,
     * it has an optional `__SENTRY__` property, which then in turn requires us to always perform an unnecessary check
     * at the call-site. We always access the carrier through this function, so we can guarantee that `__SENTRY__` is there.
     **/
    function getMainCarrier() {
        var carrier = getGlobalObject();
        carrier.__SENTRY__ = carrier.__SENTRY__ || {
            extensions: {},
            hub: undefined,
        };
        return carrier;
    }
    /**
     * Replaces the current main hub with the passed one on the global object
     *
     * @returns The old replaced hub
     */
    function makeMain(hub) {
        var registry = getMainCarrier();
        var oldHub = getHubFromCarrier(registry);
        setHubOnCarrier(registry, hub);
        return oldHub;
    }
    /**
     * Returns the default hub instance.
     *
     * If a hub is already registered in the global carrier but this module
     * contains a more recent version, it replaces the registered version.
     * Otherwise, the currently registered hub will be returned.
     */
    function getCurrentHub() {
        // Get main carrier (global for every environment)
        var registry = getMainCarrier();
        // If there's no hub, or its an old API, assign a new one
        if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
            setHubOnCarrier(registry, new Hub());
        }
        // Prefer domains over global if they are there (applicable only to Node environment)
        if (isNodeEnv()) {
            return getHubFromActiveDomain(registry);
        }
        // Return hub that lives on a global object
        return getHubFromCarrier(registry);
    }
    /**
     * Try to read the hub from an active domain, and fallback to the registry if one doesn't exist
     * @returns discovered hub
     */
    function getHubFromActiveDomain(registry) {
        var _a, _b, _c;
        try {
            var activeDomain = (_c = (_b = (_a = getMainCarrier().__SENTRY__) === null || _a === void 0 ? void 0 : _a.extensions) === null || _b === void 0 ? void 0 : _b.domain) === null || _c === void 0 ? void 0 : _c.active;
            // If there's no active domain, just return global hub
            if (!activeDomain) {
                return getHubFromCarrier(registry);
            }
            // If there's no hub on current domain, or it's an old API, assign a new one
            if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
                var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
                setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
            }
            // Return hub that lives on a domain
            return getHubFromCarrier(activeDomain);
        }
        catch (_Oo) {
            // Return hub that lives on a global object
            return getHubFromCarrier(registry);
        }
    }
    /**
     * This will tell whether a carrier has a hub on it or not
     * @param carrier object
     */
    function hasHubOnCarrier(carrier) {
        return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
    }
    /**
     * This will create a new {@link Hub} and add to the passed object on
     * __SENTRY__.hub.
     * @param carrier object
     * @hidden
     */
    function getHubFromCarrier(carrier) {
        if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub)
            return carrier.__SENTRY__.hub;
        carrier.__SENTRY__ = carrier.__SENTRY__ || {};
        carrier.__SENTRY__.hub = new Hub();
        return carrier.__SENTRY__.hub;
    }
    /**
     * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
     * @param carrier object
     * @param hub Hub
     * @returns A boolean indicating success or failure
     */
    function setHubOnCarrier(carrier, hub) {
        if (!carrier)
            return false;
        carrier.__SENTRY__ = carrier.__SENTRY__ || {};
        carrier.__SENTRY__.hub = hub;
        return true;
    }

    /**
     * This calls a function on the current hub.
     * @param method function to call on hub.
     * @param args to pass to function.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function callOnHub(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var hub = getCurrentHub();
        if (hub && hub[method]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return hub[method].apply(hub, __spread(args));
        }
        throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
    }
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception An exception-like object.
     * @returns The generated eventId.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    function captureException(exception, captureContext) {
        var syntheticException;
        try {
            throw new Error('Sentry syntheticException');
        }
        catch (exception) {
            syntheticException = exception;
        }
        return callOnHub('captureException', exception, {
            captureContext: captureContext,
            originalException: exception,
            syntheticException: syntheticException,
        });
    }
    /**
     * Callback to set context information onto the scope.
     * @param callback Callback function that receives Scope.
     */
    function configureScope(callback) {
        callOnHub('configureScope', callback);
    }
    /**
     * Creates a new scope with and executes the given operation within.
     * The scope is automatically removed once the operation
     * finishes or throws.
     *
     * This is essentially a convenience function for:
     *
     *     pushScope();
     *     callback();
     *     popScope();
     *
     * @param callback that will be enclosed into push/popScope.
     */
    function withScope(callback) {
        callOnHub('withScope', callback);
    }
    /**
     * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
     *
     * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
     * new child span within the transaction or any span, call the respective `.startChild()` method.
     *
     * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
     *
     * The transaction must be finished with a call to its `.finish()` method, at which point the transaction with all its
     * finished child spans will be sent to Sentry.
     *
     * @param context Properties of the new `Transaction`.
     * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
     * default values). See {@link Options.tracesSampler}.
     *
     * @returns The transaction which was just started
     */
    function startTransaction(context, customSamplingContext) {
        return callOnHub('startTransaction', __assign({}, context), customSamplingContext);
    }

    var SENTRY_API_VERSION = '7';
    /**
     * Helper class to provide urls, headers and metadata that can be used to form
     * different types of requests to Sentry endpoints.
     * Supports both envelopes and regular event requests.
     **/
    var API = /** @class */ (function () {
        /** Create a new instance of API */
        function API(dsn, metadata, tunnel) {
            if (metadata === void 0) { metadata = {}; }
            this.dsn = dsn;
            this._dsnObject = new Dsn(dsn);
            this.metadata = metadata;
            this._tunnel = tunnel;
        }
        /** Returns the Dsn object. */
        API.prototype.getDsn = function () {
            return this._dsnObject;
        };
        /** Does this transport force envelopes? */
        API.prototype.forceEnvelope = function () {
            return !!this._tunnel;
        };
        /** Returns the prefix to construct Sentry ingestion API endpoints. */
        API.prototype.getBaseApiEndpoint = function () {
            var dsn = this.getDsn();
            var protocol = dsn.protocol ? dsn.protocol + ":" : '';
            var port = dsn.port ? ":" + dsn.port : '';
            return protocol + "//" + dsn.host + port + (dsn.path ? "/" + dsn.path : '') + "/api/";
        };
        /** Returns the store endpoint URL. */
        API.prototype.getStoreEndpoint = function () {
            return this._getIngestEndpoint('store');
        };
        /**
         * Returns the store endpoint URL with auth in the query string.
         *
         * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
         */
        API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
            return this.getStoreEndpoint() + "?" + this._encodedAuth();
        };
        /**
         * Returns the envelope endpoint URL with auth in the query string.
         *
         * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
         */
        API.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function () {
            if (this.forceEnvelope()) {
                return this._tunnel;
            }
            return this._getEnvelopeEndpoint() + "?" + this._encodedAuth();
        };
        /** Returns only the path component for the store endpoint. */
        API.prototype.getStoreEndpointPath = function () {
            var dsn = this.getDsn();
            return (dsn.path ? "/" + dsn.path : '') + "/api/" + dsn.projectId + "/store/";
        };
        /**
         * Returns an object that can be used in request headers.
         * This is needed for node and the old /store endpoint in sentry
         */
        API.prototype.getRequestHeaders = function (clientName, clientVersion) {
            // CHANGE THIS to use metadata but keep clientName and clientVersion compatible
            var dsn = this.getDsn();
            var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
            header.push("sentry_client=" + clientName + "/" + clientVersion);
            header.push("sentry_key=" + dsn.publicKey);
            if (dsn.pass) {
                header.push("sentry_secret=" + dsn.pass);
            }
            return {
                'Content-Type': 'application/json',
                'X-Sentry-Auth': header.join(', '),
            };
        };
        /** Returns the url to the report dialog endpoint. */
        API.prototype.getReportDialogEndpoint = function (dialogOptions) {
            if (dialogOptions === void 0) { dialogOptions = {}; }
            var dsn = this.getDsn();
            var endpoint = this.getBaseApiEndpoint() + "embed/error-page/";
            var encodedOptions = [];
            encodedOptions.push("dsn=" + dsn.toString());
            for (var key in dialogOptions) {
                if (key === 'dsn') {
                    continue;
                }
                if (key === 'user') {
                    if (!dialogOptions.user) {
                        continue;
                    }
                    if (dialogOptions.user.name) {
                        encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
                    }
                    if (dialogOptions.user.email) {
                        encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
                    }
                }
                else {
                    encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
                }
            }
            if (encodedOptions.length) {
                return endpoint + "?" + encodedOptions.join('&');
            }
            return endpoint;
        };
        /** Returns the envelope endpoint URL. */
        API.prototype._getEnvelopeEndpoint = function () {
            return this._getIngestEndpoint('envelope');
        };
        /** Returns the ingest API endpoint for target. */
        API.prototype._getIngestEndpoint = function (target) {
            if (this._tunnel) {
                return this._tunnel;
            }
            var base = this.getBaseApiEndpoint();
            var dsn = this.getDsn();
            return "" + base + dsn.projectId + "/" + target + "/";
        };
        /** Returns a URL-encoded string with auth config suitable for a query string. */
        API.prototype._encodedAuth = function () {
            var dsn = this.getDsn();
            var auth = {
                // We send only the minimum set of required information. See
                // https://github.com/getsentry/sentry-javascript/issues/2572.
                sentry_key: dsn.publicKey,
                sentry_version: SENTRY_API_VERSION,
            };
            return urlEncode(auth);
        };
        return API;
    }());

    var installedIntegrations = [];
    /**
     * @private
     */
    function filterDuplicates(integrations) {
        return integrations.reduce(function (acc, integrations) {
            if (acc.every(function (accIntegration) { return integrations.name !== accIntegration.name; })) {
                acc.push(integrations);
            }
            return acc;
        }, []);
    }
    /** Gets integration to install */
    function getIntegrationsToSetup(options) {
        var defaultIntegrations = (options.defaultIntegrations && __spread(options.defaultIntegrations)) || [];
        var userIntegrations = options.integrations;
        var integrations = __spread(filterDuplicates(defaultIntegrations));
        if (Array.isArray(userIntegrations)) {
            // Filter out integrations that are also included in user options
            integrations = __spread(integrations.filter(function (integrations) {
                return userIntegrations.every(function (userIntegration) { return userIntegration.name !== integrations.name; });
            }), filterDuplicates(userIntegrations));
        }
        else if (typeof userIntegrations === 'function') {
            integrations = userIntegrations(integrations);
            integrations = Array.isArray(integrations) ? integrations : [integrations];
        }
        // Make sure that if present, `Debug` integration will always run last
        var integrationsNames = integrations.map(function (i) { return i.name; });
        var alwaysLastToRun = 'Debug';
        if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
            integrations.push.apply(integrations, __spread(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
        }
        return integrations;
    }
    /** Setup given integration */
    function setupIntegration(integration) {
        if (installedIntegrations.indexOf(integration.name) !== -1) {
            return;
        }
        integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
        installedIntegrations.push(integration.name);
        logger.log("Integration installed: " + integration.name);
    }
    /**
     * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
     * integrations are added unless they were already provided before.
     * @param integrations array of integration instances
     * @param withDefault should enable default integrations
     */
    function setupIntegrations(options) {
        var integrations = {};
        getIntegrationsToSetup(options).forEach(function (integration) {
            integrations[integration.name] = integration;
            setupIntegration(integration);
        });
        // set the `initialized` flag so we don't run through the process again unecessarily; use `Object.defineProperty`
        // because by default it creates a property which is nonenumerable, which we want since `initialized` shouldn't be
        // considered a member of the index the way the actual integrations are
        Object.defineProperty(integrations, 'initialized', { value: true });
        return integrations;
    }

    var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
    /**
     * Base implementation for all JavaScript SDK clients.
     *
     * Call the constructor with the corresponding backend constructor and options
     * specific to the client subclass. To access these options later, use
     * {@link Client.getOptions}. Also, the Backend instance is available via
     * {@link Client.getBackend}.
     *
     * If a Dsn is specified in the options, it will be parsed and stored. Use
     * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
     * invalid, the constructor will throw a {@link SentryException}. Note that
     * without a valid Dsn, the SDK will not send any events to Sentry.
     *
     * Before sending an event via the backend, it is passed through
     * {@link BaseClient._prepareEvent} to add SDK information and scope data
     * (breadcrumbs and context). To add more custom information, override this
     * method and extend the resulting prepared event.
     *
     * To issue automatically created events (e.g. via instrumentation), use
     * {@link Client.captureEvent}. It will prepare the event and pass it through
     * the callback lifecycle. To issue auto-breadcrumbs, use
     * {@link Client.addBreadcrumb}.
     *
     * @example
     * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
     *   public constructor(options: NodeOptions) {
     *     super(NodeBackend, options);
     *   }
     *
     *   // ...
     * }
     */
    var BaseClient = /** @class */ (function () {
        /**
         * Initializes this client instance.
         *
         * @param backendClass A constructor function to create the backend.
         * @param options Options for the client.
         */
        function BaseClient(backendClass, options) {
            /** Array of used integrations. */
            this._integrations = {};
            /** Number of calls being processed */
            this._numProcessing = 0;
            this._backend = new backendClass(options);
            this._options = options;
            if (options.dsn) {
                this._dsn = new Dsn(options.dsn);
            }
        }
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        BaseClient.prototype.captureException = function (exception, hint, scope) {
            var _this = this;
            // ensure we haven't captured this very object before
            if (checkOrSetAlreadyCaught(exception)) {
                logger.log(ALREADY_SEEN_ERROR);
                return;
            }
            var eventId = hint && hint.event_id;
            this._process(this._getBackend()
                .eventFromException(exception, hint)
                .then(function (event) { return _this._captureEvent(event, hint, scope); })
                .then(function (result) {
                eventId = result;
            }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
            var _this = this;
            var eventId = hint && hint.event_id;
            var promisedEvent = isPrimitive(message)
                ? this._getBackend().eventFromMessage(String(message), level, hint)
                : this._getBackend().eventFromException(message, hint);
            this._process(promisedEvent
                .then(function (event) { return _this._captureEvent(event, hint, scope); })
                .then(function (result) {
                eventId = result;
            }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureEvent = function (event, hint, scope) {
            var _a;
            // ensure we haven't captured this very object before
            if (((_a = hint) === null || _a === void 0 ? void 0 : _a.originalException) && checkOrSetAlreadyCaught(hint.originalException)) {
                logger.log(ALREADY_SEEN_ERROR);
                return;
            }
            var eventId = hint && hint.event_id;
            this._process(this._captureEvent(event, hint, scope).then(function (result) {
                eventId = result;
            }));
            return eventId;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureSession = function (session) {
            if (!this._isEnabled()) {
                logger.warn('SDK not enabled, will not capture session.');
                return;
            }
            if (!(typeof session.release === 'string')) {
                logger.warn('Discarded session because of missing or non-string release');
            }
            else {
                this._sendSession(session);
                // After sending, we set init false to indicate it's not the first occurrence
                session.update({ init: false });
            }
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getDsn = function () {
            return this._dsn;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getOptions = function () {
            return this._options;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getTransport = function () {
            return this._getBackend().getTransport();
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.flush = function (timeout) {
            var _this = this;
            return this._isClientDoneProcessing(timeout).then(function (clientFinished) {
                return _this.getTransport()
                    .close(timeout)
                    .then(function (transportFlushed) { return clientFinished && transportFlushed; });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.close = function (timeout) {
            var _this = this;
            return this.flush(timeout).then(function (result) {
                _this.getOptions().enabled = false;
                return result;
            });
        };
        /**
         * Sets up the integrations
         */
        BaseClient.prototype.setupIntegrations = function () {
            if (this._isEnabled() && !this._integrations.initialized) {
                this._integrations = setupIntegrations(this._options);
            }
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getIntegration = function (integration) {
            try {
                return this._integrations[integration.id] || null;
            }
            catch (_oO) {
                logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
                return null;
            }
        };
        /** Updates existing session based on the provided event */
        BaseClient.prototype._updateSessionFromEvent = function (session, event) {
            var e_1, _a;
            var crashed = false;
            var errored = false;
            var exceptions = event.exception && event.exception.values;
            if (exceptions) {
                errored = true;
                try {
                    for (var exceptions_1 = __values(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
                        var ex = exceptions_1_1.value;
                        var mechanism = ex.mechanism;
                        if (mechanism && mechanism.handled === false) {
                            crashed = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return)) _a.call(exceptions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // A session is updated and that session update is sent in only one of the two following scenarios:
            // 1. Session with non terminal status and 0 errors + an error occurred -> Will set error count to 1 and send update
            // 2. Session with non terminal status and 1 error + a crash occurred -> Will set status crashed and send update
            var sessionNonTerminal = session.status === SessionStatus.Ok;
            var shouldUpdateAndSend = (sessionNonTerminal && session.errors === 0) || (sessionNonTerminal && crashed);
            if (shouldUpdateAndSend) {
                session.update(__assign(__assign({}, (crashed && { status: SessionStatus.Crashed })), { errors: session.errors || Number(errored || crashed) }));
                this.captureSession(session);
            }
        };
        /** Deliver captured session to Sentry */
        BaseClient.prototype._sendSession = function (session) {
            this._getBackend().sendSession(session);
        };
        /**
         * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
         * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
         *
         * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
         * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
         * `true`.
         * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
         * `false` otherwise
         */
        BaseClient.prototype._isClientDoneProcessing = function (timeout) {
            var _this = this;
            return new SyncPromise(function (resolve) {
                var ticked = 0;
                var tick = 1;
                var interval = setInterval(function () {
                    if (_this._numProcessing == 0) {
                        clearInterval(interval);
                        resolve(true);
                    }
                    else {
                        ticked += tick;
                        if (timeout && ticked >= timeout) {
                            clearInterval(interval);
                            resolve(false);
                        }
                    }
                }, tick);
            });
        };
        /** Returns the current backend. */
        BaseClient.prototype._getBackend = function () {
            return this._backend;
        };
        /** Determines whether this SDK is enabled and a valid Dsn is present. */
        BaseClient.prototype._isEnabled = function () {
            return this.getOptions().enabled !== false && this._dsn !== undefined;
        };
        /**
         * Adds common information to events.
         *
         * The information includes release and environment from `options`,
         * breadcrumbs and context (extra, tags and user) from the scope.
         *
         * Information that is already present in the event is never overwritten. For
         * nested objects, such as the context, keys are merged.
         *
         * @param event The original event.
         * @param hint May contain additional information about the original exception.
         * @param scope A scope containing event metadata.
         * @returns A new event with more information.
         */
        BaseClient.prototype._prepareEvent = function (event, scope, hint) {
            var _this = this;
            var _a = this.getOptions().normalizeDepth, normalizeDepth = _a === void 0 ? 3 : _a;
            var prepared = __assign(__assign({}, event), { event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()), timestamp: event.timestamp || dateTimestampInSeconds() });
            this._applyClientOptions(prepared);
            this._applyIntegrationsMetadata(prepared);
            // If we have scope given to us, use it as the base for further modifications.
            // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
            var finalScope = scope;
            if (hint && hint.captureContext) {
                finalScope = Scope.clone(finalScope).update(hint.captureContext);
            }
            // We prepare the result here with a resolved Event.
            var result = SyncPromise.resolve(prepared);
            // This should be the last thing called, since we want that
            // {@link Hub.addEventProcessor} gets the finished prepared event.
            if (finalScope) {
                // In case we have a hub we reassign it.
                result = finalScope.applyToEvent(prepared, hint);
            }
            return result.then(function (evt) {
                if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
                    return _this._normalizeEvent(evt, normalizeDepth);
                }
                return evt;
            });
        };
        /**
         * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
         * Normalized keys:
         * - `breadcrumbs.data`
         * - `user`
         * - `contexts`
         * - `extra`
         * @param event Event
         * @returns Normalized event
         */
        BaseClient.prototype._normalizeEvent = function (event, depth) {
            if (!event) {
                return null;
            }
            var normalized = __assign(__assign(__assign(__assign(__assign({}, event), (event.breadcrumbs && {
                breadcrumbs: event.breadcrumbs.map(function (b) { return (__assign(__assign({}, b), (b.data && {
                    data: normalize(b.data, depth),
                }))); }),
            })), (event.user && {
                user: normalize(event.user, depth),
            })), (event.contexts && {
                contexts: normalize(event.contexts, depth),
            })), (event.extra && {
                extra: normalize(event.extra, depth),
            }));
            // event.contexts.trace stores information about a Transaction. Similarly,
            // event.spans[] stores information about child Spans. Given that a
            // Transaction is conceptually a Span, normalization should apply to both
            // Transactions and Spans consistently.
            // For now the decision is to skip normalization of Transactions and Spans,
            // so this block overwrites the normalized event to add back the original
            // Transaction information prior to normalization.
            if (event.contexts && event.contexts.trace) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                normalized.contexts.trace = event.contexts.trace;
            }
            var _a = this.getOptions()._experiments, _experiments = _a === void 0 ? {} : _a;
            if (_experiments.ensureNoCircularStructures) {
                return normalize(normalized);
            }
            return normalized;
        };
        /**
         *  Enhances event using the client configuration.
         *  It takes care of all "static" values like environment, release and `dist`,
         *  as well as truncating overly long values.
         * @param event event instance to be enhanced
         */
        BaseClient.prototype._applyClientOptions = function (event) {
            var options = this.getOptions();
            var environment = options.environment, release = options.release, dist = options.dist, _a = options.maxValueLength, maxValueLength = _a === void 0 ? 250 : _a;
            if (!('environment' in event)) {
                event.environment = 'environment' in options ? environment : 'production';
            }
            if (event.release === undefined && release !== undefined) {
                event.release = release;
            }
            if (event.dist === undefined && dist !== undefined) {
                event.dist = dist;
            }
            if (event.message) {
                event.message = truncate(event.message, maxValueLength);
            }
            var exception = event.exception && event.exception.values && event.exception.values[0];
            if (exception && exception.value) {
                exception.value = truncate(exception.value, maxValueLength);
            }
            var request = event.request;
            if (request && request.url) {
                request.url = truncate(request.url, maxValueLength);
            }
        };
        /**
         * This function adds all used integrations to the SDK info in the event.
         * @param event The event that will be filled with all integrations.
         */
        BaseClient.prototype._applyIntegrationsMetadata = function (event) {
            var integrationsArray = Object.keys(this._integrations);
            if (integrationsArray.length > 0) {
                event.sdk = event.sdk || {};
                event.sdk.integrations = __spread((event.sdk.integrations || []), integrationsArray);
            }
        };
        /**
         * Tells the backend to send this event
         * @param event The Sentry event to send
         */
        BaseClient.prototype._sendEvent = function (event) {
            this._getBackend().sendEvent(event);
        };
        /**
         * Processes the event and logs an error in case of rejection
         * @param event
         * @param hint
         * @param scope
         */
        BaseClient.prototype._captureEvent = function (event, hint, scope) {
            return this._processEvent(event, hint, scope).then(function (finalEvent) {
                return finalEvent.event_id;
            }, function (reason) {
                logger.error(reason);
                return undefined;
            });
        };
        /**
         * Processes an event (either error or message) and sends it to Sentry.
         *
         * This also adds breadcrumbs and context information to the event. However,
         * platform specific meta data (such as the User's IP address) must be added
         * by the SDK implementor.
         *
         *
         * @param event The event to send to Sentry.
         * @param hint May contain additional information about the original exception.
         * @param scope A scope containing event metadata.
         * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
         */
        BaseClient.prototype._processEvent = function (event, hint, scope) {
            var _this = this;
            var _a, _b;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            var _c = this.getOptions(), beforeSend = _c.beforeSend, sampleRate = _c.sampleRate;
            var transport = this.getTransport();
            if (!this._isEnabled()) {
                return SyncPromise.reject(new SentryError('SDK not enabled, will not capture event.'));
            }
            var isTransaction = event.type === 'transaction';
            // 1.0 === 100% events are sent
            // 0.0 === 0% events are sent
            // Sampling for transaction happens somewhere else
            if (!isTransaction && typeof sampleRate === 'number' && Math.random() > sampleRate) {
                (_b = (_a = transport).recordLostEvent) === null || _b === void 0 ? void 0 : _b.call(_a, Outcome.SampleRate, 'event');
                return SyncPromise.reject(new SentryError("Discarding event because it's not included in the random sample (sampling rate = " + sampleRate + ")"));
            }
            return this._prepareEvent(event, scope, hint)
                .then(function (prepared) {
                var _a, _b;
                if (prepared === null) {
                    (_b = (_a = transport).recordLostEvent) === null || _b === void 0 ? void 0 : _b.call(_a, Outcome.EventProcessor, event.type || 'event');
                    throw new SentryError('An event processor returned null, will not send event.');
                }
                var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
                if (isInternalException || isTransaction || !beforeSend) {
                    return prepared;
                }
                var beforeSendResult = beforeSend(prepared, hint);
                return _this._ensureBeforeSendRv(beforeSendResult);
            })
                .then(function (processedEvent) {
                var _a, _b;
                if (processedEvent === null) {
                    (_b = (_a = transport).recordLostEvent) === null || _b === void 0 ? void 0 : _b.call(_a, Outcome.BeforeSend, event.type || 'event');
                    throw new SentryError('`beforeSend` returned `null`, will not send event.');
                }
                var session = scope && scope.getSession && scope.getSession();
                if (!isTransaction && session) {
                    _this._updateSessionFromEvent(session, processedEvent);
                }
                _this._sendEvent(processedEvent);
                return processedEvent;
            })
                .then(null, function (reason) {
                if (reason instanceof SentryError) {
                    throw reason;
                }
                _this.captureException(reason, {
                    data: {
                        __sentry__: true,
                    },
                    originalException: reason,
                });
                throw new SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
            });
        };
        /**
         * Occupies the client with processing and event
         */
        BaseClient.prototype._process = function (promise) {
            var _this = this;
            this._numProcessing += 1;
            void promise.then(function (value) {
                _this._numProcessing -= 1;
                return value;
            }, function (reason) {
                _this._numProcessing -= 1;
                return reason;
            });
        };
        /**
         * Verifies that return value of configured `beforeSend` is of expected type.
         */
        BaseClient.prototype._ensureBeforeSendRv = function (rv) {
            var nullErr = '`beforeSend` method has to return `null` or a valid event.';
            if (isThenable(rv)) {
                return rv.then(function (event) {
                    if (!(isPlainObject(event) || event === null)) {
                        throw new SentryError(nullErr);
                    }
                    return event;
                }, function (e) {
                    throw new SentryError("beforeSend rejected with " + e);
                });
            }
            else if (!(isPlainObject(rv) || rv === null)) {
                throw new SentryError(nullErr);
            }
            return rv;
        };
        return BaseClient;
    }());

    /** Noop transport */
    var NoopTransport = /** @class */ (function () {
        function NoopTransport() {
        }
        /**
         * @inheritDoc
         */
        NoopTransport.prototype.sendEvent = function (_) {
            return SyncPromise.resolve({
                reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                status: Status.Skipped,
            });
        };
        /**
         * @inheritDoc
         */
        NoopTransport.prototype.close = function (_) {
            return SyncPromise.resolve(true);
        };
        return NoopTransport;
    }());

    /**
     * This is the base implemention of a Backend.
     * @hidden
     */
    var BaseBackend = /** @class */ (function () {
        /** Creates a new backend instance. */
        function BaseBackend(options) {
            this._options = options;
            if (!this._options.dsn) {
                logger.warn('No DSN provided, backend will not do anything.');
            }
            this._transport = this._setupTransport();
        }
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        BaseBackend.prototype.eventFromException = function (_exception, _hint) {
            throw new SentryError('Backend has to implement `eventFromException` method');
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
            throw new SentryError('Backend has to implement `eventFromMessage` method');
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.sendEvent = function (event) {
            void this._transport.sendEvent(event).then(null, function (reason) {
                logger.error("Error while sending event: " + reason);
            });
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.sendSession = function (session) {
            if (!this._transport.sendSession) {
                logger.warn("Dropping session because custom transport doesn't implement sendSession");
                return;
            }
            void this._transport.sendSession(session).then(null, function (reason) {
                logger.error("Error while sending session: " + reason);
            });
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.getTransport = function () {
            return this._transport;
        };
        /**
         * Sets up the transport so it can be used later to send requests.
         */
        BaseBackend.prototype._setupTransport = function () {
            return new NoopTransport();
        };
        return BaseBackend;
    }());

    /** Extract sdk info from from the API metadata */
    function getSdkMetadataForEnvelopeHeader(api) {
        if (!api.metadata || !api.metadata.sdk) {
            return;
        }
        var _a = api.metadata.sdk, name = _a.name, version = _a.version;
        return { name: name, version: version };
    }
    /**
     * Apply SdkInfo (name, version, packages, integrations) to the corresponding event key.
     * Merge with existing data if any.
     **/
    function enhanceEventWithSdkInfo(event, sdkInfo) {
        if (!sdkInfo) {
            return event;
        }
        event.sdk = event.sdk || {};
        event.sdk.name = event.sdk.name || sdkInfo.name;
        event.sdk.version = event.sdk.version || sdkInfo.version;
        event.sdk.integrations = __spread((event.sdk.integrations || []), (sdkInfo.integrations || []));
        event.sdk.packages = __spread((event.sdk.packages || []), (sdkInfo.packages || []));
        return event;
    }
    /** Creates a SentryRequest from a Session. */
    function sessionToSentryRequest(session, api) {
        var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
        var envelopeHeaders = JSON.stringify(__assign(__assign({ sent_at: new Date().toISOString() }, (sdkInfo && { sdk: sdkInfo })), (api.forceEnvelope() && { dsn: api.getDsn().toString() })));
        // I know this is hacky but we don't want to add `session` to request type since it's never rate limited
        var type = 'aggregates' in session ? 'sessions' : 'session';
        var itemHeaders = JSON.stringify({
            type: type,
        });
        return {
            body: envelopeHeaders + "\n" + itemHeaders + "\n" + JSON.stringify(session),
            type: type,
            url: api.getEnvelopeEndpointWithUrlEncodedAuth(),
        };
    }
    /** Creates a SentryRequest from an event. */
    function eventToSentryRequest(event, api) {
        var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
        var eventType = event.type || 'event';
        var useEnvelope = eventType === 'transaction' || api.forceEnvelope();
        var _a = event.debug_meta || {}, transactionSampling = _a.transactionSampling, metadata = __rest(_a, ["transactionSampling"]);
        var _b = transactionSampling || {}, samplingMethod = _b.method, sampleRate = _b.rate;
        if (Object.keys(metadata).length === 0) {
            delete event.debug_meta;
        }
        else {
            event.debug_meta = metadata;
        }
        var req = {
            body: JSON.stringify(sdkInfo ? enhanceEventWithSdkInfo(event, api.metadata.sdk) : event),
            type: eventType,
            url: useEnvelope ? api.getEnvelopeEndpointWithUrlEncodedAuth() : api.getStoreEndpointWithUrlEncodedAuth(),
        };
        // https://develop.sentry.dev/sdk/envelopes/
        // Since we don't need to manipulate envelopes nor store them, there is no
        // exported concept of an Envelope with operations including serialization and
        // deserialization. Instead, we only implement a minimal subset of the spec to
        // serialize events inline here.
        if (useEnvelope) {
            var envelopeHeaders = JSON.stringify(__assign(__assign({ event_id: event.event_id, sent_at: new Date().toISOString() }, (sdkInfo && { sdk: sdkInfo })), (api.forceEnvelope() && { dsn: api.getDsn().toString() })));
            var itemHeaders = JSON.stringify({
                type: eventType,
                // TODO: Right now, sampleRate may or may not be defined (it won't be in the cases of inheritance and
                // explicitly-set sampling decisions). Are we good with that?
                sample_rates: [{ id: samplingMethod, rate: sampleRate }],
            });
            // The trailing newline is optional. We intentionally don't send it to avoid
            // sending unnecessary bytes.
            //
            // const envelope = `${envelopeHeaders}\n${itemHeaders}\n${req.body}\n`;
            var envelope = envelopeHeaders + "\n" + itemHeaders + "\n" + req.body;
            req.body = envelope;
        }
        return req;
    }

    /**
     * Internal function to create a new SDK client instance. The client is
     * installed and then bound to the current scope.
     *
     * @param clientClass The client class to instantiate.
     * @param options Options to pass to the client.
     */
    function initAndBind(clientClass, options) {
        var _a;
        if (options.debug === true) {
            logger.enable();
        }
        var hub = getCurrentHub();
        (_a = hub.getScope()) === null || _a === void 0 ? void 0 : _a.update(options.initialScope);
        var client = new clientClass(options);
        hub.bindClient(client);
    }

    var SDK_VERSION = '6.14.1';

    var originalFunctionToString;
    /** Patch toString calls to return proper name for wrapped functions */
    var FunctionToString = /** @class */ (function () {
        function FunctionToString() {
            /**
             * @inheritDoc
             */
            this.name = FunctionToString.id;
        }
        /**
         * @inheritDoc
         */
        FunctionToString.prototype.setupOnce = function () {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            originalFunctionToString = Function.prototype.toString;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Function.prototype.toString = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var context = this.__sentry_original__ || this;
                return originalFunctionToString.apply(context, args);
            };
        };
        /**
         * @inheritDoc
         */
        FunctionToString.id = 'FunctionToString';
        return FunctionToString;
    }());

    // "Script error." is hard coded into browsers for errors that it can't read.
    // this is the result of a script being pulled in from an external domain and CORS.
    var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
    /** Inbound filters configurable by the user */
    var InboundFilters = /** @class */ (function () {
        function InboundFilters(_options) {
            if (_options === void 0) { _options = {}; }
            this._options = _options;
            /**
             * @inheritDoc
             */
            this.name = InboundFilters.id;
        }
        /**
         * @inheritDoc
         */
        InboundFilters.prototype.setupOnce = function () {
            addGlobalEventProcessor(function (event) {
                var hub = getCurrentHub();
                if (!hub) {
                    return event;
                }
                var self = hub.getIntegration(InboundFilters);
                if (self) {
                    var client = hub.getClient();
                    var clientOptions = client ? client.getOptions() : {};
                    // This checks prevents most of the occurrences of the bug linked below:
                    // https://github.com/getsentry/sentry-javascript/issues/2622
                    // The bug is caused by multiple SDK instances, where one is minified and one is using non-mangled code.
                    // Unfortunatelly we cannot fix it reliably (thus reserved property in rollup's terser config),
                    // as we cannot force people using multiple instances in their apps to sync SDK versions.
                    var options = typeof self._mergeOptions === 'function' ? self._mergeOptions(clientOptions) : {};
                    if (typeof self._shouldDropEvent !== 'function') {
                        return event;
                    }
                    return self._shouldDropEvent(event, options) ? null : event;
                }
                return event;
            });
        };
        /** JSDoc */
        InboundFilters.prototype._shouldDropEvent = function (event, options) {
            if (this._isSentryError(event, options)) {
                logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + getEventDescription(event));
                return true;
            }
            if (this._isIgnoredError(event, options)) {
                logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + getEventDescription(event));
                return true;
            }
            if (this._isDeniedUrl(event, options)) {
                logger.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
                return true;
            }
            if (!this._isAllowedUrl(event, options)) {
                logger.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
                return true;
            }
            return false;
        };
        /** JSDoc */
        InboundFilters.prototype._isSentryError = function (event, options) {
            if (!options.ignoreInternal) {
                return false;
            }
            try {
                return ((event &&
                    event.exception &&
                    event.exception.values &&
                    event.exception.values[0] &&
                    event.exception.values[0].type === 'SentryError') ||
                    false);
            }
            catch (_oO) {
                return false;
            }
        };
        /** JSDoc */
        InboundFilters.prototype._isIgnoredError = function (event, options) {
            if (!options.ignoreErrors || !options.ignoreErrors.length) {
                return false;
            }
            return this._getPossibleEventMessages(event).some(function (message) {
                // Not sure why TypeScript complains here...
                return options.ignoreErrors.some(function (pattern) { return isMatchingPattern(message, pattern); });
            });
        };
        /** JSDoc */
        InboundFilters.prototype._isDeniedUrl = function (event, options) {
            // TODO: Use Glob instead?
            if (!options.denyUrls || !options.denyUrls.length) {
                return false;
            }
            var url = this._getEventFilterUrl(event);
            return !url ? false : options.denyUrls.some(function (pattern) { return isMatchingPattern(url, pattern); });
        };
        /** JSDoc */
        InboundFilters.prototype._isAllowedUrl = function (event, options) {
            // TODO: Use Glob instead?
            if (!options.allowUrls || !options.allowUrls.length) {
                return true;
            }
            var url = this._getEventFilterUrl(event);
            return !url ? true : options.allowUrls.some(function (pattern) { return isMatchingPattern(url, pattern); });
        };
        /** JSDoc */
        InboundFilters.prototype._mergeOptions = function (clientOptions) {
            if (clientOptions === void 0) { clientOptions = {}; }
            return {
                allowUrls: __spread((this._options.whitelistUrls || []), (this._options.allowUrls || []), (clientOptions.whitelistUrls || []), (clientOptions.allowUrls || [])),
                denyUrls: __spread((this._options.blacklistUrls || []), (this._options.denyUrls || []), (clientOptions.blacklistUrls || []), (clientOptions.denyUrls || [])),
                ignoreErrors: __spread((this._options.ignoreErrors || []), (clientOptions.ignoreErrors || []), DEFAULT_IGNORE_ERRORS),
                ignoreInternal: typeof this._options.ignoreInternal !== 'undefined' ? this._options.ignoreInternal : true,
            };
        };
        /** JSDoc */
        InboundFilters.prototype._getPossibleEventMessages = function (event) {
            if (event.message) {
                return [event.message];
            }
            if (event.exception) {
                try {
                    var _a = (event.exception.values && event.exception.values[0]) || {}, _b = _a.type, type = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? '' : _c;
                    return ["" + value, type + ": " + value];
                }
                catch (oO) {
                    logger.error("Cannot extract message for event " + getEventDescription(event));
                    return [];
                }
            }
            return [];
        };
        /** JSDoc */
        InboundFilters.prototype._getLastValidUrl = function (frames) {
            if (frames === void 0) { frames = []; }
            var _a, _b;
            for (var i = frames.length - 1; i >= 0; i--) {
                var frame = frames[i];
                if (((_a = frame) === null || _a === void 0 ? void 0 : _a.filename) !== '<anonymous>' && ((_b = frame) === null || _b === void 0 ? void 0 : _b.filename) !== '[native code]') {
                    return frame.filename || null;
                }
            }
            return null;
        };
        /** JSDoc */
        InboundFilters.prototype._getEventFilterUrl = function (event) {
            try {
                if (event.stacktrace) {
                    var frames_1 = event.stacktrace.frames;
                    return this._getLastValidUrl(frames_1);
                }
                if (event.exception) {
                    var frames_2 = event.exception.values && event.exception.values[0].stacktrace && event.exception.values[0].stacktrace.frames;
                    return this._getLastValidUrl(frames_2);
                }
                return null;
            }
            catch (oO) {
                logger.error("Cannot extract url for event " + getEventDescription(event));
                return null;
            }
        };
        /**
         * @inheritDoc
         */
        InboundFilters.id = 'InboundFilters';
        return InboundFilters;
    }());

    /**
     * This was originally forked from https://github.com/occ/TraceKit, but has since been
     * largely modified and is now maintained as part of Sentry JS SDK.
     */
    // global reference to slice
    var UNKNOWN_FUNCTION = '?';
    // Chromium based browsers: Chrome, Brave, new Opera, new Edge
    var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    // gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
    // generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
    // We need this specific case for now because we want no other regex to match.
    var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
    var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    // Based on our own mapping pattern - https://github.com/getsentry/sentry/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/sentry/lang/javascript/errormapping.py#L83-L108
    var reactMinifiedRegexp = /Minified React error #\d+;/i;
    /** JSDoc */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    function computeStackTrace(ex) {
        var stack = null;
        var popSize = 0;
        if (ex) {
            if (typeof ex.framesToPop === 'number') {
                popSize = ex.framesToPop;
            }
            else if (reactMinifiedRegexp.test(ex.message)) {
                popSize = 1;
            }
        }
        try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return popFrames(stack, popSize);
            }
        }
        catch (e) {
            // no-empty
        }
        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return popFrames(stack, popSize);
            }
        }
        catch (e) {
            // no-empty
        }
        return {
            message: extractMessage(ex),
            name: ex && ex.name,
            stack: [],
            failed: true,
        };
    }
    /** JSDoc */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, complexity
    function computeStackTraceFromStackProp(ex) {
        var _a, _b;
        if (!ex || !ex.stack) {
            return null;
        }
        var stack = [];
        var lines = ex.stack.split('\n');
        var isEval;
        var submatch;
        var parts;
        var element;
        for (var i = 0; i < lines.length; ++i) {
            if ((parts = chrome.exec(lines[i]))) {
                var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
                isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
                if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                    // throw out eval line/column and use top-most line/column number
                    parts[2] = submatch[1]; // url
                    parts[3] = submatch[2]; // line
                    parts[4] = submatch[3]; // column
                }
                // Arpad: Working with the regexp above is super painful. it is quite a hack, but just stripping the `address at `
                // prefix here seems like the quickest solution for now.
                var url = parts[2] && parts[2].indexOf('address at ') === 0 ? parts[2].substr('address at '.length) : parts[2];
                // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
                // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
                var func = parts[1] || UNKNOWN_FUNCTION;
                _a = __read(extractSafariExtensionDetails(func, url), 2), func = _a[0], url = _a[1];
                element = {
                    url: url,
                    func: func,
                    args: isNative ? [parts[2]] : [],
                    line: parts[3] ? +parts[3] : null,
                    column: parts[4] ? +parts[4] : null,
                };
            }
            else if ((parts = winjs.exec(lines[i]))) {
                element = {
                    url: parts[2],
                    func: parts[1] || UNKNOWN_FUNCTION,
                    args: [],
                    line: +parts[3],
                    column: parts[4] ? +parts[4] : null,
                };
            }
            else if ((parts = gecko.exec(lines[i]))) {
                isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
                if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                    // throw out eval line/column and use top-most line number
                    parts[1] = parts[1] || "eval";
                    parts[3] = submatch[1];
                    parts[4] = submatch[2];
                    parts[5] = ''; // no column when eval
                }
                else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
                    // FireFox uses this awesome columnNumber property for its top frame
                    // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                    // so adding 1
                    // NOTE: this hack doesn't work if top-most frame is eval
                    stack[0].column = ex.columnNumber + 1;
                }
                var url = parts[3];
                var func = parts[1] || UNKNOWN_FUNCTION;
                _b = __read(extractSafariExtensionDetails(func, url), 2), func = _b[0], url = _b[1];
                element = {
                    url: url,
                    func: func,
                    args: parts[2] ? parts[2].split(',') : [],
                    line: parts[4] ? +parts[4] : null,
                    column: parts[5] ? +parts[5] : null,
                };
            }
            else {
                continue;
            }
            if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
            }
            stack.push(element);
        }
        if (!stack.length) {
            return null;
        }
        return {
            message: extractMessage(ex),
            name: ex.name,
            stack: stack,
        };
    }
    /** JSDoc */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function computeStackTraceFromStacktraceProp(ex) {
        if (!ex || !ex.stacktrace) {
            return null;
        }
        // Access and store the stacktrace property before doing ANYTHING
        // else to it because Opera is not very good at providing it
        // reliably in other circumstances.
        var stacktrace = ex.stacktrace;
        var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
        var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i;
        var lines = stacktrace.split('\n');
        var stack = [];
        var parts;
        for (var line = 0; line < lines.length; line += 2) {
            var element = null;
            if ((parts = opera10Regex.exec(lines[line]))) {
                element = {
                    url: parts[2],
                    func: parts[3],
                    args: [],
                    line: +parts[1],
                    column: null,
                };
            }
            else if ((parts = opera11Regex.exec(lines[line]))) {
                element = {
                    url: parts[6],
                    func: parts[3] || parts[4],
                    args: parts[5] ? parts[5].split(',') : [],
                    line: +parts[1],
                    column: +parts[2],
                };
            }
            if (element) {
                if (!element.func && element.line) {
                    element.func = UNKNOWN_FUNCTION;
                }
                stack.push(element);
            }
        }
        if (!stack.length) {
            return null;
        }
        return {
            message: extractMessage(ex),
            name: ex.name,
            stack: stack,
        };
    }
    /**
     * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
     * What it means, is that instead of format like:
     *
     * Error: wat
     *   at function@url:row:col
     *   at function@url:row:col
     *   at function@url:row:col
     *
     * it produces something like:
     *
     *   function@url:row:col
     *   function@url:row:col
     *   function@url:row:col
     *
     * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
     * This function is extracted so that we can use it in both places without duplicating the logic.
     * Unfortunatelly "just" changing RegExp is too complicated now and making it pass all tests
     * and fix this case seems like an impossible, or at least way too time-consuming task.
     */
    var extractSafariExtensionDetails = function (func, url) {
        var isSafariExtension = func.indexOf('safari-extension') !== -1;
        var isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;
        return isSafariExtension || isSafariWebExtension
            ? [
                func.indexOf('@') !== -1 ? func.split('@')[0] : UNKNOWN_FUNCTION,
                isSafariExtension ? "safari-extension:" + url : "safari-web-extension:" + url,
            ]
            : [func, url];
    };
    /** Remove N number of frames from the stack */
    function popFrames(stacktrace, popSize) {
        try {
            return __assign(__assign({}, stacktrace), { stack: stacktrace.stack.slice(popSize) });
        }
        catch (e) {
            return stacktrace;
        }
    }
    /**
     * There are cases where stacktrace.message is an Event object
     * https://github.com/getsentry/sentry-javascript/issues/1949
     * In this specific case we try to extract stacktrace.message.error.message
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function extractMessage(ex) {
        var message = ex && ex.message;
        if (!message) {
            return 'No error message';
        }
        if (message.error && typeof message.error.message === 'string') {
            return message.error.message;
        }
        return message;
    }

    var STACKTRACE_LIMIT = 50;
    /**
     * This function creates an exception from an TraceKitStackTrace
     * @param stacktrace TraceKitStackTrace that will be converted to an exception
     * @hidden
     */
    function exceptionFromStacktrace(stacktrace) {
        var frames = prepareFramesForEvent(stacktrace.stack);
        var exception = {
            type: stacktrace.name,
            value: stacktrace.message,
        };
        if (frames && frames.length) {
            exception.stacktrace = { frames: frames };
        }
        if (exception.type === undefined && exception.value === '') {
            exception.value = 'Unrecoverable error caught';
        }
        return exception;
    }
    /**
     * @hidden
     */
    function eventFromPlainObject(exception, syntheticException, rejection) {
        var event = {
            exception: {
                values: [
                    {
                        type: isEvent(exception) ? exception.constructor.name : rejection ? 'UnhandledRejection' : 'Error',
                        value: "Non-Error " + (rejection ? 'promise rejection' : 'exception') + " captured with keys: " + extractExceptionKeysForMessage(exception),
                    },
                ],
            },
            extra: {
                __serialized__: normalizeToSize(exception),
            },
        };
        if (syntheticException) {
            var stacktrace = computeStackTrace(syntheticException);
            var frames_1 = prepareFramesForEvent(stacktrace.stack);
            event.stacktrace = {
                frames: frames_1,
            };
        }
        return event;
    }
    /**
     * @hidden
     */
    function eventFromStacktrace(stacktrace) {
        var exception = exceptionFromStacktrace(stacktrace);
        return {
            exception: {
                values: [exception],
            },
        };
    }
    /**
     * @hidden
     */
    function prepareFramesForEvent(stack) {
        if (!stack || !stack.length) {
            return [];
        }
        var localStack = stack;
        var firstFrameFunction = localStack[0].func || '';
        var lastFrameFunction = localStack[localStack.length - 1].func || '';
        // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
        if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
            localStack = localStack.slice(1);
        }
        // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
        if (lastFrameFunction.indexOf('sentryWrapped') !== -1) {
            localStack = localStack.slice(0, -1);
        }
        // The frame where the crash happened, should be the last entry in the array
        return localStack
            .slice(0, STACKTRACE_LIMIT)
            .map(function (frame) { return ({
            colno: frame.column === null ? undefined : frame.column,
            filename: frame.url || localStack[0].url,
            function: frame.func || '?',
            in_app: true,
            lineno: frame.line === null ? undefined : frame.line,
        }); })
            .reverse();
    }

    /**
     * Builds and Event from a Exception
     * @hidden
     */
    function eventFromException(options, exception, hint) {
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventFromUnknownInput(exception, syntheticException, {
            attachStacktrace: options.attachStacktrace,
        });
        addExceptionMechanism(event); // defaults to { type: 'generic', handled: true }
        event.level = Severity.Error;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return SyncPromise.resolve(event);
    }
    /**
     * Builds and Event from a Message
     * @hidden
     */
    function eventFromMessage(options, message, level, hint) {
        if (level === void 0) { level = Severity.Info; }
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventFromString(message, syntheticException, {
            attachStacktrace: options.attachStacktrace,
        });
        event.level = level;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return SyncPromise.resolve(event);
    }
    /**
     * @hidden
     */
    function eventFromUnknownInput(exception, syntheticException, options) {
        if (options === void 0) { options = {}; }
        var event;
        if (isErrorEvent(exception) && exception.error) {
            // If it is an ErrorEvent with `error` property, extract it to get actual Error
            var errorEvent = exception;
            // eslint-disable-next-line no-param-reassign
            exception = errorEvent.error;
            event = eventFromStacktrace(computeStackTrace(exception));
            return event;
        }
        if (isDOMError(exception) || isDOMException(exception)) {
            // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
            // then we just extract the name, code, and message, as they don't provide anything else
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
            var domException = exception;
            var name_1 = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
            var message = domException.message ? name_1 + ": " + domException.message : name_1;
            event = eventFromString(message, syntheticException, options);
            addExceptionTypeValue(event, message);
            if ('code' in domException) {
                event.tags = __assign(__assign({}, event.tags), { 'DOMException.code': "" + domException.code });
            }
            return event;
        }
        if (isError(exception)) {
            // we have a real Error object, do nothing
            event = eventFromStacktrace(computeStackTrace(exception));
            return event;
        }
        if (isPlainObject(exception) || isEvent(exception)) {
            // If it is plain Object or Event, serialize it manually and extract options
            // This will allow us to group events based on top-level keys
            // which is much better than creating new group when any key/value change
            var objectException = exception;
            event = eventFromPlainObject(objectException, syntheticException, options.rejection);
            addExceptionMechanism(event, {
                synthetic: true,
            });
            return event;
        }
        // If none of previous checks were valid, then it means that it's not:
        // - an instance of DOMError
        // - an instance of DOMException
        // - an instance of Event
        // - an instance of Error
        // - a valid ErrorEvent (one with an error property)
        // - a plain Object
        //
        // So bail out and capture it as a simple message:
        event = eventFromString(exception, syntheticException, options);
        addExceptionTypeValue(event, "" + exception, undefined);
        addExceptionMechanism(event, {
            synthetic: true,
        });
        return event;
    }
    /**
     * @hidden
     */
    function eventFromString(input, syntheticException, options) {
        if (options === void 0) { options = {}; }
        var event = {
            message: input,
        };
        if (options.attachStacktrace && syntheticException) {
            var stacktrace = computeStackTrace(syntheticException);
            var frames_1 = prepareFramesForEvent(stacktrace.stack);
            event.stacktrace = {
                frames: frames_1,
            };
        }
        return event;
    }

    var global$7 = getGlobalObject();
    var cachedFetchImpl;
    /**
     * A special usecase for incorrectly wrapped Fetch APIs in conjunction with ad-blockers.
     * Whenever someone wraps the Fetch API and returns the wrong promise chain,
     * this chain becomes orphaned and there is no possible way to capture it's rejections
     * other than allowing it bubble up to this very handler. eg.
     *
     * const f = window.fetch;
     * window.fetch = function () {
     *   const p = f.apply(this, arguments);
     *
     *   p.then(function() {
     *     console.log('hi.');
     *   });
     *
     *   return p;
     * }
     *
     * `p.then(function () { ... })` is producing a completely separate promise chain,
     * however, what's returned is `p` - the result of original `fetch` call.
     *
     * This mean, that whenever we use the Fetch API to send our own requests, _and_
     * some ad-blocker blocks it, this orphaned chain will _always_ reject,
     * effectively causing another event to be captured.
     * This makes a whole process become an infinite loop, which we need to somehow
     * deal with, and break it in one way or another.
     *
     * To deal with this issue, we are making sure that we _always_ use the real
     * browser Fetch API, instead of relying on what `window.fetch` exposes.
     * The only downside to this would be missing our own requests as breadcrumbs,
     * but because we are already not doing this, it should be just fine.
     *
     * Possible failed fetch error messages per-browser:
     *
     * Chrome:  Failed to fetch
     * Edge:    Failed to Fetch
     * Firefox: NetworkError when attempting to fetch resource
     * Safari:  resource blocked by content blocker
     */
    function getNativeFetchImplementation() {
        var _a, _b;
        if (cachedFetchImpl) {
            return cachedFetchImpl;
        }
        /* eslint-disable @typescript-eslint/unbound-method */
        // Fast path to avoid DOM I/O
        if (isNativeFetch(global$7.fetch)) {
            return (cachedFetchImpl = global$7.fetch.bind(global$7));
        }
        var document = global$7.document;
        var fetchImpl = global$7.fetch;
        // eslint-disable-next-line deprecation/deprecation
        if (typeof ((_a = document) === null || _a === void 0 ? void 0 : _a.createElement) === "function") {
            try {
                var sandbox = document.createElement('iframe');
                sandbox.hidden = true;
                document.head.appendChild(sandbox);
                if ((_b = sandbox.contentWindow) === null || _b === void 0 ? void 0 : _b.fetch) {
                    fetchImpl = sandbox.contentWindow.fetch;
                }
                document.head.removeChild(sandbox);
            }
            catch (e) {
                logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', e);
            }
        }
        return (cachedFetchImpl = fetchImpl.bind(global$7));
        /* eslint-enable @typescript-eslint/unbound-method */
    }
    /**
     * Sends sdk client report using sendBeacon or fetch as a fallback if available
     *
     * @param url report endpoint
     * @param body report payload
     */
    function sendReport(url, body) {
        var isRealNavigator = Object.prototype.toString.call(global$7 && global$7.navigator) === '[object Navigator]';
        var hasSendBeacon = isRealNavigator && typeof global$7.navigator.sendBeacon === 'function';
        if (hasSendBeacon) {
            // Prevent illegal invocations - https://xgwang.me/posts/you-may-not-know-beacon/#it-may-throw-error%2C-be-sure-to-catch
            var sendBeacon = global$7.navigator.sendBeacon.bind(global$7.navigator);
            return sendBeacon(url, body);
        }
        if (supportsFetch()) {
            var fetch_1 = getNativeFetchImplementation();
            return forget(fetch_1(url, {
                body: body,
                method: 'POST',
                credentials: 'omit',
                keepalive: true,
            }));
        }
    }

    var CATEGORY_MAPPING = {
        event: 'error',
        transaction: 'transaction',
        session: 'session',
        attachment: 'attachment',
    };
    var global$6 = getGlobalObject();
    /** Base Transport class implementation */
    var BaseTransport = /** @class */ (function () {
        function BaseTransport(options) {
            var _this = this;
            this.options = options;
            /** A simple buffer holding all requests. */
            this._buffer = new PromiseBuffer(30);
            /** Locks transport after receiving rate limits in a response */
            this._rateLimits = {};
            this._outcomes = {};
            this._api = new API(options.dsn, options._metadata, options.tunnel);
            // eslint-disable-next-line deprecation/deprecation
            this.url = this._api.getStoreEndpointWithUrlEncodedAuth();
            if (this.options.sendClientReports && global$6.document) {
                global$6.document.addEventListener('visibilitychange', function () {
                    if (global$6.document.visibilityState === 'hidden') {
                        _this._flushOutcomes();
                    }
                });
            }
        }
        /**
         * @inheritDoc
         */
        BaseTransport.prototype.sendEvent = function (_) {
            throw new SentryError('Transport Class has to implement `sendEvent` method');
        };
        /**
         * @inheritDoc
         */
        BaseTransport.prototype.close = function (timeout) {
            return this._buffer.drain(timeout);
        };
        /**
         * @inheritDoc
         */
        BaseTransport.prototype.recordLostEvent = function (reason, category) {
            var _a;
            if (!this.options.sendClientReports) {
                return;
            }
            // We want to track each category (event, transaction, session) separately
            // but still keep the distinction between different type of outcomes.
            // We could use nested maps, but it's much easier to read and type this way.
            // A correct type for map-based implementation if we want to go that route
            // would be `Partial<Record<SentryRequestType, Partial<Record<Outcome, number>>>>`
            var key = CATEGORY_MAPPING[category] + ":" + reason;
            logger.log("Adding outcome: " + key);
            this._outcomes[key] = (_a = this._outcomes[key], (_a !== null && _a !== void 0 ? _a : 0)) + 1;
        };
        /**
         * Send outcomes as an envelope
         */
        BaseTransport.prototype._flushOutcomes = function () {
            if (!this.options.sendClientReports) {
                return;
            }
            var outcomes = this._outcomes;
            this._outcomes = {};
            // Nothing to send
            if (!Object.keys(outcomes).length) {
                logger.log('No outcomes to flush');
                return;
            }
            logger.log("Flushing outcomes:\n" + JSON.stringify(outcomes, null, 2));
            var url = this._api.getEnvelopeEndpointWithUrlEncodedAuth();
            // Envelope header is required to be at least an empty object
            var envelopeHeader = JSON.stringify(__assign({}, (this.options.tunnel && { dsn: this._api.getDsn().toString() })));
            var itemHeaders = JSON.stringify({
                type: 'client_report',
            });
            var item = JSON.stringify({
                timestamp: dateTimestampInSeconds(),
                discarded_events: Object.keys(outcomes).map(function (key) {
                    var _a = __read(key.split(':'), 2), category = _a[0], reason = _a[1];
                    return {
                        reason: reason,
                        category: category,
                        quantity: outcomes[key],
                    };
                }),
            });
            var envelope = envelopeHeader + "\n" + itemHeaders + "\n" + item;
            try {
                sendReport(url, envelope);
            }
            catch (e) {
                logger.error(e);
            }
        };
        /**
         * Handle Sentry repsonse for promise-based transports.
         */
        BaseTransport.prototype._handleResponse = function (_a) {
            var requestType = _a.requestType, response = _a.response, headers = _a.headers, resolve = _a.resolve, reject = _a.reject;
            var status = Status.fromHttpCode(response.status);
            /**
             * "The name is case-insensitive."
             * https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
             */
            var limited = this._handleRateLimit(headers);
            if (limited)
                logger.warn("Too many " + requestType + " requests, backing off until: " + this._disabledUntil(requestType));
            if (status === Status.Success) {
                resolve({ status: status });
                return;
            }
            reject(response);
        };
        /**
         * Gets the time that given category is disabled until for rate limiting
         */
        BaseTransport.prototype._disabledUntil = function (requestType) {
            var category = CATEGORY_MAPPING[requestType];
            return this._rateLimits[category] || this._rateLimits.all;
        };
        /**
         * Checks if a category is rate limited
         */
        BaseTransport.prototype._isRateLimited = function (requestType) {
            return this._disabledUntil(requestType) > new Date(Date.now());
        };
        /**
         * Sets internal _rateLimits from incoming headers. Returns true if headers contains a non-empty rate limiting header.
         */
        BaseTransport.prototype._handleRateLimit = function (headers) {
            var e_1, _a, e_2, _b;
            var now = Date.now();
            var rlHeader = headers['x-sentry-rate-limits'];
            var raHeader = headers['retry-after'];
            if (rlHeader) {
                try {
                    // rate limit headers are of the form
                    //     <header>,<header>,..
                    // where each <header> is of the form
                    //     <retry_after>: <categories>: <scope>: <reason_code>
                    // where
                    //     <retry_after> is a delay in ms
                    //     <categories> is the event type(s) (error, transaction, etc) being rate limited and is of the form
                    //         <category>;<category>;...
                    //     <scope> is what's being limited (org, project, or key) - ignored by SDK
                    //     <reason_code> is an arbitrary string like "org_quota" - ignored by SDK
                    for (var _c = __values(rlHeader.trim().split(',')), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var limit = _d.value;
                        var parameters = limit.split(':', 2);
                        var headerDelay = parseInt(parameters[0], 10);
                        var delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1000; // 60sec default
                        try {
                            for (var _e = (e_2 = void 0, __values(parameters[1].split(';'))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var category = _f.value;
                                this._rateLimits[category || 'all'] = new Date(now + delay);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return true;
            }
            else if (raHeader) {
                this._rateLimits.all = new Date(now + parseRetryAfterHeader(now, raHeader));
                return true;
            }
            return false;
        };
        return BaseTransport;
    }());

    /** `fetch` based transport */
    var FetchTransport = /** @class */ (function (_super) {
        __extends(FetchTransport, _super);
        function FetchTransport(options, fetchImpl) {
            if (fetchImpl === void 0) { fetchImpl = getNativeFetchImplementation(); }
            var _this = _super.call(this, options) || this;
            _this._fetch = fetchImpl;
            return _this;
        }
        /**
         * @inheritDoc
         */
        FetchTransport.prototype.sendEvent = function (event) {
            return this._sendRequest(eventToSentryRequest(event, this._api), event);
        };
        /**
         * @inheritDoc
         */
        FetchTransport.prototype.sendSession = function (session) {
            return this._sendRequest(sessionToSentryRequest(session, this._api), session);
        };
        /**
         * @param sentryRequest Prepared SentryRequest to be delivered
         * @param originalPayload Original payload used to create SentryRequest
         */
        FetchTransport.prototype._sendRequest = function (sentryRequest, originalPayload) {
            var _this = this;
            if (this._isRateLimited(sentryRequest.type)) {
                this.recordLostEvent(Outcome.RateLimitBackoff, sentryRequest.type);
                return Promise.reject({
                    event: originalPayload,
                    type: sentryRequest.type,
                    reason: "Transport for " + sentryRequest.type + " requests locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
                    status: 429,
                });
            }
            var options = {
                body: sentryRequest.body,
                method: 'POST',
                // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
                // https://caniuse.com/#feat=referrer-policy
                // It doesn't. And it throw exception instead of ignoring this parameter...
                // REF: https://github.com/getsentry/raven-js/issues/1233
                referrerPolicy: (supportsReferrerPolicy() ? 'origin' : ''),
            };
            if (this.options.fetchParameters !== undefined) {
                Object.assign(options, this.options.fetchParameters);
            }
            if (this.options.headers !== undefined) {
                options.headers = this.options.headers;
            }
            return this._buffer
                .add(function () {
                return new SyncPromise(function (resolve, reject) {
                    void _this._fetch(sentryRequest.url, options)
                        .then(function (response) {
                        var headers = {
                            'x-sentry-rate-limits': response.headers.get('X-Sentry-Rate-Limits'),
                            'retry-after': response.headers.get('Retry-After'),
                        };
                        _this._handleResponse({
                            requestType: sentryRequest.type,
                            response: response,
                            headers: headers,
                            resolve: resolve,
                            reject: reject,
                        });
                    })
                        .catch(reject);
                });
            })
                .then(undefined, function (reason) {
                // It's either buffer rejection or any other xhr/fetch error, which are treated as NetworkError.
                if (reason instanceof SentryError) {
                    _this.recordLostEvent(Outcome.QueueOverflow, sentryRequest.type);
                }
                else {
                    _this.recordLostEvent(Outcome.NetworkError, sentryRequest.type);
                }
                throw reason;
            });
        };
        return FetchTransport;
    }(BaseTransport));

    /** `XHR` based transport */
    var XHRTransport = /** @class */ (function (_super) {
        __extends(XHRTransport, _super);
        function XHRTransport() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        XHRTransport.prototype.sendEvent = function (event) {
            return this._sendRequest(eventToSentryRequest(event, this._api), event);
        };
        /**
         * @inheritDoc
         */
        XHRTransport.prototype.sendSession = function (session) {
            return this._sendRequest(sessionToSentryRequest(session, this._api), session);
        };
        /**
         * @param sentryRequest Prepared SentryRequest to be delivered
         * @param originalPayload Original payload used to create SentryRequest
         */
        XHRTransport.prototype._sendRequest = function (sentryRequest, originalPayload) {
            var _this = this;
            if (this._isRateLimited(sentryRequest.type)) {
                this.recordLostEvent(Outcome.RateLimitBackoff, sentryRequest.type);
                return Promise.reject({
                    event: originalPayload,
                    type: sentryRequest.type,
                    reason: "Transport for " + sentryRequest.type + " requests locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
                    status: 429,
                });
            }
            return this._buffer
                .add(function () {
                return new SyncPromise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            var headers = {
                                'x-sentry-rate-limits': request.getResponseHeader('X-Sentry-Rate-Limits'),
                                'retry-after': request.getResponseHeader('Retry-After'),
                            };
                            _this._handleResponse({ requestType: sentryRequest.type, response: request, headers: headers, resolve: resolve, reject: reject });
                        }
                    };
                    request.open('POST', sentryRequest.url);
                    for (var header in _this.options.headers) {
                        if (Object.prototype.hasOwnProperty.call(_this.options.headers, header)) {
                            request.setRequestHeader(header, _this.options.headers[header]);
                        }
                    }
                    request.send(sentryRequest.body);
                });
            })
                .then(undefined, function (reason) {
                // It's either buffer rejection or any other xhr/fetch error, which are treated as NetworkError.
                if (reason instanceof SentryError) {
                    _this.recordLostEvent(Outcome.QueueOverflow, sentryRequest.type);
                }
                else {
                    _this.recordLostEvent(Outcome.NetworkError, sentryRequest.type);
                }
                throw reason;
            });
        };
        return XHRTransport;
    }(BaseTransport));

    /**
     * The Sentry Browser SDK Backend.
     * @hidden
     */
    var BrowserBackend = /** @class */ (function (_super) {
        __extends(BrowserBackend, _super);
        function BrowserBackend() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.eventFromException = function (exception, hint) {
            return eventFromException(this._options, exception, hint);
        };
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
            if (level === void 0) { level = Severity.Info; }
            return eventFromMessage(this._options, message, level, hint);
        };
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype._setupTransport = function () {
            if (!this._options.dsn) {
                // We return the noop transport here in case there is no Dsn.
                return _super.prototype._setupTransport.call(this);
            }
            var transportOptions = __assign(__assign({}, this._options.transportOptions), { dsn: this._options.dsn, tunnel: this._options.tunnel, sendClientReports: this._options.sendClientReports, _metadata: this._options._metadata });
            if (this._options.transport) {
                return new this._options.transport(transportOptions);
            }
            if (supportsFetch()) {
                return new FetchTransport(transportOptions);
            }
            return new XHRTransport(transportOptions);
        };
        return BrowserBackend;
    }(BaseBackend));

    var global$5 = getGlobalObject();
    var ignoreOnError = 0;
    /**
     * @hidden
     */
    function shouldIgnoreOnError() {
        return ignoreOnError > 0;
    }
    /**
     * @hidden
     */
    function ignoreNextOnError() {
        // onerror should trigger before setTimeout
        ignoreOnError += 1;
        setTimeout(function () {
            ignoreOnError -= 1;
        });
    }
    /**
     * Instruments the given function and sends an event to Sentry every time the
     * function throws an exception.
     *
     * @param fn A function to wrap.
     * @returns The wrapped function.
     * @hidden
     */
    function wrap$2(fn, options, before) {
        if (options === void 0) { options = {}; }
        if (typeof fn !== 'function') {
            return fn;
        }
        try {
            // We don't wanna wrap it twice
            if (fn.__sentry__) {
                return fn;
            }
            // If this has already been wrapped in the past, return that wrapped function
            if (fn.__sentry_wrapped__) {
                return fn.__sentry_wrapped__;
            }
        }
        catch (e) {
            // Just accessing custom props in some Selenium environments
            // can cause a "Permission denied" exception (see raven-js#495).
            // Bail on wrapping and return the function as-is (defers to window.onerror).
            return fn;
        }
        /* eslint-disable prefer-rest-params */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var sentryWrapped = function () {
            var args = Array.prototype.slice.call(arguments);
            try {
                if (before && typeof before === 'function') {
                    before.apply(this, arguments);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                var wrappedArguments = args.map(function (arg) { return wrap$2(arg, options); });
                if (fn.handleEvent) {
                    // Attempt to invoke user-land function
                    // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
                    //       means the sentry.javascript SDK caught an error invoking your application code. This
                    //       is expected behavior and NOT indicative of a bug with sentry.javascript.
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    return fn.handleEvent.apply(this, wrappedArguments);
                }
                // Attempt to invoke user-land function
                // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
                //       means the sentry.javascript SDK caught an error invoking your application code. This
                //       is expected behavior and NOT indicative of a bug with sentry.javascript.
                return fn.apply(this, wrappedArguments);
            }
            catch (ex) {
                ignoreNextOnError();
                withScope(function (scope) {
                    scope.addEventProcessor(function (event) {
                        var processedEvent = __assign({}, event);
                        if (options.mechanism) {
                            addExceptionTypeValue(processedEvent, undefined, undefined);
                            addExceptionMechanism(processedEvent, options.mechanism);
                        }
                        processedEvent.extra = __assign(__assign({}, processedEvent.extra), { arguments: args });
                        return processedEvent;
                    });
                    captureException(ex);
                });
                throw ex;
            }
        };
        /* eslint-enable prefer-rest-params */
        // Accessing some objects may throw
        // ref: https://github.com/getsentry/sentry-javascript/issues/1168
        try {
            for (var property in fn) {
                if (Object.prototype.hasOwnProperty.call(fn, property)) {
                    sentryWrapped[property] = fn[property];
                }
            }
        }
        catch (_oO) { } // eslint-disable-line no-empty
        fn.prototype = fn.prototype || {};
        sentryWrapped.prototype = fn.prototype;
        Object.defineProperty(fn, '__sentry_wrapped__', {
            enumerable: false,
            value: sentryWrapped,
        });
        // Signal that this function has been wrapped/filled already
        // for both debugging and to prevent it to being wrapped/filled twice
        Object.defineProperties(sentryWrapped, {
            __sentry__: {
                enumerable: false,
                value: true,
            },
            __sentry_original__: {
                enumerable: false,
                value: fn,
            },
        });
        // Restore original function name (not all browsers allow that)
        try {
            var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
            if (descriptor.configurable) {
                Object.defineProperty(sentryWrapped, 'name', {
                    get: function () {
                        return fn.name;
                    },
                });
            }
            // eslint-disable-next-line no-empty
        }
        catch (_oO) { }
        return sentryWrapped;
    }
    /**
     * Injects the Report Dialog script
     * @hidden
     */
    function injectReportDialog(options) {
        if (options === void 0) { options = {}; }
        if (!global$5.document) {
            return;
        }
        if (!options.eventId) {
            logger.error("Missing eventId option in showReportDialog call");
            return;
        }
        if (!options.dsn) {
            logger.error("Missing dsn option in showReportDialog call");
            return;
        }
        var script = global$5.document.createElement('script');
        script.async = true;
        script.src = new API(options.dsn).getReportDialogEndpoint(options);
        if (options.onLoad) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            script.onload = options.onLoad;
        }
        var injectionPoint = global$5.document.head || global$5.document.body;
        if (injectionPoint) {
            injectionPoint.appendChild(script);
        }
    }

    /** Global handlers */
    var GlobalHandlers = /** @class */ (function () {
        /** JSDoc */
        function GlobalHandlers(options) {
            /**
             * @inheritDoc
             */
            this.name = GlobalHandlers.id;
            /** JSDoc */
            this._onErrorHandlerInstalled = false;
            /** JSDoc */
            this._onUnhandledRejectionHandlerInstalled = false;
            this._options = __assign({ onerror: true, onunhandledrejection: true }, options);
        }
        /**
         * @inheritDoc
         */
        GlobalHandlers.prototype.setupOnce = function () {
            Error.stackTraceLimit = 50;
            if (this._options.onerror) {
                logger.log('Global Handler attached: onerror');
                this._installGlobalOnErrorHandler();
            }
            if (this._options.onunhandledrejection) {
                logger.log('Global Handler attached: onunhandledrejection');
                this._installGlobalOnUnhandledRejectionHandler();
            }
        };
        /** JSDoc */
        GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
            var _this = this;
            if (this._onErrorHandlerInstalled) {
                return;
            }
            addInstrumentationHandler({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                callback: function (data) {
                    var error = data.error;
                    var currentHub = getCurrentHub();
                    var hasIntegration = currentHub.getIntegration(GlobalHandlers);
                    var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
                    if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
                        return;
                    }
                    var client = currentHub.getClient();
                    var event = error === undefined && isString(data.msg)
                        ? _this._eventFromIncompleteOnError(data.msg, data.url, data.line, data.column)
                        : _this._enhanceEventWithInitialFrame(eventFromUnknownInput(error || data.msg, undefined, {
                            attachStacktrace: client && client.getOptions().attachStacktrace,
                            rejection: false,
                        }), data.url, data.line, data.column);
                    addExceptionMechanism(event, {
                        handled: false,
                        type: 'onerror',
                    });
                    currentHub.captureEvent(event, {
                        originalException: error,
                    });
                },
                type: 'error',
            });
            this._onErrorHandlerInstalled = true;
        };
        /** JSDoc */
        GlobalHandlers.prototype._installGlobalOnUnhandledRejectionHandler = function () {
            var _this = this;
            if (this._onUnhandledRejectionHandlerInstalled) {
                return;
            }
            addInstrumentationHandler({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                callback: function (e) {
                    var error = e;
                    // dig the object of the rejection out of known event types
                    try {
                        // PromiseRejectionEvents store the object of the rejection under 'reason'
                        // see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
                        if ('reason' in e) {
                            error = e.reason;
                        }
                        // something, somewhere, (likely a browser extension) effectively casts PromiseRejectionEvents
                        // to CustomEvents, moving the `promise` and `reason` attributes of the PRE into
                        // the CustomEvent's `detail` attribute, since they're not part of CustomEvent's spec
                        // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent and
                        // https://github.com/getsentry/sentry-javascript/issues/2380
                        else if ('detail' in e && 'reason' in e.detail) {
                            error = e.detail.reason;
                        }
                    }
                    catch (_oO) {
                        // no-empty
                    }
                    var currentHub = getCurrentHub();
                    var hasIntegration = currentHub.getIntegration(GlobalHandlers);
                    var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
                    if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
                        return true;
                    }
                    var client = currentHub.getClient();
                    var event = isPrimitive(error)
                        ? _this._eventFromRejectionWithPrimitive(error)
                        : eventFromUnknownInput(error, undefined, {
                            attachStacktrace: client && client.getOptions().attachStacktrace,
                            rejection: true,
                        });
                    event.level = Severity.Error;
                    addExceptionMechanism(event, {
                        handled: false,
                        type: 'onunhandledrejection',
                    });
                    currentHub.captureEvent(event, {
                        originalException: error,
                    });
                    return;
                },
                type: 'unhandledrejection',
            });
            this._onUnhandledRejectionHandlerInstalled = true;
        };
        /**
         * This function creates a stack from an old, error-less onerror handler.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        GlobalHandlers.prototype._eventFromIncompleteOnError = function (msg, url, line, column) {
            var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
            // If 'message' is ErrorEvent, get real message from inside
            var message = isErrorEvent(msg) ? msg.message : msg;
            var name;
            var groups = message.match(ERROR_TYPES_RE);
            if (groups) {
                name = groups[1];
                message = groups[2];
            }
            var event = {
                exception: {
                    values: [
                        {
                            type: name || 'Error',
                            value: message,
                        },
                    ],
                },
            };
            return this._enhanceEventWithInitialFrame(event, url, line, column);
        };
        /**
         * Create an event from a promise rejection where the `reason` is a primitive.
         *
         * @param reason: The `reason` property of the promise rejection
         * @returns An Event object with an appropriate `exception` value
         */
        GlobalHandlers.prototype._eventFromRejectionWithPrimitive = function (reason) {
            return {
                exception: {
                    values: [
                        {
                            type: 'UnhandledRejection',
                            // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
                            value: "Non-Error promise rejection captured with value: " + String(reason),
                        },
                    ],
                },
            };
        };
        /** JSDoc */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        GlobalHandlers.prototype._enhanceEventWithInitialFrame = function (event, url, line, column) {
            event.exception = event.exception || {};
            event.exception.values = event.exception.values || [];
            event.exception.values[0] = event.exception.values[0] || {};
            event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {};
            event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];
            var colno = isNaN(parseInt(column, 10)) ? undefined : column;
            var lineno = isNaN(parseInt(line, 10)) ? undefined : line;
            var filename = isString(url) && url.length > 0 ? url : getLocationHref();
            if (event.exception.values[0].stacktrace.frames.length === 0) {
                event.exception.values[0].stacktrace.frames.push({
                    colno: colno,
                    filename: filename,
                    function: '?',
                    in_app: true,
                    lineno: lineno,
                });
            }
            return event;
        };
        /**
         * @inheritDoc
         */
        GlobalHandlers.id = 'GlobalHandlers';
        return GlobalHandlers;
    }());

    var DEFAULT_EVENT_TARGET = [
        'EventTarget',
        'Window',
        'Node',
        'ApplicationCache',
        'AudioTrackList',
        'ChannelMergerNode',
        'CryptoOperation',
        'EventSource',
        'FileReader',
        'HTMLUnknownElement',
        'IDBDatabase',
        'IDBRequest',
        'IDBTransaction',
        'KeyOperation',
        'MediaController',
        'MessagePort',
        'ModalWindow',
        'Notification',
        'SVGElementInstance',
        'Screen',
        'TextTrack',
        'TextTrackCue',
        'TextTrackList',
        'WebSocket',
        'WebSocketWorker',
        'Worker',
        'XMLHttpRequest',
        'XMLHttpRequestEventTarget',
        'XMLHttpRequestUpload',
    ];
    /** Wrap timer functions and event targets to catch errors and provide better meta data */
    var TryCatch = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function TryCatch(options) {
            /**
             * @inheritDoc
             */
            this.name = TryCatch.id;
            this._options = __assign({ XMLHttpRequest: true, eventTarget: true, requestAnimationFrame: true, setInterval: true, setTimeout: true }, options);
        }
        /**
         * Wrap timer functions and event targets to catch errors
         * and provide better metadata.
         */
        TryCatch.prototype.setupOnce = function () {
            var global = getGlobalObject();
            if (this._options.setTimeout) {
                fill(global, 'setTimeout', this._wrapTimeFunction.bind(this));
            }
            if (this._options.setInterval) {
                fill(global, 'setInterval', this._wrapTimeFunction.bind(this));
            }
            if (this._options.requestAnimationFrame) {
                fill(global, 'requestAnimationFrame', this._wrapRAF.bind(this));
            }
            if (this._options.XMLHttpRequest && 'XMLHttpRequest' in global) {
                fill(XMLHttpRequest.prototype, 'send', this._wrapXHR.bind(this));
            }
            if (this._options.eventTarget) {
                var eventTarget = Array.isArray(this._options.eventTarget) ? this._options.eventTarget : DEFAULT_EVENT_TARGET;
                eventTarget.forEach(this._wrapEventTarget.bind(this));
            }
        };
        /** JSDoc */
        TryCatch.prototype._wrapTimeFunction = function (original) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var originalCallback = args[0];
                args[0] = wrap$2(originalCallback, {
                    mechanism: {
                        data: { function: getFunctionName(original) },
                        handled: true,
                        type: 'instrument',
                    },
                });
                return original.apply(this, args);
            };
        };
        /** JSDoc */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        TryCatch.prototype._wrapRAF = function (original) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return function (callback) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return original.call(this, wrap$2(callback, {
                    mechanism: {
                        data: {
                            function: 'requestAnimationFrame',
                            handler: getFunctionName(original),
                        },
                        handled: true,
                        type: 'instrument',
                    },
                }));
            };
        };
        /** JSDoc */
        TryCatch.prototype._wrapEventTarget = function (target) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var global = getGlobalObject();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            var proto = global[target] && global[target].prototype;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
            if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
                return;
            }
            fill(proto, 'addEventListener', function (original) {
                return function (eventName, fn, options) {
                    try {
                        if (typeof fn.handleEvent === 'function') {
                            fn.handleEvent = wrap$2(fn.handleEvent.bind(fn), {
                                mechanism: {
                                    data: {
                                        function: 'handleEvent',
                                        handler: getFunctionName(fn),
                                        target: target,
                                    },
                                    handled: true,
                                    type: 'instrument',
                                },
                            });
                        }
                    }
                    catch (err) {
                        // can sometimes get 'Permission denied to access property "handle Event'
                    }
                    return original.call(this, eventName, 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    wrap$2(fn, {
                        mechanism: {
                            data: {
                                function: 'addEventListener',
                                handler: getFunctionName(fn),
                                target: target,
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    }), options);
                };
            });
            fill(proto, 'removeEventListener', function (originalRemoveEventListener) {
                return function (eventName, fn, options) {
                    var _a;
                    /**
                     * There are 2 possible scenarios here:
                     *
                     * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
                     * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
                     * as a pass-through, and call original `removeEventListener` with it.
                     *
                     * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
                     * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
                     * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
                     * in order for us to make a distinction between wrapped/non-wrapped functions possible.
                     * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
                     *
                     * When someone adds a handler prior to initialization, and then do it again, but after,
                     * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
                     * to get rid of the initial handler and it'd stick there forever.
                     */
                    var wrappedEventHandler = fn;
                    try {
                        var originalEventHandler = (_a = wrappedEventHandler) === null || _a === void 0 ? void 0 : _a.__sentry_wrapped__;
                        if (originalEventHandler) {
                            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
                        }
                    }
                    catch (e) {
                        // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                    }
                    return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
                };
            });
        };
        /** JSDoc */
        TryCatch.prototype._wrapXHR = function (originalSend) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var xhr = this;
                var xmlHttpRequestProps = ['onload', 'onerror', 'onprogress', 'onreadystatechange'];
                xmlHttpRequestProps.forEach(function (prop) {
                    if (prop in xhr && typeof xhr[prop] === 'function') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        fill(xhr, prop, function (original) {
                            var wrapOptions = {
                                mechanism: {
                                    data: {
                                        function: prop,
                                        handler: getFunctionName(original),
                                    },
                                    handled: true,
                                    type: 'instrument',
                                },
                            };
                            // If Instrument integration has been called before TryCatch, get the name of original function
                            if (original.__sentry_original__) {
                                wrapOptions.mechanism.data.handler = getFunctionName(original.__sentry_original__);
                            }
                            // Otherwise wrap directly
                            return wrap$2(original, wrapOptions);
                        });
                    }
                });
                return originalSend.apply(this, args);
            };
        };
        /**
         * @inheritDoc
         */
        TryCatch.id = 'TryCatch';
        return TryCatch;
    }());

    /**
     * Default Breadcrumbs instrumentations
     * TODO: Deprecated - with v6, this will be renamed to `Instrument`
     */
    var Breadcrumbs = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Breadcrumbs(options) {
            /**
             * @inheritDoc
             */
            this.name = Breadcrumbs.id;
            this._options = __assign({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
        }
        /**
         * Create a breadcrumb of `sentry` from the events themselves
         */
        Breadcrumbs.prototype.addSentryBreadcrumb = function (event) {
            if (!this._options.sentry) {
                return;
            }
            getCurrentHub().addBreadcrumb({
                category: "sentry." + (event.type === 'transaction' ? 'transaction' : 'event'),
                event_id: event.event_id,
                level: event.level,
                message: getEventDescription(event),
            }, {
                event: event,
            });
        };
        /**
         * Instrument browser built-ins w/ breadcrumb capturing
         *  - Console API
         *  - DOM API (click/typing)
         *  - XMLHttpRequest API
         *  - Fetch API
         *  - History API
         */
        Breadcrumbs.prototype.setupOnce = function () {
            var _this = this;
            if (this._options.console) {
                addInstrumentationHandler({
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this._consoleBreadcrumb.apply(_this, __spread(args));
                    },
                    type: 'console',
                });
            }
            if (this._options.dom) {
                addInstrumentationHandler({
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this._domBreadcrumb.apply(_this, __spread(args));
                    },
                    type: 'dom',
                });
            }
            if (this._options.xhr) {
                addInstrumentationHandler({
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this._xhrBreadcrumb.apply(_this, __spread(args));
                    },
                    type: 'xhr',
                });
            }
            if (this._options.fetch) {
                addInstrumentationHandler({
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this._fetchBreadcrumb.apply(_this, __spread(args));
                    },
                    type: 'fetch',
                });
            }
            if (this._options.history) {
                addInstrumentationHandler({
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this._historyBreadcrumb.apply(_this, __spread(args));
                    },
                    type: 'history',
                });
            }
        };
        /**
         * Creates breadcrumbs from console API calls
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Breadcrumbs.prototype._consoleBreadcrumb = function (handlerData) {
            var breadcrumb = {
                category: 'console',
                data: {
                    arguments: handlerData.args,
                    logger: 'console',
                },
                level: Severity.fromString(handlerData.level),
                message: safeJoin(handlerData.args, ' '),
            };
            if (handlerData.level === 'assert') {
                if (handlerData.args[0] === false) {
                    breadcrumb.message = "Assertion failed: " + (safeJoin(handlerData.args.slice(1), ' ') || 'console.assert');
                    breadcrumb.data.arguments = handlerData.args.slice(1);
                }
                else {
                    // Don't capture a breadcrumb for passed assertions
                    return;
                }
            }
            getCurrentHub().addBreadcrumb(breadcrumb, {
                input: handlerData.args,
                level: handlerData.level,
            });
        };
        /**
         * Creates breadcrumbs from DOM API calls
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Breadcrumbs.prototype._domBreadcrumb = function (handlerData) {
            var target;
            var keyAttrs = typeof this._options.dom === 'object' ? this._options.dom.serializeAttribute : undefined;
            if (typeof keyAttrs === 'string') {
                keyAttrs = [keyAttrs];
            }
            // Accessing event.target can throw (see getsentry/raven-js#838, #768)
            try {
                target = handlerData.event.target
                    ? htmlTreeAsString(handlerData.event.target, keyAttrs)
                    : htmlTreeAsString(handlerData.event, keyAttrs);
            }
            catch (e) {
                target = '<unknown>';
            }
            if (target.length === 0) {
                return;
            }
            getCurrentHub().addBreadcrumb({
                category: "ui." + handlerData.name,
                message: target,
            }, {
                event: handlerData.event,
                name: handlerData.name,
                global: handlerData.global,
            });
        };
        /**
         * Creates breadcrumbs from XHR API calls
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Breadcrumbs.prototype._xhrBreadcrumb = function (handlerData) {
            if (handlerData.endTimestamp) {
                // We only capture complete, non-sentry requests
                if (handlerData.xhr.__sentry_own_request__) {
                    return;
                }
                var _a = handlerData.xhr.__sentry_xhr__ || {}, method = _a.method, url = _a.url, status_code = _a.status_code, body = _a.body;
                getCurrentHub().addBreadcrumb({
                    category: 'xhr',
                    data: {
                        method: method,
                        url: url,
                        status_code: status_code,
                    },
                    type: 'http',
                }, {
                    xhr: handlerData.xhr,
                    input: body,
                });
                return;
            }
        };
        /**
         * Creates breadcrumbs from fetch API calls
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Breadcrumbs.prototype._fetchBreadcrumb = function (handlerData) {
            // We only capture complete fetch requests
            if (!handlerData.endTimestamp) {
                return;
            }
            if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
                // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
                return;
            }
            if (handlerData.error) {
                getCurrentHub().addBreadcrumb({
                    category: 'fetch',
                    data: handlerData.fetchData,
                    level: Severity.Error,
                    type: 'http',
                }, {
                    data: handlerData.error,
                    input: handlerData.args,
                });
            }
            else {
                getCurrentHub().addBreadcrumb({
                    category: 'fetch',
                    data: __assign(__assign({}, handlerData.fetchData), { status_code: handlerData.response.status }),
                    type: 'http',
                }, {
                    input: handlerData.args,
                    response: handlerData.response,
                });
            }
        };
        /**
         * Creates breadcrumbs from history API calls
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Breadcrumbs.prototype._historyBreadcrumb = function (handlerData) {
            var global = getGlobalObject();
            var from = handlerData.from;
            var to = handlerData.to;
            var parsedLoc = parseUrl(global.location.href);
            var parsedFrom = parseUrl(from);
            var parsedTo = parseUrl(to);
            // Initial pushState doesn't provide `from` information
            if (!parsedFrom.path) {
                parsedFrom = parsedLoc;
            }
            // Use only the path component of the URL if the URL matches the current
            // document (almost all the time when using pushState)
            if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
                to = parsedTo.relative;
            }
            if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
                from = parsedFrom.relative;
            }
            getCurrentHub().addBreadcrumb({
                category: 'navigation',
                data: {
                    from: from,
                    to: to,
                },
            });
        };
        /**
         * @inheritDoc
         */
        Breadcrumbs.id = 'Breadcrumbs';
        return Breadcrumbs;
    }());

    var DEFAULT_KEY = 'cause';
    var DEFAULT_LIMIT = 5;
    /** Adds SDK info to an event. */
    var LinkedErrors = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function LinkedErrors(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = LinkedErrors.id;
            this._key = options.key || DEFAULT_KEY;
            this._limit = options.limit || DEFAULT_LIMIT;
        }
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype.setupOnce = function () {
            addGlobalEventProcessor(function (event, hint) {
                var self = getCurrentHub().getIntegration(LinkedErrors);
                if (self) {
                    var handler = self._handler && self._handler.bind(self);
                    return typeof handler === 'function' ? handler(event, hint) : event;
                }
                return event;
            });
        };
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype._handler = function (event, hint) {
            if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
                return event;
            }
            var linkedErrors = this._walkErrorTree(hint.originalException, this._key);
            event.exception.values = __spread(linkedErrors, event.exception.values);
            return event;
        };
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype._walkErrorTree = function (error, key, stack) {
            if (stack === void 0) { stack = []; }
            if (!isInstanceOf(error[key], Error) || stack.length + 1 >= this._limit) {
                return stack;
            }
            var stacktrace = computeStackTrace(error[key]);
            var exception = exceptionFromStacktrace(stacktrace);
            return this._walkErrorTree(error[key], key, __spread([exception], stack));
        };
        /**
         * @inheritDoc
         */
        LinkedErrors.id = 'LinkedErrors';
        return LinkedErrors;
    }());

    var global$4 = getGlobalObject();
    /** UserAgent */
    var UserAgent = /** @class */ (function () {
        function UserAgent() {
            /**
             * @inheritDoc
             */
            this.name = UserAgent.id;
        }
        /**
         * @inheritDoc
         */
        UserAgent.prototype.setupOnce = function () {
            addGlobalEventProcessor(function (event) {
                var _a, _b, _c;
                if (getCurrentHub().getIntegration(UserAgent)) {
                    // if none of the information we want exists, don't bother
                    if (!global$4.navigator && !global$4.location && !global$4.document) {
                        return event;
                    }
                    // grab as much info as exists and add it to the event
                    var url = ((_a = event.request) === null || _a === void 0 ? void 0 : _a.url) || ((_b = global$4.location) === null || _b === void 0 ? void 0 : _b.href);
                    var referrer = (global$4.document || {}).referrer;
                    var userAgent = (global$4.navigator || {}).userAgent;
                    var headers = __assign(__assign(__assign({}, (_c = event.request) === null || _c === void 0 ? void 0 : _c.headers), (referrer && { Referer: referrer })), (userAgent && { 'User-Agent': userAgent }));
                    var request = __assign(__assign({}, (url && { url: url })), { headers: headers });
                    return __assign(__assign({}, event), { request: request });
                }
                return event;
            });
        };
        /**
         * @inheritDoc
         */
        UserAgent.id = 'UserAgent';
        return UserAgent;
    }());

    /** Deduplication filter */
    var Dedupe = /** @class */ (function () {
        function Dedupe() {
            /**
             * @inheritDoc
             */
            this.name = Dedupe.id;
        }
        /**
         * @inheritDoc
         */
        Dedupe.prototype.setupOnce = function (addGlobalEventProcessor, getCurrentHub) {
            addGlobalEventProcessor(function (currentEvent) {
                var self = getCurrentHub().getIntegration(Dedupe);
                if (self) {
                    // Juuust in case something goes wrong
                    try {
                        if (self._shouldDropEvent(currentEvent, self._previousEvent)) {
                            logger.warn("Event dropped due to being a duplicate of previously captured event.");
                            return null;
                        }
                    }
                    catch (_oO) {
                        return (self._previousEvent = currentEvent);
                    }
                    return (self._previousEvent = currentEvent);
                }
                return currentEvent;
            });
        };
        /** JSDoc */
        Dedupe.prototype._shouldDropEvent = function (currentEvent, previousEvent) {
            if (!previousEvent) {
                return false;
            }
            if (this._isSameMessageEvent(currentEvent, previousEvent)) {
                return true;
            }
            if (this._isSameExceptionEvent(currentEvent, previousEvent)) {
                return true;
            }
            return false;
        };
        /** JSDoc */
        Dedupe.prototype._isSameMessageEvent = function (currentEvent, previousEvent) {
            var currentMessage = currentEvent.message;
            var previousMessage = previousEvent.message;
            // If neither event has a message property, they were both exceptions, so bail out
            if (!currentMessage && !previousMessage) {
                return false;
            }
            // If only one event has a stacktrace, but not the other one, they are not the same
            if ((currentMessage && !previousMessage) || (!currentMessage && previousMessage)) {
                return false;
            }
            if (currentMessage !== previousMessage) {
                return false;
            }
            if (!this._isSameFingerprint(currentEvent, previousEvent)) {
                return false;
            }
            if (!this._isSameStacktrace(currentEvent, previousEvent)) {
                return false;
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype._getFramesFromEvent = function (event) {
            var exception = event.exception;
            if (exception) {
                try {
                    // @ts-ignore Object could be undefined
                    return exception.values[0].stacktrace.frames;
                }
                catch (_oO) {
                    return undefined;
                }
            }
            else if (event.stacktrace) {
                return event.stacktrace.frames;
            }
            return undefined;
        };
        /** JSDoc */
        Dedupe.prototype._isSameStacktrace = function (currentEvent, previousEvent) {
            var currentFrames = this._getFramesFromEvent(currentEvent);
            var previousFrames = this._getFramesFromEvent(previousEvent);
            // If neither event has a stacktrace, they are assumed to be the same
            if (!currentFrames && !previousFrames) {
                return true;
            }
            // If only one event has a stacktrace, but not the other one, they are not the same
            if ((currentFrames && !previousFrames) || (!currentFrames && previousFrames)) {
                return false;
            }
            currentFrames = currentFrames;
            previousFrames = previousFrames;
            // If number of frames differ, they are not the same
            if (previousFrames.length !== currentFrames.length) {
                return false;
            }
            // Otherwise, compare the two
            for (var i = 0; i < previousFrames.length; i++) {
                var frameA = previousFrames[i];
                var frameB = currentFrames[i];
                if (frameA.filename !== frameB.filename ||
                    frameA.lineno !== frameB.lineno ||
                    frameA.colno !== frameB.colno ||
                    frameA.function !== frameB.function) {
                    return false;
                }
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype._getExceptionFromEvent = function (event) {
            return event.exception && event.exception.values && event.exception.values[0];
        };
        /** JSDoc */
        Dedupe.prototype._isSameExceptionEvent = function (currentEvent, previousEvent) {
            var previousException = this._getExceptionFromEvent(previousEvent);
            var currentException = this._getExceptionFromEvent(currentEvent);
            if (!previousException || !currentException) {
                return false;
            }
            if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
                return false;
            }
            if (!this._isSameFingerprint(currentEvent, previousEvent)) {
                return false;
            }
            if (!this._isSameStacktrace(currentEvent, previousEvent)) {
                return false;
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype._isSameFingerprint = function (currentEvent, previousEvent) {
            var currentFingerprint = currentEvent.fingerprint;
            var previousFingerprint = previousEvent.fingerprint;
            // If neither event has a fingerprint, they are assumed to be the same
            if (!currentFingerprint && !previousFingerprint) {
                return true;
            }
            // If only one event has a fingerprint, but not the other one, they are not the same
            if ((currentFingerprint && !previousFingerprint) || (!currentFingerprint && previousFingerprint)) {
                return false;
            }
            currentFingerprint = currentFingerprint;
            previousFingerprint = previousFingerprint;
            // Otherwise, compare the two
            try {
                return !!(currentFingerprint.join('') === previousFingerprint.join(''));
            }
            catch (_oO) {
                return false;
            }
        };
        /**
         * @inheritDoc
         */
        Dedupe.id = 'Dedupe';
        return Dedupe;
    }());

    /**
     * The Sentry Browser SDK Client.
     *
     * @see BrowserOptions for documentation on configuration options.
     * @see SentryClient for usage documentation.
     */
    var BrowserClient = /** @class */ (function (_super) {
        __extends(BrowserClient, _super);
        /**
         * Creates a new Browser SDK instance.
         *
         * @param options Configuration options for this SDK.
         */
        function BrowserClient(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            options._metadata = options._metadata || {};
            options._metadata.sdk = options._metadata.sdk || {
                name: 'sentry.javascript.browser',
                packages: [
                    {
                        name: 'npm:@sentry/browser',
                        version: SDK_VERSION,
                    },
                ],
                version: SDK_VERSION,
            };
            _this = _super.call(this, BrowserBackend, options) || this;
            return _this;
        }
        /**
         * Show a report dialog to the user to send feedback to a specific event.
         *
         * @param options Set individual options for the dialog
         */
        BrowserClient.prototype.showReportDialog = function (options) {
            if (options === void 0) { options = {}; }
            // doesn't work without a document (React Native)
            var document = getGlobalObject().document;
            if (!document) {
                return;
            }
            if (!this._isEnabled()) {
                logger.error('Trying to call showReportDialog with Sentry Client disabled');
                return;
            }
            injectReportDialog(__assign(__assign({}, options), { dsn: options.dsn || this.getDsn() }));
        };
        /**
         * @inheritDoc
         */
        BrowserClient.prototype._prepareEvent = function (event, scope, hint) {
            event.platform = event.platform || 'javascript';
            return _super.prototype._prepareEvent.call(this, event, scope, hint);
        };
        /**
         * @inheritDoc
         */
        BrowserClient.prototype._sendEvent = function (event) {
            var integration = this.getIntegration(Breadcrumbs);
            if (integration) {
                integration.addSentryBreadcrumb(event);
            }
            _super.prototype._sendEvent.call(this, event);
        };
        return BrowserClient;
    }(BaseClient));

    var defaultIntegrations = [
        new InboundFilters(),
        new FunctionToString(),
        new TryCatch(),
        new Breadcrumbs(),
        new GlobalHandlers(),
        new LinkedErrors(),
        new Dedupe(),
        new UserAgent(),
    ];
    /**
     * The Sentry Browser SDK Client.
     *
     * To use this SDK, call the {@link init} function as early as possible when
     * loading the web page. To set context information or send manual events, use
     * the provided methods.
     *
     * @example
     *
     * ```
     *
     * import { init } from '@sentry/browser';
     *
     * init({
     *   dsn: '__DSN__',
     *   // ...
     * });
     * ```
     *
     * @example
     * ```
     *
     * import { configureScope } from '@sentry/browser';
     * configureScope((scope: Scope) => {
     *   scope.setExtra({ battery: 0.7 });
     *   scope.setTag({ user_mode: 'admin' });
     *   scope.setUser({ id: '4711' });
     * });
     * ```
     *
     * @example
     * ```
     *
     * import { addBreadcrumb } from '@sentry/browser';
     * addBreadcrumb({
     *   message: 'My Breadcrumb',
     *   // ...
     * });
     * ```
     *
     * @example
     *
     * ```
     *
     * import * as Sentry from '@sentry/browser';
     * Sentry.captureMessage('Hello, world!');
     * Sentry.captureException(new Error('Good bye'));
     * Sentry.captureEvent({
     *   message: 'Manual',
     *   stacktrace: [
     *     // ...
     *   ],
     * });
     * ```
     *
     * @see {@link BrowserOptions} for documentation on configuration options.
     */
    function init$1(options) {
        if (options === void 0) { options = {}; }
        if (options.defaultIntegrations === undefined) {
            options.defaultIntegrations = defaultIntegrations;
        }
        if (options.release === undefined) {
            var window_1 = getGlobalObject();
            // This supports the variable that sentry-webpack-plugin injects
            if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
                options.release = window_1.SENTRY_RELEASE.id;
            }
        }
        if (options.autoSessionTracking === undefined) {
            options.autoSessionTracking = true;
        }
        if (options.sendClientReports === undefined) {
            options.sendClientReports = true;
        }
        initAndBind(BrowserClient, options);
        if (options.autoSessionTracking) {
            startSessionTracking();
        }
    }
    /**
     * Enable automatic Session Tracking for the initial page load.
     */
    function startSessionTracking() {
        var window = getGlobalObject();
        var document = window.document;
        if (typeof document === 'undefined') {
            logger.warn('Session tracking in non-browser environment with @sentry/browser is not supported.');
            return;
        }
        var hub = getCurrentHub();
        // The only way for this to be false is for there to be a version mismatch between @sentry/browser (>= 6.0.0) and
        // @sentry/hub (< 5.27.0). In the simple case, there won't ever be such a mismatch, because the two packages are
        // pinned at the same version in package.json, but there are edge cases where it's possible. See
        // https://github.com/getsentry/sentry-javascript/issues/3207 and
        // https://github.com/getsentry/sentry-javascript/issues/3234 and
        // https://github.com/getsentry/sentry-javascript/issues/3278.
        if (typeof hub.startSession !== 'function' || typeof hub.captureSession !== 'function') {
            return;
        }
        // The session duration for browser sessions does not track a meaningful
        // concept that can be used as a metric.
        // Automatically captured sessions are akin to page views, and thus we
        // discard their duration.
        hub.startSession({ ignoreDuration: true });
        hub.captureSession();
        // We want to create a session for every navigation as well
        addInstrumentationHandler({
            callback: function (_a) {
                var from = _a.from, to = _a.to;
                // Don't create an additional session for the initial route or if the location did not change
                if (from === undefined || from === to) {
                    return;
                }
                hub.startSession({ ignoreDuration: true });
                hub.captureSession();
            },
            type: 'history',
        });
    }

    /** The status of an Span. */
    // eslint-disable-next-line import/export
    var SpanStatus;
    (function (SpanStatus) {
        /** The operation completed successfully. */
        SpanStatus["Ok"] = "ok";
        /** Deadline expired before operation could complete. */
        SpanStatus["DeadlineExceeded"] = "deadline_exceeded";
        /** 401 Unauthorized (actually does mean unauthenticated according to RFC 7235) */
        SpanStatus["Unauthenticated"] = "unauthenticated";
        /** 403 Forbidden */
        SpanStatus["PermissionDenied"] = "permission_denied";
        /** 404 Not Found. Some requested entity (file or directory) was not found. */
        SpanStatus["NotFound"] = "not_found";
        /** 429 Too Many Requests */
        SpanStatus["ResourceExhausted"] = "resource_exhausted";
        /** Client specified an invalid argument. 4xx. */
        SpanStatus["InvalidArgument"] = "invalid_argument";
        /** 501 Not Implemented */
        SpanStatus["Unimplemented"] = "unimplemented";
        /** 503 Service Unavailable */
        SpanStatus["Unavailable"] = "unavailable";
        /** Other/generic 5xx. */
        SpanStatus["InternalError"] = "internal_error";
        /** Unknown. Any non-standard HTTP status code. */
        SpanStatus["UnknownError"] = "unknown_error";
        /** The operation was cancelled (typically by the user). */
        SpanStatus["Cancelled"] = "cancelled";
        /** Already exists (409) */
        SpanStatus["AlreadyExists"] = "already_exists";
        /** Operation was rejected because the system is not in a state required for the operation's */
        SpanStatus["FailedPrecondition"] = "failed_precondition";
        /** The operation was aborted, typically due to a concurrency issue. */
        SpanStatus["Aborted"] = "aborted";
        /** Operation was attempted past the valid range. */
        SpanStatus["OutOfRange"] = "out_of_range";
        /** Unrecoverable data loss or corruption */
        SpanStatus["DataLoss"] = "data_loss";
    })(SpanStatus || (SpanStatus = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace, import/export
    (function (SpanStatus) {
        /**
         * Converts a HTTP status code into a {@link SpanStatus}.
         *
         * @param httpStatus The HTTP response status code.
         * @returns The span status or {@link SpanStatus.UnknownError}.
         */
        function fromHttpCode(httpStatus) {
            if (httpStatus < 400) {
                return SpanStatus.Ok;
            }
            if (httpStatus >= 400 && httpStatus < 500) {
                switch (httpStatus) {
                    case 401:
                        return SpanStatus.Unauthenticated;
                    case 403:
                        return SpanStatus.PermissionDenied;
                    case 404:
                        return SpanStatus.NotFound;
                    case 409:
                        return SpanStatus.AlreadyExists;
                    case 413:
                        return SpanStatus.FailedPrecondition;
                    case 429:
                        return SpanStatus.ResourceExhausted;
                    default:
                        return SpanStatus.InvalidArgument;
                }
            }
            if (httpStatus >= 500 && httpStatus < 600) {
                switch (httpStatus) {
                    case 501:
                        return SpanStatus.Unimplemented;
                    case 503:
                        return SpanStatus.Unavailable;
                    case 504:
                        return SpanStatus.DeadlineExceeded;
                    default:
                        return SpanStatus.InternalError;
                }
            }
            return SpanStatus.UnknownError;
        }
        SpanStatus.fromHttpCode = fromHttpCode;
    })(SpanStatus || (SpanStatus = {}));

    var TRACEPARENT_REGEXP = new RegExp('^[ \\t]*' + // whitespace
        '([0-9a-f]{32})?' + // trace_id
        '-?([0-9a-f]{16})?' + // span_id
        '-?([01])?' + // sampled
        '[ \\t]*$');
    /**
     * Determines if tracing is currently enabled.
     *
     * Tracing is enabled when at least one of `tracesSampleRate` and `tracesSampler` is defined in the SDK config.
     */
    function hasTracingEnabled(options) {
        if (options === void 0) { options = (_a = getCurrentHub()
            .getClient()) === null || _a === void 0 ? void 0 : _a.getOptions(); }
        var _a;
        if (!options) {
            return false;
        }
        return 'tracesSampleRate' in options || 'tracesSampler' in options;
    }
    /**
     * Extract transaction context data from a `sentry-trace` header.
     *
     * @param traceparent Traceparent string
     *
     * @returns Object containing data from the header, or undefined if traceparent string is malformed
     */
    function extractTraceparentData(traceparent) {
        var matches = traceparent.match(TRACEPARENT_REGEXP);
        if (matches) {
            var parentSampled = void 0;
            if (matches[3] === '1') {
                parentSampled = true;
            }
            else if (matches[3] === '0') {
                parentSampled = false;
            }
            return {
                traceId: matches[1],
                parentSampled: parentSampled,
                parentSpanId: matches[2],
            };
        }
        return undefined;
    }
    /** Grabs active transaction off scope, if any */
    function getActiveTransaction(hub) {
        if (hub === void 0) { hub = getCurrentHub(); }
        var _a, _b;
        return (_b = (_a = hub) === null || _a === void 0 ? void 0 : _a.getScope()) === null || _b === void 0 ? void 0 : _b.getTransaction();
    }
    /**
     * Converts from milliseconds to seconds
     * @param time time in ms
     */
    function msToSec(time) {
        return time / 1000;
    }
    /**
     * Converts from seconds to milliseconds
     * @param time time in seconds
     */
    function secToMs(time) {
        return time * 1000;
    }

    /**
     * Configures global error listeners
     */
    function registerErrorInstrumentation() {
        addInstrumentationHandler({
            callback: errorCallback,
            type: 'error',
        });
        addInstrumentationHandler({
            callback: errorCallback,
            type: 'unhandledrejection',
        });
    }
    /**
     * If an error or unhandled promise occurs, we mark the active transaction as failed
     */
    function errorCallback() {
        var activeTransaction = getActiveTransaction();
        if (activeTransaction) {
            logger.log("[Tracing] Transaction: " + SpanStatus.InternalError + " -> Global error occured");
            activeTransaction.setStatus(SpanStatus.InternalError);
        }
    }

    /**
     * Keeps track of finished spans for a given transaction
     * @internal
     * @hideconstructor
     * @hidden
     */
    var SpanRecorder = /** @class */ (function () {
        function SpanRecorder(maxlen) {
            if (maxlen === void 0) { maxlen = 1000; }
            this.spans = [];
            this._maxlen = maxlen;
        }
        /**
         * This is just so that we don't run out of memory while recording a lot
         * of spans. At some point we just stop and flush out the start of the
         * trace tree (i.e.the first n spans with the smallest
         * start_timestamp).
         */
        SpanRecorder.prototype.add = function (span) {
            if (this.spans.length > this._maxlen) {
                span.spanRecorder = undefined;
            }
            else {
                this.spans.push(span);
            }
        };
        return SpanRecorder;
    }());
    /**
     * Span contains all data about a span
     */
    var Span = /** @class */ (function () {
        /**
         * You should never call the constructor manually, always use `Sentry.startTransaction()`
         * or call `startChild()` on an existing span.
         * @internal
         * @hideconstructor
         * @hidden
         */
        function Span(spanContext) {
            /**
             * @inheritDoc
             */
            this.traceId = uuid4();
            /**
             * @inheritDoc
             */
            this.spanId = uuid4().substring(16);
            /**
             * Timestamp in seconds when the span was created.
             */
            this.startTimestamp = timestampWithMs();
            /**
             * @inheritDoc
             */
            this.tags = {};
            /**
             * @inheritDoc
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.data = {};
            if (!spanContext) {
                return this;
            }
            if (spanContext.traceId) {
                this.traceId = spanContext.traceId;
            }
            if (spanContext.spanId) {
                this.spanId = spanContext.spanId;
            }
            if (spanContext.parentSpanId) {
                this.parentSpanId = spanContext.parentSpanId;
            }
            // We want to include booleans as well here
            if ('sampled' in spanContext) {
                this.sampled = spanContext.sampled;
            }
            if (spanContext.op) {
                this.op = spanContext.op;
            }
            if (spanContext.description) {
                this.description = spanContext.description;
            }
            if (spanContext.data) {
                this.data = spanContext.data;
            }
            if (spanContext.tags) {
                this.tags = spanContext.tags;
            }
            if (spanContext.status) {
                this.status = spanContext.status;
            }
            if (spanContext.startTimestamp) {
                this.startTimestamp = spanContext.startTimestamp;
            }
            if (spanContext.endTimestamp) {
                this.endTimestamp = spanContext.endTimestamp;
            }
        }
        /**
         * @inheritDoc
         * @deprecated
         */
        Span.prototype.child = function (spanContext) {
            return this.startChild(spanContext);
        };
        /**
         * @inheritDoc
         */
        Span.prototype.startChild = function (spanContext) {
            var childSpan = new Span(__assign(__assign({}, spanContext), { parentSpanId: this.spanId, sampled: this.sampled, traceId: this.traceId }));
            childSpan.spanRecorder = this.spanRecorder;
            if (childSpan.spanRecorder) {
                childSpan.spanRecorder.add(childSpan);
            }
            childSpan.transaction = this.transaction;
            return childSpan;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.setTag = function (key, value) {
            var _a;
            this.tags = __assign(__assign({}, this.tags), (_a = {}, _a[key] = value, _a));
            return this;
        };
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        Span.prototype.setData = function (key, value) {
            var _a;
            this.data = __assign(__assign({}, this.data), (_a = {}, _a[key] = value, _a));
            return this;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.setStatus = function (value) {
            this.status = value;
            return this;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.setHttpStatus = function (httpStatus) {
            this.setTag('http.status_code', String(httpStatus));
            var spanStatus = SpanStatus.fromHttpCode(httpStatus);
            if (spanStatus !== SpanStatus.UnknownError) {
                this.setStatus(spanStatus);
            }
            return this;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.isSuccess = function () {
            return this.status === SpanStatus.Ok;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.finish = function (endTimestamp) {
            this.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
        };
        /**
         * @inheritDoc
         */
        Span.prototype.toTraceparent = function () {
            var sampledString = '';
            if (this.sampled !== undefined) {
                sampledString = this.sampled ? '-1' : '-0';
            }
            return this.traceId + "-" + this.spanId + sampledString;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.toContext = function () {
            return dropUndefinedKeys({
                data: this.data,
                description: this.description,
                endTimestamp: this.endTimestamp,
                op: this.op,
                parentSpanId: this.parentSpanId,
                sampled: this.sampled,
                spanId: this.spanId,
                startTimestamp: this.startTimestamp,
                status: this.status,
                tags: this.tags,
                traceId: this.traceId,
            });
        };
        /**
         * @inheritDoc
         */
        Span.prototype.updateWithContext = function (spanContext) {
            var _a, _b, _c, _d, _e;
            this.data = (_a = spanContext.data, (_a !== null && _a !== void 0 ? _a : {}));
            this.description = spanContext.description;
            this.endTimestamp = spanContext.endTimestamp;
            this.op = spanContext.op;
            this.parentSpanId = spanContext.parentSpanId;
            this.sampled = spanContext.sampled;
            this.spanId = (_b = spanContext.spanId, (_b !== null && _b !== void 0 ? _b : this.spanId));
            this.startTimestamp = (_c = spanContext.startTimestamp, (_c !== null && _c !== void 0 ? _c : this.startTimestamp));
            this.status = spanContext.status;
            this.tags = (_d = spanContext.tags, (_d !== null && _d !== void 0 ? _d : {}));
            this.traceId = (_e = spanContext.traceId, (_e !== null && _e !== void 0 ? _e : this.traceId));
            return this;
        };
        /**
         * @inheritDoc
         */
        Span.prototype.getTraceContext = function () {
            return dropUndefinedKeys({
                data: Object.keys(this.data).length > 0 ? this.data : undefined,
                description: this.description,
                op: this.op,
                parent_span_id: this.parentSpanId,
                span_id: this.spanId,
                status: this.status,
                tags: Object.keys(this.tags).length > 0 ? this.tags : undefined,
                trace_id: this.traceId,
            });
        };
        /**
         * @inheritDoc
         */
        Span.prototype.toJSON = function () {
            return dropUndefinedKeys({
                data: Object.keys(this.data).length > 0 ? this.data : undefined,
                description: this.description,
                op: this.op,
                parent_span_id: this.parentSpanId,
                span_id: this.spanId,
                start_timestamp: this.startTimestamp,
                status: this.status,
                tags: Object.keys(this.tags).length > 0 ? this.tags : undefined,
                timestamp: this.endTimestamp,
                trace_id: this.traceId,
            });
        };
        return Span;
    }());

    /** JSDoc */
    var Transaction = /** @class */ (function (_super) {
        __extends(Transaction, _super);
        /**
         * This constructor should never be called manually. Those instrumenting tracing should use
         * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
         * @internal
         * @hideconstructor
         * @hidden
         */
        function Transaction(transactionContext, hub) {
            var _this = _super.call(this, transactionContext) || this;
            _this._measurements = {};
            /**
             * The reference to the current hub.
             */
            _this._hub = getCurrentHub();
            if (isInstanceOf(hub, Hub)) {
                _this._hub = hub;
            }
            _this.name = transactionContext.name || '';
            _this.metadata = transactionContext.metadata || {};
            _this._trimEnd = transactionContext.trimEnd;
            // this is because transactions are also spans, and spans have a transaction pointer
            _this.transaction = _this;
            return _this;
        }
        /**
         * JSDoc
         */
        Transaction.prototype.setName = function (name) {
            this.name = name;
        };
        /**
         * Attaches SpanRecorder to the span itself
         * @param maxlen maximum number of spans that can be recorded
         */
        Transaction.prototype.initSpanRecorder = function (maxlen) {
            if (maxlen === void 0) { maxlen = 1000; }
            if (!this.spanRecorder) {
                this.spanRecorder = new SpanRecorder(maxlen);
            }
            this.spanRecorder.add(this);
        };
        /**
         * Set observed measurements for this transaction.
         * @hidden
         */
        Transaction.prototype.setMeasurements = function (measurements) {
            this._measurements = __assign({}, measurements);
        };
        /**
         * Set metadata for this transaction.
         * @hidden
         */
        Transaction.prototype.setMetadata = function (newMetadata) {
            this.metadata = __assign(__assign({}, this.metadata), newMetadata);
        };
        /**
         * @inheritDoc
         */
        Transaction.prototype.finish = function (endTimestamp) {
            var _this = this;
            var _a, _b, _c, _d, _e;
            // This transaction is already finished, so we should not flush it again.
            if (this.endTimestamp !== undefined) {
                return undefined;
            }
            if (!this.name) {
                logger.warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
                this.name = '<unlabeled transaction>';
            }
            // just sets the end timestamp
            _super.prototype.finish.call(this, endTimestamp);
            if (this.sampled !== true) {
                // At this point if `sampled !== true` we want to discard the transaction.
                logger.log('[Tracing] Discarding transaction because its trace was not chosen to be sampled.');
                (_e = (_c = (_a = this._hub
                    .getClient()) === null || _a === void 0 ? void 0 : (_b = _a).getTransport) === null || _c === void 0 ? void 0 : (_d = _c.call(_b)).recordLostEvent) === null || _e === void 0 ? void 0 : _e.call(_d, Outcome.SampleRate, 'transaction');
                return undefined;
            }
            var finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(function (s) { return s !== _this && s.endTimestamp; }) : [];
            if (this._trimEnd && finishedSpans.length > 0) {
                this.endTimestamp = finishedSpans.reduce(function (prev, current) {
                    if (prev.endTimestamp && current.endTimestamp) {
                        return prev.endTimestamp > current.endTimestamp ? prev : current;
                    }
                    return prev;
                }).endTimestamp;
            }
            var transaction = {
                contexts: {
                    trace: this.getTraceContext(),
                },
                spans: finishedSpans,
                start_timestamp: this.startTimestamp,
                tags: this.tags,
                timestamp: this.endTimestamp,
                transaction: this.name,
                type: 'transaction',
                debug_meta: this.metadata,
            };
            var hasMeasurements = Object.keys(this._measurements).length > 0;
            if (hasMeasurements) {
                logger.log('[Measurements] Adding measurements to transaction', JSON.stringify(this._measurements, undefined, 2));
                transaction.measurements = this._measurements;
            }
            logger.log("[Tracing] Finishing " + this.op + " transaction: " + this.name + ".");
            return this._hub.captureEvent(transaction);
        };
        /**
         * @inheritDoc
         */
        Transaction.prototype.toContext = function () {
            var spanContext = _super.prototype.toContext.call(this);
            return dropUndefinedKeys(__assign(__assign({}, spanContext), { name: this.name, trimEnd: this._trimEnd }));
        };
        /**
         * @inheritDoc
         */
        Transaction.prototype.updateWithContext = function (transactionContext) {
            var _a;
            _super.prototype.updateWithContext.call(this, transactionContext);
            this.name = (_a = transactionContext.name, (_a !== null && _a !== void 0 ? _a : ''));
            this._trimEnd = transactionContext.trimEnd;
            return this;
        };
        return Transaction;
    }(Span));

    var DEFAULT_IDLE_TIMEOUT = 1000;
    var HEARTBEAT_INTERVAL = 5000;
    /**
     * @inheritDoc
     */
    var IdleTransactionSpanRecorder = /** @class */ (function (_super) {
        __extends(IdleTransactionSpanRecorder, _super);
        function IdleTransactionSpanRecorder(_pushActivity, _popActivity, transactionSpanId, maxlen) {
            if (transactionSpanId === void 0) { transactionSpanId = ''; }
            var _this = _super.call(this, maxlen) || this;
            _this._pushActivity = _pushActivity;
            _this._popActivity = _popActivity;
            _this.transactionSpanId = transactionSpanId;
            return _this;
        }
        /**
         * @inheritDoc
         */
        IdleTransactionSpanRecorder.prototype.add = function (span) {
            var _this = this;
            // We should make sure we do not push and pop activities for
            // the transaction that this span recorder belongs to.
            if (span.spanId !== this.transactionSpanId) {
                // We patch span.finish() to pop an activity after setting an endTimestamp.
                span.finish = function (endTimestamp) {
                    span.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
                    _this._popActivity(span.spanId);
                };
                // We should only push new activities if the span does not have an end timestamp.
                if (span.endTimestamp === undefined) {
                    this._pushActivity(span.spanId);
                }
            }
            _super.prototype.add.call(this, span);
        };
        return IdleTransactionSpanRecorder;
    }(SpanRecorder));
    /**
     * An IdleTransaction is a transaction that automatically finishes. It does this by tracking child spans as activities.
     * You can have multiple IdleTransactions active, but if the `onScope` option is specified, the idle transaction will
     * put itself on the scope on creation.
     */
    var IdleTransaction = /** @class */ (function (_super) {
        __extends(IdleTransaction, _super);
        function IdleTransaction(transactionContext, _idleHub, 
        /**
         * The time to wait in ms until the idle transaction will be finished.
         * @default 1000
         */
        _idleTimeout, 
        // If an idle transaction should be put itself on and off the scope automatically.
        _onScope) {
            if (_idleTimeout === void 0) { _idleTimeout = DEFAULT_IDLE_TIMEOUT; }
            if (_onScope === void 0) { _onScope = false; }
            var _this = _super.call(this, transactionContext, _idleHub) || this;
            _this._idleHub = _idleHub;
            _this._idleTimeout = _idleTimeout;
            _this._onScope = _onScope;
            // Activities store a list of active spans
            _this.activities = {};
            // Amount of times heartbeat has counted. Will cause transaction to finish after 3 beats.
            _this._heartbeatCounter = 0;
            // We should not use heartbeat if we finished a transaction
            _this._finished = false;
            _this._beforeFinishCallbacks = [];
            if (_idleHub && _onScope) {
                // There should only be one active transaction on the scope
                clearActiveTransaction(_idleHub);
                // We set the transaction here on the scope so error events pick up the trace
                // context and attach it to the error.
                logger.log("Setting idle transaction on scope. Span ID: " + _this.spanId);
                _idleHub.configureScope(function (scope) { return scope.setSpan(_this); });
            }
            _this._initTimeout = setTimeout(function () {
                if (!_this._finished) {
                    _this.finish();
                }
            }, _this._idleTimeout);
            return _this;
        }
        /** {@inheritDoc} */
        IdleTransaction.prototype.finish = function (endTimestamp) {
            var e_1, _a;
            var _this = this;
            if (endTimestamp === void 0) { endTimestamp = timestampWithMs(); }
            this._finished = true;
            this.activities = {};
            if (this.spanRecorder) {
                logger.log('[Tracing] finishing IdleTransaction', new Date(endTimestamp * 1000).toISOString(), this.op);
                try {
                    for (var _b = __values(this._beforeFinishCallbacks), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var callback = _c.value;
                        callback(this, endTimestamp);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.spanRecorder.spans = this.spanRecorder.spans.filter(function (span) {
                    // If we are dealing with the transaction itself, we just return it
                    if (span.spanId === _this.spanId) {
                        return true;
                    }
                    // We cancel all pending spans with status "cancelled" to indicate the idle transaction was finished early
                    if (!span.endTimestamp) {
                        span.endTimestamp = endTimestamp;
                        span.setStatus(SpanStatus.Cancelled);
                        logger.log('[Tracing] cancelling span since transaction ended early', JSON.stringify(span, undefined, 2));
                    }
                    var keepSpan = span.startTimestamp < endTimestamp;
                    if (!keepSpan) {
                        logger.log('[Tracing] discarding Span since it happened after Transaction was finished', JSON.stringify(span, undefined, 2));
                    }
                    return keepSpan;
                });
                logger.log('[Tracing] flushing IdleTransaction');
            }
            else {
                logger.log('[Tracing] No active IdleTransaction');
            }
            // this._onScope is true if the transaction was previously on the scope.
            if (this._onScope) {
                clearActiveTransaction(this._idleHub);
            }
            return _super.prototype.finish.call(this, endTimestamp);
        };
        /**
         * Register a callback function that gets excecuted before the transaction finishes.
         * Useful for cleanup or if you want to add any additional spans based on current context.
         *
         * This is exposed because users have no other way of running something before an idle transaction
         * finishes.
         */
        IdleTransaction.prototype.registerBeforeFinishCallback = function (callback) {
            this._beforeFinishCallbacks.push(callback);
        };
        /**
         * @inheritDoc
         */
        IdleTransaction.prototype.initSpanRecorder = function (maxlen) {
            var _this = this;
            if (!this.spanRecorder) {
                var pushActivity = function (id) {
                    if (_this._finished) {
                        return;
                    }
                    _this._pushActivity(id);
                };
                var popActivity = function (id) {
                    if (_this._finished) {
                        return;
                    }
                    _this._popActivity(id);
                };
                this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanId, maxlen);
                // Start heartbeat so that transactions do not run forever.
                logger.log('Starting heartbeat');
                this._pingHeartbeat();
            }
            this.spanRecorder.add(this);
        };
        /**
         * Start tracking a specific activity.
         * @param spanId The span id that represents the activity
         */
        IdleTransaction.prototype._pushActivity = function (spanId) {
            if (this._initTimeout) {
                clearTimeout(this._initTimeout);
                this._initTimeout = undefined;
            }
            logger.log("[Tracing] pushActivity: " + spanId);
            this.activities[spanId] = true;
            logger.log('[Tracing] new activities count', Object.keys(this.activities).length);
        };
        /**
         * Remove an activity from usage
         * @param spanId The span id that represents the activity
         */
        IdleTransaction.prototype._popActivity = function (spanId) {
            var _this = this;
            if (this.activities[spanId]) {
                logger.log("[Tracing] popActivity " + spanId);
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.activities[spanId];
                logger.log('[Tracing] new activities count', Object.keys(this.activities).length);
            }
            if (Object.keys(this.activities).length === 0) {
                var timeout = this._idleTimeout;
                // We need to add the timeout here to have the real endtimestamp of the transaction
                // Remember timestampWithMs is in seconds, timeout is in ms
                var end_1 = timestampWithMs() + timeout / 1000;
                setTimeout(function () {
                    if (!_this._finished) {
                        _this.finish(end_1);
                    }
                }, timeout);
            }
        };
        /**
         * Checks when entries of this.activities are not changing for 3 beats.
         * If this occurs we finish the transaction.
         */
        IdleTransaction.prototype._beat = function () {
            // We should not be running heartbeat if the idle transaction is finished.
            if (this._finished) {
                return;
            }
            var heartbeatString = Object.keys(this.activities).join('');
            if (heartbeatString === this._prevHeartbeatString) {
                this._heartbeatCounter += 1;
            }
            else {
                this._heartbeatCounter = 1;
            }
            this._prevHeartbeatString = heartbeatString;
            if (this._heartbeatCounter >= 3) {
                logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
                this.setStatus(SpanStatus.DeadlineExceeded);
                this.setTag('heartbeat', 'failed');
                this.finish();
            }
            else {
                this._pingHeartbeat();
            }
        };
        /**
         * Pings the heartbeat
         */
        IdleTransaction.prototype._pingHeartbeat = function () {
            var _this = this;
            logger.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter);
            setTimeout(function () {
                _this._beat();
            }, HEARTBEAT_INTERVAL);
        };
        return IdleTransaction;
    }(Transaction));
    /**
     * Reset active transaction on scope
     */
    function clearActiveTransaction(hub) {
        if (hub) {
            var scope = hub.getScope();
            if (scope) {
                var transaction = scope.getTransaction();
                if (transaction) {
                    scope.setSpan(undefined);
                }
            }
        }
    }

    /** Returns all trace headers that are currently on the top scope. */
    function traceHeaders() {
        var scope = this.getScope();
        if (scope) {
            var span = scope.getSpan();
            if (span) {
                return {
                    'sentry-trace': span.toTraceparent(),
                };
            }
        }
        return {};
    }
    /**
     * Makes a sampling decision for the given transaction and stores it on the transaction.
     *
     * Called every time a transaction is created. Only transactions which emerge with a `sampled` value of `true` will be
     * sent to Sentry.
     *
     * @param hub: The hub off of which to read config options
     * @param transaction: The transaction needing a sampling decision
     * @param samplingContext: Default and user-provided data which may be used to help make the decision
     *
     * @returns The given transaction with its `sampled` value set
     */
    function sample(transaction, options, samplingContext) {
        // nothing to do if tracing is not enabled
        if (!hasTracingEnabled(options)) {
            transaction.sampled = false;
            return transaction;
        }
        // if the user has forced a sampling decision by passing a `sampled` value in their transaction context, go with that
        if (transaction.sampled !== undefined) {
            transaction.setMetadata({
                transactionSampling: { method: TransactionSamplingMethod.Explicit },
            });
            return transaction;
        }
        // we would have bailed already if neither `tracesSampler` nor `tracesSampleRate` were defined, so one of these should
        // work; prefer the hook if so
        var sampleRate;
        if (typeof options.tracesSampler === 'function') {
            sampleRate = options.tracesSampler(samplingContext);
            transaction.setMetadata({
                transactionSampling: {
                    method: TransactionSamplingMethod.Sampler,
                    // cast to number in case it's a boolean
                    rate: Number(sampleRate),
                },
            });
        }
        else if (samplingContext.parentSampled !== undefined) {
            sampleRate = samplingContext.parentSampled;
            transaction.setMetadata({
                transactionSampling: { method: TransactionSamplingMethod.Inheritance },
            });
        }
        else {
            sampleRate = options.tracesSampleRate;
            transaction.setMetadata({
                transactionSampling: {
                    method: TransactionSamplingMethod.Rate,
                    // cast to number in case it's a boolean
                    rate: Number(sampleRate),
                },
            });
        }
        // Since this is coming from the user (or from a function provided by the user), who knows what we might get. (The
        // only valid values are booleans or numbers between 0 and 1.)
        if (!isValidSampleRate(sampleRate)) {
            logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
            transaction.sampled = false;
            return transaction;
        }
        // if the function returned 0 (or false), or if `tracesSampleRate` is 0, it's a sign the transaction should be dropped
        if (!sampleRate) {
            logger.log("[Tracing] Discarding transaction because " + (typeof options.tracesSampler === 'function'
                ? 'tracesSampler returned 0 or false'
                : 'a negative sampling decision was inherited or tracesSampleRate is set to 0'));
            transaction.sampled = false;
            return transaction;
        }
        // Now we roll the dice. Math.random is inclusive of 0, but not of 1, so strict < is safe here. In case sampleRate is
        // a boolean, the < comparison will cause it to be automatically cast to 1 if it's true and 0 if it's false.
        transaction.sampled = Math.random() < sampleRate;
        // if we're not going to keep it, we're done
        if (!transaction.sampled) {
            logger.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(sampleRate) + ")");
            return transaction;
        }
        logger.log("[Tracing] starting " + transaction.op + " transaction - " + transaction.name);
        return transaction;
    }
    /**
     * Checks the given sample rate to make sure it is valid type and value (a boolean, or a number between 0 and 1).
     */
    function isValidSampleRate(rate) {
        // we need to check NaN explicitly because it's of type 'number' and therefore wouldn't get caught by this typecheck
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (isNaN(rate) || !(typeof rate === 'number' || typeof rate === 'boolean')) {
            logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(rate) + " of type " + JSON.stringify(typeof rate) + ".");
            return false;
        }
        // in case sampleRate is a boolean, it will get automatically cast to 1 if it's true and 0 if it's false
        if (rate < 0 || rate > 1) {
            logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + rate + ".");
            return false;
        }
        return true;
    }
    /**
     * Creates a new transaction and adds a sampling decision if it doesn't yet have one.
     *
     * The Hub.startTransaction method delegates to this method to do its work, passing the Hub instance in as `this`, as if
     * it had been called on the hub directly. Exists as a separate function so that it can be injected into the class as an
     * "extension method."
     *
     * @param this: The Hub starting the transaction
     * @param transactionContext: Data used to configure the transaction
     * @param CustomSamplingContext: Optional data to be provided to the `tracesSampler` function (if any)
     *
     * @returns The new transaction
     *
     * @see {@link Hub.startTransaction}
     */
    function _startTransaction(transactionContext, customSamplingContext) {
        var _a, _b;
        var options = ((_a = this.getClient()) === null || _a === void 0 ? void 0 : _a.getOptions()) || {};
        var transaction = new Transaction(transactionContext, this);
        transaction = sample(transaction, options, __assign({ parentSampled: transactionContext.parentSampled, transactionContext: transactionContext }, customSamplingContext));
        if (transaction.sampled) {
            transaction.initSpanRecorder((_b = options._experiments) === null || _b === void 0 ? void 0 : _b.maxSpans);
        }
        return transaction;
    }
    /**
     * Create new idle transaction.
     */
    function startIdleTransaction(hub, transactionContext, idleTimeout, onScope, customSamplingContext) {
        var _a, _b;
        var options = ((_a = hub.getClient()) === null || _a === void 0 ? void 0 : _a.getOptions()) || {};
        var transaction = new IdleTransaction(transactionContext, hub, idleTimeout, onScope);
        transaction = sample(transaction, options, __assign({ parentSampled: transactionContext.parentSampled, transactionContext: transactionContext }, customSamplingContext));
        if (transaction.sampled) {
            transaction.initSpanRecorder((_b = options._experiments) === null || _b === void 0 ? void 0 : _b.maxSpans);
        }
        return transaction;
    }
    /**
     * @private
     */
    function _addTracingExtensions() {
        var carrier = getMainCarrier();
        if (!carrier.__SENTRY__) {
            return;
        }
        carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
        if (!carrier.__SENTRY__.extensions.startTransaction) {
            carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
        }
        if (!carrier.__SENTRY__.extensions.traceHeaders) {
            carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
        }
    }
    /**
     * @private
     */
    function _autoloadDatabaseIntegrations() {
        var carrier = getMainCarrier();
        if (!carrier.__SENTRY__) {
            return;
        }
        var packageToIntegrationMapping = {
            mongodb: function () {
                var integration = dynamicRequire(module, './integrations/node/mongo');
                return new integration.Mongo();
            },
            mongoose: function () {
                var integration = dynamicRequire(module, './integrations/node/mongo');
                return new integration.Mongo({ mongoose: true });
            },
            mysql: function () {
                var integration = dynamicRequire(module, './integrations/node/mysql');
                return new integration.Mysql();
            },
            pg: function () {
                var integration = dynamicRequire(module, './integrations/node/postgres');
                return new integration.Postgres();
            },
        };
        var mappedPackages = Object.keys(packageToIntegrationMapping)
            .filter(function (moduleName) { return !!loadModule(moduleName); })
            .map(function (pkg) {
            try {
                return packageToIntegrationMapping[pkg]();
            }
            catch (e) {
                return undefined;
            }
        })
            .filter(function (p) { return p; });
        if (mappedPackages.length > 0) {
            carrier.__SENTRY__.integrations = __spread((carrier.__SENTRY__.integrations || []), mappedPackages);
        }
    }
    /**
     * This patches the global object and injects the Tracing extensions methods
     */
    function addExtensionMethods() {
        _addTracingExtensions();
        // Detect and automatically load specified integrations.
        if (isNodeEnv()) {
            _autoloadDatabaseIntegrations();
        }
        // If an error happens globally, we should make sure transaction status is set to error.
        registerErrorInstrumentation();
    }

    var global$3 = getGlobalObject();
    /**
     * Add a listener that cancels and finishes a transaction when the global
     * document is hidden.
     */
    function registerBackgroundTabDetection() {
        if (global$3 && global$3.document) {
            global$3.document.addEventListener('visibilitychange', function () {
                var activeTransaction = getActiveTransaction();
                if (global$3.document.hidden && activeTransaction) {
                    logger.log("[Tracing] Transaction: " + SpanStatus.Cancelled + " -> since tab moved to the background, op: " + activeTransaction.op);
                    // We should not set status if it is already set, this prevent important statuses like
                    // error or data loss from being overwritten on transaction.
                    if (!activeTransaction.status) {
                        activeTransaction.setStatus(SpanStatus.Cancelled);
                    }
                    activeTransaction.setTag('visibilitychange', 'document.hidden');
                    activeTransaction.finish();
                }
            });
        }
        else {
            logger.warn('[Tracing] Could not set up background tab detection due to lack of global document');
        }
    }

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var bindReporter = function (callback, metric, reportAllChanges) {
        var prevValue;
        return function (forceReport) {
            if (metric.value >= 0) {
                if (forceReport || reportAllChanges) {
                    metric.delta = metric.value - (prevValue || 0);
                    // Report the metric if there's a non-zero delta or if no previous
                    // value exists (which can happen in the case of the document becoming
                    // hidden when the metric value is 0).
                    // See: https://github.com/GoogleChrome/web-vitals/issues/14
                    if (metric.delta || prevValue === undefined) {
                        prevValue = metric.value;
                        callback(metric);
                    }
                }
            }
        };
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Performantly generate a unique, 30-char string by combining a version
     * number, the current timestamp with a 13-digit number integer.
     * @return {string}
     */
    var generateUniqueID = function () {
        return "v2-" + Date.now() + "-" + (Math.floor(Math.random() * (9e12 - 1)) + 1e12);
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var initMetric = function (name, value) {
        return {
            name: name,
            value: (value !== null && value !== void 0 ? value : -1),
            delta: 0,
            entries: [],
            id: generateUniqueID(),
        };
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Takes a performance entry type and a callback function, and creates a
     * `PerformanceObserver` instance that will observe the specified entry type
     * with buffering enabled and call the callback _for each entry_.
     *
     * This function also feature-detects entry support and wraps the logic in a
     * try/catch to avoid errors in unsupporting browsers.
     */
    var observe = function (type, callback) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(type)) {
                // More extensive feature detect needed for Firefox due to:
                // https://github.com/GoogleChrome/web-vitals/issues/142
                if (type === 'first-input' && !('PerformanceEventTiming' in self)) {
                    return;
                }
                var po = new PerformanceObserver(function (l) { return l.getEntries().map(callback); });
                po.observe({ type: type, buffered: true });
                return po;
            }
        }
        catch (e) {
            // Do nothing.
        }
        return;
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var onHidden = function (cb, once) {
        var onHiddenOrPageHide = function (event) {
            if (event.type === 'pagehide' || getGlobalObject().document.visibilityState === 'hidden') {
                cb(event);
                if (once) {
                    removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                    removeEventListener('pagehide', onHiddenOrPageHide, true);
                }
            }
        };
        addEventListener('visibilitychange', onHiddenOrPageHide, true);
        // Some browsers have buggy implementations of visibilitychange,
        // so we use pagehide in addition, just to be safe.
        addEventListener('pagehide', onHiddenOrPageHide, true);
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var getCLS = function (onReport, reportAllChanges) {
        var metric = initMetric('CLS', 0);
        var report;
        var sessionValue = 0;
        var sessionEntries = [];
        var entryHandler = function (entry) {
            // Only count layout shifts without recent user input.
            // TODO: Figure out why entry can be undefined
            if (entry && !entry.hadRecentInput) {
                var firstSessionEntry = sessionEntries[0];
                var lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                // If the entry occurred less than 1 second after the previous entry and
                // less than 5 seconds after the first entry in the session, include the
                // entry in the current session. Otherwise, start a new session.
                if (sessionValue &&
                    sessionEntries.length !== 0 &&
                    entry.startTime - lastSessionEntry.startTime < 1000 &&
                    entry.startTime - firstSessionEntry.startTime < 5000) {
                    sessionValue += entry.value;
                    sessionEntries.push(entry);
                }
                else {
                    sessionValue = entry.value;
                    sessionEntries = [entry];
                }
                // If the current session value is larger than the current CLS value,
                // update CLS and the entries contributing to it.
                if (sessionValue > metric.value) {
                    metric.value = sessionValue;
                    metric.entries = sessionEntries;
                    if (report) {
                        report();
                    }
                }
            }
        };
        var po = observe('layout-shift', entryHandler);
        if (po) {
            report = bindReporter(onReport, metric, reportAllChanges);
            onHidden(function () {
                po.takeRecords().map(entryHandler);
                report(true);
            });
        }
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var firstHiddenTime = -1;
    var initHiddenTime = function () {
        return getGlobalObject().document.visibilityState === 'hidden' ? 0 : Infinity;
    };
    var trackChanges = function () {
        // Update the time if/when the document becomes hidden.
        onHidden(function (_a) {
            var timeStamp = _a.timeStamp;
            firstHiddenTime = timeStamp;
        }, true);
    };
    var getVisibilityWatcher = function () {
        if (firstHiddenTime < 0) {
            // If the document is hidden when this code runs, assume it was hidden
            // since navigation start. This isn't a perfect heuristic, but it's the
            // best we can do until an API is available to support querying past
            // visibilityState.
            firstHiddenTime = initHiddenTime();
            trackChanges();
        }
        return {
            get firstHiddenTime() {
                return firstHiddenTime;
            },
        };
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var getFID = function (onReport, reportAllChanges) {
        var visibilityWatcher = getVisibilityWatcher();
        var metric = initMetric('FID');
        var report;
        var entryHandler = function (entry) {
            // Only report if the page wasn't hidden prior to the first input.
            if (report && entry.startTime < visibilityWatcher.firstHiddenTime) {
                metric.value = entry.processingStart - entry.startTime;
                metric.entries.push(entry);
                report(true);
            }
        };
        var po = observe('first-input', entryHandler);
        if (po) {
            report = bindReporter(onReport, metric, reportAllChanges);
            onHidden(function () {
                po.takeRecords().map(entryHandler);
                po.disconnect();
            }, true);
        }
    };

    /*
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var reportedMetricIDs = {};
    var getLCP = function (onReport, reportAllChanges) {
        var visibilityWatcher = getVisibilityWatcher();
        var metric = initMetric('LCP');
        var report;
        var entryHandler = function (entry) {
            // The startTime attribute returns the value of the renderTime if it is not 0,
            // and the value of the loadTime otherwise.
            var value = entry.startTime;
            // If the page was hidden prior to paint time of the entry,
            // ignore it and mark the metric as final, otherwise add the entry.
            if (value < visibilityWatcher.firstHiddenTime) {
                metric.value = value;
                metric.entries.push(entry);
            }
            if (report) {
                report();
            }
        };
        var po = observe('largest-contentful-paint', entryHandler);
        if (po) {
            report = bindReporter(onReport, metric, reportAllChanges);
            var stopListening_1 = function () {
                if (!reportedMetricIDs[metric.id]) {
                    po.takeRecords().map(entryHandler);
                    po.disconnect();
                    reportedMetricIDs[metric.id] = true;
                    report(true);
                }
            };
            // Stop listening after input. Note: while scrolling is an input that
            // stop LCP observation, it's unreliable since it can be programmatically
            // generated. See: https://github.com/GoogleChrome/web-vitals/issues/75
            ['keydown', 'click'].forEach(function (type) {
                addEventListener(type, stopListening_1, { once: true, capture: true });
            });
            onHidden(stopListening_1, true);
        }
    };

    var global$2 = getGlobalObject();
    var DEFAULT_METRICS_INSTR_OPTIONS = {
        _reportAllChanges: false,
    };
    /** Class tracking metrics  */
    var MetricsInstrumentation = /** @class */ (function () {
        function MetricsInstrumentation(_options) {
            var _a, _b;
            this._measurements = {};
            this._performanceCursor = 0;
            if (!isNodeEnv() && ((_a = global$2) === null || _a === void 0 ? void 0 : _a.performance) && ((_b = global$2) === null || _b === void 0 ? void 0 : _b.document)) {
                if (global$2.performance.mark) {
                    global$2.performance.mark('sentry-tracing-init');
                }
                this._trackCLS();
                this._trackLCP(_options._reportAllChanges);
                this._trackFID();
            }
        }
        /** Add performance related spans to a transaction */
        MetricsInstrumentation.prototype.addPerformanceEntries = function (transaction) {
            var _this = this;
            if (!global$2 || !global$2.performance || !global$2.performance.getEntries || !browserPerformanceTimeOrigin) {
                // Gatekeeper if performance API not available
                return;
            }
            logger.log('[Tracing] Adding & adjusting spans using Performance API');
            var timeOrigin = msToSec(browserPerformanceTimeOrigin);
            var entryScriptSrc;
            if (global$2.document && global$2.document.scripts) {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (var i = 0; i < global$2.document.scripts.length; i++) {
                    // We go through all scripts on the page and look for 'data-entry'
                    // We remember the name and measure the time between this script finished loading and
                    // our mark 'sentry-tracing-init'
                    if (global$2.document.scripts[i].dataset.entry === 'true') {
                        entryScriptSrc = global$2.document.scripts[i].src;
                        break;
                    }
                }
            }
            var entryScriptStartTimestamp;
            var tracingInitMarkStartTime;
            var responseStartTimestamp;
            var requestStartTimestamp;
            global$2.performance
                .getEntries()
                .slice(this._performanceCursor)
                .forEach(function (entry) {
                var startTime = msToSec(entry.startTime);
                var duration = msToSec(entry.duration);
                if (transaction.op === 'navigation' && timeOrigin + startTime < transaction.startTimestamp) {
                    return;
                }
                switch (entry.entryType) {
                    case 'navigation': {
                        addNavigationSpans(transaction, entry, timeOrigin);
                        responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
                        requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
                        break;
                    }
                    case 'mark':
                    case 'paint':
                    case 'measure': {
                        var startTimestamp = addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
                        if (tracingInitMarkStartTime === undefined && entry.name === 'sentry-tracing-init') {
                            tracingInitMarkStartTime = startTimestamp;
                        }
                        // capture web vitals
                        var firstHidden = getVisibilityWatcher();
                        // Only report if the page wasn't hidden prior to the web vital.
                        var shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
                        if (entry.name === 'first-paint' && shouldRecord) {
                            logger.log('[Measurements] Adding FP');
                            _this._measurements['fp'] = { value: entry.startTime };
                            _this._measurements['mark.fp'] = { value: startTimestamp };
                        }
                        if (entry.name === 'first-contentful-paint' && shouldRecord) {
                            logger.log('[Measurements] Adding FCP');
                            _this._measurements['fcp'] = { value: entry.startTime };
                            _this._measurements['mark.fcp'] = { value: startTimestamp };
                        }
                        break;
                    }
                    case 'resource': {
                        var resourceName = entry.name.replace(global$2.location.origin, '');
                        var endTimestamp = addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin);
                        // We remember the entry script end time to calculate the difference to the first init mark
                        if (entryScriptStartTimestamp === undefined && (entryScriptSrc || '').indexOf(resourceName) > -1) {
                            entryScriptStartTimestamp = endTimestamp;
                        }
                        break;
                    }
                    // Ignore other entry types.
                }
            });
            if (entryScriptStartTimestamp !== undefined && tracingInitMarkStartTime !== undefined) {
                _startChild(transaction, {
                    description: 'evaluation',
                    endTimestamp: tracingInitMarkStartTime,
                    op: 'script',
                    startTimestamp: entryScriptStartTimestamp,
                });
            }
            this._performanceCursor = Math.max(performance.getEntries().length - 1, 0);
            this._trackNavigator(transaction);
            // Measurements are only available for pageload transactions
            if (transaction.op === 'pageload') {
                // normalize applicable web vital values to be relative to transaction.startTimestamp
                var timeOrigin_1 = msToSec(browserPerformanceTimeOrigin);
                // Generate TTFB (Time to First Byte), which measured as the time between the beginning of the transaction and the
                // start of the response in milliseconds
                if (typeof responseStartTimestamp === 'number') {
                    logger.log('[Measurements] Adding TTFB');
                    this._measurements['ttfb'] = { value: (responseStartTimestamp - transaction.startTimestamp) * 1000 };
                    if (typeof requestStartTimestamp === 'number' && requestStartTimestamp <= responseStartTimestamp) {
                        // Capture the time spent making the request and receiving the first byte of the response.
                        // This is the time between the start of the request and the start of the response in milliseconds.
                        this._measurements['ttfb.requestTime'] = { value: (responseStartTimestamp - requestStartTimestamp) * 1000 };
                    }
                }
                ['fcp', 'fp', 'lcp'].forEach(function (name) {
                    if (!_this._measurements[name] || timeOrigin_1 >= transaction.startTimestamp) {
                        return;
                    }
                    // The web vitals, fcp, fp, lcp, and ttfb, all measure relative to timeOrigin.
                    // Unfortunately, timeOrigin is not captured within the transaction span data, so these web vitals will need
                    // to be adjusted to be relative to transaction.startTimestamp.
                    var oldValue = _this._measurements[name].value;
                    var measurementTimestamp = timeOrigin_1 + msToSec(oldValue);
                    // normalizedValue should be in milliseconds
                    var normalizedValue = Math.abs((measurementTimestamp - transaction.startTimestamp) * 1000);
                    var delta = normalizedValue - oldValue;
                    logger.log("[Measurements] Normalized " + name + " from " + oldValue + " to " + normalizedValue + " (" + delta + ")");
                    _this._measurements[name].value = normalizedValue;
                });
                if (this._measurements['mark.fid'] && this._measurements['fid']) {
                    // create span for FID
                    _startChild(transaction, {
                        description: 'first input delay',
                        endTimestamp: this._measurements['mark.fid'].value + msToSec(this._measurements['fid'].value),
                        op: 'web.vitals',
                        startTimestamp: this._measurements['mark.fid'].value,
                    });
                }
                // If FCP is not recorded we should not record the cls value
                // according to the new definition of CLS.
                if (!('fcp' in this._measurements)) {
                    delete this._measurements.cls;
                }
                transaction.setMeasurements(this._measurements);
                this._tagMetricInfo(transaction);
            }
        };
        /** Add LCP / CLS data to transaction to allow debugging */
        MetricsInstrumentation.prototype._tagMetricInfo = function (transaction) {
            if (this._lcpEntry) {
                logger.log('[Measurements] Adding LCP Data');
                // Capture Properties of the LCP element that contributes to the LCP.
                if (this._lcpEntry.element) {
                    transaction.setTag('lcp.element', htmlTreeAsString(this._lcpEntry.element));
                }
                if (this._lcpEntry.id) {
                    transaction.setTag('lcp.id', this._lcpEntry.id);
                }
                if (this._lcpEntry.url) {
                    // Trim URL to the first 200 characters.
                    transaction.setTag('lcp.url', this._lcpEntry.url.trim().slice(0, 200));
                }
                transaction.setTag('lcp.size', this._lcpEntry.size);
            }
            // See: https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift
            if (this._clsEntry && this._clsEntry.sources) {
                logger.log('[Measurements] Adding CLS Data');
                this._clsEntry.sources.forEach(function (source, index) {
                    return transaction.setTag("cls.source." + (index + 1), htmlTreeAsString(source.node));
                });
            }
        };
        /** Starts tracking the Cumulative Layout Shift on the current page. */
        MetricsInstrumentation.prototype._trackCLS = function () {
            var _this = this;
            // See:
            // https://web.dev/evolving-cls/
            // https://web.dev/cls-web-tooling/
            getCLS(function (metric) {
                var entry = metric.entries.pop();
                if (!entry) {
                    return;
                }
                logger.log('[Measurements] Adding CLS');
                _this._measurements['cls'] = { value: metric.value };
                _this._clsEntry = entry;
            });
        };
        /**
         * Capture the information of the user agent.
         */
        MetricsInstrumentation.prototype._trackNavigator = function (transaction) {
            var navigator = global$2.navigator;
            if (!navigator) {
                return;
            }
            // track network connectivity
            var connection = navigator.connection;
            if (connection) {
                if (connection.effectiveType) {
                    transaction.setTag('effectiveConnectionType', connection.effectiveType);
                }
                if (connection.type) {
                    transaction.setTag('connectionType', connection.type);
                }
                if (isMeasurementValue(connection.rtt)) {
                    this._measurements['connection.rtt'] = { value: connection.rtt };
                }
                if (isMeasurementValue(connection.downlink)) {
                    this._measurements['connection.downlink'] = { value: connection.downlink };
                }
            }
            if (isMeasurementValue(navigator.deviceMemory)) {
                transaction.setTag('deviceMemory', String(navigator.deviceMemory));
            }
            if (isMeasurementValue(navigator.hardwareConcurrency)) {
                transaction.setTag('hardwareConcurrency', String(navigator.hardwareConcurrency));
            }
        };
        /** Starts tracking the Largest Contentful Paint on the current page. */
        MetricsInstrumentation.prototype._trackLCP = function (reportAllChanges) {
            var _this = this;
            getLCP(function (metric) {
                var entry = metric.entries.pop();
                if (!entry) {
                    return;
                }
                var timeOrigin = msToSec(browserPerformanceTimeOrigin);
                var startTime = msToSec(entry.startTime);
                logger.log('[Measurements] Adding LCP');
                _this._measurements['lcp'] = { value: metric.value };
                _this._measurements['mark.lcp'] = { value: timeOrigin + startTime };
                _this._lcpEntry = entry;
            }, reportAllChanges);
        };
        /** Starts tracking the First Input Delay on the current page. */
        MetricsInstrumentation.prototype._trackFID = function () {
            var _this = this;
            getFID(function (metric) {
                var entry = metric.entries.pop();
                if (!entry) {
                    return;
                }
                var timeOrigin = msToSec(browserPerformanceTimeOrigin);
                var startTime = msToSec(entry.startTime);
                logger.log('[Measurements] Adding FID');
                _this._measurements['fid'] = { value: metric.value };
                _this._measurements['mark.fid'] = { value: timeOrigin + startTime };
            });
        };
        return MetricsInstrumentation;
    }());
    /** Instrument navigation entries */
    function addNavigationSpans(transaction, entry, timeOrigin) {
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'unloadEvent', timeOrigin: timeOrigin });
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'redirect', timeOrigin: timeOrigin });
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'domContentLoadedEvent', timeOrigin: timeOrigin });
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'loadEvent', timeOrigin: timeOrigin });
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'connect', timeOrigin: timeOrigin });
        addPerformanceNavigationTiming({
            transaction: transaction,
            entry: entry,
            event: 'secureConnection',
            timeOrigin: timeOrigin,
            eventEnd: 'connectEnd',
            description: 'TLS/SSL',
        });
        addPerformanceNavigationTiming({
            transaction: transaction,
            entry: entry,
            event: 'fetch',
            timeOrigin: timeOrigin,
            eventEnd: 'domainLookupStart',
            description: 'cache',
        });
        addPerformanceNavigationTiming({ transaction: transaction, entry: entry, event: 'domainLookup', timeOrigin: timeOrigin, description: 'DNS' });
        addRequest(transaction, entry, timeOrigin);
    }
    /** Create measure related spans */
    function addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
        var measureStartTimestamp = timeOrigin + startTime;
        var measureEndTimestamp = measureStartTimestamp + duration;
        _startChild(transaction, {
            description: entry.name,
            endTimestamp: measureEndTimestamp,
            op: entry.entryType,
            startTimestamp: measureStartTimestamp,
        });
        return measureStartTimestamp;
    }
    /** Create resource-related spans */
    function addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin) {
        // we already instrument based on fetch and xhr, so we don't need to
        // duplicate spans here.
        if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') {
            return undefined;
        }
        var data = {};
        if ('transferSize' in entry) {
            data['Transfer Size'] = entry.transferSize;
        }
        if ('encodedBodySize' in entry) {
            data['Encoded Body Size'] = entry.encodedBodySize;
        }
        if ('decodedBodySize' in entry) {
            data['Decoded Body Size'] = entry.decodedBodySize;
        }
        var startTimestamp = timeOrigin + startTime;
        var endTimestamp = startTimestamp + duration;
        _startChild(transaction, {
            description: resourceName,
            endTimestamp: endTimestamp,
            op: entry.initiatorType ? "resource." + entry.initiatorType : 'resource',
            startTimestamp: startTimestamp,
            data: data,
        });
        return endTimestamp;
    }
    /** Create performance navigation related spans */
    function addPerformanceNavigationTiming(props) {
        var transaction = props.transaction, entry = props.entry, event = props.event, timeOrigin = props.timeOrigin, eventEnd = props.eventEnd, description = props.description;
        var end = eventEnd ? entry[eventEnd] : entry[event + "End"];
        var start = entry[event + "Start"];
        if (!start || !end) {
            return;
        }
        _startChild(transaction, {
            op: 'browser',
            description: (description !== null && description !== void 0 ? description : event),
            startTimestamp: timeOrigin + msToSec(start),
            endTimestamp: timeOrigin + msToSec(end),
        });
    }
    /** Create request and response related spans */
    function addRequest(transaction, entry, timeOrigin) {
        _startChild(transaction, {
            op: 'browser',
            description: 'request',
            startTimestamp: timeOrigin + msToSec(entry.requestStart),
            endTimestamp: timeOrigin + msToSec(entry.responseEnd),
        });
        _startChild(transaction, {
            op: 'browser',
            description: 'response',
            startTimestamp: timeOrigin + msToSec(entry.responseStart),
            endTimestamp: timeOrigin + msToSec(entry.responseEnd),
        });
    }
    /**
     * Helper function to start child on transactions. This function will make sure that the transaction will
     * use the start timestamp of the created child span if it is earlier than the transactions actual
     * start timestamp.
     */
    function _startChild(transaction, _a) {
        var startTimestamp = _a.startTimestamp, ctx = __rest(_a, ["startTimestamp"]);
        if (startTimestamp && transaction.startTimestamp > startTimestamp) {
            transaction.startTimestamp = startTimestamp;
        }
        return transaction.startChild(__assign({ startTimestamp: startTimestamp }, ctx));
    }
    /**
     * Checks if a given value is a valid measurement value.
     */
    function isMeasurementValue(value) {
        return typeof value === 'number' && isFinite(value);
    }

    var DEFAULT_TRACING_ORIGINS = ['localhost', /^\//];
    var defaultRequestInstrumentationOptions = {
        traceFetch: true,
        traceXHR: true,
        tracingOrigins: DEFAULT_TRACING_ORIGINS,
    };
    /** Registers span creators for xhr and fetch requests  */
    function instrumentOutgoingRequests(_options) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var _a = __assign(__assign({}, defaultRequestInstrumentationOptions), _options), traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
        // We should cache url -> decision so that we don't have to compute
        // regexp everytime we create a request.
        var urlMap = {};
        var defaultShouldCreateSpan = function (url) {
            if (urlMap[url]) {
                return urlMap[url];
            }
            var origins = tracingOrigins;
            urlMap[url] =
                origins.some(function (origin) { return isMatchingPattern(url, origin); }) &&
                    !isMatchingPattern(url, 'sentry_key');
            return urlMap[url];
        };
        // We want that our users don't have to re-implement shouldCreateSpanForRequest themselves
        // That's why we filter out already unwanted Spans from tracingOrigins
        var shouldCreateSpan = defaultShouldCreateSpan;
        if (typeof shouldCreateSpanForRequest === 'function') {
            shouldCreateSpan = function (url) {
                return defaultShouldCreateSpan(url) && shouldCreateSpanForRequest(url);
            };
        }
        var spans = {};
        if (traceFetch) {
            addInstrumentationHandler({
                callback: function (handlerData) {
                    fetchCallback(handlerData, shouldCreateSpan, spans);
                },
                type: 'fetch',
            });
        }
        if (traceXHR) {
            addInstrumentationHandler({
                callback: function (handlerData) {
                    xhrCallback(handlerData, shouldCreateSpan, spans);
                },
                type: 'xhr',
            });
        }
    }
    /**
     * Create and track fetch request spans
     */
    function fetchCallback(handlerData, shouldCreateSpan, spans) {
        if (!hasTracingEnabled() || !(handlerData.fetchData && shouldCreateSpan(handlerData.fetchData.url))) {
            return;
        }
        if (handlerData.endTimestamp && handlerData.fetchData.__span) {
            var span = spans[handlerData.fetchData.__span];
            if (span) {
                if (handlerData.response) {
                    // TODO (kmclb) remove this once types PR goes through
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    span.setHttpStatus(handlerData.response.status);
                }
                else if (handlerData.error) {
                    span.setStatus(SpanStatus.InternalError);
                }
                span.finish();
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete spans[handlerData.fetchData.__span];
            }
            return;
        }
        var activeTransaction = getActiveTransaction();
        if (activeTransaction) {
            var span = activeTransaction.startChild({
                data: __assign(__assign({}, handlerData.fetchData), { type: 'fetch' }),
                description: handlerData.fetchData.method + " " + handlerData.fetchData.url,
                op: 'http.client',
            });
            handlerData.fetchData.__span = span.spanId;
            spans[span.spanId] = span;
            var request = (handlerData.args[0] = handlerData.args[0]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var options = (handlerData.args[1] = handlerData.args[1] || {});
            var headers = options.headers;
            if (isInstanceOf(request, Request)) {
                headers = request.headers;
            }
            if (headers) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (typeof headers.append === 'function') {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    headers.append('sentry-trace', span.toTraceparent());
                }
                else if (Array.isArray(headers)) {
                    headers = __spread(headers, [['sentry-trace', span.toTraceparent()]]);
                }
                else {
                    headers = __assign(__assign({}, headers), { 'sentry-trace': span.toTraceparent() });
                }
            }
            else {
                headers = { 'sentry-trace': span.toTraceparent() };
            }
            options.headers = headers;
        }
    }
    /**
     * Create and track xhr request spans
     */
    function xhrCallback(handlerData, shouldCreateSpan, spans) {
        var _a, _b;
        if (!hasTracingEnabled() || ((_a = handlerData.xhr) === null || _a === void 0 ? void 0 : _a.__sentry_own_request__) ||
            !(((_b = handlerData.xhr) === null || _b === void 0 ? void 0 : _b.__sentry_xhr__) && shouldCreateSpan(handlerData.xhr.__sentry_xhr__.url))) {
            return;
        }
        var xhr = handlerData.xhr.__sentry_xhr__;
        // check first if the request has finished and is tracked by an existing span which should now end
        if (handlerData.endTimestamp && handlerData.xhr.__sentry_xhr_span_id__) {
            var span = spans[handlerData.xhr.__sentry_xhr_span_id__];
            if (span) {
                span.setHttpStatus(xhr.status_code);
                span.finish();
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete spans[handlerData.xhr.__sentry_xhr_span_id__];
            }
            return;
        }
        // if not, create a new span to track it
        var activeTransaction = getActiveTransaction();
        if (activeTransaction) {
            var span = activeTransaction.startChild({
                data: __assign(__assign({}, xhr.data), { type: 'xhr', method: xhr.method, url: xhr.url }),
                description: xhr.method + " " + xhr.url,
                op: 'http.client',
            });
            handlerData.xhr.__sentry_xhr_span_id__ = span.spanId;
            spans[handlerData.xhr.__sentry_xhr_span_id__] = span;
            if (handlerData.xhr.setRequestHeader) {
                try {
                    handlerData.xhr.setRequestHeader('sentry-trace', span.toTraceparent());
                }
                catch (_) {
                    // Error: InvalidStateError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.
                }
            }
        }
    }

    var global$1 = getGlobalObject();
    /**
     * Default function implementing pageload and navigation transactions
     */
    function instrumentRoutingWithDefaults(customStartTransaction, startTransactionOnPageLoad, startTransactionOnLocationChange) {
        if (startTransactionOnPageLoad === void 0) { startTransactionOnPageLoad = true; }
        if (startTransactionOnLocationChange === void 0) { startTransactionOnLocationChange = true; }
        if (!global$1 || !global$1.location) {
            logger.warn('Could not initialize routing instrumentation due to invalid location');
            return;
        }
        var startingUrl = global$1.location.href;
        var activeTransaction;
        if (startTransactionOnPageLoad) {
            activeTransaction = customStartTransaction({ name: global$1.location.pathname, op: 'pageload' });
        }
        if (startTransactionOnLocationChange) {
            addInstrumentationHandler({
                callback: function (_a) {
                    var to = _a.to, from = _a.from;
                    /**
                     * This early return is there to account for some cases where a navigation transaction starts right after
                     * long-running pageload. We make sure that if `from` is undefined and a valid `startingURL` exists, we don't
                     * create an uneccessary navigation transaction.
                     *
                     * This was hard to duplicate, but this behavior stopped as soon as this fix was applied. This issue might also
                     * only be caused in certain development environments where the usage of a hot module reloader is causing
                     * errors.
                     */
                    if (from === undefined && startingUrl && startingUrl.indexOf(to) !== -1) {
                        startingUrl = undefined;
                        return;
                    }
                    if (from !== to) {
                        startingUrl = undefined;
                        if (activeTransaction) {
                            logger.log("[Tracing] Finishing current transaction with op: " + activeTransaction.op);
                            // If there's an open transaction on the scope, we need to finish it before creating an new one.
                            activeTransaction.finish();
                        }
                        activeTransaction = customStartTransaction({ name: global$1.location.pathname, op: 'navigation' });
                    }
                },
                type: 'history',
            });
        }
    }

    var DEFAULT_MAX_TRANSACTION_DURATION_SECONDS = 600;
    var DEFAULT_BROWSER_TRACING_OPTIONS = __assign({ idleTimeout: DEFAULT_IDLE_TIMEOUT, markBackgroundTransactions: true, maxTransactionDuration: DEFAULT_MAX_TRANSACTION_DURATION_SECONDS, routingInstrumentation: instrumentRoutingWithDefaults, startTransactionOnLocationChange: true, startTransactionOnPageLoad: true }, defaultRequestInstrumentationOptions);
    /**
     * The Browser Tracing integration automatically instruments browser pageload/navigation
     * actions as transactions, and captures requests, metrics and errors as spans.
     *
     * The integration can be configured with a variety of options, and can be extended to use
     * any routing library. This integration uses {@see IdleTransaction} to create transactions.
     */
    var BrowserTracing = /** @class */ (function () {
        function BrowserTracing(_options) {
            /**
             * @inheritDoc
             */
            this.name = BrowserTracing.id;
            this._emitOptionsWarning = false;
            var tracingOrigins = defaultRequestInstrumentationOptions.tracingOrigins;
            // NOTE: Logger doesn't work in constructors, as it's initialized after integrations instances
            if (_options &&
                _options.tracingOrigins &&
                Array.isArray(_options.tracingOrigins) &&
                _options.tracingOrigins.length !== 0) {
                tracingOrigins = _options.tracingOrigins;
            }
            else {
                this._emitOptionsWarning = true;
            }
            this.options = __assign(__assign(__assign({}, DEFAULT_BROWSER_TRACING_OPTIONS), _options), { tracingOrigins: tracingOrigins });
            this._metrics = new MetricsInstrumentation(__assign(__assign({}, DEFAULT_METRICS_INSTR_OPTIONS), this.options._metricOptions));
        }
        /**
         * @inheritDoc
         */
        BrowserTracing.prototype.setupOnce = function (_, getCurrentHub) {
            var _this = this;
            this._getCurrentHub = getCurrentHub;
            if (this._emitOptionsWarning) {
                logger.warn('[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace.');
                logger.warn("[Tracing] We added a reasonable default for you: " + defaultRequestInstrumentationOptions.tracingOrigins);
            }
            // eslint-disable-next-line @typescript-eslint/unbound-method
            var _a = this.options, instrumentRouting = _a.routingInstrumentation, startTransactionOnLocationChange = _a.startTransactionOnLocationChange, startTransactionOnPageLoad = _a.startTransactionOnPageLoad, markBackgroundTransactions = _a.markBackgroundTransactions, traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
            instrumentRouting(function (context) { return _this._createRouteTransaction(context); }, startTransactionOnPageLoad, startTransactionOnLocationChange);
            if (markBackgroundTransactions) {
                registerBackgroundTabDetection();
            }
            instrumentOutgoingRequests({ traceFetch: traceFetch, traceXHR: traceXHR, tracingOrigins: tracingOrigins, shouldCreateSpanForRequest: shouldCreateSpanForRequest });
        };
        /** Create routing idle transaction. */
        BrowserTracing.prototype._createRouteTransaction = function (context) {
            var _this = this;
            if (!this._getCurrentHub) {
                logger.warn("[Tracing] Did not create " + context.op + " transaction because _getCurrentHub is invalid.");
                return undefined;
            }
            // eslint-disable-next-line @typescript-eslint/unbound-method
            var _a = this.options, beforeNavigate = _a.beforeNavigate, idleTimeout = _a.idleTimeout, maxTransactionDuration = _a.maxTransactionDuration;
            var parentContextFromHeader = context.op === 'pageload' ? getHeaderContext() : undefined;
            var expandedContext = __assign(__assign(__assign({}, context), parentContextFromHeader), { trimEnd: true });
            var modifiedContext = typeof beforeNavigate === 'function' ? beforeNavigate(expandedContext) : expandedContext;
            // For backwards compatibility reasons, beforeNavigate can return undefined to "drop" the transaction (prevent it
            // from being sent to Sentry).
            var finalContext = modifiedContext === undefined ? __assign(__assign({}, expandedContext), { sampled: false }) : modifiedContext;
            if (finalContext.sampled === false) {
                logger.log("[Tracing] Will not send " + finalContext.op + " transaction because of beforeNavigate.");
            }
            logger.log("[Tracing] Starting " + finalContext.op + " transaction on scope");
            var hub = this._getCurrentHub();
            var location = getGlobalObject().location;
            var idleTransaction = startIdleTransaction(hub, finalContext, idleTimeout, true, { location: location });
            idleTransaction.registerBeforeFinishCallback(function (transaction, endTimestamp) {
                _this._metrics.addPerformanceEntries(transaction);
                adjustTransactionDuration(secToMs(maxTransactionDuration), transaction, endTimestamp);
            });
            return idleTransaction;
        };
        /**
         * @inheritDoc
         */
        BrowserTracing.id = 'BrowserTracing';
        return BrowserTracing;
    }());
    /**
     * Gets transaction context from a sentry-trace meta.
     *
     * @returns Transaction context data from the header or undefined if there's no header or the header is malformed
     */
    function getHeaderContext() {
        var header = getMetaContent('sentry-trace');
        if (header) {
            return extractTraceparentData(header);
        }
        return undefined;
    }
    /** Returns the value of a meta tag */
    function getMetaContent(metaName) {
        var el = getGlobalObject().document.querySelector("meta[name=" + metaName + "]");
        return el ? el.getAttribute('content') : null;
    }
    /** Adjusts transaction value based on max transaction duration */
    function adjustTransactionDuration(maxDuration, transaction, endTimestamp) {
        var diff = endTimestamp - transaction.startTimestamp;
        var isOutdatedTransaction = endTimestamp && (diff > maxDuration || diff < 0);
        if (isOutdatedTransaction) {
            transaction.setStatus(SpanStatus.DeadlineExceeded);
            transaction.setTag('maxTransactionDurationExceeded', 'true');
        }
    }

    /**
     * Express integration
     *
     * Provides an request and error handler for Express framework as well as tracing capabilities
     */
    var Express = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Express(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = Express.id;
            this._router = options.router || options.app;
            this._methods = (Array.isArray(options.methods) ? options.methods : []).concat('use');
        }
        /**
         * @inheritDoc
         */
        Express.prototype.setupOnce = function () {
            if (!this._router) {
                logger.error('ExpressIntegration is missing an Express instance');
                return;
            }
            instrumentMiddlewares(this._router, this._methods);
        };
        /**
         * @inheritDoc
         */
        Express.id = 'Express';
        return Express;
    }());
    /**
     * Wraps original middleware function in a tracing call, which stores the info about the call as a span,
     * and finishes it once the middleware is done invoking.
     *
     * Express middlewares have 3 various forms, thus we have to take care of all of them:
     * // sync
     * app.use(function (req, res) { ... })
     * // async
     * app.use(function (req, res, next) { ... })
     * // error handler
     * app.use(function (err, req, res, next) { ... })
     *
     * They all internally delegate to the `router[method]` of the given application instance.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    function wrap$1(fn, method) {
        var arity = fn.length;
        switch (arity) {
            case 2: {
                return function (req, res) {
                    var transaction = res.__sentry_transaction;
                    if (transaction) {
                        var span_1 = transaction.startChild({
                            description: fn.name,
                            op: "middleware." + method,
                        });
                        res.once('finish', function () {
                            span_1.finish();
                        });
                    }
                    return fn.call(this, req, res);
                };
            }
            case 3: {
                return function (req, res, next) {
                    var _a;
                    var transaction = res.__sentry_transaction;
                    var span = (_a = transaction) === null || _a === void 0 ? void 0 : _a.startChild({
                        description: fn.name,
                        op: "middleware." + method,
                    });
                    fn.call(this, req, res, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var _a;
                        (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                        next.call.apply(next, __spread([this], args));
                    });
                };
            }
            case 4: {
                return function (err, req, res, next) {
                    var _a;
                    var transaction = res.__sentry_transaction;
                    var span = (_a = transaction) === null || _a === void 0 ? void 0 : _a.startChild({
                        description: fn.name,
                        op: "middleware." + method,
                    });
                    fn.call(this, err, req, res, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var _a;
                        (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                        next.call.apply(next, __spread([this], args));
                    });
                };
            }
            default: {
                throw new Error("Express middleware takes 2-4 arguments. Got: " + arity);
            }
        }
    }
    /**
     * Takes all the function arguments passed to the original `app` or `router` method, eg. `app.use` or `router.use`
     * and wraps every function, as well as array of functions with a call to our `wrap` method.
     * We have to take care of the arrays as well as iterate over all of the arguments,
     * as `app.use` can accept middlewares in few various forms.
     *
     * app.use([<path>], <fn>)
     * app.use([<path>], <fn>, ...<fn>)
     * app.use([<path>], ...<fn>[])
     */
    function wrapMiddlewareArgs(args, method) {
        return args.map(function (arg) {
            if (typeof arg === 'function') {
                return wrap$1(arg, method);
            }
            if (Array.isArray(arg)) {
                return arg.map(function (a) {
                    if (typeof a === 'function') {
                        return wrap$1(a, method);
                    }
                    return a;
                });
            }
            return arg;
        });
    }
    /**
     * Patches original router to utilize our tracing functionality
     */
    function patchMiddleware(router, method) {
        var originalCallback = router[method];
        router[method] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return originalCallback.call.apply(originalCallback, __spread([this], wrapMiddlewareArgs(args, method)));
        };
        return router;
    }
    /**
     * Patches original router methods
     */
    function instrumentMiddlewares(router, methods) {
        if (methods === void 0) { methods = []; }
        methods.forEach(function (method) { return patchMiddleware(router, method); });
    }

    /** Tracing integration for node-postgres package */
    var Postgres = /** @class */ (function () {
        function Postgres(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = Postgres.id;
            this._usePgNative = !!options.usePgNative;
        }
        /**
         * @inheritDoc
         */
        Postgres.prototype.setupOnce = function (_, getCurrentHub) {
            var _a;
            var pkg = loadModule('pg');
            if (!pkg) {
                logger.error('Postgres Integration was unable to require `pg` package.');
                return;
            }
            if (this._usePgNative && !((_a = pkg.native) === null || _a === void 0 ? void 0 : _a.Client)) {
                logger.error("Postgres Integration was unable to access 'pg-native' bindings.");
                return;
            }
            var Client = (this._usePgNative ? pkg.native : pkg).Client;
            /**
             * function (query, callback) => void
             * function (query, params, callback) => void
             * function (query) => Promise
             * function (query, params) => Promise
             * function (pg.Cursor) => pg.Cursor
             */
            fill(Client.prototype, 'query', function (orig) {
                return function (config, values, callback) {
                    var _a, _b, _c;
                    var scope = getCurrentHub().getScope();
                    var parentSpan = (_a = scope) === null || _a === void 0 ? void 0 : _a.getSpan();
                    var span = (_b = parentSpan) === null || _b === void 0 ? void 0 : _b.startChild({
                        description: typeof config === 'string' ? config : config.text,
                        op: "db",
                    });
                    if (typeof callback === 'function') {
                        return orig.call(this, config, values, function (err, result) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            callback(err, result);
                        });
                    }
                    if (typeof values === 'function') {
                        return orig.call(this, config, function (err, result) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            values(err, result);
                        });
                    }
                    var rv = typeof values !== 'undefined' ? orig.call(this, config, values) : orig.call(this, config);
                    if (isThenable(rv)) {
                        return rv.then(function (res) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            return res;
                        });
                    }
                    (_c = span) === null || _c === void 0 ? void 0 : _c.finish();
                    return rv;
                };
            });
        };
        /**
         * @inheritDoc
         */
        Postgres.id = 'Postgres';
        return Postgres;
    }());

    /** Tracing integration for node-mysql package */
    var Mysql = /** @class */ (function () {
        function Mysql() {
            /**
             * @inheritDoc
             */
            this.name = Mysql.id;
        }
        /**
         * @inheritDoc
         */
        Mysql.prototype.setupOnce = function (_, getCurrentHub) {
            var pkg = loadModule('mysql/lib/Connection.js');
            if (!pkg) {
                logger.error('Mysql Integration was unable to require `mysql` package.');
                return;
            }
            // The original function will have one of these signatures:
            //    function (callback) => void
            //    function (options, callback) => void
            //    function (options, values, callback) => void
            fill(pkg, 'createQuery', function (orig) {
                return function (options, values, callback) {
                    var _a, _b;
                    var scope = getCurrentHub().getScope();
                    var parentSpan = (_a = scope) === null || _a === void 0 ? void 0 : _a.getSpan();
                    var span = (_b = parentSpan) === null || _b === void 0 ? void 0 : _b.startChild({
                        description: typeof options === 'string' ? options : options.sql,
                        op: "db",
                    });
                    if (typeof callback === 'function') {
                        return orig.call(this, options, values, function (err, result, fields) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            callback(err, result, fields);
                        });
                    }
                    if (typeof values === 'function') {
                        return orig.call(this, options, function (err, result, fields) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            values(err, result, fields);
                        });
                    }
                    return orig.call(this, options, values, callback);
                };
            });
        };
        /**
         * @inheritDoc
         */
        Mysql.id = 'Mysql';
        return Mysql;
    }());

    var OPERATIONS = [
        'aggregate',
        'bulkWrite',
        'countDocuments',
        'createIndex',
        'createIndexes',
        'deleteMany',
        'deleteOne',
        'distinct',
        'drop',
        'dropIndex',
        'dropIndexes',
        'estimatedDocumentCount',
        'find',
        'findOne',
        'findOneAndDelete',
        'findOneAndReplace',
        'findOneAndUpdate',
        'indexes',
        'indexExists',
        'indexInformation',
        'initializeOrderedBulkOp',
        'insertMany',
        'insertOne',
        'isCapped',
        'mapReduce',
        'options',
        'parallelCollectionScan',
        'rename',
        'replaceOne',
        'stats',
        'updateMany',
        'updateOne',
    ];
    // All of the operations above take `options` and `callback` as their final parameters, but some of them
    // take additional parameters as well. For those operations, this is a map of
    // { <operation name>:  [<names of additional parameters>] }, as a way to know what to call the operation's
    // positional arguments when we add them to the span's `data` object later
    var OPERATION_SIGNATURES = {
        // aggregate intentionally not included because `pipeline` arguments are too complex to serialize well
        // see https://github.com/getsentry/sentry-javascript/pull/3102
        bulkWrite: ['operations'],
        countDocuments: ['query'],
        createIndex: ['fieldOrSpec'],
        createIndexes: ['indexSpecs'],
        deleteMany: ['filter'],
        deleteOne: ['filter'],
        distinct: ['key', 'query'],
        dropIndex: ['indexName'],
        find: ['query'],
        findOne: ['query'],
        findOneAndDelete: ['filter'],
        findOneAndReplace: ['filter', 'replacement'],
        findOneAndUpdate: ['filter', 'update'],
        indexExists: ['indexes'],
        insertMany: ['docs'],
        insertOne: ['doc'],
        mapReduce: ['map', 'reduce'],
        rename: ['newName'],
        replaceOne: ['filter', 'doc'],
        updateMany: ['filter', 'update'],
        updateOne: ['filter', 'update'],
    };
    /** Tracing integration for mongo package */
    var Mongo = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Mongo(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = Mongo.id;
            this._operations = Array.isArray(options.operations)
                ? options.operations
                : OPERATIONS;
            this._describeOperations = 'describeOperations' in options ? options.describeOperations : true;
            this._useMongoose = !!options.useMongoose;
        }
        /**
         * @inheritDoc
         */
        Mongo.prototype.setupOnce = function (_, getCurrentHub) {
            var moduleName = this._useMongoose ? 'mongoose' : 'mongodb';
            var pkg = loadModule(moduleName);
            if (!pkg) {
                logger.error("Mongo Integration was unable to require `" + moduleName + "` package.");
                return;
            }
            this._instrumentOperations(pkg.Collection, this._operations, getCurrentHub);
        };
        /**
         * Patches original collection methods
         */
        Mongo.prototype._instrumentOperations = function (collection, operations, getCurrentHub) {
            var _this = this;
            operations.forEach(function (operation) { return _this._patchOperation(collection, operation, getCurrentHub); });
        };
        /**
         * Patches original collection to utilize our tracing functionality
         */
        Mongo.prototype._patchOperation = function (collection, operation, getCurrentHub) {
            if (!(operation in collection.prototype))
                return;
            var getSpanContext = this._getSpanContextFromOperationArguments.bind(this);
            fill(collection.prototype, operation, function (orig) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _a, _b, _c, _d;
                    var lastArg = args[args.length - 1];
                    var scope = getCurrentHub().getScope();
                    var parentSpan = (_a = scope) === null || _a === void 0 ? void 0 : _a.getSpan();
                    // Check if the operation was passed a callback. (mapReduce requires a different check, as
                    // its (non-callback) arguments can also be functions.)
                    if (typeof lastArg !== 'function' || (operation === 'mapReduce' && args.length === 2)) {
                        var span_1 = (_b = parentSpan) === null || _b === void 0 ? void 0 : _b.startChild(getSpanContext(this, operation, args));
                        var maybePromise = orig.call.apply(orig, __spread([this], args));
                        if (isThenable(maybePromise)) {
                            return maybePromise.then(function (res) {
                                var _a;
                                (_a = span_1) === null || _a === void 0 ? void 0 : _a.finish();
                                return res;
                            });
                        }
                        else {
                            (_c = span_1) === null || _c === void 0 ? void 0 : _c.finish();
                            return maybePromise;
                        }
                    }
                    var span = (_d = parentSpan) === null || _d === void 0 ? void 0 : _d.startChild(getSpanContext(this, operation, args.slice(0, -1)));
                    return orig.call.apply(orig, __spread([this], args.slice(0, -1), [function (err, result) {
                            var _a;
                            (_a = span) === null || _a === void 0 ? void 0 : _a.finish();
                            lastArg(err, result);
                        }]));
                };
            });
        };
        /**
         * Form a SpanContext based on the user input to a given operation.
         */
        Mongo.prototype._getSpanContextFromOperationArguments = function (collection, operation, args) {
            var data = {
                collectionName: collection.collectionName,
                dbName: collection.dbName,
                namespace: collection.namespace,
            };
            var spanContext = {
                op: "db",
                description: operation,
                data: data,
            };
            // If the operation takes no arguments besides `options` and `callback`, or if argument
            // collection is disabled for this operation, just return early.
            var signature = OPERATION_SIGNATURES[operation];
            var shouldDescribe = Array.isArray(this._describeOperations)
                ? this._describeOperations.includes(operation)
                : this._describeOperations;
            if (!signature || !shouldDescribe) {
                return spanContext;
            }
            try {
                // Special case for `mapReduce`, as the only one accepting functions as arguments.
                if (operation === 'mapReduce') {
                    var _a = __read(args, 2), map = _a[0], reduce = _a[1];
                    data[signature[0]] = typeof map === 'string' ? map : map.name || '<anonymous>';
                    data[signature[1]] = typeof reduce === 'string' ? reduce : reduce.name || '<anonymous>';
                }
                else {
                    for (var i = 0; i < signature.length; i++) {
                        data[signature[i]] = JSON.stringify(args[i]);
                    }
                }
            }
            catch (_oO) {
                // no-empty
            }
            return spanContext;
        };
        /**
         * @inheritDoc
         */
        Mongo.id = 'Mongo';
        return Mongo;
    }());

    var TracingIntegrations = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Express: Express,
        Postgres: Postgres,
        Mysql: Mysql,
        Mongo: Mongo
    });

    var Integrations = __assign(__assign({}, TracingIntegrations), { BrowserTracing: BrowserTracing });
    // We are patching the global object with our hub extension methods
    addExtensionMethods();

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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
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
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
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

    // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
    // at the end of hydration without touching the remaining nodes.
    let is_hydrating = false;
    function start_hydrating() {
        is_hydrating = true;
    }
    function end_hydrating() {
        is_hydrating = false;
    }
    function upper_bound(low, high, key, value) {
        // Return first index of value larger than input value in the range [low, high)
        while (low < high) {
            const mid = low + ((high - low) >> 1);
            if (key(mid) <= value) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return low;
    }
    function init_hydrate(target) {
        if (target.hydrate_init)
            return;
        target.hydrate_init = true;
        // We know that all children have claim_order values since the unclaimed have been detached
        const children = target.childNodes;
        /*
        * Reorder claimed children optimally.
        * We can reorder claimed children optimally by finding the longest subsequence of
        * nodes that are already claimed in order and only moving the rest. The longest
        * subsequence subsequence of nodes that are claimed in order can be found by
        * computing the longest increasing subsequence of .claim_order values.
        *
        * This algorithm is optimal in generating the least amount of reorder operations
        * possible.
        *
        * Proof:
        * We know that, given a set of reordering operations, the nodes that do not move
        * always form an increasing subsequence, since they do not move among each other
        * meaning that they must be already ordered among each other. Thus, the maximal
        * set of nodes that do not move form a longest increasing subsequence.
        */
        // Compute longest increasing subsequence
        // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
        const m = new Int32Array(children.length + 1);
        // Predecessor indices + 1
        const p = new Int32Array(children.length);
        m[0] = -1;
        let longest = 0;
        for (let i = 0; i < children.length; i++) {
            const current = children[i].claim_order;
            // Find the largest subsequence length such that it ends in a value less than our current value
            // upper_bound returns first greater value, so we subtract one
            const seqLen = upper_bound(1, longest + 1, idx => children[m[idx]].claim_order, current) - 1;
            p[i] = m[seqLen] + 1;
            const newLen = seqLen + 1;
            // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
            m[newLen] = i;
            longest = Math.max(newLen, longest);
        }
        // The longest increasing subsequence of nodes (initially reversed)
        const lis = [];
        // The rest of the nodes, nodes that will be moved
        const toMove = [];
        let last = children.length - 1;
        for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
            lis.push(children[cur - 1]);
            for (; last >= cur; last--) {
                toMove.push(children[last]);
            }
            last--;
        }
        for (; last >= 0; last--) {
            toMove.push(children[last]);
        }
        lis.reverse();
        // We sort the nodes being moved to guarantee that their insertion order matches the claim order
        toMove.sort((a, b) => a.claim_order - b.claim_order);
        // Finally, we move the nodes
        for (let i = 0, j = 0; i < toMove.length; i++) {
            while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
                j++;
            }
            const anchor = j < lis.length ? lis[j] : null;
            target.insertBefore(toMove[i], anchor);
        }
    }
    function append(target, node) {
        if (is_hydrating) {
            init_hydrate(target);
            if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
                target.actual_end_child = target.firstChild;
            }
            if (node !== target.actual_end_child) {
                target.insertBefore(node, target.actual_end_child);
            }
            else {
                target.actual_end_child = node.nextSibling;
            }
        }
        else if (node.parentNode !== target) {
            target.appendChild(node);
        }
    }
    function insert(target, node, anchor) {
        if (is_hydrating && !anchor) {
            append(target, node);
        }
        else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
            target.insertBefore(node, anchor || null);
        }
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
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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
    function self$1(fn) {
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
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
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
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
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
            set_current_component(null);
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

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
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
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
        }
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
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
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
                start_hydrating();
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            end_hydrating();
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
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
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.3' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
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
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
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
            subscribe: writable$1(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable$1(value, start = noop) {
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

    const newWorker = writable$1({});
    const updateFound = writable$1(false);

    async function registerServiceWorker() {
        if (window.navigator === undefined) return;
        if (navigator.serviceWorker === undefined) return;
        const { serviceWorker } = navigator;
        
        let registration = await serviceWorker.register("./serviceWorker.js");
        window.registration = registration;

        console.log("Success", registration);

        registration.addEventListener("updateFound", () => {
            newWorker.set(registration.installing);
            newWorker.get().addEventListener("statechange", () => {
                if (newWorker.get().state === "installed") {
                    updateFound.set(true);
                }
            });
        });

        // let i = await serviceWorker.ready;
        // await i.periodicSync.register('test', {
        //     minInterval: 15 * 1000,
        // });
    }

    /* src/components/HeaderButton.svelte generated by Svelte v3.38.3 */
    const file$H = "src/components/HeaderButton.svelte";

    function create_fragment$N(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-sl3g4n");
    			add_location(span, file$H, 1, 4, 53);
    			attr_dev(button, "class", "headerButton svelte-sl3g4n");
    			add_location(button, file$H, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*onClick*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-sl3g4n")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$N.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$N($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HeaderButton", slots, []);
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

    	$$self.$$set = $$props => {
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
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, { icon: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeaderButton",
    			options,
    			id: create_fragment$N.name
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

    /* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.38.3 */

    const { Error: Error_1, Object: Object_1$2 } = globals;

    // (185:0) {:else}
    function create_else_block$4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
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
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(185:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (183:0) {#if componentParams}
    function create_if_block$d(ctx) {
    	let switch_instance;
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
    		switch_instance = new switch_value(switch_props(ctx));
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
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(183:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$M(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$d, create_else_block$4];
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
    				} else {
    					if_block.p(ctx, dirty);
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
    		id: create_fragment$M.name,
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

    const location$1 = derived(loc, $loc => $loc.location);
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

    function instance$M($$self, $$props, $$invalidate) {
    	let $loc,
    		$$unsubscribe_loc = noop;

    	validate_store(loc, "loc");
    	component_subscribe($$self, loc, $$value => $$invalidate(4, $loc = $$value));
    	$$self.$$.on_destroy.push(() => $$unsubscribe_loc());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Router", slots, []);
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

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("routes" in $$props) $$invalidate(2, routes = $$props.routes);
    		if ("prefix" in $$props) $$invalidate(3, prefix = $$props.prefix);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		derived,
    		wrap,
    		getLocation,
    		loc,
    		location: location$1,
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

    	return [component, componentParams, routes, prefix, $loc];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, { routes: 2, prefix: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$M.name
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

    /* src/components/MenuButton.svelte generated by Svelte v3.38.3 */
    const file$G = "src/components/MenuButton.svelte";

    function create_fragment$L(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let t;
    	let button_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-odpywm");
    			add_location(span, file$G, 1, 4, 84);
    			attr_dev(button, "class", button_class_value = "menuButton " + (/*isCurrentPage*/ ctx[1] ? "current" : "") + " svelte-odpywm");
    			add_location(button, file$G, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*onClick*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-odpywm")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*isCurrentPage*/ 2 && button_class_value !== (button_class_value = "menuButton " + (/*isCurrentPage*/ ctx[1] ? "current" : "") + " svelte-odpywm")) {
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
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$L($$self, $$props, $$invalidate) {
    	let isCurrentPage;
    	let $location;
    	validate_store(location$1, "location");
    	component_subscribe($$self, location$1, $$value => $$invalidate(4, $location = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MenuButton", slots, ['default']);
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

    	$$self.$$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("path" in $$props) $$invalidate(3, path = $$props.path);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		location: location$1,
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

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, $location*/ 24) {
    			// Computed
    			$$invalidate(1, isCurrentPage = path === $location);
    		}
    	};

    	return [icon, isCurrentPage, onClick, path, $location, $$scope, slots];
    }

    class MenuButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, { icon: 0, path: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuButton",
    			options,
    			id: create_fragment$L.name
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

    /* src/components/Header.svelte generated by Svelte v3.38.3 */
    const file$F = "src/components/Header.svelte";

    // (10:8) <MenuButton icon="compass-outline" on:click={closeMenu} path="/">
    function create_default_slot_2$5(ctx) {
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
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(10:8) <MenuButton icon=\\\"compass-outline\\\" on:click={closeMenu} path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (11:8) <MenuButton icon="bookmark-multiple-outline" on:click={closeMenu} path="/addressbook">
    function create_default_slot_1$a(ctx) {
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
    		id: create_default_slot_1$a.name,
    		type: "slot",
    		source: "(11:8) <MenuButton icon=\\\"bookmark-multiple-outline\\\" on:click={closeMenu} path=\\\"/addressbook\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:8) <MenuButton icon="cog-outline" on:click={closeMenu} path="/settings">
    function create_default_slot$e(ctx) {
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
    		id: create_default_slot$e.name,
    		type: "slot",
    		source: "(12:8) <MenuButton icon=\\\"cog-outline\\\" on:click={closeMenu} path=\\\"/settings\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$K(ctx) {
    	let header;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let headerbutton0;
    	let t1;
    	let div1;
    	let headerbutton1;
    	let t2;
    	let div2;
    	let menubutton0;
    	let t3;
    	let menubutton1;
    	let t4;
    	let menubutton2;
    	let header_class_value;
    	let t5;
    	let div3;
    	let div3_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	headerbutton0 = new HeaderButton({ props: { icon: "menu" }, $$inline: true });
    	headerbutton0.$on("click", /*toggleMenuOpen*/ ctx[1]);

    	headerbutton1 = new HeaderButton({
    			props: { icon: "magnify" },
    			$$inline: true
    		});

    	menubutton0 = new MenuButton({
    			props: {
    				icon: "compass-outline",
    				path: "/",
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menubutton0.$on("click", /*closeMenu*/ ctx[2]);

    	menubutton1 = new MenuButton({
    			props: {
    				icon: "bookmark-multiple-outline",
    				path: "/addressbook",
    				$$slots: { default: [create_default_slot_1$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menubutton1.$on("click", /*closeMenu*/ ctx[2]);

    	menubutton2 = new MenuButton({
    			props: {
    				icon: "cog-outline",
    				path: "/settings",
    				$$slots: { default: [create_default_slot$e] },
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
    			attr_dev(img, "class", "svelte-r3b23v");
    			add_location(img, file$F, 1, 4, 62);
    			attr_dev(div0, "class", "leftButtons svelte-r3b23v");
    			add_location(div0, file$F, 2, 4, 108);
    			attr_dev(div1, "class", "rightButtons svelte-r3b23v");
    			add_location(div1, file$F, 5, 4, 214);
    			attr_dev(div2, "class", "menuContent svelte-r3b23v");
    			add_location(div2, file$F, 8, 4, 298);
    			attr_dev(header, "class", header_class_value = "" + (null_to_empty(/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-r3b23v"));
    			attr_dev(header, "id", "mainHeader");
    			add_location(header, file$F, 0, 0, 0);
    			attr_dev(div3, "class", div3_class_value = "menuScim " + (/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-r3b23v");
    			add_location(div3, file$F, 14, 0, 664);
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

    			if (!mounted) {
    				dispose = listen_dev(div3, "click", self$1(/*closeMenu*/ ctx[2]), false, false, false);
    				mounted = true;
    			}
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

    			if (!current || dirty & /*menuOpen*/ 1 && header_class_value !== (header_class_value = "" + (null_to_empty(/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-r3b23v"))) {
    				attr_dev(header, "class", header_class_value);
    			}

    			if (!current || dirty & /*menuOpen*/ 1 && div3_class_value !== (div3_class_value = "menuScim " + (/*menuOpen*/ ctx[0] ? "open" : "") + " svelte-r3b23v")) {
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
    			mounted = false;
    			dispose();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, []);
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
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$K.name
    		});
    	}
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

    function writable(data) {
        var store = writable$1(data);
        prepareStore(store);

        return store;
    }

    function writableLinked(location, data) {
        location = "aut-ov-" + location;

        var store = writable$1(data);
        prepareStoreLinked(store, location);

        return store;
    }

    const locationStore = writable$1({
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

            navigator.geolocation.getCurrentPosition(position => {
                locationStore.set(readToLocation(position));
            });
        }
    }

    function isValidPosition(position) {
        let { lat, long } = position;

        if (lat === 0 && long === 0) return false;
        else return true;
    }

    function getDirectDistance$1(positionA, positionB) {
        let positionAValid = isValidPosition(positionA);
        let positionBValid = isValidPosition(positionB);

        if (!positionAValid || !positionBValid) return Infinity;

        let differenceLat = Math.abs(positionA.lat - positionB.lat);
        let differenceLong = Math.abs(positionA.long - positionB.long);

        let directDistance = Math.sqrt(differenceLat ** 2 + differenceLong ** 2);

        return directDistance;
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

    const currentLocationAddress = {
        name: "Huidige locatie",
        id: "currentLocation",
        icon: "crosshairs-gps",
        canBeDeleted: false,
        address: "Gebruik GPS locatie",
        get location() {
            return locationStore.get();
        },
    };

    const autoAddress = {
        name: "Auto",
        id: "auto",
        icon: "arrow-decision-auto-outline",
        canBeDeleted: false,
        get address() {
            return getAutoAddress().address + " (auto)";
        },
        get location() {
            return getAutoAddress().location;
        }
    };

    const unsetAddress = {
        name: "Geen locatie",
        id: "invalid",
        icon: "map-marker-remove-outline",
        canBeDeleted: false,
        address: "Geen address geselecteerd",
        location: {
            lat: 0,
            long: 0,
        },
    };

    // Function for later use when you can add more addresses to the address book
    function getStoredAddresses() {
        return getAutoAddresses();
    }

    function getAutoAddresses() {
        let addresses = [];
        let storedLocations = addressStore.get();

        if (isValidPosition(storedLocations.home.location)) {
            addresses.push(storedLocations.home);
        }

        if (isValidPosition(storedLocations.work.location)) {
            addresses.push(storedLocations.work);
        }

        return addresses;
    }

    function getStartAddresses() {
        return [
            currentLocationAddress,
            ...getStoredAddresses(),
        ];
    }

    function getEndAddresses() {
        let autoAddresses = getAutoAddresses();

        let addresses = [];

        if (autoAddresses.length === 2) {
            addresses.push(autoAddress);
        }

        addresses = [
            ...addresses,
            ...getStoredAddresses(),
        ];

        return addresses;
    }

    function getAddressById(id) {
        if (id === "auto") {
            return getAutoAddress();
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

    function getAutoAddress() {
        let addresses = addressStore.get();
        let home = addresses.home;
        let work = addresses.work;

        home.id = "home";
        work.id = "work";

        let homeLocation = home.location;
        let workLocation = work.location;
        let currentLocation = locationStore.get();

        let directDistanceHome = getDirectDistance$1(homeLocation, currentLocation);
        let directDistanceWork = getDirectDistance$1(workLocation, currentLocation);

        return directDistanceHome < directDistanceWork ? addresses.work : addresses.home;
    }

    function getAddresses() {
        let addresses = addressStore.get();

        return Object.entries(addresses)
            .map(([key, value]) => {
                return {
                    canBeDeleted: true,
                    id: key,
                    ...value,
                }
            });
    }

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

    const baseURL = "https://aut-ns-backend-rster2002.vercel.app";
    // const baseURL = "http://localhost:5000";
    const ignoreCache = false;

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

    async function gql(queryParts, variables = {}) {
        let query = queryParts.join("");
        return await graphQLRequest(query, variables);
    }

    // Stores
    const fromIdStore = writableLinked("fromId", "currentLocation");
    writableLinked("toId", "auto");
    const routeStore$1 = writableLinked("currentRoute", {});

    const availableTripsStore = writable([]);
    writable({
        address: "auto",
    });

    async function getTrips(startLocation, endLocation) {
        if (!isValidPosition(startLocation)) return;
        if (!isValidPosition(endLocation)) return;

        let response = await gql`
        ${{
            fromLat: startLocation.lat,
            fromLong: startLocation.long,
            toLat: endLocation.lat,
            toLong: endLocation.long,
        }}

        query($fromLat: Float!, $fromLong: Float!, $toLat: Float!, $toLong: Float!) {
            tripsFromLocations(fromLat: $fromLat, fromLong: $fromLong, toLat: $toLat, toLong: $toLong) {
                status
                trips {
                    departureTime {
                        timestamp
                    }
                    arrivalTime {
                        timestamp
                    }
                    travelDuration {
                        string
                    }
                    toAddress {
                        streetName
                    }
                    steps {
                        randomId
                        travelMode
                        instructions
                        travelDuration {
                            seconds
                        }
                        fromLocation {
                            lat
                            long
                        }
                        toLocation {
                            lat
                            long
                        }
                        polyline
                        ... on TrainStep {
                            trainId
                            departureTime {
                                timestamp
                            }
                            arrivalTime {
                                timestamp
                            }
                            transitColor {
                                background
                                foreground
                            }
                            journeyRefreshId
                            journey {
                                cancelled
                            }
                            fromStation {
                                id
                                name
                            }
                            toStation {
                                id
                                name
                            }
                        }
                        ... on BusStep {
                            lineNumber
                            departureTime {
                                timestamp
                            }
                            arrivalTime {
                                timestamp
                            }
                            transitColor {
                                background
                                foreground
                            }
                            fromBusStop {
                                id
                                name
                            }
                            toBusStop {
                                id
                                name
                            }
                            refreshId
                        }
                    }
                }
            }
        }
    `;

        return response.data.tripsFromLocations.trips;
    }

    function getTripFromAddress() {
        var id = fromIdStore.get();
        return getAddressById(id);
    }

    const maxAge = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const tempStore = writableLinked("tempStore", {});

    tempStore.put = (key, value) => {
        tempStore.update(contents => {
            contents[key] = {
                timestamp: Date.now(),
                value,
            };
        });
    };

    const linkedGet = tempStore.get;
    tempStore.get = (key) => {
        tempStore.refresh();
        return linkedGet()[key];
    };

    tempStore.refresh = () => {
        let now = Date.now();

        tempStore.update(contents => {
            return Object.fromEntries(
                Object.entries(contents).filter(([key, value]) => {
                    return value.timestamp + maxAge < now;
                })
            )
        });
    };

    const memoizationStore = writableLinked("memoization", {});

    const waiting = {};

    function checkWatchList() {
        let now = Date.now();

        Object.entries(waiting).forEach(([key, item]) => {
            if (item.pollAfterTimestamp < now) {
                delete waiting[key];
                item.execute();
            }
        });
    }

    setInterval(checkWatchList, 1000);

    function createPoller(options = {}) {
        options = {
            shouldStart: true,
            variables: {},
            memoization: true,
            ...options,
        };

        let started = true;
        let currentToken = tempStore.get(options.id) || options.initialToken;

        // Internal function for sending the request to the server and handling the result
        const performRequest = async () => {
            let variables = {
                token: currentToken,
                ...instance.variables,
            };

            // Get the result from the response
            let { data } = await gql([options.query], variables);
            let result = data[options.key];

            // If memoization is enabled, the response is saved
            if (options.memoization) {
                result.pollAfterTimestamp = Date.now() + result.pollAfter;

                memoizationStore.update(memoizationMap => {
                    if (options.memoizationTags !== undefined) {
                        result.memoizationTags = options.memoizationTags;
                    }

                    memoizationMap[options.memoization] = result;
                    return memoizationMap;
                });
            }

            // Call the listener
            options.onData(result, instance);

            // Check if the poller should poll again later
            if (result.shouldPoll && started) {
                currentToken = result.refreshId;

                tempStore.put(options.id, currentToken);
                waiting[options.id] = {
                    pollAfterTimestamp: Date.now() + result.pollAfter,
                    execute: () => performRequest(),
                };
            }
        };

        // The actual poller object
        let instance = {
            variables: options.variables,
            start() {
                started = true;

                // If memoization is not enabled, start the request loop
                if (options.memoization) {
                    performRequest();
                    return;
                }

                // Check if there's any data already memorized and if not, start the request loop
                let data = memoizationStore.get()[options.memoization];
                if (data === undefined) {
                    performRequest();
                    return;
                }

                // Set the current token to the last memoized value and call the callback for initial data
                currentToken = data.refreshId;
                tempStore.put(options.id, currentToken);
                options.onData(data, instance);

                // Check if the request should be performed immediately
                if (data.pollAfterTimestamp < Date.now()) {
                    performRequest();
                } else {
                    waiting[options.id] = {
                        pollAfterTimestamp,
                        execute: () => performRequest(),
                    };
                }
            },
            stop() {
                delete waiting[options.id];
                started = false;
            },
        };

        if (options.shouldStart) {
            instance.start();
        }

        return instance;
    }

    function deleteMemoizationValuesByTag(tag) {
        memoizationStore.update(memoizationMap => {
            let entries = Object.entries(memoizationMap);

            for (let [key, value] of entries) {
                if (value.memoizationTags !== undefined && value.memoizationTags.includes(tag)) {
                    delete memoizationMap[key];
                }
            }

            return memoizationMap;
        });
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

    function getCurrentStep$1(route) {
        if (route?.steps === undefined || route?.steps?.length === 0 || !locationIsValid()) return {};

        var { lat, long } = locationStore.get();
        var polyline = getGlobalPolyline$1(route);

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

    function getGlobalPolyline$1(route) {
        return route?.steps?.map?.(step => {
                var points = decodeGoogleMapPolyline(step.polyline);

                return points.map(point => {
                    return {
                        ...point,
                        step,
                    }
                });
            })
            .flat(1);
    }

    /* src/components/RouteStep/Walking.svelte generated by Svelte v3.38.3 */

    const file$E = "src/components/RouteStep/Walking.svelte";

    function create_fragment$J(ctx) {
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
    			add_location(span, file$E, 0, 0, 0);
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
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	let durationInMinutes;
    	let minuteText;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Walking", slots, []);
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Walking> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({ step, durationInMinutes, minuteText });

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("durationInMinutes" in $$props) $$invalidate(0, durationInMinutes = $$props.durationInMinutes);
    		if ("minuteText" in $$props) $$invalidate(1, minuteText = $$props.minuteText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 4) {
    			// Computed
    			$$invalidate(0, durationInMinutes = Math.round(step.travelDuration.seconds / 60));
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
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, { step: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Walking",
    			options,
    			id: create_fragment$J.name
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

    function timestampToString(timestamp) {
        let date = new Date(timestamp);

        let minutes = date.getMinutes();
        let minutesString = String(minutes).padStart(2, "0");

        let hours = date.getHours();
        let hoursString = String(hours).padStart(2, "0");

        return `${hoursString}:${minutesString}`;
    }

    // import { stationLocations, stationsFullDetails } from "@/js/dataUtils.js";

    const facilityIconMap = {
        wifiPresent: "wifi-strength-4",
        toilet: "human-male-female",
        silentCompartment: "volume-mute",
        bicyclesPermitted: "bicycle",
        outlets: "power-socket-eu",
        accessible: "wheelchair-accessibility",
    };

    function getFacilityIcon(facility) {
        return facilityIconMap[facility];
    }

    /* src/components/Misc/InfoRow.svelte generated by Svelte v3.38.3 */

    const file$D = "src/components/Misc/InfoRow.svelte";
    const get_right_slot_changes = dirty => ({});
    const get_right_slot_context = ctx => ({});
    const get_center_slot_changes = dirty => ({});
    const get_center_slot_context = ctx => ({});
    const get_left_slot_changes = dirty => ({});
    const get_left_slot_context = ctx => ({});

    function create_fragment$I(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let span;
    	let t1;
    	let div1;
    	let current;
    	const left_slot_template = /*#slots*/ ctx[1].left;
    	const left_slot = create_slot(left_slot_template, ctx, /*$$scope*/ ctx[0], get_left_slot_context);
    	const center_slot_template = /*#slots*/ ctx[1].center;
    	const center_slot = create_slot(center_slot_template, ctx, /*$$scope*/ ctx[0], get_center_slot_context);
    	const right_slot_template = /*#slots*/ ctx[1].right;
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
    			attr_dev(div0, "class", "left svelte-9b3pdi");
    			add_location(div0, file$D, 1, 4, 26);
    			attr_dev(span, "class", "center svelte-9b3pdi");
    			add_location(span, file$D, 4, 4, 89);
    			attr_dev(div1, "class", "right svelte-9b3pdi");
    			add_location(div1, file$D, 7, 4, 158);
    			attr_dev(div2, "class", "infoRow svelte-9b3pdi");
    			add_location(div2, file$D, 0, 0, 0);
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
    			if (left_slot) {
    				if (left_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(left_slot, left_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, get_left_slot_changes, get_left_slot_context);
    				}
    			}

    			if (center_slot) {
    				if (center_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(center_slot, center_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, get_center_slot_changes, get_center_slot_context);
    				}
    			}

    			if (right_slot) {
    				if (right_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(right_slot, right_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, get_right_slot_changes, get_right_slot_context);
    				}
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
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("InfoRow", slots, ['left','center','right']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<InfoRow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class InfoRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InfoRow",
    			options,
    			id: create_fragment$I.name
    		});
    	}
    }

    /* src/components/HeadSign.svelte generated by Svelte v3.38.3 */

    const file$C = "src/components/HeadSign.svelte";

    function create_fragment$H(ctx) {
    	let span1;
    	let span0;
    	let span0_class_value;
    	let t;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span0, "class", span0_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-hwzop");
    			add_location(span0, file$C, 1, 4, 93);
    			attr_dev(span1, "class", "headSign svelte-hwzop");
    			set_style(span1, "background-color", /*backgroundColor*/ ctx[1]);
    			set_style(span1, "color", /*textColor*/ ctx[2]);
    			add_location(span1, file$C, 0, 0, 0);
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
    			if (!current || dirty & /*icon*/ 1 && span0_class_value !== (span0_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-hwzop")) {
    				attr_dev(span0, "class", span0_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HeadSign", slots, ['default']);
    	var { icon } = $$props;
    	var { backgroundColor = "#000000" } = $$props;
    	var { textColor = "#ffffff" } = $$props;
    	const writable_props = ["icon", "backgroundColor", "textColor"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeadSign> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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

    	return [icon, backgroundColor, textColor, $$scope, slots];
    }

    class HeadSign extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$H, create_fragment$H, safe_not_equal, {
    			icon: 0,
    			backgroundColor: 1,
    			textColor: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeadSign",
    			options,
    			id: create_fragment$H.name
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

    const settingsStore = writableLinked("settings", {});

    settingsStore.set({
        preferPopup: false,
        experimentalFeatures: false,
        logUsage: true,
        ...settingsStore.get(),
    });

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
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

    /* src/components/DropDown.svelte generated by Svelte v3.38.3 */
    const file$B = "src/components/DropDown.svelte";

    // (2:0) {#if open}
    function create_if_block$c(ctx) {
    	let div;
    	let div_intro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "dropDownContent svelte-6gdtnt");
    			add_location(div, file$B, 2, 4, 116);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(2:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1;
    	let t2;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*open*/ ctx[0] && create_if_block$c(ctx);

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
    			add_location(span, file$B, 0, 29, 29);
    			attr_dev(p, "class", "svelte-6gdtnt");
    			add_location(p, file$B, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(p, "click", /*toggleDropdown*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*open*/ 1 && span_class_value !== (span_class_value = "mdi mdi-chevron-" + (/*open*/ ctx[0] ? "up" : "down"))) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*open*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$c(ctx);
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
    			mounted = false;
    			dispose();
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

    function instance$G($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DropDown", slots, ['default']);
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

    	$$self.$$set = $$props => {
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

    	return [open, text, toggleDropdown, $$scope, slots];
    }

    class DropDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, { text: 1, open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropDown",
    			options,
    			id: create_fragment$G.name
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

    /* src/components/Misc/Popup.svelte generated by Svelte v3.38.3 */
    const file$A = "src/components/Misc/Popup.svelte";

    // (1:0) {#if open}
    function create_if_block$b(ctx) {
    	let div1;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "box svelte-pjpf9f");
    			add_location(div0, file$A, 2, 8, 84);
    			attr_dev(div1, "class", "scim svelte-pjpf9f");
    			add_location(div1, file$A, 1, 4, 15);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(inject.call(null, div1, "main")),
    					listen_dev(div1, "click", self$1(/*close*/ ctx[1]), false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], !current ? -1 : dirty, null, null);
    				}
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
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(1:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*open*/ ctx[0] && create_if_block$b(ctx);

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

    					if (dirty & /*open*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$b(ctx);
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
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Popup", slots, ['default']);
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

    	$$self.$$set = $$props => {
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
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

    	return [open, close, $$scope, slots];
    }

    class Popup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, { open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Popup",
    			options,
    			id: create_fragment$F.name
    		});
    	}

    	get open() {
    		throw new Error("<Popup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Popup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/MoreInfoPopup.svelte generated by Svelte v3.38.3 */
    const file$z = "src/components/MoreInfoPopup.svelte";

    // (2:0) <Popup bind:open={open}>
    function create_default_slot$d(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
    				}
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
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$d.name,
    		type: "slot",
    		source: "(2:0) <Popup bind:open={open}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let p;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let popup;
    	let updating_open;
    	let current;
    	let mounted;
    	let dispose;

    	function popup_open_binding(value) {
    		/*popup_open_binding*/ ctx[4](value);
    	}

    	let popup_props = {
    		$$slots: { default: [create_default_slot$d] },
    		$$scope: { ctx }
    	};

    	if (/*open*/ ctx[0] !== void 0) {
    		popup_props.open = /*open*/ ctx[0];
    	}

    	popup = new Popup({ props: popup_props, $$inline: true });
    	binding_callbacks.push(() => bind(popup, "open", popup_open_binding));

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(/*text*/ ctx[1]);
    			t2 = space();
    			create_component(popup.$$.fragment);
    			attr_dev(span, "class", "mdi mdi-arrow-expand-all");
    			add_location(span, file$z, 0, 26, 26);
    			attr_dev(p, "class", "svelte-z5znmk");
    			add_location(p, file$z, 0, 0, 0);
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
    			mount_component(popup, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(p, "click", /*togglePopup*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);
    			const popup_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				popup_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*open*/ 1) {
    				updating_open = true;
    				popup_changes.open = /*open*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			popup.$set(popup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(popup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(popup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t2);
    			destroy_component(popup, detaching);
    			mounted = false;
    			dispose();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MoreInfoPopup", slots, ['default']);
    	var { text = "Meer Info" } = $$props;
    	var { open = false } = $$props;

    	// Functions
    	function togglePopup() {
    		$$invalidate(0, open = !open);
    	}

    	const writable_props = ["text", "open"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MoreInfoPopup> was created with unknown prop '${key}'`);
    	});

    	function popup_open_binding(value) {
    		open = value;
    		$$invalidate(0, open);
    	}

    	$$self.$$set = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Popup, text, open, togglePopup });

    	$$self.$inject_state = $$props => {
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [open, text, togglePopup, slots, popup_open_binding, $$scope];
    }

    class MoreInfoPopup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { text: 1, open: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MoreInfoPopup",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get text() {
    		throw new Error("<MoreInfoPopup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<MoreInfoPopup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<MoreInfoPopup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<MoreInfoPopup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/MoreInfo.svelte generated by Svelte v3.38.3 */

    // (1:0) <svelte:component this={component} {text} {open}>
    function create_default_slot$c(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
    				}
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
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(1:0) <svelte:component this={component} {text} {open}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$D(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				text: /*text*/ ctx[0],
    				open: /*open*/ ctx[1],
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
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
    			if (dirty & /*text*/ 1) switch_instance_changes.text = /*text*/ ctx[0];
    			if (dirty & /*open*/ 2) switch_instance_changes.open = /*open*/ ctx[1];

    			if (dirty & /*$$scope*/ 32) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
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
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let component;
    	let $settingsStore;
    	validate_store(settingsStore, "settingsStore");
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(3, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MoreInfo", slots, ['default']);
    	var { text } = $$props;
    	var { open } = $$props;
    	const writable_props = ["text", "open"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MoreInfo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("text" in $$props) $$invalidate(0, text = $$props.text);
    		if ("open" in $$props) $$invalidate(1, open = $$props.open);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		settingsStore,
    		DropDown,
    		MoreInfoPopup,
    		text,
    		open,
    		component,
    		$settingsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("text" in $$props) $$invalidate(0, text = $$props.text);
    		if ("open" in $$props) $$invalidate(1, open = $$props.open);
    		if ("component" in $$props) $$invalidate(2, component = $$props.component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$settingsStore*/ 8) {
    			// Computed
    			$$invalidate(2, component = $settingsStore.preferPopup ? MoreInfoPopup : DropDown);
    		}
    	};

    	return [text, open, component, $settingsStore, slots, $$scope];
    }

    class MoreInfo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { text: 0, open: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MoreInfo",
    			options,
    			id: create_fragment$D.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !("text" in props)) {
    			console.warn("<MoreInfo> was created without expected prop 'text'");
    		}

    		if (/*open*/ ctx[1] === undefined && !("open" in props)) {
    			console.warn("<MoreInfo> was created without expected prop 'open'");
    		}
    	}

    	get text() {
    		throw new Error("<MoreInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<MoreInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<MoreInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<MoreInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/RouteStep/Train.svelte generated by Svelte v3.38.3 */

    const { console: console_1$2 } = globals;
    const file$y = "src/components/RouteStep/Train.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (2:4) 
    function create_left_slot_5(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*startTimeString*/ ctx[10]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$y, 1, 4, 14);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*startTimeString*/ 1024) set_data_dev(t, /*startTimeString*/ ctx[10]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_5.name,
    		type: "slot",
    		source: "(2:4) ",
    		ctx
    	});

    	return block;
    }

    // (4:8) <HeadSign icon="train" {backgroundColor} {textColor}>
    function create_default_slot_1$9(ctx) {
    	let t_value = /*step*/ ctx[0].trainId + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 1 && t_value !== (t_value = /*step*/ ctx[0].trainId + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$9.name,
    		type: "slot",
    		source: "(4:8) <HeadSign icon=\\\"train\\\" {backgroundColor} {textColor}>",
    		ctx
    	});

    	return block;
    }

    // (3:4) 
    function create_center_slot$2(ctx) {
    	let span;
    	let headsign;
    	let current;

    	headsign = new HeadSign({
    			props: {
    				icon: "train",
    				backgroundColor: /*backgroundColor*/ ctx[8],
    				textColor: /*textColor*/ ctx[9],
    				$$slots: { default: [create_default_slot_1$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(headsign.$$.fragment);
    			attr_dev(span, "slot", "center");
    			add_location(span, file$y, 2, 4, 61);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(headsign, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headsign_changes = {};
    			if (dirty & /*backgroundColor*/ 256) headsign_changes.backgroundColor = /*backgroundColor*/ ctx[8];
    			if (dirty & /*textColor*/ 512) headsign_changes.textColor = /*textColor*/ ctx[9];

    			if (dirty & /*$$scope, step*/ 2097153) {
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
    		id: create_center_slot$2.name,
    		type: "slot",
    		source: "(3:4) ",
    		ctx
    	});

    	return block;
    }

    // (6:4) 
    function create_right_slot_5(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*endTimeString*/ ctx[11]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$y, 5, 4, 185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*endTimeString*/ 2048) set_data_dev(t, /*endTimeString*/ ctx[11]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_5.name,
    		type: "slot",
    		source: "(6:4) ",
    		ctx
    	});

    	return block;
    }

    // (9:0) {#if journeyAvailable && cancelled}
    function create_if_block_4$1(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text("\n        Deze trein is geannuleerd");
    			attr_dev(span, "class", "mdi mdi-alert");
    			add_location(span, file$y, 10, 8, 309);
    			attr_dev(p, "class", "cancelled svelte-d3fl2t");
    			add_location(p, file$y, 9, 4, 279);
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
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(9:0) {#if journeyAvailable && cancelled}",
    		ctx
    	});

    	return block;
    }

    // (17:4) 
    function create_left_slot_4$1(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1_value = /*step*/ ctx[0].fromStation.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span0, "class", "mdi mdi-arrow-expand-right");
    			add_location(span0, file$y, 16, 22, 427);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$y, 16, 4, 409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].fromStation.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_4$1.name,
    		type: "slot",
    		source: "(17:4) ",
    		ctx
    	});

    	return block;
    }

    // (20:8) {#if originPlatformChanged}
    function create_if_block_3$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*plannedOriginPlatform*/ ctx[5]);
    			attr_dev(span, "class", "cancelledInformation svelte-d3fl2t");
    			add_location(span, file$y, 20, 12, 610);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*plannedOriginPlatform*/ 32) set_data_dev(t, /*plannedOriginPlatform*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(20:8) {#if originPlatformChanged}",
    		ctx
    	});

    	return block;
    }

    // (18:4) 
    function create_right_slot_4(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let if_block = /*originPlatformChanged*/ ctx[12] && create_if_block_3$1(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("spoor ");
    			t1 = text(/*originPlatform*/ ctx[3]);
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(span, "slot", "right");
    			add_location(span, file$y, 17, 4, 511);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			if (if_block) if_block.m(span, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*originPlatform*/ 8) set_data_dev(t1, /*originPlatform*/ ctx[3]);

    			if (/*originPlatformChanged*/ ctx[12]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3$1(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_4.name,
    		type: "slot",
    		source: "(18:4) ",
    		ctx
    	});

    	return block;
    }

    // (29:4) 
    function create_left_slot_3$1(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1_value = /*step*/ ctx[0].toStation.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span0, "class", "mdi mdi-arrow-collapse-right");
    			add_location(span0, file$y, 28, 22, 776);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$y, 28, 4, 758);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].toStation.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_3$1.name,
    		type: "slot",
    		source: "(29:4) ",
    		ctx
    	});

    	return block;
    }

    // (32:8) {#if destinationPlatformChanged}
    function create_if_block_2$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*plannedDestinationPlatform*/ ctx[6]);
    			attr_dev(span, "class", "cancelledInformation svelte-d3fl2t");
    			add_location(span, file$y, 32, 12, 969);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*plannedDestinationPlatform*/ 64) set_data_dev(t, /*plannedDestinationPlatform*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(32:8) {#if destinationPlatformChanged}",
    		ctx
    	});

    	return block;
    }

    // (30:4) 
    function create_right_slot_3$1(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let if_block = /*destinationPlatformChanged*/ ctx[13] && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("spoor ");
    			t1 = text(/*destinationPlatform*/ ctx[4]);
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(span, "slot", "right");
    			add_location(span, file$y, 29, 4, 860);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			if (if_block) if_block.m(span, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*destinationPlatform*/ 16) set_data_dev(t1, /*destinationPlatform*/ ctx[4]);

    			if (/*destinationPlatformChanged*/ ctx[13]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_3$1.name,
    		type: "slot",
    		source: "(30:4) ",
    		ctx
    	});

    	return block;
    }

    // (40:0) {#if journeyAvailable}
    function create_if_block$a(ctx) {
    	let inforow;
    	let t;
    	let moreinfo;
    	let current;

    	inforow = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_2$1],
    					left: [create_left_slot_2$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	moreinfo = new MoreInfo({
    			props: {
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow.$$.fragment);
    			t = space();
    			create_component(moreinfo.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(moreinfo, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow_changes = {};

    			if (dirty & /*$$scope, journey*/ 2097154) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);
    			const moreinfo_changes = {};

    			if (dirty & /*$$scope, journey*/ 2097154) {
    				moreinfo_changes.$$scope = { dirty, ctx };
    			}

    			moreinfo.$set(moreinfo_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow.$$.fragment, local);
    			transition_in(moreinfo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			transition_out(moreinfo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(moreinfo, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(40:0) {#if journeyAvailable}",
    		ctx
    	});

    	return block;
    }

    // (42:8) 
    function create_left_slot_2$1(ctx) {
    	let span1;
    	let span0;
    	let t;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t = text(" Lengte");
    			attr_dev(span0, "class", "mdi mdi-tape-measure");
    			add_location(span0, file$y, 41, 26, 1171);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$y, 41, 8, 1153);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_2$1.name,
    		type: "slot",
    		source: "(42:8) ",
    		ctx
    	});

    	return block;
    }

    // (43:8) 
    function create_right_slot_2$1(ctx) {
    	let span2;
    	let span1;
    	let span0;
    	let t_value = /*journey*/ ctx[1].train.numberOfCarts + "";
    	let t;

    	const block = {
    		c: function create() {
    			span2 = element("span");
    			span1 = element("span");
    			span0 = element("span");
    			t = text(t_value);
    			attr_dev(span0, "class", "inner svelte-d3fl2t");
    			add_location(span0, file$y, 44, 16, 1311);
    			attr_dev(span1, "class", "lengthBoard svelte-d3fl2t");
    			add_location(span1, file$y, 43, 12, 1268);
    			attr_dev(span2, "slot", "right");
    			add_location(span2, file$y, 42, 8, 1236);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span2, anchor);
    			append_dev(span2, span1);
    			append_dev(span1, span0);
    			append_dev(span0, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*journey*/ 2 && t_value !== (t_value = /*journey*/ ctx[1].train.numberOfCarts + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_2$1.name,
    		type: "slot",
    		source: "(43:8) ",
    		ctx
    	});

    	return block;
    }

    // (56:12) {:else}
    function create_else_block$3(ctx) {
    	let t;
    	let span;

    	const block = {
    		c: function create() {
    			t = text("Rechts uitstappen ");
    			span = element("span");
    			attr_dev(span, "class", "mdi mdi-chevron-triple-right");
    			add_location(span, file$y, 56, 34, 1701);
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
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(56:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (54:12) {#if journey.destinationExitSide === "left"}
    function create_if_block_1$6(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(" Links uitstappen");
    			attr_dev(span, "class", "mdi mdi-chevron-triple-left");
    			add_location(span, file$y, 54, 16, 1580);
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
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(54:12) {#if journey.destinationExitSide === \\\"left\\\"}",
    		ctx
    	});

    	return block;
    }

    // (62:12) 
    function create_left_slot_1$2(ctx) {
    	let span1;
    	let span0;
    	let t;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t = text(" Richting");
    			attr_dev(span0, "class", "mdi mdi-routes");
    			add_location(span0, file$y, 61, 30, 1832);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$y, 61, 12, 1814);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1$2.name,
    		type: "slot",
    		source: "(62:12) ",
    		ctx
    	});

    	return block;
    }

    // (63:12) 
    function create_right_slot_1$1(ctx) {
    	let span;
    	let t_value = /*journey*/ ctx[1].directionStationName + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$y, 62, 12, 1897);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*journey*/ 2 && t_value !== (t_value = /*journey*/ ctx[1].directionStationName + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_1$1.name,
    		type: "slot",
    		source: "(63:12) ",
    		ctx
    	});

    	return block;
    }

    // (68:16) 
    function create_left_slot$3(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1_value = /*materialPart*/ ctx[15].materialNumber + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = text(" Treinstel ");
    			t1 = text(t1_value);
    			attr_dev(span0, "class", "mdi mdi-barcode");
    			add_location(span0, file$y, 67, 34, 2090);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$y, 67, 16, 2072);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*journey*/ 2 && t1_value !== (t1_value = /*materialPart*/ ctx[15].materialNumber + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$3.name,
    		type: "slot",
    		source: "(68:16) ",
    		ctx
    	});

    	return block;
    }

    // (70:20) {#each materialPart.facilities as facility}
    function create_each_block_1(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "facilityIcon mdi mdi-" + getFacilityIcon(/*facility*/ ctx[18]) + " svelte-d3fl2t");
    			add_location(span, file$y, 70, 24, 2299);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*journey*/ 2 && span_class_value !== (span_class_value = "facilityIcon mdi mdi-" + getFacilityIcon(/*facility*/ ctx[18]) + " svelte-d3fl2t")) {
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
    		source: "(70:20) {#each materialPart.facilities as facility}",
    		ctx
    	});

    	return block;
    }

    // (69:16) 
    function create_right_slot$2(ctx) {
    	let span;
    	let each_value_1 = /*materialPart*/ ctx[15].facilities;
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
    			add_location(span, file$y, 68, 16, 2191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getFacilityIcon, journey*/ 2) {
    				each_value_1 = /*materialPart*/ ctx[15].facilities;
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
    		id: create_right_slot$2.name,
    		type: "slot",
    		source: "(69:16) ",
    		ctx
    	});

    	return block;
    }

    // (66:8) {#each journey.train.materialParts as materialPart}
    function create_each_block$8(ctx) {
    	let inforow;
    	let t0;
    	let div;
    	let img;
    	let img_src_value;
    	let t1;
    	let current;

    	inforow = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot$2],
    					left: [create_left_slot$3]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow.$$.fragment);
    			t0 = space();
    			div = element("div");
    			img = element("img");
    			t1 = space();
    			attr_dev(img, "class", "trainPartImage svelte-d3fl2t");
    			if (img.src !== (img_src_value = /*materialPart*/ ctx[15].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Train part");
    			add_location(img, file$y, 76, 16, 2500);
    			attr_dev(div, "class", "trainImages svelte-d3fl2t");
    			add_location(div, file$y, 75, 12, 2458);
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow_changes = {};

    			if (dirty & /*$$scope, journey*/ 2097154) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);

    			if (!current || dirty & /*journey*/ 2 && img.src !== (img_src_value = /*materialPart*/ ctx[15].image)) {
    				attr_dev(img, "src", img_src_value);
    			}
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
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(66:8) {#each journey.train.materialParts as materialPart}",
    		ctx
    	});

    	return block;
    }

    // (52:4) <MoreInfo>
    function create_default_slot$b(ctx) {
    	let p;
    	let t0;
    	let inforow;
    	let t1;
    	let each_1_anchor;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*journey*/ ctx[1].destinationExitSide === "left") return create_if_block_1$6;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	inforow = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_1$1],
    					left: [create_left_slot_1$2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*journey*/ ctx[1].train.materialParts;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			p = element("p");
    			if_block.c();
    			t0 = space();
    			create_component(inforow.$$.fragment);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(p, "class", "exitDirection svelte-d3fl2t");
    			add_location(p, file$y, 52, 8, 1481);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			if_block.m(p, null);
    			insert_dev(target, t0, anchor);
    			mount_component(inforow, target, anchor);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(p, null);
    				}
    			}

    			const inforow_changes = {};

    			if (dirty & /*$$scope, journey*/ 2097154) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);

    			if (dirty & /*journey, getFacilityIcon*/ 2) {
    				each_value = /*journey*/ ctx[1].train.materialParts;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
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
    			if (detaching) detach_dev(p);
    			if_block.d();
    			if (detaching) detach_dev(t0);
    			destroy_component(inforow, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(52:4) <MoreInfo>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$C(ctx) {
    	let inforow0;
    	let t0;
    	let t1;
    	let inforow1;
    	let t2;
    	let inforow2;
    	let t3;
    	let if_block1_anchor;
    	let current;

    	inforow0 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_5],
    					center: [create_center_slot$2],
    					left: [create_left_slot_5]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*journeyAvailable*/ ctx[2] && /*cancelled*/ ctx[7] && create_if_block_4$1(ctx);

    	inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_4],
    					left: [create_left_slot_4$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	inforow2 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_3$1],
    					left: [create_left_slot_3$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block1 = /*journeyAvailable*/ ctx[2] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			create_component(inforow1.$$.fragment);
    			t2 = space();
    			create_component(inforow2.$$.fragment);
    			t3 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow0, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(inforow1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(inforow2, target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inforow0_changes = {};

    			if (dirty & /*$$scope, endTimeString, backgroundColor, textColor, step, startTimeString*/ 2100993) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);

    			if (/*journeyAvailable*/ ctx[2] && /*cancelled*/ ctx[7]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_4$1(ctx);
    					if_block0.c();
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			const inforow1_changes = {};

    			if (dirty & /*$$scope, plannedOriginPlatform, originPlatformChanged, originPlatform, step*/ 2101289) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const inforow2_changes = {};

    			if (dirty & /*$$scope, plannedDestinationPlatform, destinationPlatformChanged, destinationPlatform, step*/ 2105425) {
    				inforow2_changes.$$scope = { dirty, ctx };
    			}

    			inforow2.$set(inforow2_changes);

    			if (/*journeyAvailable*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*journeyAvailable*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$a(ctx);
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
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(inforow2.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(inforow2.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(inforow2, detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
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

    function instance$C($$self, $$props, $$invalidate) {
    	let journeyAvailable;
    	let cancelled;
    	let backgroundColor;
    	let textColor;
    	let startTimeString;
    	let endTimeString;
    	let originPlatform;
    	let destinationPlatform;
    	let plannedOriginPlatform;
    	let plannedDestinationPlatform;
    	let originPlatformChanged;
    	let destinationPlatformChanged;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Train", slots, []);
    	var { step } = $$props;
    	console.log(step);

    	// Data
    	var journey = null;

    	var journeyPoller = null;

    	// Events
    	onMount(() => {
    		journeyPoller = createPoller({
    			query: `
            query ($token: String!) {
                liveTrainJourney(journeyId: $token) {
                    refreshId
                    shouldPoll
                    pollAfter
                    journey {
                        cancelled
                        directionStationName
                        planedDepartureTrack
                        actualDepartureTrack
                        planedArrivalTrack
                        actualArrivalTrack
                        destinationExitSide
                        train {
                            id
                            numberOfCarts
                            materialParts {
                                materialNumber
                                facilities
                                image
                            }
                        }
                        currentPass {
                            status
                        }
                    }
                }
            }
        `,
    			initialToken: step.journeyRefreshId,
    			key: "liveTrainJourney",
    			id: step.randomId,
    			memoization: true,
    			memoizationTags: ["liveBusJourney", "liveRouteJourney"],
    			onData(data, instance) {
    				if (!!data?.journey) {
    					$$invalidate(1, journey = data.journey);
    				} // currentPass = journey.currentPass;
    			}
    		});
    	});

    	onDestroy(() => {
    		if (journeyPoller) journeyPoller.stop();
    	}); // if (locationPoller) locationPoller.stop();

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<Train> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		getStepColor,
    		getStepTextColor,
    		timestampToString,
    		createPoller,
    		getFacilityIcon,
    		InfoRow,
    		HeadSign,
    		MoreInfo,
    		step,
    		journey,
    		journeyPoller,
    		journeyAvailable,
    		cancelled,
    		backgroundColor,
    		textColor,
    		startTimeString,
    		endTimeString,
    		originPlatform,
    		destinationPlatform,
    		plannedOriginPlatform,
    		plannedDestinationPlatform,
    		originPlatformChanged,
    		destinationPlatformChanged
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("journey" in $$props) $$invalidate(1, journey = $$props.journey);
    		if ("journeyPoller" in $$props) journeyPoller = $$props.journeyPoller;
    		if ("journeyAvailable" in $$props) $$invalidate(2, journeyAvailable = $$props.journeyAvailable);
    		if ("cancelled" in $$props) $$invalidate(7, cancelled = $$props.cancelled);
    		if ("backgroundColor" in $$props) $$invalidate(8, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(9, textColor = $$props.textColor);
    		if ("startTimeString" in $$props) $$invalidate(10, startTimeString = $$props.startTimeString);
    		if ("endTimeString" in $$props) $$invalidate(11, endTimeString = $$props.endTimeString);
    		if ("originPlatform" in $$props) $$invalidate(3, originPlatform = $$props.originPlatform);
    		if ("destinationPlatform" in $$props) $$invalidate(4, destinationPlatform = $$props.destinationPlatform);
    		if ("plannedOriginPlatform" in $$props) $$invalidate(5, plannedOriginPlatform = $$props.plannedOriginPlatform);
    		if ("plannedDestinationPlatform" in $$props) $$invalidate(6, plannedDestinationPlatform = $$props.plannedDestinationPlatform);
    		if ("originPlatformChanged" in $$props) $$invalidate(12, originPlatformChanged = $$props.originPlatformChanged);
    		if ("destinationPlatformChanged" in $$props) $$invalidate(13, destinationPlatformChanged = $$props.destinationPlatformChanged);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*journey*/ 2) {
    			// Computed
    			$$invalidate(2, journeyAvailable = journey !== null);
    		}

    		if ($$self.$$.dirty & /*journeyAvailable, journey*/ 6) {
    			$$invalidate(7, cancelled = journeyAvailable && journey.cancelled);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(8, backgroundColor = getStepColor(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(9, textColor = getStepTextColor(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(10, startTimeString = timestampToString(step.departureTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(11, endTimeString = timestampToString(step.arrivalTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*journeyAvailable, journey*/ 6) {
    			$$invalidate(3, originPlatform = journeyAvailable ? journey.actualDepartureTrack : "?");
    		}

    		if ($$self.$$.dirty & /*journeyAvailable, journey*/ 6) {
    			$$invalidate(4, destinationPlatform = journeyAvailable ? journey.actualArrivalTrack : "?");
    		}

    		if ($$self.$$.dirty & /*journeyAvailable, journey*/ 6) {
    			$$invalidate(5, plannedOriginPlatform = journeyAvailable ? journey.planedDepartureTrack : "?");
    		}

    		if ($$self.$$.dirty & /*journeyAvailable, journey*/ 6) {
    			$$invalidate(6, plannedDestinationPlatform = journeyAvailable ? journey.planedArrivalTrack : "?");
    		}

    		if ($$self.$$.dirty & /*originPlatform, plannedOriginPlatform*/ 40) {
    			$$invalidate(12, originPlatformChanged = originPlatform !== plannedOriginPlatform);
    		}

    		if ($$self.$$.dirty & /*destinationPlatform, plannedDestinationPlatform*/ 80) {
    			$$invalidate(13, destinationPlatformChanged = destinationPlatform !== plannedDestinationPlatform);
    		}
    	};

    	return [
    		step,
    		journey,
    		journeyAvailable,
    		originPlatform,
    		destinationPlatform,
    		plannedOriginPlatform,
    		plannedDestinationPlatform,
    		cancelled,
    		backgroundColor,
    		textColor,
    		startTimeString,
    		endTimeString,
    		originPlatformChanged,
    		destinationPlatformChanged
    	];
    }

    class Train extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Train",
    			options,
    			id: create_fragment$C.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console_1$2.warn("<Train> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Train>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Train>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    function getDirectDistance(position1, position2) {
        var differenceLat = Math.abs(position1.lat - position2.lat);
        var differenceLong = Math.abs(position1.long - position2.long);

        var directDistance = Math.sqrt(differenceLat ** 2 + differenceLong ** 2);

        return directDistance;
    }

    /* src/components/RouteStep/BusTimeLine.svelte generated by Svelte v3.38.3 */

    const file$x = "src/components/RouteStep/BusTimeLine.svelte";

    // (2:4) {#if lastStopAvailable}
    function create_if_block_1$5(ctx) {
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*lastStop*/ ctx[3].name + "";
    	let t1;
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*lastStop*/ ctx[3].status) + " svelte-pnkwja");
    			add_location(span, file$x, 3, 12, 114);
    			attr_dev(p, "class", p_class_value = "" + (null_to_empty(getClass(/*lastStop*/ ctx[3].status)) + " svelte-pnkwja"));
    			add_location(p, file$x, 2, 8, 62);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*lastStop*/ 8 && span_class_value !== (span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*lastStop*/ ctx[3].status) + " svelte-pnkwja")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*lastStop*/ 8 && t1_value !== (t1_value = /*lastStop*/ ctx[3].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*lastStop*/ 8 && p_class_value !== (p_class_value = "" + (null_to_empty(getClass(/*lastStop*/ ctx[3].status)) + " svelte-pnkwja"))) {
    				attr_dev(p, "class", p_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(2:4) {#if lastStopAvailable}",
    		ctx
    	});

    	return block;
    }

    // (15:4) {#if nextStopAvailable}
    function create_if_block$9(ctx) {
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*nextStop*/ ctx[4].name + "";
    	let t1;
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*nextStop*/ ctx[4].status) + " svelte-pnkwja");
    			add_location(span, file$x, 16, 12, 492);
    			attr_dev(p, "class", p_class_value = "" + (null_to_empty(getClass(/*nextStop*/ ctx[4].status)) + " svelte-pnkwja"));
    			add_location(p, file$x, 15, 8, 440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*nextStop*/ 16 && span_class_value !== (span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*nextStop*/ ctx[4].status) + " svelte-pnkwja")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*nextStop*/ 16 && t1_value !== (t1_value = /*nextStop*/ ctx[4].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*nextStop*/ 16 && p_class_value !== (p_class_value = "" + (null_to_empty(getClass(/*nextStop*/ ctx[4].status)) + " svelte-pnkwja"))) {
    				attr_dev(p, "class", p_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(15:4) {#if nextStopAvailable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let span;
    	let span_class_value;
    	let t1;
    	let t2_value = /*currentStop*/ ctx[0].name + "";
    	let t2;
    	let div0_class_value;
    	let t3;
    	let if_block0 = /*lastStopAvailable*/ ctx[1] && create_if_block_1$5(ctx);
    	let if_block1 = /*nextStopAvailable*/ ctx[2] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			span = element("span");
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*currentStop*/ ctx[0].status) + " svelte-pnkwja");
    			add_location(span, file$x, 10, 8, 295);
    			attr_dev(div0, "class", div0_class_value = "current " + getClass(/*currentStop*/ ctx[0].status) + " svelte-pnkwja");
    			add_location(div0, file$x, 9, 4, 234);
    			attr_dev(div1, "class", "busTimeline");
    			add_location(div1, file$x, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div1, t3);
    			if (if_block1) if_block1.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*lastStopAvailable*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$5(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*currentStop*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*getStatusIcon*/ ctx[5](/*currentStop*/ ctx[0].status) + " svelte-pnkwja")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*currentStop*/ 1 && t2_value !== (t2_value = /*currentStop*/ ctx[0].name + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*currentStop*/ 1 && div0_class_value !== (div0_class_value = "current " + getClass(/*currentStop*/ ctx[0].status) + " svelte-pnkwja")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (/*nextStopAvailable*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$9(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
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

    function getClass(status) {
    	if (status === "cancelled") {
    		return "cancelled";
    	}

    	return "";
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let currentStopObject;
    	let currentStopFound;
    	let currentStopIndex;
    	let lastIndex;
    	let nextIndex;
    	let lastStopAvailable;
    	let nextStopAvailable;
    	let lastStop;
    	let nextStop;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BusTimeLine", slots, []);
    	var { stops = [] } = $$props;
    	var { currentStop = { stopId: "", name: "" } } = $$props;

    	// Data
    	const statusIconMap = {
    		arrived: "check",
    		passed: "check-all",
    		planned: "alarm",
    		driving: "bus",
    		cancelled: "alert"
    	};

    	// Functions
    	function getStatusIcon(status) {
    		let icon = statusIconMap[status];

    		if (icon === undefined) {
    			icon = "help-rhombus-outline";
    		}

    		return icon;
    	}

    	const writable_props = ["stops", "currentStop"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BusTimeLine> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("stops" in $$props) $$invalidate(6, stops = $$props.stops);
    		if ("currentStop" in $$props) $$invalidate(0, currentStop = $$props.currentStop);
    	};

    	$$self.$capture_state = () => ({
    		stops,
    		currentStop,
    		statusIconMap,
    		getStatusIcon,
    		getClass,
    		currentStopObject,
    		currentStopFound,
    		currentStopIndex,
    		lastIndex,
    		nextIndex,
    		lastStopAvailable,
    		nextStopAvailable,
    		lastStop,
    		nextStop
    	});

    	$$self.$inject_state = $$props => {
    		if ("stops" in $$props) $$invalidate(6, stops = $$props.stops);
    		if ("currentStop" in $$props) $$invalidate(0, currentStop = $$props.currentStop);
    		if ("currentStopObject" in $$props) $$invalidate(7, currentStopObject = $$props.currentStopObject);
    		if ("currentStopFound" in $$props) currentStopFound = $$props.currentStopFound;
    		if ("currentStopIndex" in $$props) $$invalidate(8, currentStopIndex = $$props.currentStopIndex);
    		if ("lastIndex" in $$props) $$invalidate(9, lastIndex = $$props.lastIndex);
    		if ("nextIndex" in $$props) $$invalidate(10, nextIndex = $$props.nextIndex);
    		if ("lastStopAvailable" in $$props) $$invalidate(1, lastStopAvailable = $$props.lastStopAvailable);
    		if ("nextStopAvailable" in $$props) $$invalidate(2, nextStopAvailable = $$props.nextStopAvailable);
    		if ("lastStop" in $$props) $$invalidate(3, lastStop = $$props.lastStop);
    		if ("nextStop" in $$props) $$invalidate(4, nextStop = $$props.nextStop);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*stops, currentStop*/ 65) {
    			// Computed
    			$$invalidate(7, currentStopObject = stops.find(stop => stop.stopId === currentStop.stopId));
    		}

    		if ($$self.$$.dirty & /*currentStopObject*/ 128) {
    			currentStopFound = currentStopObject !== undefined;
    		}

    		if ($$self.$$.dirty & /*stops, currentStopObject*/ 192) {
    			$$invalidate(8, currentStopIndex = stops.indexOf(currentStopObject));
    		}

    		if ($$self.$$.dirty & /*currentStopIndex*/ 256) {
    			$$invalidate(9, lastIndex = currentStopIndex - 1);
    		}

    		if ($$self.$$.dirty & /*currentStopIndex*/ 256) {
    			$$invalidate(10, nextIndex = currentStopIndex + 1);
    		}

    		if ($$self.$$.dirty & /*lastIndex*/ 512) {
    			$$invalidate(1, lastStopAvailable = lastIndex >= 0);
    		}

    		if ($$self.$$.dirty & /*nextIndex, stops*/ 1088) {
    			$$invalidate(2, nextStopAvailable = nextIndex < stops.length);
    		}

    		if ($$self.$$.dirty & /*stops, lastIndex*/ 576) {
    			$$invalidate(3, lastStop = stops[lastIndex]);
    		}

    		if ($$self.$$.dirty & /*stops, nextIndex*/ 1088) {
    			$$invalidate(4, nextStop = stops[nextIndex]);
    		}
    	};

    	return [
    		currentStop,
    		lastStopAvailable,
    		nextStopAvailable,
    		lastStop,
    		nextStop,
    		getStatusIcon,
    		stops,
    		currentStopObject,
    		currentStopIndex,
    		lastIndex,
    		nextIndex
    	];
    }

    class BusTimeLine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { stops: 6, currentStop: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BusTimeLine",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get stops() {
    		throw new Error("<BusTimeLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stops(value) {
    		throw new Error("<BusTimeLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentStop() {
    		throw new Error("<BusTimeLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentStop(value) {
    		throw new Error("<BusTimeLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/RouteStep/Bus.svelte generated by Svelte v3.38.3 */
    const file$w = "src/components/RouteStep/Bus.svelte";

    // (3:8) {#if differentStartTime}
    function create_if_block_11(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*departureTimeString*/ ctx[9]);
    			attr_dev(span, "class", "differentTime svelte-11fxtk2");
    			add_location(span, file$w, 3, 12, 78);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*departureTimeString*/ 512) set_data_dev(t, /*departureTimeString*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(3:8) {#if differentStartTime}",
    		ctx
    	});

    	return block;
    }

    // (2:4) 
    function create_left_slot_4(ctx) {
    	let span1;
    	let t0;
    	let span0;
    	let t1;
    	let span0_class_value;
    	let if_block = /*differentStartTime*/ ctx[16] && create_if_block_11(ctx);

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			if (if_block) if_block.c();
    			t0 = space();
    			span0 = element("span");
    			t1 = text(/*startTimeString*/ ctx[5]);
    			attr_dev(span0, "class", span0_class_value = "" + (null_to_empty(/*differentStartTime*/ ctx[16] && "originalTimeDifferent") + " svelte-11fxtk2"));
    			add_location(span0, file$w, 6, 8, 158);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$w, 1, 4, 14);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			if (if_block) if_block.m(span1, null);
    			append_dev(span1, t0);
    			append_dev(span1, span0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (/*differentStartTime*/ ctx[16]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_11(ctx);
    					if_block.c();
    					if_block.m(span1, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*startTimeString*/ 32) set_data_dev(t1, /*startTimeString*/ ctx[5]);

    			if (dirty & /*differentStartTime*/ 65536 && span0_class_value !== (span0_class_value = "" + (null_to_empty(/*differentStartTime*/ ctx[16] && "originalTimeDifferent") + " svelte-11fxtk2"))) {
    				attr_dev(span0, "class", span0_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_4.name,
    		type: "slot",
    		source: "(2:4) ",
    		ctx
    	});

    	return block;
    }

    // (12:8) <HeadSign icon="bus" {backgroundColor} {textColor}>
    function create_default_slot_1$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*line*/ ctx[11]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*line*/ 2048) set_data_dev(t, /*line*/ ctx[11]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$8.name,
    		type: "slot",
    		source: "(12:8) <HeadSign icon=\\\"bus\\\" {backgroundColor} {textColor}>",
    		ctx
    	});

    	return block;
    }

    // (11:4) 
    function create_center_slot$1(ctx) {
    	let span;
    	let headsign;
    	let current;

    	headsign = new HeadSign({
    			props: {
    				icon: "bus",
    				backgroundColor: /*backgroundColor*/ ctx[12],
    				textColor: /*textColor*/ ctx[13],
    				$$slots: { default: [create_default_slot_1$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(headsign.$$.fragment);
    			attr_dev(span, "slot", "center");
    			add_location(span, file$w, 10, 4, 283);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(headsign, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headsign_changes = {};
    			if (dirty & /*backgroundColor*/ 4096) headsign_changes.backgroundColor = /*backgroundColor*/ ctx[12];
    			if (dirty & /*textColor*/ 8192) headsign_changes.textColor = /*textColor*/ ctx[13];

    			if (dirty & /*$$scope, line*/ 4196352) {
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
    		source: "(11:4) ",
    		ctx
    	});

    	return block;
    }

    // (19:8) {#if differentEndTime}
    function create_if_block_10(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*arrivalTimeString*/ ctx[10]);
    			attr_dev(span, "class", "differentTime svelte-11fxtk2");
    			add_location(span, file$w, 19, 12, 574);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*arrivalTimeString*/ 1024) set_data_dev(t, /*arrivalTimeString*/ ctx[10]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(19:8) {#if differentEndTime}",
    		ctx
    	});

    	return block;
    }

    // (14:4) 
    function create_right_slot_3(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let span0_class_value;
    	let t1;
    	let if_block = /*differentEndTime*/ ctx[17] && create_if_block_10(ctx);

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = text(/*endTimeString*/ ctx[6]);
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(span0, "class", span0_class_value = "" + (null_to_empty(/*differentEndTime*/ ctx[17] && "originalTimeDifferent") + " svelte-11fxtk2"));
    			add_location(span0, file$w, 14, 8, 425);
    			attr_dev(span1, "slot", "right");
    			add_location(span1, file$w, 13, 4, 397);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span0, t0);
    			append_dev(span1, t1);
    			if (if_block) if_block.m(span1, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*endTimeString*/ 64) set_data_dev(t0, /*endTimeString*/ ctx[6]);

    			if (dirty & /*differentEndTime*/ 131072 && span0_class_value !== (span0_class_value = "" + (null_to_empty(/*differentEndTime*/ ctx[17] && "originalTimeDifferent") + " svelte-11fxtk2"))) {
    				attr_dev(span0, "class", span0_class_value);
    			}

    			if (/*differentEndTime*/ ctx[17]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_10(ctx);
    					if_block.c();
    					if_block.m(span1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_3.name,
    		type: "slot",
    		source: "(14:4) ",
    		ctx
    	});

    	return block;
    }

    // (26:4) 
    function create_left_slot_3(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1_value = /*step*/ ctx[0].fromBusStop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span0, "class", "mdi mdi-arrow-expand-right");
    			add_location(span0, file$w, 25, 22, 699);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$w, 25, 4, 681);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].fromBusStop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_3.name,
    		type: "slot",
    		source: "(26:4) ",
    		ctx
    	});

    	return block;
    }

    // (29:8) {#if departurePass && departurePass.platform}
    function create_if_block_9(ctx) {
    	let span;
    	let t0;
    	let t1_value = /*departurePass*/ ctx[7].platform + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("Platform ");
    			t1 = text(t1_value);
    			attr_dev(span, "class", "platform svelte-11fxtk2");
    			add_location(span, file$w, 29, 12, 870);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*departurePass*/ 128 && t1_value !== (t1_value = /*departurePass*/ ctx[7].platform + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(29:8) {#if departurePass && departurePass.platform}",
    		ctx
    	});

    	return block;
    }

    // (28:4) 
    function create_right_slot_2(ctx) {
    	let span;
    	let if_block = /*departurePass*/ ctx[7] && /*departurePass*/ ctx[7].platform && create_if_block_9(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (if_block) if_block.c();
    			attr_dev(span, "slot", "right");
    			add_location(span, file$w, 27, 4, 784);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			if (if_block) if_block.m(span, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*departurePass*/ ctx[7] && /*departurePass*/ ctx[7].platform) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_9(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_2.name,
    		type: "slot",
    		source: "(28:4) ",
    		ctx
    	});

    	return block;
    }

    // (35:4) 
    function create_left_slot_2(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1_value = /*step*/ ctx[0].toBusStop.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span0, "class", "mdi mdi-arrow-collapse-right");
    			add_location(span0, file$w, 34, 22, 1003);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$w, 34, 4, 985);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].toBusStop.name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_2.name,
    		type: "slot",
    		source: "(35:4) ",
    		ctx
    	});

    	return block;
    }

    // (38:8) {#if arrivalPass && arrivalPass.platform}
    function create_if_block_8(ctx) {
    	let span;
    	let t0;
    	let t1_value = /*arrivalPass*/ ctx[8].platform + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("Platform ");
    			t1 = text(t1_value);
    			attr_dev(span, "class", "platform svelte-11fxtk2");
    			add_location(span, file$w, 38, 12, 1170);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*arrivalPass*/ 256 && t1_value !== (t1_value = /*arrivalPass*/ ctx[8].platform + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(38:8) {#if arrivalPass && arrivalPass.platform}",
    		ctx
    	});

    	return block;
    }

    // (37:4) 
    function create_right_slot_1(ctx) {
    	let span;
    	let if_block = /*arrivalPass*/ ctx[8] && /*arrivalPass*/ ctx[8].platform && create_if_block_8(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (if_block) if_block.c();
    			attr_dev(span, "slot", "right");
    			add_location(span, file$w, 36, 4, 1088);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			if (if_block) if_block.m(span, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*arrivalPass*/ ctx[8] && /*arrivalPass*/ ctx[8].platform) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_8(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot_1.name,
    		type: "slot",
    		source: "(37:4) ",
    		ctx
    	});

    	return block;
    }

    // (44:0) {#if currentPassLoaded}
    function create_if_block_2(ctx) {
    	let inforow;
    	let current;

    	inforow = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_1$1] },
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

    			if (dirty & /*$$scope, currentPass, deltaString*/ 4227076) {
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
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(44:0) {#if currentPassLoaded}",
    		ctx
    	});

    	return block;
    }

    // (58:57) 
    function create_if_block_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Stopt niet bij");
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
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(58:57) ",
    		ctx
    	});

    	return block;
    }

    // (56:55) 
    function create_if_block_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Geplanned");
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
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(56:55) ",
    		ctx
    	});

    	return block;
    }

    // (54:54) 
    function create_if_block_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Bus is gepasseerd");
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
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(54:54) ",
    		ctx
    	});

    	return block;
    }

    // (52:55) 
    function create_if_block_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Rijd naar");
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
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(52:55) ",
    		ctx
    	});

    	return block;
    }

    // (50:12) {#if currentPass.status === "arrived"}
    function create_if_block_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Aangekomen bij");
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
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(50:12) {#if currentPass.status === \\\"arrived\\\"}",
    		ctx
    	});

    	return block;
    }

    // (46:8) 
    function create_left_slot_1$1(ctx) {
    	let span2;
    	let span0;
    	let t0;
    	let span1;
    	let t1;
    	let t2;
    	let t3;
    	let t4_value = /*currentPass*/ ctx[2].name + "";
    	let t4;

    	function select_block_type(ctx, dirty) {
    		if (/*currentPass*/ ctx[2].status === "arrived") return create_if_block_3;
    		if (/*currentPass*/ ctx[2].status === "driving") return create_if_block_4;
    		if (/*currentPass*/ ctx[2].status === "passed") return create_if_block_5;
    		if (/*currentPass*/ ctx[2].status === "planned") return create_if_block_6;
    		if (/*currentPass*/ ctx[2].status === "cancelled") return create_if_block_7;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			span2 = element("span");
    			span0 = element("span");
    			t0 = space();
    			span1 = element("span");
    			t1 = text(/*deltaString*/ ctx[15]);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			t4 = text(t4_value);
    			attr_dev(span0, "class", "mdi mdi-rss");
    			add_location(span0, file$w, 46, 12, 1347);
    			attr_dev(span1, "class", "delta svelte-11fxtk2");
    			add_location(span1, file$w, 47, 12, 1393);
    			attr_dev(span2, "slot", "left");
    			add_location(span2, file$w, 45, 8, 1316);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span2, anchor);
    			append_dev(span2, span0);
    			append_dev(span2, t0);
    			append_dev(span2, span1);
    			append_dev(span1, t1);
    			append_dev(span2, t2);
    			if (if_block) if_block.m(span2, null);
    			append_dev(span2, t3);
    			append_dev(span2, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*deltaString*/ 32768) set_data_dev(t1, /*deltaString*/ ctx[15]);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(span2, t3);
    				}
    			}

    			if (dirty & /*currentPass*/ 4 && t4_value !== (t4_value = /*currentPass*/ ctx[2].name + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span2);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1$1.name,
    		type: "slot",
    		source: "(46:8) ",
    		ctx
    	});

    	return block;
    }

    // (68:0) {#if journeyLoaded}
    function create_if_block$8(ctx) {
    	let moreinfo;
    	let current;

    	moreinfo = new MoreInfo({
    			props: {
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(moreinfo.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(moreinfo, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const moreinfo_changes = {};

    			if (dirty & /*$$scope, stops, currentPass, journey*/ 4210694) {
    				moreinfo_changes.$$scope = { dirty, ctx };
    			}

    			moreinfo.$set(moreinfo_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(moreinfo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(moreinfo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(moreinfo, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(68:0) {#if journeyLoaded}",
    		ctx
    	});

    	return block;
    }

    // (71:12) 
    function create_left_slot$2(ctx) {
    	let span1;
    	let span0;
    	let t;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t = text("\n                Richting");
    			attr_dev(span0, "class", "mdi mdi-routes");
    			add_location(span0, file$w, 71, 16, 2058);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$w, 70, 12, 2023);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$2.name,
    		type: "slot",
    		source: "(71:12) ",
    		ctx
    	});

    	return block;
    }

    // (75:12) 
    function create_right_slot$1(ctx) {
    	let span;
    	let t_value = /*journey*/ ctx[1].line.destination.name + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$w, 74, 12, 2152);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*journey*/ 2 && t_value !== (t_value = /*journey*/ ctx[1].line.destination.name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot$1.name,
    		type: "slot",
    		source: "(75:12) ",
    		ctx
    	});

    	return block;
    }

    // (80:8) {#if currentPass}
    function create_if_block_1$4(ctx) {
    	let bustimeline;
    	let current;

    	bustimeline = new BusTimeLine({
    			props: {
    				stops: /*stops*/ ctx[14],
    				currentStop: /*currentPass*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(bustimeline.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bustimeline, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bustimeline_changes = {};
    			if (dirty & /*stops*/ 16384) bustimeline_changes.stops = /*stops*/ ctx[14];
    			if (dirty & /*currentPass*/ 4) bustimeline_changes.currentStop = /*currentPass*/ ctx[2];
    			bustimeline.$set(bustimeline_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bustimeline.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bustimeline.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bustimeline, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(80:8) {#if currentPass}",
    		ctx
    	});

    	return block;
    }

    // (69:4) <MoreInfo>
    function create_default_slot$a(ctx) {
    	let inforow;
    	let t;
    	let if_block_anchor;
    	let current;

    	inforow = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot$1],
    					left: [create_left_slot$2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*currentPass*/ ctx[2] && create_if_block_1$4(ctx);

    	const block = {
    		c: function create() {
    			create_component(inforow.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const inforow_changes = {};

    			if (dirty & /*$$scope, journey*/ 4194306) {
    				inforow_changes.$$scope = { dirty, ctx };
    			}

    			inforow.$set(inforow_changes);

    			if (/*currentPass*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*currentPass*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$4(ctx);
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
    			transition_in(inforow.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(69:4) <MoreInfo>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
    	let inforow0;
    	let t0;
    	let inforow1;
    	let t1;
    	let inforow2;
    	let t2;
    	let t3;
    	let if_block1_anchor;
    	let current;

    	inforow0 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_3],
    					center: [create_center_slot$1],
    					left: [create_left_slot_4]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_2],
    					left: [create_left_slot_3]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	inforow2 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot_1],
    					left: [create_left_slot_2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*currentPassLoaded*/ ctx[4] && create_if_block_2(ctx);
    	let if_block1 = /*journeyLoaded*/ ctx[3] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			create_component(inforow1.$$.fragment);
    			t1 = space();
    			create_component(inforow2.$$.fragment);
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
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
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inforow0_changes = {};

    			if (dirty & /*$$scope, arrivalTimeString, differentEndTime, endTimeString, backgroundColor, textColor, line, differentStartTime, startTimeString, departureTimeString*/ 4406880) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);
    			const inforow1_changes = {};

    			if (dirty & /*$$scope, departurePass, step*/ 4194433) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const inforow2_changes = {};

    			if (dirty & /*$$scope, arrivalPass, step*/ 4194561) {
    				inforow2_changes.$$scope = { dirty, ctx };
    			}

    			inforow2.$set(inforow2_changes);

    			if (/*currentPassLoaded*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*currentPassLoaded*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t3.parentNode, t3);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*journeyLoaded*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*journeyLoaded*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$8(ctx);
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
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(inforow2.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(inforow2.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(inforow2, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
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

    function toDeltaString(milliseconds) {
    	let leadingCharacter = "";

    	if (milliseconds < 0) {
    		milliseconds = Math.abs(milliseconds);
    		leadingCharacter = "-";
    	} else if (milliseconds > 0) {
    		leadingCharacter = "+";
    	} // else leadingCharacter = "";

    	let seconds = Math.floor(milliseconds / 1000);
    	let minutes = Math.floor(seconds / 60);
    	seconds -= minutes * 60;
    	seconds = String(seconds).padStart(2, "0");
    	return `${leadingCharacter}${minutes}:${seconds}`;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let journeyLoaded;
    	let currentPassLoaded;
    	let line;
    	let backgroundColor;
    	let textColor;
    	let startTimeString;
    	let endTimeString;
    	let stops;
    	let delta;
    	let deltaString;
    	let departurePass;
    	let arrivalPass;
    	let departureTimeString;
    	let arrivalTimeString;
    	let differentStartTime;
    	let differentEndTime;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Bus", slots, []);
    	var { step } = $$props;

    	// Data
    	var journey = null;

    	var currentPass = null;
    	var journeyPoller = null;
    	var locationPoller = null;

    	function matchPass(journey, location) {
    		if (journey === null) {
    			return null;
    		}

    		let passes = journey.passes.map(pass => {
    			pass.directDistance = getDirectDistance(pass.location, location);
    			return pass;
    		}).sort((a, b) => a.directDistance - b.directDistance);

    		return passes[0];
    	}

    	// Events
    	onMount(() => {
    		journeyPoller = createPoller({
    			query: `
            query($token: String!) {
                liveBusJourney(busJourneyId: $token) {
                    shouldPoll
                    refreshId
                    pollAfter
                    journey {
                        id
                        name
                        currentPass {
                            stopId
                            name
                            status
                            arrivalDelta {
                                onTime
                                milliseconds
                            }
                        }
                        passes {
                            stopId
                            name
                            status
                            platform
                            location {
                                lat
                                long
                            }
                            expectedArrivalTime {
                                timestamp
                            }
                        }
                        line {
                            destination {
                                id
                                name
                            }
                        }
                    }
                }
            }
        `,
    			initialToken: step.refreshId,
    			key: "liveBusJourney",
    			id: step.randomId,
    			memoizationTags: ["liveBusJourney", "liveRouteJourney"],
    			onData(data, instance) {
    				if (!!data?.journey) {
    					$$invalidate(1, journey = data.journey);
    					$$invalidate(2, currentPass = journey.currentPass);
    				}
    			}
    		});
    	});

    	onDestroy(() => {
    		if (journeyPoller) journeyPoller.stop();
    		if (locationPoller) locationPoller.stop();
    	});

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bus> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
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
    		timestampToString,
    		createPoller,
    		getDirectDistance,
    		InfoRow,
    		HeadSign,
    		MoreInfo,
    		BusTimeLine,
    		step,
    		journey,
    		currentPass,
    		journeyPoller,
    		locationPoller,
    		toDeltaString,
    		matchPass,
    		journeyLoaded,
    		currentPassLoaded,
    		line,
    		backgroundColor,
    		textColor,
    		startTimeString,
    		endTimeString,
    		stops,
    		delta,
    		deltaString,
    		departurePass,
    		arrivalPass,
    		departureTimeString,
    		arrivalTimeString,
    		differentStartTime,
    		differentEndTime
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("journey" in $$props) $$invalidate(1, journey = $$props.journey);
    		if ("currentPass" in $$props) $$invalidate(2, currentPass = $$props.currentPass);
    		if ("journeyPoller" in $$props) journeyPoller = $$props.journeyPoller;
    		if ("locationPoller" in $$props) locationPoller = $$props.locationPoller;
    		if ("journeyLoaded" in $$props) $$invalidate(3, journeyLoaded = $$props.journeyLoaded);
    		if ("currentPassLoaded" in $$props) $$invalidate(4, currentPassLoaded = $$props.currentPassLoaded);
    		if ("line" in $$props) $$invalidate(11, line = $$props.line);
    		if ("backgroundColor" in $$props) $$invalidate(12, backgroundColor = $$props.backgroundColor);
    		if ("textColor" in $$props) $$invalidate(13, textColor = $$props.textColor);
    		if ("startTimeString" in $$props) $$invalidate(5, startTimeString = $$props.startTimeString);
    		if ("endTimeString" in $$props) $$invalidate(6, endTimeString = $$props.endTimeString);
    		if ("stops" in $$props) $$invalidate(14, stops = $$props.stops);
    		if ("delta" in $$props) $$invalidate(18, delta = $$props.delta);
    		if ("deltaString" in $$props) $$invalidate(15, deltaString = $$props.deltaString);
    		if ("departurePass" in $$props) $$invalidate(7, departurePass = $$props.departurePass);
    		if ("arrivalPass" in $$props) $$invalidate(8, arrivalPass = $$props.arrivalPass);
    		if ("departureTimeString" in $$props) $$invalidate(9, departureTimeString = $$props.departureTimeString);
    		if ("arrivalTimeString" in $$props) $$invalidate(10, arrivalTimeString = $$props.arrivalTimeString);
    		if ("differentStartTime" in $$props) $$invalidate(16, differentStartTime = $$props.differentStartTime);
    		if ("differentEndTime" in $$props) $$invalidate(17, differentEndTime = $$props.differentEndTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*journey*/ 2) {
    			// Computed
    			$$invalidate(3, journeyLoaded = journey !== null);
    		}

    		if ($$self.$$.dirty & /*currentPass*/ 4) {
    			$$invalidate(4, currentPassLoaded = currentPass !== null);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(11, line = step.lineNumber);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(12, backgroundColor = getStepColor(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(13, textColor = getStepTextColor(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(5, startTimeString = timestampToString(step.departureTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(6, endTimeString = timestampToString(step.arrivalTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*journeyLoaded, journey*/ 10) {
    			$$invalidate(14, stops = journeyLoaded ? journey.passes : []);
    		}

    		if ($$self.$$.dirty & /*currentPassLoaded, currentPass*/ 20) {
    			$$invalidate(18, delta = currentPassLoaded
    			? currentPass.arrivalDelta.milliseconds
    			: 0);
    		}

    		if ($$self.$$.dirty & /*delta*/ 262144) {
    			$$invalidate(15, deltaString = toDeltaString(delta));
    		}

    		if ($$self.$$.dirty & /*journey, step*/ 3) {
    			$$invalidate(7, departurePass = matchPass(journey, step.fromLocation));
    		}

    		if ($$self.$$.dirty & /*journey, step*/ 3) {
    			$$invalidate(8, arrivalPass = matchPass(journey, step.toLocation));
    		}

    		if ($$self.$$.dirty & /*departurePass*/ 128) {
    			$$invalidate(9, departureTimeString = departurePass && timestampToString(departurePass.expectedArrivalTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*arrivalPass*/ 256) {
    			$$invalidate(10, arrivalTimeString = arrivalPass && timestampToString(arrivalPass.expectedArrivalTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*departureTimeString, startTimeString*/ 544) {
    			$$invalidate(16, differentStartTime = departureTimeString
    			? departureTimeString !== startTimeString
    			: false);
    		}

    		if ($$self.$$.dirty & /*arrivalTimeString, endTimeString*/ 1088) {
    			$$invalidate(17, differentEndTime = arrivalTimeString
    			? arrivalTimeString !== endTimeString
    			: false);
    		}
    	};

    	return [
    		step,
    		journey,
    		currentPass,
    		journeyLoaded,
    		currentPassLoaded,
    		startTimeString,
    		endTimeString,
    		departurePass,
    		arrivalPass,
    		departureTimeString,
    		arrivalTimeString,
    		line,
    		backgroundColor,
    		textColor,
    		stops,
    		deltaString,
    		differentStartTime,
    		differentEndTime,
    		delta
    	];
    }

    class Bus extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bus",
    			options,
    			id: create_fragment$A.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console.warn("<Bus> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<Bus>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Bus>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/RouteStep/PlatformChange.svelte generated by Svelte v3.38.3 */

    const file$v = "src/components/RouteStep/PlatformChange.svelte";

    function create_fragment$z(ctx) {
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
    			add_location(span, file$v, 0, 0, 0);
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
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let durationInMinutes;
    	let minuteText;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PlatformChange", slots, []);
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PlatformChange> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({ step, durationInMinutes, minuteText });

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("durationInMinutes" in $$props) $$invalidate(0, durationInMinutes = $$props.durationInMinutes);
    		if ("minuteText" in $$props) $$invalidate(1, minuteText = $$props.minuteText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 4) {
    			// Computed
    			$$invalidate(0, durationInMinutes = Math.round(step.travelDuration.seconds / 60));
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
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { step: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PlatformChange",
    			options,
    			id: create_fragment$z.name
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
        return step.travelMode;
    }

    function getStepColor(step) {
        if (step.travelMode === "walking" || step.travelMode === "platformChange") return "var(--stepWalkingColor)";

        return "#" + step.transitColor.background;
    }

    function getStepTextColor(step) {
        if (step.travelMode === "walking" || step.travelMode === "platformChange") return "";

        return "#" + step.transitColor.foreground;
    }

    function getStepIcon({ travelMode }) {
        if (travelMode === "walking") return "walk";
        if (travelMode === "platformChange") return "swap-horizontal";

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

    function createStepStore(storeName, data = {}) {
        var store = writable$1({
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

    const routeStore = writable$1({});

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

    /* src/components/Layout/LayoutCenter.svelte generated by Svelte v3.38.3 */

    const file$u = "src/components/Layout/LayoutCenter.svelte";

    function create_fragment$y(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-6w5f90");
    			add_location(div, file$u, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LayoutCenter", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LayoutCenter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class LayoutCenter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LayoutCenter",
    			options,
    			id: create_fragment$y.name
    		});
    	}
    }

    /* src/components/Layout/LayoutExpanded.svelte generated by Svelte v3.38.3 */

    const file$t = "src/components/Layout/LayoutExpanded.svelte";

    function create_fragment$x(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-1igufb4");
    			add_location(div, file$t, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LayoutExpanded", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LayoutExpanded> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class LayoutExpanded extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LayoutExpanded",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    /* src/components/Step.svelte generated by Svelte v3.38.3 */
    const file$s = "src/components/Step.svelte";

    // (1:0) {#if isCurrentStep && isFirstStep}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = LayoutCenter;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
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

    			if (dirty & /*$$scope, travelMode, inlineStyle*/ 2128) {
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
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(1:0) {#if isCurrentStep && isFirstStep}",
    		ctx
    	});

    	return block;
    }

    // (2:4) <svelte:component this={LayoutCenter}>
    function create_default_slot_1$7(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[4] + " svelte-qu0m3h");
    			attr_dev(div, "style", /*inlineStyle*/ ctx[6]);
    			add_location(div, file$s, 2, 8, 86);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*travelMode*/ 16 && div_class_value !== (div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[4] + " svelte-qu0m3h")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*inlineStyle*/ 64) {
    				attr_dev(div, "style", /*inlineStyle*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(2:4) <svelte:component this={LayoutCenter}>",
    		ctx
    	});

    	return block;
    }

    // (13:0) {#if isCurrentStep && isLastStep}
    function create_if_block$7(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = LayoutCenter;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
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

    			if (dirty & /*$$scope, travelMode, inlineStyle*/ 2128) {
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
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(13:0) {#if isCurrentStep && isLastStep}",
    		ctx
    	});

    	return block;
    }

    // (14:4) <svelte:component this={LayoutCenter}>
    function create_default_slot$9(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[4] + " svelte-qu0m3h");
    			attr_dev(div, "style", /*inlineStyle*/ ctx[6]);
    			add_location(div, file$s, 14, 8, 495);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*travelMode*/ 16 && div_class_value !== (div_class_value = "routeStep firstStep " + /*travelMode*/ ctx[4] + " svelte-qu0m3h")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*inlineStyle*/ 64) {
    				attr_dev(div, "style", /*inlineStyle*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(14:4) <svelte:component this={LayoutCenter}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let t0;
    	let div1;
    	let div0;
    	let switch_instance;
    	let div0_class_value;
    	let div1_class_value;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*isCurrentStep*/ ctx[3] && /*isFirstStep*/ ctx[1] && create_if_block_1$3(ctx);
    	var switch_value = /*stepInfoComponent*/ ctx[5];

    	function switch_props(ctx) {
    		return {
    			props: { step: /*step*/ ctx[0] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	let if_block1 = /*isCurrentStep*/ ctx[3] && /*isLastStep*/ ctx[2] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(div0, "class", div0_class_value = "routeStep " + /*travelMode*/ ctx[4] + " " + (/*isCurrentStep*/ ctx[3] && "current") + " svelte-qu0m3h");
    			attr_dev(div0, "style", /*inlineStyle*/ ctx[6]);
    			add_location(div0, file$s, 7, 4, 244);
    			attr_dev(div1, "class", div1_class_value = "layout " + (/*isCurrentStep*/ ctx[3] && "current") + " svelte-qu0m3h");
    			add_location(div1, file$s, 6, 0, 190);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (switch_instance) {
    				mount_component(switch_instance, div0, null);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isCurrentStep*/ ctx[3] && /*isFirstStep*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*isCurrentStep, isFirstStep*/ 10) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
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
    			if (dirty & /*step*/ 1) switch_instance_changes.step = /*step*/ ctx[0];

    			if (switch_value !== (switch_value = /*stepInfoComponent*/ ctx[5])) {
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
    					mount_component(switch_instance, div0, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			if (!current || dirty & /*travelMode, isCurrentStep*/ 24 && div0_class_value !== (div0_class_value = "routeStep " + /*travelMode*/ ctx[4] + " " + (/*isCurrentStep*/ ctx[3] && "current") + " svelte-qu0m3h")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*inlineStyle*/ 64) {
    				attr_dev(div0, "style", /*inlineStyle*/ ctx[6]);
    			}

    			if (!current || dirty & /*isCurrentStep*/ 8 && div1_class_value !== (div1_class_value = "layout " + (/*isCurrentStep*/ ctx[3] && "current") + " svelte-qu0m3h")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (/*isCurrentStep*/ ctx[3] && /*isLastStep*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*isCurrentStep, isLastStep*/ 12) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$7(ctx);
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
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
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
    	let isCurrentStep;
    	let travelMode;
    	let borderColor;
    	let borderStyle;
    	let stepInfoComponent;
    	let currentLayout;
    	let inlineStyle;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Step", slots, []);
    	var { step } = $$props;
    	var { isFirstStep = false } = $$props;
    	var { isLastStep = false } = $$props;
    	var { currentStep } = $$props;
    	const writable_props = ["step", "isFirstStep", "isLastStep", "currentStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Step> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("isFirstStep" in $$props) $$invalidate(1, isFirstStep = $$props.isFirstStep);
    		if ("isLastStep" in $$props) $$invalidate(2, isLastStep = $$props.isLastStep);
    		if ("currentStep" in $$props) $$invalidate(7, currentStep = $$props.currentStep);
    	};

    	$$self.$capture_state = () => ({
    		getStepColor,
    		getStepBorderStyle,
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
    		isFirstStep,
    		isLastStep,
    		currentStep,
    		isCurrentStep,
    		travelMode,
    		borderColor,
    		borderStyle,
    		stepInfoComponent,
    		currentLayout,
    		inlineStyle
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(0, step = $$props.step);
    		if ("isFirstStep" in $$props) $$invalidate(1, isFirstStep = $$props.isFirstStep);
    		if ("isLastStep" in $$props) $$invalidate(2, isLastStep = $$props.isLastStep);
    		if ("currentStep" in $$props) $$invalidate(7, currentStep = $$props.currentStep);
    		if ("isCurrentStep" in $$props) $$invalidate(3, isCurrentStep = $$props.isCurrentStep);
    		if ("travelMode" in $$props) $$invalidate(4, travelMode = $$props.travelMode);
    		if ("borderColor" in $$props) $$invalidate(8, borderColor = $$props.borderColor);
    		if ("borderStyle" in $$props) $$invalidate(9, borderStyle = $$props.borderStyle);
    		if ("stepInfoComponent" in $$props) $$invalidate(5, stepInfoComponent = $$props.stepInfoComponent);
    		if ("currentLayout" in $$props) currentLayout = $$props.currentLayout;
    		if ("inlineStyle" in $$props) $$invalidate(6, inlineStyle = $$props.inlineStyle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*currentStep*/ 128) {
    			// Computed
    			$$invalidate(3, isCurrentStep = currentStep);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(4, travelMode = step.travelMode);
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(8, borderColor = getStepColor(step));
    		}

    		if ($$self.$$.dirty & /*step*/ 1) {
    			$$invalidate(9, borderStyle = getStepBorderStyle(step));
    		}

    		if ($$self.$$.dirty & /*travelMode*/ 16) {
    			$$invalidate(5, stepInfoComponent = getStepInfoComponent(travelMode));
    		}

    		if ($$self.$$.dirty & /*isCurrentStep*/ 8) {
    			currentLayout = isCurrentStep ? LayoutExpanded : LayoutCenter;
    		}

    		if ($$self.$$.dirty & /*borderColor, borderStyle*/ 768) {
    			$$invalidate(6, inlineStyle = `border-color: ${borderColor}; border-style: ${borderStyle}`);
    		}
    	};

    	return [
    		step,
    		isFirstStep,
    		isLastStep,
    		isCurrentStep,
    		travelMode,
    		stepInfoComponent,
    		inlineStyle,
    		currentStep,
    		borderColor,
    		borderStyle
    	];
    }

    class Step extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {
    			step: 0,
    			isFirstStep: 1,
    			isLastStep: 2,
    			currentStep: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Step",
    			options,
    			id: create_fragment$w.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console.warn("<Step> was created without expected prop 'step'");
    		}

    		if (/*currentStep*/ ctx[7] === undefined && !("currentStep" in props)) {
    			console.warn("<Step> was created without expected prop 'currentStep'");
    		}
    	}

    	get step() {
    		throw new Error("<Step>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Step>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isFirstStep() {
    		throw new Error("<Step>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isFirstStep(value) {
    		throw new Error("<Step>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isLastStep() {
    		throw new Error("<Step>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isLastStep(value) {
    		throw new Error("<Step>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentStep() {
    		throw new Error("<Step>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentStep(value) {
    		throw new Error("<Step>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ButtonContainer.svelte generated by Svelte v3.38.3 */

    const file$r = "src/components/ButtonContainer.svelte";

    function create_fragment$v(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "buttonContainer svelte-xqqs5k");
    			add_location(div, file$r, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ButtonContainer", slots, ['default']);
    	var { buttons = 1 } = $$props;
    	const writable_props = ["buttons"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ButtonContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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

    	return [buttons, $$scope, slots];
    }

    class ButtonContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { buttons: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonContainer",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get buttons() {
    		throw new Error("<ButtonContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttons(value) {
    		throw new Error("<ButtonContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Button.svelte generated by Svelte v3.38.3 */
    const file$q = "src/components/Button.svelte";

    // (2:4) {#if iconPresent}
    function create_if_block$6(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-123bej5");
    			add_location(span, file$q, 2, 8, 81);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-123bej5")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(2:4) {#if iconPresent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let button;
    	let t;
    	let button_disabled_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*iconPresent*/ ctx[2] && create_if_block$6(ctx);
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			button.disabled = button_disabled_value = !/*enabled*/ ctx[1];
    			attr_dev(button, "class", "svelte-123bej5");
    			add_location(button, file$q, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*clickEvent*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*iconPresent*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], !current ? -1 : dirty, null, null);
    				}
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
    			mounted = false;
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
    	let iconPresent;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);
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

    	$$self.$$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("enabled" in $$props) $$invalidate(1, enabled = $$props.enabled);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
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

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 1) {
    			// Computed
    			$$invalidate(2, iconPresent = icon !== null);
    		}
    	};

    	return [icon, enabled, iconPresent, clickEvent, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { icon: 0, enabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$u.name
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

    /* src/components/Misc/EmptyState.svelte generated by Svelte v3.38.3 */

    const file$p = "src/components/Misc/EmptyState.svelte";

    function create_fragment$t(ctx) {
    	let div;
    	let h3;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "class", "svelte-1nr9pv9");
    			add_location(h3, file$p, 1, 4, 29);
    			attr_dev(div, "class", "emptyState svelte-1nr9pv9");
    			add_location(div, file$p, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("EmptyState", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<EmptyState> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class EmptyState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EmptyState",
    			options,
    			id: create_fragment$t.name
    		});
    	}
    }

    /* src/components/RouteGuide.svelte generated by Svelte v3.38.3 */

    const { Object: Object_1$1 } = globals;
    const file$o = "src/components/RouteGuide.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (12:4) {:else}
    function create_else_block$2(ctx) {
    	let layoutcenter;
    	let current;

    	layoutcenter = new LayoutCenter({
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

    			if (dirty & /*$$scope*/ 4096) {
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
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t3;
    	let div1;
    	let p1;
    	let span1;
    	let t4;
    	let b1;
    	let t5;
    	let current;
    	let each_value = /*steps*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*step*/ ctx[9];
    	validate_each_keys(ctx, each_value, get_each_context$7, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$7(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$7(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			p0 = element("p");
    			span0 = element("span");
    			t0 = text(" Vertrek om ");
    			b0 = element("b");
    			t1 = text(/*departureTime*/ ctx[3]);
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
    			t5 = text(/*arrivalTime*/ ctx[4]);
    			attr_dev(span0, "class", "mdi mdi-flag svelte-1e5g25y");
    			add_location(span0, file$o, 3, 15, 94);
    			add_location(b0, file$o, 3, 61, 140);
    			attr_dev(p0, "class", "svelte-1e5g25y");
    			add_location(p0, file$o, 3, 12, 91);
    			attr_dev(div0, "class", "tripStartInfo svelte-1e5g25y");
    			add_location(div0, file$o, 2, 8, 51);
    			attr_dev(span1, "class", "mdi mdi-flag-checkered svelte-1e5g25y");
    			add_location(span1, file$o, 9, 15, 422);
    			add_location(b1, file$o, 9, 72, 479);
    			attr_dev(p1, "class", "svelte-1e5g25y");
    			add_location(p1, file$o, 9, 12, 419);
    			attr_dev(div1, "class", "tripStartInfo svelte-1e5g25y");
    			add_location(div1, file$o, 8, 8, 379);
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
    			if (!current || dirty & /*departureTime*/ 8) set_data_dev(t1, /*departureTime*/ ctx[3]);

    			if (dirty & /*steps, currentStep*/ 6) {
    				each_value = /*steps*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$7, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, t3.parentNode, outro_and_destroy_block, create_each_block$7, t3, get_each_context$7);
    				check_outros();
    			}

    			if (!current || dirty & /*arrivalTime*/ 16) set_data_dev(t5, /*arrivalTime*/ ctx[4]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

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
    function create_default_slot_4$1(ctx) {
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
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(14:12) <EmptyState>",
    		ctx
    	});

    	return block;
    }

    // (13:8) <LayoutCenter>
    function create_default_slot_3$1(ctx) {
    	let emptystate;
    	let current;

    	emptystate = new EmptyState({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
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

    			if (dirty & /*$$scope*/ 4096) {
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

    // (6:8) {#each steps as step, index (step)}
    function create_each_block$7(key_1, ctx) {
    	let first;
    	let step;
    	let current;

    	step = new Step({
    			props: {
    				step: /*step*/ ctx[9],
    				currentStep: /*step*/ ctx[9] === /*currentStep*/ ctx[2],
    				isFirstStep: /*index*/ ctx[11] === 0,
    				isLastStep: /*index*/ ctx[11] === /*steps*/ ctx[1].length - 1
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(step.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(step, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const step_changes = {};
    			if (dirty & /*steps*/ 2) step_changes.step = /*step*/ ctx[9];
    			if (dirty & /*steps, currentStep*/ 6) step_changes.currentStep = /*step*/ ctx[9] === /*currentStep*/ ctx[2];
    			if (dirty & /*steps*/ 2) step_changes.isFirstStep = /*index*/ ctx[11] === 0;
    			if (dirty & /*steps*/ 2) step_changes.isLastStep = /*index*/ ctx[11] === /*steps*/ ctx[1].length - 1;
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
    			if (detaching) detach_dev(first);
    			destroy_component(step, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(6:8) {#each steps as step, index (step)}",
    		ctx
    	});

    	return block;
    }

    // (19:12) {#if started}
    function create_if_block$5(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				icon: "stop-circle-outline",
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*endRoute*/ ctx[5]);

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

    			if (dirty & /*$$scope*/ 4096) {
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
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(19:12) {#if started}",
    		ctx
    	});

    	return block;
    }

    // (20:16) <Button on:click={endRoute} icon="stop-circle-outline">
    function create_default_slot_2$4(ctx) {
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
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(20:16) <Button on:click={endRoute} icon=\\\"stop-circle-outline\\\">",
    		ctx
    	});

    	return block;
    }

    // (18:8) <ButtonContainer buttons={1}>
    function create_default_slot_1$6(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*started*/ ctx[0] && create_if_block$5(ctx);

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
    			if (/*started*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*started*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
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
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(18:8) <ButtonContainer buttons={1}>",
    		ctx
    	});

    	return block;
    }

    // (17:4) <LayoutCenter>
    function create_default_slot$8(ctx) {
    	let buttoncontainer;
    	let current;

    	buttoncontainer = new ButtonContainer({
    			props: {
    				buttons: 1,
    				$$slots: { default: [create_default_slot_1$6] },
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

    			if (dirty & /*$$scope, started*/ 4097) {
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
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(17:4) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let layoutcenter;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*started*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$8] },
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
    			attr_dev(div, "class", "routeGuide svelte-1e5g25y");
    			add_location(div, file$o, 0, 0, 0);
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
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, t);
    			}

    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, started*/ 4097) {
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
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let started;
    	let steps;
    	let currentStep;
    	let departureTime;
    	let arrivalTime;
    	let $locationStore;
    	validate_store(locationStore, "locationStore");
    	component_subscribe($$self, locationStore, $$value => $$invalidate(7, $locationStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("RouteGuide", slots, []);
    	const dispatch = createEventDispatcher();
    	var { route } = $$props;

    	// Functions
    	function endRoute() {
    		if (confirm("Weet je zeker dat je deze route wilt stoppen?")) {
    			dispatch("endRoute");
    		}
    	}

    	const writable_props = ["route"];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RouteGuide> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("route" in $$props) $$invalidate(6, route = $$props.route);
    	};

    	$$self.$capture_state = () => ({
    		getCurrentStep: getCurrentStep$1,
    		locationStore,
    		createEventDispatcher,
    		dispatch,
    		Step,
    		ButtonContainer,
    		Button,
    		EmptyState,
    		LayoutCenter,
    		timestampToString,
    		route,
    		endRoute,
    		started,
    		steps,
    		currentStep,
    		$locationStore,
    		departureTime,
    		arrivalTime
    	});

    	$$self.$inject_state = $$props => {
    		if ("route" in $$props) $$invalidate(6, route = $$props.route);
    		if ("started" in $$props) $$invalidate(0, started = $$props.started);
    		if ("steps" in $$props) $$invalidate(1, steps = $$props.steps);
    		if ("currentStep" in $$props) $$invalidate(2, currentStep = $$props.currentStep);
    		if ("departureTime" in $$props) $$invalidate(3, departureTime = $$props.departureTime);
    		if ("arrivalTime" in $$props) $$invalidate(4, arrivalTime = $$props.arrivalTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*route*/ 64) {
    			// Computed
    			$$invalidate(0, started = Object.values(route).length > 0);
    		}

    		if ($$self.$$.dirty & /*route*/ 64) {
    			$$invalidate(1, steps = route.steps);
    		}

    		if ($$self.$$.dirty & /*route, $locationStore*/ 192) {
    			$$invalidate(2, currentStep = getCurrentStep$1(route));
    		}

    		if ($$self.$$.dirty & /*started, route*/ 65) {
    			$$invalidate(3, departureTime = started
    			? timestampToString(route.departureTime.timestamp)
    			: "");
    		}

    		if ($$self.$$.dirty & /*started, route*/ 65) {
    			$$invalidate(4, arrivalTime = started
    			? timestampToString(route.arrivalTime.timestamp)
    			: "");
    		}
    	};

    	return [
    		started,
    		steps,
    		currentStep,
    		departureTime,
    		arrivalTime,
    		endRoute,
    		route,
    		$locationStore
    	];
    }

    class RouteGuide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { route: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RouteGuide",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*route*/ ctx[6] === undefined && !("route" in props)) {
    			console.warn("<RouteGuide> was created without expected prop 'route'");
    		}
    	}

    	get route() {
    		throw new Error("<RouteGuide>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set route(value) {
    		throw new Error("<RouteGuide>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TripOverviewBar.svelte generated by Svelte v3.38.3 */

    const { console: console_1$1 } = globals;
    const file$n = "src/components/TripOverviewBar.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (2:4) {#each steps as step}
    function create_each_block$6(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "tripSection svelte-18r7gdp");
    			attr_dev(div, "style", div_style_value = /*getStyle*/ ctx[1](/*step*/ ctx[3]));
    			add_location(div, file$n, 2, 8, 64);
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
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(2:4) {#each steps as step}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let div;
    	let each_value = /*steps*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "tripOverviewBar svelte-18r7gdp");
    			add_location(div, file$n, 0, 0, 0);
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
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
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
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripOverviewBar", slots, []);
    	var { steps } = $$props;
    	console.log(steps);

    	// Functions
    	function getStyle(step) {
    		return `width: ${getWidth(step)}%;
    border-color: ${getStepColor(step)};
    border-style: ${getStepBorderStyle(step)}`;
    	}

    	function getWidth(step) {
    		var stepDuration = step.travelDuration.seconds;
    		var totalTime = steps.reduce((acc, step) => acc + step.travelDuration.seconds, 0);
    		return stepDuration / totalTime * 100;
    	}

    	const writable_props = ["steps"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<TripOverviewBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { steps: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripOverviewBar",
    			options,
    			id: create_fragment$r.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*steps*/ ctx[0] === undefined && !("steps" in props)) {
    			console_1$1.warn("<TripOverviewBar> was created without expected prop 'steps'");
    		}
    	}

    	get steps() {
    		throw new Error("<TripOverviewBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set steps(value) {
    		throw new Error("<TripOverviewBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/Trip/TripHeader.svelte generated by Svelte v3.38.3 */
    const file$m = "src/components/Trips/Trip/TripHeader.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (2:4) 
    function create_left_slot_1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*endName*/ ctx[1]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$m, 1, 4, 14);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*endName*/ 2) set_data_dev(t, /*endName*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot_1.name,
    		type: "slot",
    		source: "(2:4) ",
    		ctx
    	});

    	return block;
    }

    // (6:4) 
    function create_left_slot$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*departureTimeString*/ ctx[3]);
    			attr_dev(span, "slot", "left");
    			add_location(span, file$m, 5, 4, 75);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*departureTimeString*/ 8) set_data_dev(t, /*departureTimeString*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot$1.name,
    		type: "slot",
    		source: "(6:4) ",
    		ctx
    	});

    	return block;
    }

    // (10:8) {#each icons as icon}
    function create_each_block$5(ctx) {
    	let span;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[7]);
    			add_location(span, file$m, 10, 12, 221);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icons*/ 16 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[7])) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(10:8) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    // (9:4) 
    function create_center_slot(ctx) {
    	let span;
    	let each_value = /*icons*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "tripIcons");
    			attr_dev(span, "slot", "center");
    			add_location(span, file$m, 8, 4, 140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icons*/ 16) {
    				each_value = /*icons*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(span, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_center_slot.name,
    		type: "slot",
    		source: "(9:4) ",
    		ctx
    	});

    	return block;
    }

    // (14:4) 
    function create_right_slot(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*arrivalTimeString*/ ctx[2]);
    			attr_dev(span, "slot", "right");
    			add_location(span, file$m, 13, 4, 290);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*arrivalTimeString*/ 4) set_data_dev(t, /*arrivalTimeString*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_right_slot.name,
    		type: "slot",
    		source: "(14:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let inforow0;
    	let t0;
    	let inforow1;
    	let t1;
    	let tripoverviewbar;
    	let current;

    	inforow0 = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	inforow1 = new InfoRow({
    			props: {
    				$$slots: {
    					right: [create_right_slot],
    					center: [create_center_slot],
    					left: [create_left_slot$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tripoverviewbar = new TripOverviewBar({
    			props: { steps: /*steps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inforow0.$$.fragment);
    			t0 = space();
    			create_component(inforow1.$$.fragment);
    			t1 = space();
    			create_component(tripoverviewbar.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inforow0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(inforow1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(tripoverviewbar, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inforow0_changes = {};

    			if (dirty & /*$$scope, endName*/ 1026) {
    				inforow0_changes.$$scope = { dirty, ctx };
    			}

    			inforow0.$set(inforow0_changes);
    			const inforow1_changes = {};

    			if (dirty & /*$$scope, arrivalTimeString, icons, departureTimeString*/ 1052) {
    				inforow1_changes.$$scope = { dirty, ctx };
    			}

    			inforow1.$set(inforow1_changes);
    			const tripoverviewbar_changes = {};
    			if (dirty & /*steps*/ 1) tripoverviewbar_changes.steps = /*steps*/ ctx[0];
    			tripoverviewbar.$set(tripoverviewbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inforow0.$$.fragment, local);
    			transition_in(inforow1.$$.fragment, local);
    			transition_in(tripoverviewbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inforow0.$$.fragment, local);
    			transition_out(inforow1.$$.fragment, local);
    			transition_out(tripoverviewbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inforow0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(inforow1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(tripoverviewbar, detaching);
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

    function instance$q($$self, $$props, $$invalidate) {
    	let steps;
    	let endName;
    	let arrivalTimeString;
    	let departureTimeString;
    	let icons;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripHeader", slots, []);
    	var { trip } = $$props;

    	// Functions
    	function getTripIcons(steps) {
    		return steps.map(step => getStepIcon(step));
    	}

    	const writable_props = ["trip"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("trip" in $$props) $$invalidate(5, trip = $$props.trip);
    	};

    	$$self.$capture_state = () => ({
    		getStepIcon,
    		timestampToString,
    		InfoRow,
    		TripOverviewBar,
    		trip,
    		getTripIcons,
    		steps,
    		endName,
    		arrivalTimeString,
    		departureTimeString,
    		icons
    	});

    	$$self.$inject_state = $$props => {
    		if ("trip" in $$props) $$invalidate(5, trip = $$props.trip);
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    		if ("endName" in $$props) $$invalidate(1, endName = $$props.endName);
    		if ("arrivalTimeString" in $$props) $$invalidate(2, arrivalTimeString = $$props.arrivalTimeString);
    		if ("departureTimeString" in $$props) $$invalidate(3, departureTimeString = $$props.departureTimeString);
    		if ("icons" in $$props) $$invalidate(4, icons = $$props.icons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*trip*/ 32) {
    			// Computed
    			$$invalidate(0, steps = trip.steps);
    		}

    		if ($$self.$$.dirty & /*trip*/ 32) {
    			$$invalidate(1, endName = trip.toAddress.streetName);
    		}

    		if ($$self.$$.dirty & /*trip*/ 32) {
    			$$invalidate(2, arrivalTimeString = timestampToString(trip.arrivalTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*trip*/ 32) {
    			$$invalidate(3, departureTimeString = timestampToString(trip.departureTime.timestamp));
    		}

    		if ($$self.$$.dirty & /*steps*/ 1) {
    			$$invalidate(4, icons = getTripIcons(steps));
    		}
    	};

    	return [steps, endName, arrivalTimeString, departureTimeString, icons, trip];
    }

    class TripHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { trip: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripHeader",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trip*/ ctx[5] === undefined && !("trip" in props)) {
    			console.warn("<TripHeader> was created without expected prop 'trip'");
    		}
    	}

    	get trip() {
    		throw new Error("<TripHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trip(value) {
    		throw new Error("<TripHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/Trip/StepList/SmallStep.svelte generated by Svelte v3.38.3 */
    const file$l = "src/components/Trips/Trip/StepList/SmallStep.svelte";

    function create_fragment$p(ctx) {
    	let div;
    	let p;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*step*/ ctx[0].instructions + "";
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			span = element("span");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[2] + " svelte-1la0rdn");
    			add_location(span, file$l, 1, 7, 47);
    			attr_dev(p, "class", "svelte-1la0rdn");
    			add_location(p, file$l, 1, 4, 44);
    			attr_dev(div, "class", "stepSmall svelte-1la0rdn");
    			attr_dev(div, "style", /*styling*/ ctx[1]);
    			add_location(div, file$l, 0, 0, 0);
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
    			if (dirty & /*icon*/ 4 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[2] + " svelte-1la0rdn")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*step*/ 1 && t1_value !== (t1_value = /*step*/ ctx[0].instructions + "")) set_data_dev(t1, t1_value);

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
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let styling;
    	let icon;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SmallStep", slots, []);
    	var { step } = $$props;
    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SmallStep> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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

    class SmallStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmallStep",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*step*/ ctx[0] === undefined && !("step" in props)) {
    			console.warn("<SmallStep> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<SmallStep>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<SmallStep>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/Trip/StepList.svelte generated by Svelte v3.38.3 */
    const file$k = "src/components/Trips/Trip/StepList.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (2:4) {#each steps as step}
    function create_each_block$4(ctx) {
    	let smallstep;
    	let current;

    	smallstep = new SmallStep({
    			props: { step: /*step*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smallstep.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(smallstep, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const smallstep_changes = {};
    			if (dirty & /*steps*/ 1) smallstep_changes.step = /*step*/ ctx[1];
    			smallstep.$set(smallstep_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smallstep.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smallstep.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smallstep, detaching);
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

    function create_fragment$o(ctx) {
    	let div;
    	let current;
    	let each_value = /*steps*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
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

    			attr_dev(div, "class", "stepList svelte-1e5d5z3");
    			add_location(div, file$k, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*steps*/ 1) {
    				each_value = /*steps*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
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
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("StepList", slots, []);
    	var { steps = [] } = $$props;
    	const writable_props = ["steps"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<StepList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    	};

    	$$self.$capture_state = () => ({ SmallStep, steps });

    	$$self.$inject_state = $$props => {
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [steps];
    }

    class StepList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { steps: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StepList",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get steps() {
    		throw new Error("<StepList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set steps(value) {
    		throw new Error("<StepList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/Trip/TripDetails.svelte generated by Svelte v3.38.3 */

    function create_fragment$n(ctx) {
    	let steplist;
    	let current;

    	steplist = new StepList({
    			props: { steps: /*steps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(steplist.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(steplist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const steplist_changes = {};
    			if (dirty & /*steps*/ 1) steplist_changes.steps = /*steps*/ ctx[0];
    			steplist.$set(steplist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(steplist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(steplist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(steplist, detaching);
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
    	let steps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripDetails", slots, []);
    	var { trip } = $$props;
    	const writable_props = ["trip"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripDetails> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("trip" in $$props) $$invalidate(1, trip = $$props.trip);
    	};

    	$$self.$capture_state = () => ({ StepList, trip, steps });

    	$$self.$inject_state = $$props => {
    		if ("trip" in $$props) $$invalidate(1, trip = $$props.trip);
    		if ("steps" in $$props) $$invalidate(0, steps = $$props.steps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*trip*/ 2) {
    			// Computed
    			$$invalidate(0, steps = trip.steps);
    		}
    	};

    	return [steps, trip];
    }

    class TripDetails extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { trip: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripDetails",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trip*/ ctx[1] === undefined && !("trip" in props)) {
    			console.warn("<TripDetails> was created without expected prop 'trip'");
    		}
    	}

    	get trip() {
    		throw new Error("<TripDetails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trip(value) {
    		throw new Error("<TripDetails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/Trip.svelte generated by Svelte v3.38.3 */
    const file$j = "src/components/Trips/Trip.svelte";

    function create_fragment$m(ctx) {
    	let tripheader;
    	let t0;
    	let h4;
    	let t2;
    	let tripdetails;
    	let current;

    	tripheader = new TripHeader({
    			props: { trip: /*trip*/ ctx[0] },
    			$$inline: true
    		});

    	tripdetails = new TripDetails({
    			props: { trip: /*trip*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tripheader.$$.fragment);
    			t0 = space();
    			h4 = element("h4");
    			h4.textContent = "Stappen";
    			t2 = space();
    			create_component(tripdetails.$$.fragment);
    			attr_dev(h4, "class", "svelte-t6gein");
    			add_location(h4, file$j, 2, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tripheader, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(tripdetails, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tripheader_changes = {};
    			if (dirty & /*trip*/ 1) tripheader_changes.trip = /*trip*/ ctx[0];
    			tripheader.$set(tripheader_changes);
    			const tripdetails_changes = {};
    			if (dirty & /*trip*/ 1) tripdetails_changes.trip = /*trip*/ ctx[0];
    			tripdetails.$set(tripdetails_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tripheader.$$.fragment, local);
    			transition_in(tripdetails.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tripheader.$$.fragment, local);
    			transition_out(tripdetails.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tripheader, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t2);
    			destroy_component(tripdetails, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Trip", slots, []);
    	var { trip } = $$props;
    	const writable_props = ["trip"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Trip> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    	};

    	$$self.$capture_state = () => ({ TripHeader, TripDetails, trip });

    	$$self.$inject_state = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [trip];
    }

    class Trip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { trip: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Trip",
    			options,
    			id: create_fragment$m.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trip*/ ctx[0] === undefined && !("trip" in props)) {
    			console.warn("<Trip> was created without expected prop 'trip'");
    		}
    	}

    	get trip() {
    		throw new Error("<Trip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trip(value) {
    		throw new Error("<Trip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Misc/SoftButton.svelte generated by Svelte v3.38.3 */
    const file$i = "src/components/Misc/SoftButton.svelte";

    function create_fragment$l(ctx) {
    	let button;
    	let span;
    	let span_class_value;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1jnzt38");
    			add_location(span, file$i, 1, 4, 35);
    			attr_dev(button, "class", "svelte-1jnzt38");
    			add_location(button, file$i, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*clickEvent*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-1jnzt38")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], !current ? -1 : dirty, null, null);
    				}
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
    			mounted = false;
    			dispose();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SoftButton", slots, ['default']);
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

    	$$self.$$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
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

    	return [icon, clickEvent, $$scope, slots];
    }

    class SoftButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { icon: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SoftButton",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get icon() {
    		throw new Error("<SoftButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<SoftButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/TripResult.svelte generated by Svelte v3.38.3 */
    const file$h = "src/components/Trips/TripResult.svelte";

    // (4:4) {#if trainCancelled}
    function create_if_block$4(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text("\n            Er is een trein die niet rijd");
    			attr_dev(span, "class", "mdi mdi-alert");
    			add_location(span, file$h, 5, 12, 113);
    			attr_dev(p, "class", "cancelled svelte-1vzvpjq");
    			add_location(p, file$h, 4, 8, 79);
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
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(4:4) {#if trainCancelled}",
    		ctx
    	});

    	return block;
    }

    // (12:8) <SoftButton on:click="{() => selectTrip(trip)}" icon="play-circle-outline">
    function create_default_slot_2$3(ctx) {
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
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(12:8) <SoftButton on:click=\\\"{() => selectTrip(trip)}\\\" icon=\\\"play-circle-outline\\\">",
    		ctx
    	});

    	return block;
    }

    // (16:8) <SoftButton icon="plus-circle-outline" on:click={() => popupOpen = true}>
    function create_default_slot_1$5(ctx) {
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
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(16:8) <SoftButton icon=\\\"plus-circle-outline\\\" on:click={() => popupOpen = true}>",
    		ctx
    	});

    	return block;
    }

    // (22:0) <Popup bind:open={popupOpen}>
    function create_default_slot$7(ctx) {
    	let trip_1;
    	let current;

    	trip_1 = new Trip({
    			props: { trip: /*trip*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(trip_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(trip_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const trip_1_changes = {};
    			if (dirty & /*trip*/ 1) trip_1_changes.trip = /*trip*/ ctx[0];
    			trip_1.$set(trip_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trip_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trip_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(trip_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(22:0) <Popup bind:open={popupOpen}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div1;
    	let tripheader;
    	let t0;
    	let t1;
    	let div0;
    	let softbutton0;
    	let t2;
    	let softbutton1;
    	let t3;
    	let popup;
    	let updating_open;
    	let current;

    	tripheader = new TripHeader({
    			props: { trip: /*trip*/ ctx[0] },
    			$$inline: true
    		});

    	let if_block = /*trainCancelled*/ ctx[2] && create_if_block$4(ctx);

    	softbutton0 = new SoftButton({
    			props: {
    				icon: "play-circle-outline",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton0.$on("click", /*click_handler*/ ctx[4]);

    	softbutton1 = new SoftButton({
    			props: {
    				icon: "plus-circle-outline",
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton1.$on("click", /*click_handler_1*/ ctx[5]);

    	function popup_open_binding(value) {
    		/*popup_open_binding*/ ctx[6](value);
    	}

    	let popup_props = {
    		$$slots: { default: [create_default_slot$7] },
    		$$scope: { ctx }
    	};

    	if (/*popupOpen*/ ctx[1] !== void 0) {
    		popup_props.open = /*popupOpen*/ ctx[1];
    	}

    	popup = new Popup({ props: popup_props, $$inline: true });
    	binding_callbacks.push(() => bind(popup, "open", popup_open_binding));

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(tripheader.$$.fragment);
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div0 = element("div");
    			create_component(softbutton0.$$.fragment);
    			t2 = space();
    			create_component(softbutton1.$$.fragment);
    			t3 = space();
    			create_component(popup.$$.fragment);
    			attr_dev(div0, "class", "buttons svelte-1vzvpjq");
    			add_location(div0, file$h, 10, 4, 219);
    			attr_dev(div1, "class", "trip svelte-1vzvpjq");
    			add_location(div1, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(tripheader, div1, null);
    			append_dev(div1, t0);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(softbutton0, div0, null);
    			append_dev(div0, t2);
    			mount_component(softbutton1, div0, null);
    			insert_dev(target, t3, anchor);
    			mount_component(popup, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tripheader_changes = {};
    			if (dirty & /*trip*/ 1) tripheader_changes.trip = /*trip*/ ctx[0];
    			tripheader.$set(tripheader_changes);

    			if (/*trainCancelled*/ ctx[2]) {
    				if (if_block) ; else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div1, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const softbutton0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				softbutton0_changes.$$scope = { dirty, ctx };
    			}

    			softbutton0.$set(softbutton0_changes);
    			const softbutton1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				softbutton1_changes.$$scope = { dirty, ctx };
    			}

    			softbutton1.$set(softbutton1_changes);
    			const popup_changes = {};

    			if (dirty & /*$$scope, trip*/ 257) {
    				popup_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*popupOpen*/ 2) {
    				updating_open = true;
    				popup_changes.open = /*popupOpen*/ ctx[1];
    				add_flush_callback(() => updating_open = false);
    			}

    			popup.$set(popup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tripheader.$$.fragment, local);
    			transition_in(softbutton0.$$.fragment, local);
    			transition_in(softbutton1.$$.fragment, local);
    			transition_in(popup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tripheader.$$.fragment, local);
    			transition_out(softbutton0.$$.fragment, local);
    			transition_out(softbutton1.$$.fragment, local);
    			transition_out(popup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(tripheader);
    			if (if_block) if_block.d();
    			destroy_component(softbutton0);
    			destroy_component(softbutton1);
    			if (detaching) detach_dev(t3);
    			destroy_component(popup, detaching);
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
    	let trainCancelled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripResult", slots, []);
    	const dispatch = createEventDispatcher();
    	var { trip } = $$props;

    	// Data
    	var popupOpen = false;

    	// Functions
    	function selectTrip(trip) {
    		dispatch("selectTrip", trip);
    	}

    	const writable_props = ["trip"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripResult> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => selectTrip(trip);
    	const click_handler_1 = () => $$invalidate(1, popupOpen = true);

    	function popup_open_binding(value) {
    		popupOpen = value;
    		$$invalidate(1, popupOpen);
    	}

    	$$self.$$set = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		Trip,
    		TripHeader,
    		SoftButton,
    		Popup,
    		trip,
    		popupOpen,
    		selectTrip,
    		trainCancelled
    	});

    	$$self.$inject_state = $$props => {
    		if ("trip" in $$props) $$invalidate(0, trip = $$props.trip);
    		if ("popupOpen" in $$props) $$invalidate(1, popupOpen = $$props.popupOpen);
    		if ("trainCancelled" in $$props) $$invalidate(2, trainCancelled = $$props.trainCancelled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*trip*/ 1) {
    			// Computed
    			$$invalidate(2, trainCancelled = trip.steps.filter(step => step.travelMode === "train").some(step => {
    				if (step.journey === null) {
    					return false;
    				}

    				return step.journey.cancelled === true;
    			}));
    		}
    	};

    	return [
    		trip,
    		popupOpen,
    		trainCancelled,
    		selectTrip,
    		click_handler,
    		click_handler_1,
    		popup_open_binding
    	];
    }

    class TripResult extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { trip: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripResult",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trip*/ ctx[0] === undefined && !("trip" in props)) {
    			console.warn("<TripResult> was created without expected prop 'trip'");
    		}
    	}

    	get trip() {
    		throw new Error("<TripResult>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trip(value) {
    		throw new Error("<TripResult>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/LabelDivider.svelte generated by Svelte v3.38.3 */

    const file$g = "src/components/LabelDivider.svelte";

    function create_fragment$j(ctx) {
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
    			attr_dev(div, "class", "divider svelte-1q11nb8");
    			add_location(div, file$g, 0, 0, 0);
    			attr_dev(span, "class", "svelte-1q11nb8");
    			add_location(span, file$g, 1, 4, 32);
    			attr_dev(h6, "class", "svelte-1q11nb8");
    			add_location(h6, file$g, 1, 0, 28);
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
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LabelDivider", slots, []);
    	var { text = "" } = $$props;
    	const writable_props = ["text"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LabelDivider> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { text: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LabelDivider",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get text() {
    		throw new Error("<LabelDivider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<LabelDivider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/SearchBar.svelte generated by Svelte v3.38.3 */
    const file$f = "src/components/SearchBar.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (8:4) {#if resultsAvailable}
    function create_if_block$3(ctx) {
    	let div;
    	let each_value = /*results*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "searchResults");
    			add_location(div, file$f, 8, 8, 310);
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
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(8:4) {#if resultsAvailable}",
    		ctx
    	});

    	return block;
    }

    // (10:12) {#each results as result}
    function create_each_block$3(ctx) {
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
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[6](/*result*/ ctx[8]);
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
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*result*/ ctx[8].icon + " svelte-przkis");
    			add_location(span, file$f, 12, 24, 533);
    			attr_dev(div0, "class", "iconWrapper svelte-przkis");
    			add_location(div0, file$f, 11, 20, 483);
    			attr_dev(p, "class", "svelte-przkis");
    			add_location(p, file$f, 15, 24, 674);
    			attr_dev(div1, "class", "textWrapper svelte-przkis");
    			add_location(div1, file$f, 14, 20, 624);
    			attr_dev(div2, "class", "searchBarResult svelte-przkis");
    			add_location(div2, file$f, 10, 16, 392);
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

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*results*/ 4 && span_class_value !== (span_class_value = "mdi mdi-" + /*result*/ ctx[8].icon + " svelte-przkis")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*results*/ 4 && t1_value !== (t1_value = /*result*/ ctx[8].name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(10:12) {#each results as result}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let span;
    	let t0;
    	let input;
    	let div1_class_value;
    	let t1;
    	let mounted;
    	let dispose;
    	let if_block = /*resultsAvailable*/ ctx[3] && create_if_block$3(ctx);

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
    			attr_dev(span, "class", "mdi mdi-magnify svelte-przkis");
    			add_location(span, file$f, 3, 12, 148);
    			attr_dev(div0, "class", "iconWrapper svelte-przkis");
    			add_location(div0, file$f, 2, 8, 110);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[1]);
    			attr_dev(input, "class", "svelte-przkis");
    			add_location(input, file$f, 5, 8, 209);
    			attr_dev(div1, "class", div1_class_value = "searchBar " + (/*resultsAvailable*/ ctx[3] && "resultsAvailable") + " svelte-przkis");
    			add_location(div1, file$f, 1, 4, 37);
    			attr_dev(div2, "class", "searchBarContainer");
    			add_location(div2, file$f, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholder*/ 2) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[1]);
    			}

    			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (dirty & /*resultsAvailable*/ 8 && div1_class_value !== (div1_class_value = "searchBar " + (/*resultsAvailable*/ ctx[3] && "resultsAvailable") + " svelte-przkis")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (/*resultsAvailable*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
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
    			mounted = false;
    			dispose();
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
    	let resultsAvailable;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SearchBar", slots, []);
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

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	const click_handler = result => clickedOnResult(result);

    	$$self.$$set = $$props => {
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
    		input_input_handler,
    		click_handler
    	];
    }

    class SearchBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { placeholder: 1, value: 0, results: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SearchBar",
    			options,
    			id: create_fragment$i.name
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

    /* src/components/Address/AddressSearchBar.svelte generated by Svelte v3.38.3 */

    function create_fragment$h(ctx) {
    	let searchbar;
    	let updating_value;
    	let current;

    	function searchbar_value_binding(value) {
    		/*searchbar_value_binding*/ ctx[3](value);
    	}

    	let searchbar_props = { results: /*results*/ ctx[1] };

    	if (/*query*/ ctx[0] !== void 0) {
    		searchbar_props.value = /*query*/ ctx[0];
    	}

    	searchbar = new SearchBar({ props: searchbar_props, $$inline: true });
    	binding_callbacks.push(() => bind(searchbar, "value", searchbar_value_binding));
    	searchbar.$on("pickedResult", /*pickedResult_handler*/ ctx[4]);

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
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddressSearchBar", slots, []);
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
    		result.name = result.properties.openbareruimtenaam;
    		dispatch("pickedResult", result);
    	}

    	const writable_props = ["query"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressSearchBar> was created with unknown prop '${key}'`);
    	});

    	function searchbar_value_binding(value) {
    		query = value;
    		$$invalidate(0, query);
    	}

    	const pickedResult_handler = result => pickResult(result);

    	$$self.$$set = $$props => {
    		if ("query" in $$props) $$invalidate(0, query = $$props.query);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		SearchBar,
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

    	return [query, results, pickResult, searchbar_value_binding, pickedResult_handler];
    }

    class AddressSearchBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { query: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressSearchBar",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get query() {
    		throw new Error("<AddressSearchBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<AddressSearchBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Address/AddressRouteOption.svelte generated by Svelte v3.38.3 */
    const file$e = "src/components/Address/AddressRouteOption.svelte";

    function create_fragment$g(ctx) {
    	let div2;
    	let div0;
    	let span;
    	let span_class_value;
    	let t0;
    	let div1;
    	let h4;
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			div1 = element("div");
    			h4 = element("h4");
    			t1 = text(/*address*/ ctx[1]);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-uiegr0");
    			add_location(span, file$e, 2, 8, 90);
    			attr_dev(div0, "class", "iconWrapper svelte-uiegr0");
    			add_location(div0, file$e, 1, 4, 56);
    			attr_dev(h4, "class", "svelte-uiegr0");
    			add_location(h4, file$e, 5, 8, 176);
    			attr_dev(div1, "class", "textWrapper svelte-uiegr0");
    			add_location(div1, file$e, 4, 4, 142);
    			attr_dev(div2, "class", "addressRouteOption svelte-uiegr0");
    			add_location(div2, file$e, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*onClick*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icon*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*icon*/ ctx[0] + " svelte-uiegr0")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*address*/ 2) set_data_dev(t1, /*address*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddressRouteOption", slots, []);
    	const dispatch = createEventDispatcher();
    	var { icon = "map-marker-circle" } = $$props;
    	var { address = "Null-island" } = $$props;

    	// Functions
    	function onClick() {
    		dispatch("click", address);
    	}

    	const writable_props = ["icon", "address"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressRouteOption> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("address" in $$props) $$invalidate(1, address = $$props.address);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		icon,
    		address,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    		if ("address" in $$props) $$invalidate(1, address = $$props.address);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [icon, address, onClick];
    }

    class AddressRouteOption extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { icon: 0, address: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressRouteOption",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get icon() {
    		throw new Error("<AddressRouteOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<AddressRouteOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get address() {
    		throw new Error("<AddressRouteOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set address(value) {
    		throw new Error("<AddressRouteOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Address/AddressSelect.svelte generated by Svelte v3.38.3 */
    const file$d = "src/components/Address/AddressSelect.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (19:4) {:else}
    function create_else_block$1(ctx) {
    	let emptystate;
    	let current;

    	emptystate = new EmptyState({
    			props: {
    				$$slots: { default: [create_default_slot_1$4] },
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

    			if (dirty & /*$$scope*/ 4096) {
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
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(19:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:8) <EmptyState>
    function create_default_slot_1$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Ga naar je addressboek om locaties op te slaan\n        ");
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
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(20:8) <EmptyState>",
    		ctx
    	});

    	return block;
    }

    // (17:4) {#each suggestedAddresses as address}
    function create_each_block$2(ctx) {
    	let addressrouteoption;
    	let current;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[7](/*address*/ ctx[0]);
    	}

    	addressrouteoption = new AddressRouteOption({
    			props: {
    				icon: /*address*/ ctx[0].icon,
    				address: /*address*/ ctx[0].address
    			},
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
    			if (dirty & /*suggestedAddresses*/ 2) addressrouteoption_changes.icon = /*address*/ ctx[0].icon;
    			if (dirty & /*suggestedAddresses*/ 2) addressrouteoption_changes.address = /*address*/ ctx[0].address;
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
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(17:4) {#each suggestedAddresses as address}",
    		ctx
    	});

    	return block;
    }

    // (11:0) <Popup bind:open={popupOpen}>
    function create_default_slot$6(ctx) {
    	let h4;
    	let t1;
    	let addresssearchbar;
    	let t2;
    	let labeldivider;
    	let t3;
    	let each_1_anchor;
    	let current;
    	addresssearchbar = new AddressSearchBar({ $$inline: true });
    	addresssearchbar.$on("pickedResult", /*selectSearchBarResult*/ ctx[4]);

    	labeldivider = new LabelDivider({
    			props: { text: "Opgeslagen" },
    			$$inline: true
    		});

    	let each_value = /*suggestedAddresses*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1(ctx);
    	}

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Select address";
    			t1 = space();
    			create_component(addresssearchbar.$$.fragment);
    			t2 = space();
    			create_component(labeldivider.$$.fragment);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			attr_dev(h4, "class", "svelte-1szzsr5");
    			add_location(h4, file$d, 11, 4, 332);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(addresssearchbar, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(labeldivider, target, anchor);
    			insert_dev(target, t3, anchor);

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
    			if (dirty & /*suggestedAddresses, selectAddress*/ 10) {
    				each_value = /*suggestedAddresses*/ ctx[1];
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

    				if (!each_value.length && each_1_else) {
    					each_1_else.p(ctx, dirty);
    				} else if (!each_value.length) {
    					each_1_else = create_else_block$1(ctx);
    					each_1_else.c();
    					transition_in(each_1_else, 1);
    					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
    				} else if (each_1_else) {
    					group_outros();

    					transition_out(each_1_else, 1, 1, () => {
    						each_1_else = null;
    					});

    					check_outros();
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addresssearchbar.$$.fragment, local);
    			transition_in(labeldivider.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addresssearchbar.$$.fragment, local);
    			transition_out(labeldivider.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			destroy_component(addresssearchbar, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(labeldivider, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    			if (each_1_else) each_1_else.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(11:0) <Popup bind:open={popupOpen}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
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
    	let t4;
    	let popup;
    	let updating_open;
    	let current;
    	let mounted;
    	let dispose;

    	function popup_open_binding(value) {
    		/*popup_open_binding*/ ctx[8](value);
    	}

    	let popup_props = {
    		$$slots: { default: [create_default_slot$6] },
    		$$scope: { ctx }
    	};

    	if (/*popupOpen*/ ctx[2] !== void 0) {
    		popup_props.open = /*popupOpen*/ ctx[2];
    	}

    	popup = new Popup({ props: popup_props, $$inline: true });
    	binding_callbacks.push(() => bind(popup, "open", popup_open_binding));

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
    			t4 = space();
    			create_component(popup.$$.fragment);
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-1szzsr5");
    			add_location(span, file$d, 2, 8, 101);
    			attr_dev(div0, "class", "iconWrapper svelte-1szzsr5");
    			add_location(div0, file$d, 1, 4, 67);
    			attr_dev(p0, "class", "name svelte-1szzsr5");
    			add_location(p0, file$d, 5, 8, 195);
    			attr_dev(p1, "class", "address svelte-1szzsr5");
    			add_location(p1, file$d, 6, 8, 238);
    			attr_dev(div1, "class", "textWrapper svelte-1szzsr5");
    			add_location(div1, file$d, 4, 4, 161);
    			attr_dev(div2, "class", "locationSelect svelte-1szzsr5");
    			add_location(div2, file$d, 0, 0, 0);
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
    			insert_dev(target, t4, anchor);
    			mount_component(popup, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*address*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-1szzsr5")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if ((!current || dirty & /*address*/ 1) && t1_value !== (t1_value = /*address*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*address*/ 1) && t3_value !== (t3_value = /*address*/ ctx[0].address + "")) set_data_dev(t3, t3_value);
    			const popup_changes = {};

    			if (dirty & /*$$scope, suggestedAddresses*/ 4098) {
    				popup_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*popupOpen*/ 4) {
    				updating_open = true;
    				popup_changes.open = /*popupOpen*/ ctx[2];
    				add_flush_callback(() => updating_open = false);
    			}

    			popup.$set(popup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(popup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(popup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t4);
    			destroy_component(popup, detaching);
    			mounted = false;
    			dispose();
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
    	let $locationStore;
    	validate_store(locationStore, "locationStore");
    	component_subscribe($$self, locationStore, $$value => $$invalidate(5, $locationStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddressSelect", slots, []);
    	const dispatch = createEventDispatcher();
    	var { address = unsetAddress } = $$props;
    	var { suggestedAddresses = [] } = $$props;

    	// Data
    	var popupOpen = false;

    	// Functions
    	function selectAddress(address) {
    		dispatch("select", address);
    		$$invalidate(2, popupOpen = false);
    	}

    	function selectSearchBarResult({ detail }) {
    		dispatch("select", detail);
    		$$invalidate(2, popupOpen = false);
    	}

    	const writable_props = ["address", "suggestedAddresses"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressSelect> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(2, popupOpen = true);
    	const click_handler_1 = address => selectAddress(address);

    	function popup_open_binding(value) {
    		popupOpen = value;
    		$$invalidate(2, popupOpen);
    	}

    	$$self.$$set = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    		if ("suggestedAddresses" in $$props) $$invalidate(1, suggestedAddresses = $$props.suggestedAddresses);
    	};

    	$$self.$capture_state = () => ({
    		locationStore,
    		createEventDispatcher,
    		dispatch,
    		Popup,
    		AddressSearchBar,
    		LabelDivider,
    		AddressRouteOption,
    		EmptyState,
    		unsetAddress,
    		address,
    		suggestedAddresses,
    		popupOpen,
    		selectAddress,
    		selectSearchBarResult,
    		$locationStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("address" in $$props) $$invalidate(0, address = $$props.address);
    		if ("suggestedAddresses" in $$props) $$invalidate(1, suggestedAddresses = $$props.suggestedAddresses);
    		if ("popupOpen" in $$props) $$invalidate(2, popupOpen = $$props.popupOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$locationStore, address*/ 33) {
    			// Computed
    			{
    				($$invalidate(0, address), $$invalidate(5, $locationStore));
    			}
    		}
    	};

    	return [
    		address,
    		suggestedAddresses,
    		popupOpen,
    		selectAddress,
    		selectSearchBarResult,
    		$locationStore,
    		click_handler,
    		click_handler_1,
    		popup_open_binding
    	];
    }

    class AddressSelect extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { address: 0, suggestedAddresses: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressSelect",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get address() {
    		throw new Error("<AddressSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set address(value) {
    		throw new Error("<AddressSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get suggestedAddresses() {
    		throw new Error("<AddressSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set suggestedAddresses(value) {
    		throw new Error("<AddressSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Trips/TripComposer.svelte generated by Svelte v3.38.3 */
    const file$c = "src/components/Trips/TripComposer.svelte";

    // (6:4) <Button icon="magnify" on:click={searchTrips} enabled={canPerformSearch}>
    function create_default_slot$5(ctx) {
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
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(6:4) <Button icon=\\\"magnify\\\" on:click={searchTrips} enabled={canPerformSearch}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let section;
    	let addressselect0;
    	let t0;
    	let labeldivider;
    	let t1;
    	let addressselect1;
    	let t2;
    	let button;
    	let current;

    	addressselect0 = new AddressSelect({
    			props: {
    				address: /*startAddress*/ ctx[0],
    				suggestedAddresses: getStartAddresses()
    			},
    			$$inline: true
    		});

    	addressselect0.$on("select", /*select_handler*/ ctx[4]);
    	labeldivider = new LabelDivider({ props: { text: "Naar" }, $$inline: true });

    	addressselect1 = new AddressSelect({
    			props: {
    				address: /*endAddress*/ ctx[1],
    				suggestedAddresses: getEndAddresses()
    			},
    			$$inline: true
    		});

    	addressselect1.$on("select", /*select_handler_1*/ ctx[5]);

    	button = new Button({
    			props: {
    				icon: "magnify",
    				enabled: /*canPerformSearch*/ ctx[2],
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*searchTrips*/ ctx[3]);

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(addressselect0.$$.fragment);
    			t0 = space();
    			create_component(labeldivider.$$.fragment);
    			t1 = space();
    			create_component(addressselect1.$$.fragment);
    			t2 = space();
    			create_component(button.$$.fragment);
    			attr_dev(section, "class", "svelte-2sjgl");
    			add_location(section, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(addressselect0, section, null);
    			append_dev(section, t0);
    			mount_component(labeldivider, section, null);
    			append_dev(section, t1);
    			mount_component(addressselect1, section, null);
    			append_dev(section, t2);
    			mount_component(button, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const addressselect0_changes = {};
    			if (dirty & /*startAddress*/ 1) addressselect0_changes.address = /*startAddress*/ ctx[0];
    			addressselect0.$set(addressselect0_changes);
    			const addressselect1_changes = {};
    			if (dirty & /*endAddress*/ 2) addressselect1_changes.address = /*endAddress*/ ctx[1];
    			addressselect1.$set(addressselect1_changes);
    			const button_changes = {};
    			if (dirty & /*canPerformSearch*/ 4) button_changes.enabled = /*canPerformSearch*/ ctx[2];

    			if (dirty & /*$$scope*/ 128) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addressselect0.$$.fragment, local);
    			transition_in(labeldivider.$$.fragment, local);
    			transition_in(addressselect1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addressselect0.$$.fragment, local);
    			transition_out(labeldivider.$$.fragment, local);
    			transition_out(addressselect1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(addressselect0);
    			destroy_component(labeldivider);
    			destroy_component(addressselect1);
    			destroy_component(button);
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
    	let canPerformSearch;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripComposer", slots, []);
    	const dispatch = createEventDispatcher();

    	// Data
    	var startAddress = getStartAddresses().length > 0
    	? getStartAddresses()[0]
    	: unsetAddress;

    	var endAddress = getEndAddresses().length > 0
    	? getEndAddresses()[0]
    	: unsetAddress;

    	// Functions
    	async function searchTrips() {
    		try {
    			dispatch("searching");
    			let trips = await getTrips(startAddress.location, endAddress.location);

    			if (trips) {
    				dispatch("results", trips);
    			}
    		} catch(e) {
    			dispatch("error");
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripComposer> was created with unknown prop '${key}'`);
    	});

    	const select_handler = event => $$invalidate(0, startAddress = event.detail);
    	const select_handler_1 = event => $$invalidate(1, endAddress = event.detail);

    	$$self.$capture_state = () => ({
    		getStartAddresses,
    		getEndAddresses,
    		unsetAddress,
    		currentLocationAddress,
    		getTrips,
    		createEventDispatcher,
    		dispatch,
    		LabelDivider,
    		Button,
    		AddressSelect,
    		startAddress,
    		endAddress,
    		searchTrips,
    		canPerformSearch
    	});

    	$$self.$inject_state = $$props => {
    		if ("startAddress" in $$props) $$invalidate(0, startAddress = $$props.startAddress);
    		if ("endAddress" in $$props) $$invalidate(1, endAddress = $$props.endAddress);
    		if ("canPerformSearch" in $$props) $$invalidate(2, canPerformSearch = $$props.canPerformSearch);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*endAddress, startAddress*/ 3) {
    			// Computed
    			$$invalidate(2, canPerformSearch = endAddress !== unsetAddress && startAddress.address !== endAddress.address);
    		}
    	};

    	return [
    		startAddress,
    		endAddress,
    		canPerformSearch,
    		searchTrips,
    		select_handler,
    		select_handler_1
    	];
    }

    class TripComposer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripComposer",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/components/Misc/LoadingAnimation.svelte generated by Svelte v3.38.3 */

    const file$b = "src/components/Misc/LoadingAnimation.svelte";

    function create_fragment$d(ctx) {
    	let svg;
    	let g2;
    	let rect;
    	let g1;
    	let g0;
    	let path0;
    	let path1;
    	let path2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g2 = svg_element("g");
    			rect = svg_element("rect");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(rect, "id", "rails");
    			attr_dev(rect, "y", "395");
    			attr_dev(rect, "width", "512");
    			attr_dev(rect, "height", "7");
    			attr_dev(rect, "fill", "black");
    			add_location(rect, file$b, 2, 8, 114);
    			attr_dev(path0, "id", "trainBody");
    			attr_dev(path0, "d", "M0 251.062C0 241.674 7.61116 234.062 17 234.062H300.866C304.888 234.062 308.78 235.488 311.85 238.087L453.147 357.687C465.234 367.917 457.999 387.662 442.164 387.662H307.095H17C7.61114 387.662 0 380.051 0 370.662L0 251.062Z");
    			attr_dev(path0, "fill", "black");
    			add_location(path0, file$b, 5, 16, 244);
    			attr_dev(path1, "id", "windowFront");
    			attr_dev(path1, "d", "M211.591 261.623C211.591 258.861 213.829 256.623 216.591 256.623H297.015C298.19 256.623 299.327 257.037 300.227 257.791L340.645 291.677C344.223 294.677 342.102 300.509 337.433 300.509H216.591C213.829 300.509 211.591 298.27 211.591 295.509V261.623Z");
    			attr_dev(path1, "fill", "white");
    			add_location(path1, file$b, 6, 16, 524);
    			attr_dev(path2, "id", "windowBack");
    			attr_dev(path2, "d", "M73.7002 261.623C73.7002 258.861 75.9388 256.623 78.7002 256.623H159.433C162.194 256.623 164.433 258.862 164.433 261.623V295.509C164.433 298.27 162.194 300.509 159.433 300.509H78.7002C75.9388 300.509 73.7002 298.27 73.7002 295.509V261.623Z");
    			attr_dev(path2, "fill", "white");
    			add_location(path2, file$b, 7, 16, 830);
    			attr_dev(g0, "id", "train");
    			attr_dev(g0, "class", "svelte-1y1ros8");
    			add_location(g0, file$b, 4, 12, 213);
    			attr_dev(g1, "id", "upDown");
    			attr_dev(g1, "class", "svelte-1y1ros8");
    			add_location(g1, file$b, 3, 8, 185);
    			attr_dev(g2, "id", "loading-animation");
    			add_location(g2, file$b, 1, 4, 79);
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g2);
    			append_dev(g2, rect);
    			append_dev(g2, g1);
    			append_dev(g1, g0);
    			append_dev(g0, path0);
    			append_dev(g0, path1);
    			append_dev(g0, path2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
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

    function instance$d($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LoadingAnimation", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LoadingAnimation> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class LoadingAnimation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LoadingAnimation",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/components/Misc/LoadingScim.svelte generated by Svelte v3.38.3 */
    const file$a = "src/components/Misc/LoadingScim.svelte";

    function create_fragment$c(ctx) {
    	let div;
    	let loadinganimation;
    	let current;
    	loadinganimation = new LoadingAnimation({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(loadinganimation.$$.fragment);
    			attr_dev(div, "id", /*id*/ ctx[0]);
    			attr_dev(div, "class", "svelte-mpmjuu");
    			add_location(div, file$a, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(loadinganimation, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loadinganimation.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loadinganimation.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(loadinganimation);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LoadingScim", slots, []);
    	var { id } = $$props;
    	const writable_props = ["id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LoadingScim> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({ LoadingAnimation, id });

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id];
    }

    class LoadingScim extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LoadingScim",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !("id" in props)) {
    			console.warn("<LoadingScim> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<LoadingScim>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<LoadingScim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Misc/ErrorState.svelte generated by Svelte v3.38.3 */

    const file$9 = "src/components/Misc/ErrorState.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let h3;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "class", "svelte-7uo0a1");
    			add_location(h3, file$9, 1, 4, 29);
    			attr_dev(div, "class", "errorState svelte-7uo0a1");
    			add_location(div, file$9, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ErrorState", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ErrorState> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class ErrorState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ErrorState",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/TripList.svelte generated by Svelte v3.38.3 */
    const file$8 = "src/components/TripList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (11:8) {:else}
    function create_else_block(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*trips*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
    			if (dirty & /*trips, selectTrip*/ 33) {
    				each_value = /*trips*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    		id: create_else_block.name,
    		type: "else",
    		source: "(11:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (7:24) 
    function create_if_block_1$1(ctx) {
    	let errorstate;
    	let current;

    	errorstate = new ErrorState({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(errorstate.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(errorstate, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const errorstate_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				errorstate_changes.$$scope = { dirty, ctx };
    			}

    			errorstate.$set(errorstate_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(errorstate.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(errorstate.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(errorstate, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(7:24) ",
    		ctx
    	});

    	return block;
    }

    // (5:8) {#if loading}
    function create_if_block$2(ctx) {
    	let loadingscim;
    	let current;

    	loadingscim = new LoadingScim({
    			props: { id: "loadingTrips" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(loadingscim.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loadingscim, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loadingscim.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loadingscim.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loadingscim, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(5:8) {#if loading}",
    		ctx
    	});

    	return block;
    }

    // (12:12) {#each trips as trip}
    function create_each_block$1(ctx) {
    	let tripresult;
    	let current;

    	tripresult = new TripResult({
    			props: { trip: /*trip*/ ctx[8] },
    			$$inline: true
    		});

    	tripresult.$on("selectTrip", /*selectTrip*/ ctx[5]);

    	const block = {
    		c: function create() {
    			create_component(tripresult.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tripresult, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tripresult_changes = {};
    			if (dirty & /*trips*/ 1) tripresult_changes.trip = /*trip*/ ctx[8];
    			tripresult.$set(tripresult_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tripresult.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tripresult.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tripresult, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(12:12) {#each trips as trip}",
    		ctx
    	});

    	return block;
    }

    // (8:12) <ErrorState>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Er is een fout opgetreden");
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
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(8:12) <ErrorState>",
    		ctx
    	});

    	return block;
    }

    // (2:4) <LayoutCenter>
    function create_default_slot$4(ctx) {
    	let tripcomposer;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	tripcomposer = new TripComposer({ $$inline: true });
    	tripcomposer.$on("searching", /*onSearching*/ ctx[3]);
    	tripcomposer.$on("results", /*showResults*/ ctx[4]);
    	tripcomposer.$on("error", /*handleError*/ ctx[6]);
    	const if_block_creators = [create_if_block$2, create_if_block_1$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loading*/ ctx[1]) return 0;
    		if (/*error*/ ctx[2]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(tripcomposer.$$.fragment);
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(tripcomposer, target, anchor);
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
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
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tripcomposer.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tripcomposer.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tripcomposer, detaching);
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(2:4) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let section;
    	let layoutcenter;
    	let current;

    	layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(layoutcenter.$$.fragment);
    			attr_dev(section, "class", "trips svelte-yyn9i8");
    			add_location(section, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(layoutcenter, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layoutcenter_changes = {};

    			if (dirty & /*$$scope, loading, error, trips*/ 2055) {
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
    			if (detaching) detach_dev(section);
    			destroy_component(layoutcenter);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TripList", slots, []);
    	const dispatch = createEventDispatcher();

    	// Data
    	var trips = [];

    	var loading = false;
    	var error = false;

    	// Function
    	function onSearching() {
    		$$invalidate(1, loading = true);
    		$$invalidate(2, error = false);

    		setTimeout(
    			() => {
    				document.getElementById("loadingTrips").scrollIntoView({ behavior: "smooth", block: "center" });
    			},
    			0
    		);
    	}

    	function showResults({ detail: results }) {
    		$$invalidate(1, loading = false);
    		$$invalidate(0, trips = results);
    	}

    	function selectTrip({ detail }) {
    		dispatch("selectTrip", detail);
    	}

    	function handleError() {
    		$$invalidate(1, loading = false);
    		$$invalidate(2, error = true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TripList> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		availableTripsStore,
    		getTripFromAddress,
    		TripResult,
    		LayoutCenter,
    		TripComposer,
    		LoadingScim,
    		ErrorState,
    		trips,
    		loading,
    		error,
    		onSearching,
    		showResults,
    		selectTrip,
    		handleError
    	});

    	$$self.$inject_state = $$props => {
    		if ("trips" in $$props) $$invalidate(0, trips = $$props.trips);
    		if ("loading" in $$props) $$invalidate(1, loading = $$props.loading);
    		if ("error" in $$props) $$invalidate(2, error = $$props.error);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [trips, loading, error, onSearching, showResults, selectTrip, handleError];
    }

    class TripList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TripList",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/components/Divider.svelte generated by Svelte v3.38.3 */

    const file$7 = "src/components/Divider.svelte";

    function create_fragment$9(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "divider svelte-3kvoh");
    			add_location(div, file$7, 0, 0, 0);
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Divider", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Divider> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Divider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Divider",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/views/DashboardView.svelte generated by Svelte v3.38.3 */
    const file$6 = "src/views/DashboardView.svelte";

    // (2:4) {#if !hasGPS}
    function create_if_block_1(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text(" Locatie kan niet worden gevonden.");
    			attr_dev(span, "class", "mdi mdi-crosshairs-question");
    			add_location(span, file$6, 2, 11, 53);
    			attr_dev(p, "class", "svelte-1tvo5j4");
    			add_location(p, file$6, 2, 8, 50);
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
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(2:4) {#if !hasGPS}",
    		ctx
    	});

    	return block;
    }

    // (5:4) {#if !online}
    function create_if_block$1(ctx) {
    	let p;
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t = text(" Je bent offline. Gegevens worden niet bijgewerkt.");
    			attr_dev(span, "class", "mdi mdi-wifi-strength-alert-outline");
    			add_location(span, file$6, 5, 11, 180);
    			attr_dev(p, "class", "svelte-1tvo5j4");
    			add_location(p, file$6, 5, 8, 177);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(5:4) {#if !online}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let routeguide;
    	let t2;
    	let divider;
    	let t3;
    	let triplist;
    	let current;
    	let if_block0 = !/*hasGPS*/ ctx[1] && create_if_block_1(ctx);
    	let if_block1 = !/*online*/ ctx[0] && create_if_block$1(ctx);

    	routeguide = new RouteGuide({
    			props: { route: /*$routeStore*/ ctx[2] },
    			$$inline: true
    		});

    	routeguide.$on("endRoute", /*endRoute*/ ctx[4]);
    	divider = new Divider({ $$inline: true });
    	triplist = new TripList({ $$inline: true });
    	triplist.$on("selectTrip", /*selectTrip*/ ctx[3]);

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
    			add_location(div, file$6, 0, 0, 0);
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
    				if (if_block0) ; else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*online*/ ctx[0]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			const routeguide_changes = {};
    			if (dirty & /*$routeStore*/ 4) routeguide_changes.route = /*$routeStore*/ ctx[2];
    			routeguide.$set(routeguide_changes);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let hasGPS;
    	let $locationStore;
    	let $routeStore;
    	validate_store(locationStore, "locationStore");
    	component_subscribe($$self, locationStore, $$value => $$invalidate(5, $locationStore = $$value));
    	validate_store(routeStore$1, "routeStore");
    	component_subscribe($$self, routeStore$1, $$value => $$invalidate(2, $routeStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DashboardView", slots, []);
    	var online = navigator.onLine || true;

    	// Functions
    	function selectTrip({ detail }) {
    		deleteMemoizationValuesByTag("liveRouteJourney");
    		document.getElementById("mainHeader").scrollIntoView({ behavior: "smooth" });
    		routeStore$1.set(detail);
    	}

    	function endRoute() {
    		set_store_value(routeStore$1, $routeStore = {}, $routeStore);
    	}

    	window.addEventListener("online", () => $$invalidate(0, online = true));
    	window.addEventListener("offline", () => $$invalidate(0, online = false));
    	startLocation();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DashboardView> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		locationStore,
    		locationIsValid,
    		startLocation,
    		routeStore: routeStore$1,
    		deleteMemoizationValuesByTag,
    		RouteGuide,
    		TripList,
    		Divider,
    		online,
    		selectTrip,
    		endRoute,
    		hasGPS,
    		$locationStore,
    		$routeStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("online" in $$props) $$invalidate(0, online = $$props.online);
    		if ("hasGPS" in $$props) $$invalidate(1, hasGPS = $$props.hasGPS);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$locationStore*/ 32) {
    			// Computed
    			$$invalidate(1, hasGPS = locationIsValid());
    		}
    	};

    	return [online, hasGPS, $routeStore, selectTrip, endRoute, $locationStore];
    }

    class DashboardView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DashboardView",
    			options,
    			id: create_fragment$8.name
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

    /* src/components/Layout/SpaceBetween.svelte generated by Svelte v3.38.3 */

    const file$5 = "src/components/Layout/SpaceBetween.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-1rsj3rg");
    			add_location(div, file$5, 0, 0, 0);
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
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, null, null);
    				}
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SpaceBetween", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SpaceBetween> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class SpaceBetween extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SpaceBetween",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/Address/AddressEditor.svelte generated by Svelte v3.38.3 */

    const { console: console_1 } = globals;

    // (4:8) <Button icon="content-save-outline" on:click={save}>
    function create_default_slot_2$2(ctx) {
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
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(4:8) <Button icon=\\\"content-save-outline\\\" on:click={save}>",
    		ctx
    	});

    	return block;
    }

    // (3:4) <ButtonContainer>
    function create_default_slot_1$2(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				icon: "content-save-outline",
    				$$slots: { default: [create_default_slot_2$2] },
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
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(3:4) <ButtonContainer>",
    		ctx
    	});

    	return block;
    }

    // (1:0) <SpaceBetween>
    function create_default_slot$3(ctx) {
    	let addresssearchbar;
    	let t;
    	let buttoncontainer;
    	let current;

    	addresssearchbar = new AddressSearchBar({
    			props: { query: /*addressObject*/ ctx[0].address },
    			$$inline: true
    		});

    	addresssearchbar.$on("pickedResult", /*selectResult*/ ctx[1]);

    	buttoncontainer = new ButtonContainer({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
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
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(1:0) <SpaceBetween>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let spacebetween;
    	let current;

    	spacebetween = new SpaceBetween({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let addressObject;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddressEditor", slots, []);
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
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<AddressEditor> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { addressId: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressEditor",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*addressId*/ ctx[3] === undefined && !("addressId" in props)) {
    			console_1.warn("<AddressEditor> was created without expected prop 'addressId'");
    		}
    	}

    	get addressId() {
    		throw new Error("<AddressEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addressId(value) {
    		throw new Error("<AddressEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/address/Address.svelte generated by Svelte v3.38.3 */
    const file$4 = "src/components/address/Address.svelte";

    // (8:8) 
    function create_left_slot(ctx) {
    	let span1;
    	let span0;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			t0 = space();
    			t1 = text(/*physicalAddress*/ ctx[3]);
    			attr_dev(span0, "class", "mdi mdi-road-variant");
    			add_location(span0, file$4, 7, 26, 238);
    			attr_dev(span1, "slot", "left");
    			add_location(span1, file$4, 7, 8, 220);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span1, t0);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*physicalAddress*/ 8) set_data_dev(t1, /*physicalAddress*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_left_slot.name,
    		type: "slot",
    		source: "(8:8) ",
    		ctx
    	});

    	return block;
    }

    // (12:8) <SoftButton icon="pencil" on:click={() => editOpen = true}>
    function create_default_slot_2$1(ctx) {
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
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(12:8) <SoftButton icon=\\\"pencil\\\" on:click={() => editOpen = true}>",
    		ctx
    	});

    	return block;
    }

    // (13:8) <SoftButton icon="format-list-numbered">
    function create_default_slot_1$1(ctx) {
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
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(13:8) <SoftButton icon=\\\"format-list-numbered\\\">",
    		ctx
    	});

    	return block;
    }

    // (17:0) <Popup bind:open={editOpen}>
    function create_default_slot$2(ctx) {
    	let addresseditor;
    	let current;

    	addresseditor = new AddressEditor({
    			props: { addressId: /*address*/ ctx[0].id },
    			$$inline: true
    		});

    	addresseditor.$on("saved", /*saved_handler*/ ctx[6]);

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
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(17:0) <Popup bind:open={editOpen}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let h3;
    	let span;
    	let span_class_value;
    	let t0;
    	let t1_value = /*address*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let inforow;
    	let t3;
    	let div0;
    	let softbutton0;
    	let t4;
    	let softbutton1;
    	let div1_class_value;
    	let t5;
    	let popup;
    	let updating_open;
    	let current;
    	let mounted;
    	let dispose;

    	inforow = new InfoRow({
    			props: {
    				$$slots: { left: [create_left_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton0 = new SoftButton({
    			props: {
    				icon: "pencil",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	softbutton0.$on("click", /*click_handler*/ ctx[5]);

    	softbutton1 = new SoftButton({
    			props: {
    				icon: "format-list-numbered",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function popup_open_binding(value) {
    		/*popup_open_binding*/ ctx[7](value);
    	}

    	let popup_props = {
    		$$slots: { default: [create_default_slot$2] },
    		$$scope: { ctx }
    	};

    	if (/*editOpen*/ ctx[2] !== void 0) {
    		popup_props.open = /*editOpen*/ ctx[2];
    	}

    	popup = new Popup({ props: popup_props, $$inline: true });
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
    			attr_dev(span, "class", span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-j5vjq7");
    			add_location(span, file$4, 2, 8, 119);
    			attr_dev(h3, "class", "header svelte-j5vjq7");
    			add_location(h3, file$4, 1, 4, 91);
    			attr_dev(div0, "class", "buttons svelte-j5vjq7");
    			add_location(div0, file$4, 10, 4, 326);
    			attr_dev(div1, "class", div1_class_value = "address " + (/*currentTab*/ ctx[1] !== "" ? "tabOpen" : "") + " svelte-j5vjq7");
    			add_location(div1, file$4, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = action_destroyer(clickOutside.call(null, div1, /*closeTab*/ ctx[4]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*address*/ 1 && span_class_value !== (span_class_value = "mdi mdi-" + /*address*/ ctx[0].icon + " svelte-j5vjq7")) {
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

    			if (!current || dirty & /*currentTab*/ 2 && div1_class_value !== (div1_class_value = "address " + (/*currentTab*/ ctx[1] !== "" ? "tabOpen" : "") + " svelte-j5vjq7")) {
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
    			mounted = false;
    			dispose();
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
    	let physicalAddress;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Address", slots, []);
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

    	const click_handler = () => $$invalidate(2, editOpen = true);
    	const saved_handler = () => $$invalidate(2, editOpen = false);

    	function popup_open_binding(value) {
    		editOpen = value;
    		$$invalidate(2, editOpen);
    	}

    	$$self.$$set = $$props => {
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
    		click_handler,
    		saved_handler,
    		popup_open_binding
    	];
    }

    class Address extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { address: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Address",
    			options,
    			id: create_fragment$5.name
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

    /* src/views/AddressView.svelte generated by Svelte v3.38.3 */

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[4] = list;
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (2:4) {#each addresses as address}
    function create_each_block(ctx) {
    	let address;
    	let updating_address;
    	let current;

    	function address_address_binding(value) {
    		/*address_address_binding*/ ctx[2](value, /*address*/ ctx[3], /*each_value*/ ctx[4], /*address_index*/ ctx[5]);
    	}

    	let address_props = {};

    	if (/*address*/ ctx[3] !== void 0) {
    		address_props.address = /*address*/ ctx[3];
    	}

    	address = new Address({ props: address_props, $$inline: true });
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
    		id: create_each_block.name,
    		type: "each",
    		source: "(2:4) {#each addresses as address}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <LayoutCenter>
    function create_default_slot$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*addresses*/ ctx[0];
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
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
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
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(1:0) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let layoutcenter;
    	let current;

    	layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function onChange() {
    	
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let addresses;
    	let $addressStore;
    	validate_store(addressStore, "addressStore");
    	component_subscribe($$self, addressStore, $$value => $$invalidate(1, $addressStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddressView", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddressView> was created with unknown prop '${key}'`);
    	});

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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddressView",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/Checkbox.svelte generated by Svelte v3.38.3 */

    const file$3 = "src/components/Checkbox.svelte";

    // (2:4) {#if checked}
    function create_if_block(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdi mdi-check svelte-19czzdd");
    			add_location(span, file$3, 2, 8, 90);
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(2:4) {#if checked}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let div_class_value;
    	let mounted;
    	let dispose;
    	let if_block = /*checked*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = "checkbox " + (/*checked*/ ctx[0] && "checked") + " svelte-19czzdd");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*toggle*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*checked*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*checked*/ 1 && div_class_value !== (div_class_value = "checkbox " + (/*checked*/ ctx[0] && "checked") + " svelte-19czzdd")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Checkbox", slots, []);
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

    	$$self.$$set = $$props => {
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { checked: 0, handleChecked: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$3.name
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

    /* src/components/Setting.svelte generated by Svelte v3.38.3 */
    const file$2 = "src/components/Setting.svelte";

    function create_fragment$2(ctx) {
    	let div4;
    	let div3;
    	let div1;
    	let div0;
    	let checkbox;
    	let t0;
    	let div2;
    	let p;
    	let t1;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;

    	checkbox = new Checkbox({
    			props: {
    				handleChecked: false,
    				checked: /*value*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[4].default;
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
    			attr_dev(div0, "class", "innerFloater svelte-2pdwx");
    			add_location(div0, file$2, 3, 12, 127);
    			attr_dev(div1, "class", "checkboxWrapper svelte-2pdwx");
    			add_location(div1, file$2, 2, 8, 85);
    			attr_dev(p, "class", "svelte-2pdwx");
    			add_location(p, file$2, 8, 12, 309);
    			attr_dev(div2, "class", "settingTitleWrapper svelte-2pdwx");
    			add_location(div2, file$2, 7, 8, 263);
    			attr_dev(div3, "class", "settingHeader svelte-2pdwx");
    			add_location(div3, file$2, 1, 4, 26);
    			attr_dev(div4, "class", "setting");
    			add_location(div4, file$2, 0, 0, 0);
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

    			if (!mounted) {
    				dispose = listen_dev(div3, "click", /*toggleValue*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const checkbox_changes = {};
    			if (dirty & /*value*/ 1) checkbox_changes.checked = /*value*/ ctx[0];
    			checkbox.$set(checkbox_changes);
    			if (!current || dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], !current ? -1 : dirty, null, null);
    				}
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
    			mounted = false;
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Setting", slots, ['default']);
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

    	$$self.$$set = $$props => {
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

    	return [value, text, toggleValue, $$scope, slots];
    }

    class Setting extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { value: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Setting",
    			options,
    			id: create_fragment$2.name
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

    /* src/views/SettingsView.svelte generated by Svelte v3.38.3 */

    const { Object: Object_1 } = globals;
    const file$1 = "src/views/SettingsView.svelte";

    // (4:12) <Setting bind:value={$settingsStore.preferPopup} text="Extra informatie in popup">
    function create_default_slot_5(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Als deze instelling aan staat krijg je een popup als je op meer info drukt in plaats van een dropdown.";
    			attr_dev(p, "class", "svelte-pvx7p");
    			add_location(p, file$1, 4, 16, 175);
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
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(4:12) <Setting bind:value={$settingsStore.preferPopup} text=\\\"Extra informatie in popup\\\">",
    		ctx
    	});

    	return block;
    }

    // (10:20) <Button icon="delete-outline" on:click={resetEverything}>
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Reset alles");
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
    		source: "(10:20) <Button icon=\\\"delete-outline\\\" on:click={resetEverything}>",
    		ctx
    	});

    	return block;
    }

    // (9:16) <SpaceBetween>
    function create_default_slot_3(ctx) {
    	let button;
    	let t0;
    	let h6;
    	let current;

    	button = new Button({
    			props: {
    				icon: "delete-outline",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", resetEverything);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    			t0 = space();
    			h6 = element("h6");
    			h6.textContent = "Versie 3.0.0-Beta.6";
    			attr_dev(h6, "class", "svelte-pvx7p");
    			add_location(h6, file$1, 10, 20, 514);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h6, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4) {
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
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(9:16) <SpaceBetween>",
    		ctx
    	});

    	return block;
    }

    // (8:12) <DropDown text="Geavanceerde instellingen">
    function create_default_slot_2(ctx) {
    	let spacebetween;
    	let current;

    	spacebetween = new SpaceBetween({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(spacebetween.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(spacebetween, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const spacebetween_changes = {};

    			if (dirty & /*$$scope*/ 4) {
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
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(8:12) <DropDown text=\\\"Geavanceerde instellingen\\\">",
    		ctx
    	});

    	return block;
    }

    // (3:8) <SpaceBetween>
    function create_default_slot_1(ctx) {
    	let setting;
    	let updating_value;
    	let t;
    	let dropdown;
    	let current;

    	function setting_value_binding(value) {
    		/*setting_value_binding*/ ctx[1](value);
    	}

    	let setting_props = {
    		text: "Extra informatie in popup",
    		$$slots: { default: [create_default_slot_5] },
    		$$scope: { ctx }
    	};

    	if (/*$settingsStore*/ ctx[0].preferPopup !== void 0) {
    		setting_props.value = /*$settingsStore*/ ctx[0].preferPopup;
    	}

    	setting = new Setting({ props: setting_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting, "value", setting_value_binding));

    	dropdown = new DropDown({
    			props: {
    				text: "Geavanceerde instellingen",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    			t = space();
    			create_component(dropdown.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const setting_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*$settingsStore*/ 1) {
    				updating_value = true;
    				setting_changes.value = /*$settingsStore*/ ctx[0].preferPopup;
    				add_flush_callback(() => updating_value = false);
    			}

    			setting.$set(setting_changes);
    			const dropdown_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				dropdown_changes.$$scope = { dirty, ctx };
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			transition_in(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			transition_out(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(3:8) <SpaceBetween>",
    		ctx
    	});

    	return block;
    }

    // (1:0) <LayoutCenter>
    function create_default_slot(ctx) {
    	let div;
    	let spacebetween;
    	let current;

    	spacebetween = new SpaceBetween({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(spacebetween.$$.fragment);
    			attr_dev(div, "class", "padding svelte-pvx7p");
    			add_location(div, file$1, 1, 4, 19);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(spacebetween, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const spacebetween_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 5) {
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
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1:0) <LayoutCenter>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let layoutcenter;
    	let current;

    	layoutcenter = new LayoutCenter({
    			props: {
    				$$slots: { default: [create_default_slot] },
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

    			if (dirty & /*$$scope, $settingsStore*/ 5) {
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function resetEverything() {
    	if (confirm("Weet je zeker dat je alles wilt resetten?")) {
    		let keys = Object.keys(localStorage);

    		for (let key of keys) {
    			if (key.includes("aut-ov-")) {
    				localStorage.removeItem(key);
    			}
    		}

    		location.reload();
    	}
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, "settingsStore");
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SettingsView", slots, []);
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SettingsView> was created with unknown prop '${key}'`);
    	});

    	function setting_value_binding(value) {
    		if ($$self.$$.not_equal($settingsStore.preferPopup, value)) {
    			$settingsStore.preferPopup = value;
    			settingsStore.set($settingsStore);
    		}
    	}

    	$$self.$capture_state = () => ({
    		settingsStore,
    		LayoutCenter,
    		SpaceBetween,
    		Setting,
    		DropDown,
    		Button,
    		resetEverything,
    		$settingsStore
    	});

    	return [$settingsStore, setting_value_binding];
    }

    class SettingsView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SettingsView",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    var routes = {
        "/": DashboardView,
        "/addressbook": AddressView,
        "/settings": SettingsView,
    };

    /* src/App.svelte generated by Svelte v3.38.3 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t;
    	let router;
    	let current;
    	header = new Header({ $$inline: true });
    	router = new Router({ props: { routes }, $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(router.$$.fragment);
    			attr_dev(main, "class", "svelte-16ydw84");
    			add_location(main, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(router);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	var loading = true;

    	// Create
    	registerServiceWorker();

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		registerServiceWorker,
    		Header,
    		Router,
    		routes,
    		loading
    	});

    	$$self.$inject_state = $$props => {
    		if ("loading" in $$props) loading = $$props.loading;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    init$1({
        dsn: "https://3ac351d944fa45c694a0d5f0b91ff30a@o296120.ingest.sentry.io/6058241",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

    const transaction = startTransaction({
        op: "transaction",
        name: "My Transaction",
    });

    configureScope(scope => {
        scope.setSpan(transaction);
    });

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
