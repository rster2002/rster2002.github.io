# Lecture 2

[toc]

## N-Tuple

* Volgorde is belangrijk
* Duplicaten niet negeren

$$
(x, y, z) \ne (z, x, y) \\
\{x, y, z\} = \{z, x, y\}
$$

## SQL

### USE

```sql
USE <db naam>
```

### SELECT

```sql
SELECT <velden>
```

Laat de kolommen zien die worden geselecteerd.

### FROM

```sql
FROM <tabel>
```

### WHERE

```sql
WHERE
```

### Check for NULL

```sql
SELECT *
FROM student
WHERE birthDate IS NULL;
```

### AS

```sql
SELECT COUNT(*) AS [<kolom naam>]
```

### ORDER BY

```sql
ORDER BY <veld(en)>
```

### SELECT DISTINCT

```sql
SELECT DISTINCT city, [name]
FROM student;
```



