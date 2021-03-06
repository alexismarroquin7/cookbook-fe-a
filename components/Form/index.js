import styled from "styled-components";

const StyledForm = styled.form`
  width: ${({width}) => width ? width : 'auto'};
  display: flex;
  flex-flow: ${({direction}) => direction ? direction : 'column wrap'};
  align-items: ${({align}) => align ? align : 'flex-start'};
  justify-content: ${({justify}) => justify ? justify : 'flex-start'};
  gap: ${({gap}) => gap ? gap : '0'};
  padding: ${({padding}) => padding ? padding : '0'};
  border: ${({border}) => border ? border : '0'};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '0'};
`

export const Form = (props) => {
  return <StyledForm
    {...props}
  ></StyledForm>
}