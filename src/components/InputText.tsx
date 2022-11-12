import React from 'react'
import styled from 'styled-components';

type Props = {
    children: React.ReactNode | string;
    style: React.CSSProperties
}

const Wrapper = styled.input`
    
`

const InputText = (props: Props) => {
  return (
    <Wrapper style={props.style}>
        {props.children}
    </Wrapper>
  )
}

export default InputText