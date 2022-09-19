import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { socialServer } from "../../services";
import "./post.css";
import { MoreVert } from "@material-ui/icons";

function Post({ post }) {
  const [like, setLike] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: loggedUser } = useSelector((state) => state.auth);

  const likeHandler = () => {
    try {
      socialServer.put(`/posts/${post._id}/like`, { userId: loggedUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes?.includes(loggedUser._id));
  }, [loggedUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { success },
      } = await socialServer.get(`/users?userId=${post.userId}`);
      setUser(success);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "avatar-profile.jpg"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={`${PF}${post.img}`} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="likeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
