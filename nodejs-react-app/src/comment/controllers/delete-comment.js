/** This controller uses the injected use case 'remove-comment',
 * [PROMISE] then await for that use case to be done before return
 * the necessary properties of an object with the injected http req*/
export default function makeDeleteComment ({ removeComment }) {
    return async function deleteComment (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        //use param to look at the comment id
        const deleted = await removeComment({ id: httpRequest.params.id })
        return {
          headers,
          statusCode: deleted.deletedCount === 0 ? 404 : 200,
          body: { deleted }
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
        return {
          headers,
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }