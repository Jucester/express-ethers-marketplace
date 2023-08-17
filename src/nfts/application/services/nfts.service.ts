import NftsRepository from '../../infrastructure/persistence/repositories/nfts.repository';
import { IService } from '../../../shared/domain/interfaces/IService';

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
            // const provider = getProvider();
            // const wallet = getWallet(provider);

            // const contract = getContract({
            //     contractData: ERC721Contract,
            //     providerOrSigner: wallet,
            // });

            // const mintResponse = await contract.mint(users[0].wallet);
            // const receipt = await mintResponse.wait();

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
