import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store JWT token
            alert('Login successful!');
            navigate('/'); // Navigate to dashboard or desired route after login
        } catch (error) {
            alert(`Login failed: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="login__auth__container">
            <div className="login__auth">
                <form onSubmit={handleLogin}>
                    <LoginCard
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
