import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Download,
  Users,
  User,
  Target,
  Link as LinkIcon,
  History as HistoryIcon,
  BarChart3,
  Brain,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Eye,
  Database,
  Globe,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Refs for file inputs
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const jdFileRef = useRef<HTMLInputElement>(null);
  const jdVsResumeFileRef = useRef<HTMLInputElement>(null);
  const recruitFileRef = useRef<HTMLInputElement>(null);

  // Active section state
  const [activeSection, setActiveSection] = useState("resume-analysis-engine");

  // Resume Analysis Engine states
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Upload JD states
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedJDFile, setUploadedJDFile] = useState<File | null>(null);
  const [jdUploadProgress, setJdUploadProgress] = useState(0);

  // JD Extractor states
  const [jobUrl, setJobUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // Match Analysis states
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  // JD vs Resume states
  const [jdVsJobDescription, setJdVsJobDescription] = useState("");
  const [jdVsUploadedResume, setJdVsUploadedResume] = useState<File | null>(null);
  const [jdVsUploadProgress, setJdVsUploadProgress] = useState(0);
  const [jdVsIsAnalyzing, setJdVsIsAnalyzing] = useState(false);

  // Recruit states
  const [recruitFiles, setRecruitFiles] = useState<File[]>([]);
  const [recruitJobDescription, setRecruitJobDescription] = useState("");
  const [recruitActiveTab, setRecruitActiveTab] = useState<'text' | 'file' | 'url'>('text');
  const [recruitUploadProgress, setRecruitUploadProgress] = useState(0);
  const [recruitIsAnalyzing, setRecruitIsAnalyzing] = useState(false);
  const [bulkResults, setBulkResults] = useState<any[]>([]);

  // History states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [fitScore, setFitScore] = useState("all");
  const [analysisStatus, setAnalysisStatus] = useState("all");

  // File upload handlers
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedResume(file);
      simulateUpload(setUploadProgress);
    }
  };

  const handleJDFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedJDFile(file);
      simulateUpload(setJdUploadProgress);
    }
  };

  const handleJdVsResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJdVsUploadedResume(file);
      simulateUpload(setJdVsUploadProgress);
    }
  };

  const handleRecruitFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setRecruitFiles(prev => [...prev, ...selectedFiles]);
    simulateUpload(setRecruitUploadProgress);
  };

  const simulateUpload = (setProgress: React.Dispatch<React.SetStateAction<number>>) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload successful!",
            description: "File has been uploaded and is ready for analysis.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Analysis handlers
  const handleAnalysis = async () => {
    if (!uploadedResume) {
      toast({
        title: "No file selected",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = {
      fileName: uploadedResume.name,
      atsScore: 87,
      candidateName: "John Doe",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      highlightedSkills: ["JavaScript", "React", "TypeScript", "MongoDB"],
      strengths: [
        "Strong expertise in modern JavaScript frameworks",
        "Full-stack development experience",
        "Good understanding of software architecture",
        "Experience with version control systems"
      ],
      suggestions: [
        "Consider gaining AWS certification",
        "Add mobile development experience",
        "Learn Docker and Kubernetes",
        "Explore GraphQL as alternative to REST"
      ],
      suggestedRoles: [
        "Senior Frontend Developer",
        "Full Stack Developer",
        "React Developer",
        "JavaScript Engineer"
      ]
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: "Resume has been analyzed successfully.",
    });
  };

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
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockMatchResult = {
      candidateName: "John Doe",
      jobTitle: "Full Stack Developer at StartupXYZ",
      matchScore: 87,
      matchingSkills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
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

    setMatchResult(mockMatchResult);
    setIsGenerating(false);
    
    toast({
      title: "Match analysis complete!",
      description: "Detailed compatibility analysis has been generated.",
    });
  };

  const handleMatchToJob = async () => {
    if (recruitFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload resumes first.",
        variant: "destructive",
      });
      return;
    }

    if (!recruitJobDescription) {
      toast({
        title: "Job description required",
        description: "Please provide a job description.",
        variant: "destructive",
      });
      return;
    }

    setRecruitIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = recruitFiles.map((file, index) => ({
      id: `resume-${index}`,
      fileName: file.name,
      candidateName: `Candidate ${index + 1}`,
      jobFitScore: Math.floor(Math.random() * 40) + 60,
      matchingSkills: ["JavaScript", "React", "Node.js", "Python", "AWS"].slice(0, Math.floor(Math.random() * 3) + 2),
      missingSkills: ["Docker", "Kubernetes", "GraphQL"].slice(0, Math.floor(Math.random() * 2) + 1),
      experienceMatch: `${Math.floor(Math.random() * 5) + 3}+ years`,
      location: ["New York", "San Francisco", "Remote", "London"][Math.floor(Math.random() * 4)],
      yearsOfExperience: Math.floor(Math.random() * 8) + 2
    }));

    setBulkResults(mockResults.sort((a, b) => b.jobFitScore - a.jobFitScore));
    setRecruitIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `${recruitFiles.length} resumes analyzed and ranked by fit score.`,
    });
  };

  const handleJdVsAnalyzeMatch = async () => {
    if (!jdVsJobDescription || !jdVsUploadedResume) {
      toast({
        title: "Missing information",
        description: "Please provide both job description and resume.",
        variant: "destructive",
      });
      return;
    }

    setJdVsIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setJdVsIsAnalyzing(false);
    toast({
      title: "Analysis complete!",
      description: "Job description vs resume comparison has been generated.",
    });
  };

  const handleExtract = async (platform: string) => {
    if (!jobUrl) {
      toast({
        title: "URL required",
        description: "Please enter a job posting URL.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExtracting(false);
    toast({
      title: `Extraction from ${platform} complete!`,
      description: "Job description has been extracted and saved.",
    });
  };

  const handleSaveJD = () => {
    if (activeTab === 'text' && (!jobTitle || !jobDescription)) {
      toast({
        title: "Missing information",
        description: "Please fill in job title and description.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === 'file' && !uploadedJDFile) {
      toast({
        title: "No file selected",
        description: "Please upload a job description file.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Job description saved!",
      description: "Job description has been saved successfully.",
    });
  };

  const handleExport = (format: string) => {
    // Simulate file generation and download
    const content = "Sample,Data,Export\nRow1,Value1,100\nRow2,Value2,200";
    const blob = new Blob([content], { type: format === 'CSV' ? 'text/csv' : 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: `${format} Export Complete`,
      description: `File has been downloaded successfully.`,
    });
  };

  // Filter history data (mock)
  const mockHistoryData = [
    { id: 1, fileName: "John_Doe_Resume.pdf", date: "2024-01-15", fitScore: 87, status: "complete" },
    { id: 2, fileName: "Jane_Smith_Resume.pdf", date: "2024-01-14", fitScore: 92, status: "complete" },
    { id: 3, fileName: "Mike_Johnson_Resume.pdf", date: "2024-01-13", fitScore: 76, status: "in-progress" },
    { id: 4, fileName: "Sarah_Wilson_Resume.pdf", date: "2024-01-12", fitScore: 84, status: "complete" },
  ];

  const filteredHistory = mockHistoryData.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFitScore = fitScore === "all" || 
      (fitScore === "high" && item.fitScore >= 80) ||
      (fitScore === "medium" && item.fitScore >= 60 && item.fitScore < 80) ||
      (fitScore === "low" && item.fitScore < 60);
    const matchesStatus = analysisStatus === "all" || item.status === analysisStatus;
    const matchesDate = dateRange === "all" || 
      (dateRange === "today" && item.date === "2024-01-15") ||
      (dateRange === "week" && new Date(item.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateRange === "month" && new Date(item.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesFitScore && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-white font-semibold">SkillSync AI</h1>
                <span className="text-gray-400 text-sm">Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">user@example.com</span>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-lg">Welcome to your SkillSync AI control center. Manage resumes, analyze job fits, and generate insights.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">0</div>
              <div className="text-gray-400">Resumes Analyzed</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">0</div>
              <div className="text-gray-400">Job Descriptions</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">0</div>
              <div className="text-gray-400">Matches Created</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-1">0</div>
              <div className="text-gray-400">Reports Generated</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-black/20 border border-purple-500/20 rounded-lg backdrop-blur-sm">
            <Button
              onClick={() => setActiveSection("resume-analysis-engine")}
              variant={activeSection === "resume-analysis-engine" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "resume-analysis-engine"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              Resume Analysis Engine
            </Button>
            <Button
              onClick={() => setActiveSection("upload-job-description")}
              variant={activeSection === "upload-job-description" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "upload-job-description"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              Upload Job Description
            </Button>
            <Button
              onClick={() => setActiveSection("jd-extractor")}
              variant={activeSection === "jd-extractor" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "jd-extractor"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              JD Extractor
            </Button>
            <Button
              onClick={() => setActiveSection("match-analysis")}
              variant={activeSection === "match-analysis" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "match-analysis"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              Match Analysis
            </Button>
            <Button
              onClick={() => setActiveSection("jd-vs-resume")}
              variant={activeSection === "jd-vs-resume" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "jd-vs-resume"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              JD vs Resume
            </Button>
            <Button
              onClick={() => setActiveSection("recruit")}
              variant={activeSection === "recruit" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "recruit"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              Recruit
            </Button>
            <Button
              onClick={() => setActiveSection("history")}
              variant={activeSection === "history" ? "default" : "ghost"}
              className={`rounded-lg transition-all ${
                activeSection === "history"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
              }`}
            >
              History
            </Button>
          </div>
        </div>

        {/* Dynamic Content Section */}
        {activeSection === "resume-analysis-engine" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="w-5 h-5 text-cyan-400 mr-2" />
                    Resume Analysis Engine
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Upload and analyze candidate resumes with AI-powered insights
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('CSV')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('PDF')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Drop your resume here or click to browse
                    </h3>
                    <p className="text-gray-400">Supports PDF, DOC, DOCX files up to 10MB</p>
                  </div>

                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      ref={resumeFileRef}
                    />
                    <Button 
                      onClick={() => resumeFileRef.current?.click()}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Files
                    </Button>
                  </div>

                  {uploadedResume && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        <div className="flex-1 text-left">
                          <p className="text-white font-medium">{uploadedResume.name}</p>
                          <p className="text-gray-400 text-sm">{(uploadedResume.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <div className="text-green-400">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      </div>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-3">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs text-gray-400 mt-1">{uploadProgress}% uploaded</p>
                        </div>
                      )}
                    </div>
                  )}

                  {uploadedResume && (
                    <Button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <Brain className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Analyze Resume
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {analysisResult && (
                  <div className="mt-8 space-y-6">
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
                      
                      {/* Analysis header */}
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{analysisResult.candidateName}</h4>
                            <p className="text-gray-400">{analysisResult.fileName}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-1">{analysisResult.atsScore}%</div>
                            <p className="text-gray-400 text-sm">ATS Score</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <Card className="bg-gray-800/50 border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-2" />
                              Identified Skills
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.skills.map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <Award className="w-4 h-4 text-green-400 mr-2" />
                              Highlighted Skills
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.highlightedSkills.map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Strengths and Suggestions */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <Card className="bg-gray-800/50 border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                              Strengths
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.strengths.map((strength: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                              Improvement Suggestions
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.suggestions.map((suggestion: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Suggested Roles */}
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Target className="w-4 h-4 text-purple-400 mr-2" />
                            Suggested Roles
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {analysisResult.suggestedRoles.map((role: string, index: number) => (
                              <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                                <span className="text-purple-400 font-medium">{role}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "upload-job-description" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 text-green-400 mr-2" />
                  Upload Job Description
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Add job descriptions by typing, uploading files, or pasting content
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Tab Buttons */}
                  <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                    <Button
                      variant={activeTab === 'text' ? 'default' : 'ghost'}
                      className={`flex-1 ${activeTab === 'text' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setActiveTab('text')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Text Input
                    </Button>
                    <Button
                      variant={activeTab === 'file' ? 'default' : 'ghost'}
                      className={`flex-1 ${activeTab === 'file' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setActiveTab('file')}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      File Upload
                    </Button>
                  </div>

                  {/* Text Input Tab */}
                  {activeTab === 'text' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Title
                          </label>
                          <Input
                            placeholder="e.g., Senior Frontend Developer"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Company
                          </label>
                          <Input
                            placeholder="e.g., TechCorp Inc."
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Job Description
                        </label>
                        <Textarea
                          placeholder="Paste or type the job description here..."
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 min-h-[200px]"
                        />
                      </div>
                    </div>
                  )}

                  {/* File Upload Tab */}
                  {activeTab === 'file' && (
                    <div className="text-center space-y-6">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Upload Job Description File
                        </h3>
                        <p className="text-gray-400 mb-4">
                          Supports PDF, DOC, DOCX, TXT files up to 5MB
                        </p>
                        
                        <div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleJDFileUpload}
                            className="hidden"
                            ref={jdFileRef}
                          />
                          <Button 
                            onClick={() => jdFileRef.current?.click()}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Browse Files
                          </Button>
                        </div>

                        {uploadedJDFile && (
                          <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-8 h-8 text-green-400" />
                              <div className="flex-1 text-left">
                                <p className="text-white font-medium">{uploadedJDFile.name}</p>
                                <p className="text-gray-400 text-sm">{(uploadedJDFile.size / 1024).toFixed(1)} KB</p>
                              </div>
                              <div className="text-green-400">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                            </div>
                            {jdUploadProgress > 0 && jdUploadProgress < 100 && (
                              <div className="mt-3">
                                <Progress value={jdUploadProgress} className="h-2" />
                                <p className="text-xs text-gray-400 mt-1">{jdUploadProgress}% uploaded</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      onClick={handleSaveJD}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Save Job Description
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "jd-extractor" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <LinkIcon className="w-5 h-5 text-blue-400 mr-2" />
                  JD Extractor
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Extract job descriptions from LinkedIn, Indeed, and Google Jobs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Posting URL
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="https://www.linkedin.com/jobs/view/..."
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Platform buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => handleExtract('LinkedIn')}
                      disabled={isExtracting}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col"
                    >
                      <Globe className="w-8 h-8 mb-2" />
                      Extract from LinkedIn
                    </Button>
                    <Button
                      onClick={() => handleExtract('Indeed')}
                      disabled={isExtracting}
                      className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex-col"
                    >
                      <Globe className="w-8 h-8 mb-2" />
                      Extract from Indeed
                    </Button>
                    <Button
                      onClick={() => handleExtract('Google Jobs')}
                      disabled={isExtracting}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 h-auto flex-col"
                    >
                      <Globe className="w-8 h-8 mb-2" />
                      Extract from Google Jobs
                    </Button>
                  </div>

                  {isExtracting && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 text-blue-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                        <span>Extracting job description...</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "match-analysis" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 text-orange-400 mr-2" />
                  Match Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Compare resumes against job descriptions with AI scoring
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Resume
                      </label>
                      <Select value={selectedResume} onValueChange={setSelectedResume}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Choose a resume..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resume1">John_Doe_Resume.pdf</SelectItem>
                          <SelectItem value="resume2">Jane_Smith_Resume.pdf</SelectItem>
                          <SelectItem value="resume3">Mike_Johnson_Resume.pdf</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Job Description
                      </label>
                      <Select value={selectedJD} onValueChange={setSelectedJD}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Choose a job description..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jd1">Senior Frontend Developer - TechCorp</SelectItem>
                          <SelectItem value="jd2">Full Stack Engineer - StartupXYZ</SelectItem>
                          <SelectItem value="jd3">React Developer - InnovateNow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleGenerateMatch}
                      disabled={isGenerating || !selectedResume || !selectedJD}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      {isGenerating ? (
                        <>
                          <Brain className="w-4 h-4 mr-2 animate-spin" />
                          Generating Match...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Generate Match Analysis
                        </>
                      )}
                    </Button>
                  </div>

                  {matchResult && (
                    <div className="mt-8 space-y-6">
                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Match Analysis Results</h3>
                        
                        {/* Match header */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/20 mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-white">{matchResult.candidateName}</h4>
                              <p className="text-gray-400">{matchResult.jobTitle}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-orange-400 mb-1">{matchResult.matchScore}%</div>
                              <p className="text-gray-400 text-sm">Match Score</p>
                            </div>
                          </div>
                        </div>

                        {/* Skills Match */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                          <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                Matching Skills
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {matchResult.matchingSkills.map((skill: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center">
                                <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                                Missing Skills
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {matchResult.missingSkills.map((skill: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Strengths and Recommendations */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center">
                                <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                                Key Strengths
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {matchResult.strengths.map((strength: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300">{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center">
                                <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                                Recommendations
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {matchResult.recommendations.map((recommendation: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <ArrowRight className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300">{recommendation}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "jd-vs-resume" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 text-pink-400 mr-2" />
                  JD vs Resume
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Direct comparison between job requirements and candidate profile
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Job Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Job Description
                      </label>
                      <Textarea
                        placeholder="Paste the job description here..."
                        value={jdVsJobDescription}
                        onChange={(e) => setJdVsJobDescription(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 min-h-[200px]"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload Resume
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Upload className="w-6 h-6 text-pink-400" />
                        </div>
                        <p className="text-gray-400 mb-3">PDF, DOC, DOCX up to 10MB</p>
                        
                        <div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleJdVsResumeUpload}
                            className="hidden"
                            ref={jdVsResumeFileRef}
                          />
                          <Button 
                            onClick={() => jdVsResumeFileRef.current?.click()}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Browse Files
                          </Button>
                        </div>

                        {jdVsUploadedResume && (
                          <div className="mt-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-5 h-5 text-pink-400" />
                              <span className="text-white text-sm">{jdVsUploadedResume.name}</span>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                            {jdVsUploadProgress > 0 && jdVsUploadProgress < 100 && (
                              <div className="mt-2">
                                <Progress value={jdVsUploadProgress} className="h-1" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleJdVsAnalyzeMatch}
                      disabled={jdVsIsAnalyzing || !jdVsJobDescription || !jdVsUploadedResume}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                    >
                      {jdVsIsAnalyzing ? (
                        <>
                          <Brain className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Match...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Analyze Match
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "recruit" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 text-teal-400 mr-2" />
                  Recruit
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Bulk resume analysis for recruitment teams
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Job Description Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Description
                    </label>
                    <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 mb-4">
                      <Button
                        variant={recruitActiveTab === 'text' ? 'default' : 'ghost'}
                        className={`flex-1 ${recruitActiveTab === 'text' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setRecruitActiveTab('text')}
                        size="sm"
                      >
                        Text
                      </Button>
                      <Button
                        variant={recruitActiveTab === 'file' ? 'default' : 'ghost'}
                        className={`flex-1 ${recruitActiveTab === 'file' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setRecruitActiveTab('file')}
                        size="sm"
                      >
                        File
                      </Button>
                      <Button
                        variant={recruitActiveTab === 'url' ? 'default' : 'ghost'}
                        className={`flex-1 ${recruitActiveTab === 'url' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setRecruitActiveTab('url')}
                        size="sm"
                      >
                        URL
                      </Button>
                    </div>

                    {recruitActiveTab === 'text' && (
                      <Textarea
                        placeholder="Enter job description..."
                        value={recruitJobDescription}
                        onChange={(e) => setRecruitJobDescription(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                      />
                    )}

                    {recruitActiveTab === 'file' && (
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                        <FileText className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                        <p className="text-gray-400">Upload job description file</p>
                      </div>
                    )}

                    {recruitActiveTab === 'url' && (
                      <Input
                        placeholder="https://linkedin.com/jobs/..."
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload Resumes (Multiple files)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-teal-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Drop resumes here or click to browse
                      </h3>
                      <p className="text-gray-400 mb-4">Supports PDF, DOC, DOCX files. Select multiple files.</p>
                      
                      <div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleRecruitFileUpload}
                          className="hidden"
                          ref={recruitFileRef}
                          multiple
                        />
                        <Button 
                          onClick={() => recruitFileRef.current?.click()}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </div>

                      {recruitFiles.length > 0 && (
                        <div className="mt-6 space-y-2">
                          <p className="text-gray-300 font-medium">{recruitFiles.length} files selected:</p>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {recruitFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2">
                                <span className="text-gray-300 text-sm">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setRecruitFiles(prev => prev.filter((_, i) => i !== index))}
                                  className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleMatchToJob}
                      disabled={recruitIsAnalyzing || recruitFiles.length === 0 || !recruitJobDescription}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                    >
                      {recruitIsAnalyzing ? (
                        <>
                          <Brain className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing {recruitFiles.length} Resumes...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Match to Job ({recruitFiles.length} resumes)
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Results */}
                  {bulkResults.length > 0 && (
                    <div className="mt-8">
                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          Recruitment Results - {bulkResults.length} Candidates Ranked
                        </h3>
                        
                        <div className="space-y-3">
                          {bulkResults.map((result, index) => (
                            <Card key={result.id} className="bg-gray-800/50 border-gray-700 hover:border-teal-500/30 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                      <div className="text-xl font-bold text-teal-400">#{index + 1}</div>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-semibold">{result.candidateName}</h4>
                                      <p className="text-gray-400 text-sm">{result.fileName}</p>
                                      <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-gray-400 text-xs flex items-center">
                                          <Calendar className="w-3 h-3 mr-1" />
                                          {result.experienceMatch}
                                        </span>
                                        <span className="text-gray-400 text-xs flex items-center">
                                          <User className="w-3 h-3 mr-1" />
                                          {result.location}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-teal-400 mb-1">{result.jobFitScore}%</div>
                                    <p className="text-gray-400 text-xs">Job Fit</p>
                                  </div>
                                  
                                  <div className="text-right space-y-2">
                                    <div>
                                      <p className="text-gray-400 text-xs mb-1">Matching Skills</p>
                                      <div className="flex flex-wrap gap-1 max-w-40">
                                        {result.matchingSkills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                          <Badge key={skillIndex} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                            {skill}
                                          </Badge>
                                        ))}
                                        {result.matchingSkills.length > 3 && (
                                          <Badge variant="secondary" className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                                            +{result.matchingSkills.length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10">
                                      <Eye className="w-3 h-3 mr-1" />
                                      View
                                    </Button>
                                    <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                                      <Download className="w-3 h-3 mr-1" />
                                      Export
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "history" && (
          <div className="mb-12">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <HistoryIcon className="w-5 h-5 text-yellow-400 mr-2" />
                    Analysis History
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    View and manage all analyzed resumes with filtering and search
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('CSV')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('PDF')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Search Files
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search by filename..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date Range
                      </label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Fit Score
                      </label>
                      <Select value={fitScore} onValueChange={setFitScore}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Scores</SelectItem>
                          <SelectItem value="high">High (80%+)</SelectItem>
                          <SelectItem value="medium">Medium (60-79%)</SelectItem>
                          <SelectItem value="low">Low (&lt;60%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <Select value={analysisStatus} onValueChange={setAnalysisStatus}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-3">
                    {filteredHistory.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400">
                            Showing {filteredHistory.length} of {mockHistoryData.length} results
                          </p>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Filter className="w-4 h-4 mr-2" />
                            Clear Filters
                          </Button>
                        </div>
                        
                        {filteredHistory.map((item) => (
                          <Card key={item.id} className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <FileText className="w-8 h-8 text-yellow-400" />
                                  <div>
                                    <h4 className="text-white font-semibold">{item.fileName}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                      <span className="text-gray-400 text-sm flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {item.date}
                                      </span>
                                      <Badge 
                                        variant="secondary" 
                                        className={
                                          item.status === "complete" 
                                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                                            : item.status === "in-progress"
                                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                            : "bg-red-500/20 text-red-400 border-red-500/30"
                                        }
                                      >
                                        {item.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className={`text-xl font-bold mb-1 ${
                                    item.fitScore >= 80 ? 'text-green-400' : 
                                    item.fitScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                                  }`}>
                                    {item.fitScore}%
                                  </div>
                                  <p className="text-gray-400 text-xs">Fit Score</p>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                                    <Download className="w-3 h-3 mr-1" />
                                    Export
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <HistoryIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No analysis history found</p>
                        <p className="text-gray-500">Try adjusting your search filters or analyze some resumes first</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
