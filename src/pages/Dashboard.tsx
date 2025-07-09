
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import BulkResumeResults from "@/components/BulkResumeResults";
import { 
  Upload, 
  FileText, 
  Target, 
  BarChart3, 
  LogOut, 
  User,
  Brain,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Search,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [jdUploadProgress, setJdUploadProgress] = useState(0);
  const [showJdConfirm, setShowJdConfirm] = useState(false);
  const [selectedJdFile, setSelectedJdFile] = useState<File | null>(null);

  // Get user email on component mount
  useEffect(() => {
    // Get the actual user email from localStorage or use a default
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    setUserEmail(email);
  }, []);

  const handleLogoClick = () => {
    // Since user is logged in, redirect to home page
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Files uploaded successfully!",
            description: `${selectedFiles.length} resume(s) uploaded and ready for analysis.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleJDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedJdFile(file);
      setShowJdConfirm(true);
      // Simulate reading file content
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target?.result as string || "Job description content will appear here...");
      };
      reader.readAsText(file);
    }
  };

  const confirmJDUpload = () => {
    if (!selectedJdFile) return;
    
    setShowJdConfirm(false);
    setJdUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setJdUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Job description uploaded!",
            description: "JD has been processed and is ready for matching.",
          });
          setJdUploadProgress(0);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleBulkAnalysis = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload resumes first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results
    const mockResults = files.map((file, index) => ({
      id: `resume-${index}`,
      fileName: file.name,
      candidateName: `Candidate ${index + 1}`,
      jobFitScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
      matchingSkills: ["JavaScript", "React", "Node.js", "Python", "AWS"].slice(0, Math.floor(Math.random() * 3) + 2),
      missingSkills: ["Docker", "Kubernetes", "GraphQL"].slice(0, Math.floor(Math.random() * 2) + 1),
      experienceMatch: `${Math.floor(Math.random() * 5) + 3}+ years`,
      location: ["New York", "San Francisco", "Remote", "London"][Math.floor(Math.random() * 4)],
      yearsOfExperience: Math.floor(Math.random() * 8) + 2
    }));

    setBulkResults(mockResults.sort((a, b) => b.jobFitScore - a.jobFitScore));
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `${files.length} resumes analyzed and ranked by fit score.`,
    });
  };

  const handleSingleAnalysis = (file: File) => {
    navigate('/analyze', { state: { file } });
  };

  const handleViewDetails = (resumeId: string) => {
    toast({
      title: "View Details",
      description: "Opening detailed analysis view...",
    });
  };

  const handleDownload = (resumeId: string) => {
    toast({
      title: "Download Started",
      description: "Resume is being downloaded...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SkillSync AI</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{userEmail}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-black/20 border-purple-500/30 text-purple-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to SkillSync AI</h1>
          <p className="text-gray-400">Analyze resumes, match candidates, and make smarter hiring decisions with AI.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{files.length}</h3>
              <p className="text-gray-400 text-sm">Resumes Uploaded</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{bulkResults.length}</h3>
              <p className="text-gray-400 text-sm">Analyzed</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {bulkResults.length > 0 ? Math.max(...bulkResults.map(r => r.jobFitScore)) : 0}%
              </h3>
              <p className="text-gray-400 text-sm">Best Match</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mx-auto mb-3">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">2.3s</h3>
              <p className="text-gray-400 text-sm">Avg Analysis Time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Analysis Engine */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                Resume Analysis Engine
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload resumes for AI-powered analysis and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                <Upload className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-3">Drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button 
                    variant="outline" 
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 cursor-pointer"
                    asChild
                  >
                    <span>
                      <Plus className="w-4 h-4 mr-2" />
                      Browse Files
                    </span>
                  </Button>
                </label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Uploading...</span>
                    <span className="text-purple-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Uploaded Files ({files.length})</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-black/20 rounded text-sm">
                        <span className="text-gray-300 truncate">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSingleAnalysis(file)}
                          className="text-purple-400 hover:text-white hover:bg-purple-500/20"
                        >
                          <Search className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Description Upload */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Upload JD
              </CardTitle>
              <CardDescription className="text-gray-400">
                Add job descriptions for candidate matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-green-500/30 rounded-lg p-6 text-center hover:border-green-500/50 transition-colors">
                <FileText className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-3">Upload job description file</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleJDUpload}
                  className="hidden"
                  id="jd-upload"
                />
                <label htmlFor="jd-upload">
                  <Button 
                    variant="outline" 
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500 cursor-pointer"
                    asChild
                  >
                    <span>
                      <Plus className="w-4 h-4 mr-2" />
                      Browse Files
                    </span>
                  </Button>
                </label>
              </div>

              {jobDescription && (
                <div className="space-y-3">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste or edit job description here..."
                    className="w-full h-24 p-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                  />
                  {showJdConfirm && (
                    <Button
                      onClick={confirmJDUpload}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload JD
                    </Button>
                  )}
                </div>
              )}

              {jdUploadProgress > 0 && jdUploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing JD...</span>
                    <span className="text-green-400">{jdUploadProgress}%</span>
                  </div>
                  <Progress value={jdUploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bulk Analysis */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Recruit
              </CardTitle>
              <CardDescription className="text-gray-400">
                Bulk analyze and rank candidates by job fit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6">
                <BarChart3 className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Bulk Candidate Analysis</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Compare multiple candidates against job requirements
                </p>
                <Button
                  onClick={handleBulkAnalysis}
                  disabled={isAnalyzing || files.length === 0}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>

              {files.length === 0 && (
                <div className="text-center p-4 border border-orange-500/30 rounded-lg bg-orange-500/10">
                  <p className="text-orange-400 text-sm">Upload resumes to enable bulk analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {bulkResults.length > 0 && (
          <div className="mt-8">
            <BulkResumeResults
              results={bulkResults}
              onViewDetails={handleViewDetails}
              onDownload={handleDownload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
