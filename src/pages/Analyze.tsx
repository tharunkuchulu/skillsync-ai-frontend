
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Star, 
  TrendingUp, 
  Download, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const file = location.state?.file;

  useEffect(() => {
    if (!file) {
      navigate('/dashboard');
      return;
    }

    // Simulate AI analysis
    const analyzeResume = async () => {
      setIsAnalyzing(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis data
      const mockData = {
        fileName: file.name,
        uploadedAt: new Date().toLocaleString(),
        jobFitScore: 87,
        skills: [
          { name: "JavaScript", level: "Expert", match: true },
          { name: "React", level: "Expert", match: true },
          { name: "Node.js", level: "Advanced", match: true },
          { name: "Python", level: "Intermediate", match: false },
          { name: "TypeScript", level: "Advanced", match: true },
          { name: "AWS", level: "Intermediate", match: false },
        ],
        summary: "Experienced software developer with strong frontend skills and full-stack capabilities. Demonstrates expertise in modern web technologies and has a solid foundation in software engineering principles.",
        strengths: [
          "Strong React and JavaScript expertise",
          "Full-stack development experience",
          "Good understanding of modern web practices",
          "Experience with version control systems"
        ],
        suggestions: [
          "Consider gaining cloud platform experience (AWS/Azure)",
          "Strengthen backend development skills",
          "Add experience with containerization (Docker)",
          "Include mobile development experience"
        ],
        experience: "5+ years",
        education: "Bachelor's in Computer Science",
        certifications: ["AWS Cloud Practitioner", "Google Analytics"]
      };
      
      setAnalysisData(mockData);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: `${file.name} has been analyzed successfully.`,
      });
    };

    analyzeResume();
  }, [file, navigate, toast]);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Reanalysis complete!",
        description: "Resume has been reanalyzed with updated insights.",
      });
    }, 2000);
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "Analysis report will be downloaded shortly.",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "CSV Export", 
      description: "Data has been exported to CSV format.",
    });
  };

  if (!file) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">SkillSync AI</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-white font-medium">Resume Analysis</div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReanalyze}
                disabled={isAnalyzing}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Reanalyze
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAnalyzing ? (
          // Loading State
          <div className="space-y-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Analyzing Resume</h2>
                  <p className="text-gray-400">Our AI is processing {file.name}...</p>
                  <div className="max-w-md mx-auto">
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Analysis Results
          <div className="space-y-6">
            {/* File Info & Score */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-black/20 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-purple-400" />
                    <div>
                      <CardTitle className="text-white">{analysisData?.fileName}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Analyzed on {analysisData?.uploadedAt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-300 mb-2">Summary</p>
                      <p className="text-gray-400 leading-relaxed">{analysisData?.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    Job Fit Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                      {analysisData?.jobFitScore}%
                    </div>
                    <Progress value={analysisData?.jobFitScore} className="h-3" />
                    <p className="text-gray-400 text-sm">
                      {analysisData?.jobFitScore >= 80 ? "Excellent match!" : 
                       analysisData?.jobFitScore >= 60 ? "Good match" : "Needs improvement"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Analysis */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Skills Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Extracted skills and their relevance to job requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analysisData?.skills.map((skill: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-purple-500/10">
                      <div className="flex items-center space-x-2">
                        {skill.match ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                        )}
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <Badge variant={skill.match ? "default" : "secondary"} className="text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Suggestions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisData?.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="w-5 h-5 text-orange-400 mr-2" />
                    Suggestions for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisData?.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 text-blue-400 mr-2" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-400">{analysisData?.experience}</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 text-purple-400 mr-2" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-400 font-medium">{analysisData?.education}</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleExportPDF}
                    variant="outline" 
                    size="sm" 
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF Report
                  </Button>
                  <Button 
                    onClick={handleExportCSV}
                    variant="outline" 
                    size="sm" 
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    CSV Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
