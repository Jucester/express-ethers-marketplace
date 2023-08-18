import NftsRepository from '../../infrastructure/persistence/repositories/nfts.repository';
import { IService } from '../../../shared/domain/interfaces/IService';
import {
    getProvider,
    getWallet,
} from '../../../shared/infrastructure/utils/ethers-utils';
import { getContract } from '../../../shared/infrastructure/utils/contract-utils';
import { ERC721Contract } from '../../../shared/infrastructure/contracts/erc721-contract';
import { users } from '../../../users/infrastructure/persistence/repositories/users.repository';
import { FormatResponse } from '../../../shared/infrastructure/utils/format-response';
import { Nft } from '../../domain/entities/nft.entity';

class NftsService {
    async findAll(params: { query: Record<string, any> }) {
        const { query } = params;
        const result = await NftsRepository.findAll({ query });

        return FormatResponse({ statusCode: 200, response: result });
    }

    async findById(id: string) {
        const result = await NftsRepository.findById(parseInt(id));

        if (!result) {
            return FormatResponse({
                statusCode: 404,
                customMessage: 'Item not found',
            });
        }

        return FormatResponse({ statusCode: 200, response: result });
    }

    async create(body: Nft) {
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

            return FormatResponse({ statusCode: 201, response: result });
        } catch (error) {
            console.log('Err', error);
            return FormatResponse({ statusCode: 500, response: { error } });
        }
    }
}

export default new NftsService();
