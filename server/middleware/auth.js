import Models from "../model/index.js";
import { EMessage, Role } from "../service/message.js";
import {
  SendError401,
  SendError500,
  SendError400,
} from "../service/response.js";
import { DeCrypts, VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    //console.log(req.headers);
    const authorization = req.headers["authorization"];
    //console.log(authorization);
    if (!authorization) {
      return SendError401(res, EMessage.invalidToken);
    }
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return SendError401(res, EMessage.invalidToken);
    }

    const decode = await VerifyToken(token);
    //const id = await DeCrypts(decode);
    //console.log(decode);
    //console.log(decode._id);
    //console.log(JSON.stringify(decode._id));
    req.user = decode._id;
    //req.user = id;
    next();
  } catch (error) {
    console.log(error);
    return SendError500(res, EMessage.serverFaild, error);
  }
};

export const auth_admin = async (req, res, next) => {
  try {
    const newData = JSON.parse(JSON.stringify(req.user));
    const id = newData;
    const user = await Models.User.findOne({ _id: id });
    if (!user) {
      return SendError401(res, EMessage.notFound + "userId");
    }
    console.log(user.role);
    if (user.role === Role.admin) {
        //console.log(user.role === Role.admin);
        //console.log(Role.admin === user.role);
      const checkRole = await Models.User.findOne({
        _id: id,
        isActive: true,
        role: user.role,
      });
      //console.log(checkRole);
      if (!checkRole) {
        return SendError400(res, "Error Role");
      }
      return next();
    } else {
      return SendError400(res, "Error Role");
    }
  } catch (error) {
    return SendError500(res, EMessage.serverFaild, error);
  }
};
