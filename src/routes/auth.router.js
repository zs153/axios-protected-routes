import express from "express";
import { login, refresh } from "../controllers/auth.controller";

const apiAuthRouter = express.Router();

// usuarios
apiAuthRouter.post("/refresh", refresh);
apiAuthRouter.post("/login", login);

export default apiAuthRouter;
