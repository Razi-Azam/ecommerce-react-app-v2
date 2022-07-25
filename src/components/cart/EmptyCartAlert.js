import React from 'react';
import Container from '../container/Container';
import emptyCart from '../../assets/images/empty-cart.PNG';

export default function EmptyCartAlert() {
  return (
    <Container>
        <div className='cart-empty-wrapper'>
            <header className='empty-cart-header'>
                <h6>Your Cart is empty.</h6>
            </header>
            <div className='empty-cart-image'>
                <img src={emptyCart} alt='empty cart' />
            </div>
        </div>
    </Container>
  )
}
