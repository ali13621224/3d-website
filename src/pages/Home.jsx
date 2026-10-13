import BestSellers from '../components/home/BestSellers.jsx'
import CategoryCircles from '../components/home/CategoryCircles.jsx'
import EditorialBanners from '../components/home/EditorialBanners.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import PrivateSalon from '../components/home/PrivateSalon.jsx'
import TrustBar from '../components/home/TrustBar.jsx'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryCircles />
      <EditorialBanners />
      <BestSellers />
      <PrivateSalon />
    </>
  )
}
