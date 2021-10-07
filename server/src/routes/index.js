const express = require('express');

const router = express.Router();
 

// const {login ,register, checkAuth}=require('../controllers/auth');
// const {getUsers,getUser,updateUser,deleteUser, getProfile} =require('../controllers/user');
const {addTodo,getTodo, getTodos, updateTodo, deleteTodo, getHistory} =require('../controllers/todolist');

// router.post('/login',login);
// router.post('/register',register);

// router.get('/users',getUsers)
// router.get('/user/:id',getUser)
// router.patch('/user',auth,uploadFile('image'),updateUser)
// router.get('/profile',auth,getProfile)
// router.delete('/user/:id',deleteUser)
// router.get("/check-auth", auth, checkAuth);

router.post('/todo',addTodo)
router.get('/todos',getTodos)
router.get('/history',getHistory)
router.get('/todo/:id',getTodo)
router.patch('/todo/:id',updateTodo)
router.delete('/todo/:id',deleteTodo)


module.exports =router;