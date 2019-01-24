import React from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'
import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, fas);

class Index extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <main className="container">
          <Main />
        </main>
        <Footer />
      </div>
    );
  }
}

render(<Index />, document.getElementById('app'));
