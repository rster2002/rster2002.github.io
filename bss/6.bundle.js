(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{364:function(e,t,n){"use strict";n.r(t);var o=n(95),a=Object(o.a)({},function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("div",{staticClass:"card"},[n("h1",[e._v("Getting Started")]),e._v(" "),n("p",[e._v("\n                    This is where you will learn everything you need to know to get started.\n                ")]),e._v(" "),n("h2",[e._v("Why Bluestone Script?")]),e._v(" "),n("p",[e._v("\n                    Why would you want to use BSS? By using BSS you make sure you write your datapacks in the most efficient way there is.\n                    It takes away having to manually create files when you check for something and need to run multiple commands. This helps\n                    making your datapack faster and more efficient. It helps you create your datapacks faster by adding extra commands that\n                    would normally take multiple commands to get the same result. \n                ")]),e._v(" "),n("h2",[e._v("Setup")]),e._v(" "),n("ol",[n("li",[e._v("Download and install nodejs from their website "),n("a",{attrs:{target:"_blank",href:"https://nodejs.org/"}},[e._v("here")]),e._v(".")]),e._v(" "),n("li",[e._v("Open your command promt and type "),n("span",[e._v("npm install backpacker -g")]),e._v(". backpacker is needed to run BSS.")]),e._v(" "),n("li",[e._v("Create a datapack in your world folder and navidate to the data folder where you'll be working.")]),e._v(" "),n("li",[e._v("\n                        Create the following folders: "),n("span",[e._v("backpacker_pouches")]),e._v(", "),n("span",[e._v("src")]),e._v(", "),n("span",[e._v("functions")]),e._v(" "),n("ul",[n("li",[n("span",[e._v("backpacker_pouches")]),e._v(": This folder will hold the BSS compiler")]),e._v(" "),n("li",[n("span",[e._v("src")]),e._v(": This is where you will write your BSS code")]),e._v(" "),n("li",[n("span",[e._v("functions")]),e._v(": This is where your compiled files will go to so minecraft can run it.")])])]),e._v(" "),n("li",[e._v("Download the BSS compiler from "),n("a",{attrs:{target:"_blank",href:"https://github.com/rster2002/BSS"}},[e._v("here")]),e._v(".")]),e._v(" "),n("li",[e._v("Create a folder in the folder named "),n("span",[e._v("backpacker_pouches")]),e._v(" and create a folder called: "),n("span",[e._v("bss")]),e._v(" (notice it's lowercase)")]),e._v(" "),n("li",[e._v("Extract the content's of the zip you downloaded earlier into this folder.")]),e._v(" "),n("li",[e._v("Create a file called "),n("span",[e._v("backpacker.config.js")]),e._v(".")])]),e._v(" "),n("p",[e._v("\n                    To make sure you are setup right, open your command promt in the data folder (click on the bar that shows the path and\n                    type 'cmd') and type "),n("span",[e._v("backpacker version")]),e._v(". You should see a line that shows the current installed version\n                    of backpacker.\n                ")]),e._v(" "),n("h2",[e._v("What did we just do?")]),e._v(" "),n("p",[e._v("\n                    We did a lot here, so I'm going to quickly explain why we need the things that we downloaded and how it works. First things\n                    first, we downloaded nodejs. We did that because BSS is made in javascript. Next we installed a tool called 'backpacker'.\n                    This handels the reading and creation of files. It basically takes the files that we write, runs then through BSS and the exports\n                    them to an other folder. That why we created two additional folders besides the 'functions' folder. The 'src' folder holds our\n                    files that havent been compiled yet. This is where we will work in. The other folder 'backpacker_pouches' is used by backpacker\n                    as a location to get the compiled from. You only need to worry about it when updating.\n                ")]),e._v(" "),n("h2",[e._v("Configuration")]),e._v(" "),n("p",[e._v("\n                    We need to configure backpacker to tell it where our files are, where they need to go, and that it needs to use BSS for 'mcfunction' files.\n                    We do this by editing 'backpacker.config.js' and copying the folliwing code into it.\n                ")]),e._v(" "),n("pre",[n("code",{staticClass:"js"},[e._v('\nmodule.exports = {\n    entries: [\n        "./src/**/*.mcfunction"\n    ],\n    loaders: [\n        {\n            loader: "bss",\n            filter: a => a.extension === "mcfunction",\n            config: {\n                namespace: "t"\n            }\n        }\n    ],\n    output: {\n        dir: "./functions"\n    }\n}\n                ')])]),e._v(" "),n("p",[e._v("\n                    You don't need to understand any of this for now, but here is a quick rundown.\n                ")]),e._v(" "),n("ul",[n("li",[n("span",[e._v("entries")]),e._v(": Here we specify what files to use. It is now setup to find every file with the 'mcfunction'\n                        extension in the 'src' folder and folder under it.\n                    ")]),e._v(" "),n("li",[n("span",[e._v("loaders")]),e._v(": This is a list of compilers used for converting the code that we write, to code that is\n                        readable by minecraft. We specify that we want to use BSS and tell backpacker to only use this loader if the extension\n                        of the file is 'mcfunction'. Lastly we tell BSS the namespace of our datapack by specifying it in the config section.\n                        This is required if we want to use block's (I'll explain what those are later).\n                    ")]),e._v(" "),n("li",[n("span",[e._v("output")]),e._v(": This just specifies the folder where the compiled files should go.\n                    ")])]),e._v(" "),n("h2",[e._v("Let's write some code")]),e._v(" "),n("p",[e._v("\n                    Now that we have configured backpacker, we are ready to write some code. Open up command prompt in your data folder.\n                    Type "),n("span",[e._v("backpacker watch")]),e._v(", this will tell backpacker to start watching the 'src' folder and compile your\n                    code when anything changes. Minimize it so it's not in the way, but keep it open. Let's then create a file called \n                    'index.mcfunction' in our 'src' folder. This is where we will write our function. Let's just started with something simple.\n                    Write 'say hello world' in your file and check your command prompt. It should somewhere say something like: \n                    '[ done ] { bss } output: './index.mcfunction''. Check your 'functions' folder and you should see a new file called 'index.mcfunction'.\n                    If you open it, you will see that it contains the exact line we wrote: 'say hello world'. Now this is not that exiting, so let's\n                    introduce a BSS command: 'as'. Replace \"say hello world\" with \"as @a run say hello world\" and check the compiled file again.\n                    You should see that it compiled into \"execute as @a at @s run say hello world\". We just saw BSS do a basic task: replacing the 'as'\n                    keyword with an execute command. This already saves us some work. It's not a lot, but it's something.\n                ")])])])}],!1,null,null,null);t.default=a.exports}}]);