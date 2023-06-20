const express=require('express');
const route=express.Router();
const controller=require('../controller/controller');
 
 
 //API
 route.post('/api/users',controller.create); //it means when a post request is given to /apii/users route create function will work
  route.get('/api/users',controller.find);
  route.put('/api/users/:id',controller.update);
  route.delete('/api/users/:id',controller.delete);



  route.post('/api/ngos',controller.create);
  module.exports=route;
  