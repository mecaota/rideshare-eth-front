import React from 'react'
import * as eth from '../infra/web3connect'

window.addEventListener('load', function() {
    eth.setupWeb3();
  
    eth.setOnGreet(() => {});
    setInterval(async () => {
      const blockNumber = await eth.getBlockNumber();
      if (store.getState().blockNumber !== blockNumber) {
        store.dispatch(updateBlockNumber(blockNumber));
      }
      const message = await eth.getMessage();
      if (store.getState().message !== message) {
        store.dispatch(updateMessage(message));
      }
    }, 100);
})

const Main = () => {
    return (
        <section className="section">
            <div className="content">
                <p>Hello world!</p>
            </div>
        </section>
  )
}

export default Main