//components
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