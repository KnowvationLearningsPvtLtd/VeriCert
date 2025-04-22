import mongoose, { Document, Schema } from 'mongoose';

export interface CertificateDocument extends Document {
  certificateId: string;
  adminId: string;
  data: any; // Adjust the type based on the actual data structure
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<CertificateDocument>(
  {
    certificateId: { type: String, required: true, unique: true },
    adminId: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Certificate = mongoose.model<CertificateDocument>('Certificate', CertificateSchema);
export default Certificate; 