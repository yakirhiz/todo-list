import Auth from '../components/Auth';
import { Link } from 'react-router-dom';
import { CheckCircle, ListTodo, Zap, Shield } from 'lucide-react';

export default function LoginPage({ setAuthenticated }) {
  return (
    <div className="login-page">
      <div className="login-split-container">
        {/* Left side - Auth form */}
        <div className="login-form-section">
          <div className="login-header">
            <Link to="/" className="login-logo">
              <span className="logo-icon">🔥</span>
              <span className="logo-text">Todolist</span>
            </Link>
          </div>
          <Auth setAuthenticated={setAuthenticated} />
        </div>

        {/* Right side - Marketing content */}
        <div className="login-info-section">
          <div className="login-info-content">
            <h1 className="login-info-title">
              Organize your life,<br />
              <span className="gradient-text-login">one task at a time</span>
            </h1>
            <p className="login-info-description">
              Join thousands of users who have already transformed their productivity with our intuitive todo management system.
            </p>
            
            <div className="login-features">
              <div className="login-feature-item">
                <div className="feature-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="feature-text">
                  <h4>Easy Task Management</h4>
                  <p>Create, organize, and track your tasks effortlessly</p>
                </div>
              </div>
              
              <div className="login-feature-item">
                <div className="feature-icon">
                  <Zap size={20} />
                </div>
                <div className="feature-text">
                  <h4>Lightning Fast</h4>
                  <p>Quick sync across all your devices instantly</p>
                </div>
              </div>
              
              <div className="login-feature-item">
                <div className="feature-icon">
                  <Shield size={20} />
                </div>
                <div className="feature-text">
                  <h4>Secure & Private</h4>
                  <p>Your data is encrypted and protected</p>
                </div>
              </div>
            </div>

            <div className="login-testimonial">
              <p className="testimonial-quote">
                "This app has completely changed how I manage my daily tasks. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👤</div>
                <div className="author-info">
                  <strong>Alex Johnson</strong>
                  <span>Product Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
