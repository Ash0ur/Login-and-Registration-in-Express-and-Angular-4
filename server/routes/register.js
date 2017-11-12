var express     = require('express');
var router      = express.Router();
var path        = require('path');
var sanitizer   = require('sanitizer');

var User        = require('./../models/User');


router.post('/',(req,res)=>{
    var fullname        = req.body.fullname;
    var email           = req.body.email;
    var username        = req.body.username;
    var password        = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    //validation 
    req.checkBody('fullname','Name is required').notEmpty();
    req.checkBody('username','username is required').notEmpty();
    req.checkBody('email','email is required').notEmpty();
    req.checkBody('email','email is not valid').isEmail();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('password','password must be atleast 5 chars length').isLength({min:5});
    req.checkBody('confirmPassword','confirmPassword doesn`t match').equals(req.body.password);


    var errors = req.validationErrors();
    if(errors){
        res.json({"result":"error","errors":errors});
    }else{
        var newUser  = new User();
            newUser.fullname=sanitizer.escape(fullname);
            newUser.username=sanitizer.escape(username);
            newUser.email=email;
            newUser.password=password;

            User.findOne({$or:[{username:newUser.username},{email:newUser.email}]},function(err,user){
            if(err)
                return res.send(err);
            if(user != null){
                console.log(user);
                if(user.username == newUser.username)
                    res.json({'result':'error','message':'username already exists'});
                else if(user.email == newUser.email)
                    res.json({'result':'error','message':'email already exists'});                   
            }else{

                newUser.save(newUser,function(err,user){
                    if(err)
                        return res.send(err);
                    res.json({"result":"success","message":"Registration Successfull"});
                });
            }
        });
                        /********************************** */



    }
});

module.exports = router;