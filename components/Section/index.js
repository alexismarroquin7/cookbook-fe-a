import styled from "styled-components"

const StyledSection = styled.section`
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : 'auto'};
  border: ${({border}) => border ? border : 'none'};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: ${({padding}) => padding ? padding : '0 1rem'};
  gap: ${({gap}) => gap ? gap : '0'};
`

export const Section = (props) => {
  return (
  <StyledSection
    {...props}
  >
    {props.children}
  </StyledSection>
  )
}