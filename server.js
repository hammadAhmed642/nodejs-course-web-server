var express = require('express');
var hbs = require('hbs');
var app = express();
var fs = require('fs');



hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentData',()=>{
    return new Date().getFullYear();
});

app.set('view engine','hbs');

//app.use((req,res,next)=>{

  //  res.render('maintenance.hbs');    
//});
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`
    console.log(log);

    fs.appendFileSync('sever.log',log + '\n',(err)=>{
        if(err){
            console.log(err);
        }

    });
    next();
});

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        name:'Hammad',
        value :[
            'cars',
            'bikes',
            'rakhsaw'    
        ],
        pageTitle:'home',
        
    });
});
app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle:'About page',
       
   });
});

app.get('/bad',(res,req)=>{
    req.send(
       {errorMessage: 'unable to handle this request'
    });
});

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});
