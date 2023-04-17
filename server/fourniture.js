const mongoose=require('mongoose');

const fournitureSchema=mongoose.Schema({
  name: {
    type:String,
    required:true},

    image: {
      type: String,
      default: ''
    },
  availability:String,
  description:{type:String,required:true},
  isFeatured :{
    type:   Boolean,
    default: false,
  },
  category:{type: String ,required:true},
  user: {
    type: String,
  }
}, { timestamps: true });

fournitureSchema.index({location: '2dsphere'});

exports.Fourniture=mongoose.model('Fourniture',fournitureSchema);