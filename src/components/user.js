import React from 'react'
import "regenerator-runtime/runtime";

const mockUser = {
    id: "eacb9310-7ddd-472a-84e2-f4f2599676a5",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhY2I5MzEwLTdkZGQtNDcyYS04NGUyLWY0ZjI1OTk2NzZhNSIsInVzZXJuYW1lIjoidGlsIiwiaWF0IjoxNjU5Mjk2NzEzLCJleHAiOjE2NjQ0ODA3MTN9.U_dAR20qoPpH2_SDTOze2QFr8yCvppSYbQkh1IErw_4",
    username: "Olumide"
}

class User extends React.Component {
  initialState = {user: {}, error: null, pending: false}
  state = this.initialState
  reset(overrides) {
    const newState = {...this.initialState, ...overrides}
    this.setState(newState)
    return newState
  }
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token){
      this.login();
    }
  }
  login = () => {
    this.reset({pending: true});
    this.reset({user: mockUser});
    window.localStorage.setItem('token', mockUser.token);
  }
  logout = () => {
    console.log("logout")
    this.reset({pending: true});
    this.reset({user:{}});
  }
  render() {
    return this.props.children({
      ...this.state,
      login: this.login,
      logout: this.logout,
    })
  }
}

export default User
