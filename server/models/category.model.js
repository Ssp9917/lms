import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  categoryImage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to set the updatedAt field
categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = model('Category', categorySchema);
export default Category
