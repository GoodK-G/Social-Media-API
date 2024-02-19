const {User} = require('../models');

module.exports = {
//get all users
    async getUsers(req,res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get single user by _id and populate friends and thoughts
    async getSingleUser(req,res){
        try{
            const userId = req.params.userId;

            const user =await User.findOne({_id: userId})
            .select('-__v')
            .populate('friends') //populate friends array data
            .populate('thoughts'); //populate the thoughts array

            res.json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //create a user
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body},
                { runValidators: true, new:true}
            );
        if (!user){
            return res.status(404).json({ message: 'There is no user with this Id!'});
        }
        res.json(user);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res){
        try{
            const userId = req.params.userId;
            //find and remove user by _id
            const deletedUser = await User.findOneAndRemove({ _id: userId});
        if(!deletedUser){
            return res.status(404).json({message: 'There is no user with this Id.'})
        }
        //remove the user from the friends array
        await User.updateMany(
            {friends: userId},
            {$pull: {friends: userId}}
        );
            //remove the users thoughts from the thoughts array
        await User.updateMany(
            {thoughts: userId},
            {$pull: {thoughts:userId}}
        );
        //Remove the user's thoughts
        await thoughtSchema.deleteMany({_id:{$in: deletedUser}});

        res.json({ message: 'User has been deleted successfully!'});
        }catch (err){
            res.status(500).json(err);
        }
    },

};