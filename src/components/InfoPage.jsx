import { Button } from "@/components/ui/button"

const pages = {
  about: [
    "Headlindle is a daily news literacy puzzle. Each day presents 5 headlines — some are real news stories, others are fabricated or satirical. Your goal: identify which is which.",
    "Built to sharpen critical thinking in an age of misinformation, Headlindle draws from real events across science, culture, sports, politics, technology, and the bizarre. Real headlines link to Google searches so you can verify the story yourself.",
    "Created by Paul Trifan as a personal project in 2026. No ads, no tracking, no accounts. Just you, your instincts, and five headlines a day.",
    "The game is free and always will be. If you enjoy it, share your results and challenge your friends.",
  ],
  terms: [
    "By using Headlindle, you agree to the following terms. If you do not agree, do not use the game.",
    "Headlindle is provided free of charge for personal, non-commercial entertainment and educational purposes only. You may not reproduce, distribute, modify, or exploit any part of the game or its content for commercial purposes without prior written consent.",
    "All headline data is for informational and entertainment purposes. Real headlines are based on publicly available news articles and are presented with links for verification. Fabricated headlines are original works of fiction clearly labeled on reveal. Headlindle does not guarantee the accuracy, completeness, or timeliness of any headline or explanation.",
    "THE GAME IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. IN NO EVENT SHALL THE CREATOR BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM THE USE OF THE GAME.",
    "You agree not to use Headlindle for any unlawful purpose or in violation of any applicable laws. You also agree not to attempt to manipulate, reverse-engineer, or disrupt the game experience for others.",
    "These terms may be updated at any time. Continued use after changes constitutes acceptance of the new terms. If you have questions, contact trifanpaul99@gmail.com.",
  ],
  privacy: [
    "Headlindle takes your privacy seriously. This policy describes what information is collected and how it is handled.",
    "Headlindle does not collect, store, or transmit any personal data to any server. All game data — including your scores, streaks, saved results, and theme preference — is stored exclusively in your browser's localStorage. This data never leaves your device.",
    "Headlindle does not use cookies, tracking pixels, analytics services, or third-party scripts of any kind. No advertising networks, no social media buttons, no embedded third-party content. There are no logins, accounts, or user registrations.",
    "The game loads two font files (Inter and Playfair Display) from Google Fonts. According to Google, font requests are handled separately from other Google services and are not used for tracking. No other external resources are loaded.",
    "Headlindle is not intended for use by children under 13. If you are a parent or guardian and believe your child has provided personal data, contact trifanpaul99@gmail.com and any stored information will be addressed promptly.",
    "This privacy policy may be updated. Changes will be reflected on this page. Last updated: June 2026.",
  ],
  contact: [
    "Have feedback, a bug report, a headline suggestion, or just want to say hi? We'd love to hear from you.",
    "Email: trifanpaul99@gmail.com",
    "Headlindle is a solo project by Paul Trifan. Response times may vary, but every message is read and appreciated.",
    "If you're reporting a bug, please include your browser and device information so we can investigate. For headline suggestions, include the source URL if possible.",
  ],
}

export default function InfoPage({ page, onBack }) {
  const paragraphs = pages[page] || pages.about

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto animate-fadeUp">
      <h2 className="text-2xl font-bold mb-6 dark:text-slate-100">
        {page === "about" && "About"}
        {page === "terms" && "Terms of Service"}
        {page === "privacy" && "Privacy Policy"}
        {page === "contact" && "Contact"}
      </h2>
      <div className="w-full space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Button variant="outline" onClick={onBack} aria-label="Back" className="mt-8">
        Back
      </Button>
    </div>
  )
}
