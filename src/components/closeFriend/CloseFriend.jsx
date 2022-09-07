import "./closeFriend.css";

function CloseFriend({user}) {
  return (
    <li className="leftbarFriend">
      <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
      <span className="rightbarFriendName">{user.username}</span>
    </li>
  );
}

export default CloseFriend;
