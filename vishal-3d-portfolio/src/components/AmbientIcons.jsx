import React, { useMemo } from 'react';

const ICONS = [
    '📄', '📁', '💻', '💾', '🔍', '⚙️', '🗑️', '🌐'
];

const AmbientIcons = () => {
    const icons = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            icon: ICONS[i % ICONS.length],
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 95}%`,
            delay: `${Math.random() * -12}s`,
            duration: `${10 + Math.random() * 10}s`,
            size: `${16 + Math.random() * 8}px`
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {icons.map(icon => (
                <div
                    key={icon.id}
                    className="ambient-icon"
                    style={{
                        top: icon.top,
                        left: icon.left,
                        animationDelay: icon.delay,
                        animationDuration: icon.duration,
                        fontSize: icon.size
                    }}
                >
                    {icon.icon}
                </div>
            ))}
        </div>
    );
};

export default AmbientIcons;
