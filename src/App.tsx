import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Home } from '@/pages/Home';
import { AddScrap } from '@/pages/AddScrap';
import { PriceBoard } from '@/pages/PriceBoard';
import { RecyclerMatching } from '@/pages/RecyclerMatching';
import { LotDetails } from '@/pages/LotDetails';
import { Handover } from '@/pages/Handover';
import { Earnings } from '@/pages/Earnings';
import { Safety } from '@/pages/Safety';
import { Profile } from '@/pages/Profile';
import { Lots } from '@/pages/Lots';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-scrap" element={<AddScrap />} />
          <Route path="/prices" element={<PriceBoard />} />
          <Route path="/recyclers" element={<RecyclerMatching />} />
          <Route path="/lots" element={<Lots />} />
          <Route path="/lots/:id" element={<LotDetails />} />
          <Route path="/handover/:id" element={<Handover />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
