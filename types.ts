export interface Task {
  id: string;
  text: string;
  instructions: string;
  isCompleted: boolean;
  createdAt: string; // ISO string
  completedAt?: string; // ISO string
}

export enum BotBuildStage {
  Box = 'BOX',
  Parts = 'PARTS',
  PartialAssembly = 'PARTIAL_ASSEMBLY',
  NearlyComplete = 'NEARLY_COMPLETE',
  FullyBuilt = 'FULLY_BUILT',
}

export enum BotDecayStage {
  Healthy = 'HEALTHY',
  LooseScrews = 'LOOSE_SCREWS',
  CrackedVisor = 'CRACKED_VISOR',
  FlickeringLights = 'FLICKERING_LIGHTS',
  MissingArm = 'MISSING_ARM',
  Smoking = 'SMOKING',
  Collapsed = 'COLLAPSED',
}

export type BotStage = BotBuildStage | BotDecayStage;

export enum EmotionalTone {
  Excited = 'EXCITED',
  Calm = 'CALM',
  Worried = 'WORRIED',
  Sad = 'SAD',
  Stressed = 'STRESSED',
}

export interface BotState {
  health: number; // 0-100
  buildProgress: number; // 0-100
  stage: BotStage;
  tone: EmotionalTone;
  message: string;
  lastRewardAt?: string; // ISO string to trigger reward animations
}

export interface UserState {
  lastOpenedAt: string; // ISO string
  consecutiveDaysOpened: number;
}

export interface AppState {
  tasks: Task[];
  botState: BotState;
  userState: UserState;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  overview: string;
}