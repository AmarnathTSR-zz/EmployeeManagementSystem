import React, { Component } from "react";
import PropTypes from "prop-types";

class TransferItem extends Component {
  render() {
    const { transfers } = this.props;
    const { serial } = this.props;

    const formatDate = date => {
      var MyDate = new Date(date);
      var MyDateString;

      //debug
      //MyDate.setDate(MyDate.getDate() - 60);

      MyDateString =
        MyDate.getFullYear() +
        "-" +
        ("0" + (MyDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDate.getDate()).slice(-2);
      return MyDateString;
    };

    return (
      <tr>
        <th>{serial}</th>
        <th scope="row">{transfers.user.email}</th>
        <td>{transfers.user.name}</td>
        <td>{transfers.designation}</td>
        <td>{transfers.department}</td>
        <td>{transfers.branch1}</td>
        <td>{transfers.branch2}</td>
        <td>{transfers.branch3}</td>
        <td>{formatDate(transfers.date)} </td>
      </tr>
    );
  }
}

TransferItem.propTypes = {
  transfers: PropTypes.object.isRequired
};

export default TransferItem;
