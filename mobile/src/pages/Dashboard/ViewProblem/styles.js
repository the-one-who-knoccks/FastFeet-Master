import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  elevation: 1;
  background: #fff;
`;

export const ViewContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  elevation: 0;
  flex: 1;
`;

export const OrderBox = styled.View`
  elevation: 1;
  margin-top: -95px;
  margin-bottom: 20px;
`;

export const OrderName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NoOrderText = styled.Text`
  padding: 20px;
  color: #7d40e7;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;
export const StyledActivityIndicator = styled(ActivityIndicator)`
  padding: 20px;
`;
export const ProblemBox = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  border-radius: 4px;
`;
export const ProblemDescription = styled.Text`
  font-size: 16px;
  color: #999999;
`;
export const ProblemDate = styled.Text`
  font-size: 10px;
  margin-bottom: 8px;
  color: #c1c1c1;
`;
