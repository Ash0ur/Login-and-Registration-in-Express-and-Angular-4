var express          = require('express'),
    path             = require('path'),
    bodyParser       = require('body-parser'),
    ExpressValidator = require('express-validator'),
    mongoose         = require('mongoose'),
    exphandlebars    = require('express-handlebars');

var app  = express();

app.set('views',path.resolve(__dirname,'../client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(ExpressValidator({
    errorFormatter: function(param,msg,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param:formParam,
            msg:msg,
            value:value
        };
    }
}))


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('port',process.env.PORT || 3000);

mongoose.connect('Your Mongodb database url',(err)=>{
    if(err)
        console.log('mongoose.connect() failed');
    connection = mongoose.connection;
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error',(err)=>{
        console.log('error connecting to MongoDB: '+err);
    });
    mongoose.connection.once('open',()=>{
        console.log('connected to mongodb');
    })

})



var login       = require('./routes/login');
var register    = require('./routes/register');

app.use('/login',login);
app.use('/register',register);

app.get('/*',(req,res)=>{
    console.log('render home');
    res.sendFile(path.resolve(__dirname,'../client/dist/index.html'));
});

   
app.listen(app.get('port'),function(){
    console.log('Server started on port: '+app.get('port'));
});