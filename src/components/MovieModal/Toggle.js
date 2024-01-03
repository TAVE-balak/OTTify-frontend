// Toggle.js
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #34c759;
  }

  &:focus + .slider {
    box-shadow: 0 0 1px #34c759;
  }

  &:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #8b8b8b;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
`;

const Toggle = ({ isOn, handleToggle, text }) => {
  return (
    <label>
      {text}
      <ToggleContainer>
        <ToggleInput
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
        />
        <Slider className="slider" />
      </ToggleContainer>
    </label>
  );
};

export default Toggle;
