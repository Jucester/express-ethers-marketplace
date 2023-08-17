import { z } from 'zod';
import { UserEntity } from '../../../users/domain/entities/user.entity';

export enum OfferStatus {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected',
}

export const OfferStatusEnum = z.nativeEnum(OfferStatus);

export const offerSchema = z.object({
    id: z.string(),
    buyerId: z.string(),
    tokenId: z.number(),
    amount: z.number(),
    buyerAddress: z.string(),
    status: OfferStatusEnum.optional().default(OfferStatus.Pending),
});

export type Offer = z.infer<typeof offerSchema>;
