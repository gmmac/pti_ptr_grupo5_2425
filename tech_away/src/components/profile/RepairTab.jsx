import { useState, useEffect } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import RepairInfo from "../repair/RepairInfo";
import api from "../../utils/axios";

export default function RepairTab() {
	const { user } = useAuth();
	const [repairs, setRepairs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filterDate, setFilterDate] = useState("");
	const [params, setParams] = useState({
		activeRepairs: true,
	});
	const [showRepairInfo, setShowRepairInfo] = useState(false);
	const [repairID, setRepairID] = useState(null);

	useEffect(() => {
		if (user) {
			fetchRepairs();
		}
	}, [user, filterDate]);

	const fetchRepairs = async () => {
		setLoading(true);

		try {
			const queryParams = {
				activeRepairs: true,
			};

			if (filterDate) {
				queryParams.createdAt = filterDate;
			}

			const res = await api.get(`/api/repair/displayTable/${user.nic}`, {
				params: queryParams,
			});

			setRepairs(res.data.data || []);
			console.log("Repairs fetched:", res.data.data);
		} catch (error) {
			console.error("Erro ao carregar reparações:", error);
		} finally {
			setLoading(false);
		}
	};
	const openRepairInfo = (repairID) => {
		setShowRepairInfo(true);
		setRepairID(repairID);
	};

	return (
		<>
			<Stack direction="vertical" gap={3} className="px-4">
				<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
					My Repairs
				</h5>
				<div>
					<Form.Group className="mb-4" controlId="filterDate">
						<Form.Label style={{ color: "var(--variant-two-dark" }}>
							Filter by date
						</Form.Label>
						<Stack
							style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
							direction="horizontal"
						>
							<Form.Control
								className="rounded-pill"
								type="date"
								value={filterDate}
								onChange={(e) => setFilterDate(e.target.value)}
							/>
							<Button
								variant="secondary"
								className="rounded-pill w-25"
								onClick={() => setFilterDate("")}
								disabled={!filterDate}
							>
								Clear
							</Button>
						</Stack>
					</Form.Group>
					{repairs.length === 0 && !loading && (
						<p className="text-center">No repairs found.</p>
					)}
					<Stack
						direction="vertical"
						className="pe-2"
						gap={2}
						style={{ overflowY: "auto", maxHeight: "350px" }}
					>
						{repairs.length > 0 &&
							!loading &&
							repairs.map((repair) => (
								<Stack
									key={repair.id}
									direction="horizontal"
									gap={2}
									style={{
										backgroundColor: "#eae6f0",
										padding: "20px",
										borderRadius: "16px",
										maxHeight: "130px",
									}}
									className="p-4"
								>
									<Stack direction="vertical" gap={2}>
										<h6
											className="m-0"
											style={{ fontFamily: "var(--title-font)" }}
										>
											Order ID: {repair.id}
										</h6>
										<p className="text-muted">By {repair.employeeName}</p>
										<Button
											onClick={() => openRepairInfo(repair.id)}
											className="rounded-pill w-50 text-start p-0"
											style={{
												backgroundColor: "transparent",
												border: "none",
											}}
										>
											<i
												className="pi pi-eye"
												style={{ color: "var(--dark-grey)" }}
											></i>
											<span
												className="ms-2"
												style={{ color: "var(--dark-grey)" }}
											>
												View details
											</span>
										</Button>
									</Stack>
									<Stack direction="vertical" gap={2} className="text-end">
										<h6>{repair.modelName}</h6>
										<p className="text-muted">{repair.state}</p>
									</Stack>
								</Stack>
							))}
					</Stack>
				</div>
			</Stack>
			<RepairInfo
				repairID={repairID}
				show={showRepairInfo}
				onClose={() => setShowRepairInfo(false)}
			/>
		</>
	);
}
