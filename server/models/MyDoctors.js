const mongoose = require('mongoose');
const myDoctorSchema = new mongoose.Schema({
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
const MyDoctor = mongoose.model('Mydoctors',myDoctorSchema);
module.exports = MyDoctor;