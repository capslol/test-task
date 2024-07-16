import React, { useState } from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserData, loginService, registerUser} from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {User} from "../types/types";

interface RegistrationData {
    email: string;
    password: string;
    username: string;
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading, isError } = useQuery<User>({
        queryKey: ['userData'],
        queryFn: getUserData,
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegistrationData) => registerUser(data),
        onSuccess: async () => {
            try {
                await loginService({ email, password });
                navigate('/');
            } catch (error) {
                console.error('Error logging in after registration:', error);
            }
        },
        onError: (error) => {
            console.error('Error registering user:', error);
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        registerMutation.mutate({ email, password, username });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
            {registerMutation.isError && <p>Error registering user</p>}
        </div>
    );
};

export default Register;
