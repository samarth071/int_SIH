import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import SOSPage from './pages/SOSPage.jsx';
import LocationShare from './pages/LocationShare.jsx';
import ReportIncident from './pages/ReportIncident.jsx';
import Shelters from './pages/Shelters.jsx';
import MissingPerson from './pages/MissingPerson.jsx';
import MedicalSupport from './pages/MedicalSupport.jsx';
import Alerts from './pages/Alerts.jsx';
import SafetyGuide from './pages/SafetyGuide.jsx';
import MyRequests from './pages/MyRequests.jsx';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  function navigate(page) {
    setCurrentPage(page);
  }

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'sos':
        return <SOSPage navigate={navigate} />;
      case 'location':
        return <LocationShare navigate={navigate} />;
      case 'report':
        return <ReportIncident navigate={navigate} />;
      case 'shelters':
        return <Shelters navigate={navigate} />;
      case 'missing':
        return <MissingPerson navigate={navigate} />;
      case 'medical':
        return <MedicalSupport navigate={navigate} />;
      case 'alerts':
        return <Alerts navigate={navigate} />;
      case 'safety-guide':
        return <SafetyGuide navigate={navigate} />;
      case 'my-requests':
        return <MyRequests navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  }

  return (
    <div className="portal-wrapper">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="portal-main" id="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
