import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppState, Task, BotState, UserState, BotBuildStage, BotDecayStage, EmotionalTone, BotStage } from '../types';
import { generateChecklist } from '../services/geminiService';
import { EMOTIONAL_MESSAGES, APP_STATE_KEY } from '../constants';

const getInitialState = (): AppState => {
  const savedState = localStorage.getItem(APP_STATE_KEY);
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      // Ensure it's a valid state object before returning
      if (parsedState.tasks && parsedState.botState && parsedState.userState) {
         parsedState.botState = {
            lastRewardAt: undefined,
            ...parsedState.botState,
         };
         // Add overview if it's missing from old saved states
         if (!parsedState.overview) {
            parsedState.overview = '';
         }
         return parsedState;
      }
    } catch (error) {
      console.error("Failed to parse state from localStorage, resetting state.", error);
      localStorage.removeItem(APP_STATE_KEY); // Clear corrupted state
    }
  }

  // Return default state if nothing in localStorage or if parsing failed
  return {
    tasks: [],
    botState: {
      health: 50,
      buildProgress: 0,
      stage: BotBuildStage.Box,
      tone: EmotionalTone.Calm,
      message: "Let's get started on a new project!",
      lastRewardAt: undefined,
    },
    userState: {
      lastOpenedAt: new Date().toISOString(),
      consecutiveDaysOpened: 1,
    },
    isInitialized: false,
    isLoading: false,
    error: null,
    overview: '',
  };
};

const useAppState = () => {
  const [state, setState] = useState<AppState>(getInitialState);

  const updateState = useCallback((newState: Partial<AppState>) => {
    setState(prevState => {
      const mergedState = { ...prevState, ...newState };
      if (newState.botState) {
        mergedState.botState = { ...prevState.botState, ...newState.botState };
      }
      
      const { tasks, userState, botState: currentBotState } = mergedState;

      // --- Health & State Calculation ---
      const completedTasks = tasks.filter(t => t.isCompleted).length;
      const overdueTasks = tasks.filter(t => !t.isCompleted && (new Date().getTime() - new Date(t.createdAt).getTime()) > 2 * 24 * 60 * 60 * 1000).length;
      
      const today = new Date().toDateString();
      const lastOpened = new Date(userState.lastOpenedAt).toDateString();
      const daysSinceOpened = Math.floor((new Date().getTime() - new Date(userState.lastOpenedAt).getTime()) / (1000 * 3600 * 24));
      
      const consecutiveDays = today === lastOpened ? userState.consecutiveDaysOpened : (new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() === lastOpened ? userState.consecutiveDaysOpened + 1 : 1);
      
      const healthScore = Math.max(0, Math.min(100, 
        50 + (completedTasks * 3) + (consecutiveDays * 2) - (overdueTasks * 4) - (daysSinceOpened * 3)
      ));
      
      const buildProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

      let stage: BotStage = BotBuildStage.Box;
      let tone: EmotionalTone = EmotionalTone.Calm;

      if (buildProgress < 20) stage = BotBuildStage.Box;
      else if (buildProgress < 40) stage = BotBuildStage.Parts;
      else if (buildProgress < 70) stage = BotBuildStage.PartialAssembly;
      else if (buildProgress < 100) stage = BotBuildStage.NearlyComplete;
      else {
        stage = BotBuildStage.FullyBuilt;
        if (healthScore >= 90) { stage = BotDecayStage.Healthy; tone = EmotionalTone.Excited; }
        else if (healthScore >= 75) { stage = BotDecayStage.Healthy; tone = EmotionalTone.Calm; }
        else if (healthScore >= 60) { stage = BotDecayStage.LooseScrews; tone = EmotionalTone.Calm; }
        else if (healthScore >= 50) { stage = BotDecayStage.CrackedVisor; tone = EmotionalTone.Worried; }
        else if (healthScore >= 25) { stage = BotDecayStage.FlickeringLights; tone = EmotionalTone.Worried; }
        else if (healthScore >= 10) { stage = BotDecayStage.MissingArm; tone = EmotionalTone.Sad; }
        else if (healthScore > 0) { stage = BotDecayStage.Smoking; tone = EmotionalTone.Stressed; }
        else { stage = BotDecayStage.Collapsed; tone = EmotionalTone.Stressed; }
      }
      
      const messages = EMOTIONAL_MESSAGES[tone];
      const message = messages[Math.floor(Math.random() * messages.length)];
      
      const botState: BotState = { health: healthScore, buildProgress, stage, tone, message, lastRewardAt: currentBotState.lastRewardAt };
      const newUserState: UserState = { ...userState, consecutiveDaysOpened: consecutiveDays, lastOpenedAt: new Date().toISOString() };

      return { ...mergedState, botState, userState: newUserState };
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);
  
  useEffect(() => {
    const timer = setInterval(() => {
        updateState({}); // Recalculate state periodically for time-based decay
    }, 60000); // every minute
    
    // Initial calculation on load
    updateState({});
    
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeProject = useCallback(async (topic: string) => {
    updateState({ isLoading: true, error: null });
    try {
      const generatedData = await generateChecklist(topic);
      const newTasks: Task[] = generatedData.tasks.map(task => ({
        id: uuidv4(),
        text: task.text,
        instructions: task.instructions,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      }));
      updateState({ tasks: newTasks, overview: generatedData.overview, isInitialized: true, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An unknown error occurred';
      updateState({ isLoading: false, error });
    }
  }, [updateState]);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text,
      instructions: '',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    updateState({ tasks: [...state.tasks, newTask] });
  }, [state.tasks, updateState]);

  const toggleTask = useCallback((id: string) => {
    const taskWasIncomplete = state.tasks.find(t => t.id === id)?.isCompleted === false;

    const newTasks = state.tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted, completedAt: !task.isCompleted ? new Date().toISOString() : undefined } : task
    );
    
    if (taskWasIncomplete) {
        updateState({ tasks: newTasks, botState: { ...state.botState, lastRewardAt: new Date().toISOString() } });
    } else {
        updateState({ tasks: newTasks });
    }
  }, [state.tasks, state.botState, updateState]);

  const deleteTask = useCallback((id: string) => {
    const newTasks = state.tasks.filter(task => task.id !== id);
    updateState({ tasks: newTasks });
  }, [state.tasks, updateState]);

  return { state, initializeProject, addTask, toggleTask, deleteTask };
};

export default useAppState;