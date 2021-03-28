var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config');
var user        = require('./routes/userRoutes');
var port        = process.env.PORT || config.serverport;
var cors        = require('cors');
var fileUpload  = require('express-fileupload');
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Authorization, Content-Type, Accept');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

    //connection established
        mongoose.connect(config.database, { useMongoClient: true }, function(err){
            if(err){
                console.log('Error connecting database, please check if MongoDB is running.');
            }else{
                console.log('Connected to database ang-test...');
            }
        });

    // use body parser so we can get info from POST and/or URL parameters
        app.use(express.json());
        app.use(bodyParser.json({limit: "50mb"}));
        app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        app.use(fileUpload());

    // use morgan to log requests to the console
        app.use(morgan('dev'));
        app.use(express.static(__dirname+"/dist"));
        app.use(express.static('dist'));
        app.use(express.static('assets/uploads'));
        app.use('/assets/uploads', express.static('assets/uploads'));

// basic routes
        app.get('/', function(req, res) {
            res.sendFile("index.html");
        });
    // express router
        var apiRoutes = express.Router();
        app.use('/api', apiRoutes);

        apiRoutes.post('/addUser', user.addUser);

        apiRoutes.get('/listUsers', user.userList);

        apiRoutes.get('/getUser/:id', user.getUser);

        apiRoutes.put('/updateUser/:id', user.updateUser);

        apiRoutes.delete('/deleteUser/:id', user.delUser);

// kick off the server
app.listen(port);
console.log('Backend is running on port:' + port);
