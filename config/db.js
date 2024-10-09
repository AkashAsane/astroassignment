const mongoose=require('mongoose')

const MONGOURL=process.env.MONGODB_URL;

const DB=mongoose.connect(MONGOURL)
.then(()=>{
    console.log('Db conneted successfully')
})
.catch((err)=>{
    console.log('cannot connect to db',err)
})

module.exports=DB