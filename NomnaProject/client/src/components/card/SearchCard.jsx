import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 1000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      text ? actionSearchFilters({ query: text }) : getProduct();
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    findCheck === -1 ? inState.push(inCheck) : inState.splice(findCheck, 1);
    setCategorySelected(inState);

    inState.length > 0 ? actionSearchFilters({ category: inState }) : getProduct();
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => setOk(!ok), 300);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">ค้นหาสินค้า</h1>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า..."
        className="border rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <hr className="my-4" />
      <div>
        <h2 className="text-lg font-medium mb-2">หมวดหมู่สินค้า</h2>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <label key={index} className="flex items-center gap-2 text-gray-700">
              <input onChange={handleCheck} value={item.id} type="checkbox" className="accent-blue-500" />
              {item.name}
            </label>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="text-lg font-medium mb-2">ค้นหาราคา</h2>
        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Min: {numberFormat(price[0])}</span>
          <span>Max: {numberFormat(price[1])}</span>
        </div>
        <Slider onChange={handlePrice} range min={0} max={1000} defaultValue={[0, 1000]} />
      </div>
    </div>
  );
};

export default SearchCard;
