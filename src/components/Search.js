import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";

import * as searchActions from '../modules/search/actions';

class Search extends Component {
  handleChange = (event) => {
    // Only apply if empty or a valid IP Address
    this.props.searchIP(event.target.value);
  }

  render() {
    const { 
      direction,
      query,
    } = this.props;
    const isIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(query);

    return (
      <div class="form-element">
        <div class="form-input">
          <input type="text" value={query} onChange={this.handleChange} />
        </div>
        { ! isIP && query !== '' &&
          <div class="error">
            <span>This is not a valid IP</span>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  direction: state.search.direction,
  query: state.search.query,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(searchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
