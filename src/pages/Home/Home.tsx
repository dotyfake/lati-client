import { useAppSelector } from "app/hooks";
import styled from "styled-components";
import { Banner, SlideSkills, RecommendPlayers } from "./components";
type Props = {};
const Wrapper = styled.div`
  height: 3000px;
 .content{
      width: var(--max-w);
      margin: 0 auto;
    }
`;


const Home = (props: Props) => { 
  const { listGame } = useAppSelector((state) => state);
 
  return (
    <Wrapper>
        <div className="content">
          <Banner />
          <SlideSkills />
          <div className="RecommendGroup">
              {listGame.listGame && listGame.listGame.map((item, i) => <RecommendPlayers key= {i} slug = {item.slug} title = {item.name}/>)}
          </div>
        </div>
    </Wrapper>
  );
};

export default Home;
