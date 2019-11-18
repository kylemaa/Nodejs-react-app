/** This controller uses the injected use case 'add-comment',
 * [PROMISE] then await for that use case to be done before return
 * the necessary properties of an object with the injected http req*/
export default function makePostComment({addComment}){
    return async function PostComment(httpRequest){
        try{
            const {source = {}, ...commentInfo} = httpRequest.body
            // don't know what this is yet. Maybe checking for IP source
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
              source.referrer = httpRequest.headers['Referer']
            }
            // store the content of add comment use case into posted const and post it as body
            const posted = await addComment() //TODO: pass missing object(s) to addComment()
            return{
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(posted.modifiedOn).toUTCString()
                  },
                statusCode: 200,
                body: {posted}
            }

        }
        catch(e){
            console.log(e)
            return {
                headers:{ 'Content-Type': 'application/json'},
                statusCode: 400,
                body: {error: e.message}
            }

        }
    }
}