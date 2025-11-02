import { Express, NextFunction } from "express";
import * as userController from "../controllers/user.controllers";
import * as todoController from "../controllers/todo.controllers";
import { isAuthenticated } from "../middleware/bearAuth";

const userRoutes = (app: Express) => {
    app.get("/users", userController.getAllUsers);
    app.get("/users/:id", userController.getUserById);
    app.post("/users", userController.createUser); // registration
    app.put("/users/:id", userController.updateUser);
    app.delete("/users/:id", userController.deleteUser);
    app.post("/login", userController.loginUser);  //login

    

     // Existing routes
    app.post("/users", userController.createUser);
    app.post("/login", userController.loginUser);
  
    // New verification route
    app.post("/users/verify", userController.verifyUser);
    app.post("/users/register", userController.createUser);



     
}

export default userRoutes;