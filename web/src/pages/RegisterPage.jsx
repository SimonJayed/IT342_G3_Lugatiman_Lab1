import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { register } = useAuth();
    const { addToast } = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            addToast("Passwords do not match!", "error");
            return;
        }

        setLoading(true);

        const result = await register(formData.username, formData.email, formData.password, formData.name);

        if (result.success) {
            addToast("Registration successful! Please login.", "success");
            navigate("/login");
        } else {
            addToast(result.message, "error");
        }
        setLoading(false);
    };

    return (
        <AuthLayout
            title="Create account"
            subtitle="Start your free Grossery account today"
            illustration="register"
        >
            <form onSubmit={handleRegister} noValidate>

                <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Juan dela Cruz"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="juandelacruz"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <Button fullWidth type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <div className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
