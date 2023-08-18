import { Request, Response } from 'express';
import OffersService from '../../../application/services/offers.service';
import IController from '../../../../shared/domain/interfaces/IController';

class OffersController implements IController {
    async findAll(req: Request, res: Response) {
        const { status } = req.query;
        const response = await OffersService.findAll({
            status: status as string,
        });
        return res.status(response.statusCode).json(response);
    }

    async findById(req: Request, res: Response) {
        const response = await OffersService.findById(
            req.params.id
        );

        return res.status(response.statusCode).json(response);
    }

    async create(req: Request, res: Response) {
        const response = await OffersService.create(req.body);
        return res.status(response.statusCode).json(response);
    }

    async accept(req: Request, res: Response) {
        req.body.status = 'accepted';
        const response = await OffersService.updateById(
            req.params.id,
            req.body
        );

        return res.status(response.statusCode).send(response);
    }
}

export default new OffersController();
