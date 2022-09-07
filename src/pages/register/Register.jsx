import './register.css'

export default function Register() {
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
                <input placeholder="Username" className="loginInput" />
                <input placeholder="Email" className="loginInput" />
                <input placeholder="Password" className="loginInput" />
                <input placeholder="Password again" className="loginInput" />
                <button className="loginButton">Login to your new account</button>
             
            </div>
        </div>
      </div>
    </div>
  )
}
