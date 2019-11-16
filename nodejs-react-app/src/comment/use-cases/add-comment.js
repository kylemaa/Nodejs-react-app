import makeComment from '../comment-entity'
export default function makeAddCommment({commentsDB, handleModeration}){
    return async function addComment(commentInfo){
        // Store the comment info in a constant and check if it's already existed in the injected database.
        const comment = makeComment(commentInfo)
        const exists = await commentsDb.findByHash({ hash: comment.getHash() })
        if (exists) {
        return exists
        }
    
    const moderated = await handleModeration({comment})
    const commentSource = moderated.getSource()
        // Returns the method to the database insert method.
        // The database does not have to know anything about the adding comment.
    return commentsDB.insert({
        author: moderated.getAuthor(),
        createdOn: moderated.getCreatedOn(),
        hash: moderated.getHash(),
        id: moderated.getId(),
        modifiedOn: moderated.getModifiedOn(),
        postId: moderated.getPostId(),
        published: moderated.isPublished(),
        replyToId: moderated.getReplyToId(),
        source: {
          ip: commentSource.getIp(),
          browser: commentSource.getBrowser(),
          referrer: commentSource.getReferrer()
        },
        text: moderated.getText()
      })
    }
}