// import React, { useState, useEffect } from "react";
// import COVER_IMAGE from "../../assets/img/Login/Blue White Minimal Creative Illustration Short Link Application Online Instagram Story (4).png";
// import Gogle from "../../assets/img/Login/th.jpg";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from "components/Header";
// import {
//   useLoginEntrepriseMutation,
//   useGetEntrepriseByGoogleIdQuery,
// } from "state/api";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loginEntreprise] = useLoginEntrepriseMutation();
//   const [userData, setUserData] = useState(null);
//   const [emailEnt, setEmailEnt] = useState("");
//   const [passwordEnt, setPasswordEnt] = useState("");
//   const [userId, setUserId] = useState(null);

//   const handleChangeEmail = (e) => {
//     setEmailEnt(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPasswordEnt(e.target.value);
//   };

//   const handleRegisterGoogle = (e) => {
//     e.preventDefault();
//     window.location.href = "http://localhost:3001/Api/auth/google/";
//   };

//   const handleRegisterClick = () => {
//     navigate("/Register");
//   };

//   const hamdelSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const Info = await loginEntreprise({
//         email: emailEnt,
//         password: passwordEnt,
//       });
//       const entrepriseInfo = Info.data.user;
//       if (
//         entrepriseInfo.role === "admin" &&
//         entrepriseInfo.status === "active"
//       ) {
//         localStorage.setItem("token", Info.data.jsenwebtkn);
//         localStorage.setItem("userId", Info.data.user._id);
//         navigate("/dashboard");
//       } else if (entrepriseInfo.status === "active") {
//         localStorage.setItem("token", Info.data.jsenwebtkn);
//         localStorage.setItem("userId", Info.data.user._id);
//         navigate("/dashboardClient");
//       }
//     } catch (error) {
//       console.log(error);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const userInfo = params.get("userId");
//     console.log('userId : ', userInfo)
//     setUserId(userInfo);
//     if (userId) {
//       const fetchData = async () => {
//         try {
//           const data = await useGetEntrepriseByGoogleIdQuery(userId);
//           setUserData(data);
//           console.log("data : ", userData)
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [location, userId]);

//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("userId", userData._id);
//       navigate("/dashboardClient");
//     }
//   }, [userData]);

//   return (
//     <>
//       <Header />
//       <div className=" flex flex-col lg:flex-row mt-8  lg:ml-[285px] lg:mt-[150px] ">
//         <div className=" dark:bg-black w-full lg:w-[350px]">
//           <img
//             src={COVER_IMAGE}
//             className="w-full h-auto lg:rounded-l-lg lg:shadow-2xl"
//             alt="Cover Image"
//           />
//         </div>
//         <div className="  dark:bg-black w-full lg:w-1/2  bg-[#f5F5F5] p-8 lg:rounded-r-lg lg:shadow-2xl  dark:text-white font-Quicksand font-semibold  ">
//           <h2 className="text-4xl font-semibold mb-4 dark:text-white">
//             <span className="text-accent">L</span>ogin
//           </h2>
//           <p className="text-base mb-4 dark:text-white font-Quicksand font-semibold">
//             Bienvenue ! S'il vous plaît entrez vos coordonnées.
//           </p>
//           <form method="Post" onSubmit={hamdelSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChangeEmail}
//               className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none dark:border dark:border-b-accent dark:text-white  "
//             />
//             <input
//               name="password"
//               type="password"
//               onChange={handleChangePassword}
//               placeholder="Mot de passe"
//               className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none dark:border dark:border-b-accent dark:text-white"
//             />
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 mr-2 dark:text-white "
//                 />
//                 <p className="text-sm dark:text-white font-Quicksand font-semibold  ">
//                   Se souvenir de moi pendant 30 jours
//                 </p>
//               </div>
//               <p className="text-sm font-medium cursor-pointer underline dark:text-white font-Quicksand font-semibold ">
//                 Mot de passe oublié
//               </p>
//             </div>
//             <button className="w-full bg-[#060606] hover:bg-accent text-white rounded-md py-3 mb-4 font-Quicksand font-semibold dark:border dark:border-accent">
//               Connexion
//             </button>
//           </form>

//           <button
//             className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 mb-4 "
//             onClick={handleRegisterClick}
//           >
//             Inscription
//           </button>
//           <div className="w-full text-center mb-4">
//             <div className="w-full h-px bg-black"></div>
//             <p className="relative inline-block px-2 bg-gray-200 text-sm dark:bg-black dark:text-accent">
//               ou
//             </p>
//           </div>
//           <button
//             className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 flex items-center justify-center"
//             onClick={handleRegisterGoogle}
//           >
//             <img src={Gogle} alt="" className="w-4 mr-2" />
//             Inscription avec Google
//           </button>
//           <p className="mt-4 text-sm font-normal">
//             Vous n'avez pas de compte{" "}
//             <span className="font-semibold underline">
//               Inscrivez-vous gratuitement
//             </span>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import COVER_IMAGE from "../../assets/img/Login/Blue White Minimal Creative Illustration Short Link Application Online Instagram Story (4).png";
import Gogle from "../../assets/img/Login/th.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from "components/Header";
import {
  useLoginEntrepriseMutation,
} from "state/api";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginEntreprise] = useLoginEntrepriseMutation();
  const [emailEnt, setEmailEnt] = useState("");
  const [passwordEnt, setPasswordEnt] = useState("");
  const [userId, setUserId] = useState(null);
  if(userId) {
    localStorage.setItem("userId", userId)
    navigate("/dashboardClient");
  }
  const handleChangeEmail = (e) => {
    setEmailEnt(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordEnt(e.target.value);
  };

  const handleRegisterGoogle = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3001/Api/auth/google/";
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
      const entrepriseInfo = Info.data.user;
      if (
        entrepriseInfo.role === "admin" &&
        entrepriseInfo.status === "active"
      ) {
        localStorage.setItem("token", Info.data.jsenwebtkn);
        localStorage.setItem("userId", Info.data.user._id);
        navigate("/dashboard");
      } else if (entrepriseInfo.status === "active") {
        localStorage.setItem("token", Info.data.jsenwebtkn);
        localStorage.setItem("userId", Info.data.user._id);
        navigate("/dashboardClient");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    console.log('user id: ', userId )
    setUserId(userId);
    if (userId) {
      return;
    }
    // const storedUserId = localStorage.getItem("userId");
    // console.log('storedUserId: ', storedUserId )
    // if (storedUserId) {
    //   navigate("/dashboardClient");
    // }
  }, [location, navigate, userId]);


  return (
    <>
      <Header />
      <div className=" flex flex-col lg:flex-row mt-8  lg:ml-[285px] lg:mt-[150px] ">
        <div className=" dark:bg-black w-full lg:w-[350px]">
          <img
            src={COVER_IMAGE}
            className="w-full h-auto lg:rounded-l-lg lg:shadow-2xl"
            alt="Cover Image"
          />
        </div>
        <div className="  dark:bg-black w-full lg:w-1/2  bg-[#f5F5F5] p-8 lg:rounded-r-lg lg:shadow-2xl  dark:text-white font-Quicksand font-semibold  ">
          <h2 className="text-4xl font-semibold mb-4 dark:text-white">
            <span className="text-accent">L</span>ogin
          </h2>
          <p className="text-base mb-4 dark:text-white font-Quicksand font-semibold">
            Bienvenue ! S'il vous plaît entrez vos coordonnées.
          </p>
          <form method="Post" onSubmit={hamdelSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none dark:border dark:border-b-accent dark:text-white  "
            />
            <input
              name="password"
              type="password"
              onChange={handleChangePassword}
              placeholder="Mot de passe"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none dark:border dark:border-b-accent dark:text-white"
            />
            <div className="flex items-center justify-between mb-4">
              
              <p className="text-sm font-medium cursor-pointer underline dark:text-white font-Quicksand font-semibold ">
               <Link to="/ForgoutPass" >Mot de passe oublié</Link> 
              </p>
            </div>
            <button className="w-full bg-[#060606] hover:bg-accent text-white rounded-md py-3 mb-4 font-Quicksand font-semibold dark:border dark:border-accent">
              Connexion
            </button>
          </form>

          <button
            className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 mb-4 "
            onClick={handleRegisterClick}
          >
            Inscription
          </button>
          <div className="w-full text-center mb-4">
            <div className="w-full h-px bg-black"></div>
            <p className="relative inline-block px-2 bg-gray-200 text-sm dark:bg-black dark:text-accent">
              ou
            </p>
          </div>
          <button
            className="w-full border border-black text-[#060606] bg-white hover:bg-gray-300 rounded-md py-3 flex items-center justify-center"
            onClick={handleRegisterGoogle}
          >
            <img src={Gogle} alt="" className="w-4 mr-2" />
            Inscription avec Google
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Login;
