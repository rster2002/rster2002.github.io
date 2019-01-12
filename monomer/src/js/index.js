a = {};

class Monomer {
	constructor(a) {

		this._values = {};
		this.v = {};

		if (a.element !== undefined) {
			if (this._isElement(a.element) === true) {
				this._element = a.element;
			} else if (typeof a.element === "string") {
				this._element = document.querySelector(a.element);
			}
		}

		if (a.slots !== undefined && typeof a.slots === "object" && Array.isArray(a.slots)) {

			this.slots = {};

			a.slots.forEach(slotName => {
				if (typeof slotName === "string") {

					let positions = this._getSlots(slotName);
					let id = this._genID();
					console.log(id);

					for (var i = 0; i < positions.length; ++i) {
						let el = positions[i];
						let localId = this._genID();

						el.classList.add(id);
						el.classList.add(localId);
					}

					this.slots[slotName] = {
						t: this,
						created: false,
						name: slotName,
						parent: this._element,
						_element: this._element,
						getPositions: this._getSlots,
						hasSlot: this._hasSlot,
						_hasSlot: this._hasSlot,
						_matchRecursive: this._matchRecursive,
						_replaceAll: this._replaceAll,
						_genID: this._genID,
						id: id,
						exact: {
							html: ""
						},
						set html(c) {
							this.exact.html = c;
							this.created = true;

							let e = this.parent;

							let positions = this.getPositions(this.name);
							console.log(positions)

							for (var i = 0; i < positions.length; ++i) {

								let slot = positions[i];

								let expressions = this._matchRecursive()(c, "[[...]]");

								if (expressions.length > 0) {

									console.log(expressions);

									expressions.forEach(e => {
										let original = e;
										let broken = e.split(" ");
										if (broken[0] === "") {
											broken.shift();
										}

										if (broken[broken.length - 1] === "") {
											broken.pop();
										}

										e = broken.join(" ");

										let router = {
											currentValue: ""
										};

										let operatorId = this._genID();

										if (this.t._values[e] !== undefined) {
											this.t._values[e].ids.push(operatorId);
										} else {
											this.t._values[e] = {
												ids: [operatorId]
											};
										}



										let h = c;

										h = this._replaceAll(h, "[[" + original + "]]", "<span class='" + operatorId + "'></span>");

										let v = new Proxy(this.t.v, {set: (_, prop, value) => {
											console.log(prop, value);
											if (this.t._values[prop] === undefined) {
												throw new Error("This variable is not defined");
											} else {
												let v = this.t._values[prop];
												for (var o = 0; o < v.ids.length; ++o) {
													let id = v.ids[o];
													let elements = document.getElementsByClassName(id);
													console.log(v, elements);

													for (var i = 0; i < elements.length; ++i) {
														let el = elements[i];
														console.log(el, value);

														el.innerText = value;
													}
												}
											}
										}});

										console.log(v);

										this.t[e] = v;

										// let q = {};
										// q[e] = v;
										//
										// this.t.v = Object.assign(this.t.v, v);

										// Object.defineProperty(this.t, e, {
											// set: function(value) {
											// 	console.log(value, arguments.callee.name.slice(4));
											// 	return arguments;
											// 	if (this._values[value] === undefined) {
											// 		throw new Error("This variable is not defined");
											// 	} else {
											// 		let v = this._values[value];
											// 		let elements = document.getElementsByClassName(v.id);
											//
											// 		for (var i = 0; i < elements.length; ++i) {
											// 			let el = elements[i];
											//
											// 			el.innerText = value;
											// 		}
											// 	}
										// 	}
										// });

										console.log(h);

										slot.innerHTML = h;

									});

								} else {
									slot.innerHTML = c;
								}

							}

						},
						get html() {
							let positions = this.getPositions(this.name);
							let rtrn = [];

							for (var i = 0; i < positions.length; ++i) {

								let slot = positions[i];

								rtrn.push(slot.innerHTML);

							}

							return rtrn.length === 1 ? rtrn[0] : rtrn;
						}
					}

				}
			});

		}

	}

	_isElement() {
		try {
			return obj instanceof HTMLElement;
		} catch (e) {
			return (typeof obj==="object") && (obj.nodeType===1) && (typeof obj.style === "object") && (typeof obj.ownerDocument ==="object");
		}
	}

	_hasSlot(a) {
		console.log("has", a);
		if (this._element.getElementsByTagName(a).length > 0) {
			return true;
		} else {
			return false;
		}

	}

	_getSlots(a) {
		console.log("get", a);
		if (this._hasSlot(a)) {
			return this._element.getElementsByTagName(a);
		} else {
			return false;
		}

	}

	_matchRecursive() {
		var	formatParts = /^([\S\s]+?)\.\.\.([\S\s]+)/,
			metaChar = /[-[\]{}()*+?.\\^$|,]/g,
			escape = function (str) {
				return str.replace(metaChar, "\\$&");
			};

		return function (str, format) {
			var p = formatParts.exec(format);
			if (!p) throw new Error("format must include start and end tokens separated by '...'");
			if (p[1] == p[2]) throw new Error("start and end format tokens cannot be identical");

			var	opener = p[1],
				closer = p[2],
				/* Use an optimized regex when opener and closer are one character each */
				iterator = new RegExp(format.length == 5 ? "["+escape(opener+closer)+"]" : escape(opener)+"|"+escape(closer), "g"),
				results = [],
				openTokens, matchStartIndex, match;

			do {
				openTokens = 0;
				while (match = iterator.exec(str)) {
					if (match[0] == opener) {
						if (!openTokens)
							matchStartIndex = iterator.lastIndex;
						openTokens++;
					} else if (openTokens) {
						openTokens--;
						if (!openTokens)
							results.push(str.slice(matchStartIndex, match.index));
					}
				}
			} while (openTokens && (iterator.lastIndex = matchStartIndex));

			return results;
		};
	}

	_genID() {
		function randomString(l) {
			let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			var retn = "";
			for (var i = 0; i < l; i++) {
				var r = Math.floor(Math.random() * characters.length);
				retn += characters[r];
			}
			return retn;
		}

		function genId() {
			return randomString(32);
		}

		return genId();
	}

	_replaceAll(a, b, c) {
		return a.split(b).join(c);
	}

}
