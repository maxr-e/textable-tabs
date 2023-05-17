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

//logic that accepts content and adds it to the database
export const putDb = async (content)  => {
  console.log('Put to the database');
  const codeDb = await openDB('jate', 1);
  const tx = codeDb.transaction('jate', 'readwrite');
  //jate store
  const store = tx.objectStore('jate');
  //use .put() method on the 'store' and pass in content.
  const request = store.put({ id: 1, text: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

//logic that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  //opens database and version we want to use.
  const codeDb = await openDB('jate', 1);
  //new transaction, database name and privileges
  const tx = codeDb.transaction('jate', 'readonly');
  //jate store
  const store = tx.objectStore('jate');
  //use .getAll() method to get all data in the database
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();