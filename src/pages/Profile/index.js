import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Input';
import AvatarInput from './AvatarInput';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef(null);
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  async function handleSubmit({
    name,
    email,
    password,
    oldPassword,
    confirmPassword,
    avatar_id,
  }) {
    const data = {
      name,
      email,
      password,
      oldPassword,
      confirmPassword,
      avatar_id,
    };
    dispatch(updateProfileRequest(data));
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Insira um e-mail válido'),
        password: Yup.string(),
        oldPassword: Yup.string(),
        confirmPassword: Yup.string(),
        avatar_id: Yup.number(),
      });

      await schema.validate(
        {
          name,
          email,
          password,
          oldPassword,
          confirmPassword,
          avatar_id,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="password"
          type="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="password"
          type="confirmPassword"
          placeholder="Confirme nova senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
