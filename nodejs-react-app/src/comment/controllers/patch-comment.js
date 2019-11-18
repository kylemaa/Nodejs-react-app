/** This controller uses the injected use case 'edit-comment',
 * [PROMISE] then await for that use case to be done before return
 * the necessary properties of an object with the injected http req*/
export default function makePatchComment ({ editComment }) {
    return async function patchComment (httpRequest) {
      try {
        const { source = {}, ...commentInfo } = httpRequest.body
        source.ip = httpRequest.ip
        source.browser = httpRequest.headers['User-Agent']
        if (httpRequest.headers['Referer']) {
          source.referrer = httpRequest.headers['Referer']
        }
        const toEdit = {
          ...commentInfo,
          source,
          id: httpRequest.params.id
        }
        const patched = await editComment(toEdit)
        return {
            headers: {
              'Content-Type': 'application/json',
              'Last-Modified': new Date(patched.modifiedOn).toUTCString()
            },
            statusCode: 200,
            body: { patched }
          }
        } catch (e) {
          // TODO: Error logging
          console.log(e)
        //   if (e.name === 'RangeError') {
        //     return {
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       statusCode: 404,
        //       body: {
        //         error: e.message
        //       }
        //     }
        //   }
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: {
              error: e.message
            }
          }
        }
      }
    }