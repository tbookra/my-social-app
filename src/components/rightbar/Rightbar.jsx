import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socialServer } from "../../services";
import { Add, Remove } from "@material-ui/icons";
import { follow, unfollow } from "../../redux/actions/authActions";
import "./rightbar.css";
import { Users } from "../../dummuData";
import Online from "../online/Online";
import { Link } from "react-router-dom";

function Rightbar({ user }) {
  const dispatch = useDispatch()
  const { user: loggedUser } = useSelector((state) => state.auth);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(loggedUser.followings.includes(user?._id));
  // useEffect(() => {
  //   setFollowed(loggedUser.followings.includes(user?.id));
  // }, [loggedUser.followings, user.id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const {
          data: { success },
        } = await socialServer.get(`/users/friends/${user._id}`);
        setFriends(success);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await socialServer.put(`/users/${user._id}/unfollow`, {
          userId: loggedUser._id,
        });
        dispatch(unfollow(user._id))
      } else {
        await socialServer.put(`/users/${user._id}/follow`, {
          userId: loggedUser._id,
        });
        dispatch(follow(user._id))
      }
      setFollowed(!followed)
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbal = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Yoav becker</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAdd" />
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
        {loggedUser.username !== user.username && (
          <button className="followBtn" onClick={handleFollowClick}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Maried"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing" key={friend._id}>
              <Link 
                
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : `${PF}avatar-profile.jpg`
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbarContainer">
      <div className="rightbarwrapper">
        {user ? <ProfileRightbar /> : <HomeRightbal />}
      </div>
    </div>
  );
}

export default Rightbar;
