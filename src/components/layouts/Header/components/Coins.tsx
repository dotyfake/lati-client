import { useAppSelector } from 'app/hooks'
import images from 'assets/images'
import React from 'react'
import styled from 'styled-components'

type Props = {
    noMargin?: boolean
}

type StyledType = {
    noMargin?: boolean
}

const Coins = (props: Props) => {
    const {login} = useAppSelector(state => state)
  return (
    <Wrapper noMargin = {props.noMargin}>
        <div className="add-coin">
            <img src={images.coin} alt="coin" />
            <span>{login.userInfo?.coin || 0}</span>
            <img src={images.add} alt="add coin" />
          </div>
    </Wrapper>
  )
}

const Wrapper = styled.div<StyledType>`
    .add-coin{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: #F4F3FF;
        padding: 2px 4px;
        margin-right: ${props => props.noMargin ? '0' : '10px'};
        box-sizing: border-box;
        span{
            font-weight: 600;
            color: #333;
            margin: 0 8px;
        }
        img{
            width: 20px;
            height: 20px;
        }
    }
`

export default Coins