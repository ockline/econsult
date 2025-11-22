import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Timeline, Tag, Form, Select, Input, Button, Modal  } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import swal from "sweetalert";

const { Option } = Select;

function toTitleCase(str) {
  return str
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const PerformanceApprovalWorkflowModal = ({ workflows, formData }) => {
     const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    const navigate = useNavigate();
    
     const [approvalForm] = Form.useForm();
     const [returnForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingReturn, setLoadingReturn] = useState(false);
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [returnRecipients, setReturnRecipients] = useState([]);
    const [returnRecipientsLoading, setReturnRecipientsLoading] = useState(false);
    
    
     const onClose = () => {
        navigate('/industrials/perfomance_reviews/');
    };
    
  const handleApproval = async () => {
    try {
        const values = await approvalForm.validateFields();
        const updatedValues = {
            ...values,
            performance_review_id: formData.id,
        };

        setLoading(true);

        const token = sessionStorage.getItem('token');
        const response = await axios.post(
            `${apiBaseUrl}/industrial_relationship/performance_reviews/approve_performance_workflow`,
            updatedValues,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log('Response:', response.data);

        if (response.data.status === 200) {
            await swal({
                title: "Success",
                text: "Performance Review successfully approved.",
                icon: "success",
                button: "Close",
            });

            approvalForm.resetFields();
            onClose();
        } else {
            swal({
                title: "Failed",
                text: response.data.message || "!Sorry operation failed.",
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
    const fetchReturnRecipients = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return;
        }

        setReturnRecipientsLoading(true);

        try {
            const response = await axios.get(
                `${apiBaseUrl}/industrial_relationship/performance_reviews/${formData.id}/return_recipients`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.status === 200) {
                setReturnRecipients(response.data.recipients || []);
            } else {
                setReturnRecipients([]);
            }
        } catch (error) {
            console.error('Failed to load return recipients:', error);
            setReturnRecipients([]);
        } finally {
            setReturnRecipientsLoading(false);
        }
    };

    const openReturnModal = async () => {
        returnForm.resetFields();
        setReturnModalOpen(true);

        if (!returnRecipients.length) {
            await fetchReturnRecipients();
        }
    };

    const handleReturnSubmit = async () => {
        try {
            const values = await returnForm.validateFields();
            const updatedValues = {
                comments: values.comments,
                performance_review_id: formData.id,
                return_to_user_id: values.return_to_user_id,
            };
            setLoadingReturn(true);
            const token = sessionStorage.getItem('token');
            const response = await axios.post(
                `${apiBaseUrl}/industrial_relationship/performance_reviews/return_performance_workflow`,
                updatedValues,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.status === 200) {
                await swal({
                    title: "Success",
                    text: "Performance Review successfully returned.",
                    icon: "success",
                    button: "Close",
                });
                returnForm.resetFields();
                setReturnModalOpen(false);
                onClose();
            } else {
                await swal({
                    title: "Failed",
                    text: response.data.message || "Operation failed.",
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
            setLoadingReturn(false);
        }
    };
    
    
    return (
        <>
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
                                            width: "100%",
                                            }}
                                        >
                                            <div className="flex justify-between gap-x-4">
                                            <div className="py-0.5 text-xs/5 text-gray-500">
                                                <span className="font-medium text-gray-900 text-sm">
                                                {rec.previous_stage === "Review Initiator" || rec.previous_stage === "Performance Review Initiator"
                                                    ? "Initiate Performance Review"
                                                    : rec.previous_stage === "Review Reviewer" || rec.previous_stage === "Performance Review Reviewer"
                                                    ? "Review Performance"
                                                    : rec.previous_stage === "Review Approver" || rec.previous_stage === "Performance Review Approver"
                                                    ? "Approve Performance Review"
                                                    : "Approve Performance Review"}
                                                </span>
                                                <br />
                                                <span className="font-medium text-gray-900 text-sm">
                                                {rec.attender} ({toTitleCase(rec.previous_stage)})
                                                </span>
                                            </div>
                                            <time className="flex-none py-0.5 text-xs/6 text-green-500">
                                                {dayjs(rec.attended_date).format("DD MMM YYYY, HH:mm A")}
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
                                        <Form form={approvalForm} layout="vertical">
                            <Form.Item label="Recommendation" name="recommendation">
                                            <Input.TextArea
                                            rows={2}
                                            placeholder="Enter your recommendations for this performance review"
                                            />
                            </Form.Item>
                             <Form.Item label="Result" name="results">
                                            <Input.TextArea
                                            rows={2}
                                            placeholder="Final results and decision"
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
                                            loading={loadingReturn}
                                            onClick={openReturnModal}
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

            <Modal
                title="Return Performance Review"
                open={returnModalOpen}
                onCancel={() => !loadingReturn && setReturnModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={returnForm} layout="vertical" onFinish={handleReturnSubmit}>
                    <Form.Item
                        label="Return To"
                        name="return_to_user_id"
                        rules={[
                            { required: true, message: "Please select the user to return this review to" },
                        ]}
                    >
                        <Select
                            placeholder="Select user"
                            loading={returnRecipientsLoading}
                            showSearch
                            optionFilterProp="children"
                        >
                            {returnRecipients.map((recipient) => (
                                <Option key={recipient.user_id} value={recipient.user_id}>
                                    {recipient.name} ({recipient.stage_label})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Comments"
                        name="comments"
                        rules={[
                            { required: true, message: "Please enter return comments" },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Provide the reason for returning this performance review"
                        />
                    </Form.Item>

                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setReturnModalOpen(false)} disabled={loadingReturn}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loadingReturn}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
  );
};

export default PerformanceApprovalWorkflowModal;

