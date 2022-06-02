import React from 'react'
import { useDrop } from "react-dnd";
import styled from 'styled-components';
import { ContentState } from '../../Contexts/EmailContent';
import { blueBG1 } from '../../utils/colors';
import { ContentContainerTemplate } from './index'
import useContentController from './useContentController'


const SingleSection = ({ sectionData, contentIndex, consecutiveElementIndex }) => {
    const {contentData} = ContentState()
    const { content } = useContentController(contentData)
    const type = "single-section" + contentIndex + consecutiveElementIndex;

    const [, drop] = useDrop({
        accept: [type, 'section-block'],
        drop: (item, monitor) => {
            console.log({item, monitor})
        }   
    })

    return (
        <StyledSingleSection 
            ref = {drop}
            className = {"subsection-" + consecutiveElementIndex}
        >
            {
                sectionData && sectionData.length ?
                sectionData.map((block, index) => (
                    <ContentContainerTemplate
                        title={block.title} 
                        style = {block.style}
                        key = {"content"+ index} 
                        deleteContentItem={()=> {}}
                        index={index}
                        sectionDetails = {{
                            type: `type-single-section-${contentIndex}-${consecutiveElementIndex}`,
                            consecutiveElementIndex,
                            singleSectionIndex: index
                        }}
                    >
                        {content(block.title, contentIndex, consecutiveElementIndex, index)}
                    </ContentContainerTemplate>
                )) :

                <StyledEmptySection>
                    insert upto three block here
                </StyledEmptySection>
            }
        </StyledSingleSection>
    )
}

export default function Section({ index: contentIndex }) {
  const {contentData} = ContentState()

  return (
    <SectionColumnContainer 
        className = {"section-content-" + contentIndex}
    >

        {contentData[contentIndex].sections.map((section, index) => (
            <SingleSection 
                sectionData = {section} 
                key = {'singlesection' + index}
                contentIndex = {contentIndex}
                consecutiveElementIndex = {index}
            />
        ))}
    </SectionColumnContainer>
  )
}

const SectionColumnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 2px;

    width: 100%;
    padding: 5px;
`

const StyledSingleSection = styled.div`
    width: ${props => props.width || "48%"};
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    border: 2px solid ${blueBG1};
    border-radius: 10px;
`

const StyledEmptySection = styled.div`
    min-height:75px;
    line-height: 75px;
    text-align: center;
`