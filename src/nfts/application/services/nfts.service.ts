import NftsRepository from '../../infrastructure/persistence/repositories/nfts.repository';
import { IService } from '../../../shared/domain/interfaces/IService';
import { getProvider, getWallet } from '../../../shared/infrastructure/utils/ethers-utils';
import { getContract } from '../../../shared/infrastructure/utils/contract-utils';
import { ERC721Contract } from '../../../shared/infrastructure/contracts/erc721-contract';
import { users } from '../../../users/infrastructure/persistence/repositories/users.repository';

class NftsService implements IService {
    async findAll(params: { query: any }) {
        const { query } = params;
        const result = await NftsRepository.findAll({ query });

        return {
            statusCode: 200,
            response: result,
        };
    }

    async findById(id: string) {
        const result = await NftsRepository.findById(parseInt(id));

        if (!result) {
            return {
                statusCode: 404,
                response: {
                    message: 'Item not found',
                },
            };
        }
        return {
            statusCode: 200,
            response: result,
        };
    }

    async create(body: any) {
        try {
            // const wallet = await getWallet();

            // const contract = await getContract({
            //     contractData: ERC721Contract,
            //     providerOrSigner: wallet,
            // });

            // console.log('Contract', contract);

            // const mintResponse = await contract.mint(users[1].wallet);
            // console.log('Minted', mintResponse);
            // const receipt = await mintResponse.wait();

            // console.log('Recept', receipt)

            // const result = await NftsRepository.create(body)

            // console.log('Res', result)
            // return {
            //     statusCode: 200,
            //     response: {
            //         message: receipt.toString(),
            //     },
            // };

            
            const result = await NftsRepository.create(body);

            return {
                statusCode: 201,
                response: result,
            };
        } catch (error) {
            console.log('Err', error);
            return {
                statusCode: 500,
                response: error,
            };
        }
    }

    async findByOwnerAddress(address: string) {
        return {
            statusCode: 200,
            response: {
                message: 'test',
            },
        };
    }
}

export default new NftsService();
