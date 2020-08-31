import { IconConverter } from 'icon-sdk-js';

export const convertHexToDec = (hex_amount) => {
  return IconConverter.toNumber(hex_amount);
};
