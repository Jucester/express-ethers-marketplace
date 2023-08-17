import { Application, Router } from 'express';
import NftsController from '../controllers/nfts.controller';
import validationHandler from '../../../../shared/infrastructure/middlewares/validation-handler';
import { nftSchema } from '../../../domain/entities/nft.entity';

export const NftsRoutes = (app: Application) => {
    const router: Router = Router();
    app.use('/api/nfts', router);

    router.get('/', NftsController.findAll);
    router.get('/:id', NftsController.findById);
    router.post('/create', validationHandler(nftSchema), NftsController.create);
};
