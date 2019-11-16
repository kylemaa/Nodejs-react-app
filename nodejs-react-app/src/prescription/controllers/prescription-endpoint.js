//Handle http methods for the prescription entity: by injecting the object prescriptionList into factory function
//The factory function returns handle method based on the http request type.
export default function makePrescriptionsEndpointHandler ({ prescriptionList }) {
    return async function handle(httpRequest){
        switch(httpRequest.method){
            case 'POST':
                return postPrescription(httpRequest)
            case 'GET':
                return getPrescriptions(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    } 
}
    // post prescription by assigning body 
    async function postPrescription(httpRequest){
        let prescriptionInfo = httpRequest.body
        if (!prescriptionInfo){
            returnmakeHttpError({
                statusCode: 400,
                errorMessage:`${httpRequest.method} method has no POST body.`
              })
        }
    }
    // get prescriptions by looking up the prescriptionId. TODO: get multiple prescriptions
    async function getPrescriptions(httpRequest){
        const result = id
        await prescriptionList.findbyId({prescriptionId: id})
        return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
          }
    }
}