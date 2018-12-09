import React from 'react'

const Header = () => {
    return (
        <header className="">
            <div className="">
                <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <div className="navbar-item" disabled="disabled" >DAppsライドシェア</div>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <a className="navbar-item" href="https://rinkeby.etherscan.io/">Etherscan</a>
                            <a className="navbar-item" href="https://remix.ethereum.org/">Remix IDE</a>
                            <a className="navbar-item" href="https://solidity.readthedocs.io/en/v0.4.25/index.html">Solidity Docs v0.4.25</a>
                            <a className="navbar-item" href="https://web3js.readthedocs.io/en/1.0/">web3.js Docs v1.0</a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
  )
}

export default Header