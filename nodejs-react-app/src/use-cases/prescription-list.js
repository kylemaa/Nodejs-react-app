// Factory function that returns a frozen object that defines a prescription-list.
// The returned object array should be separated into use cases so that we can inject 
// a moderate method into the factory function below.
    export default function makePrescriptionList({database}){
    return Object.freeze({
        add,
        findByEmail,
        findById,
        getItems,
        remove,
        replace,
        update
    })
    
    async function getItems({max = 100, before, after} = {}){
        const db = await database
        const query = {}
        //returns its first or second operand depending on whether the first is truthy.
        // A "truthy" value means anything other than 0.
        if (before || after){
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
        const {result, ops} = await db.collection('prescription').insertOne(prescription)
        .catch(e =>{
            const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new UniqueConstraintError(
            mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
          )
        }
        throw e
        })
        return {
            success:result.ok ===1,
            created:documentToPrescription(ops[0])
        }
    }
}