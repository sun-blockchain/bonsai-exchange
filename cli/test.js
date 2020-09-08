const PLANT_STATUS = {
  PLANTED: 1,
  INSTOCK: 2,
  INSTORE: 3,
};

const plantsInitDic = {
  'Bonsai 0': {
    id: null,
    name: 'Chamomile',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/chamomile5_background.png',
  },
  'Bonsai 1': {
    id: null,
    name: 'Cherry Blossom',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/cherryblossombonsai4_background.png',
  },
  'Bonsai 2': {
    id: null,
    name: 'Chinese Lantern',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/chineselantern4_background.png',
  },
  'Bonsai 3': {
    id: null,
    name: 'Japan Maple',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/japanesemaplebonsai5_background.png',
  },
  'Bonsai 4': {
    id: null,
    name: 'Bell Pepper',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/bellpeppers5_background.png',
  },
  'Bonsai 5': {
    id: null,
    name: 'Forget Menot',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/forgetmenot5_background.png',
  },
  'Bonsai 6': {
    id: null,
    name: 'Peony',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/peonies5_background.png',
  },
  'Bonsai 7': {
    id: null,
    name: 'Crocus',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/crocus4_background.png',
  },
  'Bonsai 8': {
    id: null,
    name: 'Flamingo',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/flamingoflower5_background.png',
  },
  'Bonsai 9': {
    id: null,
    name: 'Carnation',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/carnation5_background.png',
  },
  'Bonsai 10': {
    id: null,
    name: 'Lily',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/lilyoftheincas5_background.png',
  },
  'Bonsai 11': {
    id: null,
    name: 'Amaryllis',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/amaryllis5_background.png',
  },
};

const packageOxyForSale = [
  {
    name: 'Bronze Package',
    price: 1,
    oxy: 10,
    plantImg: 'images/10oxy.png',
  },
  {
    name: 'Silver Package',
    price: 9,
    oxy: 100,
    plantImg: 'images/100oxy.png',
  },
  {
    name: 'Gold Package',
    price: 80,
    oxy: 1000,
    plantImg: 'images/1000oxy.png',
  },
];

console.log(JSON.stringify(plantsInitDic));
