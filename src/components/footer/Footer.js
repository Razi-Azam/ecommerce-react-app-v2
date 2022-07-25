import React from 'react';
import Container from '../container/Container';
import instagramLogo from '../../assets/images/instagram.svg';
import facebookLogo from '../../assets/images/facebook.svg';
import twitterLogo from '../../assets/images/twitter.svg';
import veniaLogo from '../../assets/images/venia-logo.PNG';

export default function Footer() {
  return (
    <Container>
        <footer className='footer-wrapper'>
            <div className='footer-part1'>
                <div className='footer-part1-section1'>
                    <h3>Account</h3>
                    <ul>
                        <li>Sign In</li>
                        <li>Register</li>
                        <li>Order Status</li>
                    </ul>
                </div>
                <div className='footer-part1-section2'>
                    <h3>About Us</h3>
                    <ul>
                        <li>Our Story</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className='footer-part1-section3'>
                    <h3>Help</h3>
                    <ul>
                        <li>Contact Us</li>
                        <li>Order Status</li>
                        <li>Returns</li>
                    </ul>
                </div>
                <div className='footer-part1-section4'>
                    <h3>Follow Us!</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore.
                        </li>
                        <li>
                            <a href='#'><img src={instagramLogo} alt="instagram logo"/></a>
                            <a href='#'><img src={facebookLogo} alt="facebook logo"/></a>
                            <a href='#'><img src={twitterLogo} alt="twitter logo"/></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='footer-part2'>
                <div className='footer-part2-section1'>
                    <img src={veniaLogo} alt="venia logo"/>
                </div>
                <div className='footer-part2-section2'>
                    <p>© Company Name</p><p>Address Ave, City Name, State ZIP</p>
                </div>
                <div className='footer-part2-section3'>
                    <a href='#'>Terms of Use</a>
                    <a href='#'>Privacy Policy</a>
                </div>
            </div>
        </footer>
    </Container>
  )
}
