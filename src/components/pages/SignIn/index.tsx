// src/component/pages/SignIn/index.tsx
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, dismiss, TextField } from '../../atoms';
import SignInWithGoogle from './SignInWithGoogle';
import { Status } from '../../../contexts/ui';
import { useNavigation } from '@react-navigation/core';
import { UiContext, UserContext } from '../../../contexts';
import { Todos } from '../../../domain/models';
import * as TodosRepository from '../../../domain/repositories/todos';
import { useControlledComponent, useNetworker } from '../../../lib/hooks';
import * as LocalStore from '../../../lib/local-store';
import signInWithPasswordToFirebase from '../../../lib/firebase/signin-with-password';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default function SignIn(props: Props) {
  const { setUserState } = React.useContext(UserContext);
  const { setError, setApplicationState } = React.useContext(UiContext);
  const { navigate } = useNavigation();
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');
  const { setTodos } = props.actions;

  const signInWithPassword = React.useCallback(async () => {
    await networker(async () => {
      try {
        const userInformation = await signInWithPasswordToFirebase(mailAddress.value, password.value);
        setUserState(userInformation);
        setApplicationState(Status.AUTHORIZED);
        await LocalStore.UserInformation.save(userInformation);
        const todos = await TodosRepository.getAll(userInformation.id);
        setTodos(todos);
        // await analytics().logLogin({ method: 'mail address and password' });
      } catch (e) {
        setError(e);
      }
    });
  }, [navigate, networker, setUserState, setTodos, mailAddress.value, password.value]);

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextField
            label="email"
            value={mailAddress.value}
            onChangeText={mailAddress.onChangeText}
            style={styles.text}
            autoCompleteType="email"
          />
          <TextField
            label="password"
            value={password.value}
            onChangeText={password.onChangeText}
            style={styles.text}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SignInWithGoogle {...props} />
          <Button onPress={signInWithPassword} label="SignIn" style={styles.button} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
