
import React from 'react';
import { BotState } from '../types';

interface HeaderProps {
  botState: BotState;
}

const Header: React.FC<HeaderProps> = ({ botState }) => {
  const healthColor = botState.health > 70 ? 'bg-green-500' : botState.health > 40 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <header className="bg-gray-800/30 backdrop-blur-sm sticky top-0 z-10 py-4 px-4 md:px-6 border-b border-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Agent Team Agenda</h1>
            <div className="flex-grow max-w-lg w-full">
                <div className="mb-2 text-center md:text-left">
                    <p className="text-indigo-300 italic">"{botState.message}"</p>
                </div>
                <div className="space-y-2">
                    <div>
                        <div className="flex justify-between mb-1 text-sm font-medium text-gray-300">
                            <span>Bot Health</span>
                            <span>{botState.health.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className={`${healthColor} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${botState.health}%` }}></div>
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between mb-1 text-sm font-medium text-gray-300">
                            <span>Build Progress</span>
                            <span>{botState.buildProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${botState.buildProgress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;