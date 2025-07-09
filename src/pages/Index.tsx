import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, User, FileText, Search, BarChart3, Upload, Download, Shield, Clock, Target, Award, Users, CheckCircle, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "AI Resume Parsing",
      description: "Advanced NLP extracts skills, experiences, and insights from any resume format with 95% accuracy."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Job Matching",
      description: "Compare candidates with job descriptions from manual upload or LinkedIn/Indeed links."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Job Fit Scoring",
      description: "Get instant compatibility scores and detailed skill gap analysis for every candidate."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Resume Versioning",
      description: "Track resume history, filter by criteria, and maintain organized candidate records."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export & Reports",
      description: "Generate PDF reports and export data to CSV for seamless workflow integration."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bias-Free Assessment",
      description: "Ensure fair, compliant evaluations with our bias-mitigated AI algorithms."
    }
  ];

  const process = [
    {
      step: "1",
      title: "Upload Resume",
      description: "Upload candidate resumes in any format. Our AI instantly parses and extracts key information."
    },
    {
      step: "2",
      title: "Add Job Description",
      description: "Input job requirements manually or import directly from LinkedIn and Indeed job postings."
    },
    {
      step: "3",
      title: "Get Insights",
      description: "Receive instant fit scores, skill gap analysis, and actionable hiring recommendations."
    }
  ];

  const stats = [
    { value: "95%", label: "Parsing Accuracy" },
    { value: "10x", label: "Faster Screening" },
    { value: "50K+", label: "Resumes Analyzed" },
    { value: "98%", label: "Customer Satisfaction" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SkillSync AI
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">Features</a>
              <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">How It Works</a>
              <a href="#about" onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Sync Skills with
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Perfect Matches
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  AI-powered resume analysis that matches candidates with job requirements. Get instant fit scores, skill gap analysis, and actionable hiring insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <Shield className="w-5 h-5" />
                  <span>Your Privacy is Our Priority</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>100% Free to Use</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <span className="text-gray-300">Resume Analysis</span>
                    <span className="text-green-400 font-semibold">95% Match</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-400">10x</div>
                      <div className="text-gray-400 text-sm">Faster Screening</div>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-400">50K+</div>
                      <div className="text-gray-400 text-sm">Resumes Analyzed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your hiring process with intelligent resume parsing, skill matching, and comprehensive candidate analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How SkillSync AI Works
            </h2>
            <p className="text-xl text-gray-300">
              Simple 3-step process to revolutionize your hiring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of recruiters using SkillSync AI to make better hiring decisions faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-black/30 border-t border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">SkillSync AI</span>
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Syncing candidate skills with job requirements through AI-powered analysis.
              </p>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com/tharunkuchulu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tharun-vankayala/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" onClick={() => scrollToSection('features')} className="hover:text-purple-400 transition-colors cursor-pointer">Features</a></li>
                <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link></li>
                <li><Link to="/analyze" className="hover:text-purple-400 transition-colors">Analysis</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors cursor-pointer">About</a></li>
                <li><a href="#how-it-works" onClick={() => scrollToSection('how-it-works')} className="hover:text-purple-400 transition-colors cursor-pointer">How It Works</a></li>
                <li><Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 SkillSync AI. All rights reserved.</p>
            <p className="text-gray-400 mt-2 md:mt-0">
              Built by <span className="text-purple-400">Tharun Vankayala</span> • Powered by FastAPI + React + OpenRouter AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
