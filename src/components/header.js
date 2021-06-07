import React from "react";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">POLAR MIGRATION</div>
        <nav>
          <ul>
            <li>
              <a href="https://drive.google.com/file/d/1OkWTnkuRKbeyznfGbV8UoYS4fD75zso6/view">
                View Infographic
              </a>
            </li>
            <li className="btn">
              <a href="https://www.youtube.com/watch?v=d1-qaaGA0a4">trailer</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
