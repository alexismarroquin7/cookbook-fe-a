import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [active, setActive] = useState(initialState);
  const toggleActive = () => setActive(!active);
  return {active: active, setActive, toggleActive};
}