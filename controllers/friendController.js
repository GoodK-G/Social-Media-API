const {User}= require('../models');

module.exports = {
    //post to add a new friend to a user's friend list
    async addFriend(req, res){
        try{
            const {userId, friendId} = req.params;

            //add friendId to the user's friend array
            await User.findByIdAndUpdate(userId,{ $push:{ friends: friendId}});

            res.json({message: 'Friend added successfully.'})
        } catch (err){
            res.status(500).json(err);
        }
    },

    //DELETE to remove a freind from a users friends list

    async removeFriend( req, res){
        try{
            const { userId, friendId}= req.params;

            //remove friendId from the user's friend array
            await User.findByIdAndUpdate(userId,{$pull:{friends: friendId}});

            res.json({message: 'Friend removed successfully.'})
        } catch (err) {
            res.status(500).json(err);
        }
    }
}