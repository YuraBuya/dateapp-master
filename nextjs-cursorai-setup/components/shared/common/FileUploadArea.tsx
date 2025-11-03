// import React from "react";
// import { Upload, Button } from "antd";
// import { DeleteOutlined, UploadOutlined, FileOutlined, DownloadOutlined } from "@ant-design/icons";
// import { useTranslation } from "react-i18next";
// import { useFileUpload, UploadedFile, UseFileUploadOptions } from "@/hooks/useFileUpload";
// import { SERVER_URL } from "@/config";
// import { axios } from "@/providers/AxiosProvider";

// interface FileUploadAreaProps extends UseFileUploadOptions {
//   label?: string;
//   fileUploadHint?: string;
//   required?: boolean;
//   className?: string;
//   variant?: "dragger" | "button"; // 드래그앤드롭 또는 버튼 형식
//   initialFiles?: any[]; // 초기 파일 리스트 (서버에서 받은 파일 정보)
//   fileList?: UploadedFile[]; // 외부에서 관리되는 파일 리스트
//   onFileListChange?: (files: UploadedFile[]) => void; // 파일 리스트 변경 시 콜백
// }

// const FileUploadArea: React.FC<FileUploadAreaProps> = ({
//   label,
//   fileUploadHint,
//   required = false,
//   className = "",
//   variant = "dragger",
//   initialFiles = [],
//   fileList: externalFileList,
//   onFileListChange,
//   ...uploadOptions
// }) => {
//   const { t } = useTranslation();
//   const {
//     fileList: internalFileList,
//     setFileList: setInternalFileList,
//     uploadProps: baseUploadProps,
//     formatFileInfo,
//     isUploading,
//   } = useFileUpload(uploadOptions);

//   // 외부에서 파일 리스트를 제공하면 그것을 사용하고, 그렇지 않으면 내부 상태 사용
//   const currentFileList = externalFileList || internalFileList;
//   const setCurrentFileList = externalFileList ? onFileListChange : setInternalFileList;

//   // 다운로드 중인 파일 ID 추적
//   const [downloadingFileId, setDownloadingFileId] = React.useState<string | null>(null);

//   // uploadProps를 현재 파일 리스트에 맞게 조정
//   const uploadProps = {
//     ...baseUploadProps,
//     fileList: currentFileList,
//     onChange: (info: any) => {
//       // 기존 onChange 로직을 실행하되, 현재 파일 리스트 상태를 업데이트
//       baseUploadProps.onChange(info);

//       if (!uploadOptions.immediate) {
//        // 즉시 업로드하지 않는 경우 - 파일을 임시로 저장
//         const tempFiles = info.fileList.map((file: any) => ({
//           ...file,
//           isTemp: !file.fileId,
//         }));

//         const existingDoneFiles = currentFileList.filter((f) => !f.isTemp);
//         const map = new Map<string, any>();
//         for (const f of existingDoneFiles) {
//           map.set(f.fileId || f.uid, f);
//         }
//         for (const f of tempFiles) {
//           map.set(f.fileId || f.uid, f);
//         }

//         setCurrentFileList?.(Array.from(map.values()));
//       }
//     },
//     onRemove: (file: any) => {
//       const updatedFiles = currentFileList.filter((item) => item.uid !== file.uid);
//       setCurrentFileList?.(updatedFiles);
//     },
//   };

//   // 초기 파일 설정
//   React.useEffect(() => {
//     if (initialFiles && initialFiles.length > 0 && !externalFileList) {
//       const formattedFiles = formatFileInfo(initialFiles);
//       setInternalFileList(formattedFiles);
//     }
//   }, [initialFiles, formatFileInfo, setInternalFileList, externalFileList]);

//   // 파일 리스트 변경 시 상위 컴포넌트에 알림 (내부 상태를 사용할 때만)
//   React.useEffect(() => {
//     if (!externalFileList) {
//       onFileListChange?.(internalFileList);
//     }
//   }, [internalFileList, onFileListChange, externalFileList]);

//   const requiredText = required ? <span className="text-red-500">*</span> : "";

//   const formatFileSize = (size: number) => {
//     return (size / 1024 / 1024).toFixed(2);
//   };

//   const getFileIcon = (file: UploadedFile) => {
//     if (file.type?.includes("image")) {
//       return "🖼️";
//     } else if (file.type?.includes("pdf")) {
//       return "📄";
//     } else if (file.type?.includes("document") || file.type?.includes("text")) {
//       return "📝";
//     }
//     return "📁";
//   };

//   const handleRemoveFile = (file: UploadedFile) => {
//     const updatedFiles = currentFileList.filter((item) => item.uid !== file.uid);
//     setCurrentFileList?.(updatedFiles);
//   };

//   const handleDownloadFile = async (file: UploadedFile) => {
//     if (!file.fileId) {
//       console.warn("File download failed: No fileId available");
//       return;
//     }

//     setDownloadingFileId(file.fileId);

//     try {
//       // axios를 사용하여 인증된 요청으로 파일 다운로드
//       const response = await axios.get(`/api/file/download/${file.fileId}`, {
//         responseType: "blob", // 파일 데이터를 blob으로 받기
//       });

//       // Blob을 사용하여 파일 다운로드
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);

//       // 임시 링크 생성하여 다운로드
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = file.name || "download"; // 파일명 설정
//       document.body.appendChild(link);
//       link.click();

//       // 정리
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("File download failed:", error);
//       // 실패 시 기존 방식으로 시도 (fallback)
//       if (file.url) {
//         window.open(file.url, "_blank");
//       }
//     } finally {
//       setDownloadingFileId(null);
//     }
//   };

//   if (variant === "button") {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         {label && (
//           <label className="block text-sm font-medium text-gray-700">
//             {label} {requiredText}
//           </label>
//         )}

//         <Upload {...uploadProps} showUploadList={false}>
//           <Button icon={<UploadOutlined />} loading={isUploading} className="w-full h-12">
//             {fileUploadHint || t("board-fileUpload-hint")}
//           </Button>
//         </Upload>

//         {/* 업로드된 파일 리스트 */}
//         {currentFileList && currentFileList.length > 0 && (
//           <div className="mt-4">
//             <h4 className="mb-2 font-medium text-gray-700">
//               {t("board-uploadedFile")} ({currentFileList.length})
//             </h4>
//             <div className="space-y-2">
//               {currentFileList.map((file) => (
//                 <div key={file.uid} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
//                   <div className="flex items-center flex-1 min-w-0 gap-3">
//                     <span className="text-lg">{getFileIcon(file)}</span>
//                     <div className="flex-1 min-w-0">
//                       <div className="font-medium text-gray-900 truncate">{file.name}</div>
//                       <div className="text-sm text-gray-500">
//                         {formatFileSize(file.size)} MB
//                         {file.isTemp && (
//                           <span className="px-2 py-1 ml-2 text-xs text-orange-800 bg-orange-100 rounded">
//                             {t("common-uploading")}
//                           </span>
//                         )}
//                         {file.status === "done" && !file.isTemp && (
//                           <span className="px-2 py-1 ml-2 text-xs text-green-800 bg-green-100 rounded">
//                             {t("common-uploadComplete")}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex gap-1">
//                     {!file.isTemp && (
//                       <Button
//                         type="text"
//                         size="small"
//                         icon={<DownloadOutlined />}
//                         loading={downloadingFileId === file.fileId}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDownloadFile(file);
//                         }}
//                         className="flex-shrink-0"
//                         title={t("common-download") as string}
//                       />
//                     )}
//                     <Button
//                       type="text"
//                       danger
//                       size="small"
//                       icon={<DeleteOutlined />}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRemoveFile(file);
//                       }}
//                       className="flex-shrink-0"
//                       title={t("common-delete") as string}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // 기본 드래그앤드롭 형식
//   return (
//     <div className={`space-y-4 ${className}`}>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700">
//           {label} {requiredText}
//         </label>
//       )}

//       <Upload.Dragger {...uploadProps} className="hover:border-blue-400">
//         <p className="ant-upload-drag-icon">
//           <UploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
//         </p>
//         <p className="text-lg font-medium ant-upload-text">{label || t("board-fileUpload")}</p>
//         <p className="text-gray-500 ant-upload-hint">{fileUploadHint || t("board-fileUpload-hint")}</p>
//       </Upload.Dragger>

//       {/* 업로드된 파일 리스트 */}
//       {currentFileList && currentFileList.length > 0 && (
//         <div className="mt-4">
//           <h4 className="mb-2 font-medium text-gray-700">
//             {t("board-uploadedFile")} ({currentFileList.length})
//           </h4>
//           <div className="space-y-2">
//             {currentFileList.map((file) => (
//               <div
//                 key={file.uid}
//                 className="flex items-center justify-between p-3 transition-colors border rounded-lg bg-gray-50 hover:bg-gray-100"
//               >
//                 <div className="flex items-center flex-1 min-w-0 gap-3">
//                   <span className="text-lg">{getFileIcon(file)}</span>
//                   <div className="flex-1 min-w-0">
//                     <div className="font-medium text-gray-900 truncate">{file.name}</div>
//                     <div className="text-sm text-gray-500">
//                       {formatFileSize(file.size)} MB
//                       {file.isTemp && (
//                         <span className="px-2 py-1 ml-2 text-xs text-orange-800 bg-orange-100 rounded">
//                           {t("common-uploading")}
//                         </span>
//                       )}
//                       {file.status === "done" && !file.isTemp && (
//                         <span className="px-2 py-1 ml-2 text-xs text-green-800 bg-green-100 rounded">
//                           {t("common-uploadComplete")}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-1">
//                   {!file.isTemp && (
//                     <Button
//                       type="text"
//                       size="small"
//                       icon={<DownloadOutlined />}
//                       loading={downloadingFileId === file.fileId}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDownloadFile(file);
//                       }}
//                       className="flex-shrink-0"
//                       title={t("common-download") as string}
//                     />
//                   )}
//                   <Button
//                     type="text"
//                     danger
//                     size="small"
//                     icon={<DeleteOutlined />}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveFile(file);
//                     }}
//                     className="flex-shrink-0"
//                     title={t("common-delete") as string}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploadArea;
