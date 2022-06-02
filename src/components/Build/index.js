import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { blueBG, blueBG1 } from '../../utils/colors'
import SVGIcon from '../../utils/components/SVGicon/index.tsx'
import { blockItems } from '../../utils/data'


export default function Build() {
  const getDraggableStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    cursor: isDragging ? "copy" : "auto",
  })

  return (
        <StyledMainContainer >
            <div style={{display: "flex", flexWrap: 'wrap', gap: "15px", paddingTop: "10px", paddingBottom: "10px", justifyContent: "center"}}>
              {blockItems.map((item, index) => (
                item.hasOwnProperty('blockHeaderTitle') ? 
                  <div style = {{minWidth: '100%', paddingTop: '15px', paddingLeft: '60px'}}> { item.blockHeaderTitle } </div> :

                  <Droppable droppableId={'email-template-build'+ index} isDropDisabled={true} key = {'email-template-build'+ index}>
                  {(provided, snapshot) => (
                    <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key = {"etb"+ index}>
                      <Draggable draggableId={item.name} index = {index} key = {item.name}>
                        {(provided, snapshot) => (
                          <>
                            <StyledBlockItem
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style = {getDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                                <SVGIcon icon = {item.name} />
                                {/* <img src = {item.image} width="30px" height = "30px" alt="X" style={{borderRadius: "5px"}}/>  */}
                                <div> {item.name} </div>
                            </StyledBlockItem>

                            {snapshot.isDragging && 
                              <StyledBlockItem >
                                <SVGIcon icon = {item.name} />
                                <div> {item.name} </div>
                            </StyledBlockItem>
                            }
                          </>
                        )}
                      </Draggable>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
      </StyledMainContainer>
  )
}

const StyledMainContainer = styled.div`
  min-height: 60vh;
  font-size: 0.9rem;
  padding: 8px;
  padding-top: 0px;
  padding-bottom: 15px;
  background-color: ${blueBG};
`
const StyledBlockItem = styled.div`
  width: 90px;
  height: 90px;
  background-color: ${blueBG};
  border: 2px solid ${blueBG1};
  border-radius: 5px;

  :hover{
    cursor: auto;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
`

