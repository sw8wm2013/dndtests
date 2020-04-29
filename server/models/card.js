const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Card = new Schema ({
  currentList: Number,
  title: String,
  description: String,
  position_on_board: Number,
}, {
    collection: 'cards'
  }
)


module.exports = mongoose.model('Card', Card)
