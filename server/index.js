const express = require('express');
const mongoose =require('mongoose')
const app = express();
const cors = require('cors');
const PORT = 4000;


app.use(cors());
app.use(express.json());


const formsRouter = require('./routes/forms');
app.use('/api/forms', formsRouter);

mongoose.connect('mongodb+srv://peppercloud:Sravan376@sravan.yepciqh.mongodb.net/peppercloud?retryWrites=true&w=majority')

    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
