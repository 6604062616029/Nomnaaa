import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await listProductBy("updatedAt", "desc", 12);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">New </h2>
      <SwiperShowProduct>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  );
};

export default NewProduct;

