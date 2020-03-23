# aLecture 3

[toc]

## DDL

### CREATE

#### Database

```SQL
CREATE DATABASE <database name>
```

#### Table

```sql
CREATE TABLE <table name>
	(<col name> <datatype> [NOT NULL | NULL] [PRIMARY KEY],
    <col name> <datatype> [REFERENCES <table>(<field>)]);
```

##### Data types

* VARCHAR(n)
  * n is de max aantal characters die er mogelijk zijn
* CHAR(n)
  * n geeft het exact aantal characters aan waaruit het moet bestaan
* VARCHAR(n)
* SMALLINT
* INT
* BIGINT
* DECIMAL(p, s)
  * p, aantal getallen
  * s, aantal decimalen
* NUMERIC(p, s)
* FLOAT(n)
* real
  * Alle $\R$ getallen
* SMALLMONEY
* MONEY
* DATETIME
* DATE
* TIME

### ALTER

```sql
ALTER TABLE <table name>
	ADD PRIMARY KEY (field);
```

```sql
ALTER TABLE <table name>
	ADD FOREIGN KEY (<field>) REFERENCES <table>(<field>);
```



### DROP

```SQL
DROP DATABASE <database name>
```

#### GO

Wacht op de vorige operatie

## DML

### INSERT

### UPDATE

### DELETE



