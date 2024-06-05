import './App.css'
import Card from './card.jsx'

function App() {
  return (
    <div className='container'>
      <h1>WaterQual</h1>
      <div className='options'>
        <Card title='pH' />
        <Card title='Hardness' isRequired={true} />
        <Card title='Solids' isRequired={true} />
        <Card title='Chloramines' isRequired={true} />
        <Card title='Sulfate' />
        <Card title='Conductivity' isRequired={true} />
        <Card title='Organic Carbon' isRequired={true} />
        <Card title='Trihalomethanes' />
        <Card title='Turbidity' isRequired={true} />
      </div>
      <button>Check Potability</button>
    </div>
  )
}

export default App
