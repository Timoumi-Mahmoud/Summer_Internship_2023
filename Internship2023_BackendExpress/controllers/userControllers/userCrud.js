const userService= require('../../services/userService')
const cloudinary=require('../../utils/cloudinaryConfig')
const userSchema= require('../../modeles/user')
const CustomAPIError= require('../../errors/custom-error')

const userList = async (req,res)=>{
  try {
    const user = await userService.getAllUsers();
    res.json({ users: user,nbHits: user.length , status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser=async(req,res)=>{
  try {
    const user = await userSchema.findById(req.params.id);
    if(user.cloudinary_id !== ''){
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    await user.remove();
    res.status(202).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
}

 const getUser = async (req, res) => {
  const userId=req.params.id
  try {
    const user = await userService.getUserById(userId);
    if(!user) res.status(404).send( {msg: `No user found with id :${userId} `})
    res.status(200).json(  user );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body)
    const user = await userService.updateUser(req.params.id, req.body);
    if(!user) res.status(404).send( {msg: `No user found  `})
    res.json({ data: req.body, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const blockUser=async(req,res)=>{
  const userId=req.params.id
  try {
    const user =await userService.BlockUser(userId)
    res.status(200).json({msg: 'user  has been blocked '})

  } catch (error) {
    throw new CustomAPIError('Something went worng ', 500)
  }
}



const searchUser= async(req,res)=>{
  const serachInput= req.query.search  
  try {
    const user =await userService.SearchBasedOnEmail(serachInput)
    res.status(200).json(user)
  } catch (error) {
    throw new CustomAPIError('Something went worng ', 500)

  }
}

const filterUserBasedOnDepartment=async(req,res)=>{
  const search =req.query.department 
  try {
    const user= await userService.filterUserBasedOnDepartment(search)
    res.status(200).json(user)
  } catch (error) {
    throw new CustomAPIError('Something went worng ', 500)
  }
}

module.exports={userList,deleteUser , updateUser,getUser, blockUser, searchUser, filterUserBasedOnDepartment}
