import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '@unform/web';

import Input from '~/components/Input';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef(null);
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {}

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
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
      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}
