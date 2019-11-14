/* makePrescription is a factory function that returns a frozen object that defines a prescription
by validating the fields required in a prescription using validate method.
In addition, the prescription infomation is injected into makePrescription function */

export default function makePrescription(prescriptionInfo)
{
    const validPrescription = validate(prescriptionInfo)
    return Object.freeze(validPrescription)
   
    //Validate function 
    function validate({
        firstName = prescriptionInfo.firstName,
        lastName = prescriptionInfo.lastName,
        emailAddress = prescriptionInfo.emailAddress,
        ...otherInfo} = {})
        {
            validateName(firstName)
            validateName(lastName)
            validateEmail(emailAddress)
            return{firstName,lastName,emailAddress, ...otherInfo}
        }

    function validateName (label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 2 characters long.`
      )
    }
  }

    function validateEmail (emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError('Invalid contact email address.')
    }
  }

}
