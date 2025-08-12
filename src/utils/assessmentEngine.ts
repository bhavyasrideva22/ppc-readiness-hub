import { AssessmentResponse, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export function calculateAssessmentResults(responses: AssessmentResponse[]): AssessmentResults {
  // Get responses by category
  const psychometricResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'psychometric';
  });
  
  const technicalResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'technical';
  });
  
  const wiscarResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'wiscar';
  });

  // Calculate psychometric score (interest + personality + motivation)
  const psychometricScore = calculatePsychometricScore(psychometricResponses);
  
  // Calculate technical score (correct answers percentage)
  const technicalScore = calculateTechnicalScore(technicalResponses);
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(wiscarResponses);
  
  // Calculate overall score
  const overallScore = Math.round(
    (psychometricScore * 0.3) + 
    (technicalScore * 0.4) + 
    (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.3)
  );

  // Generate recommendation
  const recommendation = generateRecommendation(overallScore, psychometricScore, technicalScore);
  
  // Generate feedback and next steps
  const { feedback, nextSteps, careerPaths } = generatePersonalizedAdvice(
    overallScore, 
    psychometricScore, 
    technicalScore, 
    wiscarScores,
    recommendation
  );

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    feedback,
    nextSteps,
    careerPaths
  };
}

function calculatePsychometricScore(responses: AssessmentResponse[]): number {
  if (responses.length === 0) return 0;
  
  const sum = responses.reduce((total, response) => {
    return total + (typeof response.answer === 'number' ? response.answer : 0);
  }, 0);
  
  // Convert to 0-100 scale (assuming 1-5 Likert scale)
  return Math.round((sum / (responses.length * 5)) * 100);
}

function calculateTechnicalScore(responses: AssessmentResponse[]): number {
  if (responses.length === 0) return 0;
  
  let correctAnswers = 0;
  
  responses.forEach(response => {
    const question = assessmentQuestions.find(q => q.id === response.questionId);
    if (question?.correctAnswer !== undefined && question.correctAnswer === response.answer) {
      correctAnswers++;
    }
  });
  
  return Math.round((correctAnswers / responses.length) * 100);
}

function calculateWiscarScores(responses: AssessmentResponse[]): {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
} {
  const scoresBySubcategory: Record<string, number[]> = {};
  
  responses.forEach(response => {
    const question = assessmentQuestions.find(q => q.id === response.questionId);
    if (!question) return;
    
    const subcategory = question.subcategory;
    if (!scoresBySubcategory[subcategory]) {
      scoresBySubcategory[subcategory] = [];
    }
    
    // For multiple choice, convert correct/incorrect to score
    let score = 0;
    if (question.type === 'multiple-choice' || question.type === 'scenario') {
      score = question.correctAnswer === response.answer ? 5 : 1;
    } else if (question.type === 'likert') {
      score = typeof response.answer === 'number' ? response.answer : 0;
    }
    
    scoresBySubcategory[subcategory].push(score);
  });
  
  // Calculate average for each subcategory and convert to 0-100 scale
  const calculateAverage = (scores: number[]) => {
    if (scores.length === 0) return 0;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round((avg / 5) * 100);
  };
  
  return {
    will: calculateAverage(scoresBySubcategory.will || []),
    interest: calculateAverage(scoresBySubcategory.interest || []),
    skill: calculateAverage(scoresBySubcategory.skill || []),
    cognitive: calculateAverage([...(scoresBySubcategory['logical-reasoning'] || []), ...(scoresBySubcategory.cognitive || [])]),
    ability: calculateAverage(scoresBySubcategory.ability || []),
    realWorld: calculateAverage(scoresBySubcategory['real-world'] || [])
  };
}

function generateRecommendation(overall: number, psychometric: number, technical: number): 'yes' | 'no' | 'maybe' {
  if (overall >= 75 && psychometric >= 70 && technical >= 60) {
    return 'yes';
  } else if (overall >= 60 && (psychometric >= 60 || technical >= 70)) {
    return 'maybe';
  } else {
    return 'no';
  }
}

function generatePersonalizedAdvice(
  overall: number,
  psychometric: number,
  technical: number,
  wiscar: any,
  recommendation: 'yes' | 'no' | 'maybe'
): { feedback: string; nextSteps: string[]; careerPaths: string[] } {
  
  let feedback = '';
  let nextSteps: string[] = [];
  let careerPaths: string[] = [];

  if (recommendation === 'yes') {
    feedback = `Excellent! Your assessment shows strong alignment with PPC/SEM specialist roles. Your analytical mindset (${psychometric}% psychometric fit) and technical aptitude (${technical}% technical score) indicate you have the right foundation for success in this field.`;
    
    nextSteps = [
      'Enroll in Google Ads certification courses',
      'Practice with Google Ads demo accounts',
      'Study bid management and keyword research strategies',
      'Build a portfolio with sample campaigns',
      'Network with digital marketing professionals'
    ];
    
    careerPaths = [
      'PPC Specialist',
      'SEM Analyst', 
      'Digital Campaign Manager',
      'Paid Media Strategist',
      'Performance Marketing Specialist'
    ];
  } else if (recommendation === 'maybe') {
    feedback = `You show potential for PPC/SEM roles, but there are areas for development. ${psychometric < 60 ? 'Consider building stronger analytical habits and attention to detail. ' : ''}${technical < 60 ? 'Focus on strengthening your technical and numerical skills. ' : ''}With dedicated learning, you could succeed in this field.`;
    
    nextSteps = [
      'Take foundational digital marketing courses',
      'Practice mathematical and analytical skills',
      'Start with Google Analytics certification',
      'Volunteer to manage small advertising campaigns',
      'Shadow experienced PPC professionals'
    ];
    
    careerPaths = [
      'Junior PPC Analyst',
      'Digital Marketing Assistant',
      'Marketing Data Coordinator',
      'Entry-level Campaign Specialist'
    ];
  } else {
    feedback = `Based on your assessment results, PPC/SEM might not be the ideal fit for your current skill set and interests. However, there are related marketing roles that might better align with your strengths.`;
    
    nextSteps = [
      'Explore SEO and content marketing opportunities',
      'Consider social media marketing roles',
      'Look into marketing analytics positions',
      'Develop general digital marketing knowledge',
      'Identify your core interests and strengths'
    ];
    
    careerPaths = [
      'SEO Specialist',
      'Content Marketing Coordinator',
      'Social Media Manager',
      'Marketing Analytics Associate',
      'Digital Marketing Generalist'
    ];
  }

  return { feedback, nextSteps, careerPaths };
}