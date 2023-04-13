const mongoose = require ("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          },
          image: {
            data: Buffer,
            contentType: String,
          } ,
          description: {
            type: String,
            required: true
          },
          isTaken:{
            type:   Boolean,
            default: false,
          },
          Subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sub-Categories'
          }
    },
    {
        collection: "item" ,
    }
);


const Item = mongoose.model('item', ItemSchema);

module.exports = Item;
