const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema({
  productId: {
    type: Number,
    
  },

});

const Verify = mongoose.model("verify", verifySchema);

module.exports = Verify;