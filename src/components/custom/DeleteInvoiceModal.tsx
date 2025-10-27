import Button from "../ui/Button";

interface DeleteModalProps {
  invoiceId: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  invoiceId,
  onClose,
  isSubmitting,
  onConfirm,
}) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal__overlay" onClick={onClose}></div>

      <div className="delete-modal__content">
        <h2 className="delete-modal__title">Confirm Deletion</h2>
        <p className="delete-modal__message">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        <div className="delete-modal__actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {isSubmitting ? "Deleting" : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
