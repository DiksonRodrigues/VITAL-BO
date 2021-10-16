import styled from 'styled-components/native';

import colors from '../../util/styles/colors';

import dimensions from '../../util/dimensions';
const {vw} = dimensions;

const ImageContainer = styled.View`
  flex: 0;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 0;
`;

const Image = styled.Image.attrs(() => {
  return {
    source: require('../../util/images/logo.png'),
    resizeMode: 'contain',
  };
})`
  width: ${(vw / 1.6).toFixed(0)}px;
  margin-top: 30px;
  padding: 0;
`;

const ItemLogoText = styled.Text`
  font-size: 20px;
  margin-bottom: 30px;
  color: ${colors.main};
`;

const ActivityIndicatorContainer = styled.View`
  flex: 1;
  padding: 30px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(() => {
  return {
    size: 'large',
    color: colors.green,
  };
})``;

const ContentContainer = styled.View`
  flex: 1;
  padding: 30px;
`;

export {
  ActivityIndicatorContainer,
  ActivityIndicator,
  ContentContainer,
  ImageContainer,
  Image,
  ItemLogoText,
};
