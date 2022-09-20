import "./profile.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { socialServer } from "../../services";
import { updateProfileImgLogics } from "../../redux/actions/sharePostsActions";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import BasicModal from "../../components/Modals/BasicUploadModal";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();
  const { img_uploads, uploadSuccess } = useSelector(
    (state) => state.profileImgUpdate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { success },
      } = await socialServer.get(`/users?username=${username}`);
      setUser(success);
    };
    fetchUser();
  }, [username, uploadSuccess]);

  const handleDeletePic = async (type) => {
    console.log("cover clicked", type);
    const data = new FormData();
    const userField = type === "Cover" ? "coverPicture" : "profilePicture";
    const updateProfile = { [userField]: "", userId: user._id };
    await dispatch(updateProfileImgLogics(data, updateProfile, user._id)); //fileData, userData,userId
  };
  const handleEditPic = async (type, file) => {
    console.log("profile clicked", type);
    const data = new FormData();
    const fileName = `${Date.now()}${file.name}`;
    data.append("name", fileName);
    data.append("file", file);
    const userField = type === "Cover" ? "coverPicture" : "profilePicture";
    const updateProfile = { [userField]: fileName, userId: user._id };
    await dispatch(updateProfileImgLogics(data, updateProfile, user._id)); //fileData, userData,userId
  };

  const coverPositioning = { position: "absolute", top: "-55px", right: "5px" };
  const profilePositioning = {
    position: "absolute",
    top: "-30px",
    right: "-32vw",
  };

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightbarTop">
            <div className="profileCover">
              {img_uploads ? (
                <CircularProgress />
              ) : (
                <img
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : `${PF}cover_avatar.jpg`
                  }
                  alt=""
                  className="profileCoverImg"
                />
              )}
              <BasicModal
                className="coverEditIcon"
                functions={[handleDeletePic, handleEditPic]}
                positioning={coverPositioning}
                theme="Cover"
              />
              {img_uploads ? (
                <CircularProgress />
              ) : (
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : `${PF}avatar-profile.jpg`
                  }
                  alt=""
                  className="profileUserImg"
                />
              )}
              <BasicModal
                className="coverEditIcon"
                functions={[handleDeletePic, handleEditPic]}
                positioning={profilePositioning}
                theme="Profile"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightbarBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
