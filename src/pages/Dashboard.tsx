import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  Target, 
  Users, 
  BarChart3, 
  Clock, 
  Download,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Star,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  // State declarations
  const [activeSection, setActiveSection] = useState('overview');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jdText, setJdText] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [selectedJD, setSelectedJD] = useState('');
  const [recruitFiles, setRecruitFiles] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  
  // File input refs
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const jdFileRef = useRef<HTMLInputElement>(null);
  const recruitFileRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Mock data and handler functions
  const mockAnalysisResults = {
    atsScore: 85,
    overallMatch: 78,
    skills: {
      matched: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      missing: ['Python', 'AWS', 'Docker']
    },
    experience: {
      required: '3-5 years',
      candidate: '4 years',
      match: 'Good Match'
    },
    education: {
      required: "Bachelor's in Computer Science",
      candidate: "Bachelor's in Software Engineering",
      match: 'Strong Match'
    },
    strengths: [
      'Strong technical skills in modern web technologies',
      'Good project management experience',
      'Excellent communication skills'
    ],
    improvements: [
      'Add cloud computing experience (AWS/Azure)',
      'Include more specific project metrics',
      'Highlight leadership experience'
    ]
  };

  const mockHistory = [
    {
      id: 1,
      resumeName: 'John_Doe_Resume.pdf',
      jobTitle: 'Senior Frontend Developer',
      fitScore: 85,
      status: 'complete',
      date: '2024-01-15',
      company: 'Tech Corp'
    },
    {
      id: 2,
      resumeName: 'Jane_Smith_Resume.pdf', 
      jobTitle: 'Full Stack Developer',
      fitScore: 92,
      status: 'complete',
      date: '2024-01-14',
      company: 'StartupXYZ'
    },
    {
      id: 3,
      resumeName: 'Mike_Johnson_Resume.pdf',
      jobTitle: 'DevOps Engineer', 
      fitScore: 67,
      status: 'in-progress',
      date: '2024-01-13',
      company: 'CloudTech'
    }
  ];

  // File upload handlers
  const handleResumeFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            toast({
              title: "Resume uploaded successfully",
              description: `${file.name} has been processed.`
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleJDFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            toast({
              title: "Job Description uploaded successfully",
              description: `${file.name} has been processed.`
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleRecruitFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setRecruitFiles(prev => [...prev, ...fileArray]);
      toast({
        title: "Files uploaded successfully",
        description: `${fileArray.length} file(s) added for bulk analysis.`
      });
    }
  };

  const triggerResumeUpload = () => {
    resumeFileRef.current?.click();
  };

  const triggerJDUpload = () => {
    jdFileRef.current?.click();
  };

  const triggerRecruitUpload = () => {
    recruitFileRef.current?.click();
  };

  const handleGetStarted = (section: string) => {
    setActiveSection(section);
    // Scroll to the section
    setTimeout(() => {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({
            title: "Analysis Complete!",
            description: "Your resume analysis is ready."
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const exportToPDF = () => {
    toast({
      title: "Exporting to PDF",
      description: "Your analysis report will be downloaded shortly."
    });
  };

  const exportToCSV = () => {
    toast({
      title: "Exporting to CSV", 
      description: "Your data will be downloaded as CSV file."
    });
  };

  // Filter and sort history
  const filteredHistory = mockHistory
    .filter(item => {
      if (historyFilter !== 'all' && item.status !== historyFilter) return false;
      if (searchTerm && !item.resumeName.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'fitScore':
          return b.fitScore - a.fitScore;
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={resumeFileRef}
        onChange={handleResumeFileUpload}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <input
        type="file"
        ref={jdFileRef}
        onChange={handleJDFileUpload}
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
      />
      <input
        type="file"
        ref={recruitFileRef}
        onChange={handleRecruitFileUpload}
        accept=".pdf,.doc,.docx"
        multiple
        className="hidden"
      />

      {/* Header section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ResumeAI Dashboard</h1>
              <p className="text-gray-600">Analyze, optimize, and track your resume performance</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={exportToPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to ResumeAI</h2>
              <p className="text-blue-100 mb-4">
                Transform your job search with AI-powered resume analysis and optimization
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="secondary" 
                  onClick={() => handleGetStarted('resume-analysis')}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Analyses Done</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Resume Analysis</CardTitle>
              <CardDescription>
                Get detailed ATS scores and improvement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleGetStarted('resume-analysis')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Upload className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Upload Job Description</CardTitle>
              <CardDescription>
                Upload or paste job descriptions for targeted analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleGetStarted('upload-jd')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Target className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Match Analysis</CardTitle>
              <CardDescription>
                Compare resumes against specific job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleGetStarted('match-analysis')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Recruit</CardTitle>
              <CardDescription>
                Bulk analysis for multiple candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleGetStarted('recruit')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'resume-analysis', label: 'Resume Analysis', icon: FileText },
                { id: 'upload-jd', label: 'Upload JD', icon: Upload },
                { id: 'jd-extractor', label: 'JD Extractor', icon: FileText },
                { id: 'match-analysis', label: 'Match Analysis', icon: Target },
                { id: 'recruit', label: 'Recruit', icon: Users },
                { id: 'history', label: 'History', icon: Clock }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <div className="space-y-8">
          {/* Resume Analysis Section */}
          {activeSection === 'resume-analysis' && (
            <div id="resume-analysis">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Resume Analysis Engine
                  </CardTitle>
                  <CardDescription>
                    Upload your resume for comprehensive ATS analysis and optimization suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Resume</h3>
                    <p className="text-gray-500 mb-4">Drag and drop your resume or click to browse</p>
                    <Button onClick={triggerResumeUpload}>
                      Browse Files
                    </Button>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="flex-1">
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </Button>
                    <Button variant="outline" onClick={exportToPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analysis in progress...</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} />
                    </div>
                  )}

                  {analysisProgress === 100 && !isAnalyzing && (
                    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold">Analysis Results</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">ATS Score</Label>
                            <div className="flex items-center mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${mockAnalysisResults.atsScore}%` }}
                                />
                              </div>
                              <span className="ml-3 font-semibold">{mockAnalysisResults.atsScore}%</span>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Overall Match</Label>
                            <div className="flex items-center mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${mockAnalysisResults.overallMatch}%` }}
                                />
                              </div>
                              <span className="ml-3 font-semibold">{mockAnalysisResults.overallMatch}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Matched Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {mockAnalysisResults.skills.matched.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Missing Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {mockAnalysisResults.skills.missing.map((skill, index) => (
                                <Badge key={index} variant="destructive">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium">Strengths</Label>
                          <ul className="mt-2 space-y-1">
                            {mockAnalysisResults.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Improvements</Label>
                          <ul className="mt-2 space-y-1">
                            {mockAnalysisResults.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Upload Job Description Section */}
          {activeSection === 'upload-jd' && (
            <div id="upload-jd">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-6 w-6 mr-2 text-green-600" />
                    Upload Job Description
                  </CardTitle>
                  <CardDescription>
                    Add job descriptions by pasting text or uploading files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Paste Text</TabsTrigger>
                      <TabsTrigger value="file">Upload File</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="space-y-4">
                      <div>
                        <Label htmlFor="jd-text">Job Description Text</Label>
                        <Textarea
                          id="jd-text"
                          placeholder="Paste the job description here..."
                          className="min-h-[200px] mt-2"
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                        />
                      </div>
                      <Button className="w-full">
                        Save Job Description
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="file" className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Job Description</h3>
                        <p className="text-gray-500 mb-4">Support for PDF, DOC, DOCX, and TXT files</p>
                        <Button onClick={triggerJDUpload}>
                          Browse Files
                        </Button>
                      </div>

                      {uploadProgress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* JD Extractor Section */}
          {activeSection === 'jd-extractor' && (
            <div id="jd-extractor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-purple-600" />
                    Job Description Extractor
                  </CardTitle>
                  <CardDescription>
                    Extract and analyze key requirements from job descriptions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* How to Use Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-3">How to Use JD Extractor</h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                      <li>Upload your job description file or paste the text</li>
                      <li>Click "Extract Requirements" to analyze the content</li>
                      <li>Review the extracted skills, qualifications, and requirements</li>
                      <li>Use the extracted data for targeted resume optimization</li>
                      <li>Save or export the analysis for future reference</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="jd-input">Job Description</Label>
                        <Textarea
                          id="jd-input"
                          placeholder="Paste job description here or upload a file..."
                          className="min-h-[200px] mt-2"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={triggerJDUpload} variant="outline" className="flex-1">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                        <Button className="flex-1">
                          Extract Requirements
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Extracted Requirements</Label>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg min-h-[200px]">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900">Required Skills</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge>React</Badge>
                                <Badge>JavaScript</Badge>
                                <Badge>Node.js</Badge>
                                <Badge>TypeScript</Badge>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Experience Level</h4>
                              <p className="text-sm text-gray-600 mt-1">3-5 years of experience required</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Education</h4>
                              <p className="text-sm text-gray-600 mt-1">Bachelor's degree in Computer Science or related field</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Match Analysis Section */}
          {activeSection === 'match-analysis' && (
            <div id="match-analysis">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-6 w-6 mr-2 text-purple-600" />
                    Resume vs Job Description Analysis
                  </CardTitle>
                  <CardDescription>
                    Compare your resume against specific job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Select Resume</Label>
                      <Select value={selectedResume} onValueChange={setSelectedResume}>
                        <SelectTrigger className="mt-2 bg-white text-gray-900 border-gray-300">
                          <SelectValue placeholder="Choose a resume..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                          <SelectItem value="resume1" className="text-gray-900 hover:bg-gray-100">John_Doe_Resume.pdf</SelectItem>
                          <SelectItem value="resume2" className="text-gray-900 hover:bg-gray-100">Jane_Smith_Resume.pdf</SelectItem>
                          <SelectItem value="resume3" className="text-gray-900 hover:bg-gray-100">Mike_Johnson_Resume.pdf</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Select Job Description</Label>
                      <Select value={selectedJD} onValueChange={setSelectedJD}>
                        <SelectTrigger className="mt-2 bg-white text-gray-900 border-gray-300">
                          <SelectValue placeholder="Choose a job description..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                          <SelectItem value="jd1" className="text-gray-900 hover:bg-gray-100">Senior Frontend Developer - TechCorp</SelectItem>
                          <SelectItem value="jd2" className="text-gray-900 hover:bg-gray-100">Full Stack Developer - StartupXYZ</SelectItem>
                          <SelectItem value="jd3" className="text-gray-900 hover:bg-gray-100">DevOps Engineer - CloudTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!selectedResume || !selectedJD}>
                    Start Match Analysis
                  </Button>

                  {selectedResume && selectedJD && (
                    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold">Match Analysis Results</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">85%</div>
                          <div className="text-sm text-gray-600">Overall Match</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">92%</div>
                          <div className="text-sm text-gray-600">Skill Match</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600">78%</div>
                          <div className="text-sm text-gray-600">Experience Match</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Matched Requirements</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">React Development Experience</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">JavaScript Proficiency</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">Team Collaboration</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Missing Requirements</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="text-sm">AWS Cloud Experience</span>
                            </li>
                            <li className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="text-sm">Docker Containerization</span>
                            </li>
                            <li className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="text-sm">Agile Methodology</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button variant="outline" onClick={exportToPDF}>
                          <Download className="h-4 w-4 mr-2" />
                          Export Analysis
                        </Button>
                        <Button variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Share Results
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recruit Section */}
          {activeSection === 'recruit' && (
            <div id="recruit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-orange-600" />
                    Bulk Resume Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload multiple resumes for batch processing and comparison
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Multiple Resumes</h3>
                    <p className="text-gray-500 mb-4">Select multiple resume files for bulk analysis</p>
                    <Button onClick={triggerRecruitUpload}>
                      Browse Files
                    </Button>
                  </div>

                  {recruitFiles.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Uploaded Files ({recruitFiles.length})</h3>
                      <div className="space-y-2">
                        {recruitFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Badge variant="secondary">Ready</Badge>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button className="flex-1">
                          Start Bulk Analysis
                        </Button>
                        <Button variant="outline" onClick={() => setRecruitFiles([])}>
                          Clear All
                        </Button>
                      </div>
                    </div>
                  )}

                  {recruitFiles.length > 0 && (
                    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold">Analysis Results Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600">8</div>
                          <div className="text-sm text-gray-600">High Match (80%+)</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">5</div>
                          <div className="text-sm text-gray-600">Medium Match (60-79%)</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-red-600">2</div>
                          <div className="text-sm text-gray-600">Low Match (&lt;60%)</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* History Section */}
          {activeSection === 'history' && (
            <div id="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-blue-600" />
                    Analysis History
                  </CardTitle>
                  <CardDescription>
                    View and manage your previous resume analyses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Filter Controls */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Search by name or job title..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="min-w-[150px]">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select value={historyFilter} onValueChange={setHistoryFilter}>
                        <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                          <SelectItem value="all" className="text-gray-900 hover:bg-gray-100">All Status</SelectItem>
                          <SelectItem value="complete" className="text-gray-900 hover:bg-gray-100">Complete</SelectItem>
                          <SelectItem value="in-progress" className="text-gray-900 hover:bg-gray-100">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="min-w-[150px]">
                      <Label htmlFor="sort-by">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                          <SelectItem value="date" className="text-gray-900 hover:bg-gray-100">Date</SelectItem>
                          <SelectItem value="fitScore" className="text-gray-900 hover:bg-gray-100">Fit Score</SelectItem>
                          <SelectItem value="company" className="text-gray-900 hover:bg-gray-100">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="min-w-[150px]">
                      <Label htmlFor="date-range">Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                          <SelectItem value="all" className="text-gray-900 hover:bg-gray-100">All Time</SelectItem>
                          <SelectItem value="week" className="text-gray-900 hover:bg-gray-100">This Week</SelectItem>
                          <SelectItem value="month" className="text-gray-900 hover:bg-gray-100">This Month</SelectItem>
                          <SelectItem value="quarter" className="text-gray-900 hover:bg-gray-100">This Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* History List */}
                  <div className="space-y-4">
                    {filteredHistory.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <div>
                                <h3 className="font-medium text-gray-900">{item.resumeName}</h3>
                                <p className="text-sm text-gray-600">{item.jobTitle} at {item.company}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className={`text-lg font-bold ${
                                item.fitScore >= 80 ? 'text-green-600' : 
                                item.fitScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {item.fitScore}%
                              </div>
                              <div className="text-xs text-gray-500">Fit Score</div>
                            </div>
                            
                            <Badge variant={item.status === 'complete' ? 'default' : 'secondary'}>
                              {item.status === 'complete' ? (
                                <><CheckCircle className="h-3 w-3 mr-1" /> Complete</>
                              ) : (
                                <><Clock className="h-3 w-3 mr-1" /> In Progress</>
                              )}
                            </Badge>
                            
                            <div className="text-sm text-gray-500">
                              {item.date}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredHistory.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No analysis history found matching your filters.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Overview Section (Default) */}
          {activeSection === 'overview' && (
            <div id="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockHistory.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-sm">{item.resumeName}</p>
                            <p className="text-xs text-gray-600">{item.jobTitle}</p>
                          </div>
                        </div>
                        <Badge variant={item.fitScore >= 80 ? 'default' : 'secondary'}>
                          {item.fitScore}%
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => handleGetStarted('resume-analysis')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Analyze New Resume
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleGetStarted('upload-jd')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Job Description
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleGetStarted('match-analysis')}>
                      <Target className="h-4 w-4 mr-2" />
                      Start Match Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleGetStarted('recruit')}>
                      <Users className="h-4 w-4 mr-2" />
                      Bulk Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
