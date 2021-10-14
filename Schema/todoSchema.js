const mongoose = require("mongoose");

//creating schema object
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance method 
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  // findActiveCallback: function (cb) {
  //   return mongoose.model("Todo").find({ status: "active" }, cb);
  // },
};
//Statics Method
todoSchema.statics = {
  findByJs:function () {
    return this.find({ title: /js/i });//:/js/i used regular expansion
  },
};
//Query Helpers method
todoSchema.query = {
  byLanguage:function (language) {
    return this.find({ title: new RegExp(language,'i')});
  },
};

module.exports = todoSchema;
