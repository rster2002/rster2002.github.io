# Lecture 2.4

[toc]

## File I/O

### Reading File

```cs
using System.IO; // Use System.IO so you don't have to write IO.<component>

void displayFile(string filename) {
    StreamReader reader = new StreamReader(filename);
    
    while (!reader.EndOfStream) {
        string s = reader.ReadLine();
        Console.WriteLine(s);
    }
    
    reader.close();
}
```

> ###### Sidenote
>
> It's a good practice to first check whether or not the file exists. You can do this using the `File.Exists(<path>)`.
>
> ```cs
> if (File.Exists("./somePath.txt")) {
>     // Read the file
> }
> ```

### Writing File

```cs
void writeFile(string filename) {
    StreamWriter writer = new StreamWriter(filename);
    
    string s = Console.ReadLine();
    while (s != "stop") {
        writer.WriteLine(s);
        
        s = Console.ReadLine();
    }
}
```

## Error Handling

```cs
try {
    // Code
} catch (Exception exception) {
    // Error handling
} finally {
    // Always runs
}
```



