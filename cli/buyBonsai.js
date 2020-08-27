const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const {
  IconWallet,
  HttpProvider,
  SignedTransaction,
  IconBuilder,
  IconConverter,
  IconAmount,
} = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT;
const amount = parseInt(argv.amount);

async function buy() {
  try {
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .value(IconAmount.of(amount, IconAmount.Unit.ICX).toLoop())
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber('1'))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('createBonsai')
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

buy();
