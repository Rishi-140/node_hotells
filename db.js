const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://pawarrishikesh53:8lFuAOIpKx6eG7eT@cluster0.gfwudrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
})();

const db = mongoose.connection;

// Event listeners (optional but good for debugging)
db.on('disconnected', () => {
  console.log('🔌 Disconnected from MongoDB');
});

module.exports = db;
