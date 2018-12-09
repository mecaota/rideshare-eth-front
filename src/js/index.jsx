import React from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx'
import Main from './main.jsx'
import Footer from './components/Footer.jsx'
import '../css/style.scss';

class Index extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <main className="container">
          <Main />
          <p>Hello {this.props.name}!</p>
        </main>
        <Footer />
      </div>
    );
  }
}

render(<Index name="810"/>, document.getElementById('app'));
