var express         = require('express');
var router          = express.Router();
var path            = require('path');

var User            = require('../models/User');


router.post('/', function(req, res){

        console.log('*** Login Route  ***')
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('email','Email is not valid').isEmail();
        req.checkBody('password','password is required').notEmpty();


        var errors = req.validationErrors();
        if(errors){
            console.log(errors);
            return res.json({'result':'error','message':errors[0].msg});
        }else{

                                //MongoDB
            User.findOne({email:email},function(err,user){
                if(err)
                    res.send(err);
                if(user == null){
                    res.json({"result":"error","message":"Invalid email address"});
                    
                }else{
                    user.comparePassword(password,(err,isMatch)=>{
                        if(!isMatch)
                           return res.json({"result":"error","message":"Invalid Password"});
                        else{
                            console.log(user);
                            res.json({'username':user.username,'result':'success','message':'Login Successfull'});   
                        }
                    });
                         
                }
                            
            });
        }
});

module.exports = router;