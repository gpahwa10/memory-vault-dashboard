"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Heart,
  Mail,
  User,
  MessageSquare,
  Calendar,
  BookOpen,
  Loader2,
  Sparkles,
  MapPin,
  Phone,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const giftOptions = BASE_SUBSCRIPTION_PLANS.map((plan) => {
  const bookLabel = `${plan.booksIncluded} book${plan.booksIncluded > 1 ? "s" : ""}`;
  const reelLabel = `${plan.reelsIncluded} reel${plan.reelsIncluded > 1 ? "s" : ""}`;

  return {
    id: plan.id,
    name: `${plan.name} Subscription`,
    description: `${plan.durationLabel} • ${bookLabel} • ${reelLabel}`,
    price: plan.price,
  };
});

const giftDesigns = [
  { id: "1", name: "Classic Elegance" },
  { id: "2", name: "Modern Minimalist" },
  { id: "3", name: "Vintage Charm" },
  { id: "4", name: "Floral Dreams" },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

type GiftCardType = "digital" | "physical";

export default function GiveGiftScreen() {
  const [selectedSubscription, setSelectedSubscription] = useState(giftOptions[0]?.id ?? "");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [giftCardType, setGiftCardType] = useState<GiftCardType>("digital");
  const [selectedState, setSelectedState] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    // Sender Details
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    
    // Recipient Details
    recipientName: "",
    recipientEmail: "",
    
    // Gift Details
    message: "",
    deliveryDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFileName(file.name);
  };

  // Calculate pricing
  const selectedPlan = giftOptions.find((o) => o.id === selectedSubscription);
  const basePrice = selectedPlan?.price || 0;
  const physicalCardCharge = giftCardType === "physical" ? 50 : 0;
  const subtotal = basePrice + physicalCardCharge;
  const gstRate = 0.18; // 18% GST
  const gstAmount = selectedState ? subtotal * gstRate : 0;
  const totalAmount = subtotal + gstAmount;

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
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vault-teal/10 mb-5">
            <Gift className="w-9 h-9 text-vault-teal" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Give the Gift of Memories
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Share cherished moments with loved ones through a beautiful memory book
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subscription Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <Label htmlFor="subscription" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vault-gold" />
              Choose Gift Type
            </Label>
            <Select
              value={selectedSubscription}
              onValueChange={(value) => setSelectedSubscription(value as "1m" | "3m" | "6m" | "12m")}
            >
              <SelectTrigger className="w-full h-10 border-border bg-card hover:border-vault-teal/60 transition-colors">
                <SelectValue placeholder="Select subscription plan" />
              </SelectTrigger>
              <SelectContent>
                {giftOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="py-2">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium text-foreground">{option.name}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                      <div className="font-semibold text-vault-teal ml-4">
                        ₹{option.price.toFixed(2).toString()}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Gift Design Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <Label htmlFor="design" className="text-sm font-medium text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-vault-teal" />
              Select Gift Design
            </Label>
            <Select value={selectedDesign} onValueChange={setSelectedDesign}>
              <SelectTrigger className="w-full h-10 border-border bg-card hover:border-vault-teal/60 transition-colors">
                <SelectValue placeholder="Choose a design for your gift" />
              </SelectTrigger>
              <SelectContent>
                {giftDesigns.map((design) => (
                  <SelectItem key={design.id} value={design.id} className="py-2">
                    {design.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-border/70 my-8" />

          {/* Gift Card Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <Label className="text-sm font-medium text-foreground">
              Select gift card type
            </Label>
            <RadioGroup value={giftCardType} onValueChange={(value) => setGiftCardType(value as GiftCardType)}>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Physical Gift Card */}
                <div className="relative">
                  <RadioGroupItem
                    value="physical"
                    id="physical"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="physical"
                    className={cn(
                      "flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all",
                      "hover:border-vault-teal/50",
                      giftCardType === "physical"
                        ? "border-vault-teal bg-vault-teal/5 shadow-sm"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                        giftCardType === "physical" 
                          ? "border-vault-teal bg-vault-teal" 
                          : "border-border"
                      )}>
                        {giftCardType === "physical" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Physical gift card</div>
                        <div className="text-xs text-muted-foreground mb-2">(Additional charges of Rs 50)</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• India only</li>
                          <li>• 2-5 days delivery</li>
                          <li>• 24-hour express delivery for Mumbai</li>
                        </ul>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* Digital Gift Card */}
                <div className="relative">
                  <RadioGroupItem
                    value="digital"
                    id="digital"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="digital"
                    className={cn(
                      "flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all",
                      "hover:border-vault-teal/50",
                      giftCardType === "digital"
                        ? "border-vault-teal bg-vault-teal/5 shadow-sm"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                        giftCardType === "digital" 
                          ? "border-vault-teal bg-vault-teal" 
                          : "border-border"
                      )}>
                        {giftCardType === "digital" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-2">Digital gift card</div>
                        <p className="text-xs text-muted-foreground">
                          Your e-gift card will arrive in your email, you can forward it to the recipient anytime!
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-border/70 my-8" />

          {/* Sender Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-vault-teal" />
              Sender Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-xs text-muted-foreground">Your Name</Label>
                <Input
                  id="senderName"
                  name="senderName"
                  placeholder="John Doe"
                  value={formData.senderName}
                  onChange={handleChange}
                  className="h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderEmail" className="text-xs text-muted-foreground">Your Email</Label>
                <Input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className="h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderPhone" className="text-xs text-muted-foreground">Your Phone Number</Label>
              <Input
                id="senderPhone"
                name="senderPhone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.senderPhone}
                onChange={handleChange}
                className="h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                required
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-border/70 my-8" />

          {/* Recipient Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-vault-gold" />
              Recipient Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-xs text-muted-foreground">Recipient's Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="recipientName"
                    name="recipientName"
                    placeholder="Jane Doe"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="pl-10 h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientEmail" className="text-xs text-muted-foreground">Recipient's Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="pl-10 h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-xs text-muted-foreground">Delivery Date (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="pl-10 h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs text-muted-foreground">Personal Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write a heartfelt message to accompany your gift..."
                    value={formData.message}
                    onChange={handleChange}
                    className="pl-10 min-h-[100px] border-border focus:border-vault-teal focus:ring-vault-teal/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Optional video message
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-flex items-center gap-2 border-border text-foreground hover:border-vault-teal hover:bg-vault-teal/5"
                    onClick={() => document.getElementById("gift-video-upload")?.click()}
                  >
                    <Video className="h-4 w-4 text-vault-teal" />
                    Upload your video to congratulate them or gifting the other person
                  </Button>
                  {videoFileName && (
                    <p className="text-[11px] text-muted-foreground truncate">
                      Selected: <span className="font-medium text-foreground">{videoFileName}</span>
                    </p>
                  )}
                </div>
                <input
                  id="gift-video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-border/70 my-8" />

          {/* State Selection & Coupon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-xs text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-vault-teal" />
                  Select State (for GST calculation)
                </Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full h-10 border-border bg-card hover:border-vault-teal/60 transition-colors">
                    <SelectValue placeholder="Choose your state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coupon" className="text-xs text-muted-foreground">Coupon Code (if you have)</Label>
                <div className="flex gap-2">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="h-10 border-border focus:border-vault-teal focus:ring-vault-teal/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 px-6 border-vault-teal text-vault-teal hover:bg-vault-teal/5"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Price Breakdown & Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            {/* Price Summary */}
            <div className="rounded-2xl p-6 space-y-3 border border-border bg-card">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subscription</span>
                <span className="font-medium text-foreground">₹{basePrice.toFixed(2)}</span>
              </div>
              
              {giftCardType === "physical" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Physical Gift Card Charge</span>
                  <span className="font-medium text-foreground">₹{physicalCardCharge.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {selectedState && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium text-foreground">₹{gstAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="h-px bg-border/70 my-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-vault-teal">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !selectedDesign || !selectedState}
              className="w-full h-12 rounded-lg bg-vault-teal px-4 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark shadow-sm transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Gift className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}