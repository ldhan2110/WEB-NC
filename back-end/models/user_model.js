import mongoose from "mongoose";
import userSchema from "../schemas/user_schema.js";

const userModel=mongoose.model("Users",userSchema,"Users");

export default {    
    findAll: async function(){
        return await userModel.find({});
    },

    findById: async function(id){
        return await userModel.findById(id);
    },
    
    findByEmail: async function (usr_email){
        return await userModel.findOne({usr_email:usr_email});
    },

    findByUsr_nm: async function (usr_nm){
        return await userModel.findOne({usr_nm:usr_nm});
    },

    findAllByRole: async function (role){
        return await userModel.find({usr_role:role});
    },

    addNewUser: async function (usr_info){
        try{
            return await userModel.create(usr_info);
        } catch (err){
            console.log(err);
        }
    },

    updateInfo: async function (usr_nm,usr_newinfo){
        return await userModel.findOneAndUpdate(
            usr_nm,
            usr_newinfo
        );
    },

    /*
    updateActive: async function (usr_email,new_active){
        const filter={usr_email: usr_email};
        const update={active:new_active};
        return await userModel.findOneAndUpdate(filter,update);
    }, */
    updateRole: async function (usr_nm,newRole){
        return await userModel.findOneAndUpdate(
            {usr_nm:usr_nm},{usr_role:newRole}
        );
    },


    updatePass: async function (usr_nm,newpass) {
        const filter={usr_nm:usr_nm};
        const update={
            $set:{
                usr_pw: newpass,
                otp:null,
                created_time_otp:null
            }
        };
        
        return await userModel.updateOne(filter,update,{
            upsert:true
        });
    },
    updateOTP: async function (usrEmail,otp){
        const filter={usr_email: usrEmail};
        //console.log(filter);
        let update;
        if (otp==null)
            update={
                $set: {
                    otp: null,
                    created_time_otp: null    
                }                
            };
        else
            update={
                $set: {
                    otp: otp,
                    created_time_otp: Date.now()    
                }                
            };
        return await userModel.updateOne(filter,update,{
            upsert: true
        });
    },

    deleteUser: async function (id){
        try {
            userModel.findByIdAndRemove();
            userModel.findByIdAndDelete();
        } catch (error) {
            console.log(error);
        }
    }



};