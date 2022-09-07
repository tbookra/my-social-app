import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightbarTop">
            <div className="profileCover">
              <img src="/assets/pic.jpg" alt="" className="profileCoverImg" />
              <img src="/assets/pic.jpg" alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Profile name</h4>
              <span className="profileInfoDesc">Profile Description</span>
            </div>
          </div>
          <div className="profileRightbarBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
