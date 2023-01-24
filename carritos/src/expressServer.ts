import cors from "cors";
import express, { Application } from "express";
import sequelize from "./config/dbConnection";
import defineModelEntityRelationShip from "./models/modelEntityRelationship";
import routerCarrito from "./routes/carrito";


class ExpressServer {
    private app: Application;
    private port: string;
    private basePath: string = '/api';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.dbConnection();
        this.configs();
        this.routes();
        this.modelEntityRelationship();
    }

    async dbConnection() {
        try {
            await sequelize.authenticate();
            console.log('Conexion con la base de datos establecida.');
        } catch (error) {
            throw new Error(`Error en la conexion a la base de datos: ${error}`);
        }
    }

    configs(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    modelEntityRelationship() {
        defineModelEntityRelationShip();
    }

    routes(): void {
        this.app.use(this.basePath, routerCarrito);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App corriendo en puerto ${this.port}`);
        });
    }

}

export default ExpressServer;