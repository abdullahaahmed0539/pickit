const mongoose = require('mongoose');
const app = require("./app");
const {MongoClient} = require('mongodb');

const DB = 'mongodb://shahmir:pickit@cluster0-shard-00-00.zbkg4.mongodb.net:27017,cluster0-shard-00-01.zbkg4.mongodb.net:27017,cluster0-shard-00-02.zbkg4.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-p63ni9-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => {
        console.log('\x1b[32m','Database connection successful.')
        console.log('\x1b[0m','')
    })
    .catch(err => {
        console.log('\x1b[31m',`Database connection unsuccessful.\n log: ${err}`)
        console.log('\x1b[0m','')
    });

//Starting up server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
  console.log('Connecting to database...');
});
