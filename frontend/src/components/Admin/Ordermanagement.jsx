import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchAdminOrders,
  updateAdminOrder,
  deleteAdminOrder,
} from "../../Redux/slices/adminSlice";

const Ordermanagement = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateAdminOrder({ id: orderId, status: newStatus }))
      .unwrap()
      .then(() => toast.success("Order status updated"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-body">
      <h2 className="comic-heading text-2xl text-comic-dark mb-6 inline-block transform -rotate-1">📦 Order Management</h2>

      <div className="comic-panel overflow-x-auto">
        <table className="min-w-full text-left font-body">
          <thead>
            <tr className="bg-comic-yellow border-b-3 border-comic-dark">
              <th className="py-3 px-4 font-comic text-comic-dark">Order ID</th>
              <th className="py-3 px-4 font-comic text-comic-dark">User</th>
              <th className="py-3 px-4 font-comic text-comic-dark">Total Price</th>
              <th className="py-3 px-4 font-comic text-comic-dark">Status</th>
              <th className="py-3 px-4 font-comic text-comic-dark">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center font-comic text-comic-dark">
                  ⏳ Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center font-comic text-comic-dark">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b-2 border-comic-dark/10 hover:bg-comic-yellow/10 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 font-mono text-sm text-comic-dark whitespace-nowrap">
                    {order._id}
                  </td>

                  <td className="p-4">
                    <span className="font-bold">{order.user?.name || "N/A"}</span>
                    <br /><span className="text-xs text-gray-500">({order.user?.email || "N/A"})</span>
                  </td>

                  <td className="p-4 font-comic text-comic-green text-lg">
                    ${order.totalPrice?.toFixed(2)}
                  </td>

                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="comic-input py-1.5 px-2 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="comic-btn-primary px-4 py-2 text-sm font-comic"
                    >
                      ✅ Mark Delivered
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordermanagement;
