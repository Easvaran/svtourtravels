"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete Package",
  cancelText = "Cancel",
  isLoading = false
}: ConfirmModalProps) {
  // Highlight "cannot be undone" text if present in message
  const formattedMessage = message.split(/(cannot be undone)/i).map((part, i) => 
    part.toLowerCase() === "cannot be undone" 
      ? <span key={i} className="text-red-600 font-bold underline decoration-red-200 decoration-2 underline-offset-4">{part}</span> 
      : part
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="relative bg-white w-full max-w-md rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100"
          >
            {/* Header / Icon Area */}
            <div className="pt-8 px-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50/50">
                <AlertCircle size={28} />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
                <p className="text-slate-500 font-medium text-base leading-relaxed">
                  {formattedMessage}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] order-2 sm:order-1"
              >
                {cancelText}
              </button>
              
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-200 active:scale-[0.98] flex items-center justify-center gap-2 order-1 sm:order-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={16} />
                    {confirmText}
                  </>
                )}
              </button>
            </div>

            {/* Subtle Top Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
