import React from 'react';
import { AlertTriangle, X, Shield } from 'lucide-react';
import './WarningModal.css';

interface WarningModalProps {
  message: string;
  violationCount: number;
  maxViolations: number;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  message,
  violationCount,
  maxViolations,
  onClose
}) => {
  const remainingWarnings = maxViolations - violationCount;

  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal">
        <div className="warning-modal-header">
          <div className="warning-icon-container">
            <AlertTriangle className="warning-icon" />
          </div>
          <button
            onClick={onClose}
            className="warning-close-btn"
            aria-label="Close warning"
          >
            <X size={20} />
          </button>
        </div>

        <div className="warning-modal-content">
          <h2 className="warning-title">
            ⚠ Warning: Malpractice Detected
          </h2>
          
          <div className="warning-message">
            <p>{message}</p>
          </div>

          <div className="warning-status">
            <div className="warning-count">
              <Shield className="shield-icon" />
              <span>
                Warning {violationCount} of {maxViolations}
              </span>
            </div>
            
            {remainingWarnings > 0 ? (
              <div className="warning-remaining">
                <span className="remaining-count">{remainingWarnings}</span>
                <span className="remaining-text">
                  warning{remainingWarnings !== 1 ? 's' : ''} remaining
                </span>
              </div>
            ) : (
              <div className="warning-final">
                <span className="final-warning">FINAL WARNING</span>
              </div>
            )}
          </div>

          <div className="warning-consequences">
            <h3>Consequences:</h3>
            <ul>
              <li>This violation has been recorded</li>
              <li>Continued malpractice will result in disqualification</li>
              <li>All actions are being monitored</li>
            </ul>
          </div>

        </div>

        <div className="warning-modal-footer">
          <button
            onClick={onClose}
            className="warning-understand-btn"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;