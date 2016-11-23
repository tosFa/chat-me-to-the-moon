import React from 'react';
import CSSModules from 'react-css-modules';

export const ListView = props => {
  const { renderListItem, items } = props;

  return (
    <ul>
      {items.map((item, key) => renderListItem(item, key))}
    </ul>
  );
};

ListView.PropTypes = {
  renderListItem: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired
};

export default ListView;