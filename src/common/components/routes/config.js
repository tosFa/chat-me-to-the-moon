import Home from '../routes/Home';
import Login from '../routes/Login';
import Signup from '../routes/Signup';
import Conversation from '../routes/Conversation';
import Contact from '../routes/Contact';
import Confirmation from '../routes/Confirmation';
//import { testAsyncAction, testAsyncAction2 } from '../../redux/actions';

export default [
  {
    pattern: '/',
    name: 'home',
    component: Home,
    exactly: true,
    //initActions: [testAsyncAction]
  },
  {
    pattern: '/login',
    name: 'login',
    component: Login
  },
  {
    pattern: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    pattern: '/conversations/:id',
    name: 'conversations',
    component: Conversation,
    exactly: true,
    auth: true
  },
  {
    pattern: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    pattern: '/confirmation/:token',
    name: 'confirmation',
    component: Confirmation
  },
]