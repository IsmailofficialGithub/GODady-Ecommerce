import express from 'express';
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js'
import { createCatagoryController,updateCatagoryController,catagorycontroller,singleCatagoryController,deleteCatagoryController} from '../controller/catagorycontroller.js';

const router= express.Router();

//route
//create catagory
router.post('/create-catagory',requireSignIn,isAdmin,createCatagoryController)

//update catagory
router.put('/update-catagory/:id',requireSignIn,isAdmin,updateCatagoryController)

//get All catagory
router.get('/get-catagory',catagorycontroller)
export default router;

//get single catagory
router.get('/single-catagory/:slug',singleCatagoryController)

// delete catagory
router.delete('/delete-catagory/:id',requireSignIn,isAdmin,deleteCatagoryController)