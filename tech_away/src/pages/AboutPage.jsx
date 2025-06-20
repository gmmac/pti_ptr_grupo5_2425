import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { IsMobileContext } from "../contexts/IsMobileContext";
import SecondLifeSm from "../components/decoration/SecondLifeSm";
import SecondLife from "../components/decoration/SecondLife";

export default function AboutPage() {
	const isMobile = useContext(IsMobileContext);

	return (
		<Container
			style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
			className="mb-navbar"
		>
			<Stack direction="vertical" gap={4}>
				{isMobile ? <SecondLifeSm /> : <SecondLife />}
				<Stack
					direction="vertical"
					className="p-5"
					gap={3}
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: isMobile ? "var(--rounded-sm)" : "var(--rounded-lg)",
					}}
				>
					<p>
						At{" "}
						<span style={{ fontFamily: "var(title-font)", fontWeight: "bold" }}>
							TechAway
						</span>
						, we believe in giving technology a second life. With a nationwide
						network of stores, we specialize in buying, selling, repairing, and
						donating used electronic equipment. Whether you're looking to
						upgrade, recycle responsibly, or support a charitable cause, we
						offer a sustainable and smart alternative.
					</p>
					<p>
						Our stores serve as trusted hubs where individuals can sell their
						used electronics, receive repair estimates, or donate items to
						support nonprofit organizations. Customers can also browse our
						online platform for certified pre-owned devices, with powerful
						search tools and convenient home delivery.
					</p>
					<p>
						What sets us apart is our commitment to transparency, community
						engagement, and quality. All devices go through a careful valuation
						and cataloging process, and our system ensures seamless tracking and
						fair pricing. We also support social responsibility by channeling
						donated electronics to charitable projects that make a real
						difference.
					</p>
					<p>
						Our team of knowledgeable staff is always ready to help in-store or
						online. And with smart features like interest notifications,
						advanced search filters, and real-time updates, we make it easier
						than ever to find the right tech at the right price.
					</p>
					<p>
						Join us in building a more sustainable and connected world—one
						device at a time.
					</p>
				</Stack>
			</Stack>
		</Container>
	);
}
