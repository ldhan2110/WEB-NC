import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    usr_nm:  String, // String is shorthand for {type: String}
    usr_pwd: String,
    usr_fullname:   String,
    usr_dob: String,
    active: {type: Boolean, default: true},
    usr_role: String,
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  });

export default userSchema;