const customerRepository = require('../../database/repository/customerRepository')
 const { AppError,APIError,BadRequestError,ValidationError,STATUS_CODES } = require('../utils/app-errors')
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

const customerService = {
    loginIn : async (userInputs) =>{
        
        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await customerRepository.findCustomer({ email});

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                }else {
                    return FormateData({err : "Incorrect Password"})
                } 
                
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    } ,
    signUp : async (userInputs) =>{
                
        const { email, password, phone } = userInputs;
       
        try{
            
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const existingCustomer = await customerRepository.createCustomer({ email, password: userPassword, phone, salt});
            
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            //console.log(existingCustomer)

            return FormateData({id: existingCustomer._id, token }); 




        }catch(err){
            throw new APIError('Data Not found', err)
        }
    } ,

} 

module.exports = customerService
