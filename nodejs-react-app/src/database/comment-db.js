export default function makeCommentsDb ({ makeDb }) {
    return Object.freeze({
      findAll,
      findByHash,
      findById,
      findByPostId,
      findReplies,
      insert,
      remove,
      update
    })
    /** use id of a comment to search for the comment within the collection */
    async function findById({id:_id}){
      const db = await makeDb()
      result = await db.colllection('comment').find({_id})
      // Returns an array of each value in this collection
      found = await result.toArray()
      if(found.length === 0 ){
        return null
      }
      // copy the content of the key _id to id from array found and return the object
      const {_id: id, ...info} = found[0]
      return {id, ...info}
    }
}