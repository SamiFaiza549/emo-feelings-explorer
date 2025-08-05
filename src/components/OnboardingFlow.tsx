import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Camera, Heart, TrendingUp } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Meet Your Friend!",
      content: (
        <div className="text-center space-y-6">
          <div className="text-8xl animate-bounce-gentle">🦋</div>
          <div className="space-y-4">
            <h2 className="text-child-large font-bold text-primary">
              Hi! I'm Luna! 
            </h2>
            <p className="text-child-friendly text-foreground">
              I'm here to help you learn about feelings and friends!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Adventures",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center space-x-4">
            <div className="bg-secondary/50 rounded-2xl p-4 animate-wiggle">
              <div className="text-4xl mb-2">🧸</div>
              <p className="text-sm">Sharing</p>
            </div>
            <div className="bg-accent/50 rounded-2xl p-4 animate-wiggle" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl mb-2">😊</div>
              <p className="text-sm">Feelings</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-4 animate-wiggle" style={{ animationDelay: '1s' }}>
              <div className="text-4xl mb-2">🤝</div>
              <p className="text-sm">Friends</p>
            </div>
          </div>
          <p className="text-child-friendly text-foreground">
            In EmoStory, you'll meet new friends and decide what to do in different situations!
          </p>
        </div>
      )
    },
    {
      title: "Show Your Feelings",
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-4 border-dashed border-primary/30">
              <Camera className="h-12 w-12 text-primary animate-bounce-gentle" />
            </div>
            <div className="absolute -top-2 -right-2 text-4xl animate-glow">😄</div>
          </div>
          <div className="space-y-4">
            <p className="text-child-friendly text-foreground">
              The app can see if you're smiling and tell you
            </p>
            <div className="text-child-large font-bold text-primary animate-bounce-gentle">
              "Great job!" 
            </div>
            <p className="text-child-friendly text-foreground">
              when you show kind expressions!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Grown-ups Help Too",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-secondary/50 to-accent/50 rounded-2xl p-6">
              <TrendingUp className="h-16 w-16 mx-auto text-primary mb-4" />
              <div className="flex space-x-2 justify-center">
                <Heart className="h-6 w-6 text-destructive fill-current" />
                <Heart className="h-6 w-6 text-destructive fill-current" />
                <Heart className="h-6 w-6 text-destructive fill-current" />
              </div>
            </div>
          </div>
          <p className="text-child-friendly text-foreground">
            Grown-ups can see your progress to help you grow!
          </p>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-primary scale-125'
                    : index < currentStep
                    ? 'bg-primary/60'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl min-h-96 flex flex-col justify-center">
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={prevStep}
            variant="outline"
            size="lg"
            disabled={currentStep === 0}
            className="btn-child focus-child"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </Button>

          <div className="text-child-friendly text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </div>

          <Button
            onClick={nextStep}
            size="lg"
            className="btn-child focus-child text-child-friendly"
          >
            {currentStep === steps.length - 1 ? (
              <>Let's Start! ✨</>
            ) : (
              <>
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};