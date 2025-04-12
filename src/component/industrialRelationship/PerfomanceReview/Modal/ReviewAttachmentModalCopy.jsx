import React from 'react';

const ReviewAttachmentModal = ({ showModal, onClose, performanceReviewReport }) => {
    if (!showModal) return null; // Don't render anything if the modal is not visible

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Download Performance Review</h2>
                <a href={performanceReviewReport} download className="ti-btn ti-btn-primary">
                    Click here to download
                </a>
            </div>
        </div>
    );
};

export default ReviewAttachmentModal;
