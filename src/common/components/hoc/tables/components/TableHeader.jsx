import React from 'react';
import TableRow from './TableRow';
import get from 'lodash/get';

export default ({ nodes, style, nodesMap }) =>
  <thead>
    <TableRow>
      {nodes.map((node, key) =>
        <th style={{padding: '10px 20px', background: '#eee', textAlign: 'center', ...style}} key={key}>
          {typeof node === 'string' ? get(nodesMap, node, node) : get(nodesMap, node.value, node.value)}
        </th>
      )}
    </TableRow>
  </thead>