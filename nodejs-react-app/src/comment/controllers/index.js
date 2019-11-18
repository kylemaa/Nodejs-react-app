// Export all the connectors/controllers 
import commentServices from '../use-cases/index'
import makeDeleteComment from './delete-comment'
import makeGetComment from './get-comment'
import makePatchComment from './patch-comment'
import makePostComment from './post-comment'

// get the properties from the freeze object 
const addComment = commentServices.addComment
const editComment = commentServices.editComment
const listComments = commentServices.listComments
const removeComment = commentServices.removeComment

// inject properties into controllers
const deleteComment = makeDeleteComment({ removeComment })
const getComments = makeGetComment({listComments})
const postComment = makePostComment({ addComment })
const patchComment = makePatchComment({ editComment })

const commentController = Object.freeze({
    deleteComment,
    getComments,
    postComment,
    patchComment
})
export default commentController