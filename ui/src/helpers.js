import { IconAmount } from 'icon-sdk-js';

export const convertHexToDec = (hex_amount) => {
  return IconAmount.of(hex_amount, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value
    .c[0];
};
