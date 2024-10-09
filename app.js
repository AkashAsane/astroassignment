const dotenv=require('dotenv')
const express=require('express')
const helmet=require('helmet')
const bodyParser = require('body-parser'); 
const passport=require('./config/passportconfig')
const promClient = require('prom-client');


const app=express()
dotenv.config()

const db=require('./config/db')
const PORT=process.env.PORT
const userRoutes=require('./routes/userroutes')
const queueRoutes=require('./routes/requestroutes')



app.use(bodyParser.json());
app.use(express.json());
app.use(helmet())


app.use(passport.initialize())
const local=passport.authenticate('local',{session:false})


const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.use("/auth",userRoutes)
app.use('/queue',queueRoutes)



app.listen(PORT,()=>{
    console.log(`app started on port:${PORT}`)
})

