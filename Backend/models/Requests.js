// const mongoose = require('mongoose');

// const requestSchema = new mongoose.Schema({
//   homeownerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   fullName: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   pickupDate: {
//     type: String,
//     required: true
//   },
//   pickupTime: {
//     type: String,
//     required: true
//   },
//   scrapType: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String
//   },
//   weight: {
//     type: Number,
//     required: true
//   },
//   collectionCenter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Center',
//     required: true
//   },
//   imageUrl: {
//     type: String
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'approved', 'rejected', 'collected'],
//     default: 'pending'
//   },
//   collectorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Collector',
//     default: null
//   },
//   requestDate: {
//     type: Date,
//     default: Date.now
//   },
//   approvedAt: {
//     type: Date
//   },
//   completedAt: {
//     type: Date
//   }
// });

// module.exports = mongoose.model('Request', requestSchema);

//test
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  homeownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to your User model (homeowner)
    required: true
  },
  fullName: { // Auto-filled from user details
    type: String,
    required: true
  },
  phoneNumber: { // Auto-filled from user details
    type: String,
    required: true
  },
  location: { // The location homeowner inputs
    type: String,
    required: true
  },
  pickupDate: {
    type: String, // Storing as string "YYYY-MM-DD"
    required: true
  },
  pickupTime: {
    type: String, // Storing as string "HH:MM AM/PM"
    required: true
  },
  scrapType: {
    type: String,
    required: true
  },
  description: { // Renamed from 'details' to 'description' for consistency with backend
    type: String
  },
  weight: {
    type: Number,
    required: true
  },
  collectionCenter: {
    type: mongoose.Schema.Types.ObjectId,
    // FIX: Changed reference back to 'Center' model
    ref: 'Center',
    required: true
  },
  imageUrl: { // URL of the uploaded image
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'collected'],
    default: 'pending'
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    default: null
  },
  requestDate: { // When the request was made
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Request', requestSchema);
