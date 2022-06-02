import styled from 'styled-components'
import {  blue, blueBG, black, whiteBG } from '../../utils/colors'


const StyledContentContainer = styled.div`
width: 100%;
border-radius: 12px;
background-color: ${whiteBG};
overflow: hidden;
cursor: auto;

`
const StyledHeaderContent = styled.div`
height: 30px;
background-color: ${blue};
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
padding-right: 20px;
padding-left: 15px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
align-items: center;
overflow-x: hidden;

:active {
    box-shadow: 3px 3px 20px ${black};
}
`
const StyledContent = styled.div`
background-color: ${blueBG};
display: flex;
align-items: center;
justify-content: space-around;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
overflow-y: auto;
min-width: 100%;
`
const Button = styled.div`
width: 120px;
background-color: ${black};
color: ${whiteBG};
height: 40px;
border-radius: 3.5px;
display: grid;
place-items: center;
cursor: pointer;
transition: all 0.2s ease-in-out;

:hover {
    transform: scale(0.95);
}
`
const Divider = styled.div`
width: 100vw;
height: 5px;
background-color: ${black};
`
const MainContainer = styled.div`
background-color: ${props => props.buildBG};
min-height: 700px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
user-select: none;
`
const EmptyContentPlaceholder = styled.img`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`

export { EmptyContentPlaceholder, MainContainer, Divider, Button, StyledContent, StyledHeaderContent, StyledContentContainer }