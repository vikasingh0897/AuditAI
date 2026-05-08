import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuditForm from './pages/AuditForm';
import ResultsDashboard from './pages/ResultsDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-surface">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* The intake form where users configure their stack */}
            <Route path="/auditpage" element={<AuditForm />} />
            {/* The results dashboard showing savings, AI summary, and the Lead Capture modal */}
            <Route path="/audit/:slug" element={<ResultsDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
