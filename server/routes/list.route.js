const express = require('express');
const app = express();
const listRoute = express.Router();

// List model
let List = require('../models/list');

// Add List
listRoute.route('/create').post((req, res, next) =>{
  console.log('CREATE REQ BODY', req.body);
  List.create(req.body, (error, data)=>{
    if (error){
      return next(error)
    } else {
      console.log('Successfully created the list', res);
      res.json(data)
    }
  })
})

// get all Lists
listRoute.route('/getlists').get((req, res) =>{
  console.log('********INSIDE THE ROUTE', req);
  List.find((error, data)=>{
    if(error){
      return next(error)
    } else {
      console.log('Returning the data', data);
      res.json(data)
    }
  })
})

// get single List
listRoute.route('/read/:id').get((req, res)=>{
  List.findById(req.params.id, (error, data)=>{
    if(error){
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// updated List
listRoute.route('/update/:id').put((req, res)=> {
  List.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data)=>{
    if(error){
      console.log('Cannot update list:', error);
      return next(error);
    } else {
      console.log('List successfully updated', data);
      res.json(data)
    }
  })
})

// delete List
listRoute.route('/delete/:id').delete((req, res, next)=>{
  List.findByIdAndRemove(req.params.id, (error, data)=>{
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


module.exports = listRoute;
