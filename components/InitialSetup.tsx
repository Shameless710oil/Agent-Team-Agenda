
import React, { useState } from 'react';
import { LoadingIcon } from './Icons';

interface InitialSetupProps {
  onInitialize: (topic: string) => void;
  isLoading: boolean;
  error: string | null;
}

const InitialSetup: React.FC<InitialSetupProps> = ({ onInitialize, isLoading, error }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onInitialize(topic);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Welcome, Agent Architect!</h1>
        <p className="mt-2 text-gray-300">What is the mission for your new AI agent team?</p>
        <p className="text-sm text-gray-400">Describe the goal, and we'll generate an agenda to get you started.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="sr-only">
            Agent Team Mission
          </label>
          <textarea
            id="topic"
            name="topic"
            rows={4}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="e.g., 'An automated customer support team that can handle billing questions and technical support for a SaaS product.'"
            disabled={isLoading}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full flex justify-center items-center px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingIcon className="w-5 h-5 animate-spin" /> : 'Build My Agenda'}
          </button>
        </div>
      </form>
       {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
    </div>
  );
};

export default InitialSetup;