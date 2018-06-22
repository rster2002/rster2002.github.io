sessionStorage.setItem("wave--css", 0);
sessionStorage.setItem("wave--init", 0);

waveColor = [];
waveAuto = [];
waveEngineComponents = {
	custom: function(se, fn) {
		waveEngineSettings[se] = {changable: se};
		activeComp = se;
		fn(waveModulator);
	}
};
waveEngineSettings = {};

// dev(false);
//
// function dev(d) {
// 	if (d === true) {
// 		console.warn("[wave] dev mode");
// 		from = "./";
// 	} else {
// 		from = "https://cdn.rawgit.com/rster2002/wave-ui/master/";
// 	}
// }

waveModulator = {
	corners: function(s) {
		size = {
			topLeft: "0px",
			topRight: "0px",
			bottomLeft: "0px",
			bottomRight: "0px"
		};
		for (var i = 0; i < s.length; ++i) {
			var rule = s[i];
			console.log(rule);
			if (rule.shape === "cut") {
				var style = {};
				if (rule.place === "all") {
					size["topLeft"] = rule.size;
					size["topRight"] = rule.size;
					size["bottomLeft"] = rule.size;
					size["bottomRight"] = rule.size;
					console.log("all");
				} else {
					size[rule.place] = rule.size;
				}
				console.log(size);
				style["clip-path"] = "polygon(0% " + size.topLeft + ", " + size.topLeft + " 0%, calc(100% - " + size.topRight + ") 0%, 100% " + size.topRight + ", 100% calc(100% - " + size.bottomRight + "), calc(100% - " + size.bottomRight + ") 100%, " + size.bottomLeft + " 100%, 0 calc(100% - " + size.bottomLeft + "))"
				$(waveEngineSettings[activeComp]["changable"]).css(style);
			}
		}
	}
}

function waveEngineComp(fn) {
	fn(waveModulator);
}

async function waveInitColors(colorObj) {
	elementLoaded("body", async () => {
		await setTimeout(() => {
			for (var i = 0; i < waveColor.length; ++i) {
				var colorFunction = waveColor[i];
				colorFunction(colorObj);
			}
		}, 1);
	});
}

async function waveCss() {
	try {
		if (waveD) {
			from = "./";
		} else {
			from = "https://rster2002.github.io/wave/"
		}

		if (component.constructor === Array) {
			for (var c = 0; c < component.length; ++c) {
				var comp = component[c];
				if (comp) {
					try {
						await loadCss(from + "components/" + comp + "/styles/default.css");
						await loadCss(from + "components/" + comp + "/styles/mobile.css");
					} catch(e) {
						console.error("[wave] Failed to load " + comp);
					}
				}
			}
		}
	} catch(e) {
		console.log(e);
	}
}

async function waveAutoInit() {
	elementLoaded("body", () => {
		console.log("autoInit");
		for (var i = 0; i < waveAuto.length; ++i) {
			var func = waveAuto[i];
			func();
		}
	})
}

function elementLoaded(selector, callback){
    //trigger after page load.
    $(function () {
        callback($(selector));
    });
    //trigger after page update eg ajax event or jquery insert.
    $(document).on('DOMNodeInserted', selector, function () {
        callback($(this));
    });
}

async function loadCss(url) {
	var cssId = Number(sessionStorage.getItem("wave--css")) + 1;
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.id   = cssId;
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	if (url.includes("mobile")) {
		link.media = "screen and (max-device-width: 800px)";
	} else {
		link.media = 'all';
	}
	head.appendChild(link);

	sessionStorage.setItem("wave--css", cssId);
}

async function loadInit(url) {
	var initId = Number(sessionStorage.getItem("wave--init")) + 1;
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('script');
	link.id   = initId;
	link.src = url;

	head.appendChild(link);

	sessionStorage.setItem("wave--init", initId);
}

async function waveConfig(settings) {
	if (settings !== undefined) {
		if (settings["path"] !== undefined) {
			waveFrom = settings["path"];
			console.log("[wave] Path set to: " + settings["path"])
		}
		if (settings["init"] !== undefined) {
			waveInit = settings.init;
		} else {
			waveInit = true;
		}
	}
}

function waveAwaitEngine(fn) {
	var waveReloader = setInterval(() => {
		if (waveTotalComponents !== -1) {
			if (waveTotalComponents === waveImportedComponents) {
				fn();
				clearInterval(waveReloader);
			}
		}
	}, 250);
}

waveSetup = false;
waveD = false;
waveImported = {};
waveInit = true;
waveFrom = "./";
waveTotalComponents = -1;
waveImportedComponents = 0;

async function waveImport(component) {
	waveTotalComponents = component.length;
	console.log(component);
	try {
		if (!waveSetup) {
			loadCss(waveFrom + "components/default/styles/default.css");
			loadCss(waveFrom + "components/default/styles/mobile.css");
			waveSetup = true;
		}


		if (component.constructor === Array) {
			for (var c = 0; c < component.length; ++c) {
				var comp = component[c];
				if (comp) {
					try {
						if (waveImported[comp] === undefined) {
							await loadCss(waveFrom + "components/" + comp + "/styles/default.css");
							await loadCss(waveFrom + "components/" + comp + "/styles/mobile.css");

							if (waveInit !== false) {
								await loadInit(waveFrom + "components/" + comp + "/init.js");
							}
							waveImported[comp] = true;
							waveImportedComponents += 1;
						}
					} catch(e) {
						console.error("[wave] Failed to load " + comp);
					}
				}
			}
		}
	} catch(e) {
		console.log(e);
	}

}

async function waveLog(text) {
	await console.log(text);
}

async function waveThen(f) {
	await f();
}

async function a() {
	await console.log("a");
}

$(document).ready(function() {

	var reqwavered = [
		"https://fonts.googleapis.com/css?family=Roboto:300,400,500",
		"https://fonts.googleapis.com/icon?family=Material+Icons"
	];

	for (var c = 0; c < reqwavered.length; ++c) {
		var f = reqwavered[c];
		loadCss(f);
	}


	$("body").append("<div class='wave--background'></div>");
	waveBoxOpen = false;

	var waveInit = {
		config: function(s){waveConfig(s);return waveInit;},
		import: function(s){waveImport(s);return waveInit;},
		log: function(s){waveLog(s);return waveInit;},
		color: function(s){waveInitColors(s);return waveInit;},
		css: function(s){waveCss(s);return waveInit;},
		autoInit: function(s){waveAutoInit(s);return waveInit;},
		then: function(s){waveAwaitEngine(s);return waveInit;}
	}

	var waveEngine = function(fn) {
		fn(waveEngineComponents);
	}

	var waveRoot = waveInit;
	waveRoot["engine"] = waveEngine;

	wave = waveRoot;
});

$(document).ready(function(){
	$.fn.toggleColor = function(options) {
		this.toggleClass("on");
		if (this.hasClass("on")) {
			this.css("color", options.on);
		} else {
			this.css("color", options.off);
		}
	};
});

$(document).ready(function(){
	$("button.wave").addClass("wave--button");
	$("input.wave").addClass("wave--input");
	$("div.wave.buttongroup").addClass("wave--button-group");
	$("div.wave.button.group").addClass("wave--button-group");
	$("div.wave.btngroup").addClass("wave--button-group");
	$("div.wave.btn.group").addClass("wave--button-group");
});

var Arrive = (function(window, $, undefined) {

  "use strict";

  if(!window.MutationObserver || typeof HTMLElement === 'undefined'){
    return; //for unsupported browsers
  }

  var arriveUniqueId = 0;

  var utils = (function() {
    var matches = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector
                  || HTMLElement.prototype.msMatchesSelector;

    return {
      matchesSelector: function(elem, selector) {
        return elem instanceof HTMLElement && matches.call(elem, selector);
      },
      // to enable function overloading - By John Resig (MIT Licensed)
      addMethod: function (object, name, fn) {
        var old = object[ name ];
        object[ name ] = function(){
          if ( fn.length == arguments.length ) {
            return fn.apply( this, arguments );
          }
          else if ( typeof old == 'function' ) {
            return old.apply( this, arguments );
          }
        };
      },
      callCallbacks: function(callbacksToBeCalled, registrationData) {
        if (registrationData && registrationData.options.onceOnly && registrationData.firedElems.length == 1) {
          // as onlyOnce param is true, make sure we fire the event for only one item
          callbacksToBeCalled = [callbacksToBeCalled[0]];
        }

        for (var i = 0, cb; (cb = callbacksToBeCalled[i]); i++) {
          if (cb && cb.callback) {
            cb.callback.call(cb.elem, cb.elem);
          }
        }

        if (registrationData && registrationData.options.onceOnly && registrationData.firedElems.length == 1) {
          // unbind event after first callback as onceOnly is true.
          registrationData.me.unbindEventWithSelectorAndCallback.call(
            registrationData.target, registrationData.selector, registrationData.callback);
        }
      },
      // traverse through all descendants of a node to check if event should be fired for any descendant
      checkChildNodesRecursively: function(nodes, registrationData, matchFunc, callbacksToBeCalled) {
        // check each new node if it matches the selector
        for (var i=0, node; (node = nodes[i]); i++) {
          if (matchFunc(node, registrationData, callbacksToBeCalled)) {
            callbacksToBeCalled.push({ callback: registrationData.callback, elem: node });
          }

          if (node.childNodes.length > 0) {
            utils.checkChildNodesRecursively(node.childNodes, registrationData, matchFunc, callbacksToBeCalled);
          }
        }
      },
      mergeArrays: function(firstArr, secondArr){
        // Overwrites default options with user-defined options.
        var options = {},
            attrName;
        for (attrName in firstArr) {
          if (firstArr.hasOwnProperty(attrName)) {
            options[attrName] = firstArr[attrName];
          }
        }
        for (attrName in secondArr) {
          if (secondArr.hasOwnProperty(attrName)) {
            options[attrName] = secondArr[attrName];
          }
        }
        return options;
      },
      toElementsArray: function (elements) {
        // check if object is an array (or array like object)
        // Note: window object has .length property but it's not array of elements so don't consider it an array
        if (typeof elements !== "undefined" && (typeof elements.length !== "number" || elements === window)) {
          elements = [elements];
        }
        return elements;
      }
    };
  })();


  // Class to maintain state of all registered events of a single type
  var EventsBucket = (function() {
    var EventsBucket = function() {
      // holds all the events

      this._eventsBucket    = [];
      // function to be called while adding an event, the function should do the event initialization/registration
      this._beforeAdding    = null;
      // function to be called while removing an event, the function should do the event destruction
      this._beforeRemoving  = null;
    };

    EventsBucket.prototype.addEvent = function(target, selector, options, callback) {
      var newEvent = {
        target:             target,
        selector:           selector,
        options:            options,
        callback:           callback,
        firedElems:         []
      };

      if (this._beforeAdding) {
        this._beforeAdding(newEvent);
      }

      this._eventsBucket.push(newEvent);
      return newEvent;
    };

    EventsBucket.prototype.removeEvent = function(compareFunction) {
      for (var i=this._eventsBucket.length - 1, registeredEvent; (registeredEvent = this._eventsBucket[i]); i--) {
        if (compareFunction(registeredEvent)) {
          if (this._beforeRemoving) {
              this._beforeRemoving(registeredEvent);
          }

          // mark callback as null so that even if an event mutation was already triggered it does not call callback
          var removedEvents = this._eventsBucket.splice(i, 1);
          if (removedEvents && removedEvents.length) {
            removedEvents[0].callback = null;
          }
        }
      }
    };

    EventsBucket.prototype.beforeAdding = function(beforeAdding) {
      this._beforeAdding = beforeAdding;
    };

    EventsBucket.prototype.beforeRemoving = function(beforeRemoving) {
      this._beforeRemoving = beforeRemoving;
    };

    return EventsBucket;
  })();


  /**
   * @constructor
   * General class for binding/unbinding arrive and leave events
   */
  var MutationEvents = function(getObserverConfig, onMutation) {
    var eventsBucket    = new EventsBucket(),
        me              = this;

    var defaultOptions = {
      fireOnAttributesModification: false
    };

    // actual event registration before adding it to bucket
    eventsBucket.beforeAdding(function(registrationData) {
      var
        target    = registrationData.target,
        observer;

      // mutation observer does not work on window or document
      if (target === window.document || target === window) {
        target = document.getElementsByTagName("html")[0];
      }

      // Create an observer instance
      observer = new MutationObserver(function(e) {
        onMutation.call(this, e, registrationData);
      });

      var config = getObserverConfig(registrationData.options);

      observer.observe(target, config);

      registrationData.observer = observer;
      registrationData.me = me;
    });

    // cleanup/unregister before removing an event
    eventsBucket.beforeRemoving(function (eventData) {
      eventData.observer.disconnect();
    });

    this.bindEvent = function(selector, options, callback) {
      options = utils.mergeArrays(defaultOptions, options);

      var elements = utils.toElementsArray(this);

      for (var i = 0; i < elements.length; i++) {
        eventsBucket.addEvent(elements[i], selector, options, callback);
      }
    };

    this.unbindEvent = function() {
      var elements = utils.toElementsArray(this);
      eventsBucket.removeEvent(function(eventObj) {
        for (var i = 0; i < elements.length; i++) {
          if (this === undefined || eventObj.target === elements[i]) {
            return true;
          }
        }
        return false;
      });
    };

    this.unbindEventWithSelectorOrCallback = function(selector) {
      var elements = utils.toElementsArray(this),
          callback = selector,
          compareFunction;

      if (typeof selector === "function") {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
        };
      }
      else {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.selector === selector) {
              return true;
            }
          }
          return false;
        };
      }
      eventsBucket.removeEvent(compareFunction);
    };

    this.unbindEventWithSelectorAndCallback = function(selector, callback) {
      var elements = utils.toElementsArray(this);
      eventsBucket.removeEvent(function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.selector === selector && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
      });
    };

    return this;
  };


  /**
   * @constructor
   * Processes 'arrive' events
   */
  var ArriveEvents = function() {
    // Default options for 'arrive' event
    var arriveDefaultOptions = {
      fireOnAttributesModification: false,
      onceOnly: false,
      existing: false
    };

    function getArriveObserverConfig(options) {
      var config = {
        attributes: false,
        childList: true,
        subtree: true
      };

      if (options.fireOnAttributesModification) {
        config.attributes = true;
      }

      return config;
    }

    function onArriveMutation(mutations, registrationData) {
      mutations.forEach(function( mutation ) {
        var newNodes    = mutation.addedNodes,
            targetNode = mutation.target,
            callbacksToBeCalled = [],
            node;

        // If new nodes are added
        if( newNodes !== null && newNodes.length > 0 ) {
          utils.checkChildNodesRecursively(newNodes, registrationData, nodeMatchFunc, callbacksToBeCalled);
        }
        else if (mutation.type === "attributes") {
          if (nodeMatchFunc(targetNode, registrationData, callbacksToBeCalled)) {
            callbacksToBeCalled.push({ callback: registrationData.callback, elem: targetNode });
          }
        }

        utils.callCallbacks(callbacksToBeCalled, registrationData);
      });
    }

    function nodeMatchFunc(node, registrationData, callbacksToBeCalled) {
      // check a single node to see if it matches the selector
      if (utils.matchesSelector(node, registrationData.selector)) {
        if(node._id === undefined) {
          node._id = arriveUniqueId++;
        }
        // make sure the arrive event is not already fired for the element
        if (registrationData.firedElems.indexOf(node._id) == -1) {
          registrationData.firedElems.push(node._id);

          return true;
        }
      }

      return false;
    }

    arriveEvents = new MutationEvents(getArriveObserverConfig, onArriveMutation);

    var mutationBindEvent = arriveEvents.bindEvent;

    // override bindEvent function
    arriveEvents.bindEvent = function(selector, options, callback) {

      if (typeof callback === "undefined") {
        callback = options;
        options = arriveDefaultOptions;
      } else {
        options = utils.mergeArrays(arriveDefaultOptions, options);
      }

      var elements = utils.toElementsArray(this);

      if (options.existing) {
        var existing = [];

        for (var i = 0; i < elements.length; i++) {
          var nodes = elements[i].querySelectorAll(selector);
          for (var j = 0; j < nodes.length; j++) {
            existing.push({ callback: callback, elem: nodes[j] });
          }
        }

        // no need to bind event if the callback has to be fired only once and we have already found the element
        if (options.onceOnly && existing.length) {
          return callback.call(existing[0].elem, existing[0].elem);
        }

        setTimeout(utils.callCallbacks, 1, existing);
      }

      mutationBindEvent.call(this, selector, options, callback);
    };

    return arriveEvents;
  };


  /**
   * @constructor
   * Processes 'leave' events
   */
  var LeaveEvents = function() {
    // Default options for 'leave' event
    var leaveDefaultOptions = {};

    function getLeaveObserverConfig() {
      var config = {
        childList: true,
        subtree: true
      };

      return config;
    }

    function onLeaveMutation(mutations, registrationData) {
      mutations.forEach(function( mutation ) {
        var removedNodes  = mutation.removedNodes,
            callbacksToBeCalled = [];

        if( removedNodes !== null && removedNodes.length > 0 ) {
          utils.checkChildNodesRecursively(removedNodes, registrationData, nodeMatchFunc, callbacksToBeCalled);
        }

        utils.callCallbacks(callbacksToBeCalled, registrationData);
      });
    }

    function nodeMatchFunc(node, registrationData) {
      return utils.matchesSelector(node, registrationData.selector);
    }

    leaveEvents = new MutationEvents(getLeaveObserverConfig, onLeaveMutation);

    var mutationBindEvent = leaveEvents.bindEvent;

    // override bindEvent function
    leaveEvents.bindEvent = function(selector, options, callback) {

      if (typeof callback === "undefined") {
        callback = options;
        options = leaveDefaultOptions;
      } else {
        options = utils.mergeArrays(leaveDefaultOptions, options);
      }

      mutationBindEvent.call(this, selector, options, callback);
    };

    return leaveEvents;
  };


  var arriveEvents = new ArriveEvents(),
      leaveEvents  = new LeaveEvents();

  function exposeUnbindApi(eventObj, exposeTo, funcName) {
    // expose unbind function with function overriding
    utils.addMethod(exposeTo, funcName, eventObj.unbindEvent);
    utils.addMethod(exposeTo, funcName, eventObj.unbindEventWithSelectorOrCallback);
    utils.addMethod(exposeTo, funcName, eventObj.unbindEventWithSelectorAndCallback);
  }

  /*** expose APIs ***/
  function exposeApi(exposeTo) {
    exposeTo.arrive = arriveEvents.bindEvent;
    exposeUnbindApi(arriveEvents, exposeTo, "unbindArrive");

    exposeTo.leave = leaveEvents.bindEvent;
    exposeUnbindApi(leaveEvents, exposeTo, "unbindLeave");
  }

  if ($) {
    exposeApi($.fn);
  }
  exposeApi(HTMLElement.prototype);
  exposeApi(NodeList.prototype);
  exposeApi(HTMLCollection.prototype);
  exposeApi(HTMLDocument.prototype);
  exposeApi(Window.prototype);

  var Arrive = {};
  // expose functions to unbind all arrive/leave events
  exposeUnbindApi(arriveEvents, Arrive, "unbindAllArrive");
  exposeUnbindApi(leaveEvents, Arrive, "unbindAllLeave");

  return Arrive;

})(window, typeof jQuery === 'undefined' ? null : jQuery, undefined);
