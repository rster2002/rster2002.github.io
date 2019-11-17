# Lecture 1.4 - Iteration

[TOC]

## Iteration

Loop's that repeat a section of code.

### Variants

* Execute `x` times
* As long as `x` equals true

### Different loops

#### while loop

As long as a condition is true, run the code (runs the check before the body)

```pseudocode
while <condition>
	<body>
```

> ###### Sidenote
>
> A while loop may never be ran, because it does the check before the body.

```pseudocode
read value
while value <> 0
	read value
display "end of program"
```

> ###### Sidenote
>
> The operation `<>` can be viewed as `!=`

##### Code Examples

```c#
int value = int.Parse(Console.ReadLine());

while (value != 0) {
    Console.WriteLine("Do something with value ({0})", value);
    value = int.Parse(Console.ReadLine());
}

Console.WriteLine("End of program");
```

```pseudocode
validGrade = false
while not validGrade
	display "Enter grade (1..10)"
	read grade
	validGrade = (grace >= 1) and (grade <= 10)
display "End of program"
```

```c#
bool validGrade = false;
int grade = 0;

while (!validGrade) {
    Console.Write("Enter grade (1..10)");
    grade = int.Parse(Console.ReadLine());
    
    validGrade = (grade >= 1) && (grade <= 10);
}

Console.WriteLine("End of program");
```

#### do-while loop

As long as a condition is true, run the code (runs the check after the body).

```pseudocode
do
	<body>
while <condition>
```

> ###### Sidenote
>
> A `do-while` loop always executes at least once

##### Code Examples

```pseudocode
validGrade = false
do
	display "Enter grade (1..10)"
	read grade
	validGrade = (grace >= 1) and (grade <= 10)
while not validGrade
display "End of program"
```

```c#
bool validGrade = false;
int grade = 0;

do {
    Console.Write("Enter grade (1..10)");
    grade = int.Parse(Console.ReadLine());
    
    validGrade = (grade >= 1) && (grade <= 10);
} while (!validGrade);

Console.WriteLine("End of program");
```

##### Practice

```pseudocode
read baseNumber
baseNumberCount = 0

do
	read inputValue
	
	if inputValue == baseNumber
		baseNumberCount++
while inputValue != 0

display "Count: " + baseNumberCount
```

```c#
int baseNumber = int.Parse(Console.ReadLine());
int baseNumberCount = 0;

do {
    int inputValue = int.Parse(Console.ReadLine());
    
    if (inputValue == baseNumber) {
        baseNumberCount++;
    }
} while (inputValue != 0);

Console.WriteLine("Count: {0}", baseNumberCount);
```

#### for loop

Executes a loop a set given ammount

```pseudocode
for i = 10 to 10
	<body>
```

```c#
for (int i = 1; i <= 10; i++) {
    Console.WriteLine(i);
}
```

> ###### Sidenote
>
> You can also use a while loop to do the same thing
>
> ```c#
> // Initialization
> int i = 1;
> 
> // Condition
> while (i <= 10) {
>     Console.WriteLine(i);
>     
>     // Update
>     i++;
> }
> ```
>
> 

A for-loop in C# consists of 3 parts:

* initialization
* condition
* update

```c#
for (int i = 1; i <= 20; i++) {
    Console.Write(i * i + " ");
}
```

### Nested loop

```pseudocode
for i = 1 to 10
	// executed 10 times
	for j = 1 to 20
		// executed 200 times
```

```pseudocode
read number
while number > 0
	i = 1
	while i <= number
		display "*"
		i = i + 1
	read number
```

> ###### Sidenote
>
> You *should* instead write:
>
> ```pseudocode
> read number
> while number > 0
> 	while i = 1 to number
> 		display "*"
> 	read number
> ```

## Practice

Determine whether or not a given number a prime is or not.

```pseudocode
read number
isPrime = true;
i = 2

while isPrime and i < number
	if number % 1 == 0
		isPrime = false
	i++;
```

```c#
int number = int.Parse(Console.ReadLine());
int isPrime = true;

int i = 2;
while (isPrime && i < number) {
    if (number % i == 0) {
        isPrime = false;
    }
    
    i++;
}
```

> ###### Sidenote
>
> Note we also check whether or not a check already returned false for `isPrime` because if one check fails, it doesn't have to check other numbers whether or not it's a prime.