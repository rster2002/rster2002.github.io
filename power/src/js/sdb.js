import sdb from "sessiondb";

const db = new sdb("db").useMessager(localStorage).keepAlive();

export default db;
