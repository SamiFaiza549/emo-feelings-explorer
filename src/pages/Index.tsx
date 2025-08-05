import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { ProfileSelection } from "@/components/ProfileSelection";

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

type AppState = 'splash' | 'onboarding' | 'profile-selection' | 'main-app';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleSplashComplete = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppState('profile-selection');
  };

  const handleProfileSelect = (profile: Profile | null) => {
    setSelectedProfile(profile);
    setAppState('main-app');
  };

  // Render current app state
  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'onboarding':
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
    
    case 'profile-selection':
      return <ProfileSelection onProfileSelect={handleProfileSelect} />;
    
    case 'main-app':
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex items-center justify-center p-8">
          <div className="text-center space-y-8">
            {selectedProfile ? (
              <>
                <div className="text-8xl animate-bounce-gentle">{selectedProfile.avatar}</div>
                <h1 className="text-child-large font-bold text-primary">
                  Welcome back, {selectedProfile.name}! 🎉
                </h1>
                <p className="text-child-friendly text-muted-foreground">
                  Ready for more adventures?
                </p>
                <div className="text-4xl">🚧</div>
                <p className="text-child-friendly text-muted-foreground">
                  Scenario selection coming next!
                </p>
              </>
            ) : (
              <>
                <h1 className="text-child-large font-bold text-primary">
                  Parent/Therapist Dashboard 📊
                </h1>
                <p className="text-child-friendly text-muted-foreground">
                  Login functionality coming soon!
                </p>
              </>
            )}
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

export default Index;
