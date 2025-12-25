function calculateQuote() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const projectType = document.getElementById("projectType").value;
  const floors = document.getElementById("floors").value || "N/A";
  const area = parseFloat(document.getElementById("area").value);
  const timeline = document.getElementById("timeline").value || "Not specified";
  const additionalInfo =
    document.getElementById("additionalInfo").value.trim() || "None";

  if (!name || !email || !contact || !projectType || !area) {
    alert("Please fill in all required fields (marked with *)");
    return;
  }

  if (area <= 0) {
    alert("Please enter a valid area greater than 0");
    return;
  }

  const selectedServices = [];
  const serviceCheckboxes = document.querySelectorAll(
    'input[name="services"]:checked'
  );

  if (serviceCheckboxes.length === 0) {
    alert("Please select at least one service");
    return;
  }

  let totalCost = 0;
  const servicesBreakdown = [];

  serviceCheckboxes.forEach((checkbox) => {
    const serviceName = checkbox.value;
    const rate = parseFloat(checkbox.dataset.rate);
    const cost = area * rate;
    totalCost += cost;

    const displayName = checkbox.nextElementSibling.textContent
      .split("($")[0]
      .trim();

    servicesBreakdown.push({
      name: displayName,
      rate: rate,
      cost: cost,
    });
  });

  displayQuote({
    name,
    email,
    contact,
    projectType,
    floors,
    area,
    timeline,
    additionalInfo,
    servicesBreakdown,
    totalCost,
  });
}

function displayQuote(data) {
  const quoteResult = document.getElementById("quoteResult");

  let servicesHTML = "";
  data.servicesBreakdown.forEach((service) => {
    servicesHTML += `
            <div class="service-line">
                <span class="service-name">${service.name}</span>
                <span class="service-cost">$${service.cost.toLocaleString(
                  "en-US",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}</span>
            </div>
        `;
  });

  const projectTypeMap = {
    residential: "Residential",
    commercial: "Commercial",
    industrial: "Industrial",
    hospital: "Hospital/Healthcare",
    other: "Other",
  };

  const timelineMap = {
    urgent: "Urgent (1-2 months)",
    normal: "Normal (3-6 months)",
    flexible: "Flexible (6+ months)",
  };

  const displayProjectType =
    projectTypeMap[data.projectType] || data.projectType;
  const displayTimeline = timelineMap[data.timeline] || data.timeline;

  quoteResult.innerHTML = `
        <div class="quote-content">
            <!-- Client Information -->
            <div class="client-info">
                <h3>Client Information</h3>
                <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${data.name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Contact:</span>
                    <span class="info-value">${data.contact}</span>
                </div>
            </div>

            <!-- Project Details -->
            <div class="client-info">
                <h3>Project Details</h3>
                <div class="info-item">
                    <span class="info-label">Type:</span>
                    <span class="info-value">${displayProjectType}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Floors:</span>
                    <span class="info-value">${data.floors}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Area:</span>
                    <span class="info-value">${data.area.toLocaleString()} sq ft</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Timeline:</span>
                    <span class="info-value">${displayTimeline}</span>
                </div>
            </div>

            <!-- Services Breakdown -->
            <div class="services-breakdown">
                <h3>Services Breakdown</h3>
                ${servicesHTML}
            </div>

            <!-- Total Cost -->
            <div class="quote-total">
                <h3>Estimated Total Cost</h3>
                <div class="total-amount">$${data.totalCost.toLocaleString(
                  "en-US",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}</div>
                <p class="quote-note">This is a rough estimate based on standard rates</p>
            </div>

            <!-- Actions -->
            <div class="quote-actions">
                <button onclick="downloadQuote()" class="btn-primary">Download Quote (PDF)</button>
                <button onclick="sendQuoteEmail()" class="btn-secondary">Email Quote to Me</button>
            </div>

            <!-- Disclaimer -->
            <div class="disclaimer">
                <p><strong>Note:</strong> This is a preliminary estimate based on the information provided. Final quotation may vary based on detailed project requirements, site conditions, and specifications. Please contact us for a comprehensive assessment.</p>
            </div>
        </div>
    `;

  quoteResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function downloadQuote() {
  alert(
    "Quote download functionality will generate a PDF with your quotation details. This feature requires server-side implementation."
  );
}

function sendQuoteEmail() {
  const email = document.getElementById("email").value;
  alert(
    `Quote will be sent to ${email}. This feature requires server-side email implementation.`
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");

  form.addEventListener("reset", () => {
    const quoteResult = document.getElementById("quoteResult");
    quoteResult.innerHTML = `
            <div class="empty-state">
                <span class="icon">📋</span>
                <p>Fill out the form and click "Calculate Quote" to see your estimated quotation</p>
            </div>
        `;
    quoteResult.className = "quote-result-empty";
  });

  const checkboxLabels = document.querySelectorAll(".checkbox-label");
  checkboxLabels.forEach((label, index) => {
    label.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
  });
});
