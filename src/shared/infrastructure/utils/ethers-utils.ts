import {
    getDefaultProvider,
    Wallet,
    utils,
} from 'ethers';

// export const getProvider = async () =>
//     new providers.JsonRpcProvider('https://rpc.sepolia.org/', 11155111);

export const getProvider = async () => {
    const provider = await getDefaultProvider('sepolia', {
        etherscan: process.env.ETHERSCAN_API_KEY
    });

    return provider;
};

export const getWallet = async () =>
    new Wallet(<string>process.env.PRIVATE_KEY, await getProvider());

export const getAddressBalance = async (address: string) => {
    const provider = await getProvider();
    return await provider.getBalance(address);
};

export const getSignatures = async (auctionData: any) => {
    const packedBid = utils.solidityPack(
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

    const buyerHash = utils.keccak256(packedBid);
    const buyerSignature = await buyerWallet.signMessage(utils.arrayify(buyerHash));

    // Owner
    const ownerPrivateKey = process.env.PRIVATE_KEY as string;
    const ownerWallet = new Wallet(ownerPrivateKey, provider);

    const hashedbuyerSig = utils.keccak256(utils.arrayify(buyerSignature));
    const ownerSignature = await ownerWallet.signMessage(
        utils.arrayify(hashedbuyerSig)
    );

    return {
        buyerSignature,
        ownerSignature
    };
};
