import './authPage.css';

export default function AuthPageLayout({ children }) {

    return (
        <>
            <div className="auth-page">
                <div className="auth-container">
                    <header className="auth-header">
                        <div className="auth-logo">ThinkDrop</div>
                        <h1 className="auth-tagline">Start Your Daily Learning Adventure</h1>
                    </header>

                    <div className="auth-form-container">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
