import React, { useState, useEffect } from "react";

//components
import CreatePost from "./components/CreatePost";

import { PostType } from "utils/interfaces";
import NewsFeed from "./components/NewsFeed";
import styled from "styled-components";

type Props = {
    
}

const PostsFollowing = (props: Props) => {

  return (
    <Wrapper>
    <NewsFeed newPost={undefined} fetchPostType = 'following'/>
</Wrapper>
  )
}


const Wrapper = styled.div`

`;

export default PostsFollowing