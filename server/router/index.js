import express from "express";
import UserController from "../controller/user.controller.js";
import { auth, auth_admin } from "../middleware/auth.js";
import BannerController from "../controller/banner.controller.js";

const router = express.Router();
// ------ auth --------
const user = "/user";
router.get(`${user}/getOne/:userId`, auth, UserController.getOne)
router.get(`${user}/getAll`, auth, UserController.getAll)
router.post(`${user}/register`, UserController.register)
router.post(`${user}/login`, UserController.login)
router.put(`${user}/forget`, UserController.fortgetPassword)
router.post(`${user}/refreshToken`, auth, auth_admin, UserController.refreshToken)
router.put(`${user}/updateProfile/:userId`, auth, UserController.updateProfile);
router.put(`${user}/updateProfileImage/:userId`, auth, UserController.updateProfileImage);
router.put(`${user}/changePassword/:userId`, auth, UserController.changePassword);
router.put(`${user}/updateProfileImageToServer/:userId`, auth, UserController.updateProfileImageToServer);

// ------ banner --------
const banner = "/banner";
router.get(`${banner}/getOne/:bannerId`, auth, BannerController.getOne)
router.get(`${banner}/getAll`, auth, BannerController.getAll)
router.post(`${banner}/insert`, auth, BannerController.insert)
router.put(`${banner}/update/:bannerId`, auth, BannerController.updateBanner);
router.put(`${banner}/delete/:bannerId`, auth, BannerController.deleteBanner);
export default router;