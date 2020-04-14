import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledForm = styled(Form)`
  background: #fff;
  width: 360px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  display: flex;
  flex-direction: column;
  padding: 60px 30px;

  img {
    width: 90%;
    max-width: 90%;
    margin: 0 auto;
    margin-bottom: 25px;
  }

  strong {
    font-size: 14px;
    line-height: 19px;
    color: #444;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  input {
    font-size: 16px;
    color: #999;
    padding: 12px;
    border: 1px solid #dddddd;
    border-radius: 4px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }

  button {
    background: #7d40e7;
    border-radius: 4px;
    padding: 12px;
    border: 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    margin-top: 15px;

    &:hover {
      background: ${darken(0.07, '#7d40e7')};
    }
  }

  span {
    color: ${darken(0.05, '#ee4d64')};
    display: block;
    padding: 7px;
    border-radius: 15px;
    font-size: 14px;
  }
`;
