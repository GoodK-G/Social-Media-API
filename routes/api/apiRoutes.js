const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../controllers'); // Import your controllers

// /api/users
router.get('/users', getAllUsers);
router.get('/users/:userId', getSingleUser);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

// /api/users/:userId/friends/:friendId
router.post('/users/:userId/friends/:friendId', addFriend);
router.delete('/users/:userId/friends/:friendId', removeFriend);

// /api/thoughts
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:thoughtId', getSingleThought);
router.post('/thoughts', createThought);
router.put('/thoughts/:thoughtId', updateThought);
router.delete('/thoughts/:thoughtId', removeThought);

// /api/thoughts/:thoughtId/reactions
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
