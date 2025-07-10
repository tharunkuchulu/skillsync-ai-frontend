import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BulkResumeResults from "@/components/BulkResumeResults";
import { 
  FileText, 
  Upload, 
  Download,
  Target,
  Users,
  History,
  Star,
  TrendingUp,
  Brain,
  CheckCircle,
  Award,
  Search,
  Filter,
  Plus,
  Eye,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>('resume-analysis');
  
  // Resume Analysis Engine states
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Upload Job Description states
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedJDFile, setUploadedJDFile] = useState<File | null>(null);
  const [jdActiveTab, setJdActiveTab] = useState<'text' | 'file'>('text');

  // JD Extractor states
  const [extractorUrl, setExtractorUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // Match Analysis states
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  // JD vs Resume states
  const [jdVsResumeJD, setJdVsResumeJD] = useState("");
  const [jdVsResumeFile, setJdVsResumeFile] = useState<File | null>(null);
  const [isAnalyzingMatch, setIsAnalyzingMatch] = useState(false);
  const [jdVsResumeResult, setJdVsResumeResult] = useState<any>(null);

  // Recruit states
  const [recruitFiles, setRecruitFiles] = useState<File[]>([]);
  const [recruitJD, setRecruitJD] = useState("");
  const [recruitActiveTab, setRecruitActiveTab] = useState<'text' | 'file' | 'url'>('text');
  const [recruitUrl, setRecruitUrl] = useState("");
  const [isRecruitAnalyzing, setIsRecruitAnalyzing] = useState(false);
  const [bulkResults, setBulkResults] = useState<any[]>([]);

  // History states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [fitScore, setFitScore] = useState("all");

  const features = [
    {
      title: "Resume Analysis Engine",
      description: "Upload and analyze candidate resumes with AI-powered insights",
      icon: FileText,
      gradient: "from-purple-500 to-blue-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      id: 'resume-analysis'
    },
    {
      title: "Upload Job Description",
      description: "Add job descriptions for matching analysis. Upload as text or file format.",
      icon: Upload,
      gradient: "from-blue-500 to-cyan-500",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      id: 'upload-jd'
    },
    {
      title: "JD Extractor",
      description: "Extract job descriptions from job posting URLs automatically",
      icon: Target,
      gradient: "from-cyan-500 to-teal-500",
      buttonColor: "bg-cyan-600 hover:bg-cyan-700",
      id: 'jd-extractor'
    },
    {
      title: "Match Analysis",
      description: "Compare candidate resumes with job descriptions to get detailed matching analysis",
      icon: BarChart3,
      gradient: "from-teal-500 to-green-500",
      buttonColor: "bg-teal-600 hover:bg-teal-700",
      id: 'match-analysis'
    },
    {
      title: "JD vs Resume",
      description: "Direct comparison between job description and resume with instant analysis",
      icon: Target,
      gradient: "from-green-500 to-emerald-500",
      buttonColor: "bg-green-600 hover:bg-green-700",
      id: 'jd-vs-resume'
    },
    {
      title: "Recruit",
      description: "Bulk resume analysis and candidate matching for recruitment teams",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      id: 'recruit'
    },
    {
      title: "History",
      description: "View and manage all analyzed resumes with filtering and version control",
      icon: History,
      gradient: "from-yellow-500 to-orange-500",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      id: 'history'
    }
  ];

  const handleGetStarted = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const simulateUpload = (setProgress: (progress: number) => void) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedResume(file);
      simulateUpload(setUploadProgress);
      toast({
        title: "Resume uploaded successfully!",
        description: "Resume is ready for analysis.",
      });
    }
  };

  const handleJDFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedJDFile(file);
      toast({
        title: "Job description file uploaded!",
        description: "File is ready for processing.",
      });
    }
  };

  const handleJDVsResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJdVsResumeFile(file);
      simulateUpload(setUploadProgress);
      toast({
        title: "Resume uploaded successfully!",
        description: "Resume is ready for comparison.",
      });
    }
  };

  const handleRecruitUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setRecruitFiles(prev => [...prev, ...selectedFiles]);
    simulateUpload(setUploadProgress);
    toast({
      title: "Files uploaded successfully!",
      description: `${selectedFiles.length} resume(s) uploaded and ready for analysis.`,
    });
  };

  const handleAnalyzeResume = async () => {
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

  const handleExtractJD = async () => {
    if (!extractorUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a job posting URL.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExtracting(false);
    
    toast({
      title: "Job description extracted!",
      description: "Job description has been successfully extracted from the URL.",
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

    setIsGeneratingMatch(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockMatchResult = {
      fitScore: 85,
      matchingSkills: ["JavaScript", "React", "Node.js"],
      missingSkills: ["AWS", "Docker"],
      strengths: ["Strong technical background", "Good communication skills"],
      recommendations: ["Gain cloud experience", "Learn containerization"]
    };

    setMatchResult(mockMatchResult);
    setIsGeneratingMatch(false);
    toast({
      title: "Match analysis complete!",
      description: "Detailed compatibility analysis has been generated.",
    });
  };

  const handleAnalyzeJDVsResume = async () => {
    if (!jdVsResumeJD || !jdVsResumeFile) {
      toast({
        title: "Missing information",
        description: "Please provide both job description and resume.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingMatch(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = {
      fitScore: 78,
      matchingSkills: ["React", "JavaScript", "CSS"],
      missingSkills: ["Python", "AWS"],
      analysis: "Good match for frontend development role"
    };

    setJdVsResumeResult(mockResult);
    setIsAnalyzingMatch(false);
    toast({
      title: "Analysis complete!",
      description: "Job description vs resume comparison has been generated.",
    });
  };

  const handleRecruitAnalysis = async () => {
    if (recruitFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload resumes first.",
        variant: "destructive",
      });
      return;
    }

    if (!recruitJD) {
      toast({
        title: "Job description required",
        description: "Please provide a job description.",
        variant: "destructive",
      });
      return;
    }

    setIsRecruitAnalyzing(true);
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
    setIsRecruitAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `${recruitFiles.length} resumes analyzed and ranked by fit score.`,
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: `${format} Export`,
      description: `Data will be downloaded as ${format}.`,
    });
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'resume-analysis':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume Analysis Engine</h2>
                <p className="text-gray-400">Upload and analyze candidate resumes with AI-powered insights</p>
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
            </div>

            <Card className="bg-black/20 border-purple-500/20">
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
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </label>
                  </div>

                  {uploadedResume && (
                    <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                      <p className="text-white font-medium">{uploadedResume.name}</p>
                      <p className="text-gray-400 text-sm">{(uploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
                      
                      <Button
                        onClick={handleAnalyzeResume}
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
              </CardContent>
            </Card>

            {analysisResult && (
              <div className="space-y-6">
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
          </div>
        );

      case 'upload-jd':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Upload Job Description</h2>
                <p className="text-gray-400">Add job descriptions for matching analysis. Upload as text or file format.</p>
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
            </div>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Upload Method</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how you'd like to upload the job description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Button
                    variant={jdActiveTab === 'text' ? 'default' : 'outline'}
                    onClick={() => setJdActiveTab('text')}
                    className={jdActiveTab === 'text' 
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                    }
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Text Input
                  </Button>
                  <Button
                    variant={jdActiveTab === 'file' ? 'default' : 'outline'}
                    onClick={() => setJdActiveTab('file')}
                    className={jdActiveTab === 'file' 
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    File Upload
                  </Button>
                </div>

                {jdActiveTab === 'file' && (
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
                        id="jd-upload"
                      />
                      <label htmlFor="jd-upload">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
                    </div>

                    {uploadedJDFile && (
                      <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                        <p className="text-white font-medium">{uploadedJDFile.name}</p>
                        <p className="text-gray-400 text-sm">{(uploadedJDFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {jdActiveTab === 'text' && (
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
                    onClick={() => toast({ title: "Job description saved!", description: "Job description has been saved successfully." })}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Save Job Description
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'jd-extractor':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">JD Extractor</h2>
                <p className="text-gray-400">Extract job descriptions from job posting URLs automatically</p>
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
            </div>

            <Card className="bg-black/20 border-purple-500/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 text-cyan-400 mr-2" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="text-white font-medium">Copy Job URL</h4>
                      <p className="text-gray-400 text-sm">Copy the URL from job posting sites like LinkedIn, Indeed, Glassdoor, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="text-white font-medium">Paste URL</h4>
                      <p className="text-gray-400 text-sm">Paste the URL in the input field below and click extract.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="text-white font-medium">Get Results</h4>
                      <p className="text-gray-400 text-sm">The AI will extract and format the job description automatically.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Extract Job Description</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter the job posting URL to automatically extract the job description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Job Posting URL</label>
                  <Input
                    value={extractorUrl}
                    onChange={(e) => setExtractorUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/jobs/view/1234567890"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  onClick={handleExtractJD}
                  disabled={isExtracting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {isExtracting ? "Extracting..." : "Extract Job Description"}
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'match-analysis':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Match Analysis</h2>
                <p className="text-gray-400">Compare candidate resumes with job descriptions to get detailed matching analysis and fit scores.</p>
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
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
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
                      <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/30">
                        <SelectItem value="resume1" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">John Doe - Software Engineer</SelectItem>
                        <SelectItem value="resume2" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Jane Smith - Frontend Developer</SelectItem>
                        <SelectItem value="resume3" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Mike Johnson - Full Stack Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Select Job Description</label>
                    <Select value={selectedJD} onValueChange={setSelectedJD}>
                      <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                        <SelectValue placeholder="Choose a job description" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/30">
                        <SelectItem value="jd1" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Senior Frontend Developer - TechCorp</SelectItem>
                        <SelectItem value="jd2" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Full Stack Developer - StartupXYZ</SelectItem>
                        <SelectItem value="jd3" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">React Developer - BigTech Inc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerateMatch}
                    disabled={isGeneratingMatch}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {isGeneratingMatch ? "Generating Match..." : "Generate Match"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                {matchResult ? (
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                          <div 
                            className="absolute inset-0 rounded-full border-4 border-green-500"
                            style={{
                              background: `conic-gradient(#10b981 ${matchResult.fitScore * 3.6}deg, transparent 0deg)`,
                              clipPath: 'circle(50%)',
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400">{matchResult.fitScore}%</div>
                              <div className="text-xs text-gray-400">Match</div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white">Match Analysis Complete!</h3>
                        <p className="text-gray-400">Detailed compatibility analysis has been generated.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Matching Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.matchingSkills.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-green-500/20 text-green-400">{skill}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Missing Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.missingSkills.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-red-500/20 text-red-400">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
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
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        );

      case 'jd-vs-resume':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">JD vs Resume</h2>
                <p className="text-gray-400">Direct comparison between job description and resume with instant analysis</p>
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
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jdVsResumeJD}
                    onChange={(e) => setJdVsResumeJD(e.target.value)}
                    placeholder="Paste job description here..."
                    rows={16}
                    className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </CardContent>
              </Card>

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
                        onChange={handleJDVsResumeUpload}
                        className="hidden"
                        id="jd-vs-resume-upload"
                      />
                      <label htmlFor="jd-vs-resume-upload">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
                    </div>

                    {jdVsResumeFile && (
                      <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                        <p className="text-white font-medium">{jdVsResumeFile.name}</p>
                        <p className="text-gray-400 text-sm">{(jdVsResumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
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
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 border-purple-500/20 mb-8">
              <CardContent className="p-6">
                <Button
                  onClick={handleAnalyzeJDVsResume}
                  disabled={isAnalyzingMatch}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 text-lg"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {isAnalyzingMatch ? "Analyzing Match..." : "Analyze Match"}
                </Button>
              </CardContent>
            </Card>

            {jdVsResumeResult && (
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-green-500"
                          style={{
                            background: `conic-gradient(#10b981 ${jdVsResumeResult.fitScore * 3.6}deg, transparent 0deg)`,
                            clipPath: 'circle(50%)',
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{jdVsResumeResult.fitScore}%</div>
                            <div className="text-xs text-gray-400">Match</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400">{jdVsResumeResult.analysis}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Matching Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {jdVsResumeResult.matchingSkills.map((skill: string, index: number) => (
                            <Badge key={index} className="bg-green-500/20 text-green-400">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Missing Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {jdVsResumeResult.missingSkills.map((skill: string, index: number) => (
                            <Badge key={index} className="bg-red-500/20 text-red-400">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'recruit':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Recruit</h2>
                <p className="text-gray-400">Bulk resume analysis and candidate matching for recruitment teams</p>
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
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
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
                        onChange={handleRecruitUpload}
                        className="hidden"
                        id="bulk-resume-upload"
                      />
                      <label htmlFor="bulk-resume-upload">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
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
                </CardContent>
              </Card>

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
                      value={recruitJD}
                      onChange={(e) => setRecruitJD(e.target.value)}
                      placeholder="Paste job description..."
                      rows={16}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  )}
                  {recruitActiveTab === 'file' && (
                    <div className="text-center space-y-4 p-6 border-2 border-dashed border-purple-500/30 rounded-lg">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto" />
                      <div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleJDFileUpload}
                          className="hidden"
                          id="recruit-jd-upload"
                        />
                        <label htmlFor="recruit-jd-upload">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                            <FileText className="w-4 h-4 mr-2" />
                            Upload JD File
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                  {recruitActiveTab === 'url' && (
                    <div className="space-y-4">
                      <Input
                        value={recruitUrl}
                        onChange={(e) => setRecruitUrl(e.target.value)}
                        placeholder="Enter job posting URL..."
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                      />
                      <Button 
                        onClick={() => toast({ title: "URL extracted!", description: "Job description extracted from URL." })}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        Extract from URL
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 border-purple-500/20 mb-8">
              <CardContent className="p-6">
                <Button
                  onClick={handleRecruitAnalysis}
                  disabled={isRecruitAnalyzing}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {isRecruitAnalyzing ? "Analyzing Candidates..." : "Match to Job"}
                </Button>
              </CardContent>
            </Card>

            {bulkResults.length > 0 && (
              <BulkResumeResults
                results={bulkResults}
                onViewDetails={handleViewDetails}
                onDownload={handleDownload}
              />
            )}
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume History</h2>
                <p className="text-gray-400">View and manage all analyzed resumes with filtering and version control.</p>
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
            </div>

            <Card className="bg-black/20 border-purple-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="w-5 h-5 text-cyan-400 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
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
                      <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/30">
                        <SelectItem value="all" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">All Time</SelectItem>
                        <SelectItem value="today" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Today</SelectItem>
                        <SelectItem value="week" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">This Week</SelectItem>
                        <SelectItem value="month" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">This Month</SelectItem>
                        <SelectItem value="quarter" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">This Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Fit Score</label>
                    <Select value={fitScore} onValueChange={setFitScore}>
                      <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/30">
                        <SelectItem value="all" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">All Scores</SelectItem>
                        <SelectItem value="high" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">High (80-100%)</SelectItem>
                        <SelectItem value="medium" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Medium (60-79%)</SelectItem>
                        <SelectItem value="low" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 focus:text-white">Low (0-59%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto">
                    <History className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">No analysis history yet</h3>
                    <p className="text-gray-400">
                      Upload your first resume to get started with AI-powered analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">ResumeAI Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to ResumeAI</h2>
          <p className="text-gray-400 text-lg">Powerful AI-driven resume analysis and job matching platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer"
                onClick={() => handleGetStarted(feature.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${feature.buttonColor} text-white transition-colors duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStarted(feature.id);
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-4 p-2 bg-black/20 rounded-2xl border border-purple-500/20">
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={activeSection === feature.id ? "default" : "ghost"}
                onClick={() => setActiveSection(feature.id)}
                className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                  activeSection === feature.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-purple-500/20'
                }`}
              >
                {feature.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="min-h-[600px]">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
