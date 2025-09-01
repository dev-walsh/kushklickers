import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ReferralSectionProps {
  gameState: {
    username: string;
  };
}

export default function ReferralSection({ gameState }: ReferralSectionProps) {
  const [totalReferrals] = useState(0);
  const [referralRewards] = useState(0);
  const { toast } = useToast();

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${gameState.username}`);
    toast({
      title: "Username Copied!",
      description: "Share this with friends to earn referral rewards.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-users text-pink-500 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-referral-title">Referral System</h2>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl p-6 text-center border border-border" data-testid="stat-total-referrals">
          <i className="fas fa-gift text-4xl text-accent mb-3"></i>
          <div className="text-2xl font-bold text-foreground" data-testid="text-total-referrals">{totalReferrals}</div>
          <div className="text-muted-foreground text-sm">Total Referrals</div>
        </div>
        <div className="bg-card rounded-xl p-6 text-center border border-border" data-testid="stat-referral-rewards">
          <i className="fas fa-coins text-4xl text-primary mb-3"></i>
          <div className="text-2xl font-bold text-foreground" data-testid="text-referral-rewards">{referralRewards} KUSH</div>
          <div className="text-muted-foreground text-sm">Referral Rewards</div>
        </div>
      </div>

      {/* Referral Username */}
      <div className="bg-card rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <i className="fas fa-user text-purple-500"></i>
          <h3 className="font-semibold text-purple-500">Your Referral Username</h3>
        </div>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="text-foreground font-mono text-lg" data-testid="text-referral-username">
            @{gameState.username}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">Friends can enter your username when they join!</p>
        
        <button
          onClick={handleCopyUsername}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition-all duration-200"
          data-testid="button-copy-username"
        >
          <i className="fas fa-copy mr-2"></i>Copy Username
        </button>
      </div>

      {/* How Referrals Work */}
      <div className="bg-card rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-question-circle text-destructive"></i>
          <h3 className="font-semibold text-destructive">How Referrals Work</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-semibold text-foreground">Share Your Username</h4>
              <p className="text-muted-foreground text-sm">Tell friends your Telegram username</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-semibold text-foreground">They Enter Your Username</h4>
              <p className="text-muted-foreground text-sm">Friends use the /invite command with your username</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Earn Rewards</h4>
              <p className="text-muted-foreground text-sm">Get bonus KUSH for each active referral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Referrals */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-address-book text-primary"></i>
          <h3 className="font-semibold text-primary">Your Referrals</h3>
        </div>
        
        <div className="text-center py-8">
          <i className="fas fa-users text-4xl text-muted-foreground mb-3"></i>
          <p className="text-muted-foreground" data-testid="text-no-referrals">No referrals yet!</p>
        </div>
      </div>
    </div>
  );
}
