import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Body = styled.View`
  background: #7d40e7;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
})`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  align-self: stretch;
`;

export const Image = styled.Image`
  width: 255px;
  height: 43px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const Input = styled.TextInput`
  color: #999;
  border: 1px solid #ddd;
  padding: 13px 20px;
  border-radius: 4px;
  margin-top: 20px;
  background: #fff;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
