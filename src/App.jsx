import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ListingManagement from './pages/ListingManagement';
import TransactionManagement from './pages/TransactionManagement';
import DisputeManagement from './pages/DisputeManagement';
import NotificationManagement from './pages/NotificationManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="listings" element={<ListingManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
          <Route path="disputes" element={<DisputeManagement />} />
          <Route path="notifications" element={<NotificationManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
