import React, { ReactPropTypes } from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps{
    onLogin: (newName: string, id: number, newUserType: string) => void
}

export default class LoginForm extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
      }

      state = {
          redirect: false,
          user: {
            email: "",
            password: "",
          },
      }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newUser: any = { ...this.state.user };
    newUser[event.target.name] = event.target.value;

    this.setState({ user: newUser });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log(this.state);
    Axios.post("http://localhost:8080/login", this.state.user).then((resp) => {
      console.log(resp.data);
    this.setState({redirect: true });
    this.props.onLogin(resp.data.userName, resp.data.id, "User");
    }).catch(err => {alert("Invalid login")});
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      return (
          
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Login Form</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.user.email}
              ></input>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.user.password}
              ></input>
              <button
                className="text-2xl rounded-full py-2 px-2 bg-red-400"
                type="submit"
              >
                Login!
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}