import './topbar.css'
import {Search, Person, Chat, Notifications} from '@material-ui/icons'

function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <span className="logo">My Social</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
            <Search className='searchIcon' />
            <input type="text" placeholder='Search for friends, post or video' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <div className="topbarLink">Homepage</div>
            <div className="topbarLink">Timeline</div>
        
        
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
            <Person  />
            <div className="topbarIconBadge">1</div>
        </div>
        <div className="topbarIconItem">
            <Chat  />
            <div className="topbarIconBadge">2</div>
        </div>
        <div className="topbarIconItem">
            <Notifications  />
            <div className="topbarIconBadge">3</div>
        </div>
        </div>
        <img src="/assets/pic.jpg" alt="" className="topbarImage" />
     
      </div>
    </div>
  )
}

export default Topbar
