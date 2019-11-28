import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';
import Background from '../../../Components/Background';
import api from '../../../services/api';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadProviders() {
            setIsLoading(true);

            const response = await api.get('providers');

            setProviders(response.data);
            setIsLoading(false);
        }

        loadProviders();
    }, []);

    return (
        <Background>
            <Container>
                {isLoading ? (
                    <Text>{'Carregando...'}</Text>
                ) : (
                    <ProvidersList
                        data={providers}
                        keyExtractor={provider => String(provider.id)}
                        ListEmptyComponent={
                            <Text>{'Nenhum prestador encontrado'}</Text>
                        }
                        renderItem={({ item }) => (
                            <Provider
                                onPress={() =>
                                    navigation.navigate('SelectDateTime', {
                                        provider: item
                                    })
                                }
                            >
                                <Avatar
                                    source={{
                                        uri: item.avatar
                                            ? item.avatar.url.replace(
                                                  'localhost',
                                                  '192.168.10.1'
                                              )
                                            : `http://api.adorable.io/avatar/50/${item.name}.png`
                                    }}
                                />
                                <Name>{item.name}</Name>
                            </Provider>
                        )}
                    />
                )}
            </Container>
        </Background>
    );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o prestador',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Dashboard');
            }}
        >
            <Icon name={'chevron-left'} size={20} color="#FFF" />
        </TouchableOpacity>
    )
});
