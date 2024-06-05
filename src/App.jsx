import './App.css'
import Card from './card.jsx'

function App() {
  return (
    <div className='container'>
      <h1>WaterQual</h1>
      <div className='options'>
        <Card title='pH' isRequired={true} />
      </div>
      <button>Check Potability</button>
    </div>
  )
}

export default App
