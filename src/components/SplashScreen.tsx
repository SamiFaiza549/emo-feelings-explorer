import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Accessibility } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [showAccessibilityPrompt, setShowAccessibilityPrompt] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Immediate accessibility announcement
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to EmoStory! Tap here for accessibility options"
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);

    return () => clearTimeout(timer);
  }, []);

  const handleAccessibilityClick = () => {
    setShowAccessibilityPrompt(true);
  };

  const handleContinue = () => {
    if (loading) return;
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex flex-col items-center justify-center p-8 relative">
      {/* Accessibility Button - Always Visible */}
      <Button
        onClick={handleAccessibilityClick}
        className="absolute top-4 right-4 btn-child focus-child"
        variant="outline"
        size="lg"
        aria-label="Accessibility options"
      >
        <Accessibility className="h-6 w-6 mr-2" />
        <Volume2 className="h-5 w-5" />
      </Button>

      {/* Main Logo Area */}
      <div className="text-center space-y-8">
        {/* App Logo - Friendly Characters in Circle */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center animate-glow">
            <div className="text-6xl animate-bounce-gentle">
              🌟
            </div>
          </div>
          
          {/* Friendly characters around the logo */}
          <div className="absolute -top-4 -left-4 text-4xl animate-wiggle">😊</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-wiggle" style={{ animationDelay: '0.5s' }}>🤗</div>
          <div className="absolute -bottom-4 -left-4 text-4xl animate-wiggle" style={{ animationDelay: '1s' }}>😄</div>
          <div className="absolute -bottom-4 -right-4 text-4xl animate-wiggle" style={{ animationDelay: '1.5s' }}>🌈</div>
        </div>

        {/* App Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary animate-bounce-gentle">
            EmoStory
          </h1>
          <p className="text-child-large text-muted-foreground">
            Learn about feelings and friends!
          </p>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="space-y-4">
            <div className="character-skip text-4xl">🚶‍♀️</div>
            <p className="text-child-friendly text-primary font-medium">
              Loading EmoStory...
            </p>
          </div>
        )}

        {/* Continue Button */}
        {!loading && (
          <Button
            onClick={handleContinue}
            size="lg"
            className="btn-child focus-child text-child-large px-12 py-6 rounded-2xl"
            aria-label="Start EmoStory adventure"
          >
            Let's Begin! ✨
          </Button>
        )}
      </div>

      {/* Quick Accessibility Settings Popup */}
      {showAccessibilityPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
            <h2 className="text-child-large font-bold text-center text-primary">
              Accessibility Options
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-child-friendly">Read text aloud</label>
                <input type="checkbox" className="w-6 h-6 rounded focus-child" />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-child-friendly">Describe visuals</label>
                <input type="checkbox" className="w-6 h-6 rounded focus-child" />
              </div>
              
              <div className="space-y-2">
                <label className="text-child-friendly">Speaking speed</label>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🐢</span>
                  <input type="range" className="flex-1 focus-child" />
                  <span className="text-2xl">🐰</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setShowAccessibilityPrompt(false)}
              className="w-full btn-child focus-child text-child-friendly py-4"
              size="lg"
            >
              Done! Let's Go! 🎉
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};