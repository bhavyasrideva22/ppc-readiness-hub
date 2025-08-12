import { useState } from 'react';
import { AssessmentQuestion } from '@/types/assessment';
import { Button } from '@/components/ui/enhanced-button';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (answer: number | string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);

  const handleAnswer = (answer: number | string) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const renderQuestionContent = () => {
    if (question.scenario) {
      return (
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm font-medium text-muted-foreground mb-2">Scenario:</p>
            <p className="text-foreground">{question.scenario}</p>
          </div>
          <p className="text-lg font-medium text-foreground">{question.question}</p>
        </div>
      );
    }
    
    return <p className="text-lg font-medium text-foreground">{question.question}</p>;
  };

  const renderAnswerOptions = () => {
    if (question.type === 'likert') {
      return (
        <div className="space-y-3">
          {question.likertLabels?.map((label, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index + 1)}
              className={cn(
                "w-full p-4 text-left rounded-lg border transition-smooth hover:shadow-medium",
                selectedAnswer === index + 1
                  ? "border-primary bg-primary/10 shadow-soft"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-smooth",
                  selectedAnswer === index + 1
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )}>
                  {selectedAnswer === index + 1 && (
                    <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                  )}
                </div>
                <span className="text-foreground">{label}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'multiple-choice' || question.type === 'scenario') {
      return (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={cn(
                "w-full p-4 text-left rounded-lg border transition-smooth hover:shadow-medium",
                selectedAnswer === index
                  ? "border-primary bg-primary/10 shadow-soft"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-6 h-6 rounded border-2 flex items-center justify-center transition-smooth",
                  selectedAnswer === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground"
                )}>
                  {selectedAnswer === index && (
                    <span className="text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                  )}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-card rounded-xl shadow-medium border border-border p-8 animate-fade-in">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground capitalize">
              {question.category} • {question.subcategory.replace('-', ' ')}
            </span>
          </div>
          {renderQuestionContent()}
        </div>
        
        {renderAnswerOptions()}
      </div>
    </div>
  );
}