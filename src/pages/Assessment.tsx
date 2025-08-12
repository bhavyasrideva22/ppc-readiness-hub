import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';
import { assessmentQuestions, sectionInfo } from '@/data/questions';
import { calculateAssessmentResults } from '@/utils/assessmentEngine';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/ui/enhanced-button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    startTime: Date.now(),
    sectionStartTime: Date.now(),
    isComplete: false
  });

  const currentQuestion = assessmentQuestions[assessmentState.currentQuestion];
  const isLastQuestion = assessmentState.currentQuestion === assessmentQuestions.length - 1;
  const currentResponse = assessmentState.responses.find(r => r.questionId === currentQuestion?.id);
  
  // Calculate section progress
  const sectionsProgress = sectionInfo.map((section, index) => {
    const sectionQuestions = assessmentQuestions.filter(q => {
      if (index === 0) return q.category === 'psychometric';
      if (index === 1) return q.category === 'technical';
      if (index === 2) return q.category === 'wiscar';
      return false;
    });
    
    const answeredInSection = assessmentState.responses.filter(r => 
      sectionQuestions.some(q => q.id === r.questionId)
    ).length;
    
    return {
      ...section,
      answered: answeredInSection,
      total: sectionQuestions.length
    };
  });

  const handleAnswer = (answer: number | string) => {
    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: Date.now() - assessmentState.sectionStartTime
    };

    setAssessmentState(prev => ({
      ...prev,
      responses: prev.responses.filter(r => r.questionId !== currentQuestion.id).concat(response)
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Complete assessment
      const results = calculateAssessmentResults(assessmentState.responses);
      setAssessmentState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));
      navigate('/results', { state: { results } });
    } else {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        sectionStartTime: Date.now()
      }));
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        sectionStartTime: Date.now()
      }));
    }
  };

  useEffect(() => {
    // Update current section based on question
    const newSection = currentQuestion?.category === 'psychometric' ? 0 :
                      currentQuestion?.category === 'technical' ? 1 : 2;
    
    if (newSection !== assessmentState.currentSection) {
      setAssessmentState(prev => ({
        ...prev,
        currentSection: newSection,
        sectionStartTime: Date.now()
      }));
    }
  }, [assessmentState.currentQuestion, currentQuestion, assessmentState.currentSection]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading Assessment...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            PPC/SEM Specialist Assessment
          </h1>
          <p className="text-muted-foreground">
            {sectionInfo[assessmentState.currentSection]?.title}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {sectionsProgress.map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-smooth ${
                  index === assessmentState.currentSection
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : index < assessmentState.currentSection
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-card'
                }`}
              >
                <ProgressBar
                  current={section.answered}
                  total={section.total}
                  sectionName={section.title}
                />
              </div>
            ))}
          </div>
          
          <ProgressBar
            current={assessmentState.currentQuestion + 1}
            total={assessmentQuestions.length}
            sectionName="Overall Progress"
            className="max-w-md mx-auto"
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={assessmentState.currentQuestion + 1}
            totalQuestions={assessmentQuestions.length}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={assessmentState.currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>
          
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!currentResponse}
            className="flex items-center gap-2"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}