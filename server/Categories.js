const mongoose = require ("mongoose");

const CategoriesSchema = new mongoose.Schema(
    {
        name: String,  
    },
    {
        collection: "Categories" ,
    }
);


const Categorie = mongoose.model('Categories', CategoriesSchema);

module.exports = Categorie;
