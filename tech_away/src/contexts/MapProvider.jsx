// MapProvider.js
import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import api from "../utils/axios";
import { Stack } from "react-bootstrap";
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
	const [stores, setStores] = useState([]);
	const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
	});

	// get de todas as stores
	useEffect(() => {
		api
			.get(`api/store`)
			.then((res) => setStores(res.data.data))
			.catch((error) => console.error("Error getting stores: ", error));
	}, []);

	useEffect(() => {
		console.log(stores);
	}, [stores]);

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
				{stores &&
					stores.map((store, index) => {
						const lat = parseFloat(store.latitude);
						const lng = parseFloat(store.longitude);
						const isHovered = hoveredMarkerId === index;
						return (
							<React.Fragment key={index}>
								<Marker
									position={{ lat, lng }}
									onClick={() => setHoveredMarkerId(index)}
									// onMouseOut={() => setHoveredMarkerId(null)}
								/>
								{isHovered && (
									<InfoWindow
										position={{ lat, lng }}
										// onCloseClick={() => setHoveredMarkerId(null)}
										options={{
											headerDisabled: true,
										}}
									>
										<Stack spacing={1} p={1} sx={{ maxWidth: 250 }}>
											<Stack
												direction="horizontal"
												className="justify-content-between align-items-center"
											>
												<h6 className="mb-0">{store.name}</h6>
												<button
													className="btn-close btn-sm"
													aria-label="Close"
													onClick={() => setHoveredMarkerId(null)}
												/>
											</Stack>

											<p className="mb-1">📧 {store.email}</p>
											<p className="mb-0">📍 {store.address}</p>
										</Stack>
									</InfoWindow>
								)}
							</React.Fragment>
						);
					})}
				{children}
			</GoogleMap>
		</MapContext.Provider>
	);
}
