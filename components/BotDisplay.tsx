import React, { useState, useEffect, useMemo } from 'react';
import { BotStage, BotBuildStage, BotDecayStage } from '../types';

interface BotDisplayProps {
  stage: BotStage;
  rewardTrigger?: string;
}

const RewardSparkles: React.FC = () => {
    const sparkles = useMemo(() => Array.from({ length: 10 }).map(() => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 100 + Math.random() * 30;
        const x = 100 + radius * Math.cos(angle);
        const y = 100 + radius * Math.sin(angle);
        const duration = 0.6 + Math.random() * 0.5;
        const delay = Math.random() * 0.3;
        const scale = 0.6 + Math.random() * 0.7;
        return { x, y, duration, delay, scale };
    }), []);

    return (
        <g style={{ pointerEvents: 'none' }}>
            {sparkles.map((s, i) => (
                <path
                    key={i}
                    d="M10 0 L13 7 L20 10 L13 13 L10 20 L7 13 L0 10 L7 7 Z"
                    fill="#FBBF24"
                    transform={`translate(${s.x - 10}, ${s.y - 10})`}
                >
                    <animateTransform attributeName="transform" type="scale" from="0" to={`${s.scale}`} begin={`${s.delay}s`} dur={`${s.duration}s`} fill="freeze" additive="sum" values={`0; ${s.scale}; 0`} keyTimes="0; 0.5; 1" />
                    <animate attributeName="opacity" values="0; 1; 0" keyTimes="0; 0.5; 1" dur={`${s.duration}s`} begin={`${s.delay}s`} fill="freeze" />
                </path>
            ))}
        </g>
    );
};

const BoxBot: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80">
        <g transform="translate(40, 50)">
            <path d="M 0 30 L 60 0 L 120 30 L 60 60 Z" fill="#A16207" />
            <path d="M 0 30 L 0 90 L 60 120 L 60 60 Z" fill="#CA8A04" />
            <path d="M 60 60 L 60 120 L 120 90 L 120 30 Z" fill="#EAB308" />
            <path d="M 50 55 L 70 55 L 70 75 L 50 75 Z M 60 55 L 60 75 M 50 65 L 70 65" stroke="#854D0E" strokeWidth="2" fill="none" />
        </g>
    </svg>
);

const PartsBot: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80">
        <g fill="#718096">
            <rect x="70" y="20" width="60" height="40" rx="5" />
            <rect x="145" y="70" width="25" height="70" rx="5" transform="rotate(15 157.5 105)" />
            <rect x="30" y="70" width="25" height="70" rx="5" transform="rotate(-15 42.5 105)" />
            <rect x="55" y="80" width="90" height="100" rx="10" fill="#4A5568" />
            <rect x="105" y="160" width="30" height="60" rx="5" />
            <circle cx="50" cy="40" r="10" />
            <line x1="55" y1="40" x2="65" y2="40" stroke="#A0AEC0" strokeWidth="3" />
        </g>
    </svg>
);

const PartialAssemblyBot: React.FC = () => (
     <svg viewBox="-50 -50 300 300" className="w-64 h-64 md:w-80 md:h-80">
        <rect x="55" y="60" width="90" height="100" rx="10" fill="#4A5568" />
        <rect x="70" y="20" width="60" height="40" rx="5" fill="#718096" />
        <rect x="75" y="30" width="50" height="20" fill="#2D3748" />
        <rect x="80" y="35" width="40" height="10" fill="#4299E1" />
        <rect x="145" y="70" width="25" height="70" rx="5" fill="#718096" />
        <rect x="105" y="160" width="30" height="60" rx="5" fill="#718096" />
        <g transform="translate(-40 70)">
             <rect x="30" y="70" width="25" height="70" rx="5" fill="#718096" />
        </g>
        <path d="M 80 160 l -10 10 l -10 -5" stroke="#FBBF24" strokeWidth="2" fill="none" />
        <path d="M 55 90 l -10 0 l -5 5" stroke="#FBBF24" strokeWidth="2" fill="none" />
    </svg>
);

const NearlyCompleteBot: React.FC = () => (
     <svg viewBox="-50 -50 300 300" className="w-64 h-64 md:w-80 md:h-80">
        <rect x="55" y="60" width="90" height="100" rx="10" fill="#4A5568" />
        <rect x="70" y="20" width="60" height="40" rx="5" fill="#718096" />
        <rect x="75" y="30" width="50" height="20" fill="#2D3748" />
        <rect x="80" y="35" width="40" height="10" fill="#4299E1" />
        <rect x="145" y="70" width="25" height="70" rx="5" fill="#718096" />
        <rect x="65" y="160" width="30" height="60" rx="5" fill="#718096" />
        <rect x="105" y="160" width="30" height="60" rx="5" fill="#718096" />
        <g transform="translate(-40, 0)">
            <rect x="30" y="70" width="25" height="70" rx="5" fill="#718096" transform="rotate(-30 42.5 105)">
                 <animateTransform attributeName="transform" type="rotate" values="-30 42.5 105; 0 42.5 105; -30 42.5 105" dur="3s" repeatCount="indefinite"/>
            </rect>
        </g>
    </svg>
);


const CollapsedBot: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80">
        <g transform="translate(10, 50)">
            <rect x="55" y="60" width="90" height="100" rx="10" fill="#374151" transform="rotate(10 100 110)"/>
            <rect x="70" y="20" width="60" height="40" rx="5" fill="#4A5568" transform="translate(30, 80) rotate(75 100 40)"/>
            <rect x="75" y="30" width="50" height="20" fill="#1F2937"  transform="translate(30, 80) rotate(75 100 40)"/>
            <path d="M 105 105 L 125 100 L 110 115 Z" stroke="#F87171" strokeWidth="2" fill="none" transform="translate(30, 80) rotate(75 100 40)" />
            <rect x="30" y="70" width="25" height="70" rx="5" fill="#4A5568" transform="translate(10, -30) rotate(-35 42.5 105)"/>
            <rect x="65" y="160" width="30" height="60" rx="5" fill="#4A5568" transform="translate(80, -90) rotate(80 80 190)"/>
            <g transform="translate(60 70)">
                <path d="M 0 0 l 5 -10 l 5 10 l -10 0 Z" fill="#FBBF24"><animate attributeName="opacity" values="0;1;0" dur="0.4s" begin="0.1s" repeatCount="indefinite" /></path>
                <path d="M 15 10 l 3 -6 l 3 6 l -6 0 Z" fill="#FBBF24"><animate attributeName="opacity" values="0;1;0" dur="0.5s" begin="0.3s" repeatCount="indefinite" /></path>
            </g>
        </g>
    </svg>
);

const BotParts: React.FC<{ stage: BotStage }> = ({ stage }) => {
    const isMissingArm = stage === BotDecayStage.MissingArm;
    const hasCrackedVisor = stage === BotDecayStage.CrackedVisor || stage === BotDecayStage.FlickeringLights || stage === BotDecayStage.Smoking;
    const hasFlickeringLights = stage === BotDecayStage.FlickeringLights;
    const isHealthy = stage === BotDecayStage.Healthy;

    return (
        <svg viewBox="-50 -50 300 300" className="w-64 h-64 md:w-80 md:h-80">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur">
                        {hasFlickeringLights && <animate attributeName="stdDeviation" values="3.5; 5.5; 3.5" dur="1.2s" repeatCount="indefinite" />}
                    </feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g>
                {isHealthy && <animateTransform attributeName="transform" type="scale" values="1; 1.02; 1" dur="4s" repeatCount="indefinite" additive="sum" transform-origin="center" />}
                <rect x="55" y="60" width="90" height="100" rx="10" fill="#4A5568" />
                <rect x="70" y="20" width="60" height="40" rx="5" fill="#718096" />
                <rect x="75" y="30" width="50" height="20" fill="#2D3748" />
                <rect x="80" y="35" width="40" height="10" fill={isHealthy ? "#60A5FA" : "#4299E1"} filter="url(#glow)">
                    {hasFlickeringLights && <animate attributeName="opacity" values="1;0.1;1;0.3;1" dur="0.6s" repeatCount="indefinite" />}
                </rect>
                {hasCrackedVisor && <path d="M 75 40 L 95 32 L 105 45 L 125 35 M 98 32 l 5 8" stroke="#F56565" strokeWidth="1.5" fill="none" />}
                {!isMissingArm && <rect x="30" y="70" width="25" height="70" rx="5" fill="#718096" />}
                <rect x="145" y="70" width="25" height="70" rx="5" fill="#718096" />
                <rect x="65" y="160" width="30" height="60" rx="5" fill="#718096" />
                <rect x="105" y="160" width="30" height="60" rx="5" fill="#718096" />
            </g>
            {stage === BotDecayStage.LooseScrews && (
                <g>
                    <g><animateTransform attributeName="transform" type="translate" values="0 0; 1 -1; -1 1; 0 0" dur="0.4s" repeatCount="indefinite" /><circle cx="60" cy="65" r="2.5" fill="#2D3748" /><path d="M 58 63 l 5 5 M 63 63 l -5 5" stroke="#2D3748" strokeWidth="1.5" /></g>
                    <g><animateTransform attributeName="transform" type="translate" values="0 0; -1 1; 1 -1; 0 0" dur="0.6s" repeatCount="indefinite" /><circle cx="140" cy="155" r="2.5" fill="#2D3748" /><path d="M 138 153 l 5 5 M 143 153 l -5 5" stroke="#2D3748" strokeWidth="1.5" /></g>
                </g>
            )}
            {stage === BotDecayStage.Smoking && (
                 <g>
                    <circle cx="80" cy="20" r="3" fill="#A0AEC0" opacity="0">
                        <animate attributeName="cy" from="20" to="-15" dur="2.8s" begin="0s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="80;75;85;80" dur="2.8s" begin="0s" repeatCount="indefinite" />
                        <animate attributeName="r" values="3;6;3" dur="2.8s" begin="0s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="2.8s" begin="0s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="95" cy="15" r="4" fill="#A0AEC0" opacity="0">
                        <animate attributeName="cy" from="15" to="-20" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="95;100;90;95" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
                        <animate attributeName="r" values="4;7;4" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="110" cy="22" r="3.5" fill="#A0AEC0" opacity="0">
                        <animate attributeName="cy" from="22" to="-10" dur="3.2s" begin="1s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="110;115;105;110" dur="3.2s" begin="1s" repeatCount="indefinite" />
                        <animate attributeName="r" values="3.5;6.5;3.5" dur="3.2s" begin="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.7;0" dur="3.2s" begin="1s" repeatCount="indefinite" />
                    </circle>
                </g>
            )}
        </svg>
    )
}

const BotDisplay: React.FC<BotDisplayProps> = ({ stage, rewardTrigger }) => {
  const [showReward, setShowReward] = useState(false);
  const [visibleStage, setVisibleStage] = useState(stage);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (stage !== visibleStage) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setVisibleStage(stage);
        setIsFading(false);
      }, 300); // This duration should match the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [stage, visibleStage]);
  
  useEffect(() => {
    if (rewardTrigger) {
      setShowReward(true);
      const timer = setTimeout(() => setShowReward(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [rewardTrigger]);

  const renderStage = (stageToRender: BotStage) => {
    switch (stageToRender) {
      case BotBuildStage.Box:
        return <BoxBot />;
      case BotBuildStage.Parts:
        return <PartsBot />;
      case BotBuildStage.PartialAssembly:
        return <PartialAssemblyBot />;
      // Fix: Corrected typo from BotBuildtStage to BotBuildStage.
      case BotBuildStage.NearlyComplete:
        return <NearlyCompleteBot />;
      case BotDecayStage.Collapsed:
        return <CollapsedBot />;
      default:
        return <BotParts stage={stageToRender} />;
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
        <div className={`transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {renderStage(visibleStage)}
        </div>
        {showReward && (
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    <RewardSparkles />
                </svg>
            </div>
        )}
    </div>
  );
};

export default BotDisplay;