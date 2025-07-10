
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Plus,
  ArrowRight,
  Database,
  Link,
  History,
  BarChart,
  Activity,
  Eye,
  Download,
  Globe,
  Percent
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [jdUploadProgress, setJdUploadProgress] = useState(0);
  const [showJdConfirm, setShowJdConfirm] = useState(false);
  const [selectedJdFile, setSelectedJdFile] = useState<File | null>(null);
  const [activeFeature, setActiveFeature] = useState<string>('resume-analysis');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [jdMethod, setJdMethod] = useState<'text' | 'file' | 'url'>('text');

  // Get user email on component mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    setUserEmail(email);
  }, []);

  const handleLogoClick = () => {
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

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedResume(file);
      toast({
        title: "Resume uploaded!",
        description: "Resume is ready for analysis.",
      });
    }
  };

  const handleJDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedJdFile(file);
      setShowJdConfirm(true);
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

  const handleAnalyzeResume = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockResults = {
      atsScore: 85,
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      highlightedSkills: ["React", "JavaScript", "AWS"],
      strengths: [
        "Strong technical skills in modern web development",
        "Good experience with cloud technologies",
        "Well-structured resume format"
      ],
      suggestions: [
        "Add more quantifiable achievements",
        "Include specific project metrics",
        "Highlight leadership experience"
      ],
      suggestedRoles: [
        "Senior Frontend Developer",
        "Full Stack Developer",
        "React Developer",
        "JavaScript Engineer"
      ]
    };

    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: "Resume has been analyzed successfully.",
    });
  };

  const handleExtractJD = async (platform: string) => {
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
    
    setIsGenerating(false);
    toast({
      title: "Match analysis complete!",
      description: "Detailed compatibility analysis has been generated.",
    });
  };

  const handleAnalyzeMatch = async () => {
    if (!jdText || !uploadedResume) {
      toast({
        title: "Missing content",
        description: "Please provide both job description and resume.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    toast({
      title: "Match analysis complete!",
      description: "Detailed comparison has been generated.",
    });
  };

  const handleSaveJD = () => {
    if (!jobTitle || !jdText) {
      toast({
        title: "Missing information",
        description: "Please fill in job title and description.",
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
    toast({
      title: `${format} Export`,
      description: `Analysis will be downloaded as ${format}.`,
    });
  };

  const features = [
    { id: 'resume-analysis', name: 'Resume Analysis Engine', active: true },
    { id: 'upload-jd', name: 'Upload Job Description', active: false },
    { id: 'jd-extractor', name: 'JD Extractor', active: false },
    { id: 'match-analysis', name: 'Match Analysis', active: false },
    { id: 'jd-vs-resume', name: 'JD vs Resume', active: false },
    { id: 'recruit', name: 'Recruit', active: false },
    { id: 'history', name: 'History', active: false }
  ];

  const renderFeatureSection = () => {
    switch (activeFeature) {
      case 'resume-analysis':
        return (
          <div className="space-y-8">
            {/* Upload Section */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl">Resume Analysis Engine</CardTitle>
                    <CardDescription className="text-gray-400">
                      Upload and analyze candidate resumes with AI-powered insights
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
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
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6 p-8 border-2 border-dashed border-purple-500/30 rounded-lg">
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
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                      <p className="text-white font-medium">{files.length} file(s) uploaded</p>
                      <Button
                        onClick={handleAnalyzeResume}
                        disabled={isAnalyzing}
                        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        <Brain className="w-4 h-4 mr-2" />
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

            {/* Analysis Results */}
            {analysisResults && (
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ATS Score */}
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="w-32 h-32 rounded-full border-8 border-gray-600 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">{analysisResults.atsScore}%</div>
                            <div className="text-sm text-gray-400">ATS Score</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Skills Found</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.skills.map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            className={`${
                              analysisResults.highlightedSkills.includes(skill)
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                                : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            }`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Strengths */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Strengths</h4>
                      <ul className="space-y-2">
                        {analysisResults.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start text-gray-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Suggestions</h4>
                      <ul className="space-y-2">
                        {analysisResults.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="flex items-start text-gray-300 text-sm">
                            <TrendingUp className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggested Roles */}
                    <div className="md:col-span-2">
                      <h4 className="text-white font-semibold mb-3">Suggested Job Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.suggestedRoles.map((role: string, index: number) => (
                          <Badge
                            key={index}
                            className="bg-green-500/20 text-green-400 border-green-500/30"
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'upload-jd':
        return (
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">Upload Job Description</CardTitle>
                  <CardDescription className="text-gray-400">
                    Add job descriptions for matching analysis. Upload as text or file format.
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
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
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
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
        );

      case 'jd-extractor':
        return (
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">JD Extractor</CardTitle>
                  <CardDescription className="text-gray-400">
                    Extract job descriptions directly from LinkedIn or Indeed job posting URLs.
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
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
                  onClick={() => handleExtractJD('LinkedIn')}
                  disabled={isExtracting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link className="w-4 h-4 mr-2" />
                  {isExtracting ? "Extracting..." : "Extract from LinkedIn"}
                </Button>
                
                <Button
                  onClick={() => handleExtractJD('Indeed')}
                  disabled={isExtracting}
                  className="bg-slate-600 hover:bg-slate-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isExtracting ? "Extracting..." : "Extract from Indeed"}
                </Button>
                
                <Button
                  onClick={() => handleExtractJD('Google Jobs')}
                  disabled={isExtracting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {isExtracting ? "Extracting..." : "Extract from Google Jobs"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'match-analysis':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Target className="w-6 h-6 text-cyan-400 mr-2" />
                      Select Items to Match
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose a resume and job description for comparison
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
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
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Select Resume</label>
                  <Select value={selectedResume} onValueChange={setSelectedResume}>
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                      <SelectValue placeholder="Choose a resume" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/30">
                      <SelectItem value="resume1">John Doe - Software Engineer</SelectItem>
                      <SelectItem value="resume2">Jane Smith - Frontend Developer</SelectItem>
                      <SelectItem value="resume3">Mike Johnson - Full Stack Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Select Job Description</label>
                  <Select value={selectedJD} onValueChange={setSelectedJD}>
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                      <SelectValue placeholder="Choose a job description" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/30">
                      <SelectItem value="jd1">Senior Frontend Developer - TechCorp</SelectItem>
                      <SelectItem value="jd2">Full Stack Developer - StartupXYZ</SelectItem>
                      <SelectItem value="jd3">React Developer - BigTech Inc</SelectItem>
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

            <Card className="bg-black/20 border-purple-500/20">
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
            </Card>
          </div>
        );

      case 'jd-vs-resume':
        return (
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">JD vs Resume</CardTitle>
                  <CardDescription className="text-gray-400">
                    Direct comparison between job description and resume with instant analysis
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
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
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Job Description Section */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Job Description</h3>
                  <Textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste job description here..."
                    rows={12}
                    className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 mb-4"
                  />
                </div>

                {/* Resume Upload Section */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Resume Upload</h3>
                  <div className="text-center space-y-4 p-8 border-2 border-dashed border-purple-500/30 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-purple-400" />
                    </div>
                    
                    <div>
                      <p className="text-white font-medium">Drop resume here or click to browse</p>
                      <p className="text-gray-400 text-sm">PDF, DOC, DOCX files up to 10MB</p>
                    </div>

                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload-jd-vs"
                      />
                      <label htmlFor="resume-upload-jd-vs">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          <FileText className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
                    </div>

                    {uploadedResume && (
                      <div className="bg-black/20 rounded-lg p-3 border border-purple-500/20">
                        <p className="text-white text-sm">{uploadedResume.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAnalyzeMatch}
                disabled={isAnalyzing}
                className="w-full mt-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                <BarChart className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Analyzing Match..." : "Analyze Match"}
              </Button>
            </CardContent>
          </Card>
        );

      case 'recruit':
        return (
          <div className="space-y-8">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl">Recruit</CardTitle>
                    <CardDescription className="text-gray-400">
                      Bulk resume analysis and candidate matching for recruitment
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
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
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Resume Upload */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Upload Resumes</h3>
                    <div className="text-center space-y-4 p-6 border-2 border-dashed border-purple-500/30 rounded-lg">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 text-purple-400" />
                      </div>
                      
                      <div>
                        <p className="text-white font-medium">Drop multiple resumes here</p>
                        <p className="text-gray-400 text-sm">PDF, DOC, DOCX files up to 10MB each</p>
                      </div>

                      <div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="bulk-resume-upload"
                        />
                        <label htmlFor="bulk-resume-upload">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <FileText className="w-4 h-4 mr-2" />
                            Browse Files
                          </Button>
                        </label>
                      </div>

                      {files.length > 0 && (
                        <div className="bg-black/20 rounded-lg p-3 border border-purple-500/20">
                          <p className="text-white text-sm">{files.length} resume(s) uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Job Description</h3>
                    <div className="space-y-4">
                      <div className="flex space-x-2 mb-4">
                        <Button
                          variant={jdMethod === 'text' ? 'default' : 'outline'}
                          onClick={() => setJdMethod('text')}
                          size="sm"
                          className={jdMethod === 'text' 
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                            : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                          }
                        >
                          Text
                        </Button>
                        <Button
                          variant={jdMethod === 'file' ? 'default' : 'outline'}
                          onClick={() => setJdMethod('file')}
                          size="sm"
                          className={jdMethod === 'file' 
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                            : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                          }
                        >
                          File
                        </Button>
                        <Button
                          variant={jdMethod === 'url' ? 'default' : 'outline'}
                          onClick={() => setJdMethod('url')}
                          size="sm"
                          className={jdMethod === 'url' 
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                            : 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                          }
                        >
                          URL
                        </Button>
                      </div>

                      {jdMethod === 'text' && (
                        <Textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste job description here..."
                          rows={8}
                          className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                        />
                      )}

                      {jdMethod === 'file' && (
                        <div className="text-center p-6 border-2 border-dashed border-purple-500/30 rounded-lg">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleJDUpload}
                            className="hidden"
                            id="jd-file-upload"
                          />
                          <label htmlFor="jd-file-upload">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <FileText className="w-4 h-4 mr-2" />
                              Upload JD File
                            </Button>
                          </label>
                        </div>
                      )}

                      {jdMethod === 'url' && (
                        <div>
                          <Input
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                            placeholder="https://www.linkedin.com/jobs/view/..."
                            className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 mb-2"
                          />
                          <Button
                            onClick={() => handleExtractJD('URL')}
                            disabled={isExtracting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Link className="w-4 h-4 mr-2" />
                            {isExtracting ? "Extracting..." : "Extract from URL"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBulkAnalysis}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Start Bulk Analysis"}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Indicators */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Card className="bg-black/20 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Uploading resumes...</span>
                    <span className="text-purple-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </CardContent>
              </Card>
            )}

            {jdUploadProgress > 0 && jdUploadProgress < 100 && (
              <Card className="bg-black/20 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Processing JD...</span>
                    <span className="text-green-400">{jdUploadProgress}%</span>
                  </div>
                  <Progress value={jdUploadProgress} className="h-2" />
                </CardContent>
              </Card>
            )}

            {/* JD Confirmation Dialog */}
            {showJdConfirm && (
              <Card className="bg-black/20 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Confirm JD Upload</h4>
                      <p className="text-gray-400 text-sm">Ready to upload: {selectedJdFile?.name}</p>
                    </div>
                    <Button
                      onClick={confirmJDUpload}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload JD
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
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
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">History</CardTitle>
                  <CardDescription className="text-gray-400">
                    View and manage all analyzed resumes with filtering
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
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
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Analysis History</h3>
                <p className="text-gray-400">
                  Your analysis history will appear here once you start analyzing resumes.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = files.map((file, index) => ({
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
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `${files.length} resumes analyzed and ranked by fit score.`,
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
              <span className="text-gray-400">|</span>
              <span className="text-white">Dashboard</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to your SkillSync AI control center. Manage resumes, analyze job fits, and generate insights.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mx-auto mb-3">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-400">0</h3>
              <p className="text-gray-400 text-sm">Resumes Analyzed</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                <Database className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400">0</h3>
              <p className="text-gray-400 text-sm">Job Descriptions</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400">0</h3>
              <p className="text-gray-400 text-sm">Matches Created</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-purple-400">0</h3>
              <p className="text-gray-400 text-sm">Reports Generated</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 border-purple-500/20 group hover:border-cyan-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg">
                  <Upload className="w-6 h-6 text-cyan-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Resume Analysis Engine</h3>
              <p className="text-gray-400 text-sm mb-4">Upload and analyze candidate resumes with AI-powered insights</p>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 group hover:border-green-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Job Description</h3>
              <p className="text-gray-400 text-sm mb-4">Add job descriptions for matching analysis</p>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 group hover:border-blue-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg">
                  <Link className="w-6 h-6 text-blue-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">JD Extractor</h3>
              <p className="text-gray-400 text-sm mb-4">Extract job descriptions from LinkedIn, Indeed, and Google Jobs</p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 group hover:border-orange-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Match Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">Compare resumes with job descriptions for detailed analysis</p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Second Row of Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border-purple-500/20 group hover:border-purple-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
                  <BarChart className="w-6 h-6 text-purple-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">JD vs Resume</h3>
              <p className="text-gray-400 text-sm mb-4">Direct comparison between job description and resume</p>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 group hover:border-pink-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-pink-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Recruit</h3>
              <p className="text-gray-400 text-sm mb-4">Bulk resume analysis and candidate matching for recruitment</p>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 group hover:border-yellow-500/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg">
                  <History className="w-6 h-6 text-yellow-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">History</h3>
              <p className="text-gray-400 text-sm mb-4">View and manage all analyzed resumes with filtering</p>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {features.map((feature) => (
            <Button
              key={feature.id}
              variant={activeFeature === feature.id ? "default" : "outline"}
              onClick={() => setActiveFeature(feature.id)}
              className={
                activeFeature === feature.id
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-full"
                  : "bg-black/20 border-purple-500/30 text-gray-400 hover:text-white hover:border-purple-500/50 px-6 py-3 rounded-full"
              }
            >
              {feature.name}
            </Button>
          ))}
        </div>

        {/* Feature Section */}
        <div className="mb-8">
          {renderFeatureSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
