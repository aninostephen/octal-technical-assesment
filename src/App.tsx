import Wrapper from './hocs/Wrapper';
import Rates from './modules/rates';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {

  return (
    <Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Rates />
      </LocalizationProvider>
    </Wrapper>
  )
}

export default App
