import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const storedResults = localStorage.getItem('evaluationResults');
    const storedApiResults = localStorage.getItem('apiResults');
    
    if (!storedResults && !storedApiResults) {
      navigate('/');
      return;
    }
    
    // Handle legacy timestamped results if available
    if (storedResults) {
      const parsedResults: EvaluationResult[] = JSON.parse(storedResults);
      const mappedResults = parsedResults.map(result => ({
        ...result,
        dominantEmotion: mapToSimplifiedEmotion(result.dominantEmotion)
      }));
      setResults(mappedResults);
    }

    // Handle new API results format
    if (storedApiResults) {
      const parsedApiResults: APIResults = JSON.parse(storedApiResults);
      setApiResults(parsedApiResults);
    } else {
      // Create demo API results for testing
      const demoApiResults: APIResults = {
        total_frames: 1500,
        frames_processed: 1450,
        faces_detected: 1200,
        expressions_derived: 1180,
        engaged: 850,
        not_engaged: 330,
        percent_engaged: 72.03,
        percent_not_engaged: 27.97,
        TES: 7.2,
        engagement_level: "Very Good"
      };
      setApiResults(demoApiResults);
    }
    
  }, [navigate]);

  // Data for pie chart
  const engagementPieData = [
    { name: 'Engaged', value: apiResults?.engaged || 0, percentage: apiResults?.percent_engaged || 0 },
    { name: 'Not Engaged', value: apiResults?.not_engaged || 0, percentage: apiResults?.percent_not_engaged || 0 }
  ];

  // Data for processing metrics bar chart
  const processingData = [
    { name: 'Total Frames', value: apiResults?.total_frames || 0 },
    { name: 'Frames Processed', value: apiResults?.frames_processed || 0 },
    { name: 'Faces Detected', value: apiResults?.faces_detected || 0 },
    { name: 'Expressions Derived', value: apiResults?.expressions_derived || 0 }
  ];

  // Chart config
  const chartConfig = {
    engaged: {
      label: "Engaged",
      color: "#22c55e",
    },
    notEngaged: {
      label: "Not Engaged", 
      color: "#ef4444",
    },
  };

  // Colors for pie chart
  const COLORS = ['#22c55e', '#ef4444'];

  // Helper function to map any emotion to either "Bored" or "Engaged"
  const mapToSimplifiedEmotion = (emotion: string): string => {
    const engagedEmotions = ["Happy", "Interested", "Excited"];
    return engagedEmotions.includes(emotion) ? "Engaged" : "Bored";
  };

  const handleNewAnalysis = () => {
    localStorage.removeItem('evaluationResults');
    localStorage.removeItem('apiResults');
    navigate('/');
  };
  
  // Helper function to get color based on engagement level
  const getEngagementColor = (level: string): string => {
    switch (level) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get color based on emotion (simplified to just Bored and Engaged)
  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case 'Engaged': return 'bg-green-100 text-green-800';
      case 'Bored': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get color based on engagement classification
  const getClassificationColor = (classification: string): string => {
    switch (classification) {
      case 'Extraordinary': return 'bg-indigo-100 text-indigo-800';
      case 'Very Good': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Not Satisfactory': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-cecos mb-2 animate-slide-up">
              Evaluation Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Below are the results of the student emotion analysis from your uploaded lecture video
            </p>
          </section>
          
          <Tabs defaultValue="summary" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="timestamped">Timestamped Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Overall Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-4 ${getClassificationColor(apiResults?.engagement_level || "")} inline-block px-4 py-2 rounded-lg`}>
                        {apiResults?.engagement_level}
                      </div>
                      <p className="text-gray-600">Based on {apiResults?.percent_engaged}% engaged students</p>
                      <div className="mt-4">
                        <div className="text-2xl font-bold text-cecos">TES: {apiResults?.TES}</div>
                        <p className="text-sm text-gray-500">Teacher Evaluation Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Engagement Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="px-2 py-0.5 rounded bg-green-100 text-green-800">
                            Engaged
                          </span>
                          <span className="font-medium">{apiResults?.percent_engaged}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${apiResults?.percent_engaged || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800">
                            Not Engaged
                          </span>
                          <span className="font-medium">{apiResults?.percent_not_engaged}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${apiResults?.percent_not_engaged || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="shadow-md mb-8">
                <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                  <CardTitle className="text-cecos">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>Increase interactive elements during sections where engagement is low</li>
                    <li>Consider revisiting concepts when confusion levels are high</li>
                    <li>Maintain teaching strategies that result in high interest and engagement</li>
                    <li>Consider incorporating more visual aids to enhance understanding</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Engagement Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ChartContainer
                      config={chartConfig}
                      className="h-[300px]"
                    >
                      <PieChart>
                        <Pie
                          data={engagementPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
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

                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Processing Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ChartContainer
                      config={chartConfig}
                      className="h-[300px]"
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
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md">
                <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                  <CardTitle className="text-cecos">Engagement vs Non-Engagement</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={chartConfig}
                    className="h-[200px]"
                  >
                    <BarChart data={[
                      { name: 'Engaged', count: apiResults?.engaged || 0, color: '#22c55e' },
                      { name: 'Not Engaged', count: apiResults?.not_engaged || 0, color: '#ef4444' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="count" fill="#8884d8">
                        {[
                          { name: 'Engaged', count: apiResults?.engaged || 0, color: '#22c55e' },
                          { name: 'Not Engaged', count: apiResults?.not_engaged || 0, color: '#ef4444' }
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
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos text-lg">Processing Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Frames:</span>
                        <span className="font-semibold">{apiResults?.total_frames}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frames Processed:</span>
                        <span className="font-semibold">{apiResults?.frames_processed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Rate:</span>
                        <span className="font-semibold">
                          {apiResults ? Math.round((apiResults.frames_processed / apiResults.total_frames) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos text-lg">Detection Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Faces Detected:</span>
                        <span className="font-semibold">{apiResults?.faces_detected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expressions Derived:</span>
                        <span className="font-semibold">{apiResults?.expressions_derived}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Detection Rate:</span>
                        <span className="font-semibold">
                          {apiResults ? Math.round((apiResults.expressions_derived / apiResults.faces_detected) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos text-lg">Engagement Counts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Engaged:</span>
                        <span className="font-semibold text-green-600">{apiResults?.engaged}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Not Engaged:</span>
                        <span className="font-semibold text-red-600">{apiResults?.not_engaged}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold">
                          {(apiResults?.engaged || 0) + (apiResults?.not_engaged || 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timestamped" className="animate-fade-in">
              {results.length > 0 ? (
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Timestamped Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-cecos bg-opacity-10">
                            <th className="px-4 py-2 text-left">Timestamp</th>
                            <th className="px-4 py-2 text-left">Dominant Emotion</th>
                            <th className="px-4 py-2 text-left">Engagement Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              <td className="px-4 py-3">{result.time}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-sm ${getEmotionColor(result.dominantEmotion)}`}>
                                  {result.dominantEmotion}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-sm ${getEngagementColor(result.engagementLevel)}`}>
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
                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-gray-500">No timestamped data available</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-10">
            <Button 
              onClick={handleNewAnalysis}
              className="bg-cecos hover:bg-cecos-light text-white"
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
