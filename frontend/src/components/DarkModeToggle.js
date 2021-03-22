import React, { useEffect } from "react";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "./hooks/state";
import { toggleDarkMode } from "../actions/application";

const DarkModeToggle = () => {
  const { darkMode } = useSelector((st) => st.application);
  const dispatch = useDispatch();

  useEffect(() => {
    function updateDarkClass() {
      darkMode
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    }
    updateDarkClass();
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 h-auto w-auto ml-3 rounded-full flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 text-base leading-5 dark:bg-gray-800 bg-gray-200 hover:bg-gray-300 dark:active:bg-gray-700"
    >
      <img
        className="h-5 w-5"
        src={`${process.env.PUBLIC_URL}${
          !darkMode ? "/assets/moon-purple.svg" : "/assets/sun-yellow.svg"
        }`}
        alt=""
      />
    </button>
  );
};

export default DarkModeToggle;
