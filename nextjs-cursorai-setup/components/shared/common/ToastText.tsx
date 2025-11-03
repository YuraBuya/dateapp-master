import { ExclamationCircleOutlined, CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Bounce, toast, ToastPosition } from "react-toastify";

const toastConfig = {
    position: "top-center" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

export const ToastText = (type: string, message: string) => {
    switch (type) {
        case "success":
            toast(message, {
                ...toastConfig,
                icon: () => <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                style: {
                    background: "rgba(255 255 255 / 70%)",
                    color: "#000"
                }
            });
            break;
        case "error":
            toast.error(message, {
                ...toastConfig,
                icon: () => <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
            });
            break;
        case "warning":
            toast(message, {
                ...toastConfig,
                icon: () => <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
                style: {
                    border: "1px solid #ffa500",
                    padding: "16px",
                    color: "#ffa500"
                }
            });
            break;
        default:
            toast(message, {
                ...toastConfig,
                icon: () => <InfoCircleOutlined style={{ color: "#1890ff" }} />
            });
    }
};
