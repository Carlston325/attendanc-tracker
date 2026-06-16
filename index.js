import {
  getAttendanceData,
  getUsersData,
  getMembersData,
  insertAttendanceData,
  insertMembersData,
  insertUsersData,
} from "./db";

// Get logged-in user and update page title
async function updatePageTitle() {
  try {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      // Redirect to login page if no user is logged in
      window.location.href = "./pages/login.html";
      return;
    }

    // Show welcome message
    const user = JSON.parse(loggedInUser);
    document.title = `Attendance Tracker | Welcome ${user.name}`;
  } catch (error) {
    console.error("Error updating page title:", error);
    window.location.href = "./login.html";
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", updatePageTitle);
