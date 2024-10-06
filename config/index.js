const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || '8080';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET
};

