import React, { useState, useEffect } from 'react';

const SystemMetrics = () => {
    const [metrics, setMetrics] = useState({
        cpu: 23,
        memory: 512,
        uptime: '00:00:00'
    });

    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            // Simulated subtle changes
            setMetrics(prev => ({
                cpu: Math.max(5, Math.min(99, prev.cpu + (Math.random() * 4 - 2))),
                memory: Math.max(400, Math.min(2048, prev.memory + (Math.sin(Date.now() / 5000) * 10))),
                uptime: formatUptime(Date.now() - startTime)
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatUptime = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="system-metrics-overlay select-none">
            <div>CPU_USAGE: {metrics.cpu.toFixed(1)}%</div>
            <div>MEMORY: {Math.floor(metrics.memory)}MB / 2GB</div>
            <div>UPTIME: {metrics.uptime}</div>
        </div>
    );
};

export default SystemMetrics;
