import './App.css'
import Card from './card.jsx'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputs, setInputs] = useState({
    pH: '', Hardness: '', Solids: '', Chloramines: '', Sulfate: '',
    Conductivity: '', OrganicCarbon: '', Trihalomethanes: '', Turbidity: ''
  });
  const placeholders = {
    pH: 'pH',
    Hardness: 'mg/L',
    Solids: 'ppm',
    Chloramines: 'ppm',
    Sulfate: 'mg/L',
    Conductivity: 'μS/cm',
    OrganicCarbon: 'ppm',
    Trihalomethanes: 'μg/L',
    Turbidity: 'NTU'
  };

  const handleInputChange = (name, value) => {
    // console.log(`Input realz for ${name}:`, value);  
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
    // console.log(`Input realz for ${inputs[name]}:`, value);  
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', inputs);
      alert('Water Potability: ' + (response.data.potability ? 'Potable' : 'Not Potable'));
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      alert('Failed to fetch predictions');
    }
  };
  console.log('Rendering App, current state:', inputs);
  return (
    <div className='container'>
      <h1>WaterQualTester</h1>
      <div className='options'>
      {Object.keys(inputs).map(key => (
          <Card
            key={key}
            title={key}
            placeholder={placeholders[key]}
            value={inputs[key]}
            onChange={handleInputChange}
          />
        ))}
        {/* <Card title='pH' placeholder='pH' />
        <Card title='Hardness' placeholder='mg/L' isRequired={true} />
        <Card title='Solids' placeholder='ppm' isRequired={true} />
        <Card title='Chloramines' placeholder='ppm' isRequired={true} />
        <Card title='Sulfate' placeholder='mg/L' />
        <Card title='Conductivity' placeholder='μS/cm' isRequired={true} />
        <Card title='Organic Carbon' placeholder='ppm' isRequired={true} />
        <Card title='Trihalomethanes' placeholder='μg/L' />
        <Card title='Turbidity' placeholder='NTU' isRequired={true} /> */}
      </div>
      <button onClick={handleSubmit}>Check Potability</button>
    </div>
  )
}

export default App
