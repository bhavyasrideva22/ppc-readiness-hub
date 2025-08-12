import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy analyzing data to find patterns and insights that can improve business outcomes.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find digital advertising campaigns and their optimization fascinating.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I prefer working with numbers and metrics rather than creative design work.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  
  // Psychometric Section - Personality
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I am very organized and pay attention to small details.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I persist with tasks even when they become challenging or repetitive.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'psych_6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I am motivated by seeing measurable results from my work.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },

  // Technical Section - Logical Reasoning
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'logical-reasoning',
    question: 'You notice your PPC campaign has a high click-through rate but low conversions. What should be your first priority?',
    options: [
      'Increase the budget to get more clicks',
      'Review and optimize the landing page experience',
      'Change the ad copy completely',
      'Pause the campaign immediately'
    ],
    correctAnswer: 1
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'logical-reasoning',
    question: 'If Campaign A has a 2% CTR with 1000 impressions and Campaign B has a 1.5% CTR with 2000 impressions, which generated more clicks?',
    options: [
      'Campaign A (20 clicks)',
      'Campaign B (30 clicks)',
      'Both generated the same',
      'Cannot determine without more data'
    ],
    correctAnswer: 1
  },

  // Technical Section - Numerical Ability
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'numerical',
    question: 'If your cost per click is $2.50 and you have 40 clicks, with 4 conversions, what is your cost per acquisition?',
    options: [
      '$10.00',
      '$25.00',
      '$40.00',
      '$100.00'
    ],
    correctAnswer: 1
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'numerical',
    question: 'You have a $1000 daily budget. If 60% goes to Search campaigns and 40% to Display, how much is allocated to Display campaigns?',
    options: [
      '$600',
      '$400',
      '$300',
      '$700'
    ],
    correctAnswer: 1
  },

  // Technical Section - Domain Knowledge
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain-knowledge',
    question: 'What does "Quality Score" primarily measure in Google Ads?',
    options: [
      'How much you are willing to pay per click',
      'The relevance and quality of your ads, keywords, and landing pages',
      'The number of conversions your ad generates',
      'The total budget allocated to your campaign'
    ],
    correctAnswer: 1
  },
  {
    id: 'tech_6',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain-knowledge',
    question: 'Which keyword match type provides the most control over which searches trigger your ads?',
    options: [
      'Broad match',
      'Phrase match',
      'Exact match',
      'Broad match modifier'
    ],
    correctAnswer: 2
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    question: 'How would you handle a situation where your PPC campaigns are underperforming for several weeks?',
    scenario: 'You\'ve been managing PPC campaigns for a client, but for the past 3 weeks, the campaigns have consistently underperformed. The client is getting concerned and you need to turn things around.',
    options: [
      'Immediately pause all campaigns and start over',
      'Conduct systematic A/B tests and analyze data to identify issues',
      'Increase budgets hoping for better performance',
      'Blame external factors and wait for improvements'
    ],
    correctAnswer: 1
  },
  {
    id: 'wiscar_2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I would be excited to learn about new PPC platforms and advertising features as they are released.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'wiscar_3',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'A client wants to expand their campaigns to new geographic markets. What is your approach?',
    scenario: 'Your client, currently successful in the US market, wants to expand their PPC campaigns to target customers in Canada and the UK.',
    options: [
      'Copy existing campaigns and change the location targeting',
      'Research market differences, local competition, and adjust strategies accordingly',
      'Start with small budgets and see what happens',
      'Advise against expansion due to complexity'
    ],
    correctAnswer: 1
  },
  {
    id: 'wiscar_4',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'When optimizing campaigns, what is the most logical sequence of actions?',
    options: [
      'Increase budgets → Change ad copy → Adjust bids → Analyze results',
      'Analyze current performance → Identify issues → Test solutions → Measure results',
      'Change everything at once → Monitor for improvements',
      'Focus only on the highest spending campaigns'
    ],
    correctAnswer: 1
  },
  {
    id: 'wiscar_5',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I actively seek feedback on my work and use it to improve my performance.',
    likertLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'wiscar_6',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'real-world',
    question: 'How would you communicate campaign performance to a non-technical client?',
    scenario: 'You need to present monthly PPC results to a business owner who has limited technical knowledge about digital marketing.',
    options: [
      'Show all the technical metrics and data tables',
      'Focus on business outcomes like leads, sales, and ROI with clear visualizations',
      'Only report on impressions and clicks',
      'Send a brief email with basic numbers'
    ],
    correctAnswer: 1
  }
];

export const sectionInfo = [
  {
    title: 'Psychometric Assessment',
    description: 'Evaluating your personality fit, interests, and motivation for PPC/SEM roles',
    duration: '8-10 minutes',
    questions: assessmentQuestions.filter(q => q.category === 'psychometric').length
  },
  {
    title: 'Technical & Aptitude',
    description: 'Testing your logical reasoning, numerical skills, and basic PPC knowledge',
    duration: '10-12 minutes', 
    questions: assessmentQuestions.filter(q => q.category === 'technical').length
  },
  {
    title: 'WISCAR Framework',
    description: 'Comprehensive evaluation across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment',
    duration: '8-10 minutes',
    questions: assessmentQuestions.filter(q => q.category === 'wiscar').length
  }
];