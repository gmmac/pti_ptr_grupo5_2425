import { createContext, useContext, useEffect } from "react";
import AuthProvider, { useAuth as useGenericAuth } from "./AuthProvider";

const OrganizerAuthContext = createContext();

const OrganizerAuthProvider = ({ children }) => {
  return (
    <AuthProvider userType="organizer" loginPath="/organizer/login">
      <OrganizerAuthProviderWrapper>{children}</OrganizerAuthProviderWrapper>
    </AuthProvider>
  );
};

const OrganizerAuthProviderWrapper = ({ children }) => {
  const extendedAuth = useOrganizerAuthExtension();

  return (
    <OrganizerAuthContext.Provider value={extendedAuth}>
      {children}
    </OrganizerAuthContext.Provider>
  );
};

const useOrganizerAuthExtension = () => {
  const baseAuth = useGenericAuth();


  useEffect(() => {
    console.log("Organizer ", baseAuth.user)
  
  }, [baseAuth.user])
  
  const isOrganizer = () => {
    return baseAuth.getUserType() === "organizer";
  };

  const isOrganizerProject = (project) => {
    if (!isOrganizer()) return false;
    return project?.organizerNic === baseAuth.user?.nic;
  };

  const getOrganizerID = () => {
    return isOrganizer() ? baseAuth.user?.nic : null;
  };

  return {
    ...baseAuth,
    isOrganizer,
    isOrganizerProject,
    getOrganizerID,
  };
};

export const useOrganizerAuth  = () => {
  return useContext(OrganizerAuthContext);
};

export default OrganizerAuthProvider;
