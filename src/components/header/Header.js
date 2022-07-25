import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import Container from '../container/Container';
import logo from '../../assets/images/venia-logo.PNG';
import searchIcon from '../../assets/images/search.svg';
import userIcon from '../../assets/images/user.svg';
import shoppingBag from '../../assets/images/shopping-bag.svg';
import menuIcon from '../../assets/images/menu.svg';

export default function Header() {
    const store = useSelector(state => state.data);

  return (
    <header>
        <Container>
            <div className='header'>
                <a href='#' id='menuButton'>
                    <img src={menuIcon} alt="menu icon"/>
                </a>
                <div className='logo'>
                    <Link to='/'>
                        <img src={logo} id='venieLogo' alt='venia logo' />
                    </Link>
                </div>
                <div className='header-menu-1'>
                    <ul>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Smart Gear</li>
                        <li>Accessories</li>
                    </ul>
                </div>
                <div className='header-menu-2'>
                    <ul>
                        <li><a className='header-menu-2-link' href='#'><img src={searchIcon} id='searchIcon' alt='search icon'/><label>Search</label></a></li>
                        <li><a href='#'><img src={userIcon} id='userIcon' alt='search icon'/><label>Sign in</label></a></li>
                        <li>
                            <Link to='/cart'>
                                <img src={shoppingBag} id='shoppingBag' alt='cart icon'/>
                                <span className='cart-item-count-display'>
                                    {store.productData.length}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </header>
  )
}
