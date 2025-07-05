import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Row, Col, Card, Timeline, Tag, Form, Select, Input, Button  } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;

function toTitleCase(str) {
  return str
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const ApprovalWorkflowModal = ({ workflows, formData }) => {
     const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    
     const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingReturn, setLoadingReturn] = useState(false);
    
    
     const onClose = () => {
        setVisible(false);  // Close the modal by setting visible to false
    };
    
  const handleApproval = async () => {
    try {
        const values = await form.validateFields();
        const updatedValues = {
            ...values,
            grievance_id: formData.id,
        };

        setLoading(true);

        const token = sessionStorage.getItem('token');
        const response = await axios.post(
            `${apiBaseUrl}/industrial_relationship/grievances/approve_grievance_workflow`,
            updatedValues,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log('Response:', response.data); // Always check data first

        if (response.data.status === 200) {
            await swal({
                title: "Success",
                text: "Grievance successfully approved.", // 
                icon: "success",
                button: "Close",
            });

            form.resetFields();
            onClose(); // Close modal
            navigate('/industrials/grievances/show_grievances');  // Refresh data
        } else {
            swal({
                title: "Failed",
                text: response.data.message || "!Sorry operation failed.", // fallback
                icon: "warning",
                button: "Close",
            });
        }
    } catch (error) {
        swal({
            title: "Failed",
            text: error.response?.data?.message || error.message || "An error occurred.",
            icon: "warning",
            button: "Close",
        });
    } finally {
        setLoading(false);
    }
};
    
    // Handle Return action
    const handleReturn = async () => {
        try {
            const values = await form.validateFields();
            const hasVerification = (offence.reviews || []).some(
                review => review.review_type === "Verification" && review.action === "Verified"
            );
            const updatedValues = {
                ...values,
               offence_id: offence.offence_id// Approver if Verified, else Verifier
            };
            setLoading(true);
            const response = await returnReviewedFormalOffenceAPI(authToken, updatedValues, offence.offence_id);
            if (response.success) {
                await swal({
                    title: "Success",
                    text: response.message,
                    icon: "success",
                    button: "Close",
                });
                form.resetFields();
                onClose();
            } else {
                await swal({
                    title: "Failed",
                    text: response.message,
                    icon: "warning",
                    button: "Close",
                });
            }
        } catch (error) {
            swal({
                title: "Failed",
                text: error.message,
                icon: "warning",
                button: "Close",
            });
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
      
        
        
     <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Card
                                    className="flex items-center"
                                    style={{
                                        backgroundColor: "#fafafa",
                                        marginBottom: "20px",
                                        height: "40px",
                                        border: "1px solid #eee",
                                    }}
                                    >
                                    <h4 style={{ margin: 0, fontSize: "14px" }} className="text-primary">
                                        Approval Details
                                    </h4>
                                    </Card>

                                    <Timeline 
                                        className="mt-7 mb-5"
                                        style={{
                                            maxHeight: "400px",
                                            overflow: "auto"
                                        }}
                                    >
                                    {workflows?.map((rec, index) => (
                                        <Timeline.Item key={index}>
                                        <div
                                            className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-100"
                                            style={{
                                            backgroundColor: "#fafafa",
                                            marginBottom: "20px",
                                            width: "100%", // ✅ Force full width
                                            }}
                                        >
                                            <div className="flex justify-between gap-x-4">
                                            <div className="py-0.5 text-xs/5 text-gray-500">
                                                <span className="font-medium text-gray-900 text-sm">
                                                {rec.previous_stage === "Misconduct Initiator"
                                                    ? "Initiate Misconduct"
                                                    : rec.previous_stage === "Misconduct Reviewer"
                                                    ? "Review Misconduct"
                                                    : rec.previous_stage === "Misconduct Approver"
                                                    ? "Approve Misconduct"
                                                    : "Approve Misconduct"}
                                                </span>
                                                <br />
                                                <span className="font-medium text-gray-900 text-sm">
                                                {rec.attender} ({toTitleCase(rec.previous_stage)})
                                                </span>
                                            </div>
                                            <time className="flex-none py-0.5 text-xs/6 text-green-500">
                                                {dayjs(rec.action_date).format("DD MMM YYYY, HH:mm A")}
                                            </time>
                                            </div>
                                            <p className="text-sm/6 text-gray-600">{rec.comments}</p>
                                            <p className="text-sm/6 text-green-500 text-right">
                                            <Tag
                                                color={
                                                rec.status === "Returned"
                                                    ? "yellow"
                                                    : rec.status === "rejected"
                                                    ? "red"
                                                    : "green"
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {toTitleCase(rec.status)}
                                            </Tag>
                                            </p>
                                        </div>
                                        </Timeline.Item>
                                    ))}
                                    </Timeline>

                                  {formData?.status === "Reviewed" && (
                                    <>
                                        <Form form={form} layout="vertical">
                            <Form.Item label="Recommendation" name="recommendation">
                                            <Input.TextArea
                                            rows={2}
                                            placeholder="Marekebisho yaliyopendekezwa na Meneja anayeshughulikia Malalamiko "
                                            />
                            </Form.Item>
                             <Form.Item label="Result" name="results">
                                            <Input.TextArea
                                            rows={2}
                                            placeholder="Matokeo "
                                            />
                            </Form.Item>
                           
                                        </Form>

                                        <div className="flex gap-3 mt-2 justify-end">
                                        <Button
                                            key="Approve"
                                            type="primary"
                                            loading={loading}
                                            onClick={handleApproval}
                                            className="bg-success hover:bg-primary/80"
                                            disabled={loading}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            id="return"
                                            key="return"
                                            onClick={handleReturn}
                                            className="bg-red-500 text-white hover:bg-red-600"
                                            disabled={loadingReturn}
                                        >
                                            Return
                                        </Button>
                                        <Button
                                            key="close"
                                            onClick={onClose}
                                            className="ml-2"
                                            disabled={loading}
                                        >
                                            Close
                                        </Button>
                                        </div>
                                    </>
                                    )}

                                </Col>
                                </Row>
  );
};

export default ApprovalWorkflowModal;
