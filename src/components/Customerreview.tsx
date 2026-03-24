import { aboutushome } from "../assets";
import ShopNowSection from "../screens/ShopNowSection";
import { motion } from "framer-motion";

const CustomerReview: React.FC = () => {
  const reviews = [
    { name: "Priya Sharma", location: "Faridabad", quote: "Amazing outfits! Perfect fitting and premium feel.", img: "https://i.pravatar.cc/150?img=47" },
    { name: "Rohan Kapoor", location: "Delhi", quote: "Best fashion store online. Fast delivery & great quality!", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Amit Patel", location: "Mumbai", quote: "Loved the collection. Very trendy & stylish.", img: "https://i.pravatar.cc/150?img=52" },
    { name: "Sneha Mehta", location: "Bangalore", quote: "Fabric quality is excellent. Totally worth it.", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Karan Verma", location: "Chennai", quote: "Jackets are fire 🔥 Highly recommend!", img: "https://i.pravatar.cc/150?img=10" },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[320px] flex items-center justify-center">
        <img src={aboutushome} className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            What People Say
          </h1>
          <p className="mt-2 text-gray-200">
            Real stories from our customers
          </p>
        </div>
      </section>

      {/* FEATURED REVIEW */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 text-center">
          
          <img
            src={reviews[0].img}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#dd3333]"
          />

          <p className="text-lg italic text-gray-700 max-w-2xl mx-auto">
            "{reviews[0].quote}"
          </p>

          <h3 className="mt-4 font-bold text-lg">{reviews[0].name}</h3>
          <p className="text-sm text-gray-500">{reviews[0].location}</p>

          <div className="mt-3 text-[#dd3333] text-lg">★★★★★</div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL REVIEWS */}
      <section className="mt-16 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          More Reviews
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {reviews.slice(1).map((review, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="min-w-[280px] bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={review.img} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                "{review.quote}"
              </p>

              <div className="mt-3 text-[#dd3333]">★★★★★</div>
            </motion.div>
          ))}
        </div>
      </section>

    

      <ShopNowSection />
    </div>
  );
};

export default CustomerReview;