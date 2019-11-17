# Terms

[toc]

## Scope

Example: `Variable a is defined within the scope of 'Example'`

A scope is a place where variables are defined:

```c#
namespace Example {
    int a = 10;
    // a is accessable
    // b is not accessable
    // c is not accessable
    
    class Program {
        static void Main(string[] args) {
            int b = 10;
            // a is accessable
            // b is accessable
            // c is not accessable
        }
        
        static test() {
            int c = 10;
            // a is accessable
            // b is not accessable
            // c is accessable
        }
    }
}
```

## Nesting (nested)

Example: `This for loop is nested within this other for loop`

Something that is nested, is saying that one method or loop is within the body of another method or loop. When we talk about nesting, we usually mean loops and methods.

```c#
// This for loop is not nested
for (int i = 1; i <= 100; i++) {
    if (i >= 50) {
        // This for loop is nested
        for (int j = i; i <= 100; j++) {
            Console.WriteLine($"{i}-{j}");
        }
    }
}
```

## Recursion

