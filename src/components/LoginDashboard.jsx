import OrderHistory from "../components/OrderHistory";

export default function LoginDashboard () {
    //const navigate = useNavigate();

    return (
        <>
           <div className="p-6 space-y-6">
            <OrderHistory />
           </div>
        </>
        
    );
}