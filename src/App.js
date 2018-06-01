import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'; 
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      message:""
    }
    this.login = this.login.bind(this);
  }
  login(){
    let username= this.username.value;
    let password =this.password.value
    $.ajax({
      url: "http://localhost:8080/login",
      dataType:'json',
      data:JSON.stringify({"userName" : username,"password" : password}),
      type: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      success:function (data) {
        this.setState({
          message:data.message
        })
      }.bind(this),
      error:function (jqXHR, textStatus, errorMessage) {
        console.log("error")
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container" style={{"display": "inlineBlock","width": "50%","marginTop": "10%", "border": "1px solid #cbcbcb", "padding": "60px", "border-radius": "24px"}}>
          <div className="row" style={{"color": "#428bca","font-size": "25px","font-weight": "bold"}}>Sign in !!</div>
          <div className="row" id="message">{this.state.message}</div>
          <div className="row">
            <div className="col-md-5">
              <label>User Name</label>
            </div>
            <div className="col-md-3" >
              <input ref={(username) => this.username = username} type="text" name="username"/>
            </div>
          </div>
          <div  className="row">
            <div className="col-md-5">
              <label>Password</label>
            </div>
            <div className="col-md-3" >
              <input ref={(password) => this.password = password}  type="password" name="password"/>
            </div>
          </div>
          <div  className="row">
            <button className="blockElement" onClick={this.login}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
