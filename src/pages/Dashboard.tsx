
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
  
  // Refs for scrolling to sections
  const resumeAnalysisRef = useRef<HTMLDivElement>(null);
  const uploadJDRef = useRef<HTMLDivElement>(null);
  const jdExtractorRef = useRef<HTMLDivElement>(null);
  const matchAnalysisRef = useRef<HTMLDivElement>(null);
  const jdVsResumeRef = useRef<HTMLDivElement>(null);
  const recruitRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

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

  // Navigation functions
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, section: string) => {
    setActiveSection(section);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Resume Analysis Engine */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Upload className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Resume Analysis Engine</h3>
              <p className="text-gray-400 mb-4">Upload and analyze candidate resumes with AI-powered insights</p>
              <Button 
                onClick={() => scrollToSection(resumeAnalysisRef, "resume-analysis-engine")}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Upload Job Description */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Job Description</h3>
              <p className="text-gray-400 mb-4">Add job descriptions for matching analysis</p>
              <Button 
                onClick={() => scrollToSection(uploadJDRef, "upload-job-description")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* JD Extractor */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <LinkIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">JD Extractor</h3>
              <p className="text-gray-400 mb-4">Extract job descriptions from LinkedIn, Indeed, and Google Jobs</p>
              <Button 
                onClick={() => scrollToSection(jdExtractorRef, "jd-extractor")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Match Analysis */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Match Analysis</h3>
              <p className="text-gray-400 mb-4">Compare resumes with job descriptions for detailed analysis</p>
              <Button 
                onClick={() => scrollToSection(matchAnalysisRef, "match-analysis")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Second Row of Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* JD vs Resume */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">JD vs Resume</h3>
              <p className="text-gray-400 mb-4">Direct comparison between job description and resume</p>
              <Button 
                onClick={() => scrollToSection(jdVsResumeRef, "jd-vs-resume")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Recruit */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Recruit</h3>
              <p className="text-gray-400 mb-4">Bulk resume analysis and candidate matching for recruitment</p>
              <Button 
                onClick={() => scrollToSection(recruitRef, "recruit")}
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* History */}
          <Card className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-colors group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/30 transition-colors">
                <HistoryIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">History</h3>
              <p className="text-gray-400 mb-4">View and manage all analyzed resumes with filtering</p>
              <Button 
                onClick={() => scrollToSection(historyRef, "history")}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: "resume-analysis-engine", label: "Resume Analysis Engine", ref: resumeAnalysisRef },
            { id: "upload-job-description", label: "Upload Job Description", ref: uploadJDRef },
            { id: "jd-extractor", label: "JD Extractor", ref: jdExtractorRef },
            { id: "match-analysis", label: "Match Analysis", ref: matchAnalysisRef },
            { id: "jd-vs-resume", label: "JD vs Resume", ref: jdVsResumeRef },
            { id: "recruit", label: "Recruit", ref: recruitRef },
            { id: "history", label: "History", ref: historyRef },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              onClick={() => scrollToSection(item.ref, item.id)}
              className={
                activeSection === item.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-purple-500/20"
              }
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Resume Analysis Engine Section */}
        <div ref={resumeAnalysisRef} className="mb-12">
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
                  <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-white font-medium">{uploadedResume.name}</p>
                    <p className="text-gray-400 text-sm">{(uploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
                    
                    <Button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing}
                      className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </div>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Uploading...</span>
                      <span className="text-purple-400">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="mt-8 space-y-6">
                  {/* ATS Score */}
                  <Card className="bg-black/20 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Analysis Results</CardTitle>
                      <CardDescription className="text-gray-400">
                        Comprehensive resume analysis for {analysisResult.candidateName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mb-6">
                        <div className="text-center">
                          <div className="relative w-24 h-24 mx-auto mb-3">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                            <div 
                              className="absolute inset-0 rounded-full border-4 border-green-500"
                              style={{
                                background: `conic-gradient(#10b981 ${analysisResult.atsScore * 3.6}deg, transparent 0deg)`,
                                clipPath: 'circle(50%)',
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{analysisResult.atsScore}%</div>
                                <div className="text-xs text-gray-400">ATS Score</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Analysis */}
                  <Card className="bg-black/20 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" />
                        Skills Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-3">Highlighted Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.highlightedSkills.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-medium mb-3">All Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-purple-500/30 text-gray-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
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
                          {analysisResult.strengths.map((strength: string, index: number) => (
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
                          <Brain className="w-5 h-5 text-purple-400 mr-2" />
                          Suggestions to Improve
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysisResult.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Target className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Suggested Job Roles */}
                  <Card className="bg-black/20 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Award className="w-5 h-5 text-cyan-400 mr-2" />
                        Suggested Job Roles
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {analysisResult.suggestedRoles.map((role: string, index: number) => (
                          <div key={index} className="p-3 bg-black/20 rounded-lg border border-cyan-500/20">
                            <span className="text-cyan-400 font-medium">{role}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upload Job Description Section */}
        <div ref={uploadJDRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 text-green-400 mr-2" />
                  Upload Job Description
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Add job descriptions for matching analysis. Upload as text or file format.
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
            <CardContent>
              {/* Upload Method Selection */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-4">Upload Method</h3>
                <p className="text-gray-400 mb-4">Choose how you'd like to upload the job description</p>
                <div className="flex space-x-4 mb-6">
                  <Button
                    variant={activeTab === 'text' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('text')}
                    className={activeTab === 'text' 
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                    }
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Text Input
                  </Button>
                  <Button
                    variant={activeTab === 'file' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('file')}
                    className={activeTab === 'file' 
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    File Upload
                  </Button>
                </div>

                {/* File Upload Tab */}
                {activeTab === 'file' && (
                  <div className="text-center space-y-6 p-8 border-2 border-dashed border-purple-500/30 rounded-lg">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-purple-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Drop your job description file here or click to browse
                      </h3>
                      <p className="text-gray-400">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
                    </div>

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
                      <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                        <p className="text-white font-medium">{uploadedJDFile.name}</p>
                        <p className="text-gray-400 text-sm">{(uploadedJDFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}

                    {jdUploadProgress > 0 && jdUploadProgress < 100 && (
                      <div className="max-w-md mx-auto">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Uploading...</span>
                          <span className="text-purple-400">{jdUploadProgress}%</span>
                        </div>
                        <Progress value={jdUploadProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}

                {/* Text Input Tab */}
                {activeTab === 'text' && (
                  <Card className="bg-black/20 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="w-5 h-5 text-cyan-400 mr-2" />
                        Enter Job Description
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Fill in the job details and description manually
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2">
                            Job Title <span className="text-red-400">*</span>
                          </label>
                          <Input
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g., Senior Frontend Developer"
                            className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-medium mb-2">Company</label>
                          <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g., TechCorp Inc."
                            className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Job Description <span className="text-red-400">*</span>
                        </label>
                        <Textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the full job description here including requirements, responsibilities, and qualifications..."
                          rows={12}
                          className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                        />
                      </div>

                      <Button
                        onClick={handleSaveJD}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Save Job Description
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* JD Extractor Section */}
        <div ref={jdExtractorRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <LinkIcon className="w-5 h-5 text-blue-400 mr-2" />
                  JD Extractor
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Extract job descriptions directly from LinkedIn or Indeed job posting URLs.
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
            <CardContent>
              {/* URL Extractor */}
              <Card className="bg-black/20 border-purple-500/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LinkIcon className="w-5 h-5 text-cyan-400 mr-2" />
                    Job URL Extractor
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter a LinkedIn or Indeed job posting URL to extract the job description
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Job Posting URL</label>
                    <Input
                      value={jobUrl}
                      onChange={(e) => setJobUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/jobs/view/1234567890 or https://www.indeed.com/viewjob?jk=..."
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => handleExtract('LinkedIn')}
                      disabled={isExtracting}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      {isExtracting ? "Extracting..." : "Extract from LinkedIn"}
                    </Button>
                    
                    <Button
                      onClick={() => handleExtract('Indeed')}
                      disabled={isExtracting}
                      className="bg-slate-600 hover:bg-slate-700 text-white"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {isExtracting ? "Extracting..." : "Extract from Indeed"}
                    </Button>
                    
                    <Button
                      onClick={() => handleExtract('Google Jobs')}
                      disabled={isExtracting}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {isExtracting ? "Extracting..." : "Extract from Google Jobs"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-cyan-400">How to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Navigate to a LinkedIn or Indeed job posting",
                      "Copy the job posting URL from your browser's address bar",
                      "Paste the URL into the input field above",
                      "Click 'Extract Job Description' to automatically extract the content",
                      "Review the extracted content and save it to your collection"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Match Analysis Section */}
        <div ref={matchAnalysisRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 text-orange-400 mr-2" />
                  Match Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Compare candidate resumes with job descriptions to get detailed matching analysis and fit scores.
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
            <CardContent>
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
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue placeholder="Choose a resume" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="resume1" className="text-white hover:bg-purple-500/20">John Doe - Software Engineer</SelectItem>
                          <SelectItem value="resume2" className="text-white hover:bg-purple-500/20">Jane Smith - Frontend Developer</SelectItem>
                          <SelectItem value="resume3" className="text-white hover:bg-purple-500/20">Mike Johnson - Full Stack Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Select Job Description</label>
                      <Select value={selectedJD} onValueChange={setSelectedJD}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue placeholder="Choose a job description" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="jd1" className="text-white hover:bg-purple-500/20">Senior Frontend Developer - TechCorp</SelectItem>
                          <SelectItem value="jd2" className="text-white hover:bg-purple-500/20">Full Stack Developer - StartupXYZ</SelectItem>
                          <SelectItem value="jd3" className="text-white hover:bg-purple-500/20">React Developer - BigTech Inc</SelectItem>
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
                    {!matchResult ? (
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
                          <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                            <div 
                              className="absolute inset-0 rounded-full border-4 border-green-500"
                              style={{
                                background: `conic-gradient(#10b981 ${matchResult.matchScore * 3.6}deg, transparent 0deg)`,
                                clipPath: 'circle(50%)',
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{matchResult.matchScore}%</div>
                                <div className="text-xs text-gray-400">Match Score</div>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white">{matchResult.candidateName}</h3>
                          <p className="text-gray-400">{matchResult.jobTitle}</p>
                        </div>

                        {/* Matching Skills */}
                        <div>
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            Matching Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.matchingSkills.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-green-500/20 text-green-400">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Missing Skills */}
                        <div>
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                            Missing Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.missingSkills.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-red-500/20 text-red-400">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Strengths */}
                        <div>
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                            Strengths
                          </h4>
                          <ul className="space-y-2">
                            {matchResult.strengths.map((strength: string, index: number) => (
                              <li key={index} className="text-gray-300 text-sm">• {strength}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <Brain className="w-4 h-4 text-purple-400 mr-2" />
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {matchResult.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="text-gray-300 text-sm">• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* JD vs Resume Section */}
        <div ref={jdVsResumeRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-400 mr-2" />
                  JD vs Resume
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Direct comparison between job description and resume with instant analysis
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
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Job Description Input */}
                <Card className="bg-black/20 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={jdVsJobDescription}
                      onChange={(e) => setJdVsJobDescription(e.target.value)}
                      placeholder="Paste job description here..."
                      rows={16}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </CardContent>
                </Card>

                {/* Resume Upload */}
                <Card className="bg-black/20 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Resume Upload</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6 p-8 border-2 border-dashed border-purple-500/30 rounded-lg h-80 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-purple-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Drop resume here or click to browse
                        </h3>
                        <p className="text-gray-400">PDF, DOC, DOCX files up to 10MB</p>
                      </div>

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
                        <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-white font-medium">{jdVsUploadedResume.name}</p>
                          <p className="text-gray-400 text-sm">{(jdVsUploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      )}

                      {jdVsUploadProgress > 0 && jdVsUploadProgress < 100 && (
                        <div className="max-w-md mx-auto">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Uploading...</span>
                            <span className="text-purple-400">{jdVsUploadProgress}%</span>
                          </div>
                          <Progress value={jdVsUploadProgress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analyze Button */}
              <Card className="bg-black/20 border-purple-500/20">
                <CardContent className="p-6">
                  <Button
                    onClick={handleJdVsAnalyzeMatch}
                    disabled={jdVsIsAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 text-lg"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {jdVsIsAnalyzing ? "Analyzing Match..." : "Analyze Match"}
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Recruit Section */}
        <div ref={recruitRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 text-red-400 mr-2" />
                  Recruit
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Bulk resume analysis and candidate matching for recruitment teams
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
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Bulk Resume Upload */}
                <Card className="bg-black/20 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Bulk Resume Upload</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6 p-8 border-2 border-dashed border-purple-500/30 rounded-lg">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Users className="w-8 h-8 text-purple-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Drop multiple resumes here or click to browse
                        </h3>
                        <p className="text-gray-400">Select multiple PDF, DOC, DOCX files (up to 50 files)</p>
                      </div>

                      <div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleRecruitFileUpload}
                          className="hidden"
                          ref={recruitFileRef}
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
                        <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-white font-medium">{recruitFiles.length} files selected</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {recruitFiles.slice(0, 3).map((file, index) => (
                              <span key={index} className="text-xs text-gray-400">{file.name}{index < 2 && recruitFiles.length > 1 ? ', ' : ''}</span>
                            ))}
                            {recruitFiles.length > 3 && <span className="text-xs text-gray-400">... and {recruitFiles.length - 3} more</span>}
                          </div>
                        </div>
                      )}

                      {recruitUploadProgress > 0 && recruitUploadProgress < 100 && (
                        <div className="max-w-md mx-auto">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Uploading...</span>
                            <span className="text-purple-400">{recruitUploadProgress}%</span>
                          </div>
                          <Progress value={recruitUploadProgress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Job Description */}
                <Card className="bg-black/20 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Job Description</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={recruitActiveTab === 'text' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRecruitActiveTab('text')}
                        className={recruitActiveTab === 'text' 
                          ? 'bg-white text-black' 
                          : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                        }
                      >
                        Text Input
                      </Button>
                      <Button
                        variant={recruitActiveTab === 'file' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRecruitActiveTab('file')}
                        className={recruitActiveTab === 'file' 
                          ? 'bg-white text-black' 
                          : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                        }
                      >
                        File Upload
                      </Button>
                      <Button
                        variant={recruitActiveTab === 'url' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRecruitActiveTab('url')}
                        className={recruitActiveTab === 'url' 
                          ? 'bg-white text-black' 
                          : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                        }
                      >
                        Extract URL
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recruitActiveTab === 'text' && (
                      <Textarea
                        value={recruitJobDescription}
                        onChange={(e) => setRecruitJobDescription(e.target.value)}
                        placeholder="Paste job description..."
                        rows={16}
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Match Button */}
              <Card className="bg-black/20 border-purple-500/20 mb-8">
                <CardContent className="p-6">
                  <Button
                    onClick={handleMatchToJob}
                    disabled={recruitIsAnalyzing}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {recruitIsAnalyzing ? "Analyzing Candidates..." : "Match to Job"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              {bulkResults.length > 0 && (
                <Card className="bg-black/20 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Results</CardTitle>
                    <CardDescription className="text-gray-400">
                      Candidates ranked by job fit score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bulkResults.map((result) => (
                        <div key={result.id} className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-white font-medium">{result.candidateName}</h4>
                              <p className="text-gray-400 text-sm">{result.fileName}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">{result.jobFitScore}%</div>
                              <div className="text-xs text-gray-400">Fit Score</div>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <h5 className="text-white text-sm font-medium mb-2">Matching Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {result.matchingSkills.map((skill: string, index: number) => (
                                  <Badge key={index} className="bg-green-500/20 text-green-400 text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-white text-sm font-medium mb-2">Missing Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {result.missingSkills.map((skill: string, index: number) => (
                                  <Badge key={index} className="bg-red-500/20 text-red-400 text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Experience: {result.experienceMatch}</span>
                            <span>Location: {result.location}</span>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History Section */}
        <div ref={historyRef} className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <HistoryIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  Resume History
                </CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage all analyzed resumes with filtering and version control.
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
            <CardContent>
              {/* Filters */}
              <Card className="bg-black/20 border-purple-500/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Filter className="w-5 h-5 text-cyan-400 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Search by filename</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search resumes..."
                          className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Date Range</label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="all" className="text-white hover:bg-purple-500/20">All Time</SelectItem>
                          <SelectItem value="today" className="text-white hover:bg-purple-500/20">Today</SelectItem>
                          <SelectItem value="week" className="text-white hover:bg-purple-500/20">This Week</SelectItem>
                          <SelectItem value="month" className="text-white hover:bg-purple-500/20">This Month</SelectItem>
                          <SelectItem value="quarter" className="text-white hover:bg-purple-500/20">This Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Fit Score</label>
                      <Select value={fitScore} onValueChange={setFitScore}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="all" className="text-white hover:bg-purple-500/20">All Scores</SelectItem>
                          <SelectItem value="high" className="text-white hover:bg-purple-500/20">High (80-100%)</SelectItem>
                          <SelectItem value="medium" className="text-white hover:bg-purple-500/20">Medium (60-79%)</SelectItem>
                          <SelectItem value="low" className="text-white hover:bg-purple-500/20">Low (0-59%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Analysis Status</label>
                      <Select value={analysisStatus} onValueChange={setAnalysisStatus}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="all" className="text-white hover:bg-purple-500/20">All Status</SelectItem>
                          <SelectItem value="complete" className="text-white hover:bg-purple-500/20">Complete</SelectItem>
                          <SelectItem value="in-progress" className="text-white hover:bg-purple-500/20">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* History Results */}
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((item) => (
                    <Card key={item.id} className="bg-black/20 border-purple-500/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{item.fileName}</h4>
                              <p className="text-gray-400 text-sm">Analyzed on {item.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400">{item.fitScore}%</div>
                              <div className="text-xs text-gray-400">Fit Score</div>
                            </div>
                            
                            <Badge 
                              className={
                                item.status === 'complete' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }
                            >
                              {item.status === 'complete' ? 'Complete' : 'In Progress'}
                            </Badge>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-black/20 border-purple-500/20">
                  <CardContent className="p-12 text-center">
                    <div className="space-y-6">
                      <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto">
                        <HistoryIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">No analysis history found</h3>
                        <p className="text-gray-400">
                          {searchTerm || fitScore !== "all" || analysisStatus !== "all" || dateRange !== "all"
                            ? "No results match your current filters. Try adjusting your search criteria."
                            : "Upload your first resume to get started with AI-powered analysis."
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
