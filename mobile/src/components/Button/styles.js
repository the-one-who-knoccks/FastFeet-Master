import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #82bf18;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  color: #fff;
`;
