import mongoose from 'mongoose';

mongoose.connect(process.env.DSN!)
    .then(() => console.log('Connected to database')) 
    .catch((err) => console.log(err));