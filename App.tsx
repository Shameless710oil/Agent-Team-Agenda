
import React from 'react';
import useAppState from './hooks/useAppState';
import InitialSetup from './components/InitialSetup';
import Header from './components/Header';
import BotDisplay from './components/BotDisplay';
import TaskList from './components/TaskList';
import { LoadingIcon } from './components/Icons';

const App: React.FC = () => {
  const {
    state,
    initializeProject,
    addTask,
    toggleTask,
    deleteTask
  } = useAppState();

  if (!state.isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <InitialSetup onInitialize={initializeProject} isLoading={state.isLoading} error={state.error} />
      </div>
    );
  }

  if (state.isLoading && state.tasks.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <LoadingIcon className="w-16 h-16 animate-spin text-indigo-400" />
          <p className="mt-4 text-lg">Generating your agent agenda...</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header botState={state.botState} />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl p-6 min-h-[400px] shadow-lg border border-gray-700">
            <BotDisplay stage={state.botState.stage} rewardTrigger={state.botState.lastRewardAt} />
          </div>
          <div>
            <TaskList
              tasks={state.tasks}
              overview={state.overview}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;