import React from 'react';

type Props = {
  weights: { [key: string]: number };
  setWeights: (weights: { [key: string]: number }) => void;
};

const WeightedSlider: React.FC<Props> = ({ weights, setWeights }) => {
  const updateWeight = (key: string, value: number) => {
    const newWeights = { ...weights, [key]: value };
    setWeights(newWeights);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>⚖️ Weighted Criteria (must total 100%)</h3>
      {Object.entries(weights).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '0.5rem' }}>
          <label>{key}: {value}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => updateWeight(key, Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  );
};

export default WeightedSlider;
