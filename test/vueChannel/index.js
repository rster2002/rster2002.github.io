vueChannel("test")
    .disposable(state => {
        console.log(state);
        return true;
    });