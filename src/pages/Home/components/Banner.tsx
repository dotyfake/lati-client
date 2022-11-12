import React from 'react'
import images from "assets/images";
import styled from 'styled-components';

type Props = {}

const Wrapper = styled.div`
    .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0 30px;
    height: 240px;
    border-radius: 12px;
    color: #fff;
    font-size: 36px;
    font-weight: 600;

    p {
      text-align: center;
    }
  }
`
const Banner = (props: Props) => {
  return (
    <Wrapper>
        <div
          className="banner"
          style={{
            background: `url(${images.banner}) no-repeat center / cover`,
          }}
        >
          <p>
            Meet New Gamer Friends.
            <br />
            Never Play Solo Again
          </p>
        </div>
    </Wrapper>
  )
}

export default Banner