import OrderHistory from "../components/OrderHistory";
import { useAuth } from "../context/AuthContext";
import { TIERS } from "../data/tiers";
import { memberOffers } from "../data/memberOffers";
import ProfileSection from "../components/ProfileSection";

export default function LoginDashboard () {
    //const navigate = useNavigate();

    const { userData } = useAuth();
    
    //main points goal
    //const Reward_Goal = 500;

    //points per user
    const points = userData?.points || 0;

    //point tracker bar
    //const progress = Math.min((points / Reward_Goal) * 100, 100);
    //const remaining = Math.max(Reward_Goal - points, 0);

    //tiers reward
    const currentTier = 
        TIERS.slice().reverse().find(t => points >= t.min) || TIERS[0];
    const nextTier = TIERS.find(t => t.min > points);

    //member offers (ALL)
    const offersWithAccess = memberOffers.map(offer => {
        const tierIndex = TIERS.findIndex(t => t.name === offer.tier);
        const userTierIndex = TIERS.findIndex(t => t.name === currentTier.name);

        return {
            ...offer,
            unlocked: userTierIndex >= tierIndex
        };
    });

    return (
        <>
           <div className="grid md:grid-cols-4">
                <OrderHistory />

                {/**Member Points section*/}
                <div className="bg-white p-4 rounded-xl shadow 
                                max-h-[60vh] max-w-md
                                mt-20">
                    <h2 className="text-lg text-cyan-600 font-semibold">
                        Member Rewards <i className="fa-solid fa-award"></i>
                    </h2>

                    {/**Tier */}
                    <p className="text-sm text-gray-500">Current Tier</p>
                    <div className="flex flex-row mt-2">
                        <p className={`text-xl font-bold ${currentTier.color}`}>
                            {currentTier.name}
                        </p>
                        <p className={`w-7 h-7 ml-2 rounded-full text-sm font-medium ${currentTier.bg} ${currentTier.color}`}></p>
                    </div>

                    {/**points*/}
                    <p className="text-2xl font-bold text-cyan-700">
                        {points} pts
                    </p>

                    {/**Progress bar, added nextTier for tiers feature */}
                    {nextTier && (
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-5">
                                <div className={`h-5 rounded-full transition-all duration-500 ${currentTier.bg}`} 
                                    style={{ width: `${((points - currentTier.min) / (nextTier?.min - currentTier.min)) * 100}%` }}
                                />
                            </div>

                            {/**Progress description*/}
                            <p className="text-sm text-gray-500 mt-2">
                                {nextTier.min - points} pts to {nextTier.name}
                            </p>
                        </div>
                    )}

                    {/**Current Reward */}
                    <p className="text-xs text-cyan-600 mt-2">
                        🎁 {currentTier.reward}
                    </p>

                    <p className="text-sm text-gray-500 mt-2 font-semibold">
                        Earn points with every dollar spent in orders.
                    </p>
                </div>

                {/**Exclusive offers section */}
                <div className="bg-white p-4 rounded-xl shadow 
                                max-h-[50vh] max-w-md
                                mt-20
                                ">
                    <h2 className="text-lg text-cyan-600 font-semibold animate-pulse">
                        Exclusive member offers <i className="fa-solid fa-tags"></i>
                    </h2>

                    {/**member offers list */}
                    {offersWithAccess.length === 0 ? (
                        <p className="text-gray-500">No offers available yet.</p>
                    ) : (
                        <div className="space-y-3 cursor-pointer mt-2">
                            {offersWithAccess.map(offer => (
                                <div key={offer.id} className={`shadow-md rounded-lg p-4 hover:shadow-lg 
                                    transition 
                                    flex justify-between items-center 
                                    ${offer.unlocked ? "" : "opacity-50"}`}>
                                    <div>
                                        <p className="font-medium text-sm">{offer.title}</p>
                                        <p className="text-xs text-gray-500">{offer.description}</p>
                                    </div>

                                    {!offer.unlocked && (
                                        <p className={`text-xs ${offer.color}`}>
                                            Unlocks at {offer.tier}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/**Edit profile info */}
                <div className="bg-white p-4 rounded-xl shadow 
                                max-h-[40vh] max-w-md
                                mt-20
                                ">
                    <h2 className="text-lg text-cyan-600 font-semibold">
                        Edit profile <i className="fa-solid fa-circle-user"></i>
                    </h2>
                    <ProfileSection />
                </div>

           </div>
        </>
        
    );
}