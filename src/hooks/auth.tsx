import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import {Alert} from 'react-native';

interface User {
  id: string;
  cpf: string;
  group_id: string;
  name: string;
  telefone: string;
  tipo: string;
}

export interface SignInCredentials {
  cpf: string;
  senha: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem('@BO:user');
      const storedToken = await AsyncStorage.getItem('@BO:token');

      if (storedUser && storedToken) {
        setUsers(JSON.parse(storedUser));
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  });

  // Matrícula: 9 (Teste)
  // Matrícula: 55 (VitalChecklist)
  // Matrícula: 60 (Villa)

  async function signIn(logIn: SignInCredentials) {
    try {
      logIn.cpf = logIn.cpf.replace('.', '');
      logIn.cpf = logIn.cpf.replace('.', '');
      logIn.cpf = logIn.cpf.replace('-', '');
      const loginData = {
        matricula: 55,
        cpf: logIn.cpf,
        password: logIn.senha,
      };

      const response = await api.post('/user/login', loginData);

      if (response.data.success) {
        const {driver, auth_token} = response.data;
        setUsers(driver);

        api.defaults.headers.Authorization = `Bearer ${auth_token}`;

        await AsyncStorage.setItem('@BO:user', JSON.stringify(driver));
        await AsyncStorage.setItem('@BO:token', auth_token);

        return true;
      } else {
        Alert.alert('Erro', response.data.data);
        return false;
      }
    } catch (err) {
      console.log('Erro', err);
      return false;
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUsers(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};
