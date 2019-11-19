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
}