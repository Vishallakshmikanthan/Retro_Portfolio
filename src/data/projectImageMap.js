/**
 * Project Artwork & ASCII Image Mapping
 * 
 * Maps GitHub repository names to verified local ASCII graphics in public/images.
 * Provides a deterministic fallback for newly discovered GitHub repositories
 * so each repository always receives a consistent, stable retro aesthetic.
 */

export const curatedImageMap = {
  "Ambulance-Despatch-RL-Model": "/images/ambulance_ascii.png",
  "AI-Adaptive-Onboarding-Engine": "/images/ai_onboarding_ascii.png",
  "prompt-forge": "/images/prompt_forge_ascii.png",
  "NightSafe": "/images/nightsafe_ascii.png",
  "civic-issue-reporter": "/images/civic_ascii.png",
  "Starry-Night": "/images/starry_ascii.png",
  "Toursafe_Client": "/images/toursafe_ascii.png",
  "Apexera-25-DemoWeb": "/images/apexera_ascii.png",
  "AWS_AI_For_Bharat": "/images/aws_bharat_ascii.png",
  "bharat-mandi-sethu": "/images/mandi_ascii.png",
  "expense_tracker": "/images/cost_tracker_ascii.png",
  "HangmanGame": "/images/hangman_ascii.png",
  "Crowdsourced-Civic-lssue-Reporting-and-Resolution-System": "/images/civic_ascii.png",
  "CredHub": "/images/credhub_ascii.png",
  "PythonNumberGuessingGame": "/images/hangman_ascii.png",
  "sentinel-sea": "/images/toursafe_ascii.png",
  "Student-Management": "/images/cost_tracker_ascii.png",
  "task-manager-backend": "/images/credhub_ascii.png",
  "task-manager-frontend": "/images/apexera_ascii.png",
  "Toursafe_Authority": "/images/credhub_ascii.png",
  "versesofrahman": "/images/starry_ascii.png",
  "voice-ai-detector": "/images/ai_onboarding_ascii.png",
  "vox-verify": "/images/nightsafe_ascii.png",
};

export const retroFallbackImages = [
  "/images/ai_onboarding_ascii.png",
  "/images/ambulance_ascii.png",
  "/images/apexera_ascii.png",
  "/images/aws_bharat_ascii.png",
  "/images/civic_ascii.png",
  "/images/cost_tracker_ascii.png",
  "/images/credhub_ascii.png",
  "/images/hangman_ascii.png",
  "/images/mandi_ascii.png",
  "/images/nightsafe_ascii.png",
  "/images/prompt_forge_ascii.png",
  "/images/starry_ascii.png",
  "/images/toursafe_ascii.png",
];

/**
 * Deterministically resolves a project image path.
 * @param {string} repoName - GitHub repository name
 * @returns {string} Relative URL path to local ASCII image
 */
export function getProjectImage(repoName) {
  if (!repoName) return retroFallbackImages[0];

  // Case-insensitive curated match
  const lowerName = repoName.toLowerCase();
  for (const [key, imagePath] of Object.entries(curatedImageMap)) {
    if (key.toLowerCase() === lowerName) {
      return imagePath;
    }
  }

  // Deterministic retro hash fallback for unmapped repositories
  let hash = 0;
  for (let i = 0; i < repoName.length; i++) {
    hash = (hash << 5) - hash + repoName.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % retroFallbackImages.length;
  return retroFallbackImages[index];
}
