import React from 'react';
import styled from 'styled-components';

export interface SVGIconProps {
  icon: string;
  color?: string;
  size?: string;
  hoverColor?: string;
}

const StyledIcon = styled.span<Partial<SVGIconProps>>`
  display: inline-flex;
  text-align: center;
  height: ${(props) => props.size};
  min-width: ${(props) => props.size};
  color: ${(props) => props.color};

  &:hover {
    & > svg {
      & > path:last-of-type {
        fill: ${(props) => props.hoverColor};
      }
    }
  }
`;

const SVGIcon = ({ icon, ...rest }: SVGIconProps) => {
  let svg;
  try {
    svg = require(`!raw-loader!./icons/${icon}.svg`).default;
  } catch (e) {
    console.error('Icon not found:', `${icon}.svg`, e);
    svg = '<span>x</span>';
  }
  return (
    <StyledIcon
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
};

export default SVGIcon;
