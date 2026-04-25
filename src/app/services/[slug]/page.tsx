import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ar } from '@/lib/i18n/ar'
import { en } from '@/lib/i18n/en'
import { services, getServiceBySlug } from '@/lib/services-data'
import ServiceDetail from '@/components/service-detail'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: `${service.title.ar} | ${service.title.en} — ${ar.site.brand} ${en.site.brand}`,
    description: service.description.en,
    openGraph: {
      title: `${service.title.en} — ${en.site.brand}`,
      description: service.description.en,
      url: `https://shubak.ai/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return <ServiceDetail slug={slug} />
}
