const mongoose = require('mongoose');

const uri = 'mongodb+srv://samerkinaan:AJvR5_!ZkjD3suX@cluster0.7skd5mv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  serverSelectionTimeoutMS: 5000, // Set the timeout for selecting a server
  socketTimeoutMS: 45000, 
  autoIndex: true,
};

async function connect() {
    try {
        await mongoose.connect(uri, options);
        console.log('Connected to MongoDB');
    } catch(err) {
        console.error(err);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log('Disconnecteds from MongoDB');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {connect, disconnect};