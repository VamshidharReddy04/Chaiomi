// App Download Section button links
import { appStoreLinks as appLinks } from "../data/siteLinks";
import "../Styles/appSection.css"; // Import the AppSection.css file for styling

function AppSection() {
  return (
    <section className="app-section">
      <div className="app-container">
        {/* app heading */}
        <h2 className="app-heading">Download the Chaiomi App</h2>
        {/* app description */}
        <p className=" app-description">Customize. Brew. Reorder.</p>

        {/* IOS DOWNLOAD LINK */}
        <div className="app-buttons">
          <a
            href={appLinks.ios}
            target="_blank"
            rel="noreferrer"
            className="button-ios"
          >
            Download on the App Store
          </a>
          {/* ANDROID DOWNLOAD LINK */}
          <a
            href={appLinks.android}
            target="_blank"
            rel="noreferrer"
            className="button-android"
          >
            Get it on Google Play
          </a>
        </div>
      </div>
    </section>
  );
}

export default AppSection;
