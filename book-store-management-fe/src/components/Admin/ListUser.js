import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import { Link } from "react-router-dom";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
const ListUser = () => {
  const [users, setUsers] = useState([]);
  const getAllUser = () => {
    UserServices.getUserForSuperAdmin()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllUser();
  });
  const deleteUser = (username)=>{
    console.log(username);
    UserServices.deleteUser(username)
    .then((response)=>{
        getAllUser();
    }).catch((error)=>{
        console.log(error);
    })
  }
  return (
    <>
        <SuperAdmin />
      <h1>List Admin</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((user, index) =>
            user.roles.map((role) =>
              role.roleId == 2 ? (
                <tr key={user.id}>
                  <td>{index}</td>
                  <td>{user.displayName}</td>

                  <td>
                    <p>{role.roleName}</p>
                  </td>
                  <td><button className="btn btn-secondary" >Demote User</button><button className="btn btn-danger" onClick = {() => deleteUser(user.username) }>Delete</button></td>
                </tr>
                
              ) : (
                ""
              )
            )
          )}
        </tbody>
      </table>
      <h1>List User</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((user, index) =>
            user.roles.length == 1?user.roles.map((role) =>
            role.roleId == 3? (
              <tr key={user.id}>
                <td>{index}</td>
                <td>{user.displayName}</td>
                <td>
                  <p>{role.roleName}</p>
                </td>
                <td><button className="btn btn-warning" >Promote Admin</button><button className="btn btn-danger" onClick = {() => deleteUser(user.username) } >Delete</button></td>
              </tr>
            ) : (
              ""
            )
          ):""
          )}
        </tbody>
      </table>
    </>
  );
};

export default ListUser;
