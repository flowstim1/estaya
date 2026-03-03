import Hero from '@/components/Hero'
import FeaturedProperties from '@/components/FeaturedProperties'
import Categories from '@/components/Categories'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}