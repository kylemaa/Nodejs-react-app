/** This controller uses the injected use case 'list-comment',
 * [PROMISE] then await for that use case to be done before return
 * the necessary properties of an object with the injected http req*/
export default function makeGetComment({listComments}){
    return async function ({httpRequest}){
    const headers = {
            'Content-Type': 'application/json'
        }
        //await for use case to return comment(s)
        try{
            const postComments = await listComments({
            postId: httpRequest.query.postId
            })
            return{
                headers,
                statusCode: 200,
                body: postComments
            }

        }catch(e){
            console.log(e)
            return{
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}