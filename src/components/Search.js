import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import qs from 'query-string';
import "react-table/react-table.css";

import * as searchActions from '../modules/search/actions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: qs.parse(this.props.search).q
    }
  }

  handleChange = (event) => {
    const query = event.target.value;
    // Update local state of query
    this.setState({
      query
    });

    // Create a search object with existing params and the updated query value
    let searchObj = Object.assign(
      {},
      qs.parse(this.props.search),
      {
        q: query
      }
    );

    const searchString = qs.stringify(searchObj);
    
    // Updates the search string in URL throttled to at most once every 500 ms
    clearTimeout(this.updateUrlTimeout);
    this.updateUrlTimeout = setTimeout(() => {
      this.props.push({
        search: searchString
      });
    }, 500);
  }

  render() {
    const {
      query,
    } = this.state;
    // Get the search param from the URL
    const isIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(query);

    return (
      <div className="form-element">
        <div className="form-input">
          <input type="text" value={query} onChange={this.handleChange} />
        </div>
        { ! isIP && query !== '' &&
          <div className="error">
            <span>This is not a valid IP</span>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  direction: state.search.direction,
  search: state.routing.location.search,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  searchActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
