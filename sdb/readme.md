# Sessiondb

A really small wrapper for sessionStorage.

The goal was to make sessionStorage easier to use while also making it more powerful.

### Installation

Simply run

```npm install sessiondb```

or using yarn:

```yarn add sessiondb```

### Usage

Using sessiondb is simple. You first create a db with a name:

```javascript
import sdb from "sdb";

const db = new sdb("party");
```

and then you are ready to go!

#### Put

```javascript
db.put({
    __id: "referenceid",
    name: "Bilbo",
    surname: "Baggins",
    age: 60,
    partyMember: true
});
```

We store this object into our database with a reference. This reference can later be used to get back the data. You can also add objects to the database without defining a reference id. If you do this, sessiondb will create an id for you which you get by listening on the promise.

```javascript
db.put({
    name: "Gandalf",
    surname: "the Gray",
    age: 2019,
    partyMember: true
}).then(r => console.log(r.__id));
// We can later use the id to get the data
```

#### Get

```javascript
db.get("referenceid"); // Will return Bilbo Baggins
```

```javascript
db.get("name", "Gandalf"); // Will return Gandalf the Gray
```
```javascript
db.get("partyMember", true); // Will return both Gandalf and Bilbo
```

```javascript
db.get(); // Will get everything that is stored in the database
db.get("*"); // Is the same as above
```

#### Update

```javascript
db.update("referenceid", {
    inventory: [
        "Arkenstone"
    ]
}); // Will update Bilbo Baggins with a new property
```

```javascript
db.update("name", "Gandalf", {
    age: 2020
}); // Updates the age property of Gandalf
```

#### Del

```javascript
db.del("refernceid"); // Will delete Bilbo from the database
```

```javascript
db.del("name", "Gandalf"); // Will delete Gandalf from the database
```

```javascript
db.del(); // Will delete the whole database
db.del("*"); // Is the same as above
```

#### Computed

```javascript
db.computed("partySize", a => a.length); 
db.partySize; // Will return 2 and will update when new party members are added
```

#### onSnapshot

```javascript
db.onSnapshot(d => console.log(d)); // Will return the whole database to use. This function will be called every time that something changes
```

#### addProcessor

```javascript
db.addProcessor(a => {...a, onAdventure: true});
db.put({
    name: "Thorin",
    surname: "Oakenshield",
    age: 195,
    partyMember: true
});
db.get("name", "Thorin").then(r => console.log(r)); 
// Will return:
{
	// ... 
    onAdventure: true
}
```

