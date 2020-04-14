import styled from 'styled-components/native';
import { TextInput } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  elevation: 1;
  background: #fff;
`;

export const ReportContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-top: -90px;
  elevation: 0;
  flex: 1;
`;

export const Form = styled.View``;
export const StyledTextInput = styled(TextInput)`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: #999;
  border: 1px solid #eee;
  font-size: 16px;
`;
export const StyledButton = styled(Button)`
  background: #7d40e7;
`;
