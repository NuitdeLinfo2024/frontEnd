// Bubble.tsx
import React from 'react';

interface BubbleProps {
    size: number;
    position: { top: string; left: string };
}

const Bubble: React.FC<BubbleProps> = ({ size, position }) => {
    return (
        <div
            style={{
                position: 'fixed',
                borderRadius: '50%',
                border: '2px solid #76b6c4',
                width: size,
                height: size,
                ...position,
                boxSizing: 'border-box', // Ensure border is included in dimensions
            }}
        />
    );
};

export default Bubble;
