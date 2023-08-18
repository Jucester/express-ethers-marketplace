import { Nft, SaleStatusEnum } from '../../../domain/entities/nft.entity';
import { users } from '../../../../users/infrastructure/persistence/repositories/users.repository';

export let nfts: Nft[] = [
    {
        ownerId: users[1].id,
        collectionAddress: '0xFCE9b92eC11680898c7FE57C4dDCea83AeabA3ff',
        tokenId: 128,
        status: SaleStatusEnum.parse('notForSale'),
        erc20Address: '0xbd65c58D6F46d5c682Bf2f36306D461e3561C747',
        baseOrSellPrice: 0.01,
    },
    {
        ownerId: users[1].id,
        collectionAddress: '0xFCE9b92eC11680898c7FE57C4dDCea83AeabA3ff',
        tokenId: 129,
        status: SaleStatusEnum.parse('auction'),
        erc20Address: '0xbd65c58D6F46d5c682Bf2f36306D461e3561C747',
        baseOrSellPrice: 0.01,
    },
    {
        ownerId: users[1].id,
        collectionAddress: '0xFCE9b92eC11680898c7FE57C4dDCea83AeabA3ff',
        tokenId: 130,
        status: SaleStatusEnum.parse('auction'),
        erc20Address: '0xbd65c58D6F46d5c682Bf2f36306D461e3561C747',
        baseOrSellPrice: 0.0001,
    },
    {
        ownerId: users[0].id,
        collectionAddress: '0xFCE9b92eC11680898c7FE57C4dDCea83AeabA3ff',
        tokenId: 131,
        status: SaleStatusEnum.parse('fixedPrice'),
        erc20Address: '0xbd65c58D6F46d5c682Bf2f36306D461e3561C747',
        baseOrSellPrice: 0.01,
    },
    {
        ownerId: users[0].id,
        collectionAddress: '0xFCE9b92eC11680898c7FE57C4dDCea83AeabA3ff',
        tokenId: 132,
        status: SaleStatusEnum.parse('fixedPrice'),
        erc20Address: '0xbd65c58D6F46d5c682Bf2f36306D461e3561C747',
        baseOrSellPrice: 0.01,
    },
];

class NftsRepository {
    findAll(params: { query: any }) {
        const { query } = params;

        if (query.ownerId) {
            return nfts.filter((nft) => nft.ownerId === query.ownerId);
        }

        return nfts;
    }

    findById(id: number) {
        return nfts.find((nft) => nft.tokenId === id);
    }

    create(nft: Nft) {
        nfts.push(nft);

        return nft;
    }

    deleteById(id: number) {
        const filteredNfts = nfts.filter((nft) => nft.tokenId !== id);
        nfts = filteredNfts;
    }
}

export default new NftsRepository();
