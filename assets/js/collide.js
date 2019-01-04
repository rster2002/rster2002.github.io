String.prototype.replaceAll = function(a, b) {
	return this.split(a).join(b);
}

class Collide {
	constructor(el) {
		var element = document.querySelector(el);

		if (element === null) {
			throw new Error("Specified element can't be found!");
		} else {
			element.classList.add("collide--page");

			element.style.position = "relative"

			this.parrent = element;
			this.usedComponents = [];
			this.top = 0,
			this.left = 0,
			this.height = window.innerHeight,
			this.width = window.innerWidth

			this.setHeight = (height) => {
				if (this.validateParent()) {
					this.height = height;
					this.parrent.style.height = this.height + "px";
				}
			}

			this.setWidth = (width) => {
				if (this.validateParent()) {
					this.width = width;
					this.parrent.style.width = this.width + "px";
				}
			}

			this.setTop = (top) => {
				if (this.validateParent()) {
					this.top = top;
					this.parrent.style.top = this.top + "px";
				}
			}

			this.setLeft = (left) => {
				if (this.validateParent()) {
					this.left = left;
					this.parrent.style.left = this.left + "px";
				}
			}

			this.compressDown = (movement) => {
				this.setHeight(this.height - movement);
				this.setTop(this.top + movement);
			}

			this.compressLeft = (movement) => {
				this.setWidth(this.width - movement);
				this.setLeft(this.left + movement);
			}

			this.validateParent = () => {
				if (document.body.contains(this.parrent)) {
					return true;
				} else {
					throw new Error("The element thas was specified durring the creation of this class, doesn't exist anymore.");
					return false;
				}
			}

			this.genId = () => {
				var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				var l = 32;
				var retn = "";
				for (var i = 0; i < l; i++) {
					var r = Math.floor(Math.random() * characters.length);
					retn += characters[r];
				}
				return retn;
			}

			this.createStyle = (style, id) => {
				let s = document.createElement("style");
				s.innerHTML = style.replaceAll("<id>", id);
				document.body.insertBefore(s, document.body.childNodes[0]);
			}
		}
	}

	use(comp) {
		var components;
		var initComponent;

		components = {
			"top-bar": {
				html: `<div class="topbar"></div>`,
				css: `#<id> {
					height: 64px;
					width: 100%;
					position: fixed;
					z-index: 1;
				}

				#<id> > .topbar {
					width: 100%;
					height: 100%;
				}`,
				created(t, comp) {
					t.compressDown(64);
				}
			}
		}

		initComponent = (component) => {
			var compInfo = components[component];

			if (compInfo === undefined) {
				throw new Error("Can't find the component");
			} else if (this.usedComponents.indexOf(component) !== -1) {
				throw new Error("Component: '" + component + "' is already initiated.")
			} else {

				this.usedComponents.push(component);

				let id = this.genId();
				let e = document.createElement("div");
				e.innerHTML = compInfo.html;
				e.id = id;
				document.body.insertBefore(e, document.body.childNodes[0]);

				this.createStyle(compInfo.css, id);

				compInfo.created(this, {
					id: id
				});
			}
		}

		if (typeof comp === "object") {
			if (Array.isArray(comp)) {
				comp.forEach(a => initComponent(a));
			}
		} else if (typeof comp === "string") {
			initComponent(comp);
		} else {
			throw new Error("You have to parse either a string or an array.");
		}
	}
}
