export const getDurationText = ({hours = 0, minutes = 0}) => {
  let text = '';
  
  if(hours === 0){
    text += '';
  } else if(hours === 1){
    text += `${hours}HR`;
  } else {
    text += `${hours}HRS`;
  }

  if(minutes === 0){
    text += '';
  } else if(minutes === 1){
    text += ` ${minutes}MIN`;
  } else {
    text += ` ${minutes}MINS`;
  }
  
  return text;
}