# Programmeren week 3 - Selectie

[TOC]

## Selectie

### Opdracht 2.3

```pseudocode
read seconds
hours = seconds / 3600
seconds = seconds - hours * 3600
minutes = seconds / 60
seconds = seconds - minutes * 60
display hours, minutes, seconds
```

Uses interger deviding, $3601 / 3600 = 1$ because it can't store decimals.

The modulo operator (`%`) takes all whole numbers from a number and shows how much remains (calculates the remainder)

### Opdracht 2.8

`Button.Icon` sets an icon to an button

### Selection types

##### 2-property expression

* if
* if-else

##### Multiple selection

* switch

#### If-then

```pseudocode
if <condition>
	<statement>
```

##### Example

```pseudocode
PASS_LIMIT = 55
read grade
if grade < PASS_LIMIT
	display "Failed"
```

> ###### Sidenote
>
> `Int.Parse` and `Int32.Parse` does the same.

> ###### Sidenote
>
> When there is only one line needs to be executed you can do in C#:
>
> ```C#
> if (condition)
>     statement
> ```
>
> And don't have to put brackets around it.

#### If-else

```pseudocode
if <condition>
	<statement>
else
	<statement>
```

##### Example

```pseudocode
PASS_LIMIT = 55
read grade
if grade < PASS_LIMIT
	display "Failed"
else
	display "Passed"
```

> ###### Sidenote
>
> Don't add else statments when you don't need them.

#### If-nested

```pseudocode
if <condition>
	if <condition>
		<statements>
	else
		<statements>
```

##### Example

```pseudocode
PASS_LIMIT = 55
read grade
if grade < PASS_LIMIT
	display "Failed"
else
	if grade < 80
		display "Passed, ok"
	else
		display "Passed, good"
```

```C#
// C# equivelent
if (grade < PASS_LIMIT) {
    Console.WriteLine("Failed");
} else {
    if (grade < 80) {
		Console.WriteLine("Passed, ok");
    } else {
        Console.WriteLine("Passed, good");
    }
}
```

#### If-elseif

##### Example

```pseudocode
PASS_LIMIT = 55
read grade
if grade < PASS_LIMIT
	display "Failed"
else if grade < 80
	display "Passed, ok"
else
	display "Passed, good"
```

```C#
// C# equivelent
if (grade < PASS_LIMIT) {
    Console.WriteLine("Failed");
} else if (grade < 80) {
    Console.WriteLine("Passed, ok");
} else {
    Console.WriteLine("Passed, good");
}
```

#### Self-test

Read two numbers and create the pseudocode 

```pseudocode
read number1, number2
if number1 > number2
	display "Biggest number is " + number1
	display "Smallest number is " + number2
else 
	display "Biggest number is " + number2
	display "Smallest number is " + number1
```

> ###### Sidenote
>
> ```pseudocode
> read number1, number2
> biggest = number1 > number2 ? number1 : number2
> smallest = number2 > number1 ? number2 : number1
> display biggest, smallest
> ```
>
> May be less lines, but is harder to read.

> ###### Sidenote
>
> Don't add `else-if` statements when they are not needed.
>
> ```pseudocode
> read number1, number2
> if number1 > number2
> 	display "Biggest number is " + number1
> 	display "Smallest number is " + number2
> else if number2 > number1
> 	display "Biggest number is " + number2
> 	display "Smallest number is " + number1
> ```

You can see that we write `Biggest number is` two times. We can make this code cleaner by assinging variables like this:

```pseudocode
read number1, number2
if number1 > number2
	biggest = number1
	smallest = number2
else 
	biggest = number2
	smallest = number1
	
display "Biggest number is " + biggest
display "Smallest number is " + smallest
```

#### Self-test 2

Personel get a 5% raise in salery, but has to be at least 75 euro's more than they already earn. You read the current salery and then display how much extra money they get per month.

```pseudocode
read salery
raise = salery * 0.05
if raise < 75
	raise = 75

newSalery = salery + raise
display raise, newSalery
```

> ###### Sidenote
>
> You can write `if raise <= 74` but is a bad practice because it's not as readable as `if raise < 75` because you include the value you are targeting (in this case `75`)

### Statements

#### Multiple conditions

| A    | B    | OUT  |
| ---- | ---- | ---- |
| 0    | 0    | 0    |
| 0    | 1    | 0    |
| 1    | 0    | 0    |
| 1    | 1    | 1    |

```pseudocode
PASS_LIMIT = 55
read grade
if grade >= PAS_LIMIT and grade < 60
	display "Just passed"
```

You can assign a boolean value to a statement and will result the result.

```C#
bool studentInternship = firstYearDone && (totalCredits >= 100)
```

> ###### Sidenote
>
> We use brackets (`()`) to improve readability

> ###### Sidenote
>
> You can also use `&` to compare but has different behavior:
>
> `&&` if the first of the conditions is false, it doesn't continue to check.
>
> `&` go's though all condition statements even if one already failed.

#### One of confitions

| A    | B    | OUT  |
| ---- | ---- | ---- |
| 0    | 0    | 0    |
| 0    | 1    | 1    |
| 1    | 0    | 1    |
| 1    | 1    | 1    |

```pseudocode
bool failedProgramming1 = failedExam || failedAssignments
```

> ###### Sidenote
>
> You can use `|` and has the same behavior as `&`: it check all statements even if one already returned true

### The switch statement

```pseudocode
read grade
switch grade
	case "A":
		display "Excellent"
	case "B", "C":
		display "Good"
	case "D"
		display "Meh"
	default:
		display "I don't know"
```

```C#
switch (grade) {
    case "A":
        Console.WriteLine("Prima")
        break;
	default"
        Console.WriteLile("Geen idee wat dit is");
        break;
}
```

> ###### Sidenote
>
> Note the `break;` at the end of every `case`.

### Oefeningen

#### Oefening 3

```pseudocode
read goldNL, goldGE

nlHigher = false

if goldNL > goldGE
	nlHigher = true
else if goldNL == goldGE
	read silverNL, silverGE
	if silverNL > silverGE
		nlHigher = true
	else if silverNL == silverGE
		read bronzeNL, bronzeGE
		nlHigher = bronzeNL > bronzeGE
			
if nlHigher
    display "Nederland staat hoger dan Duitsland"
else
    display "Nederlands staat niet hoger dan Duitsland"
```



