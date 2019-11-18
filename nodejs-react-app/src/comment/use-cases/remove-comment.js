import makeComment from '../comment-entity'
export default function makeRemoveComment({commentsDb}){
    return async function removeComment({commentId} ={}){
        if(!commentId){
            // throw error 
        }
        commentToDelete = commentsDb.findById({commentId})
        if(!commentToDelete){
            // throw error 
            return deleteNothing()
        }
        if(await hasReplies(commentToDelete)){
            return softDelete(commentToDelete)
        }
        // if (await isOnlyReplyOfDeletedParent(commentToDelete)) {
        //     return deleteCommentAndParent(commentToDelete)
        // }
      
          return hardDelete(commentToDelete)
    }
    async function deleteNothing(){
        return {
            deleteCount: 0,
            softDelete: False,
            message: 'Comment not found in database'
        }
    }

    async function softDelete(commentInfo){
        const toDelete = makeComment(commentInfo)
        toDelete.markDeleted()
        await commentsDb.update({
            Id: toDelete.getId(),
            author: toDelete.getAuthor(),
            text: toDelete.getText(),
            replyToId: toDelete.getReplyToId(),
            postId: toDelete.getPostId()
        })
        return {
            deleteCount: 1,
            softDelete: true,
            message: 'Comment has replies. Soft deleted.'
        }
    }

    async function hardDelete(comment){
        await commentsDd.removeComment(comment)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Comment deleted.'
        }
    }
}