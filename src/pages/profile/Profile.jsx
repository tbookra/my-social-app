import "./profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { socialServer } from "../../services";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({});
  const {username} = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { success },
      } = await socialServer.get(`/users?username=${username}`);
      setUser(success);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightbarTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF + user.coverPicture : `${PF}cover_avatar.jpg`} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ?  PF + user.profilePicture : `${PF}avatar-profile.jpg`} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightbarBottom">
            <Feed username={username} />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
