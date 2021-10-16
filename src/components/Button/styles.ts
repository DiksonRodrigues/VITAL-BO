import styled from 'styled-components/native';
import colors from '../../util/styles/colors';

const ButtonContainer = styled.TouchableOpacity<{ label: string }>`
  border-width: 2px;
  border-radius: 20px;
  padding: 15px 30px;
  border: ${props => (props.label === 'Voltar' ? 2 : 0)}px;
  margin: 10px;
  background-color: ${props =>
    props.label === 'Voltar' ? 'transparent' : colors.main};
`;

const ButtonText = styled.Text<{ label: string }>`
  color: ${props => (props.label === 'Voltar' ? colors.main : '#fff')};
  font-weight: 700;
`;

export { ButtonContainer, ButtonText };
