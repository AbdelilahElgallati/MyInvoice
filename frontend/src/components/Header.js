import React, { useEffect, useState } from "react";
import { header } from "../data";
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
import MobileNav from "../components/MobileNav";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetOneEntrepriseQuery } from "state/api";

const Header = () => {
  const navigate = useNavigate();
  const {data : entreprise } = useGetOneEntrepriseQuery(localStorage.getItem('userId'));
  const handleLoginClick = () => {
    // Redirige vers la page de connexion lorsque le bouton est cliqué
    navigate("/Login");
  };
  const [mobileNav, setMobileNav] = useState(false);
  const [isActive, setisActive] = useState(false);
  const { logo, btnText, btnTextDec, IconSun, IconMon, IconeHome } = header;
  //scrool event
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setisActive(true) : setisActive(false);
    };

    // Écoute le défilement de la fenêtre
    window.addEventListener("scroll", handleScroll);

    // Nettoie l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]); // Ajout de window.scrollY comme dépendance

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };
  
  // DARK MODE :
  
  const [theme, setTheme] = useState(localStorage.getItem("currentMode"));
   console.log(theme);
  useEffect(() => {
    const storedTheme = localStorage.getItem("currentMode");
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  function toggletheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Mettre à jour l'état theme
    localStorage.setItem("currentMode", newTheme); // Mettre à jour le stockage local
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  function toggleHome() {
    if (entreprise.role === "admin" && entreprise.status === "active"
    ) {
      navigate("/dashboard");
    } else if (entreprise.status === "active") {
      navigate("/dashboardClient");
    }
  }

  return (
    <header
      className={`${
        isActive
          ? "lg:top-0 top-0 bg-white shadow-sm z-10"
          : "lg:top-[0px] top-0 bg-white  z-10"
      } py-6 lg:py-4 fixed w-full transition-all dark:bg-black `}
    >
      <div className="container mx-auto flex justify-between items-center  ">
        <a
          href="#"
          data-aos="fade-down"
          data-aos-delay="200"
          className=" font-bodyfont inline-block relative mt-3 md:mt-0 ml-[25px]"
        >
          <Link
            to="/"
            data-aos="fade-down"
            data-aos-delay="100"
            className="font-bodyfont inline-block relative mt-3 md:mt-0 ml-25"
          >
            <img className="w-[160px]" src={logo} alt="Logo" />
          </Link>
        </a>

        <div
          className=" hidden lg:flex"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <Nav />
        </div>
      
        {!localStorage.getItem("userId") ? (
          <button
            className="btn btn-sm btn-outline hidden lg:flex"
            data-aos="fade-down"
            data-aos-delay="100"
            onClick={handleLoginClick}
          >
            {btnText}
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline hidden lg:flex"
            data-aos="fade-down"
            data-aos-delay="100"
            onClick={handleLogout}
          >
            {btnTextDec}
          </button>
        )}

        <button
          className="w-45 text-accent ml-[140px] lg:ml-[0px] "
          data-aos="fade-down"
          data-aos-delay="100"
          onClick={toggletheme}
        >
          {theme === "dark" ? IconSun : IconMon}
        </button>
        {localStorage.getItem("userId") ? (
          <button
            className="w-45 text-accent lg:ml-[0px]  "
            data-aos="fade-down"
            data-aos-delay="100"
            onClick={toggleHome}
          >
            {IconeHome}
          </button>
        ) : (
          " "
        )}
        <button className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-accent" />
          ) : (
            <HiMenuAlt4 className="text-3xl text-accent" />
          )}
        </button>
      </div>
     
      <div
        className={`${
          mobileNav ? "left-0" : "-left-full"
        }  fixed top-0 bottom-0 w-[60vw] 
      lg:hidden transition-all`}
      >
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
