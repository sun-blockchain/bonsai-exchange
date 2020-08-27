const IconService = require('icon-sdk-js');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT;

async function getTokenName() {
  try {
    const txObj = new CallBuilder().from(owner).to(bonsaiInstance).method('name').build();
    const name = await iconService.call(txObj).execute();

    console.log({ name });
    return name;
  } catch (err) {
    console.log({ err });
  }
}

getTokenName();
