import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getTransfers } from "../../actions/transferActions";
import TransferItem from "./TransferItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getTransfers();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { transfers, loading } = this.props.transfer;
    let transferItems;
    let spinners;
    if (transfers === null || loading) {
      spinners = <Spinner />;
    } else {
      if (transfers.length > 0) {
        let a = 0;

        transferItems = transfers.map(transfers => (
          <TransferItem
            serial={(a = a + 1)}
            key={transfers._id}
            transfers={transfers}
          />
        ));
      } else {
        transferItems = <h4>No transfers found...</h4>;
      }
    }

    return (
      <div className="transfers">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Transfer Applied </h1>
              <p className="lead text-center">
                List of Employee Transfer Applications details
              </p>
              {spinners}
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Department</th>
                    <th scope="col">Branch 1</th>
                    <th scope="col">Branch 2</th>
                    <th scope="col">Branch 3</th>
                    <th scope="col">Applied Date </th>
                  </tr>
                </thead>
                <tbody>{transferItems}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getTransfers: PropTypes.func.isRequired,
  transfer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  transfer: state.transfer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTransfers }
)(Profiles);
