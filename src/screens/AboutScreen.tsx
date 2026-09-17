import { AboutSection } from "@/components/AboutSection";

interface AboutScreenProps {
  onBack: () => void;
  onShowChangelog: () => void;
}

export function AboutScreen({ onBack, onShowChangelog }: AboutScreenProps) {
  return <AboutSection onBack={onBack} onShowChangelog={onShowChangelog} />;
}