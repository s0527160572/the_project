import mongoose from "mongoose";
import joi from "joi";
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  DateOfProduction: { type: Date, default: Date.now() },
  RoutingToImage: String,
  Type: String,
  Component: String,
  price: Number
})
export const productModel = mongoose.model("product", productSchema);
export const productValidatorForAdd = (_product) => {
  const schema = joi.object({
    //לגמור לסדר את כל השדות
    name: joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(3000),
    DateOfProduction: joi.date().less('now'),
    RoutingToImage: joi.string()
      .uri()
      .custom((value, helpers) => {
        // Check if the URL ends with a valid image extension
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = value.split('.').pop().toLowerCase();
        if (imageExtensions.includes(extension)) {
          return value;
        }
        return helpers.error('any.invalid');
      }),
    Type: joi.string().min(3).max(30),
    Component: joi.string().min(3).max(30),
    price: joi.number().required()

  });
  return schema.validate(_product);
}
export const productValidatorForUpdate = (_product) => {
  const schema = joi.object({
    //לגמור לסדר את כל השדות
    name: joi.string().min(3).max(30),
    description: joi.string().min(3).max(3000),
    DateOfProduction: joi.date().less('now'),
    RoutingToImage: joi.string()
      .uri()
      .custom((value, helpers) => {
        // Check if the URL ends with a valid image extension
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = value.split('.').pop().toLowerCase();
        if (imageExtensions.includes(extension)) {
          return value;
        }
        return helpers.error('any.invalid');
      }),
    Type: joi.string().min(3).max(30),
    Component: joi.string().min(3).max(30),
    price: joi.number()

  });
  return schema.validate(_product);
}