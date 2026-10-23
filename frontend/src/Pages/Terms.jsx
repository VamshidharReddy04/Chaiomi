// TERMS OF SERVICE PAGE (route: /terms)
// The text lives in src/data/termsOfService.js

import LegalPage from "../Components/LegalPage";
import { termsOfService } from "../data/termsOfService";

function Terms() {
  return <LegalPage doc={termsOfService} />;
}

export default Terms;
