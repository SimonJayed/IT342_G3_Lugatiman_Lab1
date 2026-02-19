import React, { useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    console.log("ProfilePage User Data:", user);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logout();
        setShowLogoutModal(false); // Clean up state (though component unmounts)
    };

    return (
        <AppLayout>
            <div className="page-content active">
                <div className="page-header">
                    <h1>Profile</h1>
                    <p>Your account information</p>
                </div>
                <div className="card profile-card">
                    <div className="profile-avatar">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-field">
                        <label>Full Name</label>
                        <p>{user?.name || 'User'}</p>
                    </div>
                    <div className="profile-field">
                        <label>Username</label>
                        <p>{user?.username || 'username'}</p>
                    </div>
                    <div className="profile-field">
                        <label>Email Address</label>
                        {/* If email is available in user object, display it, else fallback */}
                        <p>{user?.email || (user?.username ? `${user.username}@example.com` : 'user@example.com')}</p>
                    </div>
                    <div className="profile-field">
                        <label>Account Created</label>
                        <p>February 2026</p>
                    </div>
                    <div className="profile-divider"></div>
                    <button className="btn-logout" onClick={() => setShowLogoutModal(true)}>Sign Out</button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Log Out"
                message="Are you sure you want to log out?"
                confirmText="Log Out"
                isDanger={true}
            />
        </AppLayout>
    );
};

export default ProfilePage;
