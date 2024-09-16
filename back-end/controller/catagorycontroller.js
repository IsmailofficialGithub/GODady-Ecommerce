import slugify from 'slugify';
import catagoryModel from '../models/catagoryModel.js'




//=================create catagory
//=================               ================
export const createCatagoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) { return res.status(401).send({ message: 'Name is required' }) }

        const existingCatagory = await catagoryModel.findOne({ name })
        if (existingCatagory) {
            return res.status(200).send({ success: true, message: 'catagory already exists' });
        }
        const catagory = await new catagoryModel({ name, slug: slugify(name) }).save();
        res.status(200).send({ success: true, message: 'new catagory created', catagory })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in catagory in catagoryController.js',
            error
        })
    }
}

//============update catagory
//======================

export const updateCatagoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        const catagory = await catagoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'catagory updated successfully',
            catagory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while updating catagory in catagorycontroller catch',
            error
        })
    }

}

//get all catagory
export const catagorycontroller = async (req, res) => {
    try {
        const catagory = await catagoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'successfully getting all catagory',
            catagory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'errror in getting all catagory'
            , error
        })
    }
}


//single catagory
export const singleCatagoryController = async (req, res) => {
    try {
        const catagory = await catagoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({ success: true, message: 'successfully get single catagory', catagory })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting single catagory',
            error
        })
    }
}


//delete catagory

export const deleteCatagoryController=async(req,res)=>{
    try {
const {id}=req.params
    const catagory= await catagoryModel.findByIdAndDelete(id)
    
    res.status(200).send({
        success:true,
        message:'delete successfully',
        catagory,
       
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in deleting catagory in catagorycontroller.js',
            error,
        })
    }
}