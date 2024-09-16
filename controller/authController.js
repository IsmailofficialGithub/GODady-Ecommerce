import { hashSync } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, address, phone, answer } = req.body;
    if (!name) {
      return res.send({ error: "Name required" });
    }
    if (!phone) {
      return res.send({
        error: "phone required",
      });
    }
    if (!email) {
      return res.send({
        error: "email required",
      });
    }
    if (!address) {
      return res.send({
        error: "address required",
      });
    }
    if (!password) {
      return res.send({
        error: "password required",
      });
    }
    if (!answer) {
      return res.send({
        error: "answer required",
      });
    }
    //check User
    const existingUser = await userModel.findOne({
      email,
    });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already existing Please Login",
      });
    }

    //register a user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "failed",
      message: "Error in Registration",
      error,
    });
  }
};

//  POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status("404").send({
        success: false,
        message: "Invaild email or password",
      });
    }
    //check user
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email in not Register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invaid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        role: user.role,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("protected route");
};

// forget password controller
export const forgetPasswordController = async (req, resp) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      resp.status(400).send("Email Required");
    }
    if (!answer) {
      resp.status(400).send("Answer Required");
    }
    if (!newPassword) {
      resp.status(400).send("Enter New Password");
    }
    //check
    const user = await userModel.findOne({
      email,
      answer,
    });

    //validation
    if (!user) {
      return resp.status(201).send({
        success: false,
        message: "Invalid Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    }),
      resp.status(200).send({
        success: true,
        message: "Password update successfully",
      });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "error in forget password controller in authcontroller",
      success: false,
      error,
    });
  }
};

// update profile

export const profileUpdateController = async (req, res) => {
  try {
    const { phone, name, address, email, password } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({
        error: "Password in required and must have 6 digits",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateData = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        address: address || user.address,
        phone: phone || user.phone,
        password: hashedPassword || user.password,
      },
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: "updated successfully",
      updateData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updating profile",
      error,
    });
  }
};

//                  getting all orders
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("product", "-photos")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting all order",
      error,
    });
  }
};

//                  getting all orders
export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("product", "-photos")
      .populate("buyer", "name");
    // .sort({createdAt:"1"})

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting all order",
      error,
    });
  }
};

// order status update

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { Status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status: Status }, { new: true });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in updating order status",
      success: false,
      error,
    });
  }
};
