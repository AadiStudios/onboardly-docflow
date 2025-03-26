
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/common/FeatureCard';
import AnimatedCard from '@/components/common/AnimatedCard';
import { FileCheck, ShieldCheck, Clock, Users, UserCheck, FileText } from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: "Automated Document Verification",
      description: "Streamline the verification process with automated checks of identity documents, educational credentials and employment history.",
      icon: FileCheck
    },
    {
      title: "Secure Data Management",
      description: "Keep employee information secure with enterprise-grade encryption and compliance with Indian data protection regulations.",
      icon: ShieldCheck
    },
    {
      title: "Faster Onboarding",
      description: "Reduce onboarding time by up to 60% with streamlined workflows and automated verification processes.",
      icon: Clock
    },
    {
      title: "Collaborative HR Workflow",
      description: "Enable multiple HR team members to collaborate on employee onboarding with assigned roles and tasks.",
      icon: Users
    },
    {
      title: "Compliance Tracking",
      description: "Stay compliant with Indian labor laws and regulations through automated compliance tracking and reporting.",
      icon: UserCheck
    },
    {
      title: "Document Management",
      description: "Centralized repository for all employee documents with version control and access management.",
      icon: FileText
    }
  ];

  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Simplify employee onboarding in India
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Streamline Your <span className="text-primary">Employee Onboarding</span> Process
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Automate document verification, ensure compliance, and accelerate employee onboarding with our comprehensive HRMS solution designed for Indian companies.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/onboarding">Try Demo</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-16 md:mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-40 -bottom-1 z-10"></div>
            <AnimatedCard 
              className="mx-auto max-w-5xl overflow-hidden glass-card border border-white/20 shadow-soft"
            >
              <img 
                src="https://placehold.co/1200x600/f5f7ff/d0d7fc?text=Dashboard+Preview" 
                alt="OnboardFlow Dashboard" 
                className="w-full h-auto rounded object-cover"
              />
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-subtle-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 reveal opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to streamline HR operations
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers comprehensive features designed to make employee onboarding and document verification effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="reveal opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
                <FeatureCard 
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 relative overflow-hidden reveal opacity-0">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="currentColor" d="M45.7,-52.2C59.9,-40.6,72.5,-26.7,76.5,-10.2C80.5,6.4,76,25.5,65.7,40.3C55.5,55,39.7,65.3,22.4,70.2C5.1,75,-13.8,74.4,-30.5,67.9C-47.1,61.4,-61.6,49,-68.1,33.2C-74.6,17.3,-73.1,-2.1,-67.5,-19.9C-61.8,-37.7,-52,-54,-38.1,-65.5C-24.1,-77,-12.1,-83.8,1.4,-85.5C14.8,-87.2,31.6,-83.9,45.7,-72.2Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Ready to transform your employee onboarding experience?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Join thousands of HR professionals across India who are using OnboardFlow to streamline their onboarding process.
                </p>
              </div>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 min-w-36">
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
