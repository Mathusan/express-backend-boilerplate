if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express  = require('express')
const cors = require('cors')



//const { PORT } = require('./config');

const { databaseConnection} = require('./database')
const customerRouter = require('./src/api/routes/customers')



const app = express();

databaseConnection(); 

app.use(express.json({ limit: '1mb'}));
app.use(express.urlencoded({ extended: true, limit: '1mb'}));
app.use(cors());
app.use(express.static(__dirname + '/public'))

app.use('/customer',customerRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
})
.on('error', (err) => {
    console.log(err);
    process.exit();
})