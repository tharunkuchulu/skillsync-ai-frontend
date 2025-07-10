
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Download,
  Target,
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";

const MatchAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleGenerateMatch = async () => {
    if (!selectedResume || !selectedJD) {
      toast({
        title: "Selection required",
        description: "Please select both a resume and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate match generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result
    const mockResult = {
      matchScore: 87,
      candidateName: selectedResume.split(' - ')[0],
      jobTitle: selectedJD.split(' - ')[1],
      company: selectedJD.split(' - ')[0],
      matchingSkills: ["JavaScript", "React", "Node.js", "AWS", "MongoDB"],
      missingSkills: ["Docker", "Kubernetes", "GraphQL"],
      strengths: [
        "Strong expertise in modern JavaScript frameworks",
        "Full-stack development experience",
        "Good understanding of software architecture"
      ],
      recommendations: [
        "Consider gaining AWS certification",
        "Learn Docker and Kubernetes",
        "Explore GraphQL as alternative to REST"
      ]
    };

    setAnalysisResult(mockResult);
    setIsGenerating(false);
    
    toast({
      title: "Match analysis complete!",
      description: "Detailed compatibility analysis has been generated.",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: `${format} Export`,
      description: `Match analysis will be downloaded as ${format}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('CSV')}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('PDF')}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Match Analysis</h1>
          <p className="text-gray-400">Compare candidate resumes with job descriptions to get detailed matching analysis and fit scores.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Selection Panel */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                Select Items to Match
              </CardTitle>
              <CardDescription className="text-gray-400">
                Choose a resume and job description for comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Select Resume</label>
                <Select value={selectedResume} onValueChange={setSelectedResume}>
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white hover:bg-black/30">
                    <SelectValue placeholder="Choose a resume" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-purple-500/30 text-white">
                    <SelectItem value="John Doe - Software Engineer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">John Doe - Software Engineer</SelectItem>
                    <SelectItem value="Jane Smith - Frontend Developer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">Jane Smith - Frontend Developer</SelectItem>
                    <SelectItem value="Mike Johnson - Full Stack Developer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">Mike Johnson - Full Stack Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Select Job Description</label>
                <Select value={selectedJD} onValueChange={setSelectedJD}>
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white hover:bg-black/30">
                    <SelectValue placeholder="Choose a job description" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-purple-500/30 text-white">
                    <SelectItem value="TechCorp - Senior Frontend Developer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">TechCorp - Senior Frontend Developer</SelectItem>
                    <SelectItem value="StartupXYZ - Full Stack Developer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">StartupXYZ - Full Stack Developer</SelectItem>
                    <SelectItem value="BigTech Inc - React Developer" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">BigTech Inc - React Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateMatch}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Target className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating Match..." : "Generate Match"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-8">
              {!analysisResult ? (
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-12 h-12 text-cyan-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Match Analysis Yet</h3>
                    <p className="text-gray-400">
                      Select a resume and job description, then click "Generate Match" to see detailed compatibility analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-green-500"
                        style={{
                          background: `conic-gradient(#10b981 ${analysisResult.matchScore * 3.6}deg, transparent 0deg)`,
                          clipPath: 'circle(50%)',
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-400">{analysisResult.matchScore}%</div>
                          <div className="text-sm text-gray-400">Match Score</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{analysisResult.candidateName}</h3>
                    <p className="text-gray-400">{analysisResult.jobTitle} at {analysisResult.company}</p>
                  </div>

                  {/* Skills Analysis */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Matching Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.matchingSkills.map((skill: string, index: number) => (
                          <Badge key={index} className="bg-green-500/20 text-green-400">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                        Missing Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingSkills.map((skill: string, index: number) => (
                          <Badge key={index} className="bg-red-500/20 text-red-400">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Recommendations */}
                  <div className="grid gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {analysisResult.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-300 text-sm">• {strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <Target className="w-4 h-4 text-purple-400 mr-2" />
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-gray-300 text-sm">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalysis;
