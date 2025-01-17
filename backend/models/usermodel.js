const mongoose=require('mongoose')

const userschema=mongoose.Schema(
    {
        fullname:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,

        },
        date:{
            type:Date,
            default:Date.now,
        }
    }
)
module.exports=mongoose.model('User',userschema)