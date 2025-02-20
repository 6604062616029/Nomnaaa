// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border p-2 w-full rounded-md"
          value={form.title}
          onChange={handleOnChange}
          placeholder="ชื่อสินค้า"
          name="title"
        />
        <input
          className="border p-2 w-full rounded-md"
          value={form.description}
          onChange={handleOnChange}
          placeholder="รายละเอียด"
          name="description"
        />
        <input
          type="number"
          className="border p-2 w-full rounded-md"
          value={form.price}
          onChange={handleOnChange}
          placeholder="ราคา"
          name="price"
        />
        <input
          type="number"
          className="border p-2 w-full rounded-md"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="จำนวน"
          name="quantity"
        />
        <select
          className="border p-2 w-full rounded-md"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            กรุณาเลือกหมวดหมู่
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <Uploadfile form={form} setForm={setForm} />

        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-all"
        >
          เพิ่มสินค้า
        </button>
      </form>

      <table className="table-auto w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">No.</th>
            <th className="p-2">รูปภาพ</th>
            <th className="p-2">ชื่อสินค้า</th>
            <th className="p-2">รายละเอียด</th>
            <th className="p-2">ราคา</th>
            <th className="p-2">จำนวน</th>
            <th className="p-2">จำนวนที่ขายได้</th>
            <th className="p-2">วันที่อัปเดต</th>
            <th className="p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">
                {item.images.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-lg shadow-md object-cover"
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
                    No Image
                  </div>
                )}
              </td>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">{numberFormat(item.price)}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.sold}</td>
              <td className="p-2">{dateFormat(item.updatedAt)}</td>
              <td className="p-2 flex space-x-2">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <Pencil />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;

