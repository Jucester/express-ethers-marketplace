import { App } from "./app";
import dotenv from 'dotenv';
dotenv.config();

const app = new App(process.env.PORT, process.env.STAGE);
app.listen();
