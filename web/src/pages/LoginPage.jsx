import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(usernameOrEmail, password);

        if (result.success) {
            addToast("Login successful!", "success");
            navigate("/dashboard");
        } else {
            addToast(result.message, "error");
        }
        setLoading(false);
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Please enter your details to sign in"
            illustration="login"
        >
            <form onSubmit={handleLogin} noValidate>

                <Input
                    label="Email or Username"
                    type="text"
                    placeholder="Enter your email or username"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                    <a href="#" style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}>Forgot password?</a>
                </div>

                <Button fullWidth type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>

            <div className="auth-switch">
                Don't have an account? <Link to="/register">Sign up for free</Link>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
