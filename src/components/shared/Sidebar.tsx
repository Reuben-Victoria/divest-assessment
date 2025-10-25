"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SidebarProps {
  userAvatar?: string;
  userName?: string;
  onThemeToggle?: (theme: "light" | "dark") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  userName = "User",
  onThemeToggle,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (onThemeToggle) {
      onThemeToggle(newTheme);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <Image
          fill
          sizes="100vw"
          src={
            "https://res.cloudinary.com/dq9rackyr/image/upload/v1761387393/Group_9_rglr3f.png"
          }
          className=""
          alt="Logo"
        />
      </div>

      <div className="sidebar__bottom">
        <button
          className="sidebar__theme-toggle"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.5"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 12.0004C22 17.5232 17.5228 22.0004 12 22.0004C10.8358 22.0004 9.71801 21.8014 8.67887 21.4357C8.24138 20.3772 8 19.217 8 18.0004C8 15.7792 8.80467 13.7459 10.1384 12.1762C11.31 13.8818 13.2744 15.0004 15.5 15.0004C17.8615 15.0004 19.9289 13.741 21.0672 11.8572C21.3065 11.4612 22 11.5377 22 12.0004Z"
                  fill="#7E88C3"
                ></path>{" "}
                <path
                  d="M2 12C2 16.3586 4.78852 20.0659 8.67887 21.4353C8.24138 20.3768 8 19.2166 8 18C8 15.7788 8.80467 13.7455 10.1384 12.1758C9.42027 11.1303 9 9.86422 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12Z"
                  fill="#7E88C3"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C10.3852 0 10.6977 0.312502 10.6977 0.697674V2.79845C10.6977 3.18362 10.3852 3.49612 10 3.49612C9.61475 3.49612 9.30225 3.18362 9.30225 2.79845V0.697674C9.30225 0.312502 9.61475 0 10 0Z"
                fill="currentColor"
              />
              <path
                d="M15.8688 4.13117C16.1419 3.85812 16.5822 3.85812 16.8553 4.13117C17.1283 4.40423 17.1283 4.84448 16.8553 5.11753L15.338 6.63481C15.065 6.90787 14.6247 6.90787 14.3517 6.63481C14.0786 6.36176 14.0786 5.92151 14.3517 5.64845L15.8688 4.13117Z"
                fill="currentColor"
              />
              <path
                d="M20 10C20 10.3852 19.6875 10.6977 19.3023 10.6977H17.2016C16.8164 10.6977 16.5039 10.3852 16.5039 10C16.5039 9.61475 16.8164 9.30225 17.2016 9.30225H19.3023C19.6875 9.30225 20 9.61475 20 10Z"
                fill="currentColor"
              />
              <path
                d="M15.338 13.3652C15.611 13.0922 16.0513 13.0922 16.3243 13.3652L17.8416 14.8825C18.1147 15.1555 18.1147 15.5958 17.8416 15.8688C17.5686 16.1419 17.1283 16.1419 16.8553 15.8688L15.338 14.3517C15.065 14.0786 15.065 13.6382 15.338 13.3652Z"
                fill="currentColor"
              />
              <path
                d="M10 16.5039C10.3852 16.5039 10.6977 16.8164 10.6977 17.2016V19.3023C10.6977 19.6875 10.3852 20 10 20C9.61475 20 9.30225 19.6875 9.30225 19.3023V17.2016C9.30225 16.8164 9.61475 16.5039 10 16.5039Z"
                fill="currentColor"
              />
              <path
                d="M4.13117 15.8688C3.85812 16.1419 3.85812 16.5822 4.13117 16.8553C4.40423 17.1283 4.84448 17.1283 5.11753 16.8553L6.63481 15.338C6.90787 15.065 6.90787 14.6247 6.63481 14.3517C6.36176 14.0786 5.92151 14.0786 5.64845 14.3517L4.13117 15.8688Z"
                fill="currentColor"
              />
              <path
                d="M3.49612 10C3.49612 10.3852 3.18362 10.6977 2.79845 10.6977H0.697674C0.312502 10.6977 0 10.3852 0 10C0 9.61475 0.312502 9.30225 0.697674 9.30225H2.79845C3.18362 9.30225 3.49612 9.61475 3.49612 10Z"
                fill="currentColor"
              />
              <path
                d="M6.63481 4.13117C6.90787 3.85812 6.90787 3.41787 6.63481 3.14481C6.36176 2.87176 5.92151 2.87176 5.64845 3.14481L4.13117 4.66209C3.85812 4.93515 3.85812 5.3754 4.13117 5.64845C4.40423 5.92151 4.84448 5.92151 5.11753 5.64845L6.63481 4.13117Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 14.8837C7.30225 14.8837 5.11628 12.6977 5.11628 10C5.11628 7.30225 7.30225 5.11628 10 5.11628C12.6977 5.11628 14.8837 7.30225 14.8837 10C14.8837 12.6977 12.6977 14.8837 10 14.8837Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <div className="sidebar__divider"></div>

        <div className="sidebar__user">
          <Image
            fill
            src={userAvatar}
            alt={userName}
            unoptimized
            className="sidebar__user-avatar"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
