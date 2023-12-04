const userSchema = require("../modeles/user");
const CustomAPIError =require('../errors/custom-error')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
 
exports.getAllUsers = async () => {
  return await userSchema.find();
};

exports.getUserById = async (id) => {
    return await userSchema.findById(id);
  };

exports.updateUser = async (id, user) => {
     return await userSchema.findByIdAndUpdate(id, user);
   };
   
  exports.deleteUser = async (id) => {
    return await userSchema.findByIdAndDelete(id);
  };

  exports.findUserByEmail = async (email) => {
    const user= await userSchema.findOne({email});
    return user;
  };

  exports.resetPassword = async (userId, password) => {
   const tempUser= await userSchema.findOneAndUpdate({_id:userId},{password: password},{
    new: true,
    runValidators: true
    } );
        return tempUser;
      };
      
      exports.BlockUser= async(id)=>{
        return await userSchema.findOneAndUpdate({_id:id}, {isActive:0})
}

exports.SearchBasedOnEmail= async(searchInput)=>{
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  console.log(searchInput)
    const searchRgx = rgx(searchInput);

    const user = await userSchema.find({
      $or: [
        { name: { $regex: searchRgx, $options: "i" } },
        { email: { $regex: searchRgx, $options: "i" } },
      ],
    })
      .limit(5)
  console.log(user)
  return user


}

exports.filterUserBasedOnDepartment = async (filterDepartment) => {
  const user =  await userSchema.find({department: {$regex: filterDepartment, $options: 'i'}});
  return  user  

  };
