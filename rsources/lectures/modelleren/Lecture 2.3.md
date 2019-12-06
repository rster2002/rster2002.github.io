# Lecture 2.3

[toc]

## Flow Diagram

### Parts

| Name                   | Description                                      |
| ---------------------- | ------------------------------------------------ |
| Initial Node           | Start of flow diagram                            |
| Final Node             | End of flow diagram. There may be more than one. |
| Activity Node          | Shows an activity                                |
| Decision or Merge Node | Allows the flow to diverge or merge.             |
| Guards                 | The labels from a decision node.                 |
| Activity Edges         | The arrows in the flow diagram.                  |

### Exercise

```mermaid
graph TB
	startNode(("Start"))
	startSystem("ACTOR Start system")
	systemStartWord("SYSTEM picks word")
	showGuessedWords("SYSTEM Show guessed words")
	showLifeCounter("SYSTEM Show Life Counter")
	showGuessedChars("SYSTEM Show guessed chars")
	askActorChar("SYSTEM ask ACTOR for char")
	guessChar("ACTOR Guess char")
	decisionGuess{"SYSTEM char in word"}
	guessedWrong("SYSTEM Decrement life")
	checkGameOver{"SYSTEM Life is 0"}
	guessedRight("SYSTEM Add character to word")
	gameOver(("Gameover"))
	guessedFullWord{"SYSTEM Word is guessed"}
	gameWin(("Game Win"))
	
	startNode --> startSystem
	startSystem --> systemStartWord
	systemStartWord --> showGuessedWords
	showGuessedWords --> showLifeCounter
	showLifeCounter --> showGuessedChars
	showGuessedChars --> askActorChar
	askActorChar --> guessChar
	guessChar --> decisionGuess
	decisionGuess -->|"Right"| guessedRight
	decisionGuess -->|"Wrong"| guessedWrong
	guessedWrong --> checkGameOver
	checkGameOver -->|"Not gameover"| showGuessedWords
	checkGameOver -->|"Gameover"| gameOver
	guessedRight --> guessedFullWord
	guessedFullWord -->|"No"| showGuessedWords
	guessedFullWord -->|"Yes"| gameWin
```

