import { Request, Response } from "express";
import UsersService from "../../../application/services/users.service";
import IController from "../../../../shared/domain/interfaces/IController";

class UsersController implements IController {
  async findAll(req: Request, res: Response) {
    const users = await UsersService.findAll();
    return res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const users = await UsersService.findById();
    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const users = await UsersService.create();
    return res.json(users);
  }

  async updateById(req: Request, res: Response) {
    const users = await UsersService.findAll();
    return res.json(users);
  }

  async deleteById(req: Request, res: Response) {
    const users = await UsersService.findAll();
    return res.json(users);
  }
}

export default new UsersController();
