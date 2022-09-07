import "./rightbar.css";
import { Users } from "../../dummuData";
import Online from "../online/Online";

function Rightbar({ profile }) {
  console.log("profile", profile);

  const HomeRightbal = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Yoav becker</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAdd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">Kfar Saba</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">Israel</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/pic.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some Name</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbarContainer">
      <div className="rightbarwrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbal />}
      </div>
    </div>
  );
}

export default Rightbar;
