(function () {
    // Sample data for demo
    const SAMPLE = {
        schoolIntegration: [
            { school: 'Delhi Public School', contact: 'Mr. Sharma', location: 'New Delhi', status: 'Active', submittedOn: 'Oct 18, 2023' },
            { school: "St. Mary's Convent", contact: 'Sister Maria', location: 'Kolkata', status: 'Pending', submittedOn: 'Oct 15, 2023' },
            { school: 'Bangalore International School', contact: 'Mr. Reddy', location: 'Bangalore', status: 'Active', submittedOn: 'Oct 12, 2023' },
            { school: 'Mumbai Public School', contact: 'Mr. Kapoor', location: 'Mumbai', status: 'Rejected', submittedOn: 'Oct 10, 2023' }
        ],
        studyCenters: [
            { center: 'East Study Center', manager: 'A. Roy', city: 'Guwahati', status: 'Active' },
            { center: 'North Study Center', manager: 'R. Das', city: 'Dibrugarh', status: 'Pending' }
        ],
        distanceLearning: [
            { program: 'Online IIT Prep', coordinator: 'S. Khatri', seats: 120 },
            { program: 'Secondary Revision', coordinator: 'P. Singh', seats: 80 }
        ],
        educators: [
            { name: 'Rahul Verma', subject: 'Physics', city: 'Guwahati', status: 'Approved' },
            { name: 'Priya Singh', subject: 'Maths', city: 'Kolkata', status: 'Pending' }
        ],
        contacts: [
            { name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 9876543210', subject: 'Course Inquiry', submittedOn: 'Oct 20, 2023' },
            { name: 'Priya Singh', email: 'priya@example.com', phone: '+91 8765432109', subject: 'Admission Process', submittedOn: 'Oct 18, 2023' },
        ],
        trash: [
            { type: 'School', title: 'Old School Entry', deletedOn: 'Aug 1, 2023' }
        ]
    };

    // === Active-count helpers ===
    function isActiveRow(row) {
        if (!row) return false;

        // If row has a 'status' field, treat 'active' or 'approved' as active.
        if (row.status) {
            const s = String(row.status).toLowerCase();
            return s === 'active' || s === 'approved' || s === 'open';
        }

        // If row has a 'submittedOn', treat it active if within last 30 days.
        if (row.submittedOn) {
            const parsed = new Date(row.submittedOn);
            if (!isNaN(parsed)) {
                const diff = Date.now() - parsed.getTime();
                return diff <= 30 * 24 * 60 * 60 * 1000; // 30 days
            }
        }

        // Fallback: if no status/date, consider it active (adjust if you prefer false)
        return true;
    }

    function updateActiveStats() {
        // counts
        let totalActive = 0;
        let partnershipActive = 0;
        let educatorActive = 0;
        let contactActive = 0;

        // schoolIntegration & studyCenters considered 'partnership' category
        (SAMPLE.schoolIntegration || []).forEach(r => {
            if (isActiveRow(r)) { totalActive++; partnershipActive++; }
        });
        (SAMPLE.studyCenters || []).forEach(r => {
            if (isActiveRow(r)) { totalActive++; partnershipActive++; }
        });
        // treat distanceLearning as partnership as well (change if you want it separate)
        (SAMPLE.distanceLearning || []).forEach(r => {
            // distanceLearning rows may not have `status`; isActiveRow will fallback to true
            if (isActiveRow(r)) { totalActive++; partnershipActive++; }
        });

        // educators
        (SAMPLE.educators || []).forEach(r => {
            if (isActiveRow(r)) { totalActive++; educatorActive++; }
        });

        // contacts: treat as active if submitted in last 30 days (isActiveRow handles this)
        (SAMPLE.contacts || []).forEach(r => {
            if (isActiveRow(r)) { totalActive++; contactActive++; }
        });

        // write to DOM
        const setText = (id, n) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(n);
        };
        setText('stat-total', totalActive);
        setText('stat-partnership', partnershipActive);
        setText('stat-educator', educatorActive);
        setText('stat-contact', contactActive);
    }


    // Elements
    const statsCards = document.getElementById('statsCards');
    const links = document.querySelectorAll('a[data-target]');
    const panels = document.querySelectorAll('.content-panel');
    const panelTitle = document.getElementById('panelTitle');
    const panelSub = document.getElementById('panelSub');

    // Modal elements
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Utility: show/hide modal
    function openModal(title, dataObj) {
        modalTitle.textContent = title || 'Details';
        // Build key/value list
        modalBody.innerHTML = ''; // reset
        const dl = document.createElement('dl');
        // Use consistent key order
        Object.keys(dataObj).forEach(key => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            // Nice label
            dt.textContent = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
            dd.textContent = String(dataObj[key]);
            dl.appendChild(dt);
            dl.appendChild(dd);
        });
        modalBody.appendChild(dl);

        modalBackdrop.classList.add('show');
        modalBackdrop.setAttribute('aria-hidden', 'false');
        // trap focus (simple)
        modalClose.focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function closeModal() {
        modalBackdrop.classList.remove('show');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        modalBody.innerHTML = '';
        document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') closeModal();
    }

    // Close on backdrop click (but not when clicking inside modal)
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });
    modalClose.addEventListener('click', closeModal);

    // Utility: hide all panels, show one
    function showPanel(id) {
        panels.forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(id);
        if (!panel) return console.warn('Panel not found', id);
        panel.classList.add('active');

        // Update active link visuals
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[data-target="${id}"]`).forEach(l => l.classList.add('active'));

        // Update header title/sub — use h3 within panel or defaults
        const h3 = panel.querySelector('h3');
        panelTitle.textContent = h3 ? h3.textContent : (id === 'school-integration' ? 'School Integration Projects' : id.charAt(0).toUpperCase() + id.slice(1));
        panelSub.textContent = (id === 'school-integration') ? '24 Active Projects' : '';
        // Toggle stats visibility: only visible on dashboard
        if (statsCards) {
            if (id === 'dashboard') statsCards.style.display = 'grid';
            else statsCards.style.display = 'none';
        }
    }

    // Handle sidebar clicks
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (!target) return;
            showPanel(target);
            history.replaceState(null, '', '#' + target);
        });
    });

    // Restore from hash or default to school-integration
    const initial = (location.hash || '').replace('#', '') || 'school-integration';
    if (document.getElementById(initial)) showPanel(initial);

    /* --- Rendering helpers --- */
    function renderTable(containerSelector, data, columnOrder, includeActions = true) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = '<p>No records found.</p>';
            return;
        }

        // default columns from first object
        const columns = columnOrder || Object.keys(data[0]);

        const table = document.createElement('table');
        table.className = 'submissions-table';
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
            trHead.appendChild(th);
        });
        if (includeActions) {
            const th = document.createElement('th'); th.textContent = 'Actions'; trHead.appendChild(th);
        }
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach((row, idx) => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                td.textContent = row[col] ?? '';
                tr.appendChild(td);
            });
            if (includeActions) {
                const td = document.createElement('td');
                td.innerHTML = '<button class="action-btn view-btn">View</button> <button class="action-btn delete-btn">Delete</button>';
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.innerHTML = '';
        container.appendChild(table);

        // Attach action handlers
        container.querySelectorAll('.view-btn').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                // open modal with the corresponding data row
                openModal('Details', data[i]);
            });
        });
        container.querySelectorAll('.delete-btn').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!confirm('Are you sure you want to delete this item?')) return;
                const rowData = data.splice(i, 1)[0];
                SAMPLE.trash.push({ type: 'Deleted', title: JSON.stringify(rowData).slice(0, 40) + '...', deletedOn: new Date().toLocaleDateString() });
                renderAll(); // re-render to reflect changes
            });
        });
    }

    // Render all panels using sample data
    function renderAll() {
        renderTable('#school-table-container', SAMPLE.schoolIntegration, ['school', 'contact', 'location', 'status', 'submittedOn']);
        renderTable('#study-table-container', SAMPLE.studyCenters, ['center', 'manager', 'city', 'status']);
        renderTable('#distance-table-container', SAMPLE.distanceLearning, ['program', 'coordinator', 'seats']);
        renderTable('#educators-table-container', SAMPLE.educators, ['name', 'subject', 'city', 'status']);
        renderTable('#contacts-table-container', SAMPLE.contacts, ['name', 'email', 'phone', 'subject', 'submittedOn']);
        renderTable('#trash-table-container', SAMPLE.trash, ['type', 'title', 'deletedOn']);
        updateActiveStats();
    }

    // Add search handlers (simple client-side filter)
    function attachSearch(inputId, btnId, dataSourceKey, renderContainer, columns) {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        if (!input || !btn) return;
        btn.addEventListener('click', () => {
            const q = (input.value || '').trim().toLowerCase();
            const dataset = SAMPLE[dataSourceKey] || [];
            if (!q) {
                renderTable(renderContainer, dataset, columns);
                return;
            }
            const filtered = dataset.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
            renderTable(renderContainer, filtered, columns);
        });
    }

    // wire search boxes
    attachSearch('search-school', 'search-school-btn', 'schoolIntegration', '#school-table-container', ['school', 'contact', 'location', 'status', 'submittedOn']);
    attachSearch('search-study', 'search-study-btn', 'studyCenters', '#study-table-container', ['center', 'manager', 'city', 'status']);
    attachSearch('search-distance', 'search-distance-btn', 'distanceLearning', '#distance-table-container', ['program', 'coordinator', 'seats']);
    attachSearch('search-educators', 'search-educators-btn', 'educators', '#educators-table-container', ['name', 'subject', 'city', 'status']);
    attachSearch('search-contacts', 'search-contacts-btn', 'contacts', '#contacts-table-container', ['name', 'email', 'phone', 'subject', 'submittedOn']);

    // initial render
    renderAll();

    // Expose showPanel to window for debugging if needed
    window.showPanel = showPanel;


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

    // Auto-close sidebar after clicking a nav link (mobile)
    document.querySelectorAll('.admin-sidebar .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                sidebarBackdrop.classList.remove('show');
            }
        });
    });
})();


