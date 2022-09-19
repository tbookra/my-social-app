import { useRef } from "react";
import { socialServer } from "../../services";
import { submitFormLogics } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory()

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const { isFetching } = useSelector((state) => state.auth);

const handleSubmit = async (e) => {
  e.preventDefault()
  if(passwordAgainRef.current.value !==passwordRef.current.value){
    passwordAgainRef.current.setCustomValidity("passwords don't match! try again")
  } else {
    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const {success} = await socialServer.post("/auth/register",user)
      if(success){
        history.push("/login")
      }else{
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SomeLogo</h3>
          <span className="registerDesc">
            Connect with friends and the world around you
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit} >
            <input
              placeholder="Username"
              required
              className="registerInput"
              ref={usernameRef}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="registerInput"
              ref={emailRef}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="registerInput"
              ref={passwordRef}
            />
            <input
              placeholder="Password again"
              type="password"
              required
              className="registerInput"
              ref={passwordAgainRef}
            />
            <button type="submit" className="registerButton" onClick={handleSubmit}>Register to your new account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
