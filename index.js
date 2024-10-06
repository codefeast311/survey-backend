const mongoose =  require('mongoose');
const app = require('./app');
const { PORT, MONGO_URI } = require('./config');

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Database');

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

startServer();
