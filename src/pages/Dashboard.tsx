import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  History, 
  Download, 
  BarChart3, 
  LogOut, 
  User,
  Target,
  Clock,
  Search,
  ArrowRight,
  Plus,
  Filter,
  Eye,
  Trash2,
  Users,
  Database
}  from "lucide-react";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState("text");
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("resume-analysis");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - replace with real API calls
  const stats = {
    resumesAnalyzed: 0, // This should come from API
    jobDescriptions: 0, // This should come from API
    matchesCreated: 0, // This should come from API
    reportsGenerated: 0, // This should come from API
    timeSaved: 0 // This should come from API in hours
  };

  const mockResumes = []; // This should come from API
  const mockJDs = []; // This should come from API
  const mockHistory = []; // This should come from API

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigateToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    // Scroll to the tabs section smoothly
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "Resume uploaded",
        description: `${file.name} ready for analysis.`,
      });
    }
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setBulkFiles(files);
    toast({
      title: "Bulk upload",
      description: `${files.length} resumes uploaded for bulk analysis.`,
    });
  };

  const handleAnalyzeResume = () => {
    if (selectedFile) {
      // Call API to analyze resume
      toast({
        title: "Analysis started",
        description: "Resume analysis is in progress...",
      });
    } else {
      toast({
        title: "No file selected",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
    }
  };

  const handleSaveJobDescription = () => {
    if (jobTitle && jobDescription) {
      // Call API to save job description
      toast({
        title: "Job description saved",
        description: "Job description has been saved successfully.",
      });
      setJobTitle("");
      setCompany("");
      setJobDescription("");
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in job title and description.",
        variant: "destructive",
      });
    }
  };

  const handleExtractJD = (platform: string) => {
    if (linkedinUrl.trim()) {
      // Call API to extract JD
      toast({
        title: `${platform} extraction`,
        description: `Extracting job description from ${platform}...`,
      });
    } else {
      toast({
        title: "URL required",
        description: "Please enter a job posting URL.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateMatch = () => {
    if (selectedResume && selectedJD) {
      // Call API to generate match
      toast({
        title: "Match analysis",
        description: "Generating detailed match analysis...",
      });
    } else {
      toast({
        title: "Selection required",
        description: "Please select both resume and job description.",
        variant: "destructive",
      });
    }
  };

  const handleBulkMatch = () => {
    if (bulkFiles.length > 0) {
      // Call API for bulk matching
      toast({
        title: "Bulk analysis started",
        description: `Processing ${bulkFiles.length} resumes for matching...`,
      });
    } else {
      toast({
        title: "No resumes uploaded",
        description: "Please upload resumes for bulk analysis.",
        variant: "destructive",
      });
    }
  };

  const handleExport = (format: 'csv' | 'pdf', section: string) => {
    // Call API to export data
    toast({
      title: "Export started",
      description: `Exporting ${section} data as ${format.toUpperCase()}...`,
    });
  };

  const statCards = [
    { 
      title: "Resumes Analyzed", 
      value: stats.resumesAnalyzed.toString(), 
      icon: <FileText className="w-6 h-6" />,
      color: "text-cyan-400"
    },
    { 
      title: "Job Descriptions", 
      value: stats.jobDescriptions.toString(), 
      icon: <Database className="w-6 h-6" />,
      color: "text-green-400"
    },
    { 
      title: "Matches Created", 
      value: stats.matchesCreated.toString(), 
      icon: <Target className="w-6 h-6" />,
      color: "text-blue-400"
    },
    { 
      title: "Reports Generated", 
      value: stats.reportsGenerated.toString(), 
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-purple-400"
    }
  ];

  const actionCards = [
    {
      title: "Resume Analysis Engine",
      description: "Upload and analyze candidate resumes with AI-powered insights",
      icon: <Upload className="w-8 h-8 text-cyan-400" />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500 hover:bg-cyan-600",
      sectionId: "resume-analysis"
    },
    {
      title: "Upload Job Description",
      description: "Add job descriptions for matching analysis",
      icon: <FileText className="w-8 h-8 text-green-400" />,
      color: "text-green-400",
      bgColor: "bg-green-500 hover:bg-green-600",
      sectionId: "job-desc"
    },
    {
      title: "JD Extractor",
      description: "Extract job descriptions from LinkedIn, Indeed, and Google Jobs",
      icon: <LinkIcon className="w-8 h-8 text-blue-400" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500 hover:bg-blue-600",
      sectionId: "jd-extractor"
    },
    {
      title: "Match Analysis",
      description: "Compare resumes with job descriptions for detailed analysis",
      icon: <Target className="w-8 h-8 text-orange-400" />,
      color: "text-orange-400",
      bgColor: "bg-orange-500 hover:bg-orange-600",
      sectionId: "match-analysis"
    },
    {
      title: "JD vs Resume",
      description: "Direct comparison between job description and resume",
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500 hover:bg-purple-600",
      sectionId: "jd-vs-resume"
    },
    {
      title: "Recruit",
      description: "Bulk resume analysis and candidate matching for recruitment",
      icon: <Users className="w-8 h-8 text-pink-400" />,
      color: "text-pink-400",
      bgColor: "bg-pink-500 hover:bg-pink-600",
      sectionId: "recruit"
    },
    {
      title: "History",
      description: "View and manage all analyzed resumes with filtering",
      icon: <History className="w-8 h-8 text-yellow-400" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500 hover:bg-yellow-600",
      sectionId: "history"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">SkillSync AI</span>
              </div>
              <div className="hidden md:block text-gray-400">|</div>
              <div className="hidden md:block text-white font-medium">Dashboard</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">user@example.com</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
        {/* Welcome Message */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm sm:text-base">Welcome to your SkillSync AI control center. Manage resumes, analyze job fits, and generate insights.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="bg-black/20 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">{stat.title}</p>
                    <p className={`text-xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`${stat.color} hidden sm:block`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {actionCards.map((card, index) => (
            <Card 
              key={index} 
              className="bg-black/20 border-purple-500/20 hover:border-purple-500/40 transition-all group cursor-pointer"
              onClick={() => handleNavigateToSection(card.sectionId)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:${card.color} transition-colors`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">{card.description}</p>
                <Button className={`w-full ${card.bgColor} text-white text-sm`}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-black/20 border-purple-500/20 mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-white text-lg sm:text-xl">Quick Start Guide</CardTitle>
            <CardDescription className="text-gray-400 text-sm sm:text-base">
              New to SkillSync AI? Follow these steps to get started with your first analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Upload Resume</h3>
                <p className="text-gray-400 text-sm">Start by uploading a candidate's resume for AI analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Add Job Description</h3>
                <p className="text-gray-400 text-sm">Upload or extract job descriptions for comparison</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Generate Match</h3>
                <p className="text-gray-400 text-sm">Create detailed matching analysis and export reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-purple-500">
            <TabsList className="bg-black/20 border-purple-500/20 grid grid-cols-7 w-full min-w-[800px]">
              <TabsTrigger value="resume-analysis" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                Resume Analysis Engine
              </TabsTrigger>
              <TabsTrigger value="job-desc" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                Upload Job Description
              </TabsTrigger>
              <TabsTrigger value="jd-extractor" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                JD Extractor
              </TabsTrigger>
              <TabsTrigger value="match-analysis" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                Match Analysis
              </TabsTrigger>
              <TabsTrigger value="jd-vs-resume" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                JD vs Resume
              </TabsTrigger>
              <TabsTrigger value="recruit" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                Recruit
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm px-2 sm:px-4">
                History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Resume Analysis Engine */}
          <TabsContent value="resume-analysis">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <CardTitle className="text-white">Resume Analysis Engine</CardTitle>
                    <CardDescription className="text-gray-400">
                      Upload and analyze candidate resumes with AI-powered insights
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'resume analysis')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'resume analysis')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 sm:p-8 text-center hover:border-purple-500/50 transition-colors">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="resume-upload" className="text-white font-medium cursor-pointer">
                      Drop your resume here or click to browse
                    </Label>
                    <p className="text-gray-400 text-sm">
                      Supports PDF, DOC, DOCX files up to 10MB
                    </p>
                  </div>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                
                {selectedFile && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">{selectedFile.name}</p>
                          <p className="text-gray-400 text-sm">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleAnalyzeResume}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Job Description */}
          <TabsContent value="job-desc">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Upload Job Description</CardTitle>
                    <CardDescription className="text-gray-400">
                      Add job descriptions for matching analysis. Upload as text or file format.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate('/jd-history')}>
                      <History className="w-4 h-4 mr-2" />
                      Show History
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'job descriptions')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'job descriptions')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Method Selection */}
                <div className="space-y-4">
                  <Label className="text-gray-300 text-lg font-semibold">Upload Method</Label>
                  <p className="text-gray-400 text-sm">Choose how you'd like to upload the job description</p>
                  <div className="flex space-x-4">
                    <Button
                      variant={uploadMethod === "text" ? "default" : "outline"}
                      onClick={() => setUploadMethod("text")}
                      className={uploadMethod === "text" ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Text Input
                    </Button>
                    <Button
                      variant={uploadMethod === "file" ? "default" : "outline"}
                      onClick={() => setUploadMethod("file")}
                      className={uploadMethod === "file" ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      File Upload
                    </Button>
                  </div>
                </div>

                {uploadMethod === "text" && (
                  <div className="space-y-6 p-6 bg-slate-800/50 rounded-lg border border-purple-500/20">
                    <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                      <FileText className="w-5 h-5" />
                      <span className="font-semibold">Enter Job Description</span>
                    </div>
                    <p className="text-gray-400 text-sm">Fill in the job details and description manually</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-title" className="text-gray-300">Job Title *</Label>
                        <Input
                          id="job-title"
                          placeholder="e.g., Senior Frontend Developer"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-300">Company</Label>
                        <Input
                          id="company"
                          placeholder="e.g., TechCorp Inc."
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="job-desc" className="text-gray-300">Job Description *</Label>
                      <Textarea
                        id="job-desc"
                        placeholder="Paste the full job description here including requirements, responsibilities, and qualifications..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={12}
                        className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500 resize-none"
                      />
                    </div>
                    
                    <Button
                      onClick={handleSaveJobDescription}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Save Job Description
                    </Button>
                  </div>
                )}

                {uploadMethod === "file" && (
                  <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="jd-upload" className="text-white font-medium cursor-pointer">
                        Drop your job description file here or click to browse
                      </Label>
                      <p className="text-gray-400 text-sm">
                        Supports PDF, DOC, DOCX, TXT files up to 10MB
                      </p>
                    </div>
                    <Input
                      id="jd-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* JD Extractor */}
          <TabsContent value="jd-extractor">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">JD Extractor</CardTitle>
                    <CardDescription className="text-gray-400">
                      Extract job descriptions directly from LinkedIn or Indeed job posting URLs.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'extracted jds')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'extracted jds')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* LinkedIn Extractor */}
                <div className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2 text-blue-400 mb-4">
                    <LinkIcon className="w-5 h-5" />
                    <span className="font-semibold">Job URL Extractor</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Enter a LinkedIn or Indeed job posting URL to extract the job description</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-url" className="text-gray-300">Job Posting URL</Label>
                      <Input
                        id="job-url"
                        placeholder="https://www.linkedin.com/jobs/view/1234567890 or https://www.indeed.com/viewjob?jk=..."
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => handleExtractJD('LinkedIn')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Extract from LinkedIn
                      </Button>
                      <Button
                        onClick={() => handleExtractJD('Indeed')}
                        className="flex-1 bg-blue-800 hover:bg-blue-900 text-white"
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Extract from Indeed
                      </Button>
                      <Button
                        onClick={() => handleExtractJD('Google Jobs')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Extract from Google Jobs
                      </Button>
                    </div>
                  </div>
                </div>

                {/* How to Use Guide */}
                <div className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20">
                  <h3 className="text-cyan-400 font-semibold mb-4">How to Use</h3>
                  <ol className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
                      <span>Navigate to a LinkedIn or Indeed job posting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                      <span>Copy the job posting URL from your browser's address bar</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
                      <span>Paste the URL into the input field above</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</span>
                      <span>Click "Extract Job Description" to automatically extract the content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</span>
                      <span>Review the extracted content and save it to your collection</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Match Analysis */}
          <TabsContent value="match-analysis">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Match Analysis</CardTitle>
                    <CardDescription className="text-gray-400">
                      Compare candidate resumes with job descriptions to get detailed matching analysis and fit scores.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'match analysis')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'match analysis')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Selection Panel */}
                  <div className="space-y-6 p-6 bg-slate-800/50 rounded-lg border border-purple-500/20">
                    <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">Select Items to Match</span>
                    </div>
                    <p className="text-gray-400 text-sm">Choose a resume and job description for comparison</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Select Resume</Label>
                        <Select value={selectedResume} onValueChange={setSelectedResume}>
                          <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                            <SelectValue placeholder="Choose a resume" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {mockResumes.length === 0 ? (
                              <SelectItem value="no-resumes" disabled>No resumes available</SelectItem>
                            ) : (
                              mockResumes.map((resume: any) => (
                                <SelectItem key={resume.id} value={resume.id}>{resume.filename}</SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300">Select Job Description</Label>
                        <Select value={selectedJD} onValueChange={setSelectedJD}>
                          <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                            <SelectValue placeholder="Choose a job description" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {mockJDs.length === 0 ? (
                              <SelectItem value="no-jds" disabled>No job descriptions available</SelectItem>
                            ) : (
                              mockJDs.map((jd: any) => (
                                <SelectItem key={jd.id} value={jd.id}>{jd.title}</SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button
                        onClick={handleGenerateMatch}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3"
                        disabled={!selectedResume || !selectedJD}
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Generate Match
                      </Button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="flex items-center justify-center p-8 bg-slate-800/50 rounded-lg border border-purple-500/20">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-cyan-400/20 flex items-center justify-center">
                        <Target className="w-12 h-12 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Match Analysis Yet</h3>
                      <p className="text-gray-400 max-w-md">
                        Select a resume and job description, then click "Generate Match" to see detailed compatibility analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JD vs Resume */}
          <TabsContent value="jd-vs-resume">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">JD vs Resume</CardTitle>
                    <CardDescription className="text-gray-400">
                      Direct comparison between job description and resume with instant analysis
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'jd vs resume')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'jd vs resume')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* JD Input */}
                  <div className="space-y-4">
                    <Label className="text-gray-300 text-lg font-semibold">Job Description</Label>
                    <Textarea
                      placeholder="Paste job description here..."
                      rows={12}
                      className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>
                  
                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <Label className="text-gray-300 text-lg font-semibold">Resume Upload</Label>
                    <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors h-full flex flex-col justify-center">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="jd-vs-resume-upload" className="text-white font-medium cursor-pointer">
                          Drop resume here or click to browse
                        </Label>
                        <p className="text-gray-400 text-sm">
                          PDF, DOC, DOCX files up to 10MB
                        </p>
                      </div>
                      <Input
                        id="jd-vs-resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyze Match
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recruit */}
          <TabsContent value="recruit">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Recruit</CardTitle>
                    <CardDescription className="text-gray-400">
                      Bulk resume analysis and candidate matching for recruitment teams
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'recruitment')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'recruitment')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Bulk Resume Upload */}
                  <div className="space-y-4">
                    <Label className="text-gray-300 text-lg font-semibold">Bulk Resume Upload</Label>
                    <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
                      <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="bulk-upload" className="text-white font-medium cursor-pointer">
                          Drop multiple resumes here or click to browse
                        </Label>
                        <p className="text-gray-400 text-sm">
                          Select multiple PDF, DOC, DOCX files (up to 50 files)
                        </p>
                      </div>
                      <Input
                        id="bulk-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={handleBulkUpload}
                        className="hidden"
                      />
                    </div>
                    {bulkFiles.length > 0 && (
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                        <p className="text-purple-400 font-medium">{bulkFiles.length} files selected</p>
                        <p className="text-gray-400 text-sm">Ready for bulk analysis</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Job Description */}
                  <div className="space-y-4">
                    <Label className="text-gray-300 text-lg font-semibold">Job Description</Label>
                    <Tabs defaultValue="text" className="space-y-4">
                      <TabsList className="bg-black/20 border-purple-500/20 grid grid-cols-3 w-full">
                        <TabsTrigger value="text">Text Input</TabsTrigger>
                        <TabsTrigger value="file">File Upload</TabsTrigger>
                        <TabsTrigger value="url">Extract URL</TabsTrigger>
                      </TabsList>
                      <TabsContent value="text">
                        <Textarea
                          placeholder="Paste job description..."
                          rows={8}
                          className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                        />
                      </TabsContent>
                      <TabsContent value="file">
                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center">
                          <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-white text-sm">Upload JD file</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="url">
                        <Input
                          placeholder="LinkedIn/Indeed job URL..."
                          className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                <Button
                  onClick={handleBulkMatch}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Match to Job
                </Button>
                
                {/* Results Area */}
                <div className="bg-slate-800/50 rounded-lg border border-purple-500/20 p-6">
                  <h3 className="text-white font-semibold mb-4">Bulk Analysis Results</h3>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No bulk analysis results yet</p>
                    <p className="text-gray-500 text-sm">Upload resumes and job description to see candidate rankings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Resume History</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage all analyzed resumes with filtering and version control.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv', 'history')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'history')}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filters */}
                <div className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Search by filename</Label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Search resumes..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Date Range</Label>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Fit Score</Label>
                      <Select value={scoreFilter} onValueChange={setScoreFilter}>
                        <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          <SelectItem value="all">All Scores</SelectItem>
                          <SelectItem value="high">90%+</SelectItem>
                          <SelectItem value="medium">70-89%</SelectItem>
                          <SelectItem value="low">Below 70%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* History List */}
                <div className="space-y-4">
                  {mockHistory.length === 0 ? (
                    <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-purple-500/20">
                      <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No analysis history yet</h3>
                      <p className="text-gray-500">
                        Upload your first resume to get started with AI-powered analysis.
                      </p>
                    </div>
                  ) : (
                    mockHistory.map((item: any, index: number) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg border border-purple-500/20 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{item.filename}</span>
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                                v{item.version}
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                              {item.date} • {item.match}% Match
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.score >= 90 ? 'bg-green-500/20 text-green-400' :
                              item.score >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {item.score}%
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
