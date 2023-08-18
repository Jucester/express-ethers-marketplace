import { Request, Response } from 'express';
import NftsService from '../../../application/services/nfts.service';
import IController from '../../../../shared/domain/interfaces/IController';

class NftsController implements IController {
    async findAll(req: Request, res: Response) {
        const { query } = req;
        const { response } = await NftsService.findAll({ query });
        return res.status(response.statusCode).json(response);
    }

    async findById(req: Request, res: Response) {
        const { response } = await NftsService.findById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

    async create(req: Request, res: Response) {
        const { response } = await NftsService.create(req.body);
        return res.status(response.statusCode).json(response);
    }
}

export default new NftsController();
