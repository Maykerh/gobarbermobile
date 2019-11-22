import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText
} from './styles';

import Background from '../../Components/Background';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { signInRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.png';

export default function SignIn({ navigation }) {
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispatch(signInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon={'mail-outline'}
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Digite seu email'}
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Digite sua senha'}
                        ref={passwordRef}
                        returnKeyType={'send'}
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton onPress={handleSubmit} loading={loading}>
                        Acessar
                    </SubmitButton>

                    <SignLink
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    >
                        <SignLinkText>Criar conta</SignLinkText>
                    </SignLink>
                </Form>
            </Container>
        </Background>
    );
}
