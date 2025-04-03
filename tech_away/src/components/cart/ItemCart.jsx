import React from "react";
import { Stack } from "react-bootstrap";

export default function ItemCart({ equipment }) {
	const itemTemplate = (item) => {
		return (
			<div className="flex flex-wrap p-2 align-items-center gap-3">
				<Image src={`../../../public/assets/pc.jpg`} width={100} height={100} />

				<div className="flex-1 flex flex-column gap-2 xl:mr-8">
					<span className="font-bold">{item.name}</span>
					<div className="flex align-items-center gap-2">
						<i className="pi pi-tag text-sm"></i>
						<span>{item.category}</span>
					</div>
				</div>
				<span className="font-bold text-900">${item.price}</span>
			</div>
		);
	};
	return <Stack></Stack>;
}
