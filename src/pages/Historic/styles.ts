import styled from 'styled-components/native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoricIconContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
`;

const HistoricIcon = styled(IconAwesome)<{
  marginBottomRight?: number;
}>`
  margin-bottom: ${props => props.marginBottomRight || 0}px;
  margin-right: ${props => props.marginBottomRight || 0}px;
`;

const HistoricIconItemContainer = styled.TouchableOpacity<{
  isFinished: string;
}>`
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  width: 80%;
  margin: 20px;
  border-radius: 20px;
  border: 1px solid #000;
  background-color: ${props =>
    props.isFinished === 'aberta' ? '#E6BEBE' : '#CCDDC5'};
`;

const HistoricItemsContainer = styled.View`
  display: flex;
  flex: 6;
  justify-content: center;
  align-items: flex-start;
`;

const HistoricItemsTitle = styled.Text`
  margin-bottom: 10px;
`;

const HistoricItemsText = styled.Text``;

export {
  Container,
  HistoricItemsContainer,
  HistoricItemsTitle,
  HistoricItemsText,
  HistoricIconContainer,
  HistoricIcon,
  HistoricIconItemContainer,
};
