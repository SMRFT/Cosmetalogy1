import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { Tooltip } from 'react-tooltip';

const SignOut = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');
    setUserName(storedUserName || 'User');
    setUserEmail(storedUserEmail || 'user@example.com');
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/'); // Redirect to HomePage after logout
  };

  const handleIconClick = () => {
    setShowSignOut(!showSignOut);
  };

  return (
    <div className="sign-out" style={{ position: 'relative', display: 'inline-block' }}>
      <VscAccount
        data-tooltip-id="accountTooltip"
        onClick={handleIconClick}
        style={{ cursor: 'pointer' }}
      />
      <Tooltip id="accountTooltip" place="bottom" effect="solid" className="custom-tooltip">
        <div style={{ fontSize: '0.875rem', padding: '5px 10px' }}>
          <div>{userName}</div>
          <div>{userEmail}</div>
        </div>
      </Tooltip>
      {showSignOut && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '0px',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            padding: '10px',
            zIndex: 1,
            borderRadius: '5px',
          }}
        >
          <div style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>Hi, {userName}!</div>
          <button style={{ width: "100%", whiteSpace: 'nowrap', fontSize: '1rem' }} onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default SignOut;
