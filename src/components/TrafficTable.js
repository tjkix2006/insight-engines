import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReactTable from "react-table";
import qs from 'query-string';
import "react-table/react-table.css";

class TrafficTable extends Component {
  // Filters results based on the current search query
  filterResults = () => {
    const {
      search,
      traffic,
    } = this.props;
    // Get the search param from the URL
    const { q } = qs.parse(search) || '';
    let filterResults = traffic;
    // Validate that the query is a valid IP
    const isIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(q);
    // If there is a query and traffic, filter it
    if (Array.isArray(traffic)
      && isIP) {
      filterResults = filterResults.filter(result =>
        result.ip === q
      );
    }
    return filterResults;
  }

  updateQueryExpanded = (updatedExpanded) => {
    // Create a search object with existing params and the updated value
    let searchObj = Object.assign(
      {},
      qs.parse(this.props.search),
      {
        expanded: JSON.stringify(updatedExpanded.expanded),
      },
    );

    const searchString = qs.stringify(searchObj);
    this.props.push({
      search: searchString
    });
  }
  
  updateQueryPage = (updatedPage) => {
    console.warn(updatedPage);
    // Create a search object with existing params and the updated value
    let searchObj = Object.assign(
      {},
      qs.parse(this.props.search),
      {
        page: updatedPage.page + 1
      },
    );

    const searchString = qs.stringify(searchObj);
    this.props.push({
      search: searchString
    });
  }

  updateQuerySort = (updatedSort) => {
    // Create a search object with existing params and the updated value
    let searchObj = Object.assign(
      {},
      qs.parse(this.props.search),
      {
        sorted: JSON.stringify(updatedSort.sorted),
      },
    );

    const searchString = qs.stringify(searchObj);
    this.props.push({
      search: searchString
    });
  }

  render() {
    const {
      loading,
      message,
    } = this.props;
    const traffic = this.filterResults();
    const params = qs.parse(this.props.search);

    return (
      <div>
        {loading === true ? // If the data is loading
            <span>Loading traffic data...</span>
          : message !== null ? // If there was an error getting data
            <span>{ message }</span>
          : traffic === null ? // If there is no traffic data at the moment
            <span>No results available</span>
          : // Data is loaded, there are no errors, and it is not loading data
          <ReactTable
            data={traffic}
            columns={[
              {
                Header: "IP Address",
                id: "src",
                accessor: d => d.ip,
              },
              {
                Header: "Other Address(es)",
                id: "dest",
                accessor: d => d.other_ip,
              },
              {
                Header: "Bytes in",
                id: "bytes_in",
                aggregate: vals => vals.reduce((acc, val) => acc + val),
                accessor: d => d.direction === 'in' ? parseInt(d['bytes']) : 0,
              },
              {
                Header: "Bytes Out",
                id: "bytes_out",
                aggregate: vals => vals.reduce((acc, val) => acc + val),
                accessor: d => d.direction === 'out' ? parseInt(d['bytes']) : 0,
              },
              {
                Header: "Bytes",
                id: "bytes",
                aggregate: vals => vals.reduce((acc, val) => acc + val),
                accessor: d => parseInt(d['bytes']),
              },
            ]}
            sorted={params.sorted ? JSON.parse(params.sorted) : []}
            page={params.page >= 1 ? parseInt(params.page) - 1 : 0}
            expanded={params.expanded ? JSON.parse(params.expanded) : {}}
            onSortedChange={sorted => this.updateQuerySort({ sorted })}
            onPageChange={page => this.updateQueryPage({ page })}
            onExpandedChange={expanded => this.updateQueryExpanded({ expanded })}
            className="-striped -highlight"
            pivotBy={["src", "dest"]}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.trafficData.loading,
  message: state.trafficData.message,
  search: state.routing.location.search,
  traffic: state.trafficData.traffic,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrafficTable);
