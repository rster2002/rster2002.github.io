<template>
    <div class="content">
            <div class="card">
                <h1>Commands</h1>
                <p>Here you will find a list off added or extended commands that you can use.</p>
                <p>Everything between [] is required and everything between &lt; &gt; is optional.</p>
                
                <h2>as</h2>
                <p><span>as [selectors] run ...</span></p>
                <p>Will execute the command that comes after for every selector that is found.</p>
                <pre><code>
as @a[tag=fighter] || @a[tag=barbarian] run say Cracking bones
                </code></pre>

                <h2>call</h2>
                <p><span>call [function]([parameters])</span></p>
                <p>Executes a local function defined using the 'local' keyword.</p>
                <pre><code>
call greet(Steve)
                </code></pre>

                <h2>data</h2>
                <p><span>... set from entity score [data type] [scale] [selector] [scoreboard]</span></p>
                <p>Set's a NBT value to the value of a scoreboard</p>
                <pre><code>
data modify block ~ ~-3 ~ Items[0].Count set from entity score int 1 @p itemCount
                </code></pre>

                <h2>for</h2>
                <p><span>for [entry] in [array] {[commands]}</span></p>
                <p>Loops over the array and compiles the commands with that entry</p>
                <pre><code>
for opPlayer in [Steve, Alex, Notch] {
    effect give $opPlayer protection 100000 100 true
}
                </code></pre>

                <h2>holding</h2>
                <p><span>holding [item] &lt;nbt&gt; run [command]</span></p>
                <p>Checks wether the selector is holding the specified item.</p>
                <pre><code>
as @a run holding minecraft:clock run say tick tock
                </code></pre>

                <h2>if</h2>
                <p><span>if [scoreboard | number] [operation] [scoreboard | number] run [command]</span></p>
                <p>Checks wether the score or value of the current entity is greater than the other score or value</p>
                <pre><code>
as @a run if timer >= 20 run say timer finished
as @a run if timer >= timerLimit run say timer finished
                </code></pre>

                <h2>local</h2>
                <p><span>local [name] = [value | function]</span></p>
                <p>Defines a local which can be called.</p>
                <pre><code>
local playername = Steve
say $playername
                </code></pre>
                <p>Defines a function that can be called using the 'call' keyword.</p>
                <pre><code>
local greet = (playername) {
    say hey, $playername
    say hi, $playername
    say hello, $playername
}
                </code></pre>

                <h2>log</h2>
                <p><span>log [scoreboard] &lt;selector&gt; &lt;prefix&gt;</span></p>
                <p>Gets the current value of the scoreboard and shows it in chat</p>
                <pre><code>
log timer @s Left
                </code></pre>

                <h2>operation</h2>
                <p><span>operation [operations]</span></p>
                <p>Lets you do operations on scores. Operations are executed in order from left to right.</p>
                <pre><code>
var i = 10
var j = 2
operation i + 10 * j
# Expected output: 40
                </code></pre>
                <h2>random</h2>
                <p><span>random [range] in [scoreboard]</span></p>
                <p>Generates a random score which is in the given range.</p>
                <pre><code>
var rnd
random 1-100 in rnd
# Generates a score between 1 and 100
                </code></pre>
                <h2>store</h2>
                <p><span>store [path] in [scoreboard]</span></p>
                <p>Stores a value in the specified scoreboard</p>
                <pre><code>
var sleepTime
store self.SleepTimer in sleepTime
# Stores the current players SleepTimer nbt value into the sleepTime scoreboard
                </code></pre>
                <h2>var</h2>
                <p><span>var [scoreboard] [= | += | -=] [value]</span></p>
                <p>Alternative to using '/scoreboard'.</p>
                <pre><code>
var i
# Creates the scoreboard 'i'

var j = 10
# Creates the scoreboard 'j' and sets the current entities score to 10
                </code></pre>
            </div>
        </div>
</template>
