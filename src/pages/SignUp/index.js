import React, { useRef } from 'react';
import { Image } from 'react-native';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

import Background from '../../Components/Background';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import logo from '../../assets/logo.png';

export default function SignUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit() {}

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
                    />

                    <FormInput
                        icon={'mail-outline'}
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Digite seu email'}
                        ref={emailRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Digite sua senha'}
                        ref={passwordRef}
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Cadastrar</SubmitButton>

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
