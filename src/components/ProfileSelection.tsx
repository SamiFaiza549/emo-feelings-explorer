import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Lock, ArrowLeft } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

interface ProfileSelectionProps {
  onProfileSelect: (profile: Profile | null) => void;
}

export const ProfileSelection = ({ onProfileSelect }: ProfileSelectionProps) => {
  const [profiles] = useState<Profile[]>([
    { id: "1", name: "Emma", avatar: "🌟" },
    { id: "2", name: "Alex", avatar: "🦄" },
  ]);
  
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🌈");

  const avatarOptions = ["🌈", "🦋", "🌟", "🦄", "🐸", "🐻", "🦊", "🐨", "🐼", "🐰", "🦁", "🐯"];

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: newProfileName.trim(),
        avatar: selectedAvatar
      };
      onProfileSelect(newProfile);
    }
  };

  const handleParentLogin = () => {
    // Navigate to parent login - for now just pass null
    onProfileSelect(null);
  };

  if (showCreateProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex flex-col items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <Card className="rounded-3xl shadow-2xl">
            <CardContent className="p-12 space-y-8">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-gentle">{selectedAvatar}</div>
                <h2 className="text-child-large font-bold text-primary mb-2">
                  Create Your Profile
                </h2>
                <p className="text-child-friendly text-muted-foreground">
                  What's your name, superstar?
                </p>
              </div>

              <div className="space-y-6">
                <Input
                  placeholder="Type your name here!"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="text-child-friendly p-6 rounded-2xl text-center focus-child"
                  maxLength={20}
                />

                <div className="space-y-4">
                  <p className="text-child-friendly text-center font-medium">
                    Choose your character:
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-4 rounded-2xl text-4xl btn-child focus-child transition-all ${
                          selectedAvatar === avatar
                            ? 'bg-primary/20 ring-4 ring-primary/50 scale-110'
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setShowCreateProfile(false)}
                  variant="outline"
                  size="lg"
                  className="flex-1 btn-child focus-child"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateProfile}
                  disabled={!newProfileName.trim()}
                  size="lg"
                  className="flex-1 btn-child focus-child text-child-friendly"
                >
                  Start Playing! 🎮
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4 animate-bounce-gentle">
            Who is Playing? 🎭
          </h1>
          <p className="text-child-large text-muted-foreground">
            Choose your profile to start your adventure!
          </p>
        </div>

        {/* Child Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {profiles.map((profile) => (
            <Card 
              key={profile.id}
              className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer btn-child"
              onClick={() => onProfileSelect(profile)}
            >
              <CardContent className="p-8 text-center">
                <div className="text-8xl mb-4 animate-wiggle">{profile.avatar}</div>
                <h3 className="text-child-large font-bold text-primary">
                  {profile.name}
                </h3>
                <p className="text-child-friendly text-muted-foreground mt-2">
                  Tap to play!
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Add New Profile */}
          <Card 
            className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer btn-child border-dashed border-2"
            onClick={() => setShowCreateProfile(true)}
          >
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4 text-muted-foreground">
                <Plus className="h-20 w-20 mx-auto animate-bounce-gentle" />
              </div>
              <h3 className="text-child-large font-bold text-primary">
                Add New Child
              </h3>
              <p className="text-child-friendly text-muted-foreground mt-2">
                Create a new profile
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Parent/Therapist Login */}
        <div className="text-center">
          <Button
            onClick={handleParentLogin}
            variant="outline"
            size="lg"
            className="btn-child focus-child bg-muted/30"
          >
            <Lock className="h-5 w-5 mr-2" />
            Parent/Therapist Login
          </Button>
        </div>
      </div>
    </div>
  );
};