import mongoose from "mongoose";
import { productModel, productValidatorForAdd, productValidatorForUpdate } from "../models/product.js";

const getAllProduct = async (req, res) => {



    let { searchProductName, searchPrice } = req.query;

    let exp = new RegExp(`${searchProductName}`);


    let page = req.query.page || 1;
    let perPage = req.query.perPage || 40;


    try {

        let filter = {};
        if (searchProductName)
            filter.name = exp;
        if (searchPrice)
            filter.price = searchPrice;

        let allProduct = await productModel.find(filter).skip((page - 1) * perPage).limit(perPage);


        res.json(allProduct);
    }
    catch (err) {
        res.status(400).send("A timeout occurred while retrieving the data" + err.message);
    }

}
const getProductById = async (req, res) => {


    try {
        if (!mongoose.isValidObjectId(req.params.productid))
            return res.status(400).send("Invalid code");
        let productx = await productModel.findById(req.params.productid);
        if (!productx)
            return res.status(404).send("No product was found with such a code")
        res.json(productx);
    }
    catch (err) {
        res.status(400).send("A timeout occurred while retrieving the data" + err.message);
    }

}

const deleteProductById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("Invalid code");
        let productx = await productModel.findByIdAndDelete(id);
        if (!productx)
            return res.status(404).send("No product was found with such a code for delete")
        res.json(productx);
    }
    catch (err) {
        res.status(400).send("A timeout occurred while delete the data" + err.message);
    }
}
const addProduct = async (req, res) => {

    let { name, description, DateOfProduction, RoutingToImage, Type, Component, price } = req.body;

    let validate = productValidatorForAdd(req.body);
    if (validate.error)
    return res.status(404).send("The data you sent is invalid, try again" + validate.error.details[0].message);    try {
      
        if (!name || !price)
            return res.status(404).send("Name and price are mandatory fields");

        let sameProduct = await productModel.find({ name, price });
        if (sameProduct.length > 0)
            return res.status(409).send("Such a product already exists")

        let newProduct = await productModel.create({ name, description, DateOfProduction, RoutingToImage, Type, Component, price });


        return res.json(newProduct);

    }
    catch (err) {
        res.status(400).send("A timeout occurred while add the data" + err.message);

    }

}

const updatePoductById = async (req, res) => {

    let { id } = req.params;
    let validate = productValidatorForUpdate(req.body);
    if (validate.error)
    return res.status(404).send("The data you sent is invalid, try again" + validate.error.details[0].message);    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("Invalid code");
        let productToUpdate = await productModel.findById(id);
        if (!productToUpdate)
            return res.status(404).send("No product was found with such a code for update")
        await productModel.findByIdAndUpdate(id, req.body);
        let product = await productModel.findById(id);

        res.json(product);
    }
    catch (err) {
        res.status(400).send("A timeout occurred while delete the data" + err.message);
    }
}
export { getAllProduct, getProductById, deleteProductById, addProduct, updatePoductById };
