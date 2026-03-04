import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Redux/slices/orderSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="comic-heading text-xl sm:text-2xl mb-6 text-comic-dark flex items-center gap-2">
        📦 My Orders
      </h2>

      <div className="comic-panel overflow-x-auto">
        <table className="min-w-full text-left font-body">
          <thead className="bg-comic-yellow border-b-3 border-comic-dark">
            <tr>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Image</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Order Id</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Created</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Shipping Address</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Items</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Price</th>
              <th className="py-3 px-4 font-comic text-comic-dark text-xs uppercase">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => {
                    handleRowClick(order._id);
                  }}
                  className="border-b-2 border-comic-dark/10 hover:bg-comic-yellow/20 transition cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border-2 border-comic-dark shadow-comic"
                    />
                  </td>

                  <td className="p-4 font-bold text-comic-dark font-body text-sm">
                    {order._id}
                  </td>

                  <td className="p-4 font-body text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 font-body text-sm">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </td>

                  <td className="p-4 text-center">
                    <span className="comic-badge bg-comic-blue text-white px-2 py-1 text-xs">
                      {order.orderItems.length}
                    </span>
                  </td>

                  <td className="p-4 font-comic font-bold text-comic-green">
                    ${order.totalPrice}
                  </td>

                  <td className="p-4">
                    <span
                      className={`comic-badge text-xs font-comic ${order.isPaid ? "bg-comic-green text-white" : "bg-comic-orange text-white"}`}
                    >
                      {order.isPaid
                        ? "✅ Paid"
                        : order.paymentMethod === "COD"
                        ? "💵 Pay on Delivery"
                        : "⏳ Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 font-comic text-comic-dark text-lg"
                >
                  {loading ? "⚡ Loading orders..." : "📭 No orders found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
