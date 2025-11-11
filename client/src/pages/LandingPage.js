import { Link } from 'react-router-dom';
import { CheckCircle, ListTodo, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <ListTodo size={32} />,
      title: "Smart Task Management",
      description: "Organize your tasks efficiently with our intuitive interface"
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description: "Quick and responsive interface for seamless productivity"
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected at all times"
    },
    {
      icon: <Users size={32} />,
      title: "Easy Collaboration",
      description: "Share and collaborate on tasks with your team"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Tasks Completed" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9★", label: "User Rating" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <CheckCircle size={16} />
            <span>Your Productivity Partner</span>
          </div>
          <h1 className="hero-title">
            Organize Your Life,
            <br />
            <span className="gradient-text-landing">One Task at a Time</span>
          </h1>
          <p className="hero-description">
            A simple, powerful, and beautiful way to manage your daily tasks.
            Stay organized, boost productivity, and achieve your goals with ease.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn-hero-primary">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn-hero-secondary">
              Learn More
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-icon">🔥</span>
              <span className="hero-card-title">Today's Tasks</span>
            </div>
            <div className="hero-task-list">
              <div className="hero-task completed">
                <div className="task-checkbox checked">✓</div>
                <span>Morning workout</span>
              </div>
              <div className="hero-task completed">
                <div className="task-checkbox checked">✓</div>
                <span>Team meeting at 10am</span>
              </div>
              <div className="hero-task">
                <div className="task-checkbox"></div>
                <span>Finish project proposal</span>
              </div>
              <div className="hero-task">
                <div className="task-checkbox"></div>
                <span>Review design mockups</span>
              </div>
            </div>
            <div className="hero-progress">
              <div className="progress-info">
                <span>Progress</span>
                <span>50%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything You Need to Stay Productive</h2>
          <p>Powerful features designed to make task management effortless</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who are already managing their tasks efficiently</p>
          <Link to="/login" className="btn-cta">
            Create Your Free Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
