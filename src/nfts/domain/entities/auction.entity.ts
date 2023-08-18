import z from 'zod';

export const AuctionSchema = z.object({
    collectionAddress: z.string(),
    erc20Address: z.string(),
    tokenId: z.number(),
    bid: z.any(),
});

export type Auction = z.infer<typeof AuctionSchema>;
