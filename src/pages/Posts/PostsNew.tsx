import React, { useState, useEffect } from "react";

//components
import CreatePost from "./components/CreatePost";

import { PostType } from "utils/interfaces";
import NewsFeed from "./components/NewsFeed";
import styled from "styled-components";

type Props = {};

const PostsNew = (props: Props) => {

  const [newPost, setNewPost] = useState<PostType>()

  return (
    <Wrapper>
        <CreatePost newPost = {setNewPost}/>
        <NewsFeed newPost = {newPost} fetchPostType = 'newPosts'/>
    </Wrapper>
  );
};

const Wrapper = styled.div`

`;

export default PostsNew;
