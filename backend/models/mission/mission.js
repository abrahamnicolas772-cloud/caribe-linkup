import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['design', 'development', 'writing', 'marketing', 'audio-video', 'virtual-assistant'],
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  budgetType: {
    type: String,
    enum: ['hourly', 'fixed'],
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  deadline: {
    type: Date,
    required: true
  },
  skillsRequired: [String],
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  assignedFreelance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Freelance'
  },
  proposals: [{
    freelance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Freelance'
    },
    coverLetter: String,
    bidAmount: Number,
    estimatedTime: Number, // en jours
    submittedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  }],
  location: {
    type: String,
    enum: ['remote', 'onsite', 'hybrid'],
    default: 'remote'
  },
  clientReview: {
    rating: Number,
    comment: String,
    createdAt: Date
  },
  freelanceReview: {
    rating: Number,
    comment: String,
    createdAt: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Mission', missionSchema);