import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';

export default ({ children }) =>
  <div>
    <Header/>
    <Content>{children}</Content>
    <Footer/>
  </div>