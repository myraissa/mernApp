const mongoose = require ("mongoose");

const SubCategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          },
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
          }
    },
    {
        collection: "Sub-Categories" ,
    }
);


const SubCategorie = mongoose.model('Sub-Categories', SubCategoriesSchema);

module.exports = SubCategorie;
