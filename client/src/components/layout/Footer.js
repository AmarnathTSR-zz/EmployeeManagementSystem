import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; 2018 Amarnath TSR and other EMS contributors.
        Maintained by Author{" "}
        <a href="https://www.amarnath.xyz">Amarnath TSR </a>
        <br />
        This work is licensed under a{" "}
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-sa/3.0/us/"
        >
          Creative Commons Attribution-ShareAlike 3.0 United States License
        </a>
      </footer>
    );
  }
}

export default Footer;
