(function () {
    // Sample data for demo
    const SAMPLE = {
        schoolIntegration: [],
        studyCenters: [],
        distanceLearning: [],
        educators: [
            { name: 'Rahul Verma', subject: 'Physics', city: 'Guwahati', status: 'Approved' },
            { name: 'Priya Singh', subject: 'Maths', city: 'Kolkata', status: 'Pending' }
        ],
        contacts: [],
        trash: [] // Will hold trashed items for the session if needed
    };

    // --- NEW: Central Delete Handler ---
    async function handleDelete(id, type) {
        if (!confirm('Are you sure you want to move this item to the trash?')) {
            return;
        }

        let url = '';
        let loadFunction = null;

        switch (type) {
            case 'school-project':
                url = `http://127.0.0.1:8000/api/school-projects/${id}`;
                loadFunction = loadSchoolProjects;
                break;
            case 'study-center':
                url = `http://127.0.0.1:8000/api/study-centre-applications/${id}`;
                loadFunction = loadStudyCenters;
                break;
            case 'distance-learning':
                url = `http://127.0.0.1:8000/api/distance-learning/${id}`;
                loadFunction = loadDistanceLearning;
                break;
            default:
                console.error('Unknown delete type:', type);
                return;
        }

        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Item moved to trash successfully.');
                // Refresh the list from the server to show the change
                if(loadFunction) await loadFunction();
            } else {
                const result = await response.json();
                alert('Failed to move item to trash: ' + (result.message || 'Unknown server error'));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('An error occurred. Please check the console for details.');
        }
    }


    // --- API Loading Functions ---
    async function loadContactsFromApi() {
        try {
            let response = await fetch("http://127.0.0.1:8000/api/contacts");
            let result = await response.json();
            if (result.success) {
                SAMPLE.contacts = result.data.map(c => ({
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    subject: c.message,
                    submittedOn: c.submitted_at
                }));
                renderTable('#contacts-table-container', SAMPLE.contacts, ['name', 'email', 'phone', 'subject', 'submittedOn'], false);
                updateActiveStats();
            }
        } catch (err) {
            console.error("Error loading contacts:", err);
        }
    }

    async function loadSchoolProjects() {
        try {
            let res = await fetch("http://127.0.0.1:8000/api/school-projects");
            let json = await res.json();
            if (json.success) {
                SAMPLE.schoolIntegration = json.data;
                renderSchoolProjectsTable(json.data);
                updateActiveStats();
            }
        } catch (e) {
            console.error("Error loading school projects:", e);
        }
    }

    async function loadStudyCenters() {
        try {
            let res = await fetch("http://127.0.0.1:8000/api/study-centre-applications");
            let json = await res.json();
            if (json.success) {
                SAMPLE.studyCenters = json.data;
                renderStudyCentersTable(json.data);
                updateActiveStats();
            }
        } catch (e) {
            console.error("Error loading study centres:", e);
        }
    }

    async function loadDistanceLearning() {
        try {
            let res = await fetch("http://127.0.0.1:8000/api/distance-learning");
            let json = await res.json();
            if (json.success) {
                SAMPLE.distanceLearning = json.data;
                renderDistanceLearningTable(json.data);
                updateActiveStats();
            }
        } catch (e) {
            console.error("Error loading distance learning apps:", e);
        }
    }

    // --- Active Stat Counting ---
    function updateActiveStats() {
        const schoolCount = SAMPLE.schoolIntegration.length;
        const studyCount = SAMPLE.studyCenters.length;
        const distanceCount = SAMPLE.distanceLearning.length;
        const educatorCount = SAMPLE.educators.length;
        const contactCount = SAMPLE.contacts.length;
        const total = schoolCount + studyCount + distanceCount + educatorCount + contactCount;

        const setText = (id, n) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(n);
        };
        setText('stat-total', total);
        setText('stat-partnership-school', schoolCount);
        setText('stat-partnership-study', studyCount);
        setText('stat-partnership-distance', distanceCount);
        setText('stat-educator', educatorCount);
        setText('stat-contact', contactCount);
        
        const currentPanelId = (location.hash || '').replace('#', '') || 'school-integration';
        const panelSub = document.getElementById('panelSub');
        if (currentPanelId === 'school-integration') {
             panelSub.textContent = `${schoolCount} Active Projects`;
        } else if (currentPanelId === 'study-centers') {
             panelSub.textContent = `${studyCount} Active Applications`;
        } else if (currentPanelId === 'distance-learning') {
             panelSub.textContent = `${distanceCount} Active Applications`;
        } else {
            panelSub.textContent = '';
        }
    }

    // --- DOM Elements ---
    const statsCardsContainer = document.getElementById('statsCards');
    const panelHeaderContainer = document.getElementById('panelHeader');
    const links = document.querySelectorAll('a[data-target]');
    const allContentPanels = document.querySelectorAll('.admin-main > section.content-panel');
    const applicationDetailView = document.getElementById('application-detail-view');

    // --- View Switching Logic ---
    function showListView() {
        applicationDetailView.classList.remove('active');
        applicationDetailView.innerHTML = ''; 

        if (statsCardsContainer) statsCardsContainer.style.display = 'grid';
        if (panelHeaderContainer) panelHeaderContainer.style.display = 'flex';

        const currentPanelId = (location.hash || '').replace('#', '') || 'school-integration';
        const panelToShow = document.getElementById(currentPanelId);
        
        allContentPanels.forEach(p => p.classList.remove('active'));

        if (panelToShow) {
            panelToShow.classList.add('active');
            if (currentPanelId !== 'dashboard' && statsCardsContainer) {
                statsCardsContainer.style.display = 'none';
            }
        }
        updateActiveStats();
    }

    function showDetailView(htmlContent) {
        allContentPanels.forEach(section => section.classList.remove('active'));
        if (statsCardsContainer) statsCardsContainer.style.display = 'none';
        if (panelHeaderContainer) panelHeaderContainer.style.display = 'none';

        applicationDetailView.innerHTML = htmlContent;
        applicationDetailView.classList.add('active');

        const backBtn = applicationDetailView.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', showListView);
        }
    }
    
    // --- Panel Navigation ---
    function showPanel(id) {
        showListView();

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[data-target="${id}"]`).forEach(l => l.classList.add('active'));

        const panel = document.getElementById(id);
        const h3 = panel.querySelector('h3');
        document.getElementById('panelTitle').textContent = h3 ? h3.textContent : (id.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase()));
        
        if (statsCardsContainer) {
            statsCardsContainer.style.display = (id === 'dashboard') ? 'grid' : 'none';
        }
        if (panelHeaderContainer) {
            panelHeaderContainer.style.display = (id === 'dashboard') ? 'none' : 'flex';
        }
        updateActiveStats();
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (!target) return;
            history.pushState(null, '', '#' + target);
            showPanel(target);
        });
    });

    window.addEventListener('popstate', () => {
        const hash = (location.hash || '').replace('#', '') || 'school-integration';
        showPanel(hash);
    });

    // --- Rendering Helpers ---
    function renderDetailView(entries, title) {
        let detailHtml = `<div class="panel">
            <button class="back-btn"><i class="fas fa-arrow-left"></i> Back to List</button>
            <h3>${title}</h3>
            <div class="details-container">`;

        for (const [label, value] of Object.entries(entries)) {
            detailHtml += `
                <div class="detail-row">
                    <span class="detail-label">${label}</span>
                    <span class="detail-value">${value || 'N/A'}</span>
                </div>`;
        }
        detailHtml += `</div></div>`;
        showDetailView(detailHtml);
    }

    // --- School Projects ---
    function renderSchoolProjectsTable(data) {
        const container = document.querySelector('#school-table-container');
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No school project applications found.</p>';
            return;
        }
        const html = `
          <table class="submissions-table">
            <thead>
              <tr>
                <th class="col-application-date">Application Date</th>
                <th class="col-school-name">School Name</th>
                <th class="col-principal-name">Principal's Name</th>
                <th class="col-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(app => `
                <tr>
                  <td class="col-application-date">${app.application_date || 'N/A'}</td>
                  <td class="col-school-name" title="${app.school_name}">${app.school_name}</td>
                  <td class="col-principal-name" title="${app.principal_name}">${app.principal_name}</td>
                  <td class="col-action">
                    <button class="action-btn view-btn" data-id="${app.id}">View</button>
                    <button class="action-btn delete-btn" data-id="${app.id}" data-type="school-project">Delete</button>
                  </td>
                </tr>`).join("")}
            </tbody>
          </table>`;
        container.innerHTML = html;
        container.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewSchoolApplication(btn.dataset.id));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => handleDelete(btn.dataset.id, btn.dataset.type));
        });
    }

    async function viewSchoolApplication(id) {
        // This funcion is unchanged
        try {
            let res = await fetch(`http://127.0.0.1:8000/api/school-projects/${id}`);
            let json = await res.json();
            if (json.success) {
                const app = json.data;
                const selectedProjects = [
                    app.project_science && "Science",
                    app.project_math && "Math",
                    app.project_language && "Language",
                    app.project_social && "Social Studies",
                    app.project_other && `Other: ${app.project_other_text}`
                ].filter(Boolean).join(", ") || "None";

                const detailEntries = {
                    "Application Date": app.application_date,
                    "School Name": app.school_name,
                    "Address": app.address,
                    "Principal's Name": app.principal_name,
                    "Contact Number": app.contact_number,
                    "Email Address": app.email,
                    "Affiliated Board": app.affiliated_board,
                    "Selected Projects": selectedProjects,
                    "Objective": app.objective,
                    "Target Audience": app.target_audience,
                    "Expected Duration": app.duration,
                    "Students Involved": app.students_involved,
                    "Resources Required": app.resources_required,
                    "Previous Projects": app.previous_projects,
                    "Benefits for Students": app.benefits,
                    "Declaration Principal": app.declaration_principal,
                    "Declaration Date": app.declaration_date
                };
                renderDetailView(detailEntries, "School Project Application Details");
            } else {
                alert("Application not found!");
            }
        } catch (err) {
            console.error("Error loading application:", err);
        }
    }
    
    // --- Study Centers ---
    function renderStudyCentersTable(data) {
        const container = document.querySelector('#study-table-container');
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No study center applications found.</p>';
            return;
        }
        const html = `
          <table class="submissions-table">
            <thead>
              <tr>
                <th class="col-application-date">Application Date</th>
                <th>Centre Name</th>
                <th>Principal's Name</th>
                <th class="col-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(app => `
                <tr>
                  <td class="col-application-date">${app.application_date || 'N/A'}</td>
                  <td>${app.centre_name}</td>
                  <td>${app.principal_name}</td>
                  <td class="col-action">
                    <button class="action-btn view-btn" data-id="${app.id}">View</button>
                    <button class="action-btn delete-btn" data-id="${app.id}" data-type="study-center">Delete</button>
                  </td>
                </tr>`).join("")}
            </tbody>
          </table>`;
        container.innerHTML = html;
        container.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewStudyCenterApplication(btn.dataset.id));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => handleDelete(btn.dataset.id, btn.dataset.type));
        });
    }

        async function viewStudyCenterApplication(id) {
        try {
            let res = await fetch(`http://127.0.0.1:8000/api/study-centre-applications/${id}`);
            let json = await res.json();
            if (json.success) {
                const app = json.data;
                const detailEntries = {
                    "Application Date": app.application_date,
                    "Centre Name": app.centre_name,
                    "Principal's Name": app.principal_name,
                    "Address": app.address,
                    "Contact Number": app.contact_number,
                    "Email Address": app.email,
                    "Affiliated Board": app.affiliated_board,
                    "Available Courses": app.available_courses,
                    "Infrastructure Details": app.infrastructure,
                    "Staff Strength": app.staff_strength,
                    "Student Capacity": app.student_capacity,
                    "Resources Required": app.resources_required,
                    "Previous Experience": app.previous_experience,
                    "Benefits of Partnership": app.benefits,
                    "Declaration Principal Name": app.declaration_principal,
                    "Declaration Date": app.declaration_date
                };
                renderDetailView(detailEntries, "Study Center Application Details");
            } else {
                alert("Application not found!");
            }
        } catch (err) {
            console.error("Error loading study center application:", err);
        }
    }

    // --- Distance Learning ---
    function renderDistanceLearningTable(data) {
        const container = document.querySelector('#distance-table-container');
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No distance learning applications found.</p>';
            return;
        }
        const html = `
          <table class="submissions-table">
            <thead>
              <tr>
                <th class="col-application-date">Application Date</th>
                <th>Applicant Name</th>
                <th>Contact</th>
                <th class="col-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(app => `
                <tr>
                  <td class="col-application-date">${app.application_date || 'N/A'}</td>
                  <td>${app.applicant_name}</td>
                  <td>${app.contact_number}</td>
                  <td class="col-action">
                    <button class="action-btn view-btn" data-id="${app.id}">View</button>
                    <button class="action-btn delete-btn" data-id="${app.id}" data-type="distance-learning">Delete</button>
                  </td>
                </tr>`).join("")}
            </tbody>
          </table>`;
        container.innerHTML = html;
        container.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewDistanceLearningApplication(btn.dataset.id));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => handleDelete(btn.dataset.id, btn.dataset.type));
        });
    }

    async function viewDistanceLearningApplication(id) {
        try {
            let res = await fetch(`http://127.0.0.1:8000/api/distance-learning/${id}`);
            let json = await res.json();
            if (json.success) {
                const app = json.data;
                const detailEntries = {
                    "Application Date": app.application_date,
                    "Agreement Date": app.agreement_date,
                    "Applicant Name": app.applicant_name,
                    "Applicant Address": app.applicant_address,
                    "Contact Number": app.contact_number,
                    "Email Address": app.email_address,
                    "Educational Qualification": app.educational_qualification,
                    "Center Area (in sq. ft.)": app.center_area,
                    "Investment Amount": app.investment_amount,
                    "Number of Schools in Area": app.number_of_schools,
                    "Average Students per School": app.avg_students,
                    "Signature Name": app.signature_name,
                    "Signature Date": app.signature_date
                };
                renderDetailView(detailEntries, "Distance Learning Application Details");
            } else {
                alert("Application not found!");
            }
        } catch (err) {
            console.error("Error loading distance learning application:", err);
        }
    }

    // --- Generic Table Renderer ---
    function renderTable(containerSelector, data, columnOrder, includeActions = false) {
       // This function is unchanged
    }

    // --- Initial Setup ---
    async function initialize() {
        await Promise.all([
            loadSchoolProjects(),
            loadStudyCenters(),
            loadDistanceLearning(),
            loadContactsFromApi()
        ]);
        
        const initial = (location.hash || '').replace('#', '') || 'school-integration';
        if (document.getElementById(initial)) {
             showPanel(initial);
        } else {
             showPanel('school-integration');
        }

        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.admin-sidebar');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarBackdrop.classList.toggle('show');
        });

        sidebarBackdrop.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarBackdrop.classList.remove('show');
        });

        document.querySelectorAll('.admin-sidebar .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    sidebarBackdrop.classList.remove('show');
                }
            });
        });
    }

    initialize();

})();
