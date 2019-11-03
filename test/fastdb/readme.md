# Fastdb

A small and powerful wrapper for communicating to a remote or local storage. This project is a continuation of sessiondb, but rewritten to work a little different.

### Installation

To add fastdb to your project, you need to use npm like this:

```bat
npm i fastdb
```

Or you can use yarn

```
yarn add fastdb
```

### Usage

First of all, you import fastdb and create a new database.

```javascript
import fdb from fastdb

const db = fdb("starwars");
```

Your database should have a name, so it can be referenced even when the browser session is stopped and reopened.

### Using data

To add data to your database, you can just do:

```javascript
db.lukeSkywalker = {
    name: "Luke",
    surname: "Skywalker",
    side: "Resistance"
}

db.darthVader = {
    name: "Anakin",
    surname: "Skywalker",
    side: "Dark Side"
}
```

Which can easily be retrieved by using:

```javascript
// Retrieves the entry for Luke Skywalker
db.lukeSkywalker;
```

Under the hood, fastdb stores it in the localStorage by default. So if you were to reload the page and try to access the data again (without adding it first to the database) it still returns your data.

If you want to delete data, you can just assign `null` or `undefined` to the property and fastdb will remove it from the database.

```javascript
db.lukeSkywalker = null;
// OR
db.lukeSkywalker = undefined;
```

### Methods

There are a couple of methods you can call for extra functionality. All methods are within a special object with key `$`. First off, you can call `getAll` to get everything that is stored in the database in a object. But you can also parse in an array, and instead of an object of with the contents of the database, it'll return an array with the contents.

```javascript
// Gets everything from the database as an object
db.getAll();

// Is the same as above
db.getAll({});

// Returns the data in an array
db.getAll([]);
```

You can also query for data using the `query` method. Queries will always return the data as an array.

```javascript
// Query by prop and value, will return both Darth Vader and Luke Skywalker
db.query("surname", "Skywalker");

// Query by multiple props, will return Luke Skywalker
db.query({
    surname: "Skywalker",
    side: "Resistance"
});

// Query by using a function, will return Darth Vader
db.query(doc => doc.side === "Dark Side");
```

### Configuration

```javascript
// Use localStorage instead of sessionStorage
const db = fdb("starwars");
```

