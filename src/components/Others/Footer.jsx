import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <img src="/assets/logo2.png" alt className="footer-logo"/>
                    <p className="slogan">DevEvil TV is a free and open-source movie and tv show streaming site. DevEvil TV offers users the chance to watch their favorite
                        movies and series completely free of charge, without any annoying ads or the
                        need to create an account.</p>
                    <div className="social-link">
                        <a href="https://example.com" target='_blank' rel='noreferrer noopener'>
                            <i className="fas fa-globe logo-facebook"></i>
                        </a>
                        <a href="https://dsc.gg/" target='_blank' rel='noreferrer noopener'>
                            <i className="fab fa-discord logo-facebook"></i>
                        </a>
                        <a
                            href="https://github.com/"
                            target='_blank'
                            rel='noreferrer noopener'>
                            <i className="fab fa-github logo-facebook"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target='_blank'
                            rel='noreferrer noopener'>
                            <i className="fab fa-instagram logo-facebook"></i>
                        </a>
                        <a
                            href="https://x.com/"
                            target='_blank'
                            rel='noreferrer noopener'>
                            <i className="fab fa-x-twitter logo-facebook"></i>
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <ul>
                        <h4 className="link-heading">Contact</h4>
                        <li className="link-item">
                            <a href="https://devevil.com/contact" target='_blank' rel="noreferrer">Contact Form</a>
                        </li>
                        <li className="link-item">
                            <a href="https://dsc.gg/devevil" target='_blank' rel="noreferrer">Discord</a>
                        </li>
                    </ul>

                    <ul>
                        <h4 className="link-heading">Links</h4>
                        <li className="link-item">
                            <a href="/about">About</a>
                        </li>
                        <li className="link-item">
                            <a href="/dmca">DMCA</a>
                        </li>
                    </ul>

                
                </div>
                
 
            </div>
            <div className="footer-copyright">
                <div className="copyright">
                    <p>Copyright © {new Date().getFullYear()}, All rights reserved</p>
                    <p>Made with 💜 by DevEvil, Created with ReactJS ⚛, TMDB API 📚, Coffee ☕ &
                        Brain 🧠</p>
                </div>
                <div className="wrapper">
                    <a href="/dmca">DMCA</a>
                    <a href="/about">About</a>
                </div>

            </div>
        </footer>

    );
};

export default Footer;
