export interface PromptPart {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  example: string;
}

export interface FrameworkStep {
  letter: string;
  name: string;
  description: string;
  color: string;
}

export interface FrameworkTemplate {
  title: string;
  description: string;
  icon?: any;
  prompt: string;
}

export interface FrameworkData {
  id: string;
  name: string;
  fullName: string;
  description: string;
  bestFor: string;
  steps: FrameworkStep[];
  fullExample: string;
  templates: FrameworkTemplate[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}