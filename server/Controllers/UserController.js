const UserModel=require('../Models/userModel')
const bcrypt=require('bcrypt')


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

    const{currentId,currentUserAdminStatus ,password}=req.body;

    if(id===currentId || currentUserAdminStatus){
        try {
            if(password){
                const salt =await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(password,salt);
            }
            
            const user =await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user)
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

    const {currentId}=req.body;

    if(id==currentId){
        res.status(403).json("Action Forbidden !")
    }else{
        try {
            
            const followuser=await UserModel.findById(id)
            const followingUser=await UserModel.findById(currentId)

            if(!followuser.followers.includes(currentId)){
                
                await followuser.updateOne({ $push :{followers :currentId }})
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

    const {currentId}=req.body;

    if(id==currentId){
        res.status(403).json("Action Forbidden !")
    }else{
        try {
            
            const followuser=await UserModel.findById(id)
            const followingUser=await UserModel.findById(currentId)

            if(followuser.followers.includes(currentId)){

                await followuser.updateOne({ $pull :{followers :currentId }})
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

module.exports={getUser,updateUser,deleteUser,followUser,UnfollowUser}