import React, { useState } from "react";
import api from "../../utils/api";
import { Button } from "../ui/button";
import { toast } from "sonner";

const SubmitProofModal = ({
  task,
  onClose,
  onUploadSuccess,
  updateUserData,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file first");

    setUploading(true);
    const formData = new FormData();
    formData.append("proof", file);

    try {
      await api.patch(`/tasks/complete/${task._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Task completed and proof uploaded!");
      onUploadSuccess();
      if (updateUserData) {
        await updateUserData();
      }
      onClose();
    } catch (err) {
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border p-4 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold">Submit Proof</h2>
        <p className="text-gray-500 mb-6">
          Task: <span>{task.taskTitle}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="block hover:file:cursor-pointer w-full text-sm text-gray-400 file:mr-4 file:py-1.5 file:px-2.5 file:rounded-lg file:text-sm file:font-medium file:bg-blue-700 file:text-white hover:file:bg-blue-600 mb-6"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploading}
              className="disabled:bg-blue-600 hover:bg-blue-600"
            >
              {uploading ? "Uploading..." : "Submit Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProofModal;
