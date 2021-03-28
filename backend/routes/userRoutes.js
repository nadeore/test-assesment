var user = require('../model/user');
var multer      = require('multer');
var path        = require('path');


// File Uploading with multer
const DIR = 'assets/uploads/';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

exports.addUser = function(req, res, next) {
    // console.log(req.files.profile);
    // console.log(req.body);
    // console.log(req.files);
    var file = req.files.profile;
    // console.log(file);
    let allData = JSON.parse(req.body.allData);
    // console.log(allData);
    const firstName = allData.firstName;
    const lastName = allData.lastName;
    const email = allData.email;
    const mobileNumber = allData.mobileNumber;
    const profile = file.name;
    const imgPath = 'http://localhost:8000/assets/uploads/';
    const created_at = new Date();
    let newUser = new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        profile: profile,
        imgPath: imgPath,
        created_at: created_at
    });
    newUser.save(file.mv( 'assets/uploads/' + profile , function(err) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
        res.status(201).json({
            status: true,
            message: 'User Added successfully.....',
        });
    }));
}

exports.userList = function(req, res, next) {
    user.find({}, function(err, result){
        // console.log(result);
        res.status(201).json({
            msg: result
        });
    });
}

exports.getUser = function(req, res, next) {
    user.find({_id:req.params.id}).exec(function(err, user){
        // console.log(req.params.id);
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
            success: true,
            msg: user
        });
    });
}

exports.updateUser = function(req, res, next) {
    // console.log(req.body);
    // console.log(req.params);
    let allData = JSON.parse(req.body.allData);
    const user_id = req.params.id;
    const firstName = allData.firstName;
    const lastName = allData.lastName;
    const email = allData.email;
    const mobileNumber = allData.mobileNumber;

    user.findById(user_id).exec(function (err, updateUser) {
        // res.json(user_id);
        if (err) {
            res.status(400).json({success: false, message: 'Error processing request ' + err});
        }
        if (updateUser) {
            updateUser.firstName = firstName;
            updateUser.lastName = lastName;
            updateUser.email = email;
            updateUser.mobileNumber = mobileNumber;
        }
        updateUser.save(function (err) {
            if (err) {
                res.status(400).json({success: false, message: 'Error processing request ' + err});
            }
            res.status(201).json({
                status: true,
                message: 'User updated successfully'
            });
        });
    });

}

exports.delUser = function(req, res, next) {
    console.log(req.params);
    user.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(201).json({
            status: true,
            message: 'User Deleted successfully'
        });
    });
}

