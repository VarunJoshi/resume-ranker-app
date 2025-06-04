import axios from 'axios';

export const rankResumes = async (
  jobDescription: string,
  weights: { [key: string]: number },
  weightVsJD: number,
  files: File[]
) => {
  const formData = new FormData();

  formData.append('job_description', jobDescription);
  formData.append('weights', JSON.stringify(weights));
  formData.append('weight_vs_jd', weightVsJD.toString());

  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await axios.post('http://localhost:8000/rank', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
