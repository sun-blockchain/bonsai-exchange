const State = {
  PLANTED: 1,
  INSTOCK: 2,
  INSTORE: 3,
};

Object.freeze(State);

const plants_init = [
  {
    id: 0,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTORE,
    plant_img: 'images/chamomile4_background.png',
  },
  {
    id: 1,
    name: 'Bonsai 1',
    level: 2,
    price: 56,
    state: State.PLANTED,
    plant_img: '/images/cherryblossombonsai2_background.png',
  },
  {
    id: 2,
    name: 'Bonsai 2',
    level: 3,
    price: 40,
    state: State.INSTOCK,
    plant_img: '/images/chineselantern2_background.png',
  },
  {
    id: 3,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTOCK,
    plant_img: '/images/crocus3_background.png',
  },
  {
    id: 4,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTORE,
    plant_img: '/images/daffodils3_background.png',
  },
  {
    id: 5,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTORE,
    plant_img: '/images/dwarfjadeplant2_background.png',
  },
  {
    id: 6,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTORE,
    plant_img: '/images/dwarfpapyrus4_background.png',
  },
  {
    id: 7,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTOCK,
    plant_img: '/images/easterlilycactus4_background.png',
  },
  {
    id: 8,
    name: 'Bonsai 1',
    level: 2,
    price: 56,
    state: State.PLANTED,
    plant_img: '/images/flamingoflower4_background.png',
  },
  {
    id: 9,
    name: 'Bonsai 2',
    level: 3,
    price: 40,
    state: State.INSTOCK,
    plant_img: '/images/flamingoflower4_background.png',
  },
  {
    id: 10,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.PLANTED,
    plant_img: '/images/freesia4_background.png',
  },
  {
    id: 11,
    name: 'Bonsai 3',
    level: 2,
    price: 30,
    state: State.INSTORE,
    plant_img: 'images/chamomile4_background.png',
  },
];

export { plants_init, State };
