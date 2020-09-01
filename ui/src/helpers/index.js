import IconService, { HttpProvider, IconAmount, IconConverter, IconBuilder } from 'icon-sdk-js';

const provider = new HttpProvider(process.env.REACT_APP_API_ENPOINT);
const iconService = new IconService(provider);

export const convertHexToDec = (hex_amount) => {
  return IconConverter.toNumber(hex_amount);
};

// get balance native token
export const getBalanceIcon = async (address) => {
  return await iconService.getBalance(address).execute();
};

// get balance erc-20
export const getBalanceOxyIcon = async (address) => {
  try {
    const txObj = new IconBuilder.CallBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .method('balanceOf')
      .params({
        _owner: address,
      })
      .build();

    let balance = await iconService.call(txObj).execute();
    balance = parseInt(balance);
    return balance;
  } catch (err) {
    console.log({ err });
    return -1;
  }
};

// get balance erc-721
export const getBalanceBonsaiIcon = async (address) => {
  try {
    const txObjBonsaiId = new IconBuilder.CallBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
      .method('getListBonsaiName')
      .params({
        _address: address,
      })
      .build();
    let bonsaiNames = await iconService.call(txObjBonsaiId).execute();

    return bonsaiNames;
  } catch (err) {
    console.log({ err });
    // return -1 when error
    return -1;
  }
};

// buy bonsai
export const buyBonsaiIcon = async (address, item, props) => {
  if (address) {
    const txObjBuyBonsai = new IconBuilder.CallTransactionBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
      .value(IconAmount.of(item.price, IconAmount.Unit.ICX).toLoop())
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('createBonsai')
      .params({
        _tokenName: item.name,
      })
      .build();

    const requestBuyBonsai = JSON.stringify({
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: IconConverter.toRawTransaction(txObjBuyBonsai),
      id: 3,
    });
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: 'REQUEST_JSON-RPC',
          payload: JSON.parse(requestBuyBonsai),
        },
      })
    );
    props.onClose();
  } else {
    alert('Select the ICX Address');
  }
};
