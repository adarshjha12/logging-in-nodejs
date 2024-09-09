const mongoose = require('mongoose')
const cloudUri = 'mongodb+srv://jhaa50872:adarshjha@cluster0.radur.mongodb.net/firstDB?retryWrites=true&w=majority&appName=cluster0'

const localUri = 'mongodb://localhost:27017/newtesting'

mongoose.connect(cloudUri)
.then( () => console.log('connection successfull to db')
).catch( (err) =>{
    console.log(err);
    
})