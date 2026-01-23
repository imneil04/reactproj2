export default function ConfirmationModal({ onConfirm, onCancel }) {
    return (
       <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-80">
                <p className="mb-4">
                    Are you sure you want to submit order?
                </p>
                <div className="flex justify-end gap-4">
                    <button onClick={onCancel} 
                            className="bg-gray-400 
                            px-2 rounded-md
                            hover:bg-amber-500 
                            hover:cursor-pointer
                            transition-all">Cancel</button>
                    <button onClick={onConfirm} 
                            className="bg-gray-500 
                            text-black 
                            px-4 py-2 
                            rounded
                            hover:bg-emerald-600
                            hover:cursor-pointer
                            transition-all">Confirm Order</button>
                </div>
            </div>
        </div>
       </>
    );
}