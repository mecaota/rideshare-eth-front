import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>当サイトは<a href="https://pito.run" rel="noopener noreferrer" target="_blank">mecaota</a>の卒業研究にて開発を行った、スマートコントラクトを用いたライドシェアシステムのサイトです。</p>
                <a href="https://github.com/mecaota/rideshare-eth-front" rel="noopener noreferrer" target="_blank" className="button is-outlined is-black">
                    <FontAwesomeIcon icon={['fab', 'github']} size="1x" />
                    GitHub
                </a>
            </div>
        </footer>
  )
}

export default Footer