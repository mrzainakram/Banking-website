const mongoose=require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    phoneNumber: { 
      type: String,
      required: true
    },
    address: { 
      type: String,
      required: true
    },
    accountNumber: { 
      type: String, 
      required: true,
      unique: true
    },
    balance: { 
      type: Number, 
      default: 0,
      min: 0
    },
  });

const UserModel = new mongoose.model("bankUsers", UserSchema);
module.exports = UserModel