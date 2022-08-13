import { PostContext } from "common/context/Post";
import { ReactNode, useContext } from "react";
import style from "./Feed.module.scss";
import Post from "./Post";

function Feed() {
  const { posts } = useContext(PostContext);
  return (
    <div className={style.feed}>
      <h2>Feed</h2>
      {posts.map((item) => (
          <Post key={item.id} {...item} />
        ))}
    </div>
  );
}

export default Feed;
