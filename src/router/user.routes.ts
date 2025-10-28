import { Express } from "express";
import * as userController from "../controllers/user.controllers";

const userRoutes = (app: Express) => {
    app.get("/users", userController.getAllUsers);
    app.get("/users/:id", userController.getUserById);
    app.post("/users", userController.createUser);
    app.put("/users/:id", userController.updateUser);
    app.delete("/users/:id", userController.deleteUser);
}

export default userRoutes;