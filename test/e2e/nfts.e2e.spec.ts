import request from 'supertest';
import { App } from '../../src/app';

describe('NFTs Routes', () => {
    let app: any;
    let url: string;

    beforeAll(async () => {
        app = new App('5000', 'TEST');
        url = 'http://localhost:5000/api';
        app.listen();
    });

    it('GET /api/nfts should return an array of NFTs Listing', async () => {
        const { body } = await request(url).get(`/nfts`).expect(200);

        const { response } = body;

        expect(Array.isArray(response));
    });

    it('GET /api/nfts/:id should return a specific NFT listing', async () => {
        const tokenId = 128;
        const { body: response }  = await request(url).get(`/nfts/${tokenId}`).expect(200);


        expect(response).toHaveProperty('ownerId');
        expect(response).toHaveProperty('collectionAddress');
        expect(response).toHaveProperty('erc20Address');
        expect(response).toHaveProperty('tokenId');
        expect(response).toHaveProperty('baseOrSellPrice');
        expect(response).toHaveProperty('status');
    });

    it('GET /api/nfts/:id should return 404 if NFT doesn\'t exists', async () => {
        const tokenId = 2211;
        const { body: response } = await request(url).get(`/nfts/${tokenId}`).expect(404);

        expect(response.message).toBe('Item not found');
    });

    it('POST /api/nfts/create should create a new NFT listing', async () => {
        const nftData = {
            ownerId: 4,
            collectionAddress: '0x123456789',
            erc20Address: '0x987654321',
            tokenId: 123,
            baseOrSellPrice: 100,
            status: 'fixedPrice',
        };

        const { body: response } = await request(url)
            .post('/nfts/create')
            .send(nftData)
            .expect(201);

        expect(response.ownerId).toBe(nftData.ownerId);
        expect(response.collectionAddress).toBe(nftData.collectionAddress);
        expect(response.erc20Address).toBe(nftData.erc20Address);
        expect(response.tokenId).toBe(nftData.tokenId);
        expect(response.baseOrSellPrice).toBe(nftData.baseOrSellPrice);
        expect(response.status).toBe(nftData.status);
    });

    it('POST /api/nfts/create should return error if bad or incomplete data is provided', async () => {
        const nftData = {
            erc20Address: '0x987654321',
            baseOrSellPrice: 100,
            status: 'fixedPrice',
        };

        const { body } = await request(url)
            .post('/nfts/create')
            .send(nftData)
            .expect(400);

        const { response } = body;

        expect(response.name).toBe('ZodError');
    });
});
