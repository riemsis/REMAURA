import HeroLanding from '../components/HeroLanding';
import HeroCarousel from '../components/HeroCarousel';
import LatestStrip from '../components/LatestStrip';

export default function Home(){
  return (
    <>
      <HeroLanding />
      <HeroCarousel />
      <LatestStrip />
    </>
  );
}
