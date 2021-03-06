import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
        [date]
    );

    async function handleOpen() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',
            date
        });
        console.tron.log(action);

        if (action === DatePickerAndroid.dateSetAction) {
            const selectedDate = new Date(year, month, day);

            onChange(selectedDate);
        }
    }

    return (
        <Container>
            <DateButton onPress={handleOpen}>
                <Icon name="event" color="#FFF" size={20} />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
        </Container>
    );
}
