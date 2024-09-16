import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, brainTreeTokenController, createProductController, deleteProductController, filterProductController, getProductsController, getSingleProductsController, productCatagoryController, productCountController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';
const router=express.Router();

//routes

// create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);
// get all products
router.get('/get-products',getProductsController)
// get single product
router.get('/get-product/:slug',getSingleProductsController)
// get product photo
router.get('/product-photo/:pid',productPhotoController)
// delete product
router.delete('/delete-product/:pid',deleteProductController)
//update product 
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);
// filter product
router.post('/filter-product',filterProductController)
//product count
router.get('/product-count',productCountController)
//product per page
router.get('/product-list/:page',productListController)
// search product
router.get('/search-product/:keyword',searchProductController)
// related product 
router.get('/related-product/:pid/:cid',relatedProductController)
//product by catagory 
router.get('/productCatagory/:slug',productCatagoryController)

// payment gatway

// token
router.get('/braintree/token',brainTreeTokenController)
// payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)


export default router;