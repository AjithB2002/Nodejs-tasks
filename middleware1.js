var express = require('express');
var middleware1 = express();

var alert =require('alert');

middleware1.use(function(req,res,next){
 alert("Welcome");
 console.log('Request method is',req.method,'and',req.url,'url address page is running');
 next();
});
middleware1.get('/',function(req,res,next){
    console.log('First Page');
    res.send('welcome to my website');
    next();
});
middleware1.get('/home',function (req,res,next) {
    console.log('second page');
    res.send('welcome to Home');
    next();
});
middleware1.listen(8080);