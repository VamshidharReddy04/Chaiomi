// PRIVACY POLICY PAGE (route: /privacy)
// The text lives in src/data/privacyPolicy.js

import LegalPage from "../Components/LegalPage";
import { privacyPolicy } from "../data/privacyPolicy";

function Privacy() {
  return <LegalPage doc={privacyPolicy} />;
}

export default Privacy;
