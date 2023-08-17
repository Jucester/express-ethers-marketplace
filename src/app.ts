import express, { Application } from 'express';
import morgan from 'morgan';
import { UsersRoutes } from './users/infrastructure/express/routes/users.routes';
import { NftsRoutes } from './nfts/infrastructure/express/routes/nfts.routes';
import { OffersRoutes } from './nfts/infrastructure/express/routes/offers.routes';

export class App {
    private port: string;
    private stage: string;
    public server: Application;

    constructor(port: string = '3000', stage: string = 'DEV') {
        this.port = port;
        this.stage = stage;
        this.server = express();

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(morgan('combined'));
    }

    private routes() {
        UsersRoutes(this.server);
        NftsRoutes(this.server);
        OffersRoutes(this.server);
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(
                `Server running on port ${this.port} in ${this.stage} environment`
            );
        });
    }
}
