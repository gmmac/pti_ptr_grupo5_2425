import { useOrganizerAuth } from "../contexts/AuthenticationProviders/OrganizerAuthProvider";

export default function useSafeOrganizerAuth() {
  try {
    const organizerAuth = useOrganizerAuth();

    return {
      isOrganizer: organizerAuth?.isOrganizer?.() || false,
      organizerID: organizerAuth?.getOrganizerID?.() || null,
      isOrganizerProject: organizerAuth?.isOrganizerProject || (() => false),
      user: organizerAuth?.user || null,
    };
  } catch (error) {
    console.warn("OrganizerAuthProvider is not available in this context.");
    return {
      isOrganizer: false,
      organizerID: null,
      isOrganizerProject: () => false,
      user: null,
    };
  }
}
