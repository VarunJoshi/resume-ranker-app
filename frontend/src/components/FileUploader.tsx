import React from 'react';

type Props = {
  onUpload: (files: File[]) => void;
};

const FileUploader: React.FC<Props> = ({ onUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        📄 Upload Resumes:
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default FileUploader;
