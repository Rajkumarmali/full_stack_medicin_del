const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://medicine:medicine@cluster0.hnyngga.mongodb.net/medicine?retryWrites=true&w=majority"

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
       
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            
            .toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
        }
    })
};