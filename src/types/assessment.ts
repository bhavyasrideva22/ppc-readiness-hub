export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'numerical';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  correctAnswer?: number;
  scenario?: string;
  likertLabels?: string[];
}

export interface AssessmentResponse {
  questionId: string;
  answer: number | string;
  timeSpent: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  feedback: string;
  nextSteps: string[];
  careerPaths: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  startTime: number;
  sectionStartTime: number;
  isComplete: boolean;
  results?: AssessmentResults;
}