# Express Ethers Cheap Marketplace REST API

Express Backend that uses Ethers.js to interact with an NFT Marketplace contract

## IMPORTANT:

In order to run this project you need to create an .env file (like the example) and provide the keys for the USER A and the USER B.

After that, you should go to the users repository in the users module folder:
- /users/infrastructure/persistence/repositories

And change the wallets in the users for the ones you will use to tests.
(I did this to simulate users interacting in the app)

In my case I create two accounts of Metamask for testing purposes, using both
the public keys (user wallets) and the private keys in the .env file.

You also should provide an ETHERSCAN_API_KEY to avoid the rate limiting
and other problems with the network.

## Stack

- Express: 4.18
- Ethers: 5.7.2 (found that v6 have many problems and is still not so well documented)

## Endpoints

- **GET**  - /api/nfts
- **POST** - /api/nfts/create
- **GET**  - /api/offers
- **GET**  - /api/offers/{id}
- **GET**  - /api/offers/create
- **GET**  - /api/offers/{id}/accept


## Installing and running
```
1. git clone
2. npm i
3. configure the env vars
4. npm start or npm run dev

```

### Notes

By default the api will run on the port 3000 if you don't provide another port in the env.

I provide a postman collection with the endpoints so you have it ready to prove, just change the needed fields.

I also added some basic e2e testings to check the basic flow and the offer validations.