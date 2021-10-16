import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Platform} from 'react-native';
import PickerComponent from '../../components/Picker';
import {
  Container,
  ScrollView,
  TextInput,
  ContainerIndicator,
} from '../../util/styles/stylesSearched';
import {Title, SubTitle, LineStyle, ButtonsContainer} from './styles';
import Button from '../../components/Button';
import colors from '../../util/styles/colors';

import {
  IVehicleDescription,
  IEnterprises,
  IStatus,
  IStoppingPoints,
  IDriver,
  ITypes,
} from '../../services/interfaces';

import {
  REnterprisesOptions,
  RVehicleDescriptionOptions,
  RGetStatus,
  RGetStoppingPoints,
  RGetDriver,
} from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchEngine from 'react-native-search-engine';
import {styles} from '../../util/styles/styleSearchEngine';

type IncidentRouteParams = {
  type: ITypes;
};

const BO: React.FC = () => {
  const [selectedEnterprise, setSelectedEnterprise] = useState({id: ''});
  const [enterpriseOptions, setEnterpriseOptions] = useState<
    Array<{
      name: string;
      value: IEnterprises;
    }>
  >([]);
  const [selectedVehicleDescription, setSelectedVehicleDescription] =
    useState<Object | null>();
  const [vehicleDescriptionOptions, setVehicleDescriptionOptions] = useState<
    Array<IVehicleDescription>
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<Object | null>();
  const [statusOptions, setStatusOptions] = useState<Array<IStatus>>([]);
  const [selectedStoppingPoints, setSelectedStoppingPoints] =
    useState<Object | null>();
  const [stoppingPointsOptions, setStoppingPointsOptions] = useState<
    Array<IStoppingPoints>
  >([]);
  const [selectedDriver, setSelectedDriver] = useState<Object | null>();
  const [driverOptions, setDriverOptions] = useState<Array<IDriver>>([]);

  const [loading, setLoading] = useState(false);
  const [odometer, setOdometer] = useState('');
  const [hourMeter, setHourMeter] = useState('');

  const [infos, setInfos] = useState({type: {desc: ''}});

  const navigation = useNavigation();

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      const REnterpriseOptions = await REnterprisesOptions();
      const RVehicleDescriptionOption = await RVehicleDescriptionOptions();
      const RStatus = await RGetStatus();
      const RStoppingPoints = await RGetStoppingPoints();
      const RDriver = await RGetDriver();

      setEnterpriseOptions([]);
      setVehicleDescriptionOptions([]);
      setStatusOptions([]);
      setStoppingPointsOptions([]);
      setDriverOptions([]);

      setVehicleDescriptionOptions([...RVehicleDescriptionOption]);
      setEnterpriseOptions([...REnterpriseOptions]);
      setStatusOptions([...RStatus]);
      setStoppingPointsOptions([...RStoppingPoints]);
      setDriverOptions([...RDriver]);

      const infosString = await AsyncStorage.getItem('@BO:infos');

      const infosJson: IncidentRouteParams =
        infosString !== null ? JSON.parse(infosString) : null;
      setInfos(infosJson);

      setLoading(false);
    }

    getItems();
  }, []);

  return (
    <>
      {loading ? (
        <ContainerIndicator>
          <ActivityIndicator size="large" color="#aecb46" />
        </ContainerIndicator>
      ) : (
        <ScrollView>
          <Container>
            <Title>{infos.type.desc}</Title>
            <SubTitle>Dados Iniciais</SubTitle>

            <View style={styles.containerFull}>
              <SearchEngine
                searchKey={'description'}
                data={vehicleDescriptionOptions}
                containerInputStyle={styles.containerInputStyle}
                containerScrollStyle={styles.containerScrollStyle}
                containerTextInfoStyle={styles.containerTextInfoStyle}
                containerTextError={styles.containerTextError}
                containerButtonStyle={styles.containerButtonStyle}
                onChangeSearch={setSelectedVehicleDescription}
                buttonEnabled={true}
                placeholder={'Descrição do Veículo'}
              />
            </View>

            <TextInput
              value={odometer}
              onChangeText={setOdometer}
              placeholder="Hodômetro"
              placeholderTextColor={colors.main}
              selectionColor={colors.main}
              autoCapitalize="none"
              numberOfLines={1}
              keyboardType={
                Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'
              }
              returnKeyType="go"
              autoCorrect={false}
              blurOnSubmit={true}
            />
            <TextInput
              value={hourMeter}
              onChangeText={setHourMeter}
              placeholder="Horímetro"
              placeholderTextColor={colors.main}
              selectionColor={colors.main}
              autoCapitalize="none"
              numberOfLines={1}
              keyboardType={
                Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'
              }
              returnKeyType="go"
              autoCorrect={false}
              blurOnSubmit={true}
            />
            <LineStyle />
            <PickerComponent
              selected={selectedEnterprise}
              setSelected={setSelectedEnterprise}
              options={enterpriseOptions}
              firstOption={{label: 'Empresa contratada', value: ''}}
            />
            <View style={styles.containerFull}>
              <SearchEngine
                searchKey={'nome'}
                data={stoppingPointsOptions}
                containerInputStyle={styles.containerInputStyle}
                containerScrollStyle={styles.containerScrollStyle}
                containerTextInfoStyle={styles.containerTextInfoStyle}
                containerButtonStyle={styles.containerButtonStyle}
                containerTextError={styles.containerTextError}
                onChangeSearch={setSelectedStoppingPoints}
                buttonEnabled={true}
                placeholder={'OBRAS'}
              />
            </View>
            <View style={styles.containerFull}>
              <SearchEngine
                searchKey={'name'}
                data={driverOptions}
                containerInputStyle={styles.containerInputStyle}
                containerScrollStyle={styles.containerScrollStyle}
                containerTextInfoStyle={styles.containerTextInfoStyle}
                containerButtonStyle={styles.containerButtonStyle}
                containerTextError={styles.containerTextError}
                onChangeSearch={setSelectedDriver}
                buttonEnabled={true}
                placeholder={'Motorista'}
              />
            </View>
            <View style={styles.containerFull}>
              <SearchEngine
                searchKey={'name'}
                data={statusOptions}
                containerInputStyle={styles.containerInputStyle}
                containerScrollStyle={styles.containerScrollStatusStyle}
                containerTextInfoStyle={styles.containerTextInfoStyle}
                containerButtonStyle={styles.containerButtonStyle}
                containerTextError={styles.containerTextError}
                onChangeSearch={setSelectedStatus}
                buttonEnabled={true}
                placeholder={'Status'}
              />
            </View>

            <ButtonsContainer>
              <Button label="Voltar" onPress={() => navigation.goBack()} />
              <Button
                label="Avançar"
                onPress={async () => {
                  const valorJson = {
                    type: infos.type,
                    boData: {
                      hourMeter,
                      odometer,
                      selectedStatus: selectedStatus.data[0],
                      selectedDriver: selectedDriver.data[0],
                      selectedStoppingPoints: selectedStoppingPoints.data[0],
                      selectedEnterprise,
                      selectedVehicleDescription:
                        selectedVehicleDescription.data[0],
                    },
                  };
                  const valorString = JSON.stringify(valorJson);
                  await AsyncStorage.setItem('@BO:infos', valorString);
                  navigation.navigate('Description');
                }}
              />
            </ButtonsContainer>
          </Container>
        </ScrollView>
      )}
    </>
  );
};

export default BO;
