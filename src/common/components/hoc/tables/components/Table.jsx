import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux';
import TableRow from './TableRow';
import TableData from './TableData';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';

const mapStateToProps = (state, ownProps) => ({ table: state.table[ownProps.id]});
const mapDispatchToProps = (dispatch, ownProps) => ({
  register: () => dispatch(actions.register(ownProps.id)),
  setNodes: () => dispatch(actions.setNodes(ownProps.id, ownProps.nodes)),
  requestSuccess: () => Promise.resolve(ownProps.data).then((data) => dispatch(actions.requestSuccess(ownProps.id, data)))
});

@connect(mapStateToProps, mapDispatchToProps)
export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = ::this.renderHeader;
    this.renderBody = ::this.renderBody;
    this.renderFooter = ::this.renderFooter;
    this.renderPagination = ::this.renderPagination;

    this.props.register();
    this.props.setNodes();
    this.props.requestSuccess();
  }

  componentWillReceiveProps(nextProps) {

  }

  renderHeader(){
    const { nodes, actions, TableHeader } = this.props;

    return (<TableHeader nodes={nodes} actions={actions} />);
  }
  renderBody(){
    const { table, TableRow, TableData } = this.props;
    let data = table && table.data && table.data || [];
    let nodes = table && table.nodes && table.nodes || [];

    return (
      <tbody>
        {data.map((dataItem, dataKey) =>
          <TableRow key={dataKey}>
            {nodes.map((node, key) => <TableData key={key} style={{color:'red'}}value={dataItem[node]}></TableData>)}
          </TableRow>
        )}
      </tbody>
    );
  }
  renderFooter(){
    const  { TableFooter } = this.props;

    return (<TableFooter />);
  }

  renderPagination() {
    const { hasPagination, pagination: { maxNumberOfItems } } = this.props;

    if (!hasPagination) {
      return null;
    }

    const pagination = Array.from(Array(maxNumberOfItems).keys());

    return (
      <ul style={{listStyleType: 'none'}}>
        {pagination.map((item, key) =>
          <li
            style={{display: 'inline-block', margin: '10px', padding: '4px 8px', border: '1px solid #eee'}} key={key}
          >
            {(item+1)}
          </li>
        )}
      </ul>
    );
  }


  render() {
    return (
      <div>
        <table>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </table>
        {this.renderPagination()}
      </div>
    );
  }
}

Table.defaultProps = {
  TableRow,
  TableData,
  TableHeader,
  TableFooter,
  actions: [],
  url: null,
  hasPagination: true,
  pagination: {
    maxNumberOfItems: 5,
    activePage: 1
  },
};