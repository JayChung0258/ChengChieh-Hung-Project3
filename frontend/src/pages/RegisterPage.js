import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onRegisterSuccess }) {
    return <RegisterForm onRegisterSuccess={onRegisterSuccess} />;
}

export default RegisterPage;
