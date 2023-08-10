import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateBook, ValidateUpdateBook } from "../service/validate.js";
import Models from "../model/index.js";
import mongoose from "mongoose";
import UploadImage from "../config/cloudinary.js";

export default class BookController {
  static async getOne(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError400(res, EMessage.notFound + "bookId");
      }
      const book = await Models.Book.findOne({
        isActive: true,
        _id: bookId,
      });
      return SendSuccess(res, EMessage.getOne, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async getAll(req, res) {
    try {
      const book = await Models.Book.find({
        isActive: true,
      });
      if (!book) {
        return SendError400(res, EMessage.notFound + "book");
      }
      return SendSuccess(res, EMessage.getAll, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async insert(req, res) {
    try {
      const validate = ValidateBook(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { name, detail, amount, order_price, sale_price } = req.body;
      if (!req.files.image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(req.files.image.data);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const book = await Models.Book.create({
        name,
        detail,
        amount,
        order_price,
        sale_price,
        image: image_url,
      });
      return SendCreate(res, SMessage.create, book);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async updateBook(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!bookId) {
        return SendError400(res, EMessage.notFound, " bookId");
      }
      const {
        name,
        detail,
        amount,
        order_price,
        sale_price,
        oldImage,
        newImage,
      } = req.body;
      const validate = ValidateUpdateBook(req.body);
      if (validate > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const image = req.files.newImage;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(image.data, oldImage);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const book = await Models.Book.findByIdAndUpdate(
        bookId,
        {
          name,
          detail,
          amount,
          order_price,
          sale_price,
          image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async deleteBook (req, res) {
    try {
      const bookId = req.params.bookId;
      if(!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError400(res, EMessage.notFound + " bookId");
      }
      const book = await Models.Book.findByIdAndUpdate(bookId,{
        isActive: false
      },{new: true});
      return SendSuccess(res, SMessage.delete, book);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

}
