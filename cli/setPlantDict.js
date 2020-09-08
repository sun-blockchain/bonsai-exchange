const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;

async function setPlantDict() {
  try {
    const PLANT_STATUS = {
      PLANTED: 1,
      INSTOCK: 2,
      INSTORE: 3,
    };

    let plants = {
      'Bonsai 0': {
        id: null,
        name: 'Bonsai 0',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: 'images/chamomile4_background.png',
      },
      'Bonsai 1': {
        id: null,
        name: 'Bonsai 1',
        level: 2,
        price: 56,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/cherryblossombonsai2_background.png',
      },
      'Bonsai 2': {
        id: null,
        name: 'Bonsai 2',
        level: 3,
        price: 40,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/chineselantern2_background.png',
      },
      'Bonsai 3': {
        id: null,
        name: 'Bonsai 3',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/crocus3_background.png',
      },
      'Bonsai 4': {
        id: null,
        name: 'Bonsai 4',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/daffodils3_background.png',
      },
      'Bonsai 5': {
        id: null,
        name: 'Bonsai 5',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/dwarfjadeplant2_background.png',
      },
      'Bonsai 6': {
        id: null,
        name: 'Bonsai 6',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/dwarfpapyrus4_background.png',
      },
      'Bonsai 7': {
        id: null,
        name: 'Bonsai 7',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/easterlilycactus4_background.png',
      },
      'Bonsai 8': {
        id: null,
        name: 'Bonsai 8',
        level: 2,
        price: 56,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/flamingoflower4_background.png',
      },
      'Bonsai 9': {
        id: null,
        name: 'Bonsai 9',
        level: 3,
        price: 40,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/flamingoflower4_background.png',
      },
      'Bonsai 10': {
        id: null,
        name: 'Bonsai 10',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/freesia4_background.png',
      },
      'Bonsai 11': {
        id: null,
        name: 'Bonsai 11',
        level: 2,
        price: 30,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: 'images/chamomile4_background.png',
      },
    };

    plants = JSON.stringify(plants);
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('setPlantDict')
      .params({
        _plants: plants,
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

setPlantDict();
