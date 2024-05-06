import React, { useState } from "react";
import COVER_IMAGE from "../../assets/img/Login/Blue White Minimal Creative Illustration Short Link Application Online Instagram Story (4).png";
import Gogle from "../../assets/img/Login/th.jpg";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import { useLoginEntrepriseMutation } from "state/api";
const Login = () => {
  const navigate = useNavigate();
  const [loginEntreprise] = useLoginEntrepriseMutation();
  const [emailEnt, setEmailEnt] = useState("");
  const [passwordEnt, setPasswordEnt] = useState("");

  const handleChangeEmail = (e) => {
    setEmailEnt(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordEnt(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  };
  const hamdelSubmit = async (event) => {
    event.preventDefault();
    try {
      const Info = await loginEntreprise({
        email: emailEnt,
        password: passwordEnt,
      });
      const entrepriseInfo = Info.data.user
      if (entrepriseInfo.role === "admin") {
        localStorage.setItem('token', Info.data.jsenwebtkn);
        localStorage.setItem('userId', Info.data.user._id);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/login"); 
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-lg flex flex-col lg:flex-row mt-8  lg:ml-[285px] lg:mt-[150px] ">
        <div className="w-full lg:w-[350px]">
          <img
            src={COVER_IMAGE}
            className="w-full h-auto lg:rounded-l-lg lg:shadow-2xl"
            alt="Cover Image"
          />
        </div>
        <div className="w-full lg:w-1/2  bg-[#f5F5F5] p-8 lg:rounded-r-lg lg:shadow-2xl  ">
          <h2 className="text-4xl font-semibold mb-4">
            <span className="text-accent">L</span>ogin
          </h2>
          <p className="text-base mb-4">
            Bienvenue ! S'il vous plaît entrez vos coordonnées.
          </p>
          <form method="Post" onSubmit={hamdelSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              name="password"
              type="password"
              onChange={handleChangePassword}
              placeholder="Mot de passe"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Se souvenir de moi pendant 30 jours</p>
              </div>
              <p className="text-sm font-medium cursor-pointer underline">
                Mot de passe oublié
              </p>
            </div>
            <button className="w-full bg-[#060606] hover:bg-accent text-white rounded-md py-3 mb-4">
              Connexion
            </button>
          </form>

          <button
            className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 mb-4"
            onClick={handleRegisterClick}
          >
            Inscription
          </button>
          <div className="w-full text-center mb-4">
            <div className="w-full h-px bg-black"></div>
            <p className="relative inline-block px-2 bg-gray-200 text-sm">ou</p>
          </div>
          <button className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 flex items-center justify-center">
            <img src={Gogle} alt="" className="w-4 mr-2" />
            Inscription avec Google
          </button>
          <p className="mt-4 text-sm font-normal">
            Vous n'avez pas de compte{" "}
            <span className="font-semibold underline">
              Inscrivez-vous gratuitement
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
