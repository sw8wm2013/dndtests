const express = require('express');
const app = express();
const cardRoute = express.Router();

// List model
let Card = require('../models/card');

// Add Card
cardRoute.route('/createNewCard').post((req, res, next) =>{
  console.log('CREATE REQ BODY', req.body);
  Card.create(req.body, (error, data)=>{
    if (error){
      return next(error)
    } else {
      console.log('Successfully created the Card', res);
      res.json(data)
    }
  })
})

// get all Cards
cardRoute.route('/retrieveAllCards').get((req, res) =>{
  console.log('********INSIDE THE ROUTE', req.body);
  Card.find((error, data)=>{
    if(error){
      return next(error)
    } else {
      console.log('Returning the data', data);
      res.json(data)
    }
  })
})

// get Cards for specific board
cardRoute.route('/reteriveCardsByList/:listId').get((req, res) =>{
  Card.find({"currentList": req.params.listId}, (error, data)=>{
    if(error){
      return next(error)
    } else {
      console.log('Returning the data', data);
      res.json(data)
    }
  })
})


// get single Card
cardRoute.route('/read/:id').get((req, res)=>{
  Card.findById(req.params.id, (error, data)=>{
    if(error){
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// updated Card
cardRoute.route('/update/:id').put((req, res)=> {
  Card.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data)=>{
    if(error){
      console.log('Cannot update Card:', error);
      return next(error);
    } else {
      console.log('List successfully updated', data);
      res.json(data)
    }
  })
})

// delete Card
cardRoute.route('/delete/:id').delete((req, res, next)=>{
  Card.findByIdAndRemove(req.params.id, (error, data)=>{
    if(error){
      console.log('Error deleting the list', error);
      return next(error)
    } else {
      console.log('Successfully deleted the list');
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = cardRoute;
