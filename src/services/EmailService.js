// Email Service using Web3Forms
const WEB3FORMS_ACCESS_KEY = "6c123e70-b648-423d-882b-da0fdfd7e8fe";

export async function sendEmail(data) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...data,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
}

// Send notification for new user signup
export async function sendSignUpNotification(userName, userEmail) {
  const currentDate = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return sendEmail({
    subject: "🎉 New User Registration - JobTracker",
    from_name: "JobTracker System",
    message: `
Hello Admin,

A new user has registered on JobTracker:

👤 Name: ${userName}
📧 Email: ${userEmail}
📅 Registration Date: ${currentDate}

This is an automated notification from your JobTracker application.

---
JobTracker - Track Your Career Journey
    `.trim(),
  });
}

// Send notification for user login
export async function sendLoginNotification(userName, userEmail) {
  const currentDate = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return sendEmail({
    subject: "🔐 User Login Alert - JobTracker",
    from_name: "JobTracker System",
    message: `
Hello Admin,

A user has logged into JobTracker:

👤 Name: ${userName}
📧 Email: ${userEmail}
📅 Login Time: ${currentDate}

This is an automated notification from your JobTracker application.

---
JobTracker - Track Your Career Journey
    `.trim(),
  });
}