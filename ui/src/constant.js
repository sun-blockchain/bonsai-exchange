const PLANT_STATUS = {
  PLANTED: 1,
  INSTOCK: 2,
  INSTORE: 3,
};

Object.freeze(PLANT_STATUS);

const plants_init = [
  {
    id: 0,
    name: 'Bonsai 0',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/chamomile4_background.png',
  },
  {
    id: 1,
    name: 'Bonsai 1',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.PLANTED,
    plantImg: '/images/cherryblossombonsai2_background.png',
  },
  {
    id: 2,
    name: 'Bonsai 2',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTOCK,
    plantImg: '/images/chineselantern2_background.png',
  },
  {
    id: 3,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTOCK,
    plantImg: '/images/crocus3_background.png',
  },
  {
    id: 4,
    name: 'Bonsai 4',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/daffodils3_background.png',
  },
  {
    id: 5,
    name: 'Bonsai 5',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/dwarfjadeplant2_background.png',
  },
  {
    id: 6,
    name: 'Bonsai 6',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: '/images/dwarfpapyrus4_background.png',
  },
  {
    id: 7,
    name: 'Bonsai 7',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTOCK,
    plantImg: '/images/easterlilycactus4_background.png',
  },
  {
    id: 8,
    name: 'Bonsai 8',
    level: 2,
    price: 56,
    plantStatus: PLANT_STATUS.PLANTED,
    plantImg: '/images/flamingoflower4_background.png',
  },
  {
    id: 9,
    name: 'Bonsai 9',
    level: 3,
    price: 40,
    plantStatus: PLANT_STATUS.INSTOCK,
    plantImg: '/images/flamingoflower4_background.png',
  },
  {
    id: 10,
    name: 'Bonsai 10',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.PLANTED,
    plantImg: '/images/freesia4_background.png',
  },
  {
    id: 11,
    name: 'Bonsai 11',
    level: 2,
    price: 30,
    plantStatus: PLANT_STATUS.INSTORE,
    plantImg: 'images/chamomile4_background.png',
  },
];

export { plants_init, PLANT_STATUS };
