# One Last Time 1

[toc]

## Understanding programming

Programming is the act of telling a computer what to do. The problem is that computers don't speak English or Dutch. So to make a computer do things, we need specific instructions for the computer to follow. You talk to the computer using a programming language like `C++`, `Java`, `Dart`, `JavaScript` and a lot more. Here we will use `C#`.

## How a computer reads code

Let's say we want the user to be able to input a value and calculate the tax for that value. If we write this without using code we would get something like:

* Get an number from the user
* Take that number and multiply it by 1.21 (for 21% tax)
* Display the calculated value

As you can see, if we read this from top to bottom, we have our instructions for a human. A computer reads from top to bottom, just as a human would read a letter or book.

## Writing the code

So now we need to tell the computer what to do. In this case we use `C#` to talk to the computer. Let's take a look at the first step. We need to somehow get the input from the user and remember it for the next step. The first part, reading the input from the user, is different from one language to the other. In `C#` we use:

```c#
Console.ReadLine();
```

Now, when you would let the computer read this, it will stop and wait's for the user to type something and press `enter`. But we need to remember what the user has typed. To do this we need something called a `variable`.

### Variables

You can see a variable as a box. A box where you can store something inside of with a label later get what is stored in that box. In `C#` there are different types of 'boxes'. The type of 'box' or 'variable' decides what you can store inside of it. An `int` for example can only hold whole numbers, a `double` can also hold decimal numbers and a `string`, that holds text. To create a variable in `C#` you would type something like:

```c#
int number = 10;
```

First we type the type of the variable, in this case `int`. Then we give it an 'label' (`number`) and then we use the equals operator (`=`) to store the value `10` in the variable. Knowing this, we can get the input of the user.

```c#
string input = Console.ReadLine();
```

We read an input of the user and store it in `input`. But we can't do math with a string. We need to convert it to a number first. To do this, we can do:

```c#
int.Parse(<string>);
```

> ###### Sidenote
>
> There is also the option of:
>
> ```c#
> int.TryParse(<string>, out int <variable>);
> ```
>
> Which returns a Boolean whether or not the string is actually a valid number and outputs in in `<variable>`. This way, the application won't crash when you type something like `1a`.

It returns an `int` which we _can_ use to calculate the tax. So we would add this line to our code:

```c#
int number = int.Parse(input);
```

### Operations

Now we need to do something with the input we got. We can use math operations like addition, subtraction etc. In this case we need to multiply by `1.21` (because we want to add 21% to the value). Multiplying uses the character `*` to do the operation. Because we want to show it to the user, we also store it in a variable. But, in this case we use `double` as the type for the variable. Because it is now possible to get a decimal number.

```c#
double result = number * 1.21;
```

We are almost done with the program.