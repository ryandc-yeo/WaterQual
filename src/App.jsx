import './App.css'
import Card from './card.jsx'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    ph: '', Hardness: '', Solids: '', Chloramines: '', Sulfate: '',
    Conductivity: '', Organic_carbon: '', Trihalomethanes: '', Turbidity: ''
  });
  const placeholders = {
    ph: 'pH',
    Hardness: 'mg/L',
    Solids: 'ppm',
    Chloramines: 'ppm',
    Sulfate: 'mg/L',
    Conductivity: 'μS/cm',
    Organic_carbon: 'ppm',
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
      const response = await axios.post('http://127.0.0.1:5000/predict', inputs);
      console.log(`potability:`, response.data.potability); 
      if (response.data.potability) {
        navigate('/potablity', { state: { title: 'Potable', message: response.data.message}}); // Passing state
      } else {
        navigate('/potablity', { state: { title: 'Not Potable', message: response.data.message } }); // Adjust as needed
      }

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
