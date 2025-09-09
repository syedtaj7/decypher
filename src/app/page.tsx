import HeroSection from '@/components/HeroSection';
import WhatIsDecypher from '@/components/WhatIsDecypher';
import FeaturesSection from '@/components/FeaturesSection';
import ExtensionCTA from '@/components/ExtensionCTA';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <main className="overflow-hidden">
        <HeroSection />
        <WhatIsDecypher />
        <div id="features-anchor" className="scroll-mt-20"></div>
        <FeaturesSection />
        <ExtensionCTA />
      </main>
    </Layout>
  );
}
