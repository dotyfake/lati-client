import React from "react";
import styled from "styled-components";

type Props = {};

const Wrapper = styled.div`
  svg {
    width: 30px;
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--primary-color);
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -125px;
    }
  }
`;

const LoadingIcon = (props: Props) => {
  return (
    <Wrapper>
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
    </Wrapper>
  );
};

export default LoadingIcon;
