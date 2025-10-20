import express from 'express'

const app = express();

app.use(express.json()); //parse JSON bodies

app.get('/', (req, res) => {
    res.send("Hello, express API is running...");
});

const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})

