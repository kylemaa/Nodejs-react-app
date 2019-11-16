/** index.js file should simply provide an index of public methods
 * and modules. This is a good way to signal to consumers of this feature code
 * which elements are meant to be referenced and used and which ones are for
 * internal use only.Those imports will stand out because they have to be more
 * explicit and we can easily find and fix them later.*/
import makeDb from '../database/index'
import makePrescriptionList from './use-cases/prescription-list'
import makePrescriptionsEndpointHandler from './controllers/prescription-endpoint'

//set up database, inject db to the prescription-list, the gateways of that list
const database = makeDb()
const prescriptionList = makePrescriptionList({ database })
const prescriptionsEndpointHandler = makePrescriptionsEndpointHandler({ prescriptionList })

//exporting the endpoint handler aka text that we want to display to client/frontend.
export default prescriptionsEndpointHandler