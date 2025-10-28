import express from 'express'
import sql from 'mssql';
import { getPool } from './db/config';
import todoRoutes from './router/todo.routes';
import dotenv from 'dotenv';
import userRoutes from './router/user.routes';

//create express app
const app = express();

//config dotenv - load env variables
dotenv.config();

//middleware
app.use(express.json()); //parse json request body

//default route
app.get('/', (_, res) => {
    res.send("Hello, express API is running...");
});

//register routes
todoRoutes(app); //register todo routes
userRoutes(app); //register user routes


//port
const port = process.env.PORT || 8081;

//start server
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})

//test database connection
getPool()
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.log("Database connection failed: ", err));