import React from 'react';
import { Match, Miss } from 'react-router';
import Home from './Home';
import Login from './Login';
import Conversation from './Conversation';
import Contact from './Contact';
import Error from '../error/Error';
import Container from '../layout/Container';

export default () =>
  <Container>
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/login" component={Login} />
    <Match exactly pattern="/conversation" component={Conversation} />
    <Match exactly pattern="/contact" component={Contact} />

    <Miss component={Error} />
  </Container>


