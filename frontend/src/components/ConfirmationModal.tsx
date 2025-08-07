import React from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'btn btn-danger'
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-meta-border">
            <h3 className="text-lg font-semibold text-meta-text">
              {title}
            </h3>
          </div>
          
          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-meta-textSecondary">
              {message}
            </p>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-meta-border flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={confirmButtonClass}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
