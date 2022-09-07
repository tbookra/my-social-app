import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import Leftbar from '../../components/leftbar/Leftbar'

export default function Home() {
  return (
    <>
      <Topbar  />
      <div className="homeContainer">
        <Leftbar   />
        <Feed   />
        <Rightbar   />
      </div>
      
    </>
  )
}
