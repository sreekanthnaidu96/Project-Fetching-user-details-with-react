import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Users() {
  const Api =
    "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  let query = new URLSearchParams(useLocation().search);
  let id = query.get("id");
  //now we need to just minus one from original data to get user details
  let new_id = id - 1;
  // eslint-disable-next-line
  let Person_Data = Data[new_id] === undefined ? {} : Data[new_id];
  const { push } = useHistory();

  const Handle = () => {
    push("/data");
  };

  useEffect(() => {
    const fetch_data = async () => {
      setLoading(true);
      const response = await axios.get(Api);
      setData(response.data);
      let users = response.data;
      let userid = new_id;
      setUser(users[userid]);
      setLoading(false);
    };
    fetch_data();
    // eslint-disable-next-line
  }, []);

  if (Loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <button className="m-5" onClick={Handle}>
        <i style={{ marginRight: 10 }} className="fas fa-arrow-left"></i>
        Details: {user.first_name} {user.last_name}
      </button>
      <div className="container">
        <table className="table table-dark table-hover mt-1">
          <tbody>
            <tr>
              <td>First Name : {user.first_name}</td>
            </tr>
            <tr>
              <td>Last Name: {user.last_name}</td>
            </tr>
            <tr>
              <td>Company Name: {user.company_name}</td>
            </tr>
            <tr>
              <td>City: {user.city}</td>
            </tr>
            <tr>
              <td>State: {user.state}</td>
            </tr>
            <tr>
              <td>Zip: {user.zip}</td>
            </tr>
            <tr>
              <td>Email: {user.email}</td>
            </tr>
            <tr>
              <td>Web: {user.web}</td>
            </tr>
            <tr>
              <td>Age: {user.age}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
