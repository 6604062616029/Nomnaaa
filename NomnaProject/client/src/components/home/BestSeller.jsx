import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await listProductBy("sold", "desc", 12);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching best sellers:", err);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 uppercase tracking-wide">
        Best Sellers
      </h2>
      <SwiperShowProduct>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <ProductCard item={item} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  );
};

export default BestSeller;
