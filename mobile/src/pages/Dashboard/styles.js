import styled from 'styled-components/native';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

export const Container = styled.View`
  padding: 20px;
  background: #fff;
  flex: 1;
`;

export const StyledActivityIndicator = styled(ActivityIndicator)`
  margin-top: 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DeliverymanAvatar = styled.View`
  width: 22%;
`;
export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;
export const DeliverymanData = styled.View`
  width: 60%;
`;
export const WelcomeData = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const DeliverymanName = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const Logout = styled(TouchableOpacity)`
  width: 10%;
`;

export const Orders = styled.View``;
export const OrdersHeader = styled.View`
  flex-direction: row;
  margin-top: 22px;
  justify-content: space-between;
  align-items: center;
`;
export const OrdersHeaderText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const OrdersLinksContainer = styled.View`
  flex-direction: row;
`;

export const OrdersHeaderLink = styled(TouchableOpacity)``;
export const OrdersHeaderLinkText = styled.Text`
  color: ${props => (props.active ? '#7159c1' : '#999999')};
  font-size: 13px;
  font-weight: bold;
  padding: 10px;
  text-decoration: ${props => (props.active ? 'underline' : 'none')};
`;
export const OrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 120px;
`;

export const OrderBox = styled.View`
  border: 2px solid #eee;
  border-radius: 4px;
  margin-top: 25px;
`;

export const OrderTitle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const OrderText = styled.Text`
  color: ${props => (props.canceled ? '#E74040' : '#7d40e7')};
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const OrderDetails = styled.View`
  background: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;
export const OrderDate = styled.View``;
export const OrderDateTextTitle = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;
export const OrderDateText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;
export const OrderCity = styled.View``;
export const OrderCityTextTitle = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;
export const OrderCityText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;
export const OrderViewDetails = styled(TouchableOpacity)`
  padding: 6px;
`;
export const OrderViewDetailsText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.canceled ? '#E74040' : '#7d40e7')};
`;

export const OrderProgressBar = styled.View`
  align-items: center;
  margin-top: 5px;
  margin-bottom: 15px;
`;
export const ProgressBar = styled.View`
  margin-top: 10px;
  height: 2px;
  width: 83%;
  background: ${props => (props.canceled ? '#E74040' : '#7d40e7')};
`;
export const ProgressBarContent = styled.View`
  flex-direction: column;
`;
export const ProgressBarDots = styled.View`
  flex-direction: row;
  margin-top: -8px;
  justify-content: space-between;
`;
export const ProgressBarMessages = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;
export const WaitingDot = styled.View`
  width: 14px;
  height: 14px;
  background: ${props => (props.active ? '#7d40e7' : '#fff')};
  ${props => props.canceled && props.active && `background: #e74040;`};
  border: 2px solid #7d40e7;
  ${props => props.canceled && `border: 2px solid #e74040;`};
  border-radius: 7px;
`;
export const WaitingText = styled.Text`
  font-size: 10px;
  color: ${props => (props.active ? '#7d40e7' : '#999')};
  ${props => props.canceled && props.active && `color: #e74040;`};
  text-align: left;
  width: 30%;
`;
export const WithdrawDot = styled.View`
  width: 14px;
  height: 14px;
  background: ${props => (props.active ? '#7d40e7' : '#fff')};
  ${props => props.canceled && props.active && `background: #e74040;`};
  border: 2px solid #7d40e7;
  ${props => props.canceled && `border: 2px solid #e74040;`};
  border-radius: 7px;
`;
export const WithdrawText = styled.Text`
  font-size: 10px;
  color: ${props => (props.active ? '#7d40e7' : '#999')};
  ${props => props.canceled && props.active && `color: #e74040;`};
  text-align: center;
  width: 30%;
`;
export const DeliveredDot = styled.View`
  width: 14px;
  height: 14px;
  background: ${props => (props.active ? '#7d40e7' : '#fff')};
  ${props => props.canceled && props.active && `background: #e74040;`};
  border: 2px solid #7d40e7;
  ${props => props.canceled && `border: 2px solid #e74040;`};
  border-radius: 7px;
`;
export const DeliveredText = styled.Text`
  font-size: 10px;
  color: ${props => (props.active ? '#7d40e7' : '#999')};
  ${props => props.canceled && props.active && `color: #e74040;`};
  text-align: right;
  width: 30%;
`;

export const NoOrderText = styled.Text`
  color: #7d40e7;
  font-size: 16px;
  margin-top: 20px;
`;
