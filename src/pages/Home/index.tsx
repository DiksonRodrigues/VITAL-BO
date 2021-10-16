import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { IconContainer } from './styles';
import colors from '../../util/styles/colors';
import ActionButton from 'react-native-action-button';
import {
  ContainerIndicator,
  IconAwesomeCustom,
} from '../../util/styles/stylesSearched';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setBoletimOccurrence, RGetTypes } from '../../services/requests';
import { useAuth } from '../../hooks/auth';
import { ITypes } from '../../services/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<Array<{ name: string; value: ITypes }>>(
    [],
  );

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillReceiveProps',
    ]);
  }, []);

  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      const RTypes = await RGetTypes(user?.id);
      setTypes([]);
      setTypes([...RTypes]);
      setLoading(false);

      const offlineData = await AsyncStorage.getItem('@BO:offline');

      const infosJson: Array<any> =
        offlineData !== null ? JSON.parse(offlineData) : null;
      if (infosJson) {
        for (let i = 0; i < infosJson.length; i++) {
          const infos = infosJson[i].boData;
          if (user?.id) {
            await setBoletimOccurrence({
              boletim_ocorrencia_type_id: infos.type.id,
              asset_id: infos.boData.selectedVehicleDescription.id,
              driver_id: infos.boData.selectedDriver.id,
              contracted_company_id: infos.boData.selectedEnterprise.id,
              ponto_parada_id: infos.boData.selectedStoppingPoints.id,
              hodometro: infos.boData.odometer,
              horimetro: infos.boData.hourMeter,
              assets_state_id: infos.boData.selectedStatus.id,
              lat: infos.boData.lat,
              long: infos.boData.long,
              desc: infos.boData.description,
              address: infos.boData.address,
              city: infos.boData.city,
            });
          }
        }
      }
    }

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <ContainerIndicator>
          <ActivityIndicator size="large" color="#0000ff" />
        </ContainerIndicator>
      ) : (
        <IconContainer>
          <ActionButton buttonColor={colors.main}>
            {types.map((type, index) => (
              <ActionButton.Item
                key={index}
                buttonColor={colors.main}
                title={type.name}
                onPress={async () => {
                  const valorJson = {
                    type: type.value,
                  };

                  const valorString = JSON.stringify(valorJson);
                  await AsyncStorage.setItem('@BO:infos', valorString);
                  navigation.navigate('B.O.');
                }}>
                <IconAwesomeCustom
                  name={
                    type.name === 'B.O. MANUTENCAO'
                      ? 'car'
                      : type.name === 'B.O. ACIDENTE'
                      ? 'ambulance'
                      : 'info-circle'
                  }
                  size={22}
                  color="#fff"
                />
              </ActionButton.Item>
            ))}
          </ActionButton>
        </IconContainer>
      )}
    </>
  );
};

export default Home;
