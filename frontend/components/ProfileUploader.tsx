/** @format */

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, FileText, X, Plus } from "lucide-react";

interface ProfileUploaderProps {
    type: "image" | "document";
    label: string;
    description: string;
    maxFiles?: number;
    files: File[];
    onFilesChange: (files: File[]) => void;
    accept?: string;
}

export default function ProfileUploader({
    type,
    label,
    description,
    maxFiles = 5,
    files,
    onFilesChange,
    accept,
}: ProfileUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);
        const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
        onFilesChange(combinedFiles);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onFilesChange(newFiles);
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const getFilePreview = (file: File) => {
        if (type === "image" && file.type.startsWith("image/")) {
            return URL.createObjectURL(file);
        }
        return null;
    };

    const IconComponent = type === "image" ? Image : FileText;
    const gradientColor =
        type === "image"
            ? "from-pink-500 to-rose-500"
            : "from-blue-500 to-indigo-600";

    return (
        <div className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                    {label}
                </label>
                <p className="mb-3 text-sm text-gray-600">{description}</p>
            </div>

            {/* Upload Area */}
            <motion.div
                className={`
          border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer
          ${
              isDragOver
                  ? "bg-violet-50 border-violet-400"
                  : "border-gray-300 hover:border-violet-400 hover:bg-violet-50"
          }
          ${files.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={files.length < maxFiles ? openFileDialog : undefined}
                whileHover={files.length < maxFiles ? { scale: 1.02 } : {}}
                whileTap={files.length < maxFiles ? { scale: 0.98 } : {}}
            >
                <div className="text-center">
                    <div
                        className={`flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-gradient-to-r rounded-lg ${gradientColor}`}
                    >
                        <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        {files.length >= maxFiles
                            ? "최대 업로드 수에 도달했습니다"
                            : "클릭하거나 파일을 드래그해주세요"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {files.length}/{maxFiles}개 업로드됨
                    </p>
                </div>
            </motion.div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={accept}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
            />

            {/* File Preview Grid */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {files.map((file, index) => (
                        <motion.div
                            key={`${file.name}-${index}`}
                            className="overflow-hidden relative bg-white rounded-xl border border-gray-200 group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {type === "image" && getFilePreview(file) ? (
                                <div className="aspect-square">
                                    <img
                                        src={getFilePreview(file) as string}
                                        alt={file.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center p-4 aspect-square">
                                    <FileText className="mb-2 w-8 h-8 text-gray-400" />
                                    <p className="w-full text-xs text-center text-gray-600 truncate">
                                        {file.name}
                                    </p>
                                </div>
                            )}

                            {/* Remove Button */}
                            <motion.button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="flex absolute top-2 right-2 justify-center items-center w-6 h-6 text-white bg-red-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-3 h-3" />
                            </motion.button>

                            {/* File Info Overlay */}
                            <div className="absolute right-0 bottom-0 left-0 p-2 text-white opacity-0 transition-opacity bg-black/50 group-hover:opacity-100">
                                <p className="text-xs truncate">{file.name}</p>
                                <p className="text-xs text-gray-300">
                                    {(file.size / 1024 / 1024).toFixed(1)}MB
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add More Button */}
                    {files.length < maxFiles && (
                        <motion.button
                            type="button"
                            onClick={openFileDialog}
                            className="flex flex-col justify-center items-center rounded-xl border-2 border-gray-300 border-dashed transition-all duration-200 aspect-square hover:border-violet-400 hover:bg-violet-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex justify-center items-center mb-2 w-8 h-8 bg-gray-200 rounded-full">
                                <Plus className="w-4 h-4 text-gray-500" />
                            </div>
                            <p className="text-xs text-center text-gray-500">
                                추가 업로드
                            </p>
                        </motion.button>
                    )}
                </div>
            )}

            {/* Guidelines */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="mb-2 text-sm font-semibold text-blue-700">
                    📝 업로드 가이드라인
                </h4>
                <ul className="space-y-1 text-xs text-blue-600">
                    {type === "image" ? (
                        <>
                            <li>• 최대 {maxFiles}장까지 업로드 가능합니다</li>
                            <li>• JPG, PNG 형식만 지원됩니다</li>
                            <li>
                                • 얼굴이 선명하게 나온 사진을 업로드해주세요
                            </li>
                            <li>• 최근 6개월 이내 촬영된 사진을 권장합니다</li>
                        </>
                    ) : (
                        <>
                            <li>• 신분증, 재직증명서, 졸업증명서 등</li>
                            <li>• PDF, JPG, PNG 형식으로 업로드해주세요</li>
                            <li>• 개인정보가 선명하게 보이도록 촬영해주세요</li>
                            <li>• 서류는 검토 후 안전하게 폐기됩니다</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
