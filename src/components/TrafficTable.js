import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";

class TrafficTable extends Component {
  render() {
    const { 
      loading,
      message,
      traffic,
    } = this.props;

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
                Header: "Traffic source",
                id: "src",
                accessor: d => d['All_Traffic.src'],
              },
              {
                Header: "Traffic Destination",
                id: "dest",
                accessor: d => d['All_Traffic.dest'],
              },
              {
                Header: "Bytes",
                accessor: "sum_bytes",
              },
            ]}
            className="-striped -highlight"
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  message: state.message,
  traffic: state.traffic,
});

export default connect(mapStateToProps)(TrafficTable);
