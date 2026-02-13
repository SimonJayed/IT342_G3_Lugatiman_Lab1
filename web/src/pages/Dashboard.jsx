import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="profile-header">
                <h1>User Profile</h1>
                <button onClick={logout} className="btn-secondary" style={{ width: 'auto' }}>
                    Logout
                </button>
            </div>

            <div className="user-info">
                <div className="info-item">
                    <span className="info-label">ID</span>
                    <span>{user.id}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Username</span>
                    <span>{user.username}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Role</span>
                    <span>{user.role}</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
