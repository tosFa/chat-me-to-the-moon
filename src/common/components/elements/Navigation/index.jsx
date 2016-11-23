import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import BlogIcon from 'react-icons/lib/fa/square-o';
import BeerIcon from 'react-icons/lib/fa/beer';
import ContactIcon from 'react-icons/lib/fa/envelope-o';
import CommentIcon from 'react-icons/lib/fa/comment';
import styles from './styles.css';
const links = [
  {
    label: 'blog',
    url: '/blog',
    icon: <BlogIcon className={styles.icon}/>
  },
  {
    label: 'about',
    url: '/about',
    icon: <BeerIcon className={styles.icon}/>
  },
  {
    label: 'contact',
    url: '/contact',
    icon: <ContactIcon className={styles.icon}/>
  },
  {
    label: 'conversation',
    url: '/conversation',
    icon: <CommentIcon className={styles.icon}/>
  }
];


export const Navigation = ({ styles }) =>
  <nav styleName="nav">
    <ul styleName="ul">
      {links.map(
        (item, index) =>
          <li key={index} className={styles.li}>
            {item.icon}
            <Link to={item.url}>{item.label}</Link>
          </li>
      )}
    </ul>
  </nav>


export default CSSModules(Navigation, styles);