import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";

class TrafficTable extends Component {
  filterResults = () => {
    const {
      direction,
      query,
      traffic,
    } = this.props;
    let filterResults = traffic;
    // Validate that the query is a valid IP
    const isIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(query);
    // If there is a query and traffic, filter it
    if (Array.isArray(traffic)
      && isIP) {
      filterResults = filterResults.filter(result =>
        result.ip === query
      );
    }

    return filterResults;
  }

  render() {
    const {
      loading,
      message,
    } = this.props;
    const traffic = this.filterResults();

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
            className="-striped -highlight"
            pivotBy={["src", "dest"]}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  direction: state.search.direction,
  loading: state.trafficData.loading,
  message: state.trafficData.message,
  query: state.search.query,
  traffic: state.trafficData.traffic,
});

export default connect(mapStateToProps)(TrafficTable);
