import Landmark from 'pages/Landmark';
import Rtc from 'pages/Rtc';
import { Link, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <StyledWrapper>
      <h1>Welcome!</h1>
      <Link to="/rtc">WebRTC Demo</Link>
      <br />
      <Link to="/landmark">Face Landmark Detection Demo</Link>

      <Routes>
        <Route path="/rtc" element={<Rtc />} />
        <Route path="/landmark" element={<Landmark />} />
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
