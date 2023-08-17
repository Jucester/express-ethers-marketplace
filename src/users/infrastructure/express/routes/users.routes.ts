import { Application, Router } from "express";
import UsersController from "../controllers/users.controllers";

export const UsersRoutes = (app: Application) => {
  const router: Router = Router();
  app.use("/api/users", router);

  router.get("/", UsersController.findAll);
  router.get("/:id", UsersController.findById);
  router.post("/create", UsersController.create);
};
