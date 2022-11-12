import React from "react";
import styled from "styled-components";

type Props = {};

const Wrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 10px;
.dots {
    margin-left: 5px;
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.dots div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: var(--primary-color);
  animation: fade 0.8s ease-in-out alternate infinite;
}

.dots div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.dots div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
`;

const Uploading = (props: Props) => {
  return (
    <Wrapper>
        Uploading
      <div className="dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Uploading;
