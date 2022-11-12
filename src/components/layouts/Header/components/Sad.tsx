import React from "react";
import styled from "styled-components";
import images from "assets/images";

type Props = {
  content: string
};

const Sad = (props: Props) => {
  return (
    <Wrapper>
      <div className="sad">
        <img src={images.bunnySad} alt="sad" />
      </div>
      <h2>{props.content}</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sad {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  h2 {
    text-align: center;
  }
`;

export default Sad;
