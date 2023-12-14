import React from "react";
const Footer = () => {
  return (
    <footer className="w-full bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full text-white flex items-center justify-center gap-4 p-4">
          <h1>
            Developer {" "}
            <a
              href="https://instagram.com/muthahhary_iqbal?igshid=NGVhN2U2NjQ0Yg=="
              target="_blank"
            >
               Iqbal Muthahhary
            </a>
          </h1>
          <p>
            Make it with <span className="animate-pulse">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
