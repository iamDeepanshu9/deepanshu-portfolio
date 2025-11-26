"use client";

import { motion } from "framer-motion";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    itemName,
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-black mb-2">Confirm Delete</h3>
                    <p className="text-gray-700">
                        Are you sure you want to delete <span className="font-bold">"{itemName}"</span>?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
