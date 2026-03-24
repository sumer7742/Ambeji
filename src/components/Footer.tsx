import { Link } from "react-router-dom";
// import { logo2 } from "../assets";
import Footerdata from "../constant";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="overflow-x-hidden font-sans">

      {/* ── Top Footer ── */}
      <div className="bg-[#1c1c1c] px-6 sm:px-10 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-[#aaa]">

          {/* Footer Links */}
          {Footerdata.map((e, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-widest border-b border-[#333] pb-2">
                {e.heading}
              </h3>
              <div className="flex flex-col gap-2">
                {e.items.map((i, index) => (
                  <Link
                    key={index}
                    to={i.path}
                    className="hover:text-[#dd3333] transition-colors duration-200 text-[#aaa]"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Office Address */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest border-b border-[#333] pb-2 mb-4">
              Office Address
            </h4>
            <address className="not-italic text-[#aaa] text-sm leading-7">
              Ambeji Trade Pvt Ltd,<br />
              7th Floor, Office No. 702,<br />
              Vipul Business Park,<br />
              Central Park II,<br />
              Sector 48, Gurugram,<br />
              Haryana 122018
            </address>
          </div>

          {/* Newsletter + Social */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-white text-sm uppercase tracking-widest border-b border-[#333] pb-2">
              Stay Connected
            </h4>
            <p className="text-[#aaa] text-sm leading-relaxed">
              Join our newsletter for updates, exclusive offers, and insights!
            </p>

            {/* Newsletter form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white text-sm border border-[#444] rounded-sm placeholder-[#666] focus:outline-none focus:border-[#dd3333] transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-[#dd3333] text-white text-sm font-semibold rounded-sm hover:bg-[#bb2222] transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>

            {/* Social icons */}
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#2a2a2a] border border-[#444] text-[#aaa] hover:bg-[#dd3333] hover:border-[#dd3333] hover:text-white transition-all duration-200"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#2a2a2a] border border-[#444] text-[#aaa] hover:bg-[#dd3333] hover:border-[#dd3333] hover:text-white transition-all duration-200"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#2a2a2a] border border-[#444] text-[#aaa] hover:bg-[#dd3333] hover:border-[#dd3333] hover:text-white transition-all duration-200"
                >
                  <FaLinkedinIn size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-[#111] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="https://ambeji.com/wp-content/uploads/2021/09/logo-ambeji-l-e1757655211871.png" alt="logo" className="w-20 h-20 object-contain" />

          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <p className="text-[#666] text-xs">
              &copy; 2025 Ambeji Trade Pvt Ltd. All rights reserved.
            </p>
            <span className="text-[#444] hidden sm:inline">·</span>
            <p className="text-[#666] text-xs">
              Crafted by{" "}
              <span className="text-[#dd3333] font-semibold">Ambeji</span>
            </p>
          </div>

         
        </div>
      </div>

    </div>
  );
};

export default Footer;