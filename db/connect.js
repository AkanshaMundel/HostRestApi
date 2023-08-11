const mongoose = require('mongoose');


const { options } = require('../routers/products');
// uri="mongodb+srv://mundel30003:lxHa9uSSZklZ4YOZ@restapicluster.2mk6vf1.mongodb.net/RestApiCluster?retryWrites=true&w=majority";

const connectDB = (uri)=>{
    console.log('connectdb')
    return mongoose.connect(uri, {
        useNewUrlparser :true,
        useUnifiedTopology :true
    })
};

module.exports = connectDB;