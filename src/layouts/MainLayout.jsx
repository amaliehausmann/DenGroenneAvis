import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import style from './MainLayout.module.scss'
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  return (
    <main className={style.mainStyling}>
      <Header/>
      <Outlet />
      <Footer/>
    </main>
  );
};
