# Lecture 2.2

[toc]

## 2-Dimensional arrays

A 2D Array is a kind of matrix that has both a 

```csharp
int[,] matrix = new int[5, 5]; // rows, columns
Random random = new Random();

// For every row
for (int r = 0; r < matrix.GetLength(0); r++) {
    // Nested loop, for every column
    for (int c = 0; c < matrix.GetLength(1); c++) {
        matrix[r, c] = random.Next(1, 101);
    }
}

matrix.Length; 			// Returns 25, the length of the whole matrix
matrix.GetLength(0); 	// Returns 5, the amount of rows in the matrix
matrix.GetLength(1);	// Returns 5, the amount of columns in the matrix
```

