import makeComment from '../comment-entity'
export default function makeEditComment({commentsDB}){
    // 'changes' overwrite the existing properties with the ones we're passing
    return async function editComment({commentId, ... changes}){
    // check for error states 
        if (!id) {
            throw new Error('You must supply an id.')
          }
        if (!changes.text) {
            throw new Error('You must supply text.')
          }
        // pull the comment from the 
        const existing = await commentsDb.findById({ commentId })
        if (!existing) {
            throw new RangeError('Comment not found.')
          }
    
        const comment = makeComment({...existing, ...changes, modifiedOn: null})
        // check new comment against existing comment hash, where is this returning to?
        if(comment.getHash() === existing.hash) {
            console.log(comment)
            return existing
          }
        const updated = await commentsDB.update({
            // TODO: moderate the new commment 
            id: moderated.getId(),
            published: moderated.isPublished(),
            modifiedOn: moderated.getModifiedOn(),
            text: moderated.getText(),
            hash: moderated.getHash()

        })
        return { ...existing, ...updated }
    }
}