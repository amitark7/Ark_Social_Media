const UserModel=require('../Models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')




const getAllUsers=async (req,res)=>{
    try {
        let users=await UserModel.find()

        users=users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Get A User
const getUser=async (req,res)=>{
    const id=req.params.id;

    try {
        const user =await UserModel.findById(id)

        if(user){
            const{password,...otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }else{
            res.status(404).json("No such User Exists ")
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


//Update  User

const updateUser=async (req,res)=>{
    const id=req.params.id;

    const{_id,currentUserAdminStatus ,password}=req.body;

    if(id===_id){
        try {
            if(password){
                const salt =await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(password,salt);
            }
            
            const user =await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            const token=jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"}
            )
            res.status(200).json({user,token})
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access Denied! You can only update your own profile")
    }
}


//Delete User 
const deleteUser =async (req,res)=>{
    const id=req.params.id;

    const{currentId,currentUserAdmin}=req.body;
    
    if(currentId===id || currentUserAdmin){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted Successfully ")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access Denied ! You can only delete your own profile")
    }
}

//Follow user 

const followUser=async (req,res)=>{
    const id=req.params.id;

    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden !")
    }else{
        try {
            
            const followuser=await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)

            if(!followuser.followers.includes(_id)){
                await followuser.updateOne({ $push :{followers :_id }})
                await followingUser.updateOne({ $push :{following :id}})
                res.status(200).json("User Followed !")
            }
            else{
                res.status(403).json("User Already followed by you ")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//Unfollow Use
const UnfollowUser=async (req,res)=>{
    const id=req.params.id;

    const {_id}=req.body;
    if(_id===id){
        res.status(403).json("Action Forbidden !")
    }else{
        try {   
            const followuser=await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)
            if(followuser.followers.includes(_id)){

                await followuser.updateOne({ $pull :{followers :_id}})
                await followingUser.updateOne({ $pull :{following :id}})
                res.status(200).json("User Unfollowed !")
            }
            else{
                res.status(403).json("User Already not followed by you ")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports={getAllUsers,getUser,updateUser,deleteUser,followUser,UnfollowUser}