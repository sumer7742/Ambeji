import React from "react";
import { careerhero } from "../assets";

const Career: React.FC = () => {

const jobs = [
  {
    type: "Full Time",
    title: "Next.js Developer",
    description:
      "Develop scalable and SEO-friendly web applications using Next.js, React, and Tailwind CSS. Collaborate with backend teams to integrate APIs and improve performance.",
  },
  {
    type: "Full Time",
    title: "React.js Developer",
    description:
      "Build reusable UI components and modern interfaces using React.js. Optimize applications for maximum speed and responsiveness.",
  },
  {
    type: "Internship",
    title: "Frontend Developer Intern",
    description:
      "Work closely with senior developers to create responsive web interfaces. Gain hands-on experience with React, Tailwind CSS, and real client projects.",
  },
  {
    type: "Remote",
    title: "UI/UX Designer",
    description:
      "Design intuitive and visually appealing user experiences. Create wireframes, prototypes, and design systems aligned with business goals.",
  },
  {
    type: "Full Time",
    title: "Backend Developer (Node.js)",
    description:
      "Develop secure and scalable backend services using Node.js, Express, and MongoDB.",
  },
  {
    type: "Full Stack Developer",
    title: "Full Stack Developer",
    description:
      "Handle end-to-end development using React, Next.js, Node.js, and databases.",
  },
];

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ───── HERO ───── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={careerhero}
          alt="Careers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide">
            Join Our <span className="text-[#dd3333]">Fashion Team</span>
          </h1>

          <p className="mt-4 text-gray-200 max-w-xl mx-auto text-lg">
            Build your career with a fast-growing fashion & lifestyle brand.
          </p>
        </div>
      </section>

      {/* ───── INTRO ───── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">Open Positions</h2>
        <p className="text-gray-600 max-w-2xl">
          Explore opportunities to work with a creative and dynamic team shaping the future of fashion commerce.
        </p>
      </section>

      {/* ───── JOB CARDS ───── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Tag */}
              <span className="text-[11px] uppercase tracking-widest text-[#dd3333] bg-[#ffe5e5] px-3 py-1 rounded-full font-semibold">
                {job.type}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-4">
                {job.title}
              </h3>

              {/* Desc */}
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {job.description}
              </p>

              {/* Button */}
              <a
                href={`mailto:careers@ambeji.in?subject=${job.title} Application`}
                className="mt-6 inline-block text-sm font-semibold text-[#dd3333] border border-[#dd3333] px-5 py-2 rounded-full hover:bg-[#dd3333] hover:text-white transition"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="bg-[#111] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">Didn’t find your role?</h2>
            <p className="text-gray-300 text-sm mt-2">
              Send your resume and we’ll reach out when there's a match.
            </p>
          </div>

          <a
            href="mailto:careers@ambeji.in"
            className="px-8 py-3 bg-[#dd3333] rounded-full font-semibold hover:bg-[#bb2222] transition"
          >
            Send Resume
          </a>
        </div>
      </section>

    </div>
  );
};

export default Career;