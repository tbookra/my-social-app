import "./feed.css";
import { useSelector } from "react-redux";
import Share from "../share/Share";
import Post from "../post/Post";
import { socialServer } from "../../services";
import { useState, useEffect } from "react";
// import {Posts} from '../../dummuData'

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user: loggedUser } = useSelector((state) => state.auth);
  const { newPostId } = useSelector((state) => state.newPost);
  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { success },
      } = username
        ? await socialServer.get(`/posts/profile/${username}`)
        : await socialServer.get(`/posts/timeline/${loggedUser._id}`);
      setPosts(
        success.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, loggedUser._id, newPostId]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!username || username === loggedUser.username) && <Share />}
        {posts.map((p) => (
          <Post key={ Math.random().toString(36).substr(2,5)} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
