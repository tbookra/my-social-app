import "./leftbar.css";
import {
  RssFeed,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  PlayCircleFilledOutlined,
  Bookmark,
  Group,
} from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import {Users} from '../../dummuData'

function Leftbar() {
  return (
    <div className="leftbarContainer">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarItem">
            <RssFeed className="leftbarIcon" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarItem">
            <HelpOutline className="leftbarIcon" />
            <span className="leftbarListItemText">Questions</span>
          </li>
          <li className="leftbarItem">
            <WorkOutline className="leftbarIcon" />
            <span className="leftbarListItemText">Jobs</span>
          </li>
          <li className="leftbarItem">
            <Event className="leftbarIcon" />
            <span className="leftbarListItemText">Events</span>
          </li>
          <li className="leftbarItem">
            <School className="leftbarIcon" />
            <span className="leftbarListItemText">Courses</span>
          </li>
          <li className="leftbarItem">
            <PlayCircleFilledOutlined className="leftbarIcon" />
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarItem">
            <Bookmark className="leftbarIcon" />
            <span className="leftbarListItemText">Bookmarks</span>
          </li>
          <li className="leftbarItem">
            <Group className="leftbarIcon" />
            <span className="leftbarListItemText">Group</span>
          </li>
        </ul>
        <button className="leftbarBtn">Show More</button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {Users.map(u=>(
            <CloseFriend key={u.id} user={u}  />
          ))}
          
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
