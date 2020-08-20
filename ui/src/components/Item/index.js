import { Col, Button } from 'antd';
import React from 'react';
import './style.css';

export default function Item(props) {
  return (
    <Col className='gutter-row r-bot-10px r-top-10px' span={8}>
      <div className='align-center'>
        <strong> {props.item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={props.item.plant_img} className=' h-160px w-100 ' alt='' />
      </div>

      <div>
        {/* <img src={oxyImg} className='oxy-img' alt='oxy' /> */}
        <Button className='w-100 r-bot-10px' type='primary' onClick={props.onBuyPlant}>
          <strong className=''>Buy: {props.item.price} Moola</strong>
        </Button>
      </div>
    </Col>
  );
}
