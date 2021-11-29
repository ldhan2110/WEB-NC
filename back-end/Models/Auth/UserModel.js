import mongoose from 'mongoose';
import userSchema from "../../Schemas/user_schema.js";

const userModel = mongoose.model('Users', userSchema, "Users");

export default {
    findAll: async () => {
        return await userModel.find({});
    },

    findById: async(usrId) => {
        return await userModel.findById(usrId).exec();  
    },

    addNewUsr: async (usrInfo) =>{
        try {
            return await userModel.create(usrInfo);
        } catch(err) {
            throw err;
        }
    }
}