import { Contract } from 'ethers';

export const getContract = (args: {
    contractData: { address: string; abi: any };
    providerOrSigner: any;
}) => {
    const { contractData, providerOrSigner } = args;
    const contract = new Contract(
        contractData.address,
        contractData.abi,
        providerOrSigner
    );

    return contract;
};
