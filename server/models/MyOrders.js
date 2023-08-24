const mongoose = require('mongoose')
const myOrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
 
})

const MyOrders = mongoose.model('MyOrders',myOrderSchema);
module.exports = MyOrders;