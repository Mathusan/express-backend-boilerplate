const  CustomerModel = require('../models/Customer');

const  AddressModel = require('../models/Address');
const { APIError, BadRequestError, STATUS_CODES } = require('../../src/utils')


const  customerRepository  = {
    createCustomer : async ({ email, password, phone, salt }) => {
        try{
            
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone,
                address: []
            })
            const customerResult = await customer.save();
            //console.log(customerResult)
            return customerResult;
        }catch(err){
            //return res.status(500).json({msg : err.message})
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    },
    createAddress : async ({ _id, street, postalCode, city, country}) => {
        try{
            const profile = await CustomerModel.findById(_id);
            
            if(profile){
                
                const newAddress = new AddressModel({
                    street,
                    postalCode,
                    city,
                    country
                })
    
                await newAddress.save();
    
                profile.address.push(newAddress);
            }
    
            return await profile.save();

        }catch(err){
            // throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Create Address')
        }

    },
    findCustomer : async ({email}) => {
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            //throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    },
    findCustomerById : async ({id}) => {
        try {
            const existingCustomer = await CustomerModel.findById(id)
            .populate('address')
            .populate('wishlist')
            .populate('orders')
            .populate('cart.product');
            return existingCustomer;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    },
    addCartItem : async (customerId, product, qty, isRemove) => {
        try{

            const profile = await CustomerModel.findById(customerId).populate('cart.product');
    
            if(profile){ 
     
                const cartItem = {
                    product,
                    unit: qty,
                };
              
                let cartItems = profile.cart;
                
                if(cartItems.length > 0){
                    let isExist = false;
                     cartItems.map(item => {
                        if(item.product._id.toString() === product._id.toString()){
                            if(isRemove){
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }else{
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
    
                    if(!isExist){
                        cartItems.push(cartItem);
                    } 
                }else{
                    cartItems.push(cartItem);
                }
    
                profile.cart = cartItems;
    
                const cartSaveResult = await profile.save();

                return cartSaveResult.cart;
            }
            
            throw new Error('Unable to add to cart!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    },
    addOrderToProfile  : async (customerId, order) => {
        try{

            const profile = await CustomerModel.findById(customerId);

            if(profile){ 
                
                if(profile.orders == undefined){
                    profile.orders = []
                }
                profile.orders.push(order);

                profile.cart = [];

                const profileResult = await profile.save();

                return profileResult;
            }
            
            throw new Error('Unable to add to order!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    },

}


module.exports  = customerRepository

