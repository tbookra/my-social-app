import "./topbar.css";
import { useSelector } from "react-redux";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Topbar() {
  const { user: loggedUser } = useSelector((state) => state.auth);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">My Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friends, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <div className="topbarIconBadge">1</div>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <div className="topbarIconBadge">2</div>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <div className="topbarIconBadge">3</div>
          </div>
        </div>
        <Link to={`/profile/${loggedUser.username}`}>
        <img
          src={
            loggedUser.profilePicture
              ? PF + loggedUser.profilePicture
              : PF + "avatar-profile.jpg"
          }
          alt=""
          className="topbarImage"
        />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
