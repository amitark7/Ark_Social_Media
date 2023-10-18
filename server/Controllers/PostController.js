const PostModel =require('../Models/PostModel')
const mongoose=require('mongoose')
const UserModel =require('../Models/userModel')

//Create New Post

const createPost =async (req,res)=>{
    const newPost=new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}


//Get Post

const getPost=async(req,res)=>{
    const id =req.params.id;
    try {
        const post=await PostModel.findById(id)
        if(post===null){
            res.status(404).json("Deleted Post !")
        }else{

            res.status(200).json(post)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//Update Post

const updatePost=async (req,res)=>{
    const postId=req.params.id
    const {userid}=req.body

    try {
        let post =await PostModel.findById(postId)
        if(post.userid===userid)
        {
            post=await PostModel.findByIdAndUpdate(post.id,req.body,{new:true})
            res.status(200).json("Post Updated !")
        }else{
            res.status(403).json("Action Forbidden !")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Delete Post 

const deletePost=async (req,res)=>{
    const id =req.params.id
    const {userid}=req.body
    try {
        const post=await PostModel.findById(id)
        if(post.userid===userid)
        {
            await PostModel.findByIdAndDelete(post.id)
            res.status(200).json("Post Deleted !")
        }
        else{
            res.status(403).json("Action forbiden !")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Like Dislike Post

const likePost=async (req,res)=>{
    const id=req.params.id

    const{userid}=req.body

    try {
        const post=await PostModel.findById(id)

        if(!post.likes.includes(userid)){
            await PostModel.updateOne({$push :{likes :userid}})
            res.status(200).json("Post liked !")
        }
        else{
            await PostModel.updateOne({$pull :{likes :userid}})
            res.status(200).json("Post Disliked !")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get Timeline Post

const getTimelinePost=async (req,res)=>{
    const userId=req.params.id
    try {
        const currentUserPost =await PostModel.find({userid:userId})
        const followingPosts=await UserModel.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userid",
                    as :"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts : 1,
                    _id :0
                }
            }
        ])
        res.status(200).json(currentUserPost.concat(...followingPosts[0].followingPosts).
        sort((a,b)=>{
            return b.createdAt - a.createdAt
        }))
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports={createPost,getPost,updatePost,deletePost,likePost,getTimelinePost}