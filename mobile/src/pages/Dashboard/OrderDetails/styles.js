import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  elevation: 1;
  background: #fff;
`;

export const InfoContainer = styled.ScrollView`
  background: #fff;
  border-radius: 4px;
  margin-top: -90px;
  elevation: 0;
  flex: 1;
`;

export const OrderInfo = styled.View`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 4px;
`;

export const InfoTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleText = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;

export const OrderInfoTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-top: 10px;
`;
export const OrderInfoText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const DeliveryInfo = styled.View`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
`;

export const DeliveryInfoTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-top: 10px;
`;
export const DeliveryInfoText = styled.Text`
  font-size: 14px;
  color: #666666;
`;
export const DeliveryDates = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DeliveryDateTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-top: 10px;
`;
export const DeliveryDateText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const DeliveryStartDate = styled.View``;
export const DeliveryEndDate = styled.View``;

export const ActionButtons = styled.View`
  margin-top: 15px;
`;
export const Withdraw = styled(TouchableOpacity)`
  background: #e74040;
  padding: 15px;
  border-radius: 4px;
`;
export const WithdrawText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

export const Action = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ActionBox = styled(TouchableOpacity)`
  align-items: center;
  background: #f8f9fd;
  padding: 10px;
  flex: 1;
  border: 1px solid #eee;
`;

export const ActionText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #999999;
`;
