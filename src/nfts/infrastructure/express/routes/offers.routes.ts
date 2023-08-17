import { Application, Router } from 'express';
import OffersController from '../controllers/offers.controller';
import validationHandler from '../../../../shared/infrastructure/middlewares/validation-handler';
import { offersFiltersSchema } from '../../../domain/dto/query-offers.dto';
import { offerSchema } from '../../../domain/entities/offer.entity';

export const OffersRoutes = (app: Application) => {
    const router: Router = Router();
    app.use('/api/offers', router);

    router.get(
        '/',
        validationHandler(offersFiltersSchema, 'query'),
        OffersController.findAll
    );
    router.get('/:id', OffersController.findById);
    router.post('/create', validationHandler(offerSchema), OffersController.create);
    router.post('/:id/accept', OffersController.accept);
};
