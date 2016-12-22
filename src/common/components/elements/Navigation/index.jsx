import React from 'react';
import { graphql } from 'react-apollo';
import { SIGNOUT_MUTATION_QUERY } from '../../../../client/graphql';
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
    label: 'conversations',
    url: '/conversations/1',
    icon: <CommentIcon className={styles.icon}/>
  }
];


export const Navigation = ({ styles, signout }) => {

  const logout = (event) => {
    event.preventDefault();

    signout().then(result => {
      if (result.data.signout.success) {
        window.location.href = '/';
      } else {
        console.log('fail');
      }
    });
  }
  return (
    <nav styleName="nav">
      <ul styleName="ul">
        {links.map(
          (item, index) =>
            <li key={index} className={styles.li}>
              {item.icon}
              <Link to={item.url}>{item.label}</Link>
            </li>
        )}
        <li className={styles.li}>
          <a href="#" onClick={logout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

const withMutation = graphql(SIGNOUT_MUTATION_QUERY, {
  props: ({ mutate }) => ({
    signout: () => mutate({ variables: {} })
  })
});

export default withMutation(CSSModules(Navigation, styles));