import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WarningModal from './WarningModal';
import './FullscreenWrapper.css';

interface FullscreenWrapperProps {
  children: React.ReactNode;
  status?: string;
}


interface ViolationData {
  contestId: string;
  userId: string;
  violationType: string;
  timestamp: string;
  description: string;
}

// const FullscreenWrapper: React.FC<FullscreenWrapperProps> = ({ children, status }) => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [showWarning, setShowWarning] = useState(false);
//   const [warningMessage, setWarningMessage] = useState('');
//   const [violationCount, setViolationCount] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const maxViolations = 2; // After 2 warnings, disqualify

//   const enterFullscreen = async () => {
//     try {
//       if (document.documentElement.requestFullscreen) {
//         await document.documentElement.requestFullscreen();
//       } else if ((document.documentElement as any).webkitRequestFullscreen) {
//         await (document.documentElement as any).webkitRequestFullscreen();
//       } else if ((document.documentElement as any).mozRequestFullScreen) {
//         await (document.documentElement as any).mozRequestFullScreen();
//       } else if ((document.documentElement as any).msRequestFullscreen) {
//         await (document.documentElement as any).msRequestFullscreen();
//       }
//     } catch (error) {
//       console.error('Failed to enter fullscreen:', error);
//     }
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) {
//         await document.exitFullscreen();
//       } else if ((document as any).webkitExitFullscreen) {
//         await (document as any).webkitExitFullscreen();
//       } else if ((document as any).mozCancelFullScreen) {
//         await (document as any).mozCancelFullScreen();
//       } else if ((document as any).msExitFullscreen) {
//         await (document as any).msExitFullscreen();
//       }
//     } catch (error) {
//       console.error('Failed to exit fullscreen:', error);
//     }
//   };

//   const reportViolation = async (violationType: string, description: string) => {
//     try {
//       const violationData: ViolationData = {
//         contestId: id || '',
//         userId: 'current-user-id', // Replace with actual user ID
//         violationType,
//         timestamp: new Date().toISOString(),
//         description
//       };

//       // Send violation report to backend
//       await fetch('/api/report-violation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(violationData),
//       });
//     } catch (error) {
//       console.error('Failed to report violation:', error);
//     }
//   };

//   const handleViolation = async (type: string, message: string) => {
//     const newViolationCount = violationCount + 1;
//     setViolationCount(newViolationCount);

//     await reportViolation(type, message);

//     if (newViolationCount >= maxViolations) {
//       // Disqualify user
//       navigate('/disqualified', { 
//         state: { 
//           reason: 'Multiple malpractice violations detected',
//           contestId: id 
//         }
//       });
//     } else {
//       // Show warning
//       setWarningMessage(message);
//       setShowWarning(true);

//       // Auto-close warning after 5 seconds
//       // if (warningTimeoutRef.current) {
//       //   clearTimeout(warningTimeoutRef.current);
//       // }
//       // warningTimeoutRef.current = setTimeout(() => {
//       //   handleCloseWarning();
//       // }, 5000);
//     }
//   };

//   const handleCloseWarning = async () => {
//     setShowWarning(false);
//     if (warningTimeoutRef.current) {
//       clearTimeout(warningTimeoutRef.current);
//     }
//     // Auto-return to fullscreen
//     if (!isFullscreen) {
//       await enterFullscreen();
//     }
//   };

//   useEffect(() => {
//     // Enter fullscreen on component mount
//     enterFullscreen();

//     // Prevent context menu
//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//     };

//     // Handle fullscreen change
//     const handleFullscreenChange = () => {
//       const isCurrentlyFullscreen = !!(
//         document.fullscreenElement ||
//         (document as any).webkitFullscreenElement ||
//         (document as any).mozFullScreenElement ||
//         (document as any).msFullscreenElement
//       );

//       setIsFullscreen(isCurrentlyFullscreen);

//       if (!isCurrentlyFullscreen && !showWarning) {
//         handleViolation(
//           'fullscreen_exit',
//           'Exiting fullscreen mode is not allowed during the quiz!'
//         );
//       }
//     };

//     // Handle window focus/blur (tab switching)
//     const handleVisibilityChange = () => {
//       if (document.hidden && !showWarning) {
//         handleViolation(
//           'tab_switch',
//           'Switching tabs or windows is not allowed during the quiz!'
//         );
//       }
//     };

//     const handleWindowBlur = () => {
//       if (!showWarning) {
//         handleViolation(
//           'window_blur',
//           'Losing focus on the quiz window is not allowed!'
//         );
//       }
//     };

//     // Handle keyboard shortcuts
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Prevent common malpractice keys
//       const forbiddenKeys = [
//         'F11', // Fullscreen toggle
//         'Escape', // Exit fullscreen
//         'F12', // Developer tools
//         'F5', // Refresh
//       ];

//       // Prevent Ctrl combinations
//       if (e.ctrlKey && ['c', 'v', 'a', 's', 'r', 'u', 'i', 'j', 'k'].includes(e.key.toLowerCase())) {
//         e.preventDefault();
//         handleViolation(
//           'keyboard_shortcut',
//           `Keyboard shortcut ${e.ctrlKey ? 'Ctrl+' : ''}${e.key.toUpperCase()} is not allowed!`
//         );
//         return;
//       }

//       // Prevent Alt combinations
//       if (e.altKey && ['Tab', 'F4'].includes(e.key)) {
//         e.preventDefault();
//         handleViolation(
//           'keyboard_shortcut',
//           `Keyboard shortcut Alt+${e.key} is not allowed!`
//         );
//         return;
//       }

//       // Prevent specific keys
//       if (forbiddenKeys.includes(e.key)) {
//         e.preventDefault();
//         handleViolation(
//           'forbidden_key',
//           `Key ${e.key} is not allowed during the quiz!`
//         );
//         return;
//       }

//       // Prevent Windows key
//       if (e.key === 'Meta' || e.metaKey) {
//         e.preventDefault();
//         handleViolation(
//           'windows_key',
//           'Windows key is not allowed during the quiz!'
//         );
//         return;
//       }
//     };

//     // Handle print screen
//     const handleKeyUp = (e: KeyboardEvent) => {
//       if (e.key === 'PrintScreen') {
//         handleViolation(
//           'screenshot',
//           'Taking screenshots is not allowed during the quiz!'
//         );
//       }
//     };

//     // Add event listeners
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
//     document.addEventListener('mozfullscreenchange', handleFullscreenChange);
//     document.addEventListener('MSFullscreenChange', handleFullscreenChange);
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('keyup', handleKeyUp);
//     window.addEventListener('blur', handleWindowBlur);

//     // Cleanup
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//       document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
//       document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
//       document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('keyup', handleKeyUp);
//       window.removeEventListener('blur', handleWindowBlur);

//       if (warningTimeoutRef.current) {
//         clearTimeout(warningTimeoutRef.current);
//       }
//     };
//   }, [violationCount, showWarning, isFullscreen, id, navigate]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       exitFullscreen();
//     };
//   }, []);

//   return (
//     <div className="fullscreen-wrapper">
//       {children}

//       {showWarning && (
//         <WarningModal
//           message={warningMessage}
//           violationCount={violationCount}
//           maxViolations={maxViolations}
//           onClose={handleCloseWarning}
//         />
//       )}
//     </div>
//   );
// };

// export default FullscreenWrapper;


const FullscreenWrapper: React.FC<FullscreenWrapperProps> = ({ children, status }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [violationCount, setViolationCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxViolations = 2;

  const checkIfDesktop = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
      window.innerWidth < 1024;

    setIsDesktop(!isMobile);
  };


  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        await (document.documentElement as any).mozRequestFullScreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        await (document.documentElement as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  };

  const reportViolation = async (violationType: string, description: string) => {
    try {
      const violationData: ViolationData = {
        contestId: id || '',
        userId: 'current-user-id',
        violationType,
        timestamp: new Date().toISOString(),
        description
      };
      await fetch('/api/report-violation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(violationData),
      });
    } catch (error) {
      console.error('Failed to report violation:', error);
    }
  };

  const handleViolation = async (type: string, message: string) => {
    const newCount = violationCount + 1;
    setViolationCount(newCount);
    await reportViolation(type, message);

    if (newCount >= maxViolations) {
      navigate('/disqualified', {
        state: {
          reason: 'Multiple malpractice violations detected',
          contestId: id,
        },
      });
    } else {
      setWarningMessage(message);
      setShowWarning(true);
    }
  };

  const handleCloseWarning = async () => {
    setShowWarning(false);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (!isFullscreen) await enterFullscreen();
  };

  useEffect(() => {
    checkIfDesktop();
  }, []);

  useEffect(() => {
    if (status !== 'active' || !isDesktop) return;

    enterFullscreen();

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleFullscreenChange = () => {
      const isCurrentFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentFullscreen);

      if (!isCurrentFullscreen && !showWarning) {
        handleViolation('fullscreen_exit', 'Exiting fullscreen is not allowed during the quiz!');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !showWarning) {
        handleViolation('tab_switch', 'Switching tabs is not allowed!');
      }
    };

    const handleWindowBlur = () => {
      if (!showWarning) {
        handleViolation('window_blur', 'Losing focus on the quiz window is not allowed!');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const forbiddenKeys = ['F11', 'Escape', 'F12', 'F5'];
      if (e.ctrlKey && ['c', 'v', 'a', 's', 'r', 'u', 'i', 'j', 'k'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        handleViolation('keyboard_shortcut', `Ctrl+${e.key.toUpperCase()} is not allowed!`);
        return;
      }
      if (e.altKey && ['Tab', 'F4'].includes(e.key)) {
        e.preventDefault();
        handleViolation('keyboard_shortcut', `Alt+${e.key} is not allowed!`);
        return;
      }
      if (forbiddenKeys.includes(e.key)) {
        e.preventDefault();
        handleViolation('forbidden_key', `Key ${e.key} is not allowed!`);
        return;
      }
      if (e.key === 'Meta' || e.metaKey) {
        e.preventDefault();
        handleViolation('windows_key', 'Windows key is not allowed!');
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        handleViolation('screenshot', 'Screenshots are not allowed!');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [status, violationCount, showWarning, isFullscreen, id, navigate]);

  useEffect(() => {
    return () => {
      exitFullscreen();
    };
  }, []);
  
  if (!isDesktop) {
    return (
      <div className="device-block-screen">
        <div className="device-block-message">
          <h2>Unsupported Device</h2>
          <p>This test can only be taken on a desktop or laptop computer.</p>
        </div>
      </div>
    );
  }

  if (!isFullscreen && status === 'active') {
    return (
      <div className="fullscreen-prompt-screen">
        <div className="fullscreen-prompt-content">
          <div className="fullscreen-prompt-icon">⛶</div>
          <h2 className="fullscreen-prompt-title">Enable Fullscreen Mode</h2>
          <p className="fullscreen-prompt-text">
            To begin the quiz, fullscreen mode is required. This helps prevent cheating and ensures a focused experience.
          </p>
          <button className="fullscreen-prompt-button" onClick={enterFullscreen}>
            Enter Fullscreen
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="fullscreen-wrapper">
      {children}
      {status === 'active' && showWarning && (
        <WarningModal
          message={warningMessage}
          violationCount={violationCount}
          maxViolations={maxViolations}
          onClose={handleCloseWarning}
        />
      )}
    </div>
  );
};

export default FullscreenWrapper;
