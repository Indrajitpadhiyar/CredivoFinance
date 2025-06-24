import React, { useState, useEffect } from 'react';
import { Shield, Users, TrendingUp, FileText, CreditCard, Phone, MessageSquare, BarChart2, Settings, Lock, Briefcase, Smartphone, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import { motion } from 'framer-motion';
import { fadeIn } from '../../assets/motion';
import { textVariant } from '../../assets/motion';



// Helper component for feature cards
const FeatureCard = ({ icon, title, description, bgColor = 'bg-slate-800', textColor = 'text-white' }) => (
  <div className={`rounded-xl p-6 ${bgColor} ${textColor} shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center h-full`}>
    <div className="mb-4 text-sky-400">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{description}</p>
  </div>
);

// Helper component for icon-based feature list items
const IconFeature = ({ icon, text }) => (
  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
    <div className="text-sky-400">{icon}</div>
    <span className="text-slate-200">{text}</span>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, avatar }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center text-center h-full">
    <img src={avatar} alt={author} className="w-20 h-20 rounded-full mb-4 border-2 border-sky-500" onError={(e) => e.target.src = 'https://placehold.co/80x80/1E293B/94A3B8?text=User'} />
    <p className="text-slate-300 italic mb-4">"{quote}"</p>
    <h4 className="font-semibold text-sky-400">{author}</h4>
    <p className="text-sm text-slate-400">{role}</p>
  </div>
);


export default function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "We build financial futures with trust, transparency, and expertise. Our commitment is to your long-term success.",
      author: "Indrajit P.",
      role: "C.E.O of a Credivo",
      avatar: "https://placehold.co/100x100/7DD3FC/0F172A?text=IP"
    },
    {
      quote: "In finance, precision and trust are everything. We lead with vision, deliver with integrity.",
      author: "Drumil T.",
      role: "Business Partner",
      avatar: "https://placehold.co/100x100/67E8F9/0F172A?text=DT"
    },
    // {
    //   quote: "The ability to send invoices and track payments on my phone has been a game-changer for my small business.",
    //   author: "Maria G.",
    //   role: "Freelancer",
    //   avatar: "https://placehold.co/100x100/A5F3FC/0F172A?text=MG"
    // }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 7 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="backdrop-md w-full h-screen  text-white font-sans antialiased overflow-y-scroll">
      {/* Hero Section */}
      <Navbar />
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">

            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl text-black sm:text-5xl lg:text-6xl font-inter mb-10 leading-tight">
                About <span className="text-sky-400">Credivo</span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-black mb-8">
              At Credivo, we make your money work for you. No complex processes, no active involvement—just smart, secure investing. You invest your funds with us, and we handle the rest.

              Our expert team manages and grows your investment, delivering consistent returns while you sit back and enjoy the rewards. With a focus on transparency, trust, and performance, Credivo is where passive income becomes powerful.
            </motion.p>
            <motion.button
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="  bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg">
              Get Started
            </motion.button>
          </div>
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
          >

            <img
              src="image/dashbord_about.png"
              alt="Financial Growth Illustration"
              className="rounded-xl shadow-2xl mx-auto"
              onError={(e) => e.target.src = 'https://placehold.co/600x400/1E293B/94A3B8?text=Image+Error'}
            />
          </motion.div>
        </div>
      </section>

      {/* Protecting You Section */}
      <section className="py-16 md:py-24   bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl sm:text-4xl font-bold mb-4">Protecting You And Your Money</h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              We offer a range of features designed to give you peace of mind and secure your financial assets.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<Lock size={40} />}
                title="Advanced Security"
                descr
                description="State-of-the-art encryption and multi-factor authentication to keep your data and assets safe."
              />
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<Users size={40} />}
                title="Expert Support"
                description="Our dedicated team of financial experts is available 24/7 to assist you with any questions or concerns."
              />
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<CheckCircle size={40} />}
                title="Regulatory Compliance"
                description="We adhere to the strictest industry standards and regulations to ensure transparency and trust."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pay People Section */}
      <section className="py-16 md:py-24  bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="image/easypayment.png"
              alt="Easy Payments Illustration"
              className="rounded-xl shadow-2xl mx-auto"
              onError={(e) => e.target.src = 'https://placehold.co/500x350/0F172A/94A3B8?text=Image+Error'}
            />
          </div>
          <div className="text-center md:text-left order-1 md:order-2">
            <h2 className="text-3xl text-black sm:text-4xl font-bold mb-6">Pay People In One Place With Less Effort</h2>
            <p className="text-lg text-black  mb-6">
              Simplify your payments with our intuitive platform. Send and receive money easily, track your transactions in one place, and save time and reduce hassle.
            </p>
            <ul className="space-y-5 text-black mb-8">
              <li className="flex items-center"><CheckCircle className="text-sky-400 mr-2" size={20} /> Seamless domestic and international transfers.</li>
              <li className="flex items-center"><CheckCircle className="text-sky-400 mr-2" size={20} /> Real-time transaction tracking.</li>
              <li className="flex items-center"><CheckCircle className="text-sky-400 mr-2" size={20} /> Low transaction fees and transparent pricing.</li>
            </ul>
            <button className="border border-sky-500 text-sky-500 hover:bg-blue-50 hover:text-slate-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors">
              Learn More <ArrowRight className="inline ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Best Financial Features Section */}
      <section id="features" className="py-16 md:py-24  bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">We Provide The Best Financial Features</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Take control of your finances with our comprehensive suite of tools designed for modern investors.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <IconFeature icon={<BarChart2 size={28} />} text="Budget Management Tools" />
            <IconFeature icon={<TrendingUp size={28} />} text="Investment Portfolio Monitoring" />
            <IconFeature icon={<CreditCard size={28} />} text="Automated Bill Payments" />
            <IconFeature icon={<FileText size={28} />} text="Comprehensive Reporting & Analytics" />
            <IconFeature icon={<Briefcase size={28} />} text="All-in-One Account Overview" />
            <IconFeature icon={<Shield size={28} />} text="Top-Tier Security and Privacy" />
          </div>
        </div>
      </section>

      {/* Send Invoice Section (Mobile Focus) */}
      <section className="py-16 md:py-24  bg-white from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl text-slate-700  sm:text-4xl font-bold mb-6">Send Invoices, Track Expenses & Get Paid On Your Mobile</h2>
            <p className="text-lg text-slate-700 mb-8">
              Manage your business finances on the go with our powerful mobile application. Create professional invoices, track expenses effortlessly, and receive payments quickly and securely, all from your smartphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <img src="https://placehold.co/150x50/0F172A/FFFFFF?text=App+Store" alt="App Store" className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity" />
              <img src="https://placehold.co/150x50/0F172A/FFFFFF?text=Google+Play" alt="Google Play" className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>
          <div>
            <img
              src="https://placehold.co/450x550/1E293B/7DD3FC?text=Mobile+App+UI"
              alt="Mobile App Interface"
              className="rounded-xl shadow-2xl mx-auto"
              onError={(e) => e.target.src = 'https://placehold.co/450x550/1E293B/94A3B8?text=Image+Error'}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24  bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-black sm:text-4xl font-bold mb-4">Founders Of Credivo</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See what our satisfied clients are saying about their experience with Finamore.
            </p>
          </div>
          <div className="relative max-w-xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
              >
                {index === currentTestimonial && (
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-sky-500 scale-125' : 'bg-slate-600'} transition-all duration-300`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24  bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-slate-700  sm:text-4xl font-bold mb-6">The Financial Standard For Your Future Is Here</h2>
          <p className="text-lg text-slate-800 mb-8 max-w-xl mx-auto">
            Ready to experience a better way to manage your future and grow your Money? Join Credivo today and take the first step towards a secure financial future.
          </p>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-10 py-4 rounded-lg text-xl transition-colors shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-sky-400 mb-4"><img src="image/CF_LOGO_PNG.png" alt="logo" className="h-10 w-40" /></h3>
              <p className="text-slate-400 text-sm">
                Your trusted partner in financial growth and security. We provide cutting-edge tools and expert advice to help you achieve your financial goals.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#features" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Our Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Pricing Plans</a></li>
                <li><a href="#testimonials" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">FAQs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Live Chat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Finamore. All rights reserved. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
