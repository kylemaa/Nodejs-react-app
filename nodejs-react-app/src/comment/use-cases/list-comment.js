/** In this use case, we would return a async function 
 * that would return a PROMISE (that attached callbacks) list of comment by looking at the
 * injected database. */
export default function makeCommentList({commentDB}){
    return async function getComments({postId} ={}){
        if (!postId){
            //Some error
        }
    const comments = await commentDB.findByPostId({
        postId
    })
    const nestedComments = nest(comments)
    return nestedComments

    function nest(){
        //push the replies of a comment into an empty array
    }
    }
}