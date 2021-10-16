import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Title,
  SubTitle,
  TitleInputsContainer,
  TitleInputs,
  ButtonsContainer,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
  styles,
} from './styles';
import { IconAwesomeCustom } from '../../util/styles/stylesSearched';
import Button from '../../components/Button';
import ButtonPhotos from '../../components/ButtonPhotos';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Container, ScrollView } from '../../util/styles/stylesSearched';
import { updatePhotos } from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITypes } from '../../services/interfaces';
import NetInfo from '@react-native-community/netinfo';
import { PermissionsAndroid } from 'react-native';

type IncidentRouteParams = {
  type: ITypes;
  boData: {
    hourMeter: string;
    odometer: string;
    selectedStatus: { id: '' };
    selectedDriver: { id: '' };
    selectedStoppingPoints: { id: '' };
    selectedEnterprise: { id: '' };
    selectedVehicleDescription: { id: string };
    boType: string;
    address: string;
    city: string;
    position: { long: string; lat: string };
    description: string;
    boDataRegisteredId: string;
  };
};

const BOPhoto: React.FC = () => {
  const [photos, setPhotos] = useState<Array<string>>([]);
  const [infos, setInfos] = useState({
    type: { id: '', desc: '' },
    boData: {
      hourMeter: '',
      odometer: '',
      selectedStatus: { id: '' },
      selectedDriver: { id: '' },
      selectedStoppingPoints: { id: '' },
      selectedEnterprise: { id: '' },
      selectedVehicleDescription: { id: '' },
      address: '',
      city: '',
      position: { long: '', lat: '' },
      description: '',
      boDataRegisteredId: '',
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    async function getItems() {
      const infosString = await AsyncStorage.getItem('@BO:infos');

      const infosJson: IncidentRouteParams =
        infosString !== null ? JSON.parse(infosString) : null;

      setInfos(infosJson);
    }

    getItems();
  }, []);

  const requestCameraPermission = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Permissão de Câmera',
      message: 'O App precisa de acesso à câmera.',
      buttonNeutral: 'Pergunte-me depois',
      buttonNegative: 'Cancelar',
      buttonPositive: 'OK',
    });
  };

  const launchLibrary = async () => {
    await requestCameraPermission();
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          if (response?.assets[0]?.base64) {
            setPhotos([...photos, response.assets[0].base64]);
          }
        }
      },
    );
  };

  const takePhoto = async () => {
    await requestCameraPermission();
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          if (response?.assets[0]?.base64) {
            setPhotos([...photos, response.assets[0].base64]);
          }
        }
      },
    );
  };

  const deletePhoto = (index: number) => {
    photos.splice(index, 1);
    setPhotos([...photos]);
  };

  return (
    <ScrollView>
      <Container>
        <Title>{infos.type.desc}</Title>
        <SubTitle>Descrição do ocorrido</SubTitle>
        <TitleInputsContainer>
          <TitleInputs>Fotos</TitleInputs>
        </TitleInputsContainer>
        <ViewPhotos>
          {photos.map((photo, index) => {
            return (
              <ImageMappedContainer key={index}>
                <ButtonInsidePhotos
                  label={`Deletar Image ${index + 1}`}
                  onPress={() => deletePhoto(index)}
                />
                <ImagePhotos
                  key={index}
                  source={{
                    uri: `data:image/jpeg;base64,${photo}`,
                  }}
                />
              </ImageMappedContainer>
            );
          })}
        </ViewPhotos>

        {photos.length < 4 && (
          <>
            <View style={styles.ViewPhotos}>
              <IconAwesomeCustom name="photo" size={22} color="#000" />
              <ButtonPhotos
                label="Imagem da biblioteca"
                onPress={launchLibrary}
              />
            </View>
            <View style={styles.ViewPhotos}>
              <IconAwesomeCustom name="camera" size={22} color="#000" />
              <ButtonPhotos label="Tirar foto" onPress={takePhoto} />
            </View>
          </>
        )}
        <ButtonsContainer>
          <Button label="Voltar" onPress={() => navigation.goBack()} />
          <Button
            label="Avançar"
            onPress={async () => {
              const valorJson = {
                type: infos.type,
                boData: {
                  ...infos.boData,
                  photos,
                },
              };
              const valorString = JSON.stringify(valorJson);
              await AsyncStorage.setItem('@BO:infos', valorString);
              navigation.navigate('MedidasTomadas');
              NetInfo.fetch().then(async state => {
                if (state.isConnected) {
                  const id = infos.boData.boDataRegisteredId;
                  await updatePhotos(id, photos);
                }
              });
            }}
          />
        </ButtonsContainer>
      </Container>
    </ScrollView>
  );
};

export default BOPhoto;
