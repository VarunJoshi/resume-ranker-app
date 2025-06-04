import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import WeightedSlider from './components/WeightedSlider';
import ResultsView from './components/ResultsView';
import { rankResumes } from './api';


const App = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [weights, setWeights] = useState<{ [key: string]: number }>({
    'Co-Founder Experience': 25,
    'Business Development': 25,
    'Technical Leadership': 25,
    'Education': 25,
  });
  const [weightVsJD, setWeightVsJD] = useState(50); // Slider between 0–100

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎯 Resume Ranker</h1>

      <h3>Job Description:</h3>
      <textarea
        rows={6}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <FileUploader onUpload={setResumes} />

      <WeightedSlider weights={weights} setWeights={setWeights} />

      <div>
        <label>💡 Weigh Criteria vs JD Match: {weightVsJD}%</label>
        <input
          type="range"
          min={0}
          max={100}
          value={weightVsJD}
          onChange={(e) => setWeightVsJD(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <button
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: 'navy',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={async () => {
          try {
            const result = await rankResumes(jobDescription, weights, weightVsJD, resumes);
            console.log('🎉 Server response:', result);
            alert("Server says: " + JSON.stringify(result, null, 2));
          } catch (error) {
            console.error('❌ Error:', error);
            alert('Something went wrong while ranking resumes.');
          }
        }}
      >
        🔍 Analyze Resumes
      </button>

      <ResultsView />
    </div>
  );
};

export default App;
