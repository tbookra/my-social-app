import { useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import "./share.css";
import { CircularProgress } from "@material-ui/core";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import  {sharePostLogics} from '../../redux/actions/sharePostsActions'
// import { socialServer } from "../../services";

function Share() {
  const dispatch = useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: loggedUser } = useSelector((state) => state.auth);
  const {postSending} = useSelector((state) => state.newPost);
  const descRef = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null
    const newPost = {
      userId: loggedUser._id,
      desc: descRef.current.value,
    };
    if (file) {
      data = new FormData(e.target);
      const fileName = `${Date.now()}${file.name}`;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      // try {
      //   await socialServer.post("/upload", data);
      // } catch (error) {
      //   console.log("error",error);
      // }
    }
    try {
      await dispatch(sharePostLogics(data,newPost))
      // await socialServer.post("/posts", newPost);
      setFile(null)
    } catch (error) {
      console.log("error",error);
    }
  };

 
  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              loggedUser.profilePicture
                ? PF + loggedUser.profilePicture
                : PF + "avatar-profile.jpg"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"what's in your mind " + loggedUser.username + "?"}
            className="shareInput"
            ref={descRef}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgcontainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel  className="shareCancelImg" onClick={()=>setFile(null)}  />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" htmlColor="tomato" />
              <span className="shareOptionText">Photo Or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                className="fileInput"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">tag</span>
            </div>
            <div className="shareOption">
              <Room className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" htmlColor="goldenrod" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareBtn" type="submit">
            {postSending ? <CircularProgress color="white" size="20px" /> :"Share"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
