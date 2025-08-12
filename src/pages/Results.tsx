import { useLocation, useNavigate } from 'react-router-dom';
import { AssessmentResults } from '@/types/assessment';
import { RadarChart } from '@/components/RadarChart';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, Download, Share2, RotateCcw } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as AssessmentResults;

  if (!results) {
    navigate('/');
    return null;
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="text-accent" size={24} />;
      case 'maybe':
        return <AlertCircle className="text-warning" size={24} />;
      case 'no':
        return <XCircle className="text-destructive" size={24} />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'bg-accent text-accent-foreground';
      case 'maybe':
        return 'bg-warning text-warning-foreground';
      case 'no':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended';
      case 'maybe':
        return 'Conditionally Recommended';
      case 'no':
        return 'Not Recommended';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your PPC/SEM Assessment Results
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            {getRecommendationIcon()}
            <Badge className={`text-lg px-4 py-2 ${getRecommendationColor()}`}>
              {getRecommendationText()}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's your comprehensive analysis and personalized career guidance
          </p>
        </div>

        {/* Overall Score */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-gradient-card border-primary/20 shadow-medium">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Overall Assessment Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl font-bold text-primary">
                  {results.overallScore}
                </div>
                <div className="text-2xl text-muted-foreground ml-2">/100</div>
              </div>
              <Progress value={results.overallScore} className="h-3 mb-4" />
              <p className="text-center text-muted-foreground">
                {results.feedback}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Scores */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scores Breakdown */}
            <div className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Psychometric Fit</span>
                      <span className="text-primary font-bold">{results.psychometricScore}%</span>
                    </div>
                    <Progress value={results.psychometricScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Technical Readiness</span>
                      <span className="text-primary font-bold">{results.technicalScore}%</span>
                    </div>
                    <Progress value={results.technicalScore} className="h-2" />
                  </div>
                  
                  {Object.entries(results.wiscarScores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground capitalize">
                          {key === 'realWorld' ? 'Real World' : key}
                        </span>
                        <span className="text-primary font-bold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* WISCAR Radar Chart */}
            <div className="flex items-center justify-center">
              <Card className="shadow-medium w-fit">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground text-center">
                    WISCAR Framework Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <RadarChart data={results.wiscarScores} size={350} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Action Plan</h3>
                  <ul className="space-y-2">
                    {results.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Career Paths</h3>
                  <div className="space-y-2">
                    {results.careerPaths.map((path, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {path}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          <Button variant="hero" size="lg" className="flex items-center gap-2">
            <Download size={18} />
            Download Report
          </Button>
          
          <Button variant="secondary" size="lg" className="flex items-center gap-2">
            <Share2 size={18} />
            Share Results
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Take Again
          </Button>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Want to Learn More?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ready to start your PPC/SEM journey? Explore our comprehensive learning resources and certification programs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="assessment">View Courses</Button>
                <Button variant="assessment">Find Mentors</Button>
                <Button variant="assessment">Join Community</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}