import { IService } from "../../../shared/domain/interfaces/IService";
import UsersRepository from "../../infrastructure/persistence/repositories/users.repository";
import { readFileSync } from "fs";

// Test Integration with Ethers


class UsersService implements IService {
  async findAll() {
    const result = await UsersRepository.findAll();

    return {
      statusCode: 200,
      response: result,
    };
  }

  async findById() {
    return {
      statusCode: 200,
      response: {
        message: 'success',
      },
    };
  }

  async create() {
     return {
      statusCode: 200,
      response: {
        message: 'success'
      },
    };
  }
}

export default new UsersService();
