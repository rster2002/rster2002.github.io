module.exports = {
	entries: [
		"./src/**/*.mcfunction"
	],
	loaders: [
		{
			loader: "bss",
			filter: a => a.extension === "mcfunction",
			config: {
				namespace: "t",
				autoAt: true,
				initScoreboard: true,
				cleanup: false,
				initScoreboard: false
			}
		}
	],
	output: {
		dir: "./functions"
	}
}
