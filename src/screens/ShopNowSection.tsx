
import { Link } from "react-router-dom";
const ShopNowSection: React.FC = () => {
    

   

    return (
        // <section className="bg-white py-8 sm:py-12">
        //     <div className="max-w-6xl mx-auto p-4 sm:p-8 text-center">
        //         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-6">
        //             Ready to Shop?
        //         </h2>
        //         <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8">
        //             Explore our latest collections and elevate your style with Shopping World!
        //         </p>
        //         <button
        //             onClick={handleShopNow}
        //             className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-indigo-700"
        //         >
        //             Shop Now 🛒
        //         </button>
        //     </div>
        // </section>
      
<section className="py-20 bg-[#111] text-center text-white">
        <h2 className="text-3xl font-bold">Upgrade Your Wardrobe Today</h2>
        <p className="mt-3 text-gray-300">Trendy styles. Premium quality.</p>

        <Link to="/product">
          <button className="mt-6 px-8 py-3 bg-[#dd3333] rounded-full font-semibold hover:bg-[#bb2222] transition">
            SHOP NOW
          </button>
        </Link>
      </section>

    );
};

export default ShopNowSection;