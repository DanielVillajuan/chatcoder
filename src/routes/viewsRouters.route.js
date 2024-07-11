
import { Router } from "express";

const app = Router();

app.get('/', (req, res) => {
    res.render('home',{})
})


export default app

