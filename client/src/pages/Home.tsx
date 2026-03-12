import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Zap, Stethoscope, Users, Trophy, Globe, ArrowRight, Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "german",
      name: "Deutsch Lernen",
      description: "German Language A1-C1",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      courses: 24,
    },
    {
      id: "electrical",
      name: "Elektrotechnik",
      description: "Electrical Training & ISO Standards",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      courses: 18,
    },
    {
      id: "nursing",
      name: "Pflege auf Deutsch",
      description: "Nursing Education in German",
      icon: Stethoscope,
      color: "from-red-500 to-red-600",
      courses: 22,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Adaptive Learning",
      description: "AI-powered courses that adapt to your learning style and pace",
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Earn achievements, points, and climb the leaderboards",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with mentors, peers, and industry professionals",
    },
    {
      icon: Zap,
      title: "VR Simulations",
      description: "Immersive practical training in safe virtual environments",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Deutsch A1: Anfänger",
      category: "german",
      level: "A1",
      students: 1240,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Grundlagen der Elektrotechnik",
      category: "electrical",
      level: "Anfänger",
      students: 856,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Krankenpflege Grundlagen",
      category: "nursing",
      level: "Anfänger",
      students: 1102,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Deutsch B1: Mittelstufe",
      category: "german",
      level: "B1",
      students: 892,
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B2F</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">Bridge2TheFuture</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-slate-300 hover:text-white">Courses</Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">Community</Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">About</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with AI Engineer Avatar */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                  Learn from the <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Future</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Master German language (A1-C1), electrical engineering, and nursing with AI-powered personalized learning paths and immersive VR simulations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Explore Courses
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">64,000+</div>
                  <div className="text-slate-400">Active Learners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">195+</div>
                  <div className="text-slate-400">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-slate-400">Certifications</div>
                </div>
              </div>
            </div>

            {/* Right: AI Engineer Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 border border-slate-700">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663369880418/83vhAqWUSrpJG52MpW6U3Q/avatar-ai-engineer-futuristic-YeqjvZkvFvkjpi8jc52Z6w.webp"
                    alt="AI Engineer - Founder"
                    className="w-full rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-4 border border-slate-700">
                    <p className="text-white font-semibold">Raoued Fadhel</p>
                    <p className="text-sm text-slate-400">Founder & AI Engineer</p>
                    <p className="text-xs text-blue-400 mt-2">Transforming Education with AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{category.courses} Courses</Badge>
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Bridge2TheFuture?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-slate-800 border-slate-700 p-6 hover:border-blue-500 transition-colors">
                  <Icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white">Popular Courses</h2>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
              View All Courses <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center group-hover:from-slate-600 transition-colors">
                  <BookOpen className="w-12 h-12 text-slate-500 group-hover:text-slate-400" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">{course.level}</Badge>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{course.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{course.students.toLocaleString()} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Course
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Ready to Transform Your Future?</h2>
          <p className="text-xl text-blue-100">
            Join thousands of learners mastering German, electrical engineering, and nursing with AI-powered personalized education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Start Free Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Bridge2TheFuture</h4>
              <p className="text-slate-400 text-sm">Transforming education through AI and immersive learning.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">German Language</a></li>
                <li><a href="#" className="hover:text-white">Electrical Training</a></li>
                <li><a href="#" className="hover:text-white">Nursing Education</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Forums</a></li>
                <li><a href="#" className="hover:text-white">Mentorship</a></li>
                <li><a href="#" className="hover:text-white">Groups</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">© 2026 Bridge2TheFuture. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-slate-400 hover:text-white">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
