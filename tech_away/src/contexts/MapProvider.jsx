// MapProvider.js
import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// Cria o contexto
const MapContext = createContext(null);

export const useMap = () => useContext(MapContext);

const containerStyle = {
	width: "100%",
	height: "400px",
	borderRadius: "var(--rounded-sm)",
};

export default function MapProvider({ children }) {
	const [map, setMap] = useState(null);
	const [center, setCenter] = useState(null);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
	});

	// para a localização atual do utilizador
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Erro ao obter localização:", error);
					setCenter({ lat: 38.756639, lng: -9.156338 });
				}
			);
		} else {
			console.error("Geolocalização não suportada");
			setCenter({ lat: 38.756639, lng: -9.156338 });
		}
	}, []);

	const onLoad = useCallback((mapInstance) => {
		setMap(mapInstance);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	if (loadError) return <div>Erro ao carregar o mapa</div>;
	if (!isLoaded) return <div>Carregando mapa...</div>;

	return (
		<MapContext.Provider value={{ map }}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={14}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{children}
			</GoogleMap>
		</MapContext.Provider>
	);
}
