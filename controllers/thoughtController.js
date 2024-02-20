const { User, Thought }= require('../models');

module.exports = {
    //get all thoughts
    async getAllThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //GET single thought
    async getSingleThought(req, res){
        try{
            const thoughtId = req.params.thoughtId
            const thoughts =await Thought.findOne({_id: thoughtId})
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //CREATE new thought
    async createNewThought(req, res){
        try{
            const newThoughts = await Thought.create(req.body);

            res.json(newThoughts);
        } catch(err){
            res.status(500).json(err);
        }
    },
    //Update thought by id
    async updateThought(req, res){
        try{
            const thoughtId= req.params.thoughtId;

            const updateThought = await Thought.findOneAndUpdate(thoughtId,req.body,{new: true});
            res.json(updateThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //DELETE thought by id
    async updateThoughts(req, res){
        try{
            const thoughtId = req.params.thoughtId;

            // Find the associated user
            const user = await User.findOne({ thoughts: thoughtId });

            // Remove the thought from the associated user's thoughts array
            await User.findByIdAndUpdate(user._id, { $pull: { thoughts: thoughtId } });

            // Delete the thought
            await Thought.findByIdAndRemove(thoughtId);

            res.json({ message: 'Thought removed successfully.' });

        }catch(err){
            res.status(500).json(err);
        }
    },
}