import requiredParam from '../helpers/required-param'
/* makePrescription is a factory function that returns a frozen object that defines a prescription
by validating the fields required in a prescription using validate method.
In addition, the prescription infomation is injected into makePrescription function */

export default function makePrescription(
    prescriptionInfo = requiredParam ('prescriptionInfo')
){
    const validPrescription = validate(prescriptionInfo)
    return Object.freeze(validPrescription)
   
    //Validate function 
    function validate ({
        firstName = requiredParam('firstName'),
        lastName = requiredParam('lastName'),
        emailAddress = requiredParam('emailAddress'),
        ...otherInfo } = {})
        {
            validateName('first',firstName)
            validateName('last',lastName)
            validateEmail('emailAddress')
            return {firstName,lastName,emailAddress, ...otherInfo}
        }
    //Name validate helper function   
    function validateName (label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 2 characters long.`
      )
    }
  } 
    //Email validate helper function
    function validateEmail (emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError('Invalid contact email address.')
    }
  }

}
