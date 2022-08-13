import { useState } from "react";
import { useContext } from "react";
import { createContext, ReactNode } from "react";
import INewPost from "types/newPost";
import IPost from "types/post";
import { v4 as uuidv4 } from "uuid";

type PropsPostContext = {
  posts: IPost[];
  setPosts: (newPosts: IPost[]) => void;
  newPost: INewPost;
  setNewPost: (newPost: INewPost) => void;
  active: boolean;
  setActive: (newStatus: boolean) => void;
};

const DEFAULT_VALUE = {
  posts: [],
  setPosts: () => {},
  newPost: {
    image: null,
    message: "",
    author: "",
  },
  setNewPost: () => {},
  active: true,
  setActive: () => {},
};

export const PostContext = createContext<PropsPostContext>(DEFAULT_VALUE);

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>(DEFAULT_VALUE.posts);
  const [newPost, setNewPost] = useState<INewPost>(DEFAULT_VALUE.newPost);
  const [active, setActive] = useState<boolean>(DEFAULT_VALUE.active);
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        newPost,
        setNewPost,
        active,
        setActive
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { setNewPost } = useContext(PostContext);

  const clearNewPost = () => {
    setNewPost({
      message: "",
      image: null,
      author: "",
    });
  };

  function addPost(newPost: INewPost) {
    setPosts([
      {
        ...newPost,
        id: uuidv4(),
      },
      ...posts,
    ]);
  }

  function removePost(post: IPost) {
    const result = posts.filter((item) => item.id !== post.id);
    setPosts(result);
  }

  return {
    clearNewPost,
    addPost,
    removePost
  }
};
