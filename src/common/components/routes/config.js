import Home from '../routes/Home';
import Login from '../routes/Login';
import Conversation from '../routes/Conversation';
import Contact from '../routes/Contact';
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