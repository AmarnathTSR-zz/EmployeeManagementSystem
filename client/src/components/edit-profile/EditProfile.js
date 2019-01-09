import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createProfile,
  getProfileByHandle
} from "../../actions/profileActions";
import isEmpty from "../../validations/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.id,
      currentbranch: "",
      designation: "",
      department: "",
      salary: "",
      gender: "",
      maritalstatus: "",
      dateofbirth: "",
      dateofjoining: "",
      bloodgroup: "",
      mobile: "",
      address: "",
      nationality: "",
      clopening: "",
      clavailed: "",
      mlopening: "",
      mlavailed: "",
      absents: "",
      remarks: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.id);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile field doesnt exist, make empty string
      profile.currentbranch = !isEmpty(profile.currentbranch) ? profile.currentbranch : "";
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
      profile.address = !isEmpty(profile.address)
        ? profile.address
        : "";
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

      // Set component fields state
      this.setState({
        user: this.props.match.params.id,
        name: profile.user.name,
        email: profile.user.email,
        currentbranch: profile.currentbranch,
        department: profile.department,
        designation: profile.designation,
        salary: profile.salary,
        dateofjoining: formatDate(profile.dateofjoining),
        dateofbirth: formatDate(profile.dateofbirth),
        gender: profile.gender,
        maritalstatus: profile.maritalstatus,
        bloodgroup: profile.bloodgroup,
        mobile: profile.mobile,
        address: profile.address,
        nationality: profile.nationality,
        clopening: profile.clopening,
        clavailed: profile.clavailed,
        mlopening: profile.mlopening,
        mlavailed: profile.mlavailed,
        absents: profile.absents,
        remarks: profile.remarks
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      user: this.state.user,
      currentbranch: this.state.currentbranch,
      department: this.state.department,
      designation: this.state.designation,
      salary: this.state.salary,
      dateofjoining: this.state.dateofjoining,
      dateofbirth: this.state.dateofbirth,
      gender: this.state.gender,
      maritalstatus: this.state.maritalstatus,
      bloodgroup: this.state.bloodgroup,
      mobile: this.state.mobile,
      address: this.state.address,
      nationality: this.state.nationality,
      clopening: this.state.clopening,
      clavailed: this.state.clavailed,
      clclosing: this.state.clclosing,
      mlopening: this.state.mlopening,
      mlavailed: this.state.mlavailed,
      mlclosing: this.state.mlclosing,
      absents: this.state.absents,
      remarks: this.state.remarks
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

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

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/profiles" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col">
                    <TextFieldGroup
                      placeholder="email"
                      name="email"
                      value={`${this.state.email}`}
                      onChange={this.onChange}
                      info="email of employee"
                      disabled="disabled"
                    />
                    <TextFieldGroup
                      placeholder="Name"
                      name="name"
                      value={`${this.state.name}`}
                      onChange={this.onChange}
                      info="Name of Employee"
                      disabled="disabled"
                    />
                    <SelectListGroup
                      placeholder="Current Branch"
                      name="currentbranch"
                      value={this.state.currentbranch}
                      onChange={this.onChange}
                      options={branchoptions}
                      error={errors.currentbranch}
                      info="Select Employee cadre"
                    />
                    <SelectListGroup
                      placeholder="department"
                      name="department"
                      value={this.state.department}
                      onChange={this.onChange}
                      options={departmentoptions}
                      error={errors.department}
                      info="select Employee department"
                    />
                    <SelectListGroup
                      placeholder="designation"
                      name="designation"
                      value={this.state.designation}
                      onChange={this.onChange}
                      options={designationoptions}
                      error={errors.designation}
                      info="select Employee designation"
                    />

                    <TextFieldGroup
                      placeholder="Salary"
                      name="salary"
                      value={`${this.state.salary}`}
                      onChange={this.onChange}
                      error={errors.salary}
                      info="Enter Employee Salary"
                    />
                    <p>Date of Joining</p>
                    <input
                      type="date"
                      name="dateofjoining"
                      value={this.state.dateofjoining}
                      onChange={this.onChange}
                    />
                    <br />
                    <br />
                    <p>Date of Birth</p>

                    <input
                      type="date"
                      name="dateofbirth"
                      value={this.state.dateofbirth}
                      onChange={this.onChange}
                    />
                    <br />
                    <br />
                    <SelectListGroup
                      placeholder="Gender"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                      options={genderoptions}
                      error={errors.gender}
                      info="select Employee Gender"
                    />
                    <SelectListGroup
                      placeholder="Marital Status"
                      name="maritalstatus"
                      value={this.state.maritalstatus}
                      onChange={this.onChange}
                      options={maritalstatusoptions}
                      error={errors.maritalstatus}
                      info="select Employee Marital Status"
                    />
                  </div>
                  <div className="col">
                    <TextFieldGroup
                      placeholder="Blood Group"
                      name="bloodgroup"
                      value={`${this.state.bloodgroup}`}
                      onChange={this.onChange}
                      error={errors.bloodgroup}
                      info="Enter Employee Blood Group"
                    />
                    <TextFieldGroup
                      placeholder="Mobile Number"
                      name="mobile"
                      value={`${this.state.mobile}`}
                      onChange={this.onChange}
                      error={errors.mobile}
                      info="Enter Employee Mobile Number"
                    />
                    <TextAreaFieldGroup
                      placeholder="Address"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                      error={errors.address}
                      info="Enter the Employee Address"
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
                              value={`${this.state.clopening}`}
                              onChange={this.onChange}
                            />
                          </th>
                          <td>
                            <TextFieldGroup
                              name="clavailed"
                              value={`${this.state.clavailed}`}
                              onChange={this.onChange}
                            />
                          </td>
                          <td>
                            <TextFieldGroup
                              name="clclosing"
                              value={`${this.state.clopening -
                                this.state.clavailed}`}
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
                              value={`${this.state.mlopening}`}
                              onChange={this.onChange}
                            />
                          </th>
                          <td>
                            <TextFieldGroup
                              name="mlavailed"
                              value={`${this.state.mlavailed}`}
                              onChange={this.onChange}
                            />
                          </td>
                          <td>
                            <TextFieldGroup
                              name="mlclosing"
                              value={`${this.state.mlopening -
                                this.state.mlavailed}`}
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
                      value={`${this.state.clavailed +
                        this.state.mlavailed}`}
                      onChange={this.onChange}
                      error={errors.absents}
                      info="Total absent days"
                      disabled="disabled"
                    />
                    <TextAreaFieldGroup
                      placeholder="remarks"
                      name="remarks"
                      value={this.state.remarks}
                      onChange={this.onChange}
                      error={errors.remarks}
                      info="Enter the Employee Remarks if any"
                    />

                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, getProfileByHandle }
)(withRouter(CreateProfile));
