import { z } from 'zod';

export enum SaleStatus {
    NotForSale = 'notForSale',
    Auction = 'auction',
    FixedPrice = 'fixedPrice',
}

export const SaleStatusEnum = z.nativeEnum(SaleStatus);


export const nftSchema = z.object({
    ownerId: z.string(),
    collectionAddress: z.string(),
    erc20Address: z.string(),
    tokenId: z.number(),
    baseOrSellPrice: z.number(),
    status: SaleStatusEnum,
});

export type Nft = z.infer<typeof nftSchema>;
