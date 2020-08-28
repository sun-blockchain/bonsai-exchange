import { IconConverter } from 'icon-sdk-js';

import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

const eventHandler = (event) => {
  var type = event.detail.type;
  var payload = event.detail.payload;
  switch (type) {
    case 'RESPONSE_ADDRESS':
      dispatch(actions.setAddress(payload));
      break;
    case 'RESPONSE_JSON-RPC':
      if (payload.id === 1) {
        setBalanceOxi(IconConverter.toNumber(payload.result));
      } else if (payload.id === 2) {
        console.log('bonsai balance', payload);
      } else if (payload.id === 3) {
        console.log(payload);
      }
      break;
    default:
  }
};
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);
