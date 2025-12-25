function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = event.target;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const employeeForm = document.getElementById("employeeLoginForm");

  if (employeeForm) {
    employeeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const empId = document.getElementById("empId").value;
      const password = document.getElementById("password").value;
      const loginMessage = document.getElementById("loginMessage");
      const btn = this.querySelector(".btn-login");

      btn.innerHTML = "<span>⏳</span><span>Verifying credentials...</span>";
      btn.disabled = true;

      setTimeout(() => {
        if (empId && password) {
          loginMessage.className = "login-message success";
          loginMessage.textContent =
            "✅ Login successful! Redirecting to dashboard...";
          loginMessage.style.display = "block";
          btn.innerHTML = "<span>✅</span><span>Success!</span>";

          setTimeout(() => {
            alert("Dashboard page not implemented in demo. Login successful!");
            loginMessage.style.display = "none";
            btn.innerHTML = "<span>🚀</span><span>Login to Dashboard</span>";
            btn.disabled = false;
            employeeForm.reset();
          }, 2000);
        } else {
          loginMessage.className = "login-message error";
          loginMessage.textContent =
            "❌ Invalid credentials. Please try again.";
          loginMessage.style.display = "block";
          btn.innerHTML = "<span>🚀</span><span>Login to Dashboard</span>";
          btn.disabled = false;
        }
      }, 1500);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.01)";
      this.parentElement.style.transition = "transform 0.2s ease";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("resume");

  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];

      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size exceeds 5MB limit. Please choose a smaller file.");
          this.value = "";
          return;
        }

        if (file.type !== "application/pdf") {
          alert("Only PDF files are allowed.");
          this.value = "";
          return;
        }
        const fileInfo = this.nextElementSibling;
        if (fileInfo && fileInfo.classList.contains("file-info")) {
          fileInfo.textContent = `✓ Selected: ${file.name} (${(
            file.size /
            1024 /
            1024
          ).toFixed(2)} MB)`;
          fileInfo.style.color = "var(--primary-green)";
        }
      }
    });
  }
});
