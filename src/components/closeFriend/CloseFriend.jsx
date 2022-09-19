import "./closeFriend.css";

function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <li className="leftbarFriend">
      <img src={PF+user.profilePicture} alt="" className="leftbarFriendImg" />
      <span className="rightbarFriendName">{user.username}</span>
    </li>
  );
}

export default CloseFriend;
