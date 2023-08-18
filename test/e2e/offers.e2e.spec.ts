import request from 'supertest';
import { App } from '../../src/app';
import exp from 'constants';
import { users } from '../../src/users/infrastructure/persistence/repositories/users.repository';

jest.setTimeout(50000);

describe('Offers Routes', () => {
    let app: any;
    let url: string;

    beforeAll(async () => {
        app = new App('5000', 'TEST');
        url = 'http://localhost:5000/api';
        app.listen();
    });

    it('GET /api/offers should return an array of offers', async () => {
        const { body } = await request(url).get(`/offers`).expect(200);

        const { response } = body;

        expect(Array.isArray(response));
    });

    it('GET /api/offers/:id should return a specific offer', async () => {
        const { body } = await request(url)
            .get(`/offers/f20a509c-3344-49c5-9166-6001d1e2ebbb`)
            .expect(200);
        const { response } = body;

        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('tokenId');
        expect(response).toHaveProperty('amount');
        expect(response).toHaveProperty('buyerId');
        expect(response).toHaveProperty('status');
    });

    it("GET /api/offers/:id should return 404 if NFT doesn't exists", async () => {
        const { body } = await request(url).get(`/offers/4000`).expect(404);

        expect(body.response.message).toBe('Item not found');
    });

    it('POST /api/offers/create should return error if the nft of the offer does not exists', async () => {
        const offerData = {
            id: 'f20a509c-3344-49c5-9166-6001d1e2ebbb',
            tokenId: 500,
            amount: 0.02,
            buyerId: users[1].id,
            buyerAddress: users[1].wallet,
        };

        const { body } = await request(url)
            .post('/offers/create')
            .send(offerData)
            .expect(400);

        expect(body.response.message).toBe('Item not found');
    });

    it('POST /api/offers/create should return error if the nft is not for sale', async () => {
        const offerData = {
            id: 'f20a509c-3344-49c5-9166-6001d1e2ebbb',
            tokenId: 128,
            amount: 0.02,
            buyerId: users[1].id,
            buyerAddress: users[1].wallet,
        };

        const { body } = await request(url)
            .post('/offers/create')
            .send(offerData)
            .expect(400);

        expect(body.response.message).toBe('NFT not for sale');
    });

    it('POST /api/offers/create should return error if the offer amount is less than the current price of the nft', async () => {
        const offerData = {
            id: 'f20a509c-3344-49c5-9166-6001d1e2ebbb',
            tokenId: 129,
            amount: 0.0005,
            buyerId: users[1].id,
            buyerAddress: users[1].wallet,
        };

        const { body } = await request(url)
            .post('/offers/create')
            .send(offerData)
            .expect(400);

        expect(body.response.message).toBe(
            'The amount is less than the current price'
        );
    });

    it("POST /api/offers/create should return error if user don't have enough funds to make the offer", async () => {
        const offerData = {
            id: 'f20a509c-3344-49c5-9166-6001d1e2ebbb',
            tokenId: 129,
            amount: 10,
            buyerId: users[1].id,
            buyerAddress: users[1].wallet,
        };

        const { body } = await request(url)
            .post('/offers/create')
            .send(offerData)
            .expect(400);

        expect(body.response.message).toBe('Insufficient funds');
    });

    it('POST /api/offers/create should create a new offer if everything is correct', async () => {
        const offerData = {
            id: 'f20a509c-3344-49c5-9166-6001d1e2ebbc',
            tokenId: 129,
            amount: 0.2,
            buyerId: users[1].id,
            buyerAddress: users[1].wallet,
        };

        const { body } = await request(url)
            .post('/offers/create')
            .send(offerData)
            .expect(201);

        expect(body.response.id).toBe(offerData.id);
        expect(body.response.buyerId).toBe(offerData.buyerId);
        expect(body.response.buyerAddress).toBe(offerData.buyerAddress);
        expect(body.response.amount).toBe(offerData.amount);
        expect(body.response.status).toBe('pending');
    });
});
