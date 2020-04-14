import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { darken } from 'polished';

export const Container = styled.div`
  width: 1200px;
  margin: 30px auto;

  header {
    p {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      text-align: left;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 34px;

    div.search {
      background: #fff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;

      input {
        border: 0;
        font-size: 14px;
        line-height: 16px;
        color: #999999;
        margin-left: 10px;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const BodyContent = styled.div`
  div.loadingIndicator {
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex: 1;
    justify-content: center;
    margin-top: 100px;

    svg {
      animation: ${rotate} 1s linear infinite;
    }
  }

  span.noData {
    font-size: 19px;
    margin: 40px auto;
    padding: 23px;
    color: #7d40e7;
  }

  div.table {
    display: flex;
    display: ${props => (!props.visible ? 'flex' : 'none')};
    flex-direction: column;
    flex: 1;

    div.line {
      display: grid;
      grid-template-columns: 10% 10% 30% 45% 5%;
      width: 100%;
      background: #fff;
      margin-bottom: 21px;
      color: #666;
      font-size: 16px;
      text-align: left;
      align-items: center;
      padding: 16px;
      border-radius: 4px;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      div.tableTitle {
        > button {
          background: #fff;
          border: 0px;
          font-weight: bold;
        }
      }
    }

    div.lineTitle {
      font-weight: bold;
      background: none;
      margin-bottom: 8px;
    }

    img {
      width: 35px;
      height: 35px;
      margin-right: 8px;
      border-radius: 50%;
    }
  }
`;

export const StyledLink = styled(Link)`
  background: #7d40e7;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  &:hover {
    background: ${darken(0.07, '#7D40E7')};
  }
  svg {
    margin-right: 8px;
  }
`;

export const ActionButton = styled.button``;

export const ContextMenu = styled.div`
  display: ${props =>
    props.visible === true ? 'block !important' : 'none !important'};
    position: relative;

  button {
    background: none;
    font-weight: 100;
    color: #999;
    border: 0;
    font-size: 16px;
    margin-left: 5px;
  }

  ul {
    position: absolute;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    z-index: 999;
    border: 1px solid #ddd;
    transform: translate(-50%, -119%);
    box-shadow: 2px 1px 5px #a0a0a0;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #999;
      padding: 8px 15px;
      font-weight: 100;

      > svg {
        margin-right: -27px;
      }

      button {
        padding-left: 35px;
      }

      &:hover {
        background: #eee;
      }

      & + li {
        border-top: 1px solid #eee;
      }
    }
  }
`;

export const Button = styled.button`
  background: #7D40E7;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  &:hover {
    background: ${props =>
      props.disabled ? '#7D40E7' : `${darken(0.07, '#7D40E7')}`};
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;
