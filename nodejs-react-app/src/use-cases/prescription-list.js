// Factory function that returns a frozen object that defines a prescription-list.
// The returned object array should be separated into use cases so that we can inject 
// a moderate method into the factory function below.
    export default function makePrescriptionList({database}){
    return Object.freeze({
        add, //to add a prescription with its id into the data base
        findByEmail,//find a particular prescription by the email associates with the prescription
        findById, //find a particular prescription by the id associates with the prescription
        getItems, //fetch a query of items ranging from before and after 
        remove, //remove a particular prescription by the id associates with the prescription
        replace, //replace particular prescription by the id associates with the prescription
        update //update particular prescription by the id associates with the prescription 
    })

    async function getItems({max = 100, before, after} = {}){
        const db = await database
        const query = {}
        // '||' returns its first or second operand depending on whether the first is truthy.
        // A "truthy" value means anything other than 0.
        if (before || after){
            //The _id field must have a unique value. The _id field as the document’s primary key
            query._id = {}
            query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
            query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }
        return (await db
            .collection('prescriptions')
            .find(query)
            .limit(Number(max))
            .toArray()).map(documentToPrescription)
    }

    async function add(prescriptionId, ...prescription){
        const db = await database
        if (prescriptionId){
            prescription._id = db.makeId(prescriptionId)
        }
        // If the collection does not exist, then the insertOne() method creates the collection.
        const {result, ops} = await db.collection('prescription').insertOne(prescription)
        .catch(e =>{
            const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new UniqueConstraintError(
            mongoIndex === 'PrescriptionEmailIndex' ? 'emailAddress' : 'prescriptionId'
          )
        }
        throw e
        })
        return {
            success:result.ok ===1,
            created:documentToPrescription(ops[0])
        }
    }
    // TODO:
    // async function findByEmail()
    // async function findById()
    // async function update()
    // async function remove()
    // async function replace()
    function documentToPrescription ({ _id: contactId, ...doc }) {
        return makeContact({ contactId, ...doc })
      }
}