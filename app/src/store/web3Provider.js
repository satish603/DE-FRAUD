import Portis from '@portis/web3';
import Web3 from 'web3';
import Abi from './abi'
import keccak256 from 'keccak256'
// private ganache node...
const myPrivateEthereumNode = {
    nodeUrl: 'https://public-node.testnet.rsk.co', // node url
    chainId: 31, // chainid
};

//0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e
const provider = {
    contractAddress: '0xac9c38118f05792Bf379479E3912F35d17F65819',
    buyAddress: '0xabd895468ab7c4e1d2bf80cf66d529834c68b478',
    w3: null,
    account: null,
    contract: null,
    buyContract: null,
    portis: null,
    logout:async function () {
        await this.portis.logout()
    },
    keccakHash: function (secretId) {
        const encoding = this.w3.eth.abi.encodeParameter('uint256', secretId)
        const hash = keccak256(encoding)
        return hash
    },
    login: async function () {
        await this.portis.showPortis()
        await provider.setAccount()
    },
    isLoggedIn: async function () {
        if (this.portis) {
            return await this.portis.isLoggedIn()
        }
    },
    setAccount: async function () {
        const account = await this.w3.eth.getAccounts()
        this.account = account[0]
        console.log(account);
    },

    getAccount: function () {
        return this.account
    },

    getProvider: function () {
        return this.w3;
    },

    setProvider: async function () {
        this.portis = await new Portis('1368ff81-9bd9-4ea2-b5da-3c24b3796f53', myPrivateEthereumNode);
        this.w3 = await new Web3(this.portis.provider)
    },

    setContract: async function () {
        const contract = await new this.w3.eth.Contract(Abi.counterfeitAbi, this.contractAddress);
        const side = await new this.w3.eth.Contract(Abi.buyAbi, this.buyAddress)
        this.buyContract = side
        this.contract = contract;
    },
    // for non-transaction methods ex- view pure
    callTransaction: async function (method, parameters = []) {
        try {
            const transaction = {
                from: this.account,
                to: this.contractAddress,
            }
            const result = await this.contract.methods[method](...parameters).call(transaction);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error({ message:error.message, code:204});
        }
    },

    // method for transaction that require fee....
    sendTransaction: async function (method, parameters = [], toBuy = false) {
        try {
            if (toBuy) { 
                const transaction = {
                    from: this.account,
                    to: this.buyAddress,
                    gas: 6800000,
                    gasPrice:65164000
                }
                const receipt = await this.buyContract.methods[method](...parameters).send(transaction);
                console.log(receipt);
                return receipt
            }
            else {
                const transaction = {
                    from: this.account,
                    to: this.contractAddress,
                    gas: 6800000,
                    gasPrice:65164000
                }
                const receipt = await this.contract.methods[method](...parameters).send(transaction);
                console.log(receipt);
                return receipt
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}
export default provider