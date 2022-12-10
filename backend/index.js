const express = require('express');

require('dotenv').config();

const app = express();

require('./config/db.config')

app.use(express.json());

let cors = require('cors');
app.use(cors())

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes)

app.listen(process.env.PORT, (err) => {
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
})