import AuthProvider from "./utils/AuthProvider";
import Router from "./Router";
import { IsMobileProvider } from "./contexts/IsMobileContext"; // Importa o contexto
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<AuthProvider>
			<IsMobileProvider>
				<Router />
			</IsMobileProvider>
		</AuthProvider>
	);
}

export default App;
