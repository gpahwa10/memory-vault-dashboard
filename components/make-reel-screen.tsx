"use client"

import { motion } from "framer-motion"
import { Play, Plus, Sparkles, ArrowRight, Video, Palette, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleReels = [
  {
    id: 1,
    title: "Summer Vacation 2024",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop",
    duration: "0:45",
  },
  {
    id: 2,
    title: "Family Reunion",
    thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=600&fit=crop",
    duration: "1:20",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop",
    duration: "0:55",
  },
  {
    id: 4,
    title: "Wedding Memories",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop",
    duration: "2:10",
  },
  {
    id: 5,
    title: "Road Trip Adventures",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=600&fit=crop",
    duration: "1:30",
  },
  {
    id: 6,
    title: "Holiday Season",
    thumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=600&fit=crop",
    duration: "0:50",
  },
];

const templates = [
  {
    id: 1,
    name: "Classic Memories",
    description: "Elegant transitions with soft music",
    icon: Palette,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    name: "Modern Vibes",
    description: "Trendy effects with upbeat tracks",
    icon: Sparkles,
    color: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    name: "Cinematic",
    description: "Film-like quality with dramatic music",
    icon: Video,
    color: "bg-secondary text-foreground",
  },
  {
    id: 4,
    name: "Musical Journey",
    description: "Sync your memories to your favorite songs",
    icon: Music,
    color: "bg-gold/10 text-gold",
  },
];

export default function MakeReelScreen() {
  return (
    <div className="paper-texture min-h-0 pb-8">
      <div className="space-y-8">
        {/* Hero Section with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary-foreground blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative z-10">
            <Video className="w-16 h-16 mx-auto mb-4 text-primary-foreground" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Create Stunning Memory Reels
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Transform your photos and videos into beautiful, shareable reels with just a few clicks.
            </p>
            <Button size="lg" className="btn-gold-gradient text-base h-12 px-8">
              <Plus className="w-5 h-5 mr-2" />
              Create New Reel
            </Button>
          </div>
        </motion.div>

        {/* Templates Section */}
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Choose a Template
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="memory-card cursor-pointer hover:border-primary transition-colors group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-xl ${template.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <template.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sample Reels - Infinite Scroll Style */}
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Sample Reels for Inspiration
          </h2>
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-4"
              animate={{ x: [0, -1200] }}
              transition={{ 
                x: { 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 20, 
                  ease: "linear" 
                } 
              }}
            >
              {[...sampleReels, ...sampleReels].map((reel, index) => (
                <div 
                  key={`${reel.id}-${index}`}
                  className="relative flex-shrink-0 w-48 group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-lg">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-primary-foreground text-sm font-medium truncate">{reel.title}</p>
                      <p className="text-primary-foreground/70 text-xs">{reel.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Static Grid of Sample Reels */}
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Browse All Samples
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sampleReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-lg">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-primary-foreground text-xs font-medium truncate">{reel.title}</p>
                    <p className="text-primary-foreground/70 text-xs">{reel.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-muted-foreground mb-4">Ready to create your own memory reel?</p>
          <Button size="lg" className="btn-primary-gradient">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
