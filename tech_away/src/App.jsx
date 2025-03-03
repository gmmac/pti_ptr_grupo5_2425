import AuthProvider from "./utils/AuthProvider";
import Router from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
