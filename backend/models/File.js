import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
  name: { type: String, required: true },
  type: { type: String, enum: ['file', 'folder'], required: true },
  s3Key: String,
  content: String
}, { timestamps: true });

export default mongoose.model('File', fileSchema);
