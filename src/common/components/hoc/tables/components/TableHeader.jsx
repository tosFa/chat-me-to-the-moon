import React from 'react';
import TableRow from './TableRow';

export default ({ nodes, style }) =>
  <thead>
    <TableRow>
      {nodes.map((node, key) =>
        <th style={{padding: '10px 20px', background: '#eee', textAlign: 'center', ...style}} key={key}>
          {typeof node === 'string' ? node : node.value}
        </th>
      )}
    </TableRow>
  </thead>