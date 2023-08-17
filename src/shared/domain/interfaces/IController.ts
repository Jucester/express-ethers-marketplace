import { Request, Response } from "express";

/**
 * The last methods as optionals just for the sake of avoid the implementation in this demo
 */
export default interface IController {
  findAll(req: Request, res: Response): Promise<Response>;
  findById(req: Request, res: Response): Promise<Response>;
  create?(req: Request, res: Response): Promise<Response>;
  updateById?(req: Request, res: Response): Promise<Response>;
  deleteById?(req: Request, res: Response): Promise<Response>;
}