import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 180px;
      width: 180px;
      border-radius: 50%;
      background: #fff;
    }
    input {
      display: none;
    }
  }

  div.avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #ddd;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: 0 auto;

    svg {
      margin-top: -15px;
    }
    p {
      font-size: 16px;
      color: #ddd;
      font-weight: bold;
    }
  }
`;
