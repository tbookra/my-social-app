import './login.css'

export default function Login() {
  return (
    <div className='loginContainer'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">SomeLogo</h3>
            <span className="loginDesc">
                Connect with friends and the world around you
            </span>
        </div>
        <div className="loginRight">
            <div className="loginBox">
                <input placeholder="Email" className="loginInput" />
                <input placeholder="Password" className="loginInput" />
                <button className="loginButton">Login</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterBtn">Create an Account</button>
            </div>
        </div>
      </div>
    </div>
  )
}
