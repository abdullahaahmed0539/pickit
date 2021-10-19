const mongoose = require('mongoose');
const app = require("./app");

const DB = 'mongodb+srv://shahmir:pickit@cluster0.zbkg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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