const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Card = new Schema ({
  listId: Number,
  id: Number,
  description: String,
  date_created: Number,
  position: Number,
}, {
    collection: 'cards'
  }
)


module.exports = mongoose.model('Card', card)
