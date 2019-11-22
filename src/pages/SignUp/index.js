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

import logo from '../../assets/logo.png';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon={'person-outline'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Nome completo'}
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        icon={'mail-outline'}
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Digite seu email'}
                        ref={emailRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Digite sua senha'}
                        ref={passwordRef}
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton onPress={handleSubmit} loading={loading}>
                        Cadastrar
                    </SubmitButton>

                    <SignLink
                        onPress={() => {
                            navigation.navigate('SignIn');
                        }}
                    >
                        <SignLinkText>Ja tenho uma conta</SignLinkText>
                    </SignLink>
                </Form>
            </Container>
        </Background>
    );
}
