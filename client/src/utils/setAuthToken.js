import axios from "axios";

const setAuthToken = token => {

  if(token)
  {
          // apply token for every request
    axios.defaults.headers.common['Authorization'] = token;
  }
else{
    // Delete auth header
    delete axios.defaults.headers.common['Authorisation'];
}

}

export default setAuthToken;