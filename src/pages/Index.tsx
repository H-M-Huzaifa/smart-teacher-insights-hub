
import React from 'react';
import VideoUploader from '@/components/VideoUploader';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80"; // classroom with students and teacher

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero section */}
          <section className="mb-16">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 animate-slide-up">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-cecos leading-tight">
                    Smart Teacher
                    <span className="block text-cecos-light">Evaluation System</span>
                  </h1>
                  <div className="w-24 h-1 bg-cecos mx-auto lg:mx-0 rounded-full"></div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Revolutionizing education assessment through AI-powered emotion recognition and real-time engagement analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center space-x-2 text-cecos">
                    <div className="w-2 h-2 bg-cecos rounded-full"></div>
                    <span className="text-sm font-medium">Real-time Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cecos">
                    <div className="w-2 h-2 bg-cecos rounded-full"></div>
                    <span className="text-sm font-medium">AI-Driven Insights</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cecos">
                    <div className="w-2 h-2 bg-cecos rounded-full"></div>
                    <span className="text-sm font-medium">Detailed Reports</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cecos to-cecos-light rounded-2xl blur opacity-20"></div>
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Classroom with teacher and students illustration"
                    className="relative rounded-2xl shadow-2xl object-cover w-[380px] h-[240px] lg:w-[480px] lg:h-[300px] border border-white"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Upload section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-cecos-dark mb-4">
                Upload Your Teaching Video
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get comprehensive insights into student engagement and teaching effectiveness with our advanced AI analysis
              </p>
            </div>
            <VideoUploader />
          </section>
          
          {/* How it works section */}
          <section className="mb-20 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cecos-dark mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered system analyzes your teaching videos in three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Video",
                  description: "Upload your classroom teaching session video in MP4, AVI, or MOV format",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description: "Our advanced AI processes facial expressions and analyzes student engagement patterns",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Get Insights",
                  description: "Receive comprehensive reports with engagement metrics and teaching effectiveness scores",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cecos to-cecos-light"></div>
                    <div className="absolute top-4 right-4 text-cecos-light/20 font-bold text-4xl">
                      {item.step}
                    </div>
                    <div className="rounded-full bg-gradient-to-br from-cecos to-cecos-light p-4 mx-auto w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-cecos-dark mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features section */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-cecos to-cecos-light rounded-3xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our System?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "95%", subtitle: "Accuracy Rate" },
                  { title: "Real-time", subtitle: "Processing" },
                  { title: "Detailed", subtitle: "Analytics" },
                  { title: "Easy", subtitle: "Integration" },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold mb-2">{feature.title}</div>
                    <div className="text-cecos-lightest">{feature.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
