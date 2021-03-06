var async = require('async');

// Model
var Product = require('../models/product');
var functions = require('./functions');

exports.displayProducts = (req, res) => {
   Product.find({})
      .then(products => {
         res.render('pages/product', {
            products: products,
            priceConverter: functions.numberWithCommas,
         });
      })
      .catch(err => {
         console.log('Error: ', err);
         throw err;
      });
}

exports.displayCategory = (req, res) => {
   res.render('pages/category');
}

exports.addProduct = async function (req, res, next) {

   const newName = req.body.name;
   const newCategory = req.body.category;
   const newProducer = req.body.producer;
   const newPrice = req.body.price;
   const newOldPrice = req.body.old_price;
   const newQuantity = req.body.quantity;

   const newDescription = req.body.info;
   //console.log(req.body);
   if (!req.file) {
      res.status(401).json({ error: 'Please provide an image' });
   }
   const uniqueFilename = new Date().toISOString();
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
      cloud_name: 'thanhbuivan',
      api_key: '722381551946261',
      api_secret: '3esDeIvohebBYDPehJ4c2caIesw'
   })
   cloudinary.uploader.upload(
      "data:image/png;base64," + (req.file.buffer).toString('base64'),
      { public_id: 'SmartShop/' + uniqueFilename, tags: 'product' }, // directory and tags are optional
      function (err, image) {
         if (err) {
            return res.send(err);
         }
         Product.create({
            name: newName,
            category: newCategory,
            producer: newProducer,
            price: newPrice,
            old_price: newOldPrice,
            quantity: newQuantity,
            imgSrc: image.url,
            description: newDescription,
         },
         function (err, small) {
            if (err) return next(err);
            else {
               res.redirect('/product');
            }
         });
         //console.log(image);
      }
   )
}

exports.editProduct = (req, res) => {
   console.log(req.body)
   const newName = req.body.name;
   const newCategory = req.body.category;
   const newProducer = req.body.producer;
   const newPrice = req.body.price;
   const newOldPrice = req.body.old_price;
   const newQuantity = req.body.quantity;
   const newDescription = req.body.info;

   if (!req.file) {
      res.status(401).json({ error: 'Please provide an image...!' });
   }
   const uniqueFilename = new Date().toISOString();
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
      cloud_name: 'thanhbuivan',
      api_key: '722381551946261',
      api_secret: '3esDeIvohebBYDPehJ4c2caIesw'
   })
   cloudinary.uploader.upload(
      "data:image/png;base64," + (req.file.buffer).toString('base64'),
      { public_id: 'SmartShop/' + uniqueFilename, tags: 'product' }, // directory and tags are optional
      function (err, image) {
         if (err) {
            return res.send(err);
         }
         Product.update({
            name: newName,
            category: newCategory,
            producer: newProducer,
            price: newPrice,
            old_price: newOldPrice,
            quantity: newQuantity,
            imgSrc: image.url,
            description: newDescription,
         },
         function (err, small) {
            if (err) return next(err);
            else {
               res.redirect('/product');
            }
         });
         //console.log(image);
      }
   )
}

exports.deleteProduct = function (req, res, next) {
   const id = req.params.id;
   console.log("id product deleted:", id)

   Product.deleteOne({ _id: id })
      .then(product => {
         res.redirect('/product');
      })
}