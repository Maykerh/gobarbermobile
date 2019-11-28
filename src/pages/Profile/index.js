import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    LogoutButton,
    Separator,
    Title
} from './styles';

import Background from '../../Components/Background';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

export default function Profile() {
    const dispatch = useDispatch();

    const profile = useSelector(state => state.user.profile);

    const emailRef = useRef();
    const passwordRef = useRef();
    const oldPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setPassword(null);
        setOldPassword(null);
        setConfirmPassword(null);
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                name,
                email,
                password,
                oldPassword,
                confirmPassword
            })
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>
                <Form>
                    <FormInput
                        icon={'person-outline'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Nome completo'}
                        onSubmitEditing={() => emailRef.current.focus()}
                        returnKeyType="next"
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
                        onSubmitEditing={() => oldPassword.current.focus()}
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Separator />
                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Senha Atual'}
                        ref={oldPasswordRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        returnKeyType="next"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Nova senha'}
                        returnKeyType="next"
                        ref={passwordRef}
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon={'lock-outline'}
                        secureTextEntry
                        placeholder={'Confirmação de senha'}
                        ref={confirmPasswordRef}
                        onSubmitEditing={handleSubmit}
                        returnKeyType="send"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit} loading={null}>
                        Atualizar perfil
                    </SubmitButton>
                    <LogoutButton onPress={handleLogout} loading={null}>
                        Sair do GoBarber
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
    )
};
