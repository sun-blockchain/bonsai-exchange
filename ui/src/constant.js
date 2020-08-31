const PLANT_STATUS = {
  PLANTED: 1,
  INSTOCK: 2,
  INSTORE: 3,
};

Object.freeze(PLANT_STATUS);

const plantsInitDic = {
  'Bonsai 0': {
    id: 0,
    name: 'Bonsai 0',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/chamomile4_background.png',
  },
  'Bonsai 1': {
    id: 1,
    name: 'Bonsai 1',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/cherryblossombonsai2_background.png',
  },
  'Bonsai 2': {
    id: 2,
    name: 'Bonsai 2',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/chineselantern2_background.png',
  },
  'Bonsai 3': {
    id: 3,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/crocus3_background.png',
  },
  'Bonsai 4': {
    id: 4,
    name: 'Bonsai 4',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/daffodils3_background.png',
  },
  'Bonsai 5': {
    id: 5,
    name: 'Bonsai 5',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/dwarfjadeplant2_background.png',
  },
  'Bonsai 6': {
    id: 6,
    name: 'Bonsai 6',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/dwarfpapyrus4_background.png',
  },
  'Bonsai 7': {
    id: 7,
    name: 'Bonsai 7',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/easterlilycactus4_background.png',
  },
  'Bonsai 8': {
    id: 8,
    name: 'Bonsai 8',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/flamingoflower4_background.png',
  },
  'Bonsai 9': {
    id: 9,
    name: 'Bonsai 9',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/flamingoflower4_background.png',
  },
  'Bonsai 10': {
    id: 10,
    name: 'Bonsai 10',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/freesia4_background.png',
  },
  'Bonsai 11': {
    id: 11,
    name: 'Bonsai 11',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/chamomile4_background.png',
  },
};

export { plantsInitDic, PLANT_STATUS };
