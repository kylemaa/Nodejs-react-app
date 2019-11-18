//exports all the use cases with in this directory
import makeAddComment from './add-comment'
import makeEditcomment from './edit-comment'
import makeCommentList from './list-comment'
import makeRemoveComment from './remove-comment'
//TODO: database missing and handle for add and edit comment
const addComment = makeAddComment({})
const editComment = makeEditcomment({})
const listComments = makeCommentList({})
const removeComment = makeRemoveComment({})

const commentServices = Object().freeze({
     addComment,
     editComment,
     listComments,
     removeComment 
})
export default commentServices