import makeDb from '../db'
import makePrescriptionList from './prescription-list'
import makePrescriptionsEndpointHandler from './prescriptions-endpoint'

const database = makeDb()
const prescriptionList = makePrescriptionList({ database })
const prescriptionsEndpointHandler = makePrescriptionsEndpointHandler({ prescriptionList })

//exporting the endpoint handler aka result.
export default prescriptionsEndpointHandler