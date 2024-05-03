export interface Experiment {
  name: string;
  type: string;
  enabled: boolean;
  project: string;
  stale: boolean;
  strategies: Strategy[];
  variants: any[];
  description: string | null;
  impressionData: boolean;
}

export interface Strategy {
  name: string;
  constraints: any[];
  parameters: {
    groupId: string;
    rollout: string;
    stickiness: string;
  };
  variants: any[];
}
