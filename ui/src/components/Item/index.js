import { Col, Button } from 'antd';
import React, { useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { updateTourStep } from 'store/actions';

export default function Item({ item, onBuyPlant, unit }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.id === 0)
      setTimeout(async () => {
        dispatch(updateTourStep(2));
      }, 300);
  }, [item.id, dispatch]);

  const handleBuy = () => {
    dispatch(updateTourStep(100));
    localStorage.setItem('noNeedTour', true);
    onBuyPlant();
  };

  return (
    <Col
      className={`gutter-row r-bot-10px r-top-10px ${item.id === 0 ? 'first-bonsai' : ''}`}
      span={8}
    >
      <div className='align-center'>
        <strong> {item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={item.plantImg} className='h-140px pd-buy-bonsai w-100' alt='plant' />
      </div>

      <div>
        {/* <img src={oxyImg} className='oxy-img' alt='oxy' /> */}
        <Button className='w-100 r-bot-10px' type='primary' onClick={() => handleBuy()}>
          <strong className=''>
            {item.price} {unit}
          </strong>
        </Button>
      </div>
    </Col>
  );
}
