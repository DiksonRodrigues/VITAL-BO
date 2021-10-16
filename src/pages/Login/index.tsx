import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {ScrollView} from '../../util/styles/stylesSearched';

import animationLogin from '../../util/animation';
import animateParams from '../../util/animation/params';
import stylesWithAnimation from './stylesWithAnimation';
import colors from '../../util/styles/colors';

import {
  ImageContainer,
  Image,
  ActivityIndicatorContainer,
  ActivityIndicator,
  ContentContainer,
  ItemLogoText,
} from './styles';

import {useAuth} from '../../hooks/auth';

const LogIn: React.FC = () => {
  const senhaInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const {signIn} = useAuth();

  useEffect(() => {
    animationLogin();
  });

  async function handleSignInPress() {
    setLoading(true);
    if (cpf.length === 0 || senha.length === 0) {
      setError('Todos os campos são obrigatórios.');
      Alert.alert(error);
      setLoading(false);
    } else {
      try {
        signIn({cpf: cpf, senha: senha})
          .then(e => {
            if (e === false) {
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      } catch (err) {
        setError('Houve um problema com o login, verifique suas credenciais.');
        setLoading(false);
        Alert.alert(error);
      }
    }
  }

  return (
    <ScrollView>
      <ImageContainer>
        <Animated.View
          style={[
            stylesWithAnimation.imageContent,
            {
              transform: [{translateY: animateParams.basePos}],
              opacity: animateParams.baseOpacity,
            },
          ]}>
          <Image />
          <ItemLogoText>BOLETIM DE OCORRÊNCIA</ItemLogoText>
        </Animated.View>
      </ImageContainer>

      <Animated.View
        style={[
          stylesWithAnimation.loginContent,
          {
            transform: [{translateY: animateParams.basePos}],
            opacity: animateParams.baseOpacity,
          },
        ]}>
        {loading ? (
          <ActivityIndicatorContainer>
            <ActivityIndicator />
          </ActivityIndicatorContainer>
        ) : (
          <ContentContainer>
            <Animated.Text
              style={[
                stylesWithAnimation.intro,
                {opacity: animateParams.textOpacity},
              ]}
              numberOfLines={2}>
              {'Para entrar no Vital BO,\npreencha seus dados abaixo.'}
            </Animated.Text>
            <Animated.View
              style={{
                transform: [{translateY: animateParams.inputPos_1}],
                opacity: animateParams.inputOpacity_1,
              }}>
              <TextInputMask
                type={'cpf'}
                placeholderTextColor={colors.main}
                selectionColor={colors.main}
                autoCapitalize="none"
                numberOfLines={1}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'number-pad'
                }
                placeholder="CPF"
                value={cpf}
                returnKeyType="next"
                onChangeText={setCpf}
                style={[stylesWithAnimation.input]}
                onSubmitEditing={() => {
                  senhaInputRef.current?.focus();
                }}
              />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{translateY: animateParams.inputPos_2}],
                opacity: animateParams.inputOpacity_2,
              }}>
              <TextInput
                secureTextEntry
                ref={senhaInputRef}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                placeholderTextColor={colors.main}
                selectionColor={colors.main}
                autoCapitalize="none"
                numberOfLines={1}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'number-pad'
                }
                returnKeyType="go"
                autoCorrect={false}
                blurOnSubmit={true}
                style={[stylesWithAnimation.input]}
              />
            </Animated.View>
            <View style={stylesWithAnimation.buttonWrap}>
              <Animated.View
                style={[
                  stylesWithAnimation.buttonEntrar,
                  {
                    transform: [{translateY: animateParams.btPos}],
                    opacity: animateParams.btOpacity,
                  },
                ]}>
                <TouchableOpacity
                  style={stylesWithAnimation.buttonEntrarTouch}
                  onPress={handleSignInPress}>
                  <Text style={stylesWithAnimation.buttonEntrarText}>
                    ENTRAR
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ContentContainer>
        )}
      </Animated.View>
    </ScrollView>
  );
};
export default LogIn;
