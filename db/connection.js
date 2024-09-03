const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/loggingData')
.then( () => console.log('connection successfull to db')
).catch( (err) =>{
    console.log(err);
    
})