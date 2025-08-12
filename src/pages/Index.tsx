import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Brain,
  Target,
  BarChart3,
  Lightbulb,
  Award
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const features = [
    {
      icon: Brain,
      title: 'Psychometric Analysis',
      description: 'Evaluate personality fit and motivation using validated psychological frameworks'
    },
    {
      icon: BarChart3,
      title: 'Technical Aptitude',
      description: 'Test logical reasoning, numerical skills, and PPC-specific knowledge'
    },
    {
      icon: Target,
      title: 'WISCAR Framework',
      description: 'Comprehensive evaluation across Will, Interest, Skill, Cognitive ability, and more'
    },
    {
      icon: Lightbulb,
      title: 'Personalized Insights',
      description: 'Get tailored feedback and career guidance based on your unique profile'
    }
  ];

  const careers = [
    'PPC Specialist',
    'SEM Analyst', 
    'Digital Campaign Manager',
    'Paid Media Strategist',
    'Performance Marketing Specialist'
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Assessments Completed' },
    { icon: TrendingUp, value: '85%', label: 'Career Match Accuracy' },
    { icon: Clock, value: '20-30', label: 'Minutes Duration' },
    { icon: Award, value: '95%', label: 'User Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            Professional Career Assessment
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Should I Learn
            <br />
            <span className="bg-gradient-to-r from-secondary to-primary-glow bg-clip-text text-transparent">
              PPC/SEM Specialist?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Discover if a career in Pay-Per-Click and Search Engine Marketing aligns with your 
            personality, skills, and career goals through our comprehensive assessment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartAssessment}
              className="animate-bounce"
            >
              <Play size={20} className="mr-2" />
              Start Assessment
            </Button>
            
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Clock size={16} />
              <span className="text-sm">20-30 minutes • Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You'll Discover
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions to give you 
              a complete picture of your PPC/SEM career potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-medium hover:shadow-strong transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <feature.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Career Opportunities
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            PPC/SEM specialists are in high demand across various industries. 
            Discover the career paths that could be your perfect fit.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {careers.map((career, index) => (
              <Badge key={index} variant="outline" className="text-lg px-4 py-2">
                {career}
              </Badge>
            ))}
          </div>
          
          <Button variant="hero" size="lg" onClick={handleStartAssessment}>
            Discover Your Path
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-backed assessment process provides accurate, 
              actionable insights about your PPC/SEM career potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Complete Assessment',
                description: 'Answer questions about your interests, personality, and technical aptitude'
              },
              {
                step: '2', 
                title: 'Get Analysis',
                description: 'Receive detailed scoring across multiple career-relevant dimensions'
              },
              {
                step: '3',
                title: 'Follow Guidance',
                description: 'Get personalized recommendations and next steps for your career journey'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Discover Your Future?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards a rewarding career in PPC/SEM. 
            Our assessment is free, comprehensive, and takes just 20-30 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartAssessment}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Play size={20} className="mr-2" />
              Start Your Assessment Now
            </Button>
            
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <CheckCircle size={16} />
              <span className="text-sm">No registration required</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}