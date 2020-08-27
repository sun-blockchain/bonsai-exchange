const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder, CallBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT;
const account = argv.address;

async function mintToken() {
  try {
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber('1'))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('mint')
      .params({
        _to: owner,
        _tokenId: IconConverter.toHex('2'),
      })
      .build();

    //const result = await iconService.call(txObj).execute();
    const signedTransaction = new SignedTransaction(txObj, wallet);

    /* Send transaction. It returns transaction hash. */
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

console.log(IconConverter.toHex(2));
console.log(IconConverter.toHex('2'));

//mintToken();
//callScore();
