# Lecture 2.1

[toc]

## Calendar

| Week | What                        |
| ---- | --------------------------- |
| 1    | Structures, classes         |
| 2    | 2-dim arrays, flow controll |
| 3    | Lists / Dictionaries        |
| 4    | File I/O / error handling   |
| 5    | Program structure           |
| 6    | Program structure           |
| 7-8  | Holliday                    |
| 9    | Practice exam               |
| 10   | Exams                       |

## Rules methods

1. Methods have meaningful names
2. One method, one task
3. As a rule of thumb: 30 lines of code per method.

## Static methods

Static is available everywhere. From one static method, you can only call other static methods. When a method is not static, it can only be used by that class.

```c#
class Program {
    static void Main(string[] args) {
        Program myProgram = new Program();
        myProgram.start();
    }
    
    void start() {
        // Code
    }
    
    bool isLeapYear() {
        // Code
    }
}
```

> ###### Sidenote
>
> You can also use a constructor instead of `myProgram.start()`.

## Enumerations

```C#
public enum WeekDays {
    Sunday, Monday, Theusday, Wednesday, Thursday, Friday, Saturday
}

class Program {
    static void Main(string[] args) {
        bool result1 = IsWeekend(WeekDays.Monday);
    }
    
    public static bool IsWeekend(WeekDays day) {
        return ((day == WeekDays.Sunday) || (day == WeekDay.Saturday));
    }
}
```

> ###### Sidenote
>
> Enumerations should be defined in a seperate file

```c#
public enum WeekDays {
    Sunday, Monday, Theusday, Wednesday=8, Thursday, Friday, Saturday
}
```

Sunday will be 0, and Friday will be 10.

```c#
public enum Days {
    Sunday, Monday, Theusday, Wednesday, Thursday, Friday, Saturday
}

for (Days d = Days.Sunday; d <= Days.Saturday; d++) {
    // Code
}
```

> ###### Tip
>
> Create a method for reading an input for a enumeration.

## Structures

Groups multiple sets of data.

```c#
struct Student {
    public string Naam;
    public string Nummer;
    // Etc
}

Student student1;

Student1.Naam = "Peter";
Student1.Nummber = "13901";
```

> ###### Sidenote
>
> Structs should be defined in a separate file.

> ###### Sidenote
>
> It's a good practice to create a method for reading and displaying a student.

## Classes

```C#
// Instead of 'struct' you can do 'class' and it will function the same.
class Student {
    public string Naam;
}

Student student1;
student1 = new Student(); // This line is required when using classes and is not requied when using struct.
```

> ###### Sidenote
>
> A `struct` is a value type and uses the stack.
>
> A `class` is a reference type and uses the heap (and therefor, pointers)