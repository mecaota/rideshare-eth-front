import React from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx'
//import Main from './components/main.jsx'
import Footer from './components/Footer.jsx'
import '../css/style.scss';

class Index extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <main className="container">
        </main>
        <Footer />
      </div>
    );
  }
}

render(<Index />, document.getElementById('app'));
