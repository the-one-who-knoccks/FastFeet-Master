import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #dddddd;
  background-color: #ffffff;
  align-items: center;
  padding: 15px 0;
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 26px;
      margin-right: 10px;
      padding-right: 30px;
      border-right: 1px solid #dddddd;
    }
    a {
      color: #999999;
      font-weight: bold;
      line-height: 18px;
      font-size: 15px;
      padding: 20px;
    }
  }
  aside {
    display: flex;
  }
`;

export const Profile = styled.div`
  div {
    display: flex;
    flex-direction: column;
    strong {
      color: #666666;
      font-size: 14px;
      font-weight: bold;
    }
    a {
      font-size: 14px;
      line-height: 16px;
      text-align: right;
      color: #de3b3b;
      margin-top: 4px;
    }
  }
`;
