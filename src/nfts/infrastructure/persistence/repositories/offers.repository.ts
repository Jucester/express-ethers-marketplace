import { users } from '../../../../users/infrastructure/persistence/repositories/users.repository';
import { Offer, OfferStatusEnum } from '../../../domain/entities/offer.entity';
import { v4 } from 'uuid';

let offers: Offer[] = [
    {
        id: 'f20a509c-3344-49c5-9166-6001d1e2ebbb',
        tokenId: 128,
        amount: 0.02,
        buyerId: users[1].id,
        buyerAddress: users[1].wallet,
        status: OfferStatusEnum.parse('pending'),
    },
    {
        id: 'f20a509c-3344-49c5-9166-6001d1e2ebbc',
        tokenId: 129,
        amount: 0.012,
        buyerId: '00bd0c74-2eff-42c0-a9eb-261bcad1b3ea',
        buyerAddress: '0xcE7107ec6EDa6027c7757826a5De4F98c1278905',
        status: OfferStatusEnum.parse('pending'),
    },
    {
        id: 'f20a509c-3344-49c5-9166-6001d1e2ebbd',
        tokenId: 130,
        amount: 0.012,
        buyerId: '4d717326-ea6a-46dc-a57a-77c70fe692af',
        buyerAddress: '0xE5754D48EBb64F9C5afb63db6bedfE7e46e72Faf',
        status: OfferStatusEnum.parse('pending'),
    },
];

class OffersRepository {
    findAll(params: { status: string }) {
        const { status } = params;

        if (status) {
            return offers.filter((offer) => offer.status === status);
        }

        return offers;
    }

    create(body: any) {
        const offer = {
            id: v4(),
            ...body,
        };

        offers.push(offer);

        return offer;
    }

    findById(id: string) {
        return offers.find((offer) => offer.id === id);
    }

    updateById(id: string, payload: any) {
        const offer = offers.findIndex((obj) => obj.id === id);

        offers[offer].status = payload.status;

        return offers[offer];
    }

    deleteById(id: string) {
        const filterOffers = offers.filter((offer) => offer.id !== id);
        offers = filterOffers;
        return;
    }

    findOffersByNft(tokenId: number) {
        return offers.filter((offer) => offer.tokenId === tokenId);
    }
}

export default new OffersRepository();
