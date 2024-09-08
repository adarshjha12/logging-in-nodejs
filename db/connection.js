const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jhaa50872:adarshjha@cluster0.radur.mongodb.net/firstDB?retryWrites=true&w=majority&appName=cluster0')
.then( () => console.log('connection successfull to db')
).catch( (err) =>{
    console.log(err);
    
})