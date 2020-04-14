import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  width: 1200px;
  margin: 30px auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div.headerButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    text-align: left;
  }
`;

export const StyledButton = styled.button`
  background: #cccccc;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  button:hover {
    background: ${darken(0.07, '#cccccc')};
  }
  & + button {
    background: #7d40e7;
    margin-left: 16px;
  }
  & + button:hover {
    background: ${darken(0.07, '#7D40E7')};
  }
  svg {
    margin-right: 8px;
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 35px 30px;
  border-radius: 4px;
  margin-top: 20px;

  span {
    font-weight: bold;
    color: #444;
    font-size: 14px;
  }

  div.data {
    margin-top: 20px;

    input {
      width: 100%;
      padding: 15px 12px;
      color: #999;
      font-size: 16px;
      outline: 0;
      margin-top: 9px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
`;
