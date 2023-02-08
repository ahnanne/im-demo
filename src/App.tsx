import { Link, Routes, Route } from 'react-router-dom';
import Landmark from 'pages/Landmark';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

function App() {
  return (
    <StyledWrapper>
      <ToastContainer limit={1} />
      <StyledH1>
        인터뷰<span>메이트</span>
      </StyledH1>
      <Link to="/landmark">Facial Landmark Detection Demo</Link>

      <Routes>
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

const StyledH1 = styled.h1`
  & > span {
    color: var(--theme);
  }

  & ~ a {
    color: var(--theme);
    font-size: 24px;
    font-style: italic;
  }
`;

export default App;
