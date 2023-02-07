import { Link, Routes, Route } from 'react-router-dom';
import Rtc from 'pages/Rtc';
import Landmark from 'pages/Landmark';
import Segmentation from 'pages/Segmentation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

function App() {
  return (
    <StyledWrapper>
      <ToastContainer />
      <h1>Welcome!</h1>
      <Link to="/rtc">WebRTC Demo</Link>
      <br />
      <Link to="/landmark">Face Landmark Detection Demo</Link>
      <br />
      <Link to="/segmantation">Face Body Segmentation Demo</Link>

      <Routes>
        <Route path="/rtc" element={<Rtc />} />
        <Route path="/landmark" element={<Landmark />} />
        <Route path="/segmantation" element={<Segmentation />} />
      </Routes>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export default App;
