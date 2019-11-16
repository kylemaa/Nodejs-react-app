/** index.js file should simply provide an index of public methods
 * and modules. This is a good way to signal to consumers of this feature code
 * which elements are meant to be referenced and used and which ones are for
 * internal use only.Those imports will stand out because they have to be more
 * explicit and we can easily find and fix them later.*/
import mongodb from 'mongodb'

export default async function makeDb () {
  const MongoClient = mongodb.MongoClient
  //var url = localhost:5000/myproject';
  const url = 'mongodb://localhost:27017'
  const dbName = 'mm_api_demo'
  const client = new MongoClient(url, { useNewUrlParser: true })
  await client.connect()
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db
}
function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}