import React, { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import api from "../../services/BaseAuthenticationServices";

const AccountSetting = () => {
  const [user, setUser] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [checkDisplayName, setCheckDisplayName] = useState(false);
  const [messageDisplayName, setMessageDisplayName] = useState(
    "Please just input characters and numbers and vietnamese characters"
  );
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [avatarPath, setAvatarPath] = useState(null);
  const [checkAvatarPath, setCheckAvatarPath] = useState(false);
  const [currentU, setCurrentU] = useState("")
  const [messageAvatarPath, setMessageAvatarPath] = useState(
    "Please just input file JPEG and file size less than 5MB"
  );
  //   const history = useHistory();

  useEffect(() => {
    api.get("/api/users/loginuser").then((res) =>
      setUsername(res.data))

    api.get("/api/users/info").then(
      (res) => {
        setUser(res.data);
        setDisplayName(res.data.displayName);
        setEmail(res.data.email);
        setDob(res.data.dob);
        setUsername(username);
        setCurrentU(res.data.username);
      }
    );
  }, []);

  const saveUser = (e) => {
    e.preventDefault();
    let User = {
      email: email,
      displayName: displayName,
      dob: dob,
      username: username,
    };

    if (checkDisplayName || checkAvatarPath) {
      alert("can not load data to update!!!");
      return;
    }

    console.log(JSON.stringify(User));
    UserServices.updateUserInformation(User);
    let temp = avatarPath;
    if (temp !== null) {
      const formData = new FormData();
      formData.append("avatarPath", temp);
      UserServices.updateUserAvatar(formData);
    }
    window.location.href = "/user/" + currentU
  };

  const changeGmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changeDisplayNameHandler = (event) => {
    const inputDisplayName = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputDisplayName)) {
      setCheckDisplayName(true);
      return;
    }
    setCheckDisplayName(false);
    setDisplayName(inputDisplayName);
  };
  const changeDobHandler = (event) => {
    setDob(event.target.value);
  };
  const changeAvatarHandler = (event) => {
    const avatar = event.target.files[0];
    if (!avatar) {
      // alert("Please choose a file");
      setCheckAvatarPath(true);
      return;
    }

    if (avatar.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      setCheckAvatarPath(true);
      return;
    }

    if (!avatar.type.includes("image/jpeg")) {
      // alert("Please select an image file.");
      setCheckAvatarPath(true);
      return;
    }
    setCheckAvatarPath(false);
    setAvatarPath(avatar);
  };

  const cancel = (e) => {
    window.location.href = "/user/" + currentU;
  };

  return (
    <div>
      {/* <form>
        <label name="displayName">Display Name: </label>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={changeDisplayNameHandler}
        />
        {checkDisplayName ? (
          <>
            <div style={{ height: "10px" }}></div>
            <Alert key={"danger"} variant={"danger"}>
              {messageDisplayName}
            </Alert>
          </>
        ) : null}
        <br></br>
        <input
          type="file"
          name="avatarPath"
          onChange={changeAvatarHandler}
        ></input>
        {checkAvatarPath ? (
          <>
            <div style={{ height: "10px" }}></div>
            <Alert key={"danger"} variant={"danger"}>
              {messageAvatarPath}
            </Alert>
          </>
        ) : null}
        <br></br>
        <label name="email">Email: </label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={changeGmailHandler}
        />
        <br></br>
        <label name="dob">DoB: </label>
        <input type="date" value={dob} name="dob" onChange={changeDobHandler} />
        <input type="submit" value="update" />
        <br></br>
        <button className="btn btn-success" onClick={saveUser}>
          Save
        </button>
        <button className="btn btn-danger">
          <Link to={"../../user/" + username}>Cancel</Link>
        </button>
      </form> */}

      <div className="container">
        <h2 className="login-title">Account Setting</h2>

        <form className="login-form" >

          {/* <div>
            <label for="username">Username </label>
            <input
              type="text"
              value={username}
              name="username"
              onChange={changeDisplayNameHandler}
            />
          </div> */}

          <div>
            <label for="displayName">Display Name </label>
            <input
              type="text"
              value={displayName}
              name="displayName"
              onChange={changeDisplayNameHandler}
              placeholder="Enter Display Name"
              className="form-control"

            />
          </div>

          <div>
            <label for="email">Email </label>
            <input
              type="text"
              value={email}
              name="email"
              onChange={changeGmailHandler}
              placeholder="Enter email"
              className="form-control"

            />
          </div>
          <div>
            <label for="dob">Day Of Birth </label>
            <input
              type="date"
              value={dob}
              name="dob"
              onChange={changeDobHandler}
              placeholder="Enter email"
              className="form-control"

            />
          </div>
          <div>
            <label for="avatarPath">Avatar </label>
            <input
              type="file"
              name="avatarPath"
              onChange={changeAvatarHandler}
              className="form-control"

            ></input>
          </div>
          <button className="btn btn--form" type="submit" value="Log in" onClick={saveUser}>
            Change Information
          </button>
          <button className="btn btn-danger" >
            <Link to={"../../user/" + username}>Cancel</Link>
          </button>

        </form>
      </div>
    </div>
  );
};

export default AccountSetting;

// import React, { Component } from "react";
// import UserServices from "../../services/UserServices";
// import {Link} from "react-router-dom"
// import { useHistory } from 'react-router-dom';

// class AccountSetting extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: {},
//             displayName:'',
//             email:'',
//             dob:'',
//             username: '',
//             avatarPath: null
//         };
//         this.changeAvatarHandler= this.changeAvatarHandler.bind(this);
//         this.changeGmailHandler = this.changeGmailHandler.bind(this);
//         this.changeDisplayNameHandler = this.changeDisplayNameHandler.bind(this);
//         this.changeDobHandler = this.changeDobHandler.bind(this);
//         this.saveUser = this.saveUser.bind(this);
//         this.cancel = this.cancel.bind(this);
//     }

//     componentDidMount() {
//         UserServices.getUserByUserName("duckm").then((res) => {
//             this.setState({ user: res.data });
//             this.setState({displayName: this.state.user.displayName});
//             this.setState({email: this.state.user.email});
//             this.setState({dob: this.state.user.dob});
//             this.setState({username: this.state.user.username});
//         });
//     }

//     saveUser(e) {
//         e.preventDefault();
//         let User = {email: this.state.email, displayName: this.state.displayName, dob: this.state.dob,username: this.state.username};

//         console.log(JSON.stringify(User));
//         UserServices.updateUserInformation(User)
//         let avatarPath=this.state.avatarPath
//         if(avatarPath !== null){
//             const formData = new FormData();
//             formData.append('avatarPath', avatarPath);
//             formData.append('username',this.state.username)
//             UserServices.updateUserAvatar(formData)
//         }

//     }

//     changeGmailHandler(event) {
//         this.setState({email: event.target.value})
//     }
//     changeDisplayNameHandler(event) {
//         this.setState({displayName: event.target.value})
//     }
//     changeDobHandler(event) {
//         this.setState({dob: event.target.value})
//     }
//     changeAvatarHandler(event) {
//         this.setState({avatarPath: event.target.files[0]})
//     }

//     cancel() {

//     }

//     render() {
//         const { user } = this.state;
//         return (
//             <div>
//                 <form>
//                     <label name="displayName">Display Name: </label>
//                     <input type="text" value={this.state.displayName} name="displayName" onChange={this.changeDisplayNameHandler} />

//                     <input type="file" name="avatarPath" onChange={this.changeAvatarHandler}></input>

//                     <label name="email">Email: </label>
//                     <input type="text" value={this.state.email} name="email" onChange={this.changeGmailHandler} />

//                     <label name="dob">DoB: </label>
//                     <input type="date" value={this.state.dob} name="dob" onChange={this.changeDobHandler }/>
//                     <input type="submit" value="update"/>

//                     <button className="btn btn-success" onClick={this.saveUser}>Save</button>
//                     <button className="btn btn-danger" ><Link to={"/user/"+this.state.username}>Cancel</Link></button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default AccountSetting;
