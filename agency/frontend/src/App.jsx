import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Footer, About, FinalExpenseLeads, MedicareAdvantage, ACALiveTransfers , Query, AutoInsurance, ACASubsidyForm, PrivacyPolicy, SSDILeads} from './component/index';
import Layout from './Layout';
import ScrollToTop from './ScrollTop';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Routes with layout (Header/Footer stays the same) */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/verticals/aca" element={<ACALiveTransfers />} />

          <Route path="/subsidizedhealthplan/aca" element={<ACASubsidyForm />} />

          <Route path="/verticals/fe" element={<FinalExpenseLeads />} />
          <Route path="/verticals/medicare" element={<MedicareAdvantage />} />
          <Route path="/verticals/ssdi" element={<SSDILeads />} />
          <Route path="/verticals/auto-insurance" element={<AutoInsurance />} />

          <Route path="/query" element={<Query />} />
          {/* You can add more nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
