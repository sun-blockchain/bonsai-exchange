import IconService, {
  HttpProvider,
  IconWallet,
  SignedTransaction,
  IconConverter,
  IconBuilder,
  IconAmount,
} from 'icon-sdk-js';

const provider = new HttpProvider(process.env.REACT_APP_API_ENPOINT);
const iconService = new IconService(provider);
const wallet = IconWallet.loadPrivateKey(process.env.REACT_APP_PRIVATE_KEY);

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
      .method('getListBonsaiNameByAddress')
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

// airdrop 30 oxigen for first-time users play
export const airDropOxyIcon = async (address) => {
  const wallet = IconWallet.loadPrivateKey(process.env.REACT_APP_PRIVATE_KEY);

  try {
    const txObj = new IconBuilder.CallTransactionBuilder()
      .from(process.env.REACT_APP_OWNER)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('airDrop')
      .params({
        _address: address,
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    return txHash;
  } catch (err) {
    console.log({ err });
  }
};

// transfer oxy to buy bonsai
export const transferOxytoBuyBonsai = async (address, item) => {
  if (address) {
    try {
      const txObj = new IconBuilder.CallTransactionBuilder()
        .from(address)
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
        .stepLimit(IconConverter.toBigNumber('2000000'))
        .nid(IconConverter.toBigNumber('3'))
        .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
        .version(IconConverter.toBigNumber('3'))
        .timestamp(new Date().getTime() * 1000)
        .method('transfer')
        .params({
          _to: process.env.REACT_APP_OWNER,
          _value: IconConverter.toHex(item.price),
        })
        .build();
      const requestBuyBonsai = JSON.stringify({
        jsonrpc: '2.0',
        method: 'icx_sendTransaction',
        params: IconConverter.toRawTransaction(txObj),
        id: 1,
      });
      window.dispatchEvent(
        new CustomEvent('ICONEX_RELAY_REQUEST', {
          detail: {
            type: 'REQUEST_JSON-RPC',
            payload: JSON.parse(requestBuyBonsai),
          },
        })
      );
      localStorage.setItem('BonsaiBuying', JSON.stringify(item));
    } catch (err) {
      console.log({ err });
    }
  } else {
    alert('Select the ICX Address');
  }
};

// mint bonsai after transfer oxy successfully
export const mintBonsai = async (address, item) => {
  try {
    const txObjMintBonsai = new IconBuilder.CallTransactionBuilder()
      .from(process.env.REACT_APP_OWNER)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('mint')
      .params({
        _to: address,
        _price: IconConverter.toHex(item.price),
        _tokenName: item.name,
      })
      .build();
    const signedTransaction = new SignedTransaction(txObjMintBonsai, wallet);
    await iconService.sendTransaction(signedTransaction).execute();
  } catch (err) {
    console.log({ err });
  }
};

// get transaction result success or not
export const isTxSuccess = async (txHash) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const txObject = await iconService.getTransactionResult(txHash).execute();
      if (txObject['status'] === 1) {
        resolve(true);
      } else return resolve(false);
    }, 5000);
  });
};

// is newbie
export const isNewbie = async (address) => {
  try {
    const txObj = new IconBuilder.CallBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .method('getAirDrop')
      .build();

    let result = await iconService.call(txObj).execute();

    if (result === '0x1') return false;
    else return true;
  } catch (err) {
    console.log({ err });
  }
};

export const receiveOxygen = async (address, numBonsais) => {
  try {
    const txObj = new IconBuilder.CallTransactionBuilder()
      .from(process.env.REACT_APP_OWNER)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('receiveOxygen')
      .params({
        _to: address,
        _countBonsai: IconConverter.toHex(numBonsais),
      })
      .build();
    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();
    setTimeout(async () => {
      await iconService.getTransactionResult(txHash).execute();
    }, 5000);
    await getRemainingTimeReceiveOxy(address);
  } catch (err) {
    console.log({ err });
  }
};

export const getRemainingTimeReceiveOxy = async (address) => {
  try {
    const txObj = new IconBuilder.CallBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .method('timeToNextReceiveOxy')
      .params({
        _address: address,
      })
      .build();

    let balance = await iconService.call(txObj).execute();
    console.log(convertHexToDec(balance));
  } catch (err) {
    console.log({ err });
  }
};

export const buyOxygenWithICX = async (address, numOxy) => {
  try {
    let icx = 0;
    if (numOxy === 10) {
      icx = 1;
    } else if (numOxy === 100) {
      icx = 9;
    } else if (numOxy === 1000) {
      icx = 80;
    }

    const txObj = new IconBuilder.CallTransactionBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
      .value(IconAmount.of(icx, IconAmount.Unit.ICX).toLoop())
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('buyOxygenWithICX')
      .build();

    const requestBuyOxy = JSON.stringify({
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: IconConverter.toRawTransaction(txObj),
      id: 2,
    });
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: 'REQUEST_JSON-RPC',
          payload: JSON.parse(requestBuyOxy),
        },
      })
    );
  } catch (err) {
    console.log({ err });
  }
};
