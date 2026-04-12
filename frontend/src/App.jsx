import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Report from '../pages/Report'
import Privacy from '../pages/Privacy'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report/:datasetId" element={<Report />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  )
}

export default App