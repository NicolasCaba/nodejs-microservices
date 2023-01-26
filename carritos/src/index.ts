import dotenv from "dotenv";
import ExpressServer from "./expressServer";

// environment vars config
dotenv.config();

export const expressServer = new ExpressServer();

expressServer.listen();