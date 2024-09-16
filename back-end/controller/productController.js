import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import catagoryModel from "../models/catagoryModel.js";
import OrderModel from "../models/orderModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create product

export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, catagory, quantity, shipping } = req.fields;
    const { photos } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !catagory:
        return res.status(500).send({ error: "catagory is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photos && photos.size < 1000:
        return res.status(500).send({ error: "photos is required and less than 1 MB" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photos) {
      products.photos.data = fs.readFileSync(photos.path);
      products.photos.contentType = photos.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "data is save successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create products productController.js",
    });
  }
};

// get all product
export const getProductsController = async (req, res) => {
  try {
    const product = await productModel.find({}).select("-photos").limit(10).sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      totalCount: product.length,
      message: "successfully getting all product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getting all product",
      success: false,
      error,
    });
  }
};

// get single product

export const getSingleProductsController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photos").populate("catagory");
    res.status(201).send({
      success: true,
      message: "successfully get single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting single product productController line 77",
      error,
    });
  }
};

/// getting all photos

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photos");
    if (product.photos.data) {
      res.set("Content-type", product.photos.contentType);
      return res.status(201).send(product.photos.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in getting photo "productController line 101"',
      error,
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid).select("-photos");
    res.status(201).send({
      success: true,
      message: "product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting product productCOntroller line 122",
      error,
    });
  }
};

//update product

export const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, catagory, quantity, shipping } = req.fields;
    const { photos } = req.files;

    const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
    if (photos) {
      products.photos.data = fs.readFileSync(photos.path);
      products.photos.contentType = photos.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "data is updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updating products productController.js line 171",
    });
  }
};

// filter product

export const filterProductController = async (req, res) => {
  try {
    const { radio, checked } = req.body;
    let args = {};
    if (checked.length > 0) args.catagory = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);

    res.status(201).send({
      success: true,
      message: "filter product successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in filtering product",
      error,
    });
  }
};

//count product

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in counting product",
      error,
    });
  }
};

// product per page

export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photos")
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wents wrong in product per page",
      error,
    });
  }
};

// search product

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
      })
      .select("-photos");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in searching products",
      error,
    });
  }
};

// similar product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        catagory: cid,
        _id: { $ne: pid },
      })
      .select("-photos")
      .limit(3)
      .populate("catagory");
    res.status(201).send({
      success: true,
      message: "successfully getting similar products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting similar product productCOntroller",
      error,
    });
  }
};

// product by catagory

export const productCatagoryController = async (req, res) => {
  try {
    const catagory = await catagoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ catagory }).populate("catagory");
    res.status(201).send({
      success: true,
      message: "successfully getting product by catagory",
      products,
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getting product by catagory in productController",
      success: false,
      error,
    });
  }
};

///  getting  token

export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).send({
          message: "Error generating client token",
          error: err,
        });
      } else {
        return res.status(201).send({
          message: "Successfully generated client token",
          clientToken: response,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },

      function (err, result) {
        if (err) {
          console.error(err);
          return;
        }

        if (result.success) {
          const order = new OrderModel({
            product: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.status(200).send(res.status(200).send({ ok: true, message: "save infromation" }));
        } else {
          console.error(result.message);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};
