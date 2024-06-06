import './App.css'
import Card from './card.jsx'

function App() {
  return (
    <div className='container'>
      <h1>WaterQualTester</h1>
      <div className='options'>
        <Card title='pH' placeholder='pH' />
        <Card title='Hardness' placeholder='mg/L' isRequired={true} />
        <Card title='Solids' placeholder='ppm' isRequired={true} />
        <Card title='Chloramines' placeholder='ppm' isRequired={true} />
        <Card title='Sulfate' placeholder='mg/L' />
        <Card title='Conductivity' placeholder='μS/cm' isRequired={true} />
        <Card title='Organic Carbon' placeholder='ppm' isRequired={true} />
        <Card title='Trihalomethanes' placeholder='μg/L' />
        <Card title='Turbidity' placeholder='NTU' isRequired={true} />
      </div>
      <button>Check Potability</button>
    </div>
  )
}

export default App
