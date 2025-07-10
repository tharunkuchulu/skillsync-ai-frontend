
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Users, 
  Target, 
  BarChart3, 
  Brain,
  ArrowRight,
  Plus,
  Search,
  Filter
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, section: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) uploaded successfully for ${section}.`,
      });
    }
  };

  const handleBrowseFiles = (section: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => handleFileUpload(e as any, section);
    input.click();
  };

  const featuredSections = [
    {
      title: "JD vs Resume",
      description: "Compare job descriptions with candidate resumes",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      route: "/jd-vs-resume",
      action: "Get Started"
    },
    {
      title: "Recruit",
      description: "Bulk resume analysis for recruitment teams",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      route: "/recruit",
      action: "Get Started"
    },
    {
      title: "Resume Analysis Engine",
      description: "AI-powered resume analysis and insights",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      route: "/resume-analysis-engine",
      action: "Get Started"
    },
    {
      title: "Match Analysis",
      description: "Advanced matching algorithms for better hiring",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      route: "/match-analysis",
      action: "Get Started"
    },
    {
      title: "JD Extractor",
      description: "Extract job descriptions from various sources",
      icon: Search,
      color: "from-indigo-500 to-purple-500",
      route: "/jd-extractor",
      action: "Get Started"
    },
    {
      title: "Upload Job Description",
      description: "Add new job descriptions to your collection",
      icon: Plus,
      color: "from-teal-500 to-blue-500",
      route: "/upload-job-description",
      action: "Get Started"
    }
  ];

  const recentAnalyses = [
    { id: 1, type: "JD vs Resume", candidate: "John Doe", score: 87, date: "2024-01-15", status: "Completed" },
    { id: 2, type: "Bulk Analysis", candidates: 15, avgScore: 76, date: "2024-01-14", status: "Completed" },
    { id: 3, type: "Resume Analysis", candidate: "Jane Smith", score: 92, date: "2024-01-13", status: "Completed" },
    { id: 4, type: "Match Analysis", candidate: "Mike Johnson", score: 84, date: "2024-01-12", status: "In Progress" },
  ];

  const filteredAnalyses = recentAnalyses.filter(analysis => {
    const matchesSearch = analysis.candidate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "completed" && analysis.status === "Completed") ||
                         (filterType === "progress" && analysis.status === "In Progress");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your recruitment analytics and job matching tools</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/20 border-purple-500/20 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => handleBrowseFiles('resume')}>
            <CardContent className="p-6 text-center">
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Upload Resume</h3>
              <p className="text-gray-400 text-sm">Browse files</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => handleBrowseFiles('job-description')}>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Upload JD</h3>
              <p className="text-gray-400 text-sm">Browse files</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => navigate('/recruit')}>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Bulk Analysis</h3>
              <p className="text-gray-400 text-sm">Analyze multiple</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/20 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => navigate('/match-analysis')}>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Quick Match</h3>
              <p className="text-gray-400 text-sm">Start matching</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSections.map((section, index) => (
              <Card 
                key={index} 
                className="bg-black/20 border-purple-500/20 hover:bg-black/30 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(section.route)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center mb-4`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(section.route);
                    }}
                  >
                    {section.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    placeholder="Search analyses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-black/20 border border-purple-500/30 text-white rounded-md px-3 py-2"
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="progress">In Progress</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{analysis.type}</h4>
                      <p className="text-gray-400 text-sm">
                        {analysis.candidate ? `${analysis.candidate}` : `${analysis.candidates} candidates`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={analysis.status === "Completed" ? "default" : "secondary"}
                      className={analysis.status === "Completed" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {analysis.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {analysis.score ? `${analysis.score}%` : `${analysis.avgScore}% avg`}
                      </p>
                      <p className="text-gray-400 text-sm">{analysis.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
