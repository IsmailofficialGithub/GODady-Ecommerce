import express from 'express';
import {registerController,loginController,testController,forgetPasswordController, profileUpdateController, getOrderController, getAllOrderController, orderStatusController } from '../controller/authController.js'
import { requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js';




//router object

const router=express.Router()

//routing
//Register || post Method
router.post("/register",registerController) 

// login || post Method
router.post('/login', loginController)

//forget password  || post method
router.post('/forget-password',forgetPasswordController)

// test route
router.get('/test',requireSignIn,isAdmin,testController)

//protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

// update profile
router.put('/profile',requireSignIn,profileUpdateController)

// getting orders

router.get('/orders',requireSignIn,getOrderController)

// all getting orders

router.get('/all-orders',requireSignIn,isAdmin,getAllOrderController)

// order status update
 
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)


export default router;