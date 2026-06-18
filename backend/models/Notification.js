import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'recipientModel',
      required: true
    },
    recipientModel: {
      type: String,
      enum: ['Trainee', 'Trainer', 'Admin'],
      required: true
    },
    type: {
      type: String,
      enum: ['job-recommendation', 'training-assigned', 'certification', 'rejection', 'message'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    relatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)
