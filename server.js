require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const connectDB = require('./config/db.js');

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'))
app.use(errorHandler);

app.get('/', (req,res) => {
    res.status(200).json({ message:"Server is up and running" });
})

app.listen(port, () => {
    console.log(`Server is running in the port ${port}`);
})