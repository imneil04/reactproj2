import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../js/firebase";
import { menuData } from "../data/menuData";

//create menuMap dynamically
const menuMap = Object.values(menuData)
    .flat()
    .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
}, {});

//function to display previous orders
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    //console.log("Render orders: ", orders);
    //console.log("render menuData: ", menuData);

    const [searchItem, setSearchItem] = useState("");
    const [filter, setFilter] = useState("all"); // all | 7 days | 30 days

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

    //search and filter feature
    const filteredOrders = (orders || []).filter(order => {
        //search (by item name or id)
        const matchesSearch =
            order.id.toLowerCase().includes(searchItem) || 
            order.items?.some(item => 
            item.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
        );

        //FILTER (by date)
        let matchesFilter = true;

        if (filter !== "all" && order.createdAt?.toDate) {
            const orderDate = order.createdAt.toDate();
            const now = new Date();

            const days = filter == "7days" ? 7 : 30;

            const diffTime = now - orderDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            matchesFilter = diffDays <= days;
        }

        return matchesSearch && matchesFilter;

    });

    return (
        <>
            <div className="bg-white p-6 mt-20 rounded-xl 
                    shadow 
                    overflow-y-auto pr-2 
                    max-h-[60vh]
                    max-w-md">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    {/**🔎 Search bar*/}
                    <input type="text" placeholder="Search orders..." value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)} 
                            className="flex-1 border rounded-lg px-3 py-2 text-sm 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    {/**filter dropdown*/}
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm hover:bg-cyan-400
                            cursor-pointer">
                            <option value="all">All</option>
                            <option value="7days">Last 7 days</option>
                            <option value="30days">Last 30 days</option>
                    </select>
                </div>
                <h2 className="text-xl text-cyan-800 font-semibold mb-4">Order History</h2>

                {/**Order card items */}
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-500">No orders available.</p>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
                                {/**Order Header */}
                                <div className="flex justify-between mb-2">
                                    <p className="font-medium">Order #: {order.id.slice(0, 5)}</p>
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

                                {/**Points earned on order */}
                                <div className="flex">
                                    <p className="text-sm text-cyan-700">
                                        Points earned: +{order.pointsEarned || Math.floor(order.total)}
                                    </p>
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
