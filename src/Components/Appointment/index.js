import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import addMinutes from 'date-fns/addMinutes';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
    var imgUrl = null;

    if (__DEV__) {
        // Workaround para mostrar imagem do servidor em modo dev
        imgUrl = data.provider.avatar
            ? data.provider.avatar.url.replace('localhost', '192.168.10.1')
            : null;
    }

    const currentDate = new Date(data.date);

    const dateParsed = useMemo(() => {
        return formatRelative(
            addMinutes(currentDate, currentDate.getTimezoneOffset()),
            new Date(),
            {
                locale: pt,
                addSuffix: true
            }
        );
    });

    return (
        <Container past={data.past}>
            <Left>
                <Avatar
                    source={{
                        uri: imgUrl
                            ? imgUrl
                            : `https://api.adorable.io/avatar/50/${data.provider.name}.png`
                    }}
                />

                <Info>
                    <Name>{data.provider.name}</Name>
                    <Time>{dateParsed}</Time>
                </Info>
            </Left>
            {data.cancelable && (
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={20} color="#f64c75" />
                </TouchableOpacity>
            )}
        </Container>
    );
}
