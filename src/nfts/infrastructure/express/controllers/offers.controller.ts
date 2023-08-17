import { Request, Response } from 'express';
import OffersService from '../../../application/services/offers.service';
import IController from '../../../../shared/domain/interfaces/IController';

class OffersController implements IController {
    async findAll(req: Request, res: Response) {
        const { status } = req.query;
        const { statusCode, response } = await OffersService.findAll({
            status: status as string,
        });
        return res.status(statusCode).json(response);
    }

    async findById(req: Request, res: Response) {
        const { statusCode, response } = await OffersService.findById(
            req.params.id
        );
        return res.status(statusCode).json(response);
    }

    async create(req: Request, res: Response) {
        const { statusCode, response } = await OffersService.create(req.body);
        return res.status(statusCode).json(response);
    }

    async accept(req: Request, res: Response) {
        req.body.status = 'accepted';
        const { statusCode, response } = await OffersService.updateById(
            req.params.id,
            req.body
        );
        return res.status(statusCode).json(response);
    }
}

export default new OffersController();
