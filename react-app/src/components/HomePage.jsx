import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { BarChart3, Users, ShieldCheck } from "lucide-react";

const FeatureCard = ({ icon, title, children }) => (
  <div className="feature-card bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center">
    <div className="bg-emerald-50 text-emerald-500 rounded-full p-4 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{children}</p>
  </div>
);

const HomePage = React.memo(function HomePage() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".animate-hero", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
      })
        .from(
          ".feature-card",
          { y: 40, opacity: 0, stagger: 0.1, duration: 0.5 },
          "-=0.3"
        )
        .from(".animate-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4");

      hasAnimated.current = true;
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-20">
        <p className="animate-hero text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">
          Industrial Practice Project
        </p>
        <h1 className="animate-hero text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6">
          Attendance Dashboard
        </h1>
        <p className="animate-hero max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed mb-10">
          Our team of 4: <b>Vivek</b>, <b>Ansh</b>, <b>Mihir</b> and{" "}
          <b>Krishna</b> have a built a powerful attendance dashboard that can
          manage and track attendance seamlessly.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-16">
        <FeatureCard
          icon={<BarChart3 size={32} strokeWidth={1.5} />}
          title="Dashboard"
        >
          <b>Name</b> built the Dashboard section of this website with multiple
          options hence giving more insights onto the attendance data.
        </FeatureCard>
        <FeatureCard
          icon={<Users size={32} strokeWidth={1.5} />}
          title="HomePage"
        >
          <b>Name</b> developed the HomePage with a very clean and modern
          design. The sleek UI is inspiring and outright creative.
        </FeatureCard>
        <FeatureCard
          icon={<ShieldCheck size={32} strokeWidth={1.5} />}
          title="Manage"
        >
          <b>Name</b> created the Manage section of this website which allows
          users to manage and visualise their attendance data effectively.
        </FeatureCard>
        <FeatureCard
          icon={<BarChart3 size={32} strokeWidth={1.5} />}
          title="Reports"
        >
          <b>Name</b> built the Routers and sidebar for this project to help
          navigate across multiple pages with ease
        </FeatureCard>
      </div>
    </div>
  );
});

export default HomePage;
