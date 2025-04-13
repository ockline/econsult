
const FixedContractModal = ({ showModal, onClose, performanceReviewReport }) => {
    if (!showModal) return null;
	console.log('hahah doc', performanceReviewReport);
    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-bgdark rounded-lg w-full max-w-7xl p-6 relative h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Performance Review Report</h3>
        
        <iframe 
             src={`data:application/pdf;base64,${performanceReviewReport}`} 
            className="border w-full h-[75vh]" 
        />

        <div className="mt-4 text-right">
            <button
                onClick={onClose}
                className="ti-btn ti-btn-danger"
            >
                Close
            </button>
        </div>
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-black dark:text-white"
        >
            ✕
        </button>
    </div>
</div>

    );
};

export default FixedContractModal;

