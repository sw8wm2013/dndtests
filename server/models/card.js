const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId


let Card = new Schema ({
  currentList: ObjectId,
  title: String,
  description: String,
  position_on_board: Number,
}, {
    collection: 'cards'
  }
)


module.exports = mongoose.model('Card', Card)
