import OffersRepository from '../../infrastructure/persistence/repositories/offers.repository';
import NftsRepository from '../../infrastructure/persistence/repositories/nfts.repository';
import { IService } from '../../../shared/domain/interfaces/IService';
import { MarketplaceContract } from '../../../shared/infrastructure/contracts/marketplace-contract';
import {
    getAddressBalance,
    getWallet,
    getSignatures,
    getProvider,
} from '../../../shared/infrastructure/utils/ethers-utils';
import { getContract } from '../../../shared/infrastructure/utils/contract-utils';
import IResponse from '../../../shared/domain/interfaces/IResponse';
import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { Nft, SaleStatus } from '../../domain/entities/nft.entity';
import { parseEther } from 'ethers';
import { ERC721Contract } from '../../../shared/infrastructure/contracts/erc721-contract';
import { ERC20Contract } from '../../../shared/infrastructure/contracts/erc20-contract';

class OffersService implements IService {
    private async finishOffer(args: any) {
        const { amount, nft } = args;
        const { tokenId, collectionAddress, erc20Address } = nft;

        const wallet = await getWallet();
        const marketplaceContractInstance = await getContract({
            contractData: MarketplaceContract,
            providerOrSigner: wallet,
        });

        const bid = parseEther(amount.toString());

        const offer = {
            tokenId,
            erc20Address,
            collectionAddress,
            bid,
        };

        const signatures = await getSignatures(offer);

        const auction = await marketplaceContractInstance.finishAuction(
            offer,
            signatures.buyerSignature,
            signatures.ownerSignature
        );

        const recepit = await auction.wait();

        return recepit;
    }

    private async validateTransfer(args: any) {
        const { tokenId, buyerAddress, amount } = args;
        const provider = await getProvider();
        const erc721ContractInstance = await getContract({
            contractData: ERC721Contract,
            providerOrSigner: provider,
        });

        // Check if the buyer still have the nft
        const owner = await erc721ContractInstance.ownerOf(tokenId);

        if (!owner) {
            return {
                statusCode: 400,
                response: {
                    error: 'Invalid Offer. This NFT have another owner.',
                },
            };
        }

        // Validate if the NFT can be transfered
        const approvedToTransfer = await erc721ContractInstance.getApproved(
            tokenId
        );
        const validTransfer =
            MarketplaceContract.address === approvedToTransfer;

        if (!validTransfer) {
            return {
                statusCode: 400,
                response: {
                    error: 'This NFT is not approved to be transfer in this marketplace.',
                },
            };
        }

        // Check allowance and all related to the ERC20
        const erc20ContractInstance = await getContract({
            contractData: ERC20Contract,
            providerOrSigner: provider,
        });

        const allowance = await erc20ContractInstance.allowance(
            buyerAddress,
            MarketplaceContract.address
        );

        const validateAllowance = allowance > parseEther(amount.toString());

        if (!validateAllowance) {
            return {
                statusCode: 400,
                response: {
                    error: 'Insufficient ERC20 Allowance to be transfer in this marketplace.',
                },
            };
        }
    }

    private async offerAccepted(nft: Nft, payload: Offer) {
        const validation = await this.validateTransfer({
            tokenId: payload.tokenId,
            amount: payload.amount,
            buyerAddress: payload.buyerAddress,
        });

        if (validation && validation.statusCode === 400) {
            return validation;
        }

        const offerApprovedReceipt = await this.finishOffer({
            nft,
            amount: payload.amount,
        });

        await OffersRepository.updateById(payload.id, {
            ...payload,
            status: OfferStatus.Accepted,
        });

        return {
            statusCode: 200,
            response: offerApprovedReceipt,
        };
    }

    async findAll(params: { status: string }) {
        const result = await OffersRepository.findAll(params);

        return {
            statusCode: 200,
            response: result,
        };
    }

    async findById(id: string): Promise<IResponse> {
        const result = OffersRepository.findById(id);

        if (!result) {
            return {
                statusCode: 404,
                response: {
                    message: 'Item not found',
                },
            };
        }

        return {
            statusCode: 200,
            response: result,
        };
    }

    async create(body: any) {
        try {
            // Validate if the nft exists
            const nft = await NftsRepository.findById(body.tokenId);

            if (!nft) {
                return {
                    statusCode: 400,
                    response: {
                        message: 'Item not found',
                    },
                };
            }

            // Valida if nft is for sale
            if (nft.status === SaleStatus.NotForSale) {
                return {
                    statusCode: 400,
                    response: {
                        message: 'This NFT Is not for Sale',
                    },
                };
            }

            // Validate if the offer amount is greater than the current bid or the same as the fixed price
            const offerAmount = parseEther(body.amount.toString());
            const nftPrice = parseEther(nft.baseOrSellPrice.toString());
            if (offerAmount < nftPrice) {
                return {
                    statusCode: 400,
                    response: {
                        message: 'The amount is less than the current price',
                    },
                };
            }

            // Validate if the buyer have enough balance to buy the nft
            const buyerBalance = await getAddressBalance(body.buyerAddress);
            if (buyerBalance < offerAmount) {
                return {
                    statusCode: 400,
                    response: {
                        message:
                            "You don't have enough funds to make this offer",
                    },
                };
            }

            // If everything is good, create the offer
            const result = await OffersRepository.create({
                ...body,
                status: 'pending',
            });

            return {
                statusCode: 201,
                response: result,
            };
        } catch (error) {
            console.log('Err', error);
            return {
                statusCode: 500,
                response: error,
            };
        }
    }

    async updateById(id: string, payload: any) {
        try {
            const { response } = await this.findById(id);

            const result = await NftsRepository.findById(response.tokenId);

            if (!result)
                return {
                    statusCode: 200,
                    response: {
                        message: 'Nft not found'
                    },
                };

            // If the offer is accepted, procceed to execute the finish auction in the Marketplace Contract
            if (payload.status === OfferStatus.Accepted) {
                return await this.offerAccepted(result, response);
            }

            const updatedOffer = await OffersRepository.updateById(id, {
                ...payload,
            });

            return {
                statusCode: 200,
                response: updatedOffer,
            };
        } catch (error) {
            console.log('Error =>', error);
            return {
                statusCode: 500,
                response: error,
            };
        }
    }
}

export default new OffersService();
