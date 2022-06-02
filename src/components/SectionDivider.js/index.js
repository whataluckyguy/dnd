import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { black, blue, blueBG1, opaqueBG, whiteBG } from '../../utils/colors';

export default function SectionDivider({sectionData, activeSection, setActiveSection, style, background}) {
  const getActiveComponent = useMemo(() => {
    return sectionData.find(section => section.name === activeSection).component || <></>;
  }, [activeSection, sectionData])

  return (
    <SectionDividerRoot style={style}>
        {/* nav */} 
        {(sectionData).map((section, index) => {
            return (
                <StyledSingleNav 
                  key = {sectionData[0].name + index}
                  onClick = {() => setActiveSection(section.name)}
                  active = {section.name === activeSection}>
                    {section.name}
                </StyledSingleNav>
            )
        })}
 
        {/* Section */}
        <StyledActiveComponent background = {background}> {getActiveComponent}  </StyledActiveComponent>
        
    </SectionDividerRoot>
  )
}

const StyledSingleNav = styled.div`
  display: inline-block;
  background-color: ${props => props.active? whiteBG: "transparent"};
  color: ${props => props.active ? blue: black};
  padding: 10px 20px 10px 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: ${props => props.active? "2px 2px 10px rgba(0, 0, 0, 0.131)": null};
  cursor: pointer;
  border-bottom: 2px solid ${black};
`
const starterAnimation = keyframes`
 0% { opacity: 0; transform: translateY(15px); }
 100% { opacity: 1; transform: translateY(0); }
`
const SectionDividerRoot = styled.div`
  background-color: ${opaqueBG};
`
const StyledActiveComponent = styled.div`
  min-height: calc(100vh - 300px);
  animation-name: ${starterAnimation};
  animation-duration: 0.7s;
  ${props => props.background && ` border-radius: 5px; 2px solid ${blueBG1}`};
  margin-top: 25px;

 
`
