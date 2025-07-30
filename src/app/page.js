import './home.css'

export default function Home() {

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <>
      <div className='home-page'>
        <div className="home-bg-shapes">
          <div className="home-shape"></div>
          <div className="home-shape"></div>
          <div className="home-shape"></div>
        </div>

        <header className="home-header">
          <div className="home-container">
            <div className="home-header-content">
              <div className="home-logo">ThinkDrop</div>
              <nav className="home-nav-links">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#subscribe">Subscribe</a>
              </nav>
            </div>
          </div>
        </header>

        <section className="home-hero">
          <div className="home-container">
            <h1 className="home-hero-title">Daily Skill Challenges</h1>
            <p className="home-hero-subtitle">Expand Your Mind, One Challenge at a Time</p>
            <p className="home-hero-description">
              Wake up to a new challenge everyday at your selected timing. Receive emails with random topics,
              creative tasks, and brain-bending problems designed to build your multidimensional skillset.
            </p>
            <a href="/signup" className="home-hero-button">
              Get Started
            </a>
          </div>
        </section>

        <section className="home-features" id="features">
          <div className="home-container">
            <h2>Why ThinkDrop?</h2>
            <div className="home-features-grid">
              <div className="home-feature-card">
                <span className="home-feature-icon">🧠</span>
                <h3>Random Topics</h3>
                <p>From quantum physics to creative writing, cooking to coding - every day brings a completely new domain to explore and master.</p>
              </div>
              <div className="home-feature-card">
                <span className="home-feature-icon">⚡</span>
                <h3>Daily Challenges</h3>
                <p>Bite-sized tasks delivered every day, designed to fit into your routine while pushing your comfort zone.</p>
              </div>
              <div className="home-feature-card">
                <span className="home-feature-icon">🚀</span>
                <h3>Skill Building</h3>
                <p>Develop critical thinking, creativity, problem-solving, and adaptability across multiple disciplines simultaneously.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <div className="home-container">
            <p>&copy; 2025 thinkdrop. Building minds, one challenge at a time.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
