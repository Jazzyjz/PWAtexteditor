import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction, specify the DB we are posting to and the data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const store = tx.objectStore('jate');
  // pass in content
  const request = store.put({ id: 1, value: content });
  // confirm the data was added
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // connect to DB and version we want to use
  const jateDB = await openDB('jate', 1);
  // create a new transaction and specify the store and data privileges
  const tx = jateDB.transaction('jate', 'readonly');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log(result);
  return result;
};

initdb();
