import express from 'express';
import { login, logout } from '../controllers/accountControllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
const AccountRouter = express.Router();

AccountRouter.post("/login", login);
AccountRouter.post("/logout", isAuthenticated, logout);

export default AccountRouter;