const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
const Db = `mongodb+srv://developer:MReLJ4uZoiUBLXuI@cluster0.pugmd0m.mongodb.net/products?retryWrites=true&w=majority`;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
// // var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("products");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://developer:MReLJ4uZoiUBLXuI@cluster0.pugmd0m.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("products").collection("product_details");
//   // perform actions on the collection object
//   client.close();
// });