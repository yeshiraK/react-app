import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-4 border-b border-[#2D2B1E] border-opacity-20">
          <h2 className="text-xl font-semibold text-[#2D2B1E]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2D2B1E] hover:bg-opacity-10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#2D2B1E]" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}