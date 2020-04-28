const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let List = new Schema ({
  id: Number,
  name: String,
  date_created: Number,
  position: Number,
  cards: {
    type: Array,
  }
}, {
    collection: 'lists'
  }
)


module.exports = mongoose.model('List', List)
