
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EvaluationResult {
  time: string;
  dominantEmotion: string;
  engagementLevel: string;
}

const Results = () => {
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [overallEngagement, setOverallEngagement] = useState<string>("");
  const [emotionPercentages, setEmotionPercentages] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const storedResults = localStorage.getItem('evaluationResults');
    
    if (!storedResults) {
      navigate('/');
      return;
    }
    
    const parsedResults: EvaluationResult[] = JSON.parse(storedResults);
    
    // Map any emotions to just "Bored" or "Engaged"
    const mappedResults = parsedResults.map(result => ({
      ...result,
      dominantEmotion: mapToSimplifiedEmotion(result.dominantEmotion)
    }));
    
    setResults(mappedResults);
    
    // Calculate overall engagement
    const engagementLevels = mappedResults.map(r => r.engagementLevel);
    const highCount = engagementLevels.filter(level => level === 'High').length;
    const percentage = (highCount / engagementLevels.length) * 100;
    
    if (percentage > 70) {
      setOverallEngagement("Excellent");
    } else if (percentage > 50) {
      setOverallEngagement("Good");
    } else if (percentage > 30) {
      setOverallEngagement("Average");
    } else {
      setOverallEngagement("Needs Improvement");
    }
    
    // Calculate simplified emotion percentages (only Bored and Engaged)
    const emotions: Record<string, number> = {
      "Engaged": 0,
      "Bored": 0
    };
    
    mappedResults.forEach(result => {
      emotions[result.dominantEmotion]++;
    });
    
    Object.keys(emotions).forEach(emotion => {
      emotions[emotion] = parseFloat(((emotions[emotion] / mappedResults.length) * 100).toFixed(1));
    });
    
    setEmotionPercentages(emotions);
    
  }, [navigate]);

  // Helper function to map any emotion to either "Bored" or "Engaged"
  const mapToSimplifiedEmotion = (emotion: string): string => {
    const engagedEmotions = ["Happy", "Interested", "Excited"];
    return engagedEmotions.includes(emotion) ? "Engaged" : "Bored";
  };

  const handleNewAnalysis = () => {
    localStorage.removeItem('evaluationResults');
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
          
          <Tabs defaultValue="summary" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Overall Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-4">{overallEngagement}</div>
                      <p className="text-gray-600">Based on student emotions during the lecture</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md">
                  <CardHeader className="bg-cecos bg-opacity-5 pb-2">
                    <CardTitle className="text-cecos">Dominant Emotions</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {Object.entries(emotionPercentages).map(([emotion, percentage], index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className={`px-2 py-0.5 rounded ${getEmotionColor(emotion)}`}>
                              {emotion}
                            </span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-cecos h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
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
            
            <TabsContent value="detailed" className="animate-fade-in">
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
