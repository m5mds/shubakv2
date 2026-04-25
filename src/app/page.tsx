import ServicesSection from '@/components/sections/services/ServicesSection'
import { HeroZpush } from '@/components/sections/Hero/HeroZpush'
import AboutSection from '@/components/sections/AboutSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CtaSection from '@/components/sections/CtaSection'

function HomepageSeam({ variant }: { variant: string }) {
  return (
    <div
      aria-hidden="true"
      className={`homepage-seam -my-16 h-32 md:-my-20 md:h-40 ${variant}`}
    />
  )
}

export default function HomePage() {
  return (
    <div className="homepage-shell w-full">
      <HeroZpush />
      <HomepageSeam variant="homepage-seam--hero-services" />
      <AboutSection />
      <HomepageSeam variant="homepage-seam--services-about" />
      <ServicesSection />
      <HomepageSeam variant="homepage-seam--about-process" />
      <ProcessSection />
      <HomepageSeam variant="homepage-seam--process-cta" />
      <ProjectsSection />
      <HomepageSeam variant="homepage-seam--projects-cta" />
      <CtaSection />
    </div>
  )
}
