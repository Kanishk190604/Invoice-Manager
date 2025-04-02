import mongoose, { Collection } from "mongoose";

const userSchema = new mongoose.Schema(
  { UserId:{
    type:String,
    required:true
  }, 
    Sr: {
    type: Number,
    required: true,
    trim: true,
  },
    Billingname: {
      type: String,
      required: true,
      trim: true,
    },
    Billingemail: {
      type: String,
      required: true,
      
      lowercase: true,
      trim: true,
    },
    Value: {type:Number,
        required: true,
        
        lowercase: true,
        trim: true,
      },
    Date: {
      type: Date,
      
      default:Date.now()
    },
  status:{type:String,
  enum: ['open', 'pending','sucessful','denied'],
  default:'open'},
  Description: {
    type: String,
    default:Date.now()
  },  
  
})
    const Users=mongoose.models.Users || mongoose.model('Users',userSchema,"invoices");
    export default Users;