import { useRef } from "react";
import { useHistory } from "react-router";
import "./login.css";
import { submitFormLogics } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching } = useSelector((state) => state.auth);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      submitFormLogics(
        { email: emailRef.current.value, password: passwordRef.current.value },
        "login"
      )
    );
  };
  const handleCreateAccount = () =>{
    history.push("/register")
  }

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SomeLogo</h3>
          <span className="loginDesc">
            Connect with friends and the world around you
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={emailRef}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              minLength="6"
              required
              ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="outerForm">
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterBtn" onClick={handleCreateAccount}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create an Account"
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
