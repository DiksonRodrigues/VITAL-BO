import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { IHist } from '../../services/interfaces';
import { RGetHistoric, closeBO } from '../../services/requests';
import { ScrollView } from '../../util/styles/stylesSearched';
import {
  Container,
  HistoricItemsContainer,
  HistoricItemsTitle,
  HistoricItemsText,
  HistoricIconContainer,
  HistoricIcon,
  HistoricIconItemContainer,
} from './styles';
import Button from '../../components/Button';

const Historic = () => {
  const [historic, setHistoric] = useState<Array<IHist>>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getItems() {
      const getHistoric = await RGetHistoric(user?.id);
      setHistoric([]);
      setHistoric([...getHistoric]);
    }

    getItems();
  }, [user?.id]);

  const fecharBo = async (id: string) => {
    await closeBO(id);

    const getHistoric = await RGetHistoric(user?.id);
    setHistoric([]);
    setHistoric([...getHistoric]);
  };

  return (
    <ScrollView>
      <Container>
        {historic.map((hist, index) => {
          const [created_at] = moment(hist.created_at)
            .format('DD/MM/YYYY hh:mm')
            .split(' ');
          const [closed_at] = hist?.closed_at?.split(' ') || [''];
          const sumIsNumber =
            Number(hist.custo_cliente) +
            Number(hist.custo_empresa) +
            Number(hist.custo_motorista);
          const sum = sumIsNumber.toFixed(2).toString().replace('.', ',');
          return (
            <HistoricIconItemContainer
              key={index}
              isFinished={hist.closed_at ? 'fechada' : 'aberta'}>
              <HistoricIconContainer>
                <HistoricIcon name="cog" size={30} color="#000" />
              </HistoricIconContainer>
              <HistoricItemsContainer>
                <HistoricItemsTitle>Tipo: {hist.tipo}</HistoricItemsTitle>
                <HistoricItemsText>Veículo: {hist.veiculo}</HistoricItemsText>
                <HistoricItemsText>
                  Motorista: {hist.driver.name}
                </HistoricItemsText>
                <HistoricItemsText>Cliente: {hist.cliente}</HistoricItemsText>
                <HistoricItemsText>Obra: {hist.obra.nome}</HistoricItemsText>
                <HistoricItemsText>
                  Data de Abertura: {created_at}
                </HistoricItemsText>
                {hist.closed_at && (
                  <HistoricItemsText>
                    Data de Fechamento: {closed_at}
                  </HistoricItemsText>
                )}
                <HistoricItemsText>Valor total: R$ {sum}</HistoricItemsText>
                {!hist.closed_at && (
                  <Button
                    label="Fechar B.O"
                    onPress={() => {
                      fecharBo(hist.id);
                    }}
                  />
                )}
              </HistoricItemsContainer>
            </HistoricIconItemContainer>
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default Historic;
