import './share.css'
import {PermMedia, Label, Room, EmojiEmotions} from '@material-ui/icons'

function Share() {
  return (
    <div className='shareContainer'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src="/assets/pic.jpg" alt="" className="shareProfileImg" />
            <input placeholder="what's in your mind" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia className='shareIcon' htmlColor='tomato' />
                    <span className="shareOptionText">Photo Or Video</span>
                </div>
                <div className="shareOption">
                    <Label className='shareIcon' htmlColor='blue'  />
                    <span className="shareOptionText">tag</span>
                </div>
                <div className="shareOption">
                    <Room className='shareIcon' htmlColor='green' />
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions className='shareIcon' htmlColor='goldenrod' />
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareBtn">Share</button>
        </div>
      </div>
    </div>
  )
}

export default Share
