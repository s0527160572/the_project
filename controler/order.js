import mongoose from "mongoose";
import { orderModel, orderValidatorForAdd } from "../models/order.js";

const getAllorder = async (req, res) => {
  try {
    let allorder = await orderModel.find({});
    res.json(allorder);
  }
  catch (err) {
    res.status(400).send("A timeout occurred while retrieving the data" + err.message);
  }

}
const getorderById = async (req, res) => {


  try {
    const orderx = await orderModel.find({ userId: req.user._id });
    if (!orderx) {
      return res.status(404).send("No order was found for this user");
    }
    res.json(orderx);
  } catch (err) {
    res.status(400).send("An error occurred while retrieving the data: " + err.message);
  }

}

const deleteorderById = async (req, res) => {
  let id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).send("Invalid code");
    let orderx = await orderModel.findByIdAndDelete(id);
    if (!orderx)
      return res.status(404).send("Noorder was found with such a code for delete")
    if (!req.user.role == "admin" && !req.user._id == orderx.userid && orderx.startOff)
      return res.status(404).send("Only the administrator and the user who ordered may perform a deletion")
    res.json(orderx);
  }
  catch (err) {
    res.status(400).send("A timeout occurred while delete the data" + err.message);
  }
}
const addorder = async (req, res) => {
  let validate = orderValidatorForAdd(req.body);
  if (validate.error)
    return res
      .status(400)
      .send("Error: The data you sent is invalid" + validate.error.details[0].message);

  let { address, products, dueDate, startOff, dateOrder, userId } = req.body; // Include 'products' field
  if (!address)
    return res.status(404).send("Error: Address is a mandatory field");

  try {

    let sameorder = await orderModel.find({ address });
    if (sameorder.length > 0)
      return res.status(409).send("Error: Such an order already exists");

    let neworder = await orderModel.create({
      startOff, userId: req.user._id, address, products, dueDate, dateOrder,
    });


    // await neworder.save();
    res.json(neworder);
  } catch (err) {
    res.status(400).send("Error: A timeout occurred while adding the data" + err.message);
  }
};

const updateorderById = async (req, res) => {
  let id = req.params.id;
  try {
        if(!mongoose.isValidObjectId(id))
        return res.status(400).send("Invalid code");
  

    let orderToUpdate = await orderModel.findById(id);
    if (!orderToUpdate)
      return res.status(404).send("No order was found with such a code for update");
    orderToUpdate.startOff = true;
    let order = await orderToUpdate.save();
    res.json(order);
  }
  catch (err) {
    res.status(400).send("A timeout occurred while update the data" + err.message);
  }
}


export { getAllorder, getorderById, deleteorderById, addorder, updateorderById };
