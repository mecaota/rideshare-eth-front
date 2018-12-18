import React, {lazy, Suspense} from 'react';
import Web3Provider from './web3provider.jsx';

//const Web3Provider = lazy(() => import('./web3provider.jsx'));

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="">
        <Suspense fallback={<p>Loading...</p>}>
          <Web3Provider />
        </Suspense>
      </div>
    );
  }
}