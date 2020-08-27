const IconService = require('icon-sdk-js');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT;

async function getTokenSymbol() {
  try {
    const txObj = new CallBuilder().from(owner).to(bonsaiInstance).method('symbol').build();
    const symbol = await iconService.call(txObj).execute();

    console.log({ symbol });
    return symbol;
  } catch (err) {
    console.log({ err });
  }
}

getTokenSymbol();
