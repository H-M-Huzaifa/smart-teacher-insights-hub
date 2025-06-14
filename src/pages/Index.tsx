
import React from 'react';
import VideoUploader from '@/components/VideoUploader';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"; // AI technology and data analysis visualization

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero section */}
          <section className="mb-20">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto">
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-slide-up">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-cecos/10 rounded-full text-cecos text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-cecos rounded-full mr-2 animate-pulse"></span>
                    AI-Powered Education Technology
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                    Smart Teacher
                    <span className="block text-cecos bg-gradient-to-r from-cecos to-cecos-light bg-clip-text text-transparent">
                      Evaluation System
                    </span>
                  </h1>
                  <div className="w-32 h-1.5 bg-gradient-to-r from-cecos to-cecos-light mx-auto lg:mx-0 rounded-full"></div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl font-light">
                  Transform educational assessment with cutting-edge AI technology. Our advanced emotion recognition system 
                  provides real-time insights into student engagement and teaching effectiveness.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                  {[
                    { icon: "🎯", text: "Real-time Analysis", desc: "Instant feedback" },
                    { icon: "🧠", text: "AI-Driven Insights", desc: "Smart analytics" },
                    { icon: "📊", text: "Detailed Reports", desc: "Comprehensive data" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center lg:items-start space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <span className="text-sm font-semibold text-gray-900">{item.text}</span>
                      <span className="text-xs text-gray-500">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-r from-cecos via-cecos-light to-cecos rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                    <img
                      src={HERO_IMAGE_URL}
                      alt="AI technology and emotion recognition analysis dashboard"
                      className="rounded-2xl object-cover w-[400px] h-[280px] lg:w-[520px] lg:h-[340px]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Upload section */}
          <section className="mb-24">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Upload Your Teaching Video
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Experience the future of educational assessment. Our AI analyzes facial expressions, 
                engagement levels, and learning patterns to provide actionable insights.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <VideoUploader />
            </div>
          </section>
          
          {/* How it works section */}
          <section className="mb-24 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Our sophisticated AI system processes your teaching videos through advanced machine learning algorithms
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload & Process",
                  description: "Securely upload your classroom video. Our system supports multiple formats and automatically optimizes for analysis.",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description: "Advanced computer vision algorithms analyze facial expressions, engagement patterns, and learning indicators in real-time.",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  gradient: "from-cecos to-cecos-light"
                },
                {
                  step: "03",
                  title: "Insights & Reports",
                  description: "Receive comprehensive analytics with engagement metrics, emotion tracking, and personalized recommendations for improvement.",
                  icon: (
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  gradient: "from-green-500 to-green-600"
                },
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group">
                  <CardContent className="p-8 text-center relative h-full">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cecos to-cecos-light"></div>
                    <div className="absolute top-6 right-6 text-gray-100 font-bold text-5xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {item.step}
                    </div>
                    <div className={`rounded-2xl bg-gradient-to-br ${item.gradient} p-5 mx-auto w-20 h-20 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-light">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features section */}
          <section className="mb-16 max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 via-cecos-dark to-cecos rounded-3xl p-16 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cecos/20 to-cecos-light/20 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-8">Why Choose Our System?</h2>
                <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
                  Trusted by educators worldwide for accurate, reliable, and actionable insights
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "98%", subtitle: "Accuracy Rate", desc: "Industry-leading precision" },
                    { title: "Real-time", subtitle: "Processing", desc: "Instant analysis" },
                    { title: "24/7", subtitle: "Support", desc: "Always available" },
                    { title: "Secure", subtitle: "Platform", desc: "Enterprise-grade security" },
                  ].map((feature, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-3xl font-bold mb-2 text-cecos-lightest group-hover:scale-110 transition-transform">{feature.title}</div>
                      <div className="text-lg font-semibold text-white mb-1">{feature.subtitle}</div>
                      <div className="text-sm text-gray-300">{feature.desc}</div>
                    </div>
                  ))}
                </div>
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
