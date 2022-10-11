const customerService = require('../../services/customer-service')
const userAuth = require('../middlewares/userAuth')

module.exports  = {
    

    signUp: async (req,res,next) => {
        try {
            const { email, password, phone } = req.body;
            const   {data}  = await customerService.signUp({ email, password, phone}); 
           return res.json(data);
            
        } catch (err) {
            next(err)
        }

    },

    login : async (req,res,next) => {
        try {
            const { email, password } = req.body

            const   { data } = await customerService.loginIn({email,password})

            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
 

}