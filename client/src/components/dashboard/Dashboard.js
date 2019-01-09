import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroupDisplay";
import TextAreaFieldGroup from "../common/TextAreaFieldGroupDisplay";
import { logoutUser } from "../../actions/authActions";
import SelectListGroupDisplay from "../common/SelectListGroupDisplay";
import isEmpty from "../../validations/is-empty";
class Dashboard extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    // Redirect to login
    window.location.href = "/login";
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    // If profile field doesnt exist, make empty string
    let dashboardContent;
    // Select options for status
    const branchoptions = [
      { label: "* Select Branch", value: 0 },
      { label: "chennai", value: "chennai" },
      { label: "madurai", value: "madurai" },
      { label: "bangalore", value: "bangalore" }
    ];

    // Select options for status
    const designationoptions = [
      { label: "* Select Designation", value: 0 },
      { label: "CEO", value: "CEO" },
      { label: "Manager", value: "Manager" },
      { label: "Web Developer", value: "Web Developer" },
      { label: "Software Testing", value: "Software Testing" }
    ];
    // Select options for status
    const departmentoptions = [
      { label: "* Select Department", value: 0 },
      { label: "Management", value: "Management" },
      { label: "HR Department", value: "HR Department" },
      { label: "Development", value: "Development" }
    ];

    // Select options for status
    const genderoptions = [
      { label: "* Select Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];

    // Select options for status
    const maritalstatusoptions = [
      { label: "* Select Marital Status", value: 0 },
      { label: "Married", value: "Married" },
      { label: "Single", value: "Single" }
    ];

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        // If profile field doesnt exist, make empty string
        profile.currentbranch = !isEmpty(profile.currentbranch)
          ? profile.currentbranch
          : "";
        profile.designation = !isEmpty(profile.designation)
          ? profile.designation
          : "";
        profile.department = !isEmpty(profile.department)
          ? profile.department
          : "";
        profile.salary = !isEmpty(profile.salary) ? profile.salary : "";
        profile.gender = !isEmpty(profile.gender) ? profile.gender : "";
        profile.maritalstatus = !isEmpty(profile.maritalstatus)
          ? profile.maritalstatus
          : "";
        profile.dateofbirth = !isEmpty(profile.dateofbirth)
          ? profile.dateofbirth
          : "";
        profile.dateofjoining = !isEmpty(profile.dateofjoining)
          ? profile.dateofjoining
          : "";
        profile.bloodgroup = !isEmpty(profile.bloodgroup)
          ? profile.bloodgroup
          : "";
        profile.address = !isEmpty(profile.address) ? profile.address : "";
        profile.mobile = !isEmpty(profile.mobile) ? profile.mobile : "";
        profile.nationality = !isEmpty(profile.nationality)
          ? profile.nationality
          : "";
        profile.clopening = !isEmpty(profile.clopening)
          ? profile.clopening
          : "";
        profile.clavailed = !isEmpty(profile.clavailed)
          ? profile.clavailed
          : "";
        profile.mlopening = !isEmpty(profile.mlopening)
          ? profile.mlopening
          : "";

        profile.mlavailed = !isEmpty(profile.mlavailed)
          ? profile.mlavailed
          : "";

        profile.absents = !isEmpty(profile.absents) ? profile.absents : "";
        profile.remarks = !isEmpty(profile.remarks) ? profile.remarks : "";

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

        dashboardContent = (
          <div>
            <div className="row">
              <div className="col">
                <TextFieldGroup
                  placeholder="email"
                  name="email"
                  value={`${user.email}`}
                  onChange={this.onChange}
                  info="email of employee"
                  disabled="disabled"
                />
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={`${user.name}`}
                  onChange={this.onChange}
                  info="Name of Employee"
                  disabled="disabled"
                />
                <SelectListGroupDisplay
                  placeholder="Current Branch"
                  name="currentbranch"
                  value={profile.currentbranch}
                  onChange={this.onChange}
                  options={branchoptions}
                  info="Select Employee cadre"
                  disabled="disabled"
                />
                <SelectListGroupDisplay
                  placeholder="department"
                  name="department"
                  value={profile.department}
                  onChange={this.onChange}
                  options={departmentoptions}
                  info="select Employee department"
                  disabled="disabled"
                />
                <SelectListGroupDisplay
                  placeholder="designation"
                  name="designation"
                  value={profile.designation}
                  onChange={this.onChange}
                  options={designationoptions}
                  info="select Employee designation"
                  disabled="disabled"
                />

                <TextFieldGroup
                  placeholder="Salary"
                  name="salary"
                  value={`${profile.salary}`}
                  onChange={this.onChange}
                  info="Enter Employee Salary"
                  disabled="disabled"
                />
                <p>Date of Joining</p>
                <input
                  type="date"
                  name="dateofjoining"
                  value={formatDate(profile.dateofjoining)}
                  onChange={this.onChange}
                  disabled="disabled"
                />
                <br />
                <br />
                <p>Date of Birth</p>

                <input
                  type="date"
                  name="dateofbirth"
                  value={formatDate(profile.dateofbirth)}
                  onChange={this.onChange}
                  disabled="disabled"
                />
                <br />
                <br />
                <SelectListGroupDisplay
                  placeholder="Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={this.onChange}
                  options={genderoptions}
                  info="select Employee Gender"
                  disabled="disabled"
                />
                <SelectListGroupDisplay
                  placeholder="Marital Status"
                  name="maritalstatus"
                  value={profile.maritalstatus}
                  onChange={this.onChange}
                  options={maritalstatusoptions}
                  info="select Employee Marital Status"
                  disabled="disabled"
                />
              </div>
              <div className="col">
                <TextFieldGroup
                  placeholder="Blood Group"
                  name="bloodgroup"
                  value={`${profile.bloodgroup}`}
                  onChange={this.onChange}
                  info="Enter Employee Blood Group"
                  disabled="disabled"
                />
                <TextFieldGroup
                  placeholder="Mobile Number"
                  name="mobile"
                  value={`${profile.mobile}`}
                  onChange={this.onChange}
                  info="Enter Employee Mobile Number"
                  disabled="disabled"
                />
                <TextAreaFieldGroup
                  placeholder="Address"
                  name="address"
                  value={profile.address}
                  onChange={this.onChange}
                  info="Enter the Employee Address"
                  disabled="disabled"
                />
                <h2>CASUAL LEAVE</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Opening</th>
                      <th scope="col">Availed</th>
                      <th scope="col">Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <TextFieldGroup
                          name="clopening"
                          value={`${profile.clopening}`}
                          onChange={this.onChange}
                          disabled="disabled"
                        />
                      </th>
                      <td>
                        <TextFieldGroup
                          name="clavailed"
                          value={`${profile.clavailed}`}
                          onChange={this.onChange}
                          disabled="disabled"
                        />
                      </td>
                      <td>
                        <TextFieldGroup
                          name="clclosing"
                          value={`${profile.clopening - profile.clavailed}`}
                          onChange={this.onChange}
                          disabled="disabled"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h2>MEDICAL LEAVE</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Opening</th>
                      <th scope="col">Availed</th>
                      <th scope="col">Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <TextFieldGroup
                          name="mlopening"
                          value={`${profile.mlopening}`}
                          onChange={this.onChange}
                          disabled="disabled"
                        />
                      </th>
                      <td>
                        <TextFieldGroup
                          name="mlavailed"
                          value={`${profile.mlavailed}`}
                          onChange={this.onChange}
                          disabled="disabled"
                        />
                      </td>
                      <td>
                        <TextFieldGroup
                          name="mlclosing"
                          value={`${profile.mlopening - profile.mlavailed}`}
                          disabled="disabled"
                          onChange={this.onChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <TextFieldGroup
                  placeholder="Total Absent days"
                  name="absents"
                  value={`${profile.clavailed + profile.mlavailed}`}
                  onChange={this.onChange}
                  info="Total absent days"
                  disabled="disabled"
                />
                <TextAreaFieldGroup
                  placeholder="remarks"
                  name="remarks"
                  value={profile.remarks}
                  onChange={this.onChange}
                  info="Enter the Employee Remarks if any"
                  disabled="disabled"
                />
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              Admin have not yet setup a profile. please contact admin to update
              profile
            </p>

            <Link
              to="/login"
              className="btn btn-lg btn-info"
              onClick={this.onLogoutClick.bind(this)}
            >
              Logout
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, logoutUser }
)(Dashboard);
