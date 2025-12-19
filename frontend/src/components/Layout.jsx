import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Overview from '../pages/Overview.jsx'
import CreasTable from '../pages/CreasTable.jsx'
import CreaDetail from '../pages/CreaDetail.jsx'

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/creas" element={<CreasTable />} />
          <Route path="/crea/:id" element={<CreaDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default Layout

