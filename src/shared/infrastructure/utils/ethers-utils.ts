import {
    JsonRpcProvider,
    Wallet,
    solidityPacked,
    keccak256,
    getBytes,
} from 'ethers';

const nodes = [
    'https://rpc.sepolia.org/',
    'https://rpc2.sepolia.org/ ',
    'https://rpc-sepolia.rockx.com/',
];

// function wait(ms: number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true)
//     }, ms)
//   })
// }

// async function retryRPCPromiseWithDelay(promise: any, retriesLeft: number, delay: any) {
//   try {
//     const data = await promise

//     return data
//   } catch (error) {
//     if (retriesLeft === 0) {
//       return Promise.reject(error)
//     }
//     console.log(`${retriesLeft} retries left`)
//     await wait(delay)
//     return retryRPCPromiseWithDelay(promise, retriesLeft - 1, 1000)
//   }
// }





export const getProvider = async () =>
    new JsonRpcProvider('https://rpc.sepolia.org/', 11155111, {
        batchMaxCount: 1,
    });





export const getWallet = async () =>
    new Wallet(<string>process.env.PRIVATE_KEY, await getProvider());

export const getAddressBalance = async (address: string) => {
    const provider = await getProvider();
    return await provider.getBalance(address);
};

export const getSignatures = async (auctionData: any) => {
    const packedBid = solidityPacked(
        ['address', 'address', 'uint256', 'uint256'],
        [
            auctionData.collectionAddress,
            auctionData.erc20Address,
            auctionData.tokenId,
            auctionData.bid,
        ]
    );
    const provider = await getProvider();

    // buyer
    const buyerKey = process.env.BUYER_KEY;
    const buyerWallet = new Wallet(buyerKey as string, provider);

    const buyerHash = keccak256(packedBid);
    const buyerSignature = await buyerWallet.signMessage(getBytes(buyerHash));

    // Owner
    const ownerPrivateKey = process.env.PRIVATE_KEY as string;
    const ownerWallet = new Wallet(ownerPrivateKey, provider);

    const hashedbuyerSig = keccak256(getBytes(buyerSignature));
    const ownerSignature = await ownerWallet.signMessage(
        getBytes(hashedbuyerSig)
    );

    return {
        buyerSignature,
        ownerSignature
    }
};
