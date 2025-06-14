import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XCircle, AlertTriangle, Shield, Home, Mail } from 'lucide-react';
import './DisQualified.css';

interface DisqualificationState {
  reason: string;
  contestId: string;
}

const DisqualifiedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as DisqualificationState;

  useEffect(() => {
    // Prevent going back
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventBack);

    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  const preventBack = () => {
    window.history.pushState(null, '', window.location.href);
  };

  const handleContactSupport = () => {
    // Open email client or redirect to support page
    window.open('mailto:support@quizplatform.com?subject=Contest Disqualification Appeal', '_blank');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="disqualified-page">
      <div className="disqualified-container">
        <div className="disqualified-header">
          <div className="disqualified-icon-container">
            <XCircle className="disqualified-icon" />
          </div>
          <h1 className="disqualified-title">
            Disqualified from Contest
          </h1>
        </div>

        <div className="disqualified-content">
          <div className="disqualified-reason">
            <AlertTriangle className="reason-icon" />
            <div className="reason-content">
              <h2>Reason for Disqualification</h2>
              <p>{state?.reason || 'Multiple malpractice violations detected during the quiz'}</p>
            </div>
          </div>

          <div className="disqualified-details">
            <div className="detail-item">
              <Shield className="detail-icon" />
              <div className="detail-content">
                <h3>Security Violations Detected</h3>
                <p>Our system detected multiple attempts to compromise the integrity of the quiz environment.</p>
              </div>
            </div>

            <div className="violations-list">
              <h3>Common Violations Include:</h3>
              <ul>
                <li>Switching between tabs or applications</li>
                <li>Exiting fullscreen mode</li>
                <li>Using forbidden keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)</li>
                <li>Attempting to take screenshots</li>
                <li>Using developer tools or browser shortcuts</li>
                <li>Losing focus on the quiz window</li>
              </ul>
            </div>

            <div className="disqualified-consequences">
              <h3>Consequences</h3>
              <div className="consequences-grid">
                <div className="consequence-item">
                  <span className="consequence-title">Contest Participation</span>
                  <span className="consequence-status terminated">Terminated</span>
                </div>
                <div className="consequence-item">
                  <span className="consequence-title">Quiz Progress</span>
                  <span className="consequence-status invalid">Invalidated</span>
                </div>
                <div className="consequence-item">
                  <span className="consequence-title">Results</span>
                  <span className="consequence-status not-available">Not Available</span>
                </div>
                <div className="consequence-item">
                  <span className="consequence-title">Record Status</span>
                  <span className="consequence-status recorded">Violation Recorded</span>
                </div>
              </div>
            </div>
          </div>

          <div className="disqualified-info">
            <h3>What This Means</h3>
            <div className="info-content">
              <p>
                Your participation in Contest #{state?.contestId || 'Unknown'} has been terminated 
                due to detected malpractice. This decision is final and your responses will not be evaluated.
              </p>
              <p>
                All quiz activities are monitored to ensure fairness for all participants. 
                The security measures are in place to maintain the integrity of the assessment process.
              </p>
            </div>
          </div>

          <div className="disqualified-appeal">
            <h3>Believe This Was an Error?</h3>
            <p>
              If you believe your disqualification was due to a technical error or misunderstanding, 
              you may contact our support team for review.
            </p>
            <div className="appeal-note">
              <strong>Note:</strong> Appeals are reviewed on a case-by-case basis and are subject to 
              verification of the reported violations.
            </div>
          </div>
        </div>

        <div className="disqualified-actions">
          <button
            onClick={handleContactSupport}
            className="support-btn"
          >
            <Mail className="btn-icon" />
            Contact Support
          </button>
          <button
            onClick={handleReturnHome}
            className="home-btn"
          >
            <Home className="btn-icon" />
            Return to Home
          </button>
        </div>

        <div className="disqualified-footer">
          <p>
            Contest ID: {state?.contestId || 'N/A'} | 
            Disqualified at: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisqualifiedPage;