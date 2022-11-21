import images from 'assets/images'
import styled from 'styled-components'
import { useAuth } from 'utils/hooks'
import Coins from './components/Coins'

type Props = {}

const HeaderMobile = (props: Props) => {
  const isAuth = useAuth()
  return (
    <Wrapper>
      <div className="logo">
        <img src={images.logo} alt="" />
      </div>
      {isAuth && <div className="coins">
        <Coins noMargin/>
      </div>}
    </Wrapper>
  )
}

const Wrapper = styled.header`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 50px;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #fff;
box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
z-index: 1001;
  .logo{
    img{
      height: 50px;
    }
  }
`

export default HeaderMobile