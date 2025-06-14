
import React from 'react';
import VideoUploader from '@/components/VideoUploader';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=900&q=80"; // people and video screens

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero section */}
          <section className="mb-12">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2 text-center md:text-left animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-cecos mb-4 leading-tight">
                  Smart Teacher Evaluation System
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Revolutionizing teacher assessment with AI-powered emotion recognition and real-time engagement analysis in the digital classroom.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0 animate-fade-in">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Classroom video analysis illustration"
                  className="rounded-xl shadow-lg object-cover w-[340px] h-[210px] md:w-[410px] md:h-[260px] border-4 border-cecos-light bg-white"
                  loading="eager"
                />
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-center mb-8 text-cecos-dark">
              Upload Your Video for Analysis
            </h3>
            <VideoUploader />
          </section>
          
          <section className="mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6 text-cecos-dark">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Upload",
                  description: "Upload a video of the classroom teaching session",
                  icon: (
                    <svg className="h-8 w-8 text-cecos" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  ),
                },
                {
                  title: "Process",
                  description: "Our AI system analyzes student emotions throughout the lecture",
                  icon: (
                    <svg className="h-8 w-8 text-cecos" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ),
                },
                {
                  title: "Evaluate",
                  description: "Get detailed insights about student engagement and teaching effectiveness",
                  icon: (
                    <svg className="h-8 w-8 text-cecos" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="rounded-full bg-cecos bg-opacity-10 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-cecos-dark mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
