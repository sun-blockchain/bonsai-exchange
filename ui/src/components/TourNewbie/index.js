import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { isNewbie } from 'helpers';

import './index.css';

export default function TourNewbie() {
  const address = useSelector((state) => state.walletAddress);
  const tourStep = useSelector((state) => state.tourStep);

  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    const main = async () => {
      if (address === null) {
        setIsTourOpen(true);
      } else {
        const newbie = await isNewbie(address);
        if (!newbie) setIsTourOpen(false);
      }
    };

    main();
  }, [address]);

  useEffect(() => {
    const main = async () => {
      if (tourStep === 100) {
        setIsTourOpen(false);
      } else setIsTourOpen(true);
    };

    main();
  }, [tourStep]);

  const steps = [
    {
      selector: '.connect-wallet',
      content: ({ goTo }) => (
        <div>
          {/* if tourStep === 100 close tour */}
          {tourStep === 0 ? 'Connect your wallet to app' : tourStep === 1 ? goTo(1) : <></>}
        </div>
      ),
    },
    {
      selector: '.connect-wallet',
      content: 'We give you 30 oxygen to get you started',
    },
    {
      selector: '.buy-bonsai',
      content: ({ goTo }) => (
        <div>
          {/* if tourStep === 100 close tour */}
          {tourStep === 2 ? goTo(3) : `Let's buy a bonsai`}
        </div>
      ),
    },
    {
      selector: '.first-bonsai',
      content: `Buy it `,
    },
  ];

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  return (
    <>
      {/* Tour instructions for beginners */}
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        maskClassName='mask'
        className='helper'
        accentColor='#5cb7b7'
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
      />
    </>
  );
}