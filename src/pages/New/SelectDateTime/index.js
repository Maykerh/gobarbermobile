import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, HoursList, Hour, Title } from './styles';

import api from '../../../services/api';

import Background from '../../../Components/Background';
import DateInput from '../../../Components/DateInput';

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);

    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(
                `providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime()
                    }
                }
            );

            setHours(response.data);
        }

        loadAvailable();
    }, [date]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HoursList
                    data={hours}
                    keyExtractor={item => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.available}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o prestador',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name={'chevron-left'} size={20} color="#FFF" />
        </TouchableOpacity>
    )
});
