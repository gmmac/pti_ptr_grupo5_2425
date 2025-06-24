import React from "react";
import { Button, Stack } from "react-bootstrap";

export default function NotificationCard({
	notification,
	markAsRead,
	markAsUnread,
	deleteNotification,
}) {
	return (
		<Stack
			className="px-3 py-2 justify-content-between align-content-center"
			direction="horizontal"
			style={{
				backgroundColor:
					notification?.isRead === false
						? "var(--variant-one-light)"
						: "var(--light-grey)",
				borderRadius: "16px",
				color: "var(--dark-grey)",
				fontFamily: "var(--body-font)",
				maxHeight: "110px",
			}}
		>
			<Stack direction="vertical" gap={2} className="w-100">
				<div>
					<h6
						style={{
							color:
								notification?.isRead === false
									? "var(--variant-one-dark)"
									: "var(--dark-grey)",
							fontFamily: "var(--body-font)",
						}}
						className={
							notification?.isRead === false ? "m-0" : "text-muted m-0"
						}
					>
						Is now available
					</h6>
					<h6
						style={{
							color:
								notification?.isRead === false
									? "var(--variant-one-dark)"
									: "var(--dark-grey)",
							fontFamily: "var(--title-font)",
						}}
						className={
							notification?.isRead === false ? "m-0" : "text-muted m-0"
						}
					>
						{[
							notification?.interest?.model?.name,
							notification?.interest?.brand?.name,
							notification?.interest?.type?.name,
							notification?.interest?.equipmentStatus?.state,
						]
							.filter(Boolean)
							.join(" · ")}
					</h6>
				</div>
				<div>
					{notification?.isRead === false ? (
						<Button
							className="d-flex gap-2 flwx-row align-items-center p-0"
							style={{
								backgroundColor: "transparent",
								border: "none",
								color: "var(--dark-grey)",
							}}
							onClick={() => markAsRead(notification.id)}
							size="sm"
						>
							<i className="pi pi-eye"></i>
							<span>Mark as read</span>
						</Button>
					) : (
						<Button
							className={
								notification?.isRead === false
									? "d-flex gap-2 flwx-row align-items-center p-0"
									: "text-muted d-flex gap-2 flwx-row align-items-center p-0"
							}
							style={{
								backgroundColor: "transparent",
								border: "none",
								color: "var(--dark-grey)",
							}}
							onClick={() => markAsUnread(notification.id)}
							size="sm"
						>
							<i className="pi pi-envelope"></i>
							<span>Mark as unread</span>
						</Button>
					)}
				</div>
			</Stack>
			<Stack>
				<Button
					className={
						notification?.isRead === false
							? "d-flex gap-2 flwx-row align-items-center p-0"
							: "text-muted d-flex gap-2 flwx-row align-items-center p-0"
					}
					style={{
						backgroundColor: "transparent",
						border: "none",
						color: "var(--dark-grey)",
					}}
					onClick={() => deleteNotification(notification.id)}
					size="sm"
				>
					<i className="pi pi-times"></i>
				</Button>
			</Stack>
		</Stack>
	);
}
