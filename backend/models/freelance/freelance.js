import mongoose from 'mongoose';

const freelanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: String,
    bio: String,
    country: { type: String, required: true },
    city: String,
    languages: [String],
    phone: String
  },
  professionalInfo: {
    skills: [{
      name: String,
      category: {
        type: String,
        enum: ['design', 'development', 'writing', 'marketing', 'audio-video', 'virtual-assistant']
      },
      experience: Number // années d'expérience
    }],
    hourlyRate: Number,
    portfolio: [{
      title: String,
      description: String,
      images: [String],
      url: String
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: Date
    }]
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    documentType: { type: String, enum: ['CNI', 'passport', 'driver-license'] },
    documentFront: String,
    documentBack: String,
    verifiedAt: Date
  },
  stats: {
    completedMissions: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    responseRate: { type: Number, default: 0 }
  },
  availability: {
    isAvailable: { type: Boolean, default: true },
    availableFrom: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Freelance', freelanceSchema);