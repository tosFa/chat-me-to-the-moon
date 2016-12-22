import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux';
import TableRow from './TableRow';
import TableData from './TableData';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import get from 'lodash/get';
import getTableNodes from '../helpers/nodes';

//const mapStateToProps = (state, ownProps) => ({ table: state.table[ownProps.id]});
//const mapDispatchToProps = (dispatch, ownProps) => ({
//  register: () => dispatch(actions.register(ownProps.id)),
//  setNodes: () => dispatch(actions.setNodes(ownProps.id, ownProps.nodes)),
//  requestSuccess: () => Promise.resolve(ownProps.data).then((data) => dispatch(actions.requestSuccess(ownProps.id, data)))
//});
//
//@connect(mapStateToProps, mapDispatchToProps)
export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = ::this.renderHeader;
    this.renderBody = ::this.renderBody;
    this.renderFooter = ::this.renderFooter;
    this.renderPagination = ::this.renderPagination;
    this.getPageNumbers = ::this.getPageNumbers;

    this.setNodes(props);
    //this.props.register();
    //this.props.setNodes();
    //this.props.requestSuccess();
  }

  setNodes = (props) => {
    if (!props.data.length) {
      this.nodes = [];
    } else {
      this.nodes = getTableNodes(props.data[0])
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setNodes(nextProps);
  }

  renderHeader(){
    const { actions, TableHeader, nodesMap } = this.props;
    const { nodes } = this;

    return (<TableHeader { ...{ actions, nodesMap, nodes } }/>);
  }
  renderBody(){
    const { data, TableRow, TableData } = this.props;

    return (
      <tbody>
        {data.map((dataItem, dataKey) =>
          <TableRow key={dataKey}>
            {this.nodes.map((node, key) =>
              <TableData key={key} value={get(dataItem, node, null)}></TableData>
            )}
          </TableRow>
        )}
      </tbody>
    );
  }
  renderFooter(){
    const  { TableFooter } = this.props;

    return (<TableFooter />);
  }

  getPageNumbers() {
    const { maxNumberOfItems, pagination: { current_page, total_pages }  } = this.props;

    let paginationArray = [current_page];
    let i = 1;

    const isEligible = (number) => (number > 0 && paginationArray.length < maxNumberOfItems && number < total_pages);

    for (i; i <= maxNumberOfItems; i++) {
      const min = current_page - i;
      const max = current_page + i;

      if (isEligible(max)) {
        paginationArray.push(max);
      }
      if (isEligible(min)) {
        paginationArray.push(min);
      }
    }

    return paginationArray.sort();
  }
  renderPagination() {
    const {
      hasPagination, includeLastOnBigLists,
      pagination: { current_page, total_pages, prev_page, next_page }
    } = this.props;
    const basicStyle = {display: 'inline-block', margin: '10px', padding: '4px 8px', border: '1px solid #eee'};
    const includeThreeDots = includeLastOnBigLists && current_page < total_pages;

    if (!hasPagination) {
      return null;
    }

    return (
      <ul style={{listStyleType: 'none'}}>
        {(prev_page) ? <li style={basicStyle}>prev</li> : null}

        {this.getPageNumbers().map((item, key) =>
          <li style={{ ...basicStyle, color: (item == current_page ? 'red' : 'blue') }} key={key}>{item}</li>
        )}

        {(includeThreeDots) ? <li style={basicStyle}>...</li> : null}
        {(includeThreeDots) ? <li style={basicStyle}>{total_pages}</li> : null}
        {(next_page) ? <li style={basicStyle}>next</li> : null}
      </ul>
    );
  }


  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    if (!this.props.loading && !this.props.data.length) {
      return <div>No data...</div>
    }
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
  hasPagination: true,
  maxNumberOfItems: 2,
  pagination: {},
  includeLastOnBigLists: true,
  loading: false,
  nodesMap: {}
};