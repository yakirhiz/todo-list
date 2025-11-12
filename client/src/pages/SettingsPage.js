import { useState } from 'react';
import { User, Lock, Bell, Palette, Trash2, Save } from 'lucide-react';

export default function SettingsPage({ setAuthenticated }) {
  const username = localStorage.getItem('username');
  
  const [settings, setSettings] = useState({
    // Profile settings
    username: username || '',
    email: '',
    
    // Password settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    
    // Appearance settings
    theme: 'light',
    compactMode: false
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (settings.newPassword !== settings.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }
    
    if (settings.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters!' });
      return;
    }
    
    // TODO: Implement password change API call
    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    // TODO: Save notification preferences
    setMessage({ type: 'success', text: 'Notification preferences saved!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveAppearance = (e) => {
    e.preventDefault();
    // TODO: Save appearance preferences
    setMessage({ type: 'success', text: 'Appearance settings saved!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      // TODO: Implement account deletion API call
      localStorage.removeItem('username');
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      setAuthenticated(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      {message.text && (
        <div className={`settings-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <Lock size={18} />
            <span>Password</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette size={18} />
            <span>Appearance</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <Trash2 size={18} />
            <span>Account</span>
          </button>
        </div>

        <div className="settings-content">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={settings.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                <button type="submit" className="btn-save">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* Password Settings */}
          {activeTab === 'password' && (
            <div className="settings-section">
              <h2>Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={settings.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                  <small>Must be at least 8 characters</small>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                  />
                </div>
                <button type="submit" className="btn-save">
                  <Save size={16} />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <form onSubmit={handleSaveNotifications}>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                    />
                    <span>Email Notifications</span>
                  </label>
                  <small>Receive email updates about your tasks</small>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={settings.pushNotifications}
                      onChange={handleInputChange}
                    />
                    <span>Push Notifications</span>
                  </label>
                  <small>Receive browser push notifications</small>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="taskReminders"
                      checked={settings.taskReminders}
                      onChange={handleInputChange}
                    />
                    <span>Task Reminders</span>
                  </label>
                  <small>Get reminders for pending tasks</small>
                </div>
                <button type="submit" className="btn-save">
                  <Save size={16} />
                  <span>Save Preferences</span>
                </button>
              </form>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <form onSubmit={handleSaveAppearance}>
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="compactMode"
                      checked={settings.compactMode}
                      onChange={handleInputChange}
                    />
                    <span>Compact Mode</span>
                  </label>
                  <small>Show more items with reduced spacing</small>
                </div>
                <button type="submit" className="btn-save">
                  <Save size={16} />
                  <span>Save Appearance</span>
                </button>
              </form>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Management</h2>
              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                  type="button" 
                  className="btn-delete-account"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 size={16} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
