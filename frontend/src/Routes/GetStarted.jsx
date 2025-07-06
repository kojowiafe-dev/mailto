import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, Users } from 'lucide-react';

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: [],
    agreeToTerms: false,
  });

  const features = [
    { id: 'ai-agents', label: 'AI Automation Agents', icon: Sparkles },
    { id: 'web-systems', label: 'Web Systems', icon: Zap },
    { id: 'data-analytics', label: 'Data Analytics', icon: Users },
    { id: 'security', label: 'Security Solutions', icon: Shield },
    { id: 'team-collaboration', label: 'Team Collaboration', icon: Users },
  ];

  const handleFeatureToggle = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Your AI Journey
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get Started with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Eventus
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your business with AI-powered automation. Let's build something extraordinary
            together.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-purple-600' : 'bg-gray-700'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">Step {currentStep} of 4</div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {currentStep === 1 && 'Tell us about your company'}
                {currentStep === 2 && 'What are your goals?'}
                {currentStep === 3 && "Let's discuss your project"}
                {currentStep === 4 && "You're All Set!"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {currentStep === 1 && 'Help us understand your business better'}
                {currentStep === 2 && 'Choose the features that matter most to you'}
                {currentStep === 3 && 'Share details about your specific needs'}
                {currentStep === 4 && 'Thank you for choosing Eventus 🚀'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleInputChange('industry', value)}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleInputChange('companySize', value)}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Features Selection */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Select the features you're interested in:
                      </Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature) => {
                          const Icon = feature.icon;
                          return (
                            <div
                              key={feature.id}
                              onClick={() => handleFeatureToggle(feature.id)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                formData.features.includes(feature.id)
                                  ? 'border-purple-500 bg-purple-500/20'
                                  : 'border-white/20 bg-white/5 hover:border-white/40'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    formData.features.includes(feature.id)
                                      ? 'text-purple-400'
                                      : 'text-gray-400'
                                  }`}
                                />
                                <span className="font-medium">{feature.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                        placeholder="Tell us about your project goals, challenges, and what you hope to achieve..."
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                        className="border-white/20"
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                        I agree to the terms and conditions and consent to being contacted about
                        this project.
                      </Label>
                    </div>
                  </motion.div>
                )}
                {/* Success Step */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                      <CheckCircle className="text-green-400 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
                    <p className="text-lg text-gray-300 max-w-md text-center">
                      We'll be in touch shortly. Your journey with{' '}
                      <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Eventus
                      </span>{' '}
                      starts now 🚀
                    </p>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between items-center pt-8 border-t border-white/20">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="text-white hover:bg-white/10"
                      >
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}
                    {currentStep === 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Submit Application
                        <Sparkles className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;
