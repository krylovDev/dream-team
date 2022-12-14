import { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { ThemeContext } from "../../context/ThemeProvider";

export default function Menu({ menuSettings }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const { isMenuOpened, setIsMenuOpened } = menuSettings;

  // При клике вне меню, меню закрывается
  useEffect(() => {
    function handleClickOutside(event) {
      if (!isMenuOpened) return;

      const menuBlock = document.querySelector(".header__menu");
      const burger = document.querySelector(".header__burger");
      if (!event.path.includes(menuBlock) && !event.path.includes(burger)) {
        setIsMenuOpened(false);
      }
    }

    document.addEventListener("click", handleClickOutside, false);
  });

  return (
    <div className={classNames("header__menu", { open: isMenuOpened, dark: theme === "dark" })}>
      <ul className="menu__list">
        <li className="menu__item">
          {pathname === "/" ? <a href="#home-section">{t("Главная")}</a> : <Link to="/">{t("Главная")}</Link>}
        </li>
        <li className="menu__item">
          <Link to="projects" onClick={() => setIsMenuOpened(false)}>
            {t("Проекты")}
          </Link>
        </li>
        <li className="menu__item">
          <a
            href="#team"
            onClick={() => {
              if (pathname === "/projects") navigate("/#team");
              setIsMenuOpened(false);
            }}
          >
            {t("Наша команда")}
          </a>
        </li>
        <li className="menu__item">
          <a
            href="#fav-places"
            onClick={() => {
              if (pathname === "/projects") navigate("/#fav-places");
              setIsMenuOpened(false);
            }}
          >
            {t("Любимые места")}
          </a>
        </li>
        <li className="menu__item">
          <a
            href="#contact"
            onClick={() => {
              if (pathname === "/projects") navigate("/#contact");
              setIsMenuOpened(false);
            }}
          >
            {t("Связаться")}
          </a>
        </li>
      </ul>
    </div>
  );
}
