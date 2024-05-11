import { model, Schema, Document } from 'mongoose';
import { IResetToken } from '../../types/userTypes';

const resetTokenSchema = new Schema<IResetToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

const ResetToken = model<IResetToken>('ResetToken', resetTokenSchema);

export default ResetToken;
