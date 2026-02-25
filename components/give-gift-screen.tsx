"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Heart,
  Mail,
  User,
  MessageSquare,
  Calendar,
  BookOpen,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BASE_SUBSCRIPTION_PLANS } from "@/lib/subscription-plans";

const giftOptions = BASE_SUBSCRIPTION_PLANS.map((plan, index) => {
  const bookLabel = `${plan.booksIncluded} book${plan.booksIncluded > 1 ? "s" : ""}`;
  const reelLabel = `${plan.reelsIncluded} reel${plan.reelsIncluded > 1 ? "s" : ""}`;

  const icon = index === 0 ? Mail : index === BASE_SUBSCRIPTION_PLANS.length - 1 ? Gift : BookOpen;

  return {
    id: plan.id,
    name: `${plan.name} Subscription`,
    description: `Gift ${plan.durationLabel} of Memory Vault with ${bookLabel} and ${reelLabel}.`,
    price: `$${plan.price.toFixed(2)}`,
    icon,
  };
});

const memoryBooks = [
  { id: "1", name: "Our Family Story 2024" },
  { id: "2", name: "Summer Adventures" },
  { id: "3", name: "Mom's 60th Birthday" },
];

export default function GiveGiftScreen() {
  const [selectedOption, setSelectedOption] = useState(giftOptions[0]?.id ?? "");
  const [selectedBook, setSelectedBook] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    message: "",
    deliveryDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Gift order placed!",
      description: "We'll notify you when the gift is sent.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="paper-texture min-h-0 pb-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-gold-light flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Give the Gift of Memories
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Share your cherished moments with loved ones through a beautiful memory book
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gift Options */}
          <Card className="memory-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Choose Gift Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="grid gap-4 sm:grid-cols-3"
              >
                {giftOptions.map((option) => (
                  <div key={option.id}>
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.id}
                      className={cn(
                        "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                        "hover:border-primary/50",
                        selectedOption === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors",
                        selectedOption === option.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}>
                        <option.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-foreground">{option.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        {option.description}
                      </p>
                      <p className="font-bold text-lg text-primary mt-3">{option.price}</p>
                      {selectedOption === option.id && (
                        <Check className="w-5 h-5 text-primary mt-2" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Select Memory Book */}
          <Card className="memory-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Select Memory Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a memory book to gift" />
                </SelectTrigger>
                <SelectContent>
                  {memoryBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Recipient Details */}
          <Card className="memory-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Heart className="w-5 h-5 text-destructive" />
                Recipient Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient's Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="recipientName"
                      name="recipientName"
                      placeholder="Jane Doe"
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="pl-10 input-warm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient's Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.recipientEmail}
                      onChange={handleChange}
                      className="pl-10 input-warm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Your Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    placeholder="John Doe"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="input-warm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date (Optional)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="deliveryDate"
                      name="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className="pl-10 input-warm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write a heartfelt message to accompany your gift..."
                    value={formData.message}
                    onChange={handleChange}
                    className="pl-10 input-warm min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-secondary/30 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold font-display text-foreground">
                {giftOptions.find((o) => o.id === selectedOption)?.price}
              </p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !selectedBook}
              className="btn-gold-gradient min-w-[200px] h-12"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Gift className="w-5 h-5 mr-2" />
                  Send Gift
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
