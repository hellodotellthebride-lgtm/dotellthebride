import { randomUUID } from 'crypto';

type ResetPayload = {
  email: string;
  detectedStage:
    | 'beginning'
    | 'earlyDecisions'
    | 'dreamTeam'
    | 'guestsInvites'
    | 'weddingStyle'
    | 'finalDetails'
    | 'weddingWeek'
    | 'wrapUp';
  q1WhereAreYou: string;
  q2HardestPart: string;
  createdAt: string;
};

const signupStore = new Map<string, { email: string; createdAt: string }>();
const resetStore = new Map<string, ResetPayload>();

const makeId = () => {
  try {
    return randomUUID();
  } catch {
    return `reset_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }
};

export const storeSignup = (email: string) => {
  signupStore.set(email, { email, createdAt: new Date().toISOString() });
};

export const storeReset = (payload: ResetPayload) => {
  const resetId = makeId();
  resetStore.set(resetId, payload);
  return resetId;
};
