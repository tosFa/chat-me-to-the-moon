import Home from './Home';
import Login from './Login';
import Conversation from './Conversation';
import Contact from './Contact';
import { testAsyncAction, testAsyncAction2 } from '../../redux/actions';

export default [
  {
    pattern: '/',
    name: 'home',
    component: Home,
    exactly: true,
    initActions: [testAsyncAction]
  },
  {
    pattern: '/login',
    name: 'login',
    component: Login
  },
  {
    pattern: '/conversations',
    name: 'conversations',
    component: Conversation

  },
  {
    pattern: '/contact',
    name: 'contact',
    component: Contact
  },
]