var mongoose = require('mongoose'),
bcrypt       = require('bcryptjs');


var UserSchema = mongoose.Schema({
fullname        :{type:String,  required:true,  trim:true},
username        :{type:String,  required:true,  trim:true},
email           :{type:String,  unique:true,    lowercase:true, trim:true},
password        :{type:String,  trim:true},
confirmPassword :{type:String,  trim:true}

})

UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    });

})

UserSchema.methods.comparePassword = function(pass,callback){
    bcrypt.compare(pass,this.password,function(err,isMatch){
        if(err){return callback(err);}
        callback(null,isMatch);
    })
}


module.exports = mongoose.model('User',UserSchema,'users');