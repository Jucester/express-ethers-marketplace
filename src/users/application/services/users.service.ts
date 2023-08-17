import { IService } from "../../../shared/domain/interfaces/IService";
import UsersRepository from "../../infrastructure/persistence/repositories/users.repository";
import { readFileSync } from "fs";

// Test Integration with Ethers
import { Wallet, JsonRpcProvider, Contract } from "ethers";


class UsersService implements IService {
  private contractAddress: string;
  private provider: any;

  constructor(_contractAddress: string) {
    this.contractAddress = _contractAddress;
  }

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

export default new UsersService("0xF1019f11C027f7FF3cE0Ad02BB7A1bb7725B4dDC");
