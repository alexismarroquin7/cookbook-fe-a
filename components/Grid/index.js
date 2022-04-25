import styled from "styled-components";

const StyledGrid = styled.div`
  display: flex;
  flex-flow: ${({direction}) => direction ? direction : 'row wrap'};
  justify-content: ${({justify}) => justify ? justify : 'flex-start'};
  align-items: ${({align}) => align ? align : 'flex-start'};
  gap: ${({gap}) => gap ? gap : '0'};
  border: ${({border}) => border ? border : 'none'};
  width: ${({width}) => width ? width : 'auto'};
  height: ${({height}) => height ? height : 'auto'};
  padding: ${({padding}) => padding ? padding : '0'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  color: ${({color}) => color ? color : 'auto'};
  width: ${({width}) => width ? width : 'auto'};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '0'};
  box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : '0'};
  position: ${({position}) => position ? position : ''};
  top: ${({top}) => top ? top : ''};
  bottom: ${({bottom}) => bottom ? bottom : ''};
  right: ${({right}) => right ? right : ''};
  left: ${({left}) => left ? left : ''};

`

export const Grid = (props) => (
  <StyledGrid
    {...props}
    onClick={props.onClick ? props.onClick : () => {}}
  >{props.children}</StyledGrid>
);