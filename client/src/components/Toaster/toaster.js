// // import React, { useEffect, useState } from 'react';
// // import './toaster.css'; // Import your CSS for styling
// // import CheckIcon from '@mui/icons-material/Check';
// // import CloseIcon from '@mui/icons-material/Close';
// // import { IconButton } from '@mui/material';

// // const Toaster = ({ message, isVisible, onClose, duration = 4000, type = 'success' }) => {
// //     const [showFillAnimation, setShowFillAnimation] = useState(false);

// //     useEffect(() => {
// //         if (isVisible) {
// //             // Start fill animation after toast appears
// //             const fillTimer = setTimeout(() => {
// //                 setShowFillAnimation(true);
// //             }, 100);

// //             const timer = setTimeout(() => {
// //                 onClose();
// //             }, duration);

// //             return () => {
// //                 clearTimeout(timer);
// //                 clearTimeout(fillTimer);
// //             };
// //         } else {
// //             setShowFillAnimation(false);
// //         }
// //     }, [isVisible, duration, onClose]);

// //     if (!isVisible) return null;

// //     return (
// //         <div className={`toaster ${type} ${isVisible ? 'toaster-show' : ''}`}>
// //             <div className="toaster-content">
// //                 <div className="toaster-icon">
// //                     <CheckIcon sx={{ color: 'white', fontSize: '20px' }} />
// //                 </div>
// //                 <div className="toaster-message">
// //                     <div className="toaster-title">Message Sent</div>
// //                     <div className="toaster-subtitle">{message}</div>
// //                 </div>
// //                 <IconButton 
// //                     onClick={onClose} 
// //                     className="toaster-close"
// //                     size="small"
// //                 >
// //                     <CloseIcon sx={{ 
// //                         color: showFillAnimation ? '#666' : 'white', 
// //                         fontSize: '18px',
// //                         transition: 'color 4s ease-in-out'
// //                     }} />
// //                 </IconButton>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Toaster;

// import React, { useEffect, useState } from 'react';
// import './toaster.css'; // Import your CSS for styling
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { IconButton } from '@mui/material';

// const Toaster = ({
//     title = "", // 👈 Now customizable
//     message,
//     isVisible,
//     onClose,
//     duration = 2000,
//     type = 'success'
// }) => {
//     const [showFillAnimation, setShowFillAnimation] = useState(false);

//     useEffect(() => {
//         if (isVisible) {
//             const fillTimer = setTimeout(() => {
//                 setShowFillAnimation(true);
//             }, 100);

//             const timer = setTimeout(() => {
//                 onClose();
//             }, duration);

//             return () => {
//                 clearTimeout(timer);
//                 clearTimeout(fillTimer);
//             };
//         } else {
//             setShowFillAnimation(false);
//         }
//     }, [isVisible, duration, onClose]);

//     if (!isVisible) return null;

//     return (
//         <div className={`toaster ${type} ${isVisible ? 'toaster-show' : ''}`}>
//             <div className="toaster-content">
//                 <div className="toaster-icon">
//                     <CheckIcon sx={{ color: 'white', fontSize: '20px' }} />
//                 </div>
//                 <div className="toaster-message">
//                     <div className="toaster-title">{title}</div> {/* 👈 Dynamic title */}
//                     <div className="toaster-subtitle">{message}</div>
//                 </div>
//                 <IconButton 
//                     onClick={onClose} 
//                     className="toaster-close"
//                     size="small"
//                 >
//                     <CloseIcon sx={{ 
//                         color: showFillAnimation ? '#666' : 'white', 
//                         fontSize: '18px',
//                         transition: 'color 4s ease-in-out'
//                     }} />
//                 </IconButton>
//             </div>
//         </div>
//     );
// };

// export default Toaster;

import React, { useEffect, useState } from 'react';
import './toaster.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Toaster = ({
    title = '',
    message,
    isVisible,
    onClose,
    duration = 1000,
    type = 'success'
}) => {
    const [showFillAnimation, setShowFillAnimation] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowFillAnimation(false); // reset animation
            const fillTimer = setTimeout(() => {
                setShowFillAnimation(true);
            }, 100);

            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => {
                clearTimeout(timer);
                clearTimeout(fillTimer);
            };
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toaster ${type} toaster-show`}>
            <div className="toaster-content">
                <div className="toaster-icon">
                    <CheckIcon sx={{ color: 'white', fontSize: 20 }} />
                </div>
                <div className="toaster-message">
                    <div className="toaster-title">{title}</div>
                    <div className="toaster-subtitle">{message}</div>
                </div>
                <IconButton onClick={onClose} className="toaster-close" size="small">
                    <CloseIcon
                        sx={{
                            color: showFillAnimation ? '#666' : 'white',
                            fontSize: 18,
                            transition: 'color 0.5s ease-in-out',
                        }}
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default Toaster;
