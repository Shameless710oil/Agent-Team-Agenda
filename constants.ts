
import { EmotionalTone } from './types';

export const EMOTIONAL_MESSAGES: Record<EmotionalTone, string[]> = {
  [EmotionalTone.Excited]: [
    "Let's knock out a task! I feel great.",
    "Ready to build! What's first on the list?",
    "Yes! You fixed me up! I feel brand new!",
  ],
  [EmotionalTone.Calm]: [
    "Ready when you are. Let's tackle that list.",
    "One task at a time. We can do this.",
    "Making steady progress. Keep it up!",
  ],
  [EmotionalTone.Worried]: [
    "I think a bolt came loose… could you check a task?",
    "Are we forgetting something? I'm feeling a bit shaky.",
    "A little progress would really help me hold it together.",
  ],
  [EmotionalTone.Sad]: [
    "My arm… it fell off again… help?",
    "I'm not feeling so good. A completed task might help.",
    "Feeling a bit rusty today.",
  ],
  [EmotionalTone.Stressed]: [
    "My circuits are frazzled! There's so much to do!",
    "Systems critical! We need to complete a task, stat!",
    "*Static noise* I'm falling apart!",
  ],
};

export const APP_STATE_KEY = 'agentTeamAgendaState';