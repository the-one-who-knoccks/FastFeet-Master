import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  padding: 35px;
  background: #fff;
  flex: 1;
  text-align: left;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 80px;
  margin-bottom: 30px;
`;
export const NameTitle = styled.Text`
  font-size: 12px;
  color: #666666;
`;
export const Name = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const EmailTitle = styled.Text`
  font-size: 12px;
  color: #666666;
  margin-bottom: -2px;
`;
export const Email = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const CreatedDateTitle = styled.Text`
  font-size: 12px;
  color: #666666;
`;
export const CreatedDate = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const Logout = styled(TouchableOpacity)`
  background: #e74040;
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
`;
export const LogoutText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
