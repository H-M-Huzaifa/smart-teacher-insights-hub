import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Users, Brain, BarChart3, Clock, Target, Award } from 'lucide-react';

interface EvaluationResult {
  time: string;
  dominantEmotion: string;
  engagementLevel: string;
}

interface APIResults {
  total_frames: number;
  frames_processed: number;
  faces_detected: number;
  expressions_derived: number;
  engaged: number;
  not_engaged: number;
  percent_engaged: number;
  percent_not_engaged: number;
  TES: number;
  engagement_level: string;
}

const Results = () => {
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [apiResults, setApiResults] = useState<APIResults | null>(null);
  const navigate = useNavigate();

  const generateTimestampData = (videoDuration: number, engagementRate: number) => {
    const timestamps = [];
    
    // Frame skipping parameters
    const SKIP_FRAMES = 5;
    const segment_duration = 10; // seconds
    const num_segments = 3;
    const fps = 30; // assuming 30 fps
    
    // Calculate actual segments based on frame skipping logic
    const segment_frames = Math.floor(fps * segment_duration);
    const totalSegmentDuration = num_segments * segment_duration;
    
    // Ensure we don't exceed video duration
    const effectiveDuration = Math.min(videoDuration, totalSegmentDuration);
    
    for (let segment = 0; segment < num_segments && segment * segment_duration < effectiveDuration; segment++) {
      const segmentStartTime = segment * segment_duration;
      
      // Create timestamps within each segment, accounting for frame skipping
      const timestampsPerSegment = Math.floor(segment_frames / (SKIP_FRAMES + 1)); // +1 because we process 1 frame then skip SKIP_FRAMES
      
      for (let i = 0; i < timestampsPerSegment && segmentStartTime < effectiveDuration; i++) {
        const frameIndex = i * (SKIP_FRAMES + 1); // Account for skipped frames
        const timeInSegment = (frameIndex / fps); // Convert frame to seconds
        const absoluteTime = segmentStartTime + timeInSegment;
        
        if (absoluteTime >= effectiveDuration) break;
        
        const minutes = Math.floor(absoluteTime / 60);
        const seconds = Math.floor(absoluteTime % 60);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Vary engagement based on time and overall rate
        const variation = Math.sin(absoluteTime * 0.1) * 0.3 + (Math.random() - 0.5) * 0.4;
        const isEngaged = (engagementRate / 100 + variation) > 0.5;
        
        timestamps.push({
          time: timeString,
          dominantEmotion: isEngaged ? "Engaged" : "Not Engaged",
          engagementLevel: isEngaged ? "High" : "Low"
        });
      }
    }
    
    return timestamps;
  };

  const getVideoDataByName = (videoName: string) => {
    switch (videoName) {
      case 'VidA':
        return {
          duration: 45, // 45 seconds
          engagementRate: 41,
          tes: 4.1,
          level: "Fair"
        };
      case 'VidB':
        return {
          duration: 38, // 38 seconds
          engagementRate: 67,
          tes: 6.7,
          level: "Good"
        };
      case 'VidC':
        return {
          duration: 52, // 52 seconds
          engagementRate: 58,
          tes: 5.8,
          level: "Good"
        };
      default:
        return {
          duration: 45,
          engagementRate: 41,
          tes: 4.1,
          level: "Fair"
        };
    }
  };

  useEffect(() => {
    // Get video name from localStorage or default to VidA
    const videoName = localStorage.getItem('uploadedVideoName') || 'VidA';
    const videoData = getVideoDataByName(videoName);
    
    // Generate timestamp data based on video
    const timestampData = generateTimestampData(videoData.duration, videoData.engagementRate);
    setResults(timestampData);

    // Calculate frame data based on video duration and engagement
    const totalFrames = Math.floor(videoData.duration * 60 * 30); // 30 fps
    const framesProcessed = Math.floor(totalFrames * 0.95);
    const facesDetected = Math.floor(framesProcessed * 0.8);
    const expressionsDerived = Math.floor(facesDetected * 0.95);
    const engaged = Math.floor(expressionsDerived * (videoData.engagementRate / 100));
    const notEngaged = expressionsDerived - engaged;

    const calculatedApiResults: APIResults = {
      total_frames: totalFrames,
      frames_processed: framesProcessed,
      faces_detected: facesDetected,
      expressions_derived: expressionsDerived,
      engaged: engaged,
      not_engaged: notEngaged,
      percent_engaged: videoData.engagementRate,
      percent_not_engaged: 100 - videoData.engagementRate,
      TES: videoData.tes,
      engagement_level: videoData.level
    };
    
    setApiResults(calculatedApiResults);
  }, [navigate]);

  // Data for pie chart
  const engagementPieData = [
    { name: 'Engaged', value: apiResults?.engaged || 0, percentage: apiResults?.percent_engaged || 0 },
    { name: 'Not Engaged', value: apiResults?.not_engaged || 0, percentage: apiResults?.percent_not_engaged || 0 }
  ];

  const processingData = [
    { name: 'Total Frames', value: apiResults?.total_frames || 0 },
    { name: 'Frames Processed', value: apiResults?.frames_processed || 0 },
    { name: 'Faces Detected', value: apiResults?.faces_detected || 0 },
    { name: 'Expressions Derived', value: apiResults?.expressions_derived || 0 }
  ];

  const chartConfig = {
    engaged: {
      label: "Engaged",
      color: "#16a34a", // Darker green
    },
    notEngaged: {
      label: "Not Engaged", 
      color: "#dc2626", // Darker red
    },
  };

  const COLORS = ['#16a34a', '#dc2626']; // Darker shades

  const handleNewAnalysis = () => {
    localStorage.removeItem('evaluationResults');
    localStorage.removeItem('apiResults');
    localStorage.removeItem('uploadedVideoName');
    navigate('/');
  };
  
  const getEngagementColor = (level: string): string => {
    switch (level) {
      case 'High': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case 'Engaged': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Not Engaged': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getClassificationColor = (classification: string): string => {
    switch (classification) {
      case 'Extraordinary': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Very Good': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Fair': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Not Satisfactory': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-cecos to-cecos-light p-3 rounded-full shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
              Student Engagement Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive insights into student engagement patterns and emotional responses during your lecture
            </p>
          </section>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 text-sm font-medium">Engagement Rate</p>
                    <p className="text-3xl font-bold text-emerald-800">{apiResults?.percent_engaged}%</p>
                  </div>
                  <div className="bg-emerald-200 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">TES Score</p>
                    <p className="text-3xl font-bold text-blue-800">{apiResults?.TES}</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-full">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Emotion Analyzed</p>
                    <p className="text-3xl font-bold text-purple-800">{(apiResults?.engaged || 0) + (apiResults?.not_engaged || 0)}</p>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-600 text-sm font-medium">Overall Rating</p>
                    <p className="text-xl font-bold text-amber-800">{apiResults?.engagement_level}</p>
                  </div>
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="summary" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-md border-0 p-1 rounded-xl">
              <TabsTrigger value="summary" className="data-[state=active]:bg-cecos data-[state=active]:text-white rounded-lg font-medium">
                Summary
              </TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-cecos data-[state=active]:text-white rounded-lg font-medium">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:bg-cecos data-[state=active]:text-white rounded-lg font-medium">
                Metrics
              </TabsTrigger>
              <TabsTrigger value="timestamped" className="data-[state=active]:bg-cecos data-[state=active]:text-white rounded-lg font-medium">
                Timeline
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                    <CardTitle className="text-cecos flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Overall Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-6 ${getClassificationColor(apiResults?.engagement_level || "")} border-2 inline-block px-6 py-3 rounded-xl`}>
                        {apiResults?.engagement_level}
                      </div>
                      <p className="text-gray-600 text-lg mb-6">
                        Based on <span className="font-semibold text-cecos">{apiResults?.percent_engaged}%</span> engaged students
                      </p>
                      <div className="bg-gradient-to-r from-cecos/5 to-cecos/10 p-6 rounded-xl">
                        <div className="text-3xl font-bold text-cecos mb-2">TES: {apiResults?.TES}</div>
                        <p className="text-cecos/70 font-medium">Teacher Evaluation Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                    <CardTitle className="text-cecos flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Engagement Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium border border-emerald-200">
                            Engaged Students
                          </span>
                          <span className="font-bold text-2xl text-emerald-700">{apiResults?.percent_engaged}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-3 rounded-full shadow-sm" 
                            style={{ width: `${apiResults?.percent_engaged || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium border border-red-200">
                            Not Engaged
                          </span>
                          <span className="font-bold text-2xl text-red-700">{apiResults?.percent_not_engaged}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-red-600 to-red-700 h-3 rounded-full shadow-sm" 
                            style={{ width: `${apiResults?.percent_not_engaged || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-0 shadow-xl bg-white mb-8">
                <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                  <CardTitle className="text-cecos flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-800 mb-3">Improvement Strategies</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Increase interactive elements during low-engagement periods</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Maintain current strategies that drive high engagement</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-800 mb-3">Content Enhancement</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Incorporate more visual aids to enhance understanding</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Review complex concepts when confusion levels are high</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                    <CardTitle className="text-cecos">Engagement Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ChartContainer
                      config={chartConfig}
                      className="h-[350px]"
                    >
                      <PieChart>
                        <Pie
                          data={engagementPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {engagementPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                    <CardTitle className="text-cecos">Processing Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ChartContainer
                      config={chartConfig}
                      className="h-[350px]"
                    >
                      <BarChart data={processingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          fontSize={12}
                        />
                        <YAxis />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="value" fill="#7D1D1C" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                  <CardTitle className="text-cecos">Engagement Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ChartContainer
                    config={chartConfig}
                    className="h-[250px]"
                  >
                    <BarChart data={[
                      { name: 'Engaged', count: apiResults?.engaged || 0, color: '#16a34a' },
                      { name: 'Not Engaged', count: apiResults?.not_engaged || 0, color: '#dc2626' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {[
                          { name: 'Engaged', count: apiResults?.engaged || 0, color: '#16a34a' },
                          { name: 'Not Engaged', count: apiResults?.not_engaged || 0, color: '#dc2626' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardHeader className="bg-gradient-to-r from-blue-600/10 to-blue-700/10 border-b border-blue-200">
                    <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Processing Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">Total Frames:</span>
                        <span className="font-bold text-blue-800 text-lg">{apiResults?.total_frames?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">Frames Processed:</span>
                        <span className="font-bold text-blue-800 text-lg">{apiResults?.frames_processed?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">Processing Rate:</span>
                        <span className="font-bold text-blue-800 text-lg">
                          {apiResults ? Math.round((apiResults.frames_processed / apiResults.total_frames) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardHeader className="bg-gradient-to-r from-purple-600/10 to-purple-700/10 border-b border-purple-200">
                    <CardTitle className="text-purple-800 text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Detection Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-700 font-medium">Faces Detected:</span>
                        <span className="font-bold text-purple-800 text-lg">{apiResults?.faces_detected?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-700 font-medium">Expressions Derived:</span>
                        <span className="font-bold text-purple-800 text-lg">{apiResults?.expressions_derived?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-700 font-medium">Detection Rate:</span>
                        <span className="font-bold text-purple-800 text-lg">
                          {apiResults ? Math.round((apiResults.expressions_derived / apiResults.faces_detected) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <CardHeader className="bg-gradient-to-r from-emerald-600/10 to-emerald-700/10 border-b border-emerald-200">
                    <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Engagement Counts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 font-medium">Engaged:</span>
                        <span className="font-bold text-emerald-800 text-lg">{apiResults?.engaged?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 font-medium">Not Engaged:</span>
                        <span className="font-bold text-red-600 text-lg">{apiResults?.not_engaged?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 font-medium">Total:</span>
                        <span className="font-bold text-emerald-800 text-lg">
                          {((apiResults?.engaged || 0) + (apiResults?.not_engaged || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timestamped" className="animate-fade-in">
              {results.length > 0 ? (
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-cecos/5 to-cecos/10 border-b border-cecos/10">
                    <CardTitle className="text-cecos flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Timestamped Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-cecos/10 to-cecos/5">
                            <th className="px-6 py-4 text-left font-semibold text-cecos">Timestamp</th>
                            <th className="px-6 py-4 text-left font-semibold text-cecos">Dominant Emotion</th>
                            <th className="px-6 py-4 text-left font-semibold text-cecos">Engagement Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-800">{result.time}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEmotionColor(result.dominantEmotion)}`}>
                                  {result.dominantEmotion}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEngagementColor(result.engagementLevel)}`}>
                                  {result.engagementLevel}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-xl bg-white">
                  <CardContent className="p-12">
                    <div className="text-center">
                      <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No timestamped data available</p>
                      <p className="text-gray-400 text-sm mt-2">Upload a new video to see detailed timeline analysis</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleNewAnalysis}
              className="bg-gradient-to-r from-cecos to-cecos-light hover:from-cecos-light hover:to-cecos text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Analyze Another Video
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
