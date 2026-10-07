import { useThemeMode, useUserState } from "@/stores/user-state";
import React from "react";

export const TabBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (s: string) => void;
}) => {
  const lightMode = useThemeMode();
  const user = useUserState();
  return (
    // Container for the tab bar
    <div
      className={`tab-bar-container ${
        lightMode.mode ? "" : "tw:bg-gray-950! tw:text-white!"
      }`}
    >
      {/* Tab Buttons Container */}
      <div className="tab-buttons">
        {/* Radios Tab Button */}
        <button
          className={`tab-button ${activeTab === "radios" ? "active" : ""}`}
          onClick={() => setActiveTab("radios")}
        >
          {/* Uncomment the line below if using lucide-react icons */}
          {/* <Radio className="tab-icon" size={18} /> */}
          Radios({user.likes.length})
        </button>

        {/* Podcasts Tab Button */}
        <button
          className={`tab-button ${activeTab === "podcasts" ? "active" : ""}`}
          onClick={() => setActiveTab("podcasts")}
        >
          {/* Uncomment the line below if using lucide-react icons */}
          {/* <Podcast className="tab-icon" size={18} /> */}
          Podcasts({user.podcasts.length})
        </button>
      </div>
    </div>
  );
};

// Basic HTML structure to include the React component and CSS
// In a real application, you would typically use a build tool like Webpack
// or Vite to bundle your React code and CSS.
// This is provided for demonstration purposes within the immersive.
export const TabContainer = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (s: string) => void;
}) => (
  <>
    <style>
      {`
                /* Basic styling for the tab bar container */
                .tab-bar-container {
                    width: 100%;
                    max-width: 400px; /* Max width similar to Tailwind example */
                    margin: 2rem auto; /* Center the container */
                    background-color: #fff; /* White background */
                    border-radius: 0.75rem; /* Rounded corners */
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Simple shadow */
                    overflow: hidden; /* Hide overflow */
                }

                /* Flex container for tab buttons */
                .tab-buttons {
                    display: flex;
                    justify-content: space-around; /* Distribute space evenly */
                    border-bottom: 1px solid #e5e7eb; /* Light grey border */
                }

                /* Styling for individual tab buttons */
                .tab-button {
                    flex: 1; /* Allow buttons to grow and shrink */
                    padding: 1rem 0; /* Vertical padding */
                    text-align: center; /* Center text */
                    font-size: 0.875rem; /* Small font size */
                    font-weight: 500; /* Medium font weight */
                    color: #6b7280; /* Grey text color */
                    border: none; /* Remove default button border */
                    background-color: transparent; /* Transparent background */
                    cursor: pointer; /* Indicate clickable element */
                    transition: color 0.3s ease, border-bottom-color 0.3s ease; /* Smooth transitions */
                    outline: none; /* Remove outline on focus */
                }

                /* Hover effect for inactive buttons */
                .tab-button:hover {
                    color: #4b5563; /* Darker grey on hover */
                }

                /* Styling for the active tab button */
                .tab-button.active {
                    color: #2563eb; /* Blue text color */
                    border-bottom: 2px solid #2563eb; /* Blue bottom border */
                }

                /* Styling for the tab content area */
                .tab-content {
                    padding: 1rem; /* Padding around content */
                }

                /* Styling for content headings */
                .content-heading {
                    font-size: 1.25rem; /* Large font size */
                    font-weight: 600; /* Semi-bold font weight */
                    margin-bottom: 0.5rem; /* Space below heading */
                }

                /* Styling for content text */
                .content-text {
                    color: #374151; /* Dark grey text color */
                }

                /* Styling for icons if used */
                .tab-icon {
                    display: inline-block; /* Make icon inline */
                    margin-right: 0.5rem; /* Space between icon and text */
                    vertical-align: middle; /* Align icon vertically */
                }
            `}
    </style>
    <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
  </>
);

// Modern React Tab Bar Component
const TabBarMain = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (s: string) => void;
}) => {
  return (
    // Container for the tab bar
    <div className="tab-bar-container">
      {/* Tab Buttons Container */}
      <div className="tab-buttons">
        {/* Radios Tab Button */}
        <button
          className={`tab-button ${activeTab === "event" ? "active" : ""}`}
          onClick={() => setActiveTab("event")}
        >
          {/* Uncomment the line below if using lucide-react icons */}
          {/* <Radio className="tab-icon" size={18} /> */}
          TimeTable
        </button>

        {/* Podcasts Tab Button */}
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          {/* Uncomment the line below if using lucide-react icons */}
          {/* <Podcast className="tab-icon" size={18} /> */}
          Comments
        </button>
        <button
          className={`tab-button ${activeTab === "recordings" ? "active" : ""}`}
          onClick={() => setActiveTab("recordings")}
        >
          {/* Uncomment the line below if using lucide-react icons */}
          {/* <Podcast className="tab-icon" size={18} /> */}
          Recordings
        </button>
      </div>
    </div>
  );
};

// Basic HTML structure to include the React component and CSS
// In a real application, you would typically use a build tool like Webpack
// or Vite to bundle your React code and CSS.
// This is provided for demonstration purposes within the immersive.
export const TabContainerMain = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (s: string) => void;
}) => (
  <>
    <style>
      {`
                /* Basic styling for the tab bar container */
                .tab-bar-container {
                    width: 100%;
                    max-width: 400px; /* Max width similar to Tailwind example */
                    margin: 2rem auto; /* Center the container */
                    background-color: #fff; /* White background */
                    border-radius: 0.75rem; /* Rounded corners */
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Simple shadow */
                    overflow: hidden; /* Hide overflow */
                }

                /* Flex container for tab buttons */
                .tab-buttons {
                    display: flex;
                    justify-content: space-around; /* Distribute space evenly */
                    border-bottom: 1px solid #e5e7eb; /* Light grey border */
                }

                /* Styling for individual tab buttons */
                .tab-button {
                    flex: 1; /* Allow buttons to grow and shrink */
                    padding: 1rem 0; /* Vertical padding */
                    text-align: center; /* Center text */
                    font-size: 0.875rem; /* Small font size */
                    font-weight: 500; /* Medium font weight */
                    color: #6b7280; /* Grey text color */
                    border: none; /* Remove default button border */
                    background-color: transparent; /* Transparent background */
                    cursor: pointer; /* Indicate clickable element */
                    transition: color 0.3s ease, border-bottom-color 0.3s ease; /* Smooth transitions */
                    outline: none; /* Remove outline on focus */
                }

                /* Hover effect for inactive buttons */
                .tab-button:hover {
                    color: #4b5563; /* Darker grey on hover */
                }

                /* Styling for the active tab button */
                .tab-button.active {
                    color: #2563eb; /* Blue text color */
                    border-bottom: 2px solid #2563eb; /* Blue bottom border */
                }

                /* Styling for the tab content area */
                .tab-content {
                    padding: 1rem; /* Padding around content */
                }

                /* Styling for content headings */
                .content-heading {
                    font-size: 1.25rem; /* Large font size */
                    font-weight: 600; /* Semi-bold font weight */
                    margin-bottom: 0.5rem; /* Space below heading */
                }

                /* Styling for content text */
                .content-text {
                    color: #374151; /* Dark grey text color */
                }

                /* Styling for icons if used */
                .tab-icon {
                    display: inline-block; /* Make icon inline */
                    margin-right: 0.5rem; /* Space between icon and text */
                    vertical-align: middle; /* Align icon vertically */
                }
            `}
    </style>
    <TabBarMain activeTab={activeTab} setActiveTab={setActiveTab} />
  </>
);
