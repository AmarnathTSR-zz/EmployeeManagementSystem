import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const { serial } = this.props;

    return (
      <tr>
        <th>{serial}</th>
        <th scope="row">{profile.user.email}</th>
        <td>{profile.user.name}</td>
        <td>{profile.currentbranch}</td>
        <td>{profile.designation}</td>
        <td>{profile.mobile}</td>

        <td>
          {" "}
          <Link
            to={`/profile/edit/${profile.user._id}`}
            className="btn btn-info"
          >
            Manage Profile
          </Link>
        </td>
        <td>
          {" "}
          <Link to={`/transfer/${profile.user._id}`} className="btn btn-info">
            Apply Transfer
          </Link>
        </td>
      </tr>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
