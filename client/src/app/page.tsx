import BannerHome from "./components/homeComponents/banner";
// import BarSearchOffer from "./components/homeComponents/BarSearchOffer";
import OffersMapHome from "./components/homeComponents/OffersMapHome";
import MainBanner from "./components/homeComponents/bannerSearchHome/mainBanner";
export default function Home() {
  return (
    <div>
      <BannerHome />
      <MainBanner />
      <div className="w-full absolute top-[90%] md:top-[80%] flex justify-center items-center flex-wrap z-30">
        {/* <BarSearchOffer /> */}

        <OffersMapHome />
      </div>
    </div>
  );
}
