import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterests } from "../../contexts/InterestsProvider";
import { Stack, Button } from "react-bootstrap";
import NotificationCard from "./NotificationCard";

export default function NotificationsOffCanvas() {
	const context = useInterests();
	if (!context) return null;
	const {
		closeNotifications,
		numNotifications,
		notifications,
		markAsRead,
		markAllAsRead,
		markAsUnread,
		markAllAsUnread,
		deleteNotification,
		deleteAllNotifications,
	} = context;

	const navigate = useNavigate();
	return (
		<>
			<div
				className="cart-overlay"
				onClick={closeNotifications}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: "rgba(0, 0, 0, 0.5)",
					zIndex: "2",
					transition: "opacity 0.3s ease-in-out",
				}}
			></div>
			<Stack
				style={{
					backgroundColor: "var(--white)",
					color: "var(dark-grey)",
					fontFamily: "var(--body-font)",
					position: "fixed",
					right: "0",
					top: "0",
					width: "400px",
					height: "95%",
					transition: "transform 0.3s ease-in-out",
					zIndex: "3",
				}}
				className="p-4 m-3 rounded-sm"
				gap={3}
			>
				<Stack
					direction="horizontal"
					className="justify-content-between border-bottom pb-1"
				>
					<h5>Notifications({numNotifications})</h5>
					<Button
						onClick={closeNotifications}
						style={{ background: "none", border: "none" }}
					>
						<i
							className="pi pi-times"
							style={{ color: "var(--dark-grey)" }}
						></i>
					</Button>
				</Stack>
				<Stack gap={3} className="overflow-auto" style={{ height: "80%" }}>
					{notifications.length > 0 ? (
						notifications.map((notification, index) => (
							<NotificationCard
								key={index}
								notification={notification}
								markAsRead={markAsRead}
								markAsUnread={markAsUnread}
								deleteNotification={deleteNotification}
							/>
						))
					) : (
						<p>No notifications available.</p>
					)}
				</Stack>
			</Stack>
		</>
	);
}
