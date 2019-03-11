const MyPlugin = {
	install(Vue, options) {
		Vue.prototype.$myAddedProperty = 'Example Property'
		Vue.prototype.$myAddedMethod = function() {
			return this.$myAddedProperty
		}
	}
};

export default MyPlugin;
