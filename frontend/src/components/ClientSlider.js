import React , { useEffect, useState } from "react";

// import swiper react componenet
import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css
import "swiper/css";
import tr from "Services/tr";
import Cookies from "js-cookie";
const ClientSlider = ({ clients }) => {
  const [translatedData, setTranslatedData] = useState([]);
  useEffect(() => {
    const langto = Cookies.get("to");
    // fonction multiThreads
    const translateData = async () => {
      const translatedItems = await Promise.all(
        // pour exécuter plusieurs promesses en parallèle. Cela signifie que toutes les promesses à l'intérieur de Promise.all doivent se terminer avant que la fonction ne continue.
        clients.map(async (item) => {
          const it = item;
          if (langto != "fra" && langto) {
            it.name = await tr(item.name, "fra", langto);
            it.message = await tr(item.message, "fra", langto);
          }
          // Test de premiere fois : (data par default c'est fra)
          return { ...it };
        })
      );
      setTranslatedData(translatedItems);
    };

    translateData();
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1170: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {translatedData &&
        translatedData.map((client, index) => {
          // const { message , image , name ,position , borderColor}=client;
          //slide
          return (
            <SwiperSlide
              key={index}
              style={{ borderColor: client.borderColor }}
              className="border-t-[10px] rounded-t-[12px]"
            >
              {/* card */}
              <div
                className="w-full mx-auto lg:max-w-[300px] xl:max-w-[350px] h-[250px] rounded-[12px] border
             border-grey py-6 px-[30px]  "
              >
                {/* card message */}
                <div className=" dark:text-white mb-[30px] font-Quicksand font-medium">
                  {client.message}
                </div>
                {/* person name, img , position */}
                <div className="flex gap-x-[10px] items-center">
                  <img
                    className="w-[10%] rounded-xl"
                    src={`http://localhost:3001/Images/${client.image}`}
                    alt=""
                  />
                  <div className="dark:text-white font-bold font-Quicksand">
                    {client.name}
                  </div>
                  <div className="text-light font-Quicksand">
                    {client.position}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default ClientSlider;
