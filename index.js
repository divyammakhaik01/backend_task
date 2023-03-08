require('dotenv').config()
const express = require('express')
const db = require('./config/db')

const app = express()
const PORT = process.env.PORT || 4000


app.use(express.json())


app.use('/api/v1/auth' , require('./routes/auth.route') )
app.use('/api/v1/user' , require('./routes/user.route') )


app.listen(PORT , (req,res)=>{
    db();
    console.log(`server running at PORT ${PORT}`);
})