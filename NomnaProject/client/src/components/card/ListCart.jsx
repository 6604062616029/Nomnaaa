// rafce
import React from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้ว!", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <ListCheck size={40} className="text-yellow-300" />
        <p className="text-3xl font-extrabold">🛒 รายการสินค้า ({cart.length} รายการ)</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
              {/* Left */}
              <div className="flex items-center gap-4">
                {item.images && item.images.length > 0 ? (
                  <img className="w-20 h-20 rounded-lg" src={item.images[0].url} alt={item.title} />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div>
                  <p className="text-lg font-bold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{numberFormat(item.price)} x {item.count}</p>
                </div>
              </div>
              <div className="text-xl font-bold text-indigo-600">{numberFormat(item.price * item.count)}</div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
          <p className="text-2xl font-extrabold mb-4">💰 ยอดรวม</p>
          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>รวมสุทธิ</span>
            <span className="text-2xl font-extrabold text-green-500">{numberFormat(getTotalPrice())}</span>
          </div>

          <div className="flex flex-col gap-3">
            {user ? (
              <button
                disabled={cart.length < 1}
                onClick={handleSaveCart}
                className="bg-red-500 w-full rounded-lg text-white py-3 shadow-md hover:bg-red-700 transition-all"
              >
                🛍️ สั่งซื้อ
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-lg text-white py-3 shadow-md hover:bg-blue-700 transition-all">
                  🔑 Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="bg-gray-500 w-full rounded-lg text-white py-3 shadow-md hover:bg-gray-700 transition-all">
                ✏️ แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
