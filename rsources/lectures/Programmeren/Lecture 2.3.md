# Lecture 2.3

[toc]

## Lists

```c#
List<char> inputCharacters = new List<char>();

inputCharacters.Add('A');
inputCharacters.Add('B');

if (inputCharacters.Contains('A')) {
    // ...
}
```

## Dictionary

```C#
Dictionary<int, string> students = new Dictionary<int, string>();

if (students.ContainsKey(999)) {
    // ...
}
```

> ###### Sidenote
>
> There is a difference between `.Add(key, value)` and `[key] = value` is that using the method it check whether or not it's going to overwrite the old value and crash if it would. Using the indexer way, if you were to overwrite a value, it would not crash and overwrite the value.



