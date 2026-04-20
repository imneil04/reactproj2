import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../js/firebase";
import { useAuth } from "../context/AuthContext";
import { auth } from "../js/firebase";
import { menuData } from "../data/menuData";

//create menuMap dynamically
const menuMap = Object.values(menuData)
    .flat()
    .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
}, {});

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    //console.log("Render orders: ", orders);
    //console.log("render menuData: ", menuData);

    useEffect(() => {
        const fetchOrders = async () => {
            //const user = useAuth();
            const user = auth.currentUser;

            if (!user) return;

            const q = query(collection(db, "users", user.uid, "orders"),
            orderBy("createdAt", "desc"));
            
            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setOrders(data);
        };

        fetchOrders();
    }, []);

    return (
        <>
            <div className="bg-white p-6 mt-15 rounded-xl 
                    shadow 
                    overflow-y-auto pr-2 
                    max-h-[60vh]
                    max-w-md">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-500">No orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
                                {/**Order Header */}
                                <div className="flex justify-between mb-2">
                                    <p className="font-medium">Order #: {order.id.slice(0, 6)}</p>
                                    <p className="text-sm text-gray-500">{order.createdAt?.toDate().toLocaleDateString()}</p>
                                </div>

                                {/**Items */}
                                <div className="space-y-2">
                                    {(order.items || []).map((item, idx) => {
                                        const menuItem = menuMap[item.id];
                                        
                                        return (
                                            <div key={idx} className="flex items-center gap-3">
                                                <img 
                                                    src={menuItem?.image || "/images/placeholder.png"}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded object-cover"
                                                />

                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>

                                                <p className="text-sm font-semibold text-amber-500">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/**Total */}
                                <div className="flex justify-between mt-3 pt-3 border-t">
                                    <p className="font-semibold">Total</p>
                                    <p className="font-bold">${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </>
    );
};

export default OrderHistory;
