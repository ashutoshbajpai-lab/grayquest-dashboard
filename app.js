/**
 * GrayQuest Partner Portal Application Controller
 * Manages Mock Database, State Engine, Event Triggers, Charts and Export Logic
 */

// ================= MOCK DATABASE =================
const DB = {
    institutes: [
        {
            id: 'GQ-INST-001',
            name: 'Vidyashilp Academy',
            gile: 'GQ-GILE-4829',
            location: 'Bangalore, KA',
            education: 'K-12 School',
            studentsCount: 2450,
            onboardDate: '12 Jan 2023',
            gmv: 45200000,
            transactions: 1850,
            status: 'active',
            penetrationRate: 75.5,
            gateways: ['Razorpay', 'PayU', 'PineLabs'],
            rates: { emi: 45, pg: 25, mandate: 30 },
            contact: { name: 'Rajesh Kumar', email: 'rajesh.k@vidyashilp.edu', phone: '+91 9876543210' },
            recentTransactions: [
                { id: 'TXN-9982', date: '21 Jun 2024', amount: '₹45,000', method: 'EMI', status: 'Success' },
                { id: 'TXN-9981', date: '20 Jun 2024', amount: '₹12,500', method: 'Credit Card', status: 'Success' }
            ],
            topStudents: [
                { name: 'Aryan Mehta', course: 'Grade XI (Science)', fee: '₹1,25,000' },
                { name: 'Priya Nair', course: 'Grade X', fee: '₹98,000' }
            ]
        },
        {
            id: 'GQ-INST-002',
            name: 'Delhi Public School',
            gile: 'GQ-GILE-2910',
            location: 'New Delhi, DL',
            education: 'K-12 School',
            studentsCount: 5200,
            onboardDate: '05 Mar 2022',
            gmv: 125000000,
            transactions: 4200,
            status: 'active',
            penetrationRate: 82.0,
            gateways: ['Razorpay', 'BillDesk'],
            rates: { emi: 60, pg: 20, mandate: 20 },
            contact: { name: 'Anita Sharma', email: 'admin@dpsdelhi.edu', phone: '+91 9123456780' },
            recentTransactions: [
                { id: 'TXN-8821', date: '21 Jun 2024', amount: '₹85,000', method: 'Net Banking', status: 'Success' }
            ],
            topStudents: [
                { name: 'Riya Singh', course: 'Grade XII (Commerce)', fee: '₹2,10,000' }
            ]
        },
        {
            id: 'GQ-INST-003',
            name: 'Symbiosis Institute of Tech',
            gile: 'GQ-GILE-1102',
            location: 'Pune, MH',
            education: 'Higher Education',
            studentsCount: 1800,
            onboardDate: '18 Nov 2023',
            gmv: 8500000,
            transactions: 450,
            status: 'dormant',
            penetrationRate: 25.0,
            gateways: ['PayU'],
            rates: { emi: 10, pg: 80, mandate: 10 },
            contact: { name: 'Vikram Singh', email: 'accounts@symbiosis.edu', phone: '+91 9988776655' },
            recentTransactions: [],
            topStudents: []
        },
        {
            id: 'GQ-INST-004',
            name: "St. Xavier's College",
            gile: 'GQ-GILE-8843',
            location: 'Mumbai, MH',
            education: 'Undergraduate',
            studentsCount: 3200,
            onboardDate: '02 Sep 2022',
            gmv: 62000000,
            transactions: 2800,
            status: 'active',
            penetrationRate: 68.5,
            gateways: ['Razorpay', 'Cashfree'],
            rates: { emi: 55, pg: 30, mandate: 15 },
            contact: { name: "Father D'Souza", email: 'finance@xaviers.edu', phone: '+91 9876512345' },
            recentTransactions: [],
            topStudents: [
                { name: 'Cyrus Mistry', course: 'B.Com (Hons)', fee: '₹1,85,000' }
            ]
        },
        {
            id: 'GQ-INST-005',
            name: 'Oakridge International',
            gile: 'GQ-GILE-5521',
            location: 'Hyderabad, TS',
            education: 'K-12 School',
            studentsCount: 1500,
            onboardDate: '15 Apr 2024',
            gmv: 12000000,
            transactions: 320,
            status: 'active',
            penetrationRate: 45.0,
            gateways: ['Stripe', 'Razorpay'],
            rates: { emi: 30, pg: 50, mandate: 20 },
            contact: { name: 'Priya Reddy', email: 'priya.r@oakridge.edu', phone: '+91 9012345678' },
            recentTransactions: [],
            topStudents: []
        }
    ],
    pipelines: [
        { name: 'Ryan International', gile: 'GQ-GILE-PEND-1', state: 'Document Verification', date: '19 Jun 2024', progress: '60%' },
        { name: 'Amity University', gile: 'GQ-GILE-PEND-2', state: 'API Integration', date: '20 Jun 2024', progress: '85%' },
        { name: 'Podar International', gile: 'GQ-GILE-PEND-3', state: 'Contract Signed', date: '21 Jun 2024', progress: '40%' }
    ],
    commissions: [
        { mode: 'Credit Card (EMI)', earned: '₹12,45,000', rate: '1.2% – 1.5%' },
        { mode: 'Net Banking / UPI', earned: '₹3,20,000', rate: '0.5% – 0.8%' },
        { mode: 'e-Mandate Setup', earned: '₹8,90,000', rate: 'Flat ₹500/setup' },
        { mode: 'Late Fee Share', earned: '₹1,15,000', rate: '20% of collected' },
        { mode: 'Term Loan Disbursals', earned: '₹2,80,000', rate: '2.5% of principal' },
        { mode: 'Insurance Co-branded', earned: '₹40,000', rate: '₹200/policy' }
    ],
    commissionTx: [
        { date: '21 Jun 2024', gqId: 'GQ-PAY-4481', txId: 'TXN-1011', amount: '₹45,000', commission: '₹900', rate: '2.0%', utr: 'SBIN0001234567' },
        { date: '21 Jun 2024', gqId: 'GQ-PAY-4480', txId: 'TXN-1012', amount: '₹12,500', commission: '₹250', rate: '2.0%', utr: 'HDFC0009876543' },
        { date: '21 Jun 2024', gqId: 'GQ-PAY-4479', txId: 'TXN-1014', amount: '₹22,000', commission: '₹440', rate: '2.0%', utr: 'ICIC0004567890' },
        { date: '21 Jun 2024', gqId: 'GQ-PAY-4478', txId: 'TXN-1015', amount: '₹1,20,000', commission: '₹2,400', rate: '2.0%', utr: 'AXIS0005678901' },
        { date: '20 Jun 2024', gqId: 'GQ-PAY-4477', txId: 'TXN-1016', amount: '₹85,000', commission: '₹1,700', rate: '2.0%', utr: 'KKBK0001234567' },
        { date: '20 Jun 2024', gqId: 'GQ-PAY-4476', txId: 'TXN-1017', amount: '₹34,000', commission: '₹680', rate: '2.0%', utr: 'BARB0001234567' },
        { date: '19 Jun 2024', gqId: 'GQ-PAY-4475', txId: 'TXN-1018', amount: '₹55,000', commission: '₹1,100', rate: '2.0%', utr: 'PNBN0001234567' },
        { date: '19 Jun 2024', gqId: 'GQ-PAY-4474', txId: 'TXN-1019', amount: '₹90,000', commission: '₹1,800', rate: '2.0%', utr: 'SBIN0009876543' },
        { date: '18 Jun 2024', gqId: 'GQ-PAY-4473', txId: 'TXN-1020', amount: '₹38,500', commission: '₹770', rate: '2.0%', utr: 'PUNB0001234567' },
        { date: '18 Jun 2024', gqId: 'GQ-PAY-4472', txId: 'TXN-1021', amount: '₹72,000', commission: '₹1,440', rate: '2.0%', utr: 'CITI0001234567' },
        { date: '17 Jun 2024', gqId: 'GQ-PAY-4471', txId: 'TXN-1022', amount: '₹14,000', commission: '₹280', rate: '2.0%', utr: 'UTIB0001234567' },
        { date: '17 Jun 2024', gqId: 'GQ-PAY-4470', txId: 'TXN-1023', amount: '₹2,10,000', commission: '₹4,200', rate: '2.0%', utr: 'YESB0001234567' }
    ],
    settlements: [
        { id: 'STL-99124', date: '21 Jun 2024', inst: 'Vidyashilp Academy', amount: '₹14,50,000', utr: 'SBIN0001234567', accountMapped: 'SBI •••• 4821', status: 'Completed' },
        { id: 'STL-99125', date: '20 Jun 2024', inst: 'Delhi Public School', amount: '₹8,20,000', utr: 'HDFC0009876543', accountMapped: 'HDFC •••• 6210', status: 'Completed' },
        { id: 'STL-99126', date: '19 Jun 2024', inst: 'St. Xavier\'s College', amount: '₹22,10,000', utr: 'ICIC0004567890', accountMapped: 'ICICI •••• 1193', status: 'Completed' },
        { id: 'STL-99127', date: '18 Jun 2024', inst: 'Oakridge International', amount: '₹5,40,000', utr: 'AXIS-PENDING', accountMapped: 'Axis •••• 3374', status: 'Processing' },
        { id: 'STL-99128', date: '17 Jun 2024', inst: 'Symbiosis Institute', amount: '₹11,35,000', utr: 'KKBK0001234567', accountMapped: 'Kotak •••• 8829', status: 'Completed' },
        { id: 'STL-99129', date: '16 Jun 2024', inst: 'Ryan International', amount: '₹3,20,000', utr: 'BARB0001234567', accountMapped: 'BOB •••• 5541', status: 'Completed' },
        { id: 'STL-99130', date: '15 Jun 2024', inst: 'Amity University', amount: '₹9,80,000', utr: 'PNBN0001234567', accountMapped: 'PNB •••• 6632', status: 'Completed' },
        { id: 'STL-99131', date: '14 Jun 2024', inst: 'Podar International', amount: '₹6,75,000', utr: 'SBIN0012345678', accountMapped: 'SBI •••• 7741', status: 'Completed' },
        { id: 'STL-99132', date: '13 Jun 2024', inst: 'Vidyashilp Academy', amount: '₹18,20,000', utr: 'HDFC0019876543', accountMapped: 'HDFC •••• 4821', status: 'Completed' },
        { id: 'STL-99133', date: '12 Jun 2024', inst: 'Delhi Public School', amount: '₹4,90,000', utr: 'INDB-PENDING', accountMapped: 'IndusInd •••• 2210', status: 'Processing' }
    ],
    transactions: [
        { id: 'TXN-1011', date: '21 Jun 2024 14:30', inst: 'Vidyashilp Academy', student: 'Aryan Mehta', amount: '₹45,000', method: 'EMI', status: 'Success', utr: 'SBIN0001234567' },
        { id: 'TXN-1012', date: '21 Jun 2024 13:15', inst: 'Delhi Public School', student: 'Riya Singh', amount: '₹12,500', method: 'UPI', status: 'Success', utr: 'HDFC0009876543' },
        { id: 'TXN-1013', date: '21 Jun 2024 12:05', inst: 'Oakridge International', student: 'Dev Kapoor', amount: '₹85,000', method: 'Credit Card', status: 'Failed', utr: '—' },
        { id: 'TXN-1014', date: '21 Jun 2024 11:40', inst: "St. Xavier's College", student: 'Cyrus Mistry', amount: '₹22,000', method: 'Net Banking', status: 'Success', utr: 'ICIC0004567890' },
        { id: 'TXN-1015', date: '21 Jun 2024 10:20', inst: 'Vidyashilp Academy', student: 'Priya Nair', amount: '₹1,20,000', method: 'EMI', status: 'Success', utr: 'AXIS0005678901' },
        { id: 'TXN-1016', date: '20 Jun 2024 16:45', inst: 'Delhi Public School', student: 'Ankit Sharma', amount: '₹85,000', method: 'EMI', status: 'Success', utr: 'KKBK0001234567' },
        { id: 'TXN-1017', date: '20 Jun 2024 15:20', inst: 'Symbiosis Institute', student: 'Megha Joshi', amount: '₹34,000', method: 'UPI', status: 'Success', utr: 'BARB0001234567' },
        { id: 'TXN-1018', date: '20 Jun 2024 14:10', inst: 'Ryan International', student: 'Rahul Verma', amount: '₹55,000', method: 'e-Mandate', status: 'Success', utr: 'PNBN0001234567' },
        { id: 'TXN-1019', date: '20 Jun 2024 11:30', inst: "St. Xavier's College", student: 'Fatima Sheikh', amount: '₹90,000', method: 'EMI', status: 'Success', utr: 'SBIN0009876543' },
        { id: 'TXN-1020', date: '19 Jun 2024 17:00', inst: 'Amity University', student: 'Rohan Das', amount: '₹38,500', method: 'Net Banking', status: 'Failed', utr: '—' },
        { id: 'TXN-1021', date: '19 Jun 2024 13:45', inst: 'Oakridge International', student: 'Sneha Patel', amount: '₹72,000', method: 'Credit Card', status: 'Success', utr: 'CITI0001234567' },
        { id: 'TXN-1022', date: '19 Jun 2024 10:00', inst: 'Podar International', student: 'Karan Mehta', amount: '₹14,000', method: 'UPI', status: 'Success', utr: 'UTIB0001234567' }
    ],
    notifications: [
        { icon: '💰', title: 'New settlement processed', desc: '₹14,50,000 settled to SBI – UTR: SBIN0001234567', time: '5 min ago' },
        { icon: '🏫', title: 'New institute request', desc: 'Ryan International submitted onboarding form', time: '1 hr ago' },
        { icon: '⚠️', title: 'Transaction failed', desc: 'TXN-1013 failed for Oakridge – ₹85,000 Credit Card', time: '2 hrs ago' }
    ],
    apiKeys: [
        { gile: 'GQ-GILE-4829', inst: 'Vidyashilp Academy', location: 'Bangalore, KA', clientId: 'gq_client_vidyashilp_blr', webhookStatus: 'Active', endpoints: 2 },
        { gile: 'GQ-GILE-2910', inst: 'Delhi Public School', location: 'New Delhi, DL', clientId: 'gq_client_dps_delhi', webhookStatus: 'Active', endpoints: 3 },
        { gile: 'GQ-GILE-1102', inst: 'Symbiosis Institute of Tech', location: 'Pune, MH', clientId: 'gq_client_symbiosis_pn', webhookStatus: 'Inactive', endpoints: 0 },
        { gile: 'GQ-GILE-8843', inst: "St. Xavier's College", location: 'Mumbai, MH', clientId: 'gq_client_xavier_mum', webhookStatus: 'Active', endpoints: 1 },
        { gile: 'GQ-GILE-5521', inst: 'Oakridge International', location: 'Hyderabad, TS', clientId: 'gq_client_oakridge_hyd', webhookStatus: 'Pending', endpoints: 0 }
    ],
    productsGile: [
        { gile: 'GQ-GILE-4829 - Vidyashilp', pg: true, emi: true, auto: true, success: '99.1%' },
        { gile: 'GQ-GILE-2910 - Delhi Public School', pg: true, emi: true, auto: false, success: '96.5%' },
        { gile: 'GQ-GILE-1102 - Symbiosis', pg: true, emi: false, auto: false, success: '85.2%' },
        { gile: 'GQ-GILE-8843 - St. Xavier\'s', pg: true, emi: true, auto: true, success: '98.8%' },
        { gile: 'GQ-GILE-5521 - Oakridge', pg: false, emi: false, auto: false, success: '-' },
        { gile: 'GQ-GILE-3312 - Ryan International', pg: true, emi: true, auto: true, success: '97.2%' },
        { gile: 'GQ-GILE-7741 - Amity University', pg: true, emi: true, auto: false, success: '94.8%' },
        { gile: 'GQ-GILE-9922 - Podar International', pg: true, emi: false, auto: false, success: '89.5%' }
    ],
    onboardingRequests: [
        { id: 'REQ-001', name: 'Ryan International', gile: 'GQ-GILE-PEND-1', group: 'Ryan Group', location: 'Mumbai, MH', education: 'K-12 School', date: '19 Jun 2024', status: 'Pending Product ID', productId: '', code: '', groupId: '', instituteId: '', locationId: '', educationId: '', classId: '', feeRows: [{ feeType: 'Tuition Fee', type: 'Monthly', active: true }], createdOn: '19 Jun 2024 10:00', updatedOn: '19 Jun 2024 10:00' },
        { id: 'REQ-002', name: 'Amity University', gile: 'GQ-GILE-PEND-2', group: 'Amity Education', location: 'Noida, UP', education: 'Higher Education', date: '20 Jun 2024', status: 'Pending Product ID', productId: '', code: '', groupId: '', instituteId: '', locationId: '', educationId: '', classId: '', feeRows: [{ feeType: 'Hostel Fee', type: 'Quarterly', active: true }], createdOn: '20 Jun 2024 11:30', updatedOn: '20 Jun 2024 11:30' },
        { id: 'REQ-003', name: 'Podar International', gile: 'GQ-GILE-PEND-3', group: 'Podar Group', location: 'Pune, MH', education: 'K-12 School', date: '21 Jun 2024', status: 'Pending Product ID', productId: '', code: '', groupId: '', instituteId: '', locationId: '', educationId: '', classId: '', feeRows: [{ feeType: 'Tuition Fee', type: 'Monthly', active: true }], createdOn: '21 Jun 2024 14:15', updatedOn: '21 Jun 2024 14:15' }
    ]
};

// Formatting utilities
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};
const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
};

// ================= GLOBAL STATE =================
let charts = {};
let currentWebhookData = null;

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initOverviewCharts();
    populateInstituteTable();
    populatePipelines();
    populateCommissions();
    populateCommissionTxTable();
    populateSettlements();
    populateTransactions();
    populateApiTable();
    populateNotifications();
    populateOnboardingRequestLog();
    initAllButtons();
    populateSupportGileSelect();
    populateSupportTickets();
    populateProductsTable();
    initAdminPanel();
    populateAdminPendingRequests();

    // Default tab
    switchTab('overview');
});

// ================= NAVIGATION LOGIC =================
function initNavigation() {
    // Sidebar Main & Submenu Links
    const menuLinks = document.querySelectorAll('.menu-item[data-tab], .submenu-item[data-tab]');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);

            // Highlight active link
            document.querySelectorAll('.menu-item, .submenu-item').forEach(m => m.classList.remove('active'));
            link.classList.add('active');

            // If it's a submenu item, also highlight the parent menu item
            if (link.classList.contains('submenu-item')) {
                link.closest('.menu-item-wrapper').querySelector('.menu-parent').classList.add('active');
            }
        });
    });

    // Sidebar Accordion Toggles
    const parentToggles = document.querySelectorAll('.menu-parent[data-expand]');
    parentToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const wrapper = toggle.closest('.menu-item-wrapper');
            if (wrapper) wrapper.classList.toggle('expanded');
        });
    });

    // Sub-tabs within pages (Transactions / Institutes)
    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subtabId = btn.getAttribute('data-subtab');
            if (subtabId) {
                switchTab(subtabId);
            }
        });
    });
}

function switchTab(tabId) {
    window.switchTab = switchTab;
    console.log('⚡ switchTab called with:', tabId);
    // Hide all main tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    let targetMainTabId = tabId;
    let targetSubTabId = null;

    // Handle sub-tab routing for Institute Management
    if (tabId.startsWith('inst-') && tabId !== 'inst-drilldown-tab') {
        targetMainTabId = 'institutes';
        targetSubTabId = tabId;
    }

    // Determine exact ID by checking if it already has '-tab'
    const targetId = targetMainTabId.endsWith('-tab') ? targetMainTabId : targetMainTabId + '-tab';
    const target = document.getElementById(targetId);
    console.log('switchTab targetId:', targetId, 'target found:', !!target);

    if (target) {
        if (targetId !== 'admin-tab') {
            const portalSelect = document.getElementById('portal-mode-select');
            if (portalSelect && portalSelect.value === 'admin') {
                portalSelect.value = 'partner';
            }
        }
        target.classList.add('active');

        // If it was a sub-tab route, activate the specific sub-tab, otherwise default to inst-details
        if (targetId === 'institutes-tab') {
            const activeSub = targetSubTabId || 'inst-details';
            target.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
            const subTarget = document.getElementById(activeSub + '-subtab');
            if (subTarget) subTarget.classList.add('active');

            target.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
            const btn = target.querySelector(`.sub-tab-btn[data-subtab="${activeSub}"]`);
            if (btn) btn.classList.add('active');

            populateInstituteTable();
        }

        // Render charts and populate tables dynamically whenever tab opens
        if (targetId === 'overview-tab' && typeof renderOverviewCharts === 'function') renderOverviewCharts();
        if (targetId === 'institutes-tab') { populateInstituteTable(); populatePipelines(); }
        if (targetId === 'transactions-tab') { populateTransactions(); renderTransactionsChart(); }
        if (targetId === 'settlements-tab') { populateSettlements(); renderSettlementsChart(); }
        if (targetId === 'commissions-tab') { populateCommissions(); populateCommissionTxTable(); renderCommissionsChart(); }
        if (targetId === 'support-tab') { populateSupportTickets(); }
        if (targetId === 'admin-tab') { populateAdminPendingRequests(); populateFeeMappingRegistry(); }
    }
}

// ================= INIT ALL BUTTONS =================
function initAllButtons() {
    // ---- Header: Notification Bell ----
    const notifBtn = document.getElementById('notification-btn');
    const notifPane = document.getElementById('notification-dropdown-pane');
    if (notifBtn && notifPane) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPane.classList.toggle('open');
        });
        document.addEventListener('click', () => notifPane.classList.remove('open'));
    }

    // ---- Header: Clear All Notifications ----
    const clearNotifBtn = document.getElementById('clear-notifications');
    if (clearNotifBtn) {
        clearNotifBtn.addEventListener('click', () => {
            const list = document.getElementById('notification-list');
            if (list) list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--color-text-light);font-size:13px;">No new notifications</div>';
            const badge = document.getElementById('notification-badge');
            if (badge) badge.style.display = 'none';
        });
    }

    // ---- Overview: Date filter buttons ----
    document.querySelectorAll('.date-filter-group .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.date-filter-group').querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // In a real app, this would re-fetch filtered data. Here we just show a toast.
            showToast(`Filter applied: ${btn.textContent.trim()}`);
        });
    });

    // ---- Institute Request: Single / Bulk Toggle ----
    const btnSingle = document.getElementById('btn-toggle-single');
    const btnBulk = document.getElementById('btn-toggle-bulk');
    const singleForm = document.getElementById('single-onboarding-form');
    const bulkSection = document.getElementById('bulk-onboarding-section');
    if (btnSingle && btnBulk) {
        btnSingle.addEventListener('click', () => {
            btnSingle.classList.add('active'); btnBulk.classList.remove('active');
            if (singleForm) singleForm.style.display = '';
            if (bulkSection) bulkSection.style.display = 'none';
        });
        btnBulk.addEventListener('click', () => {
            btnBulk.classList.add('active'); btnSingle.classList.remove('active');
            if (singleForm) singleForm.style.display = 'none';
            if (bulkSection) bulkSection.style.display = '';
        });
    }

    // ---- Institute Request: Add Fee Header ----
    const btnAddFee = document.getElementById('btn-add-fee-header');
    if (btnAddFee) {
        btnAddFee.addEventListener('click', () => {
            const list = document.getElementById('req-fee-headers-list');
            if (!list) return;
            const row = document.createElement('div');
            row.className = 'fee-header-row';
            row.innerHTML = `
                <input type="text" class="fee-name" placeholder="e.g. Hostel Fee" required>
                <select class="fee-financing">
                    <option value="EMI">EMI</option>
                    <option value="PG">PG</option>
                    <option value="Mandate">Mandate</option>
                </select>
                <button type="button" class="btn-remove-row" onclick="this.closest('.fee-header-row').remove()">×</button>
            `;
            list.appendChild(row);
        });
    }

    // ---- Institute Request: Submit Onboarding Form ----
    const singleFormEl = document.getElementById('single-onboarding-form');
    if (singleFormEl) {
        singleFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const group = document.getElementById('req-group').value;
            const institute = document.getElementById('req-institute').value;
            const location = document.getElementById('req-location').value;
            const education = document.getElementById('req-education').value;

            // Gather fee headers
            const feeRows = [];
            document.querySelectorAll('#req-fee-headers-list .fee-header-row').forEach(row => {
                const name = row.querySelector('.fee-name').value;
                const financing = row.querySelector('.fee-financing').value;
                if (name) {
                    feeRows.push({ feeType: name, type: financing, active: true });
                }
            });

            const newReq = {
                id: 'REQ-' + String(DB.onboardingRequests.length + 1).padStart(3, '0'),
                name: institute,
                gile: 'GQ-GILE-PEND-' + (DB.onboardingRequests.length + 1),
                group: group,
                location: location,
                education: education,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
                status: 'Pending Product ID',
                productId: '',
                code: '',
                groupId: '',
                instituteId: '',
                locationId: '',
                educationId: '',
                classId: '',
                feeRows: feeRows,
                createdOn: new Date().toLocaleString(),
                updatedOn: new Date().toLocaleString()
            };

            DB.onboardingRequests.push(newReq);
            populateOnboardingRequestLog();
            if (typeof populateAdminPendingRequests === 'function') {
                populateAdminPendingRequests();
            }

            showToast(`✅ Onboarding request for "${institute}" submitted successfully!`);
            singleFormEl.reset();
            // Reset fee rows to default single row
            const list = document.getElementById('req-fee-headers-list');
            if (list) {
                list.innerHTML = `
                    <div class="fee-header-row">
                        <input type="text" class="fee-name" placeholder="e.g. Academic Tuition Fee" required>
                        <select class="fee-financing">
                            <option value="EMI">EMI</option>
                            <option value="PG">PG</option>
                            <option value="Mandate">Mandate</option>
                        </select>
                        <button type="button" class="btn-remove-row" style="visibility: hidden;">×</button>
                    </div>
                `;
            }
        });
    }

    // ---- Bulk Drop Zone: Click to Browse ----
    const dropZone = document.getElementById('bulk-drop-zone');
    const fileInput = document.getElementById('bulk-file-input');
    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) showToast(`📁 File "${file.name}" uploaded successfully!`);
        });
        fileInput.addEventListener('change', () => {
            if (fileInput.files[0]) showToast(`📁 File "${fileInput.files[0].name}" ready to process!`);
        });
    }

    // ---- Overview: Date Filters ----
    const overviewFilters = document.getElementById('overview-period-filters');
    if (overviewFilters) {
        const btns = overviewFilters.querySelectorAll('.btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const val = btn.textContent.trim();

                // Dataset configurations per period
                const periodData = {
                    'All Time':   { insts: '48', gmv: '₹12.45 Cr', comm: '₹24.90 L', txs: '14,293', pending: '₹1.84 Cr',
                                    barData: [[12,19,15,22,28,35],[8,12,10,15,18,22],[4,6,8,10,12,15]], barLabels: ['Jan','Feb','Mar','Apr','May','Jun'],
                                    donutData: [55,30,15] },
                    'This Month': { insts: '12', gmv: '₹3.20 Cr', comm: '₹6.40 L', txs: '4,102', pending: '₹0.48 Cr',
                                    barData: [[4,6,8,10,12,14],[3,4,5,7,6,8],[1,2,3,4,3,4]], barLabels: ['Week1','Week2','Week3','Week4','Week5','Week6'],
                                    donutData: [50, 33, 17] },
                    'This Week':  { insts: '4', gmv: '₹0.85 Cr', comm: '₹1.70 L', txs: '1,050', pending: '₹0.12 Cr',
                                    barData: [[2,3,1,4,3,2],[1,2,1,2,1,2],[0,1,0,1,1,0]], barLabels: ['Mon','Tue','Wed','Thu','Fri','Sat'],
                                    donutData: [45, 38, 17] }
                };
                const d = periodData[val] || periodData['All Time'];
                
                const elInsts = document.getElementById('overview-total-institutes');
                const elGmv = document.getElementById('overview-total-gmv');
                const elComm = document.getElementById('overview-total-commissions');
                const elTxs = document.getElementById('overview-total-transactions');
                const elPending = document.getElementById('overview-pending-payouts');
                
                if (elInsts) elInsts.textContent = d.insts;
                if (elGmv) elGmv.textContent = d.gmv;
                if (elComm) elComm.textContent = d.comm;
                if (elTxs) elTxs.textContent = d.txs;
                if (elPending) elPending.textContent = d.pending;

                // Update bar chart
                if (charts.gmvBar) {
                    charts.gmvBar.data.labels = d.barLabels;
                    charts.gmvBar.data.datasets[0].data = d.barData[0];
                    charts.gmvBar.data.datasets[1].data = d.barData[1];
                    charts.gmvBar.data.datasets[2].data = d.barData[2];
                    charts.gmvBar.update('active');
                }

                // Update donut chart
                if (charts.paymentMode) {
                    charts.paymentMode.data.datasets[0].data = d.donutData;
                    charts.paymentMode.update('active');
                }
                
                showToast(`📊 Overview updated to: ${val}`);
            });
        });
    }

    // ---- Pipeline: Total Filter ----
    const pipelineFilter = document.getElementById('pipeline-total-filter');
    if (pipelineFilter) {
        pipelineFilter.addEventListener('change', () => {
            const val = pipelineFilter.value;
            let total = '48';
            if (val === 'yearly') total = '120';
            else if (val === 'monthly') total = '48';
            else if (val === 'weekly') total = '12';
            else if (val === 'daily') total = '3';
            
            const elTotal = document.getElementById('pipeline-total-count');
            if (elTotal) elTotal.textContent = total;
            
            showToast(`Pipeline view updated to: ${pipelineFilter.options[pipelineFilter.selectedIndex].text}`);
        });
    }

    const btnSettleApply = document.getElementById('btn-settlement-filter-apply');
    if (btnSettleApply) {
        btnSettleApply.addEventListener('click', () => {
            const start = document.getElementById('settlement-date-start')?.value;
            const end = document.getElementById('settlement-date-end')?.value;
            if (!start || !end) { showToast('⚠️ Please select both start and end dates.', 'warning'); return; }
            showToast(`📅 Filter applied: ${start} → ${end}`);
        });
    }

    // ---- Settlements: Download ----
    const btnSettleDownload = document.getElementById('btn-settlement-download');
    if (btnSettleDownload) {
        btnSettleDownload.addEventListener('click', () => {
            exportTableToCSV('settlements-table-body', 'settlements_report.csv');
        });
    }

    // ---- Commissions: Period Filter ----
    const commPeriod = document.getElementById('commission-card-period-filter');
    if (commPeriod) {
        commPeriod.addEventListener('change', () => {
            const val = commPeriod.value;
            let total = '₹24.90 L', rate = '2.0%', pend = '₹3.68 Lakhs';
            if (val === 'all') { total = '₹118.50 L'; rate = '1.85%'; pend = '₹12.40 Lakhs'; }
            else if (val === 'yearly') { total = '₹45.20 L'; rate = '1.92%'; pend = '₹4.10 Lakhs'; }
            else if (val === 'monthly') { total = '₹8.45 L'; rate = '1.95%'; pend = '₹1.20 Lakhs'; }
            else if (val === 'weekly') { total = '₹2.10 L'; rate = '2.0%'; pend = '₹0.30 Lakhs'; }
            else if (val === 'daily') { total = '₹0.35 L'; rate = '2.0%'; pend = '₹0.05 Lakhs'; }
            
            const eVal = document.getElementById('comm-earned-val');
            const rVal = document.getElementById('comm-rate-val');
            const pVal = document.getElementById('comm-pend-val');
            
            if (eVal) eVal.textContent = total;
            if (rVal) rVal.textContent = rate;
            if (pVal) pVal.textContent = pend;
            
            showToast(`📊 Commission view updated to: ${commPeriod.options[commPeriod.selectedIndex].text}`);
        });
    }

    // ---- Commissions: Download ----
    const btnCommDownload = document.getElementById('btn-commission-download');
    if (btnCommDownload) {
        btnCommDownload.addEventListener('click', () => {
            exportTableToCSV('comm-tx-table-body', 'commissions_report.csv');
        });
    }

    // ---- Commissions TX: Search ----
    const commSearch = document.getElementById('comm-list-search');
    if (commSearch) {
        commSearch.addEventListener('input', () => filterTableRows('comm-tx-table-body', commSearch.value, [0, 1, 2]));
    }

    // ---- Commissions TX: Date Filter Apply ----
    const btnCommDateApply = document.getElementById('btn-comm-list-date-apply');
    if (btnCommDateApply) {
        btnCommDateApply.addEventListener('click', () => showToast('📅 Commission date filter applied'));
    }

    // ---- Transactions: Search ----
    const txSearch = document.getElementById('tx-list-search');
    if (txSearch) {
        txSearch.addEventListener('input', () => filterTransactions());
    }

    // ---- Transactions: Institute Filter ----
    const txInstFilter = document.getElementById('tx-inst-filter');
    if (txInstFilter) {
        DB.institutes.forEach(inst => {
            const opt = document.createElement('option');
            opt.value = inst.name;
            opt.textContent = inst.name;
            txInstFilter.appendChild(opt);
        });
        txInstFilter.addEventListener('change', () => filterTransactions());
    }

    // ---- Transactions: Mode Filter ----
    const txModeFilter = document.getElementById('tx-mode-filter');
    if (txModeFilter) {
        txModeFilter.addEventListener('change', () => filterTransactions());
    }

    // ---- Transactions: Status Filter ----
    const txStatusFilter = document.getElementById('tx-status-filter');
    if (txStatusFilter) {
        txStatusFilter.addEventListener('change', () => filterTransactions());
    }

    // ---- Institutes: Search & Filters ----
    const instSearch = document.getElementById('inst-list-search');
    const instStatus = document.getElementById('inst-status-filter');
    const instSort = document.getElementById('inst-sort-filter');
    if (instSearch) instSearch.addEventListener('input', () => filterInstituteTable());
    if (instStatus) instStatus.addEventListener('change', () => filterInstituteTable());
    if (instSort) instSort.addEventListener('change', () => filterInstituteTable());

    // ---- Webhook Modal: Close X button ----
    const btnCloseWebhook = document.getElementById('btn-close-webhook-modal');
    if (btnCloseWebhook) btnCloseWebhook.addEventListener('click', closeWebhookModal);

    // ---- Webhook Modal: Cancel button ----
    const btnCancelWebhook = document.getElementById('btn-cancel-webhook');
    if (btnCancelWebhook) btnCancelWebhook.addEventListener('click', closeWebhookModal);

    // ---- Webhook Modal: Overlay click to close ----
    const webhookOverlay = document.getElementById('webhook-modal-overlay');
    if (webhookOverlay) webhookOverlay.addEventListener('click', closeWebhookModal);

    // ---- Webhook Modal: Reveal Secret ----
    const btnReveal = document.getElementById('btn-reveal-secret');
    if (btnReveal) {
        btnReveal.addEventListener('click', () => {
            const secretEl = document.getElementById('modal-client-secret');
            if (!secretEl) return;
            if (secretEl.type === 'password') {
                secretEl.type = 'text';
                secretEl.value = 'gq_secret_' + (currentWebhookData?.gile || 'xxxx').replace('GQ-GILE-', '') + '_sk_live_xK9a7b';
                btnReveal.textContent = 'Hide';
            } else {
                secretEl.type = 'password';
                secretEl.value = '••••••••••••••••••••••••••••••••';
                btnReveal.textContent = 'Reveal';
            }
        });
    }

    // ---- Webhook Modal: Save Configuration ----
    const btnSaveWebhook = document.getElementById('btn-save-webhook');
    if (btnSaveWebhook) {
        btnSaveWebhook.addEventListener('click', () => {
            const urlInput = document.getElementById('webhook-url-input');
            const url = urlInput ? urlInput.value.trim() : '';
            if (!url) { showToast('⚠️ Please enter a valid webhook URL', 'warning'); return; }
            showToast(`✅ Webhook configuration saved for ${currentWebhookData?.inst || 'institute'}!`);
            closeWebhookModal();
        });
    }

    // ---- Support: Submit Ticket ----
    const supportForm = document.getElementById('support-ticket-form');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('✅ Support ticket submitted! We\'ll respond within 24 hours.');
            supportForm.reset();
        });
    }

    // ---- Populate institute dropdowns in TX analytics selects ----
    document.querySelectorAll('.select-inst-drill').forEach(sel => {
        DB.institutes.forEach(inst => {
            const opt = document.createElement('option');
            opt.value = inst.id;
            opt.textContent = inst.name;
            sel.appendChild(opt);
        });
        sel.addEventListener('change', () => {
            const text = sel.options[sel.selectedIndex].text;
            showToast(`Filtering by: ${text}`);
            
            // Randomize metrics to simulate filtering
            const isAll = sel.value === 'all';
            const succCount = isAll ? '12,840' : Math.floor(Math.random() * 3000 + 500).toLocaleString();
            const succVal = isAll ? '₹12.45 Cr' : `₹${(Math.random() * 3 + 0.5).toFixed(2)} Cr`;
            
            const elCount = document.getElementById('tx-total-success-count');
            const elVal = document.getElementById('tx-total-success-val');
            if (elCount) elCount.textContent = succCount;
            if (elVal) elVal.textContent = succVal;
            
            // Sync all drilldown dropdowns so they match
            document.querySelectorAll('.select-inst-drill').forEach(otherSel => {
                if (otherSel !== sel) otherSel.value = sel.value;
            });
        });
    });

    // ---- Institute List Filters ----
    const instStatusFilter = document.getElementById('inst-status-filter');
    if (instStatusFilter) {
        instStatusFilter.addEventListener('change', () => {
            const val = instStatusFilter.value;
            const tbody = document.getElementById('institutes-table-body');
            if (!tbody) return;
            tbody.querySelectorAll('tr').forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = (val === 'all' || text.includes(val)) ? '' : 'none';
            });
            showToast(`Filtered institutes by: ${instStatusFilter.options[instStatusFilter.selectedIndex].text}`);
        });
    }

    const instSortFilter = document.getElementById('inst-sort-filter');
    if (instSortFilter) {
        instSortFilter.addEventListener('change', () => {
            showToast(`Sorted institutes by: ${instSortFilter.options[instSortFilter.selectedIndex].text}`);
        });
    }
}

// ================= TABLE RENDERERS =================
function populateInstituteTable() {
    const tbody = document.getElementById('institutes-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    DB.institutes.forEach(inst => {
        const tr = document.createElement('tr');
        tr.className = 'clickable-row';
        tr.onclick = () => openInstituteDrilldown(inst.id);

        const statusClass = inst.status === 'active' ? 'active' : 'dormant';
        const gmvFmt = formatCurrency(inst.gmv);

        tr.innerHTML = `
            <td>
                <div class="table-primary-text">${inst.name}</div>
                <div class="table-secondary-text">${inst.gile}</div>
            </td>
            <td>
                <div class="table-primary-text">${inst.education}</div>
                <div class="table-secondary-text">${inst.location}</div>
            </td>
            <td class="text-right">${formatNumber(inst.studentsCount)}</td>
            <td class="text-right table-primary-text">${gmvFmt}</td>
            <td class="text-right">${inst.penetrationRate}%</td>
            <td><span class="badge-status ${statusClass}">${inst.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function populatePipelines() {
    const list = document.getElementById('pipeline-progress-list');
    if (!list) return;
    list.innerHTML = '';
    DB.pipelines.forEach(p => {
        list.innerHTML += `
            <div class="pipeline-item">
                <div class="pipeline-info-details">
                    <div class="pipeline-title">${p.name}</div>
                    <div class="pipeline-sub">${p.gile} • Added: ${p.date}</div>
                </div>
                <div>
                    <span class="badge-status pending">${p.state} (${p.progress})</span>
                </div>
            </div>
        `;
    });
}

function populateProductsTable() {
    const tbody = document.getElementById('products-gile-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    DB.productsGile.forEach(p => {
        const checkIcon = `<svg style="width:16px;height:16px;color:var(--color-success);" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        const crossIcon = `<svg style="width:16px;height:16px;color:var(--color-danger);" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;
        tbody.innerHTML += `
            <tr>
                <td style="padding-left:24px;"><div class="table-primary-text">${p.gile}</div></td>
                <td style="text-align:center;">${p.pg ? checkIcon : crossIcon}</td>
                <td style="text-align:center;">${p.emi ? checkIcon : crossIcon}</td>
                <td style="text-align:center;">${p.auto ? checkIcon : crossIcon}</td>
                <td class="text-right" style="font-weight:600;">${p.success}</td>
                <td class="text-right" style="padding-right:24px;">
                    <button class="btn btn-secondary btn-sm" onclick="showToast('Configuring products for ${p.gile.split(' - ')[0]}')">Configure</button>
                </td>
            </tr>
        `;
    });
}

function populateCommissions() {
    const list = document.getElementById('comm-mode-splits-list');
    if (!list) return;
    list.innerHTML = '';
    DB.commissions.forEach(c => {
        list.innerHTML += `
            <div class="comm-split-item">
                <div class="comm-split-mode">${c.mode}</div>
                <div class="comm-split-vals">
                    <span class="comm-split-earned">${c.earned}</span>
                    <span class="comm-split-rate">${c.rate}</span>
                </div>
            </div>
        `;
    });
}

function populateCommissionTxTable() {
    const tbody = document.getElementById('comm-tx-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    DB.commissionTx.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td style="padding-left:24px;"><div class="table-primary-text">${c.date}</div></td>
                <td><div class="table-primary-text">${c.gqId}</div></td>
                <td><div class="table-primary-text">${c.txId}</div></td>
                <td class="table-primary-text text-right">${c.amount}</td>
                <td class="text-right" style="color:var(--color-success);font-weight:700;">${c.commission}</td>
                <td style="text-align:center;"><span class="badge-status active" style="background:var(--color-primary-light);color:var(--color-primary);">${c.rate}</span></td>
                <td style="font-family:monospace;font-size:11px;padding-right:24px;">${c.utr}</td>
            </tr>
        `;
    });
}

function toggleGroupRow(rowId, el) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const isHidden = row.style.display === 'none';
    row.style.display = isHidden ? '' : 'none';
    el.classList.toggle('expanded', isHidden);
}

function redirectToFms(id, detail, inst) {
    showToast(`🔗 Redirecting to FMS platform for ID: ${id} (${detail})`);
    console.log(`Mock FMS Redirect: https://fms.grayquest.com/record/${id}?inst=${encodeURIComponent(inst)}`);
}

function populateSettlements() {
    const tbody = document.getElementById('settlements-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const startDateVal = document.getElementById('settlement-date-start')?.value || '';
    const endDateVal = document.getElementById('settlement-date-end')?.value || '';
    const parseAmt = str => Number(str.replace(/[^0-9.-]+/g, ""));

    const filteredSettlements = DB.settlements.filter(s => {
        if (!startDateVal && !endDateVal) return true;
        const sDate = new Date(s.date);
        if (startDateVal && sDate < new Date(startDateVal)) return false;
        if (endDateVal && sDate > new Date(endDateVal)) return false;
        return true;
    });

    const grouped = {};
    filteredSettlements.forEach(s => {
        if (!grouped[s.inst]) {
            grouped[s.inst] = {
                items: [],
                totalVolume: 0,
                lastDate: s.date,
                emiTotal: 0,
                autoDebitTotal: 0,
                pgTotal: 0
            };
        }
        const amt = parseAmt(s.amount);
        grouped[s.inst].items.push(s);
        grouped[s.inst].totalVolume += amt;
        grouped[s.inst].emiTotal += amt * 0.45;
        grouped[s.inst].autoDebitTotal += amt * 0.35;
        grouped[s.inst].pgTotal += amt * 0.20;
    });

    let index = 0;
    Object.keys(grouped).forEach(instName => {
        const group = grouped[instName];
        const detailRowId = `set-detail-row-${index}`;

        tbody.innerHTML += `
            <tr class="grouped-header-tr" onclick="toggleGroupRow('${detailRowId}', this)">
                <td style="padding-left: 24px;">
                    <span class="grouped-expand-chevron">▶</span>
                    <strong>${instName}</strong>
                </td>
                <td><div class="table-secondary-text">Disbursement Summary</div></td>
                <td><span style="font-family:monospace;font-size:11px;">UTR Mapped</span></td>
                <td class="table-primary-text text-right" style="font-weight:700;color:var(--color-success);">₹${group.totalVolume.toLocaleString('en-IN')}</td>
                <td>${group.lastDate}</td>
                <td><div class="table-secondary-text">HDFC / ICICI Bank</div></td>
                <td style="text-align:center;padding-right:24px;"><span class="badge-status success">Disbursed</span></td>
            </tr>
            <tr id="${detailRowId}" class="drilldown-container-tr" style="display:none;">
                <td colspan="7" style="padding:16px; background:#f8fafc;">
                    <div style="display:flex; gap:16px; margin-bottom:12px;">
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">EMI Disbursement</span>
                            <div style="font-weight:700; color:var(--color-primary); font-size:14px;">₹${group.emiTotal.toLocaleString('en-IN', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">Auto Debit Disbursement</span>
                            <div style="font-weight:700; color:var(--color-success); font-size:14px;">₹${group.autoDebitTotal.toLocaleString('en-IN', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">PG Gateway Disbursement</span>
                            <div style="font-weight:700; color:var(--color-warning); font-size:14px;">₹${group.pgTotal.toLocaleString('en-IN', {maximumFractionDigits:0})}</div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        index++;
    });

    if (tbody.innerHTML === '') {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--color-text-light);">No settlements found</td></tr>`;
    }
}

function populateTransactions() {
    const tbody = document.getElementById('tx-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const parseAmt = str => Number(str.replace(/[^0-9.-]+/g, ""));
    const grouped = {};

    DB.transactions.forEach(t => {
        const timeSlot = "14:30 PM"; // Time slot grouping per voice instructions
        const key = `${t.inst}__${timeSlot}`;
        if (!grouped[key]) {
            grouped[key] = {
                inst: t.inst,
                timeSlot: timeSlot,
                txs: [],
                totalVolume: 0,
                emiTotal: 0,
                autoDebitTotal: 0,
                pgTotal: 0
            };
        }
        const amt = parseAmt(t.amount);
        grouped[key].txs.push(t);
        grouped[key].totalVolume += amt;
        if (t.method === 'EMI') grouped[key].emiTotal += amt;
        else if (t.method === 'Auto Debit' || t.method === 'Net Banking') grouped[key].autoDebitTotal += amt;
        else grouped[key].pgTotal += amt;
    });

    let index = 0;
    Object.keys(grouped).forEach(key => {
        const group = grouped[key];
        const detailRowId = `tx-detail-row-${index}`;

        tbody.innerHTML += `
            <tr class="grouped-header-tr" onclick="toggleGroupRow('${detailRowId}', this)">
                <td style="padding-left: 24px;">
                    <span class="grouped-expand-chevron">▶</span>
                    <strong>${group.inst}</strong>
                </td>
                <td><div class="table-secondary-text">${group.txs.length} Transactions</div></td>
                <td>
                    <span class="badge-status active" style="font-size:10px; background:var(--color-primary-light); color:var(--color-primary);">EMI</span>
                    <span class="badge-status success" style="font-size:10px;">Auto Debit</span>
                    <span class="badge-status pending" style="font-size:10px;">PG Gateway</span>
                </td>
                <td class="table-primary-text text-right" style="font-weight:700; color:var(--color-text-dark);">₹${group.totalVolume.toLocaleString('en-IN')}</td>
                <td>Today, ${group.timeSlot}</td>
                <td style="text-align:center;"><span class="badge-status success">Received</span></td>
            </tr>
            <tr id="${detailRowId}" class="drilldown-container-tr" style="display:none;">
                <td colspan="6" style="padding:16px; background:#f8fafc;">
                    <div style="display:flex; gap:16px;">
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">Total Received by EMI</span>
                            <div style="font-weight:700; color:var(--color-primary); font-size:15px;">₹${group.emiTotal.toLocaleString('en-IN')}</div>
                        </div>
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">Total Received by Auto Debit</span>
                            <div style="font-weight:700; color:var(--color-success); font-size:15px;">₹${group.autoDebitTotal.toLocaleString('en-IN')}</div>
                        </div>
                        <div style="background:white; padding:12px; border-radius:8px; flex:1; border:1px solid var(--color-border);">
                            <span style="font-size:11px; color:var(--color-text-light);">Total Received by PG Gateway</span>
                            <div style="font-weight:700; color:var(--color-warning); font-size:15px;">₹${group.pgTotal.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        index++;
    });

    if (tbody.innerHTML === '') {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--color-text-light);">No transactions found</td></tr>`;
    }
}

function populateApiTable() {
    const tbody = document.getElementById('api-gile-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    DB.apiKeys.forEach(row => {
        const statusClass = row.webhookStatus === 'Active' ? 'success' : (row.webhookStatus === 'Inactive' ? 'dormant' : 'pending');
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="table-primary-text">${row.gile}</div>
                    <div class="table-secondary-text">${row.inst} — ${row.location}</div>
                </td>
                <td><span style="font-family:monospace;font-size:12px;">${row.clientId}</span></td>
                <td style="text-align:center;"><span class="badge-status ${statusClass}">${row.webhookStatus}</span></td>
                <td>${row.endpoints} endpoints</td>
                <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick='openWebhookModal(${JSON.stringify(row)})'>Configure</button>
                </td>
            </tr>
        `;
    });
}

function populateNotifications() {
    const list = document.getElementById('notification-list');
    if (!list) return;
    list.innerHTML = '';
    DB.notifications.forEach(n => {
        list.innerHTML += `
            <div class="notification-item">
                <span class="notif-icon" style="font-size:18px;line-height:32px;text-align:center;">${n.icon}</span>
                <div class="notif-details">
                    <div class="notif-message" style="font-weight:600;color:var(--color-text-dark);font-size:13px;">${n.title}</div>
                    <div class="notif-message" style="font-weight:400;color:var(--color-text-muted);font-size:12px;margin-top:2px;">${n.desc}</div>
                    <div class="notif-time">${n.time}</div>
                </div>
            </div>
        `;
    });
}

function populateOnboardingRequestLog() {
    const container = document.getElementById('request-logs-list');
    if (!container) return;
    container.innerHTML = '';
    DB.onboardingRequests.forEach(req => {
        let badgeClass = 'pending';
        if (req.status === 'Completed') {
            badgeClass = 'success';
        } else if (req.status === 'Configuring') {
            badgeClass = 'pending';
        }
        container.innerHTML += `
            <div class="pipeline-item" style="padding: 14px 0; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div class="pipeline-info-details">
                    <div class="pipeline-title" style="font-weight: 600; color: var(--color-text-dark);">${req.name}</div>
                    <div class="pipeline-sub" style="font-size: 11px; color: var(--color-text-light); margin-top: 2px;">${req.gile} &bull; ${req.date}</div>
                </div>
                <span class="badge-status ${badgeClass}" style="font-size: 11px; padding: 4px 8px; border-radius: 4px;">${req.status}</span>
            </div>
        `;
    });
}

function populateSupportGileSelect() {
    const sel = document.getElementById('sup-gile');
    if (!sel) return;
    sel.innerHTML = '<option value="">All / Not Institute-Specific</option>';
    DB.institutes.forEach(inst => {
        sel.innerHTML += `<option value="${inst.gile}">${inst.name} — ${inst.gile}</option>`;
    });
}

function populateSupportTickets() {
    const list = document.getElementById('support-tickets-list');
    if (!list) return;
    const tickets = [
        { id: 'TKT-4421', category: 'Settlement Delay', subject: 'STL-99127 not credited after 3 days', status: 'Open', date: '20 Jun 2024', priority: 'High' },
        { id: 'TKT-4389', category: 'API Integration', subject: 'Webhook not firing on payment success', status: 'In Progress', date: '18 Jun 2024', priority: 'Medium' },
        { id: 'TKT-4310', category: 'Onboarding Issue', subject: 'Symbiosis SIT GILE stuck in verification', status: 'Resolved', date: '12 Jun 2024', priority: 'Low' }
    ];
    list.innerHTML = '';
    tickets.forEach(t => {
        const statusClass = t.status === 'Resolved' ? 'success' : (t.status === 'Open' ? 'failed' : 'pending');
        list.innerHTML += `
            <div class="ticket-item">
                <div class="ticket-header">
                    <div>
                        <span class="ticket-id">${t.id}</span>
                        <span class="ticket-category">${t.category}</span>
                    </div>
                    <span class="badge-status ${statusClass}">${t.status}</span>
                </div>
                <div class="ticket-subject">${t.subject}</div>
                <div class="ticket-meta">${t.date} &bull; Priority: <strong>${t.priority}</strong></div>
            </div>
        `;
    });
}

// ================= FULL PAGE DRILLDOWN =================
function openInstituteDrilldown(instId) {
    const inst = DB.institutes.find(i => i.id === instId);
    if (!inst) return;

    // Populate Details
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };

    set('dr-inst-name', inst.name);
    set('dr-gile-string', inst.gile + ' • ' + inst.location);
    set('dr-penetration-rate', inst.penetrationRate + '%');
    set('dr-total-students', formatNumber(inst.studentsCount));
    set('dr-onboard-date', inst.onboardDate);
    set('dr-total-tx-count', formatNumber(inst.transactions));
    set('dr-total-gmv', formatCurrency(inst.gmv));
    set('dr-commission-earned', formatCurrency(inst.gmv * 0.02));
    set('dr-total-settled', formatCurrency(inst.gmv * 0.92));

    // Status badge
    const statusContainer = document.getElementById('dr-gile-badge-status-container');
    if (statusContainer) {
        statusContainer.innerHTML = `<span class="badge-status ${inst.status === 'active' ? 'active' : 'dormant'}" style="margin-right:8px;">${inst.status}</span>`;
    }

    // Payment Mode Splits
    const modeSplits = document.getElementById('dr-mode-splits-container');
    if (modeSplits) {
        modeSplits.innerHTML = `
            <div class="drawer-mini-card"><div class="drawer-mini-label">EMI</div><div class="drawer-mini-value">${inst.rates.emi}%</div></div>
            <div class="drawer-mini-card"><div class="drawer-mini-label">PG</div><div class="drawer-mini-value">${inst.rates.pg}%</div></div>
            <div class="drawer-mini-card"><div class="drawer-mini-label">Mandate</div><div class="drawer-mini-value">${inst.rates.mandate}%</div></div>
        `;
    }

    // Gateways
    const gatewaysDiv = document.getElementById('dr-enabled-gateways');
    if (gatewaysDiv) {
        gatewaysDiv.innerHTML = '';
        inst.gateways.forEach(g => {
            gatewaysDiv.innerHTML += `<div class="gateway-pill">${g}</div>`;
        });
    }

    // Contact info
    set('dr-contact-name', inst.contact.name);
    set('dr-contact-role', 'Finance Lead');
    set('dr-contact-initial', inst.contact.name.charAt(0));
    const emailEl = document.getElementById('dr-contact-email');
    if (emailEl) emailEl.innerText = inst.contact.email;
    const phoneEl = document.getElementById('dr-contact-phone');
    if (phoneEl) phoneEl.innerText = inst.contact.phone;

    // Recent Transactions
    const drTxBody = document.getElementById('dr-recent-tx-body');
    if (drTxBody) {
        drTxBody.innerHTML = '';
        const txs = inst.recentTransactions.length > 0 ? inst.recentTransactions : [{ id: '—', date: '—', amount: '—', method: '—', status: 'N/A' }];
        txs.forEach(t => {
            const badge = t.status === 'Success' ? 'success' : 'pending';
            drTxBody.innerHTML += `
                <tr>
                    <td style="padding-left:20px;"><div class="table-primary-text">${t.id}</div><div class="table-secondary-text">${t.date}</div></td>
                    <td>${t.method}</td>
                    <td class="text-right" style="padding-right:20px;">${typeof t.amount === 'number' ? formatCurrency(t.amount) : t.amount}</td>
                    <td><span class="badge-status ${badge}">${t.status}</span></td>
                </tr>
            `;
        });
    }

    // Top Students
    const drStudents = document.getElementById('dr-top-students-body');
    if (drStudents) {
        drStudents.innerHTML = '';
        const students = inst.topStudents?.length > 0 ? inst.topStudents : [{ name: 'No data yet', course: '—', fee: '—' }];
        students.forEach(s => {
            drStudents.innerHTML += `
                <tr>
                    <td style="padding-left:20px;"><div class="table-primary-text">${s.name}</div></td>
                    <td>${s.course}</td>
                    <td class="text-right" style="padding-right:20px;">${s.fee}</td>
                </tr>
            `;
        });
    }

    // Fee Headers table
    const feeBody = document.getElementById('dr-fee-headers-body');
    if (feeBody) {
        feeBody.innerHTML = `
            <tr><td style="padding-left:20px;">Academic Tuition Fee</td><td>EMI</td><td class="text-right" style="padding-right:20px;">Active</td></tr>
            <tr><td style="padding-left:20px;">Hostel Fee</td><td>Mandate</td><td class="text-right" style="padding-right:20px;">Active</td></tr>
            <tr><td style="padding-left:20px;">Admission Fee</td><td>PG</td><td class="text-right" style="padding-right:20px;">Active</td></tr>
        `;
    }

    // Student Lifecycle
    const lifecycle = document.getElementById('dr-student-lifecycle-list');
    if (lifecycle) {
        lifecycle.innerHTML = `
            <div class="timeline-item"><div class="timeline-dot success"></div><div class="timeline-content"><div class="timeline-title">Application Received</div><div class="timeline-sub">18 Jun 2024 • 24 students</div></div></div>
            <div class="timeline-item"><div class="timeline-dot success"></div><div class="timeline-content"><div class="timeline-title">KYC Verified</div><div class="timeline-sub">19 Jun 2024 • 22 students</div></div></div>
            <div class="timeline-item"><div class="timeline-dot active"></div><div class="timeline-content"><div class="timeline-title">Payment Link Sent</div><div class="timeline-sub">20 Jun 2024 • 20 students</div></div></div>
            <div class="timeline-item"><div class="timeline-dot pending"></div><div class="timeline-content"><div class="timeline-title">First EMI Collected</div><div class="timeline-sub">Pending • 18 students</div></div></div>
        `;
    }

    // Switch to full page drilldown tab
    switchTab('inst-drilldown-tab');
}

function closeInstituteDrilldown() {
    switchTab('inst-details');
}

// ================= FILTER LOGIC =================
function filterInstituteTable() {
    const search = (document.getElementById('inst-list-search')?.value || '').toLowerCase();
    const statusVal = document.getElementById('inst-status-filter')?.value || 'all';
    const tbody = document.getElementById('institutes-table-body');
    if (!tbody) return;

    tbody.querySelectorAll('tr').forEach(row => {
        const text = row.innerText.toLowerCase();
        const hasStatus = statusVal === 'all' || text.includes(statusVal);
        const hasSearch = !search || text.includes(search);
        row.style.display = hasSearch && hasStatus ? '' : 'none';
    });
}

function filterTransactions() {
    populateTransactions();
}

function filterTableRows(tbodyId, query, columns) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const q = query.toLowerCase();
    tbody.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = !q || columns.some(i => cells[i]?.innerText.toLowerCase().includes(q));
        row.style.display = match ? '' : 'none';
    });
}

// ================= CHARTS =================
function initOverviewCharts() {
    if (!window.Chart) return;
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = "#94a3b8";

    // Monthly GMV Bar Chart
    const ctxBar = document.getElementById('monthlyGmvChart');
    if (ctxBar) {
        charts.gmvBar = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'EMI', data: [12, 19, 15, 22, 28, 35], backgroundColor: '#6366f1', borderRadius: 4 },
                    { label: 'PG', data: [8, 12, 10, 15, 18, 22], backgroundColor: '#10b981', borderRadius: 4 },
                    { label: 'e-Mandate', data: [4, 6, 8, 10, 12, 15], backgroundColor: '#f59e0b', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } } },
                scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, border: { display: false }, grid: { color: '#f1f5f9' } }
                }
            }
        });
    }

    // Payment Mode Donut Chart
    const ctxDonut = document.getElementById('paymentModeDonutChart');
    if (ctxDonut) {
        charts.paymentMode = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['EMI', 'Payment Gateway', 'e-Mandate'],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                cutout: '75%',
                plugins: { legend: { display: false } }
            }
        });
    }
}

function renderCommissionsChart() {
    if (!window.Chart || charts.commissionsLine) return;
    const ctx = document.getElementById('commissionsLineChart');
    if (!ctx) return;
    charts.commissionsLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Commission Earned (₹ Lakhs)',
                data: [4.2, 5.1, 4.8, 6.2, 7.5, 8.9],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { display: false } }, y: { border: { display: false } } }
        }
    });
}

function renderSettlementsChart() {
    if (!window.Chart || charts.settlementsBar) return;
    const ctx = document.getElementById('settlementsBarChart');
    if (!ctx) return;
    charts.settlementsBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['16 Jun', '17 Jun', '18 Jun', '19 Jun', '20 Jun', '21 Jun'],
            datasets: [{
                label: 'Settled Amount (₹ Lakhs)',
                data: [12.5, 15.2, 10.8, 22.1, 8.2, 14.5],
                backgroundColor: '#6366f1',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { display: false } }, y: { border: { display: false } } }
        }
    });
}

function renderTransactionsChart() {
    if (!window.Chart || charts.transactionsLine) return;
    const ctx = document.getElementById('txBellCurveChart');
    if (!ctx) return;
    charts.transactionsLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
            datasets: [{
                label: 'Txn Volume',
                data: [120, 150, 320, 410, 280, 190, 210],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { display: false } }, y: { border: { display: false } } }
        }
    });

    // Also init the TX mode chart
    const ctxMode = document.getElementById('txModeChart');
    if (ctxMode && !charts.txMode) {
        charts.txMode = new Chart(ctxMode, {
            type: 'doughnut',
            data: {
                labels: ['EMI', 'UPI/Net Banking', 'Credit Card'],
                datasets: [{
                    data: [48, 32, 20],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                cutout: '65%',
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } }
            }
        });
    }
}

// ================= MODALS & UTILS =================
function openWebhookModal(rowData) {
    currentWebhookData = typeof rowData === 'string' ? JSON.parse(rowData) : rowData;
    const overlay = document.getElementById('webhook-modal-overlay');
    const modal = document.getElementById('webhook-modal');
    if (overlay) overlay.classList.add('show');
    if (modal) modal.classList.add('show');

    // Populate modal with row data
    if (currentWebhookData) {
        const nameEl = document.getElementById('webhook-modal-gile-name');
        if (nameEl) nameEl.innerText = currentWebhookData.inst + ' — ' + currentWebhookData.gile;
        const clientIdEl = document.getElementById('modal-client-id');
        if (clientIdEl) clientIdEl.value = currentWebhookData.clientId;
        const secretEl = document.getElementById('modal-client-secret');
        if (secretEl) { secretEl.type = 'password'; secretEl.value = '••••••••••••••••••••••••••••••••'; }
        const btnReveal = document.getElementById('btn-reveal-secret');
        if (btnReveal) btnReveal.textContent = 'Reveal';
    }
}

function closeWebhookModal() {
    const overlay = document.getElementById('webhook-modal-overlay');
    const modal = document.getElementById('webhook-modal');
    if (overlay) overlay.classList.remove('show');
    if (modal) modal.classList.remove('show');
    currentWebhookData = null;
}

// ================= CSV EXPORT =================
function exportTableToCSV(tbodyId, filename) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) { showToast('⚠️ No data to export', 'warning'); return; }
    let csv = '';
    tbody.querySelectorAll('tr').forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => '"' + td.innerText.replace(/"/g, '""') + '"');
        csv += cells.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    showToast(`✅ ${filename} downloaded!`);
}

// ================= TOAST NOTIFICATIONS =================
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.style.cssText = `
        background: ${type === 'warning' ? '#f59e0b' : 'var(--color-bg-sidebar)'};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        border-left: 4px solid ${type === 'warning' ? '#fff' : 'var(--color-primary)'};
        max-width: 360px;
        animation: slideInRight 0.3s ease;
        cursor: pointer;
    `;
    toast.textContent = message;
    toast.onclick = () => toast.remove();
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ================= ADMIN PANEL 6-STEP SUPABASE CONFIGURATOR =================
const SUPABASE_URL = 'https://yolzhsonsmesmcswvdsg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej';

async function supabaseFetch(table, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    };
    if (body) options.body = JSON.stringify(body);
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}`, options);
        if (!res.ok) {
            const errText = await res.text();
            console.warn(`Supabase ${table} ${method} notice:`, errText);
        }
        return await res.json();
    } catch (e) {
        console.error(`Supabase error on ${table}:`, e);
        return null;
    }
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let activeConfigReq = null;
let stepData = {
    step1Rows: [],
    step2Rows: [],
    step3Rows: [],
    step4Data: null,
    step5Data: null
};

function initAdminPanel() {
    populateAdminPendingRequests();
    selectAdminRequest('REQ-101');

    const portalSelect = document.getElementById('portal-mode-select');
    if (portalSelect) {
        portalSelect.addEventListener('change', (e) => {
            const mode = e.target.value;
            if (mode === 'admin') {
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                const adminTab = document.getElementById('admin-tab');
                if (adminTab) adminTab.classList.add('active');
                showToast('🔑 Switched to Admin Portal Mode');
            } else {
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                const ovTab = document.getElementById('overview-tab');
                if (ovTab) ovTab.classList.add('active');
                showToast('🌐 Switched to Partner Portal Mode');
            }
        });
    }

    const btnUnlock = document.getElementById('btn-unlock-config');
    if (btnUnlock) {
        btnUnlock.addEventListener('click', async () => {
            const prodId = document.getElementById('admin-product-id').value.trim();
            if (!prodId) {
                showToast('Please enter a valid Product ID or Institute code', 'warning');
                return;
            }
            if (activeConfigReq) {
                activeConfigReq.productId = prodId;
                unlockFields(prodId);
                showToast(`Product unlocked with ID: ${prodId}`);
            }
        });
    }

    const btnAddFeeRow = document.getElementById('btn-add-config-row');
    if (btnAddFeeRow) {
        btnAddFeeRow.addEventListener('click', () => {
            addConfigFeeRow('Payable_fee_PG', 'PG Fee Header');
        });
    }

    // --- STEP 1 FORM ---
    const step1Form = document.getElementById('admin-config-step1-form');
    if (step1Form) {
        step1Form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const groupId = parseInt(document.getElementById('cfg-group-id').value) || 500;
            const instituteId = parseInt(document.getElementById('cfg-institute-id').value) || 684;
            const locationId = parseInt(document.getElementById('cfg-location-id').value) || 16;
            const eduId = parseInt(document.getElementById('cfg-education-id').value) || 486;
            const ayId = document.getElementById('cfg-ay-id').value || '455';
            const gilecId = document.getElementById('cfg-gilec-id').value || '8138';

            stepData.step1Rows = [];
            const rows = document.querySelectorAll('#config-sub-rows-list .config-sub-row');

            for (let r of rows) {
                const name = r.querySelector('.cfg-fee-name').value || 'Payable_fee_PG';
                const label = r.querySelector('.cfg-fee-label').value || name;
                const desc = r.querySelector('.cfg-fee-desc').value || `${label} for institute`;
                const due = r.querySelector('.cfg-fee-duedate').value || '2026-07-01';
                const amt = r.querySelector('.cfg-fee-amount').value || '50000';
                const tax = parseFloat(r.querySelector('.cfg-fee-taxrate').value) || 18.0;

                const record = {
                    "Code": generateUUID(),
                    "Group ID": groupId,
                    "Institute ID": instituteId,
                    "Location ID": locationId,
                    "Education Type ID": eduId,
                    "Ay ID": ayId,
                    "Gilec ID": gilecId,
                    "Name": name,
                    "Label": label,
                    "Description": desc,
                    "Due Date": due,
                    "Default Amount": amt,
                    "Tax Rate": tax,
                    "Erp UID": "ERP-REF-" + Math.floor(Math.random() * 899 + 100),
                    "Variable": "VAR_" + name,
                    "Source": "Portal_Admin",
                    "Is Active": 1,
                    "Created On": new Date().toISOString()
                };
                stepData.step1Rows.push(record);
                await supabaseFetch('Fee type details', 'POST', record);
            }

            showToast(`Step 1 Saved ${stepData.step1Rows.length} Rows to Supabase ("Fee type details")!`);
            populateFeeMappingRegistry();
            if (activeConfigReq) {
                populateAuditLog('Configure', activeConfigReq.gile || '8138', `Saved ${stepData.step1Rows.length} fee header rows to Step 1`);
            }
            switchAdminWizardStep(1, 2);
            populateStep2View();
        });
    }

    // --- STEP 2 FORM ---
    const step2Form = document.getElementById('admin-config-step2-form');
    if (step2Form) {
        step2Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const row1 = stepData.step1Rows[0] || {};
            const code = document.getElementById('s2-code').value || generateUUID();
            const record = {
                "Code": code,
                "Group ID": parseInt(document.getElementById('s2-group-id').value) || row1["Group ID"] || 500,
                "Institute ID": parseInt(document.getElementById('s2-institute-id').value) || row1["Institute ID"] || 684,
                "Location ID": parseInt(document.getElementById('s2-location-id').value) || row1["Location ID"] || 16,
                "Education Type ID": parseInt(document.getElementById('s2-education-id').value) || row1["Education Type ID"] || 486,
                "Ay ID": parseInt(document.getElementById('s2-ay-id').value) || 455,
                "Gilec ID": parseInt(document.getElementById('s2-gilec-id').value) || 8138,
                "Name": document.getElementById('s2-name').value || row1["Name"] || 'Payable_fee_PG',
                "Label": document.getElementById('s2-label').value || row1["Label"] || 'Payable_fee_PG',
                "Description": document.getElementById('s2-desc').value || 'PG Group Detail',
                "Expression": document.getElementById('s2-expression').value || `#{"label":"${row1.Name || 'Payable_fee_PG'}","value":"${row1.Code || generateUUID()}"}#`,
                "Is Active": parseInt(document.getElementById('s2-isactive').value) || 1,
                "Created On": new Date().toISOString()
            };
            stepData.step2Rows = [record];
            await supabaseFetch('Fee Group Details', 'POST', record);

            showToast('Step 2 Saved to Supabase ("Fee Group Details")!');
            switchAdminWizardStep(2, 3);
            populateStep3View();
        });
    }

    // --- STEP 3 FORM ---
    const step3Form = document.getElementById('admin-config-step3-form');
    if (step3Form) {
        step3Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const row1 = stepData.step1Rows[0] || {};
            const record = {
                "Code": document.getElementById('s3-code').value || generateUUID(),
                "Group ID": parseInt(document.getElementById('s3-group-id').value) || row1["Group ID"] || 500,
                "Institute ID": parseInt(document.getElementById('s3-institute-id').value) || row1["Institute ID"] || 684,
                "Location ID": parseInt(document.getElementById('s3-location-id').value) || row1["Location ID"] || 16,
                "Education Type ID": parseInt(document.getElementById('s3-education-id').value) || row1["Education Type ID"] || 486,
                "Class ID": parseInt(document.getElementById('s3-class-id').value) || 1,
                "Fee Type ID": parseInt(document.getElementById('s3-feetype-id').value) || 1,
                "Type": document.getElementById('s3-type').value || 'Payable_fee',
                "Is Active": parseInt(document.getElementById('s3-isactive').value) || 1,
                "Created On": new Date().toISOString()
            };
            stepData.step3Rows = [record];
            await supabaseFetch('Financing details', 'POST', record);

            showToast('Step 3 Saved to Supabase ("Financing details")!');
            switchAdminWizardStep(3, 4);
            populateStep4View();
        });
    }

    // --- STEP 4 FORM ---
    const step4Form = document.getElementById('admin-config-step4-form');
    if (step4Form) {
        step4Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const row1 = stepData.step1Rows[0] || {};
            const clientRecord = {
                "Code": document.getElementById('s4-code').value || generateUUID(),
                "Group ID": parseInt(document.getElementById('s4-group-id').value) || row1["Group ID"] || 500,
                "Institute ID": parseInt(document.getElementById('s4-institute-id').value) || row1["Institute ID"] || 684,
                "Location ID": parseInt(document.getElementById('s4-location-id').value) || row1["Location ID"] || 16,
                "Education Type ID": parseInt(document.getElementById('s4-education-id').value) || row1["Education Type ID"] || 486,
                "Ay ID": parseInt(document.getElementById('s4-ay-id').value) || 455,
                "Gilec ID": parseInt(document.getElementById('s4-gilec-id').value) || 8138,
                "Client ID": document.getElementById('cfg-client-id').value,
                "Client Secret": document.getElementById('cfg-client-secret').value,
                "Api Key": document.getElementById('cfg-api-key').value,
                "Is Active": 1,
                "Created On": new Date().toISOString()
            };
            stepData.step4Data = await supabaseFetch('Merchant Details Sheet', 'POST', clientRecord);
            showToast('Step 4 Saved to Supabase ("Merchant Details Sheet")!');
            switchAdminWizardStep(4, 5);
            populateStep5View();
        });
    }

    // --- STEP 5 FORM ---
    const step5Form = document.getElementById('admin-config-step5-form');
    if (step5Form) {
        step5Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const whRecord = {
                "Code": document.getElementById('s5-code').value || generateUUID(),
                "Md ID": parseInt(document.getElementById('s5-md-id').value) || 1,
                "Entity": document.getElementById('cfg-wh-entity').value,
                "URL": document.getElementById('cfg-wh-url').value,
                "Version": parseInt(document.getElementById('cfg-wh-version').value) || 2,
                "Secret": document.getElementById('cfg-wh-secret').value || generateUUID().substring(0, 16),
                "Is Active": parseInt(document.getElementById('s5-isactive').value) || 1,
                "Created On": new Date().toISOString()
            };
            const res = await supabaseFetch("Webhook's event", 'POST', whRecord);
            stepData.step5Data = res && res[0] ? res[0] : { "ID": 1 };
            showToast('Step 5 Saved to Supabase ("Webhook\'s event")!');
            switchAdminWizardStep(5, 6);
            populateStep6View();
        });
    }

    // --- STEP 6 FORM ---
    const step6Form = document.getElementById('admin-config-step6-form');
    if (step6Form) {
        step6Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mdWdId = parseInt(document.getElementById('s6-md-wd-id').value) || 1;
            const checkedEvents = document.querySelectorAll('.cfg-event-check:checked');

            for (let chk of checkedEvents) {
                const evtRecord = {
                    "Code": generateUUID(),
                    "Md Wd ID": mdWdId,
                    "Event": chk.value,
                    "Is Active": 1,
                    "Created On": new Date().toISOString()
                };
                await supabaseFetch('Events Sheet', 'POST', evtRecord);
            }

            if (activeConfigReq) {
                activeConfigReq.status = 'Completed';
                activeConfigReq.updatedOn = new Date().toLocaleString();
                DB.apiKeys.push({
                    gile: activeConfigReq.gile,
                    inst: activeConfigReq.name,
                    location: activeConfigReq.location,
                    clientId: document.getElementById('cfg-client-id').value,
                    webhookStatus: 'Active',
                    endpoints: checkedEvents.length
                });
            }

            populateApiTable();
            populateOnboardingRequestLog();
            populateAdminPendingRequests();
            populateFeeMappingRegistry();
            if (activeConfigReq) {
                populateAuditLog('Complete', activeConfigReq.gile || '8138', '6-Step Onboarding Setup Completed');
            }

            showToast(`🎉 6-Step Onboarding Setup Complete! All records committed to live Supabase tables!`);
            resetAdminConfigurator();
        });
    }

    // Back buttons
    document.getElementById('btn-back-to-step1')?.addEventListener('click', () => switchAdminWizardStep(2, 1));
    document.getElementById('btn-back-to-step2')?.addEventListener('click', () => switchAdminWizardStep(3, 2));
    document.getElementById('btn-back-to-step3')?.addEventListener('click', () => switchAdminWizardStep(4, 3));
    document.getElementById('btn-back-to-step4')?.addEventListener('click', () => switchAdminWizardStep(5, 4));
    document.getElementById('btn-back-to-step5')?.addEventListener('click', () => switchAdminWizardStep(6, 5));
}

function switchAdminWizardStep(fromStep, toStep) {
    document.getElementById(`step-indicator-${fromStep}`).classList.remove('active');
    if (toStep > fromStep) {
        document.getElementById(`step-indicator-${fromStep}`).classList.add('completed');
    } else {
        document.getElementById(`step-indicator-${toStep}`).classList.remove('completed');
    }
    document.getElementById(`step-indicator-${toStep}`).classList.add('active');

    document.getElementById(`admin-step${fromStep}-panel`).style.display = 'none';
    document.getElementById(`admin-step${toStep}-panel`).style.display = '';
}

function generateRowUUID(label) {
    const cleanLabel = (label || 'fee').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `${cleanLabel}_${generateUUID().substring(0, 8)}`;
}

function populateStep2View() {
    const list = document.getElementById('step2-rows-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Joined expressions format: #{"label":"...","value":"..."}#+#{"label":"...","value":"..."}#
    const multiExpr = stepData.step1Rows.map(r => `#{"label":"${r.Name}","value":"${r.Code || generateUUID()}"}#`).join('+');
    document.getElementById('s2-expression').value = multiExpr;

    let autoIdCounter = 201;
    stepData.step1Rows.forEach((row, idx) => {
        ['Semester 1', 'Semester 2'].forEach(sem => {
            const autoId = autoIdCounter++;
            const autoCode = generateRowUUID(row.Name);
            const div = document.createElement('div');
            div.style.cssText = 'background:#f8fafc; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid var(--color-border);';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="font-weight:700; color:var(--color-text-dark);">${row.Name} — ${sem}</span>
                    <span class="badge-status success" style="font-size:10px;">Sequential ID: ${autoId}</span>
                </div>
                <div style="font-size:11px; font-family:monospace; color:var(--color-text-muted);">Per-Row Code: ${autoCode}</div>
                <div style="font-size:11px; font-family:monospace; color:var(--color-primary); margin-top:4px; font-weight:600;">Expression: #{"label":"${row.Name}","value":"${row.Code}"}#</div>
            `;
            list.appendChild(div);
            populateAuditLog('Configure', row['Gilec ID'] || '8138', `Created Step 2 Fee Group row for ${sem}`);
        });
    });
}

function populateFeeMappingRegistry() {
    const tbody = document.getElementById('fee-mapping-registry-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    stepData.step1Rows.forEach(row => {
        tbody.innerHTML += `
            <tr>
                <td style="padding-left:16px;"><strong>${row['Gilec ID'] || '8138'}</strong></td>
                <td>${row.Name}</td>
                <td>${row.Label}</td>
                <td><span style="font-family:monospace;">${row.Code}</span></td>
                <td>${row['Group ID'] || 500}</td>
                <td>${row['Institute ID'] || 684}</td>
                <td style="text-align:right; padding-right:16px; font-weight:700; color:var(--color-success);">₹${Number(row['Default Amount'] || 50000).toLocaleString('en-IN')}</td>
            </tr>
        `;
    });
}

function populateAuditLog(action, gile, notes) {
    const tbody = document.getElementById('admin-audit-log-tbody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    const time = new Date().toLocaleString();
    tr.innerHTML = `
        <td style="padding-left:16px;">${time}</td>
        <td><span class="badge-status success" style="font-size:10px;">${action}</span></td>
        <td><strong>GILE-${gile}</strong></td>
        <td>${notes}</td>
    `;
    tbody.prepend(tr);
}

function addAuditLogRow(table, id, code, entity, event) {
    const tbody = document.getElementById('excel-audit-tbody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    const time = new Date().toLocaleTimeString();
    tr.innerHTML = `
        <td>${time}</td>
        <td><code>${table}</code></td>
        <td>${id}</td>
        <td><span style="font-family:monospace;">${code.substring(0, 18)}...</span></td>
        <td>${entity}</td>
        <td><span class="badge-status success" style="font-size:10px;">${event}</span></td>
    `;
    tbody.prepend(tr);
}

function exportExcelAuditLog() {
    showToast('📊 Exporting Excel Spreadsheet (.CSV) for Onboarding Audit Sheet...');
}

window.generateRowUUID = generateRowUUID;
window.populateFeeMappingRegistry = populateFeeMappingRegistry;
window.populateAuditLog = populateAuditLog;
window.addAuditLogRow = addAuditLogRow;
window.exportExcelAuditLog = exportExcelAuditLog;

function populateStep4View() {
    document.getElementById('cfg-client-id').value = 'GQ-' + generateUUID();
    document.getElementById('cfg-client-secret').value = generateUUID();
    document.getElementById('cfg-api-key').value = generateUUID();
}

function resetAdminConfigurator() {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`step-indicator-${i}`)?.classList.remove('active', 'completed');
        document.getElementById(`admin-step${i}-panel`).style.display = i === 1 ? '' : 'none';
    }
    document.getElementById('step-indicator-1')?.classList.add('active');
    document.getElementById('admin-fields-form-block')?.classList.add('locked');
    document.getElementById('admin-unlock-section').style.display = 'none';
    activeConfigReq = null;
}

function populateAdminPendingRequests() {
    const tbody = document.getElementById('admin-pending-requests-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    DB.onboardingRequests.forEach(req => {
        const isComp = req.status === 'Completed';
        const actionHtml = isComp ? 
            `<span style="color:var(--color-success); font-weight:600;">✓ Completed</span>` :
            `<button class="btn-admin-action" onclick="selectAdminRequest('${req.id}')">Configure</button>`;

        tbody.innerHTML += `
            <tr>
                <td style="padding-left:16px;">
                    <div class="table-primary-text" style="font-weight:600;">${req.name}</div>
                    <div class="table-secondary-text" style="font-size:11px;">${req.gile}</div>
                </td>
                <td><span class="badge-status ${isComp ? 'success' : 'pending'}" style="font-size:10px;">${req.status}</span></td>
                <td style="text-align:right; padding-right:16px;">${actionHtml}</td>
            </tr>
        `;
    });
}

function selectAdminRequest(reqId) {
    activeConfigReq = DB.onboardingRequests.find(r => r.id === reqId);
    if (!activeConfigReq) return;

    const unlockSec = document.getElementById('admin-unlock-section');
    unlockSec.style.display = '';
    document.getElementById('unlock-card-title').textContent = `Unlock Setup — ${activeConfigReq.name}`;
    document.getElementById('admin-product-id').value = activeConfigReq.productId || '500';

    if (activeConfigReq.productId) {
        unlockFields(activeConfigReq.productId);
    }
}

function unlockFields(productId) {
    if (!activeConfigReq) return;
    const block = document.getElementById('admin-fields-form-block');
    block.classList.remove('locked');

    document.getElementById('cfg-group-id').value = 500;
    document.getElementById('cfg-institute-id').value = 684;
    document.getElementById('cfg-location-id').value = 16;
    document.getElementById('cfg-education-id').value = 486;
    document.getElementById('cfg-ay-id').value = '455';
    document.getElementById('cfg-gilec-id').value = '8138';

    const list = document.getElementById('config-sub-rows-list');
    list.innerHTML = '';
    addConfigFeeRow('Payable_fee_Auto_Debit', 'Payable_fee_Auto_Debit');
    addConfigFeeRow('Payable_fee_PG', 'Payable_fee_PG');
    addConfigFeeRow('Payable_fee_EMI', 'Payable_fee_EMI');
    addConfigFeeRow('School Fee', 'School Fee');

    stepData.step1Rows = [
        { Name: 'Payable_fee_Auto_Debit', Label: 'Payable_fee_Auto_Debit', Code: generateUUID(), "Group ID": 500, "Institute ID": 684, "Gilec ID": 8138, "Default Amount": 45000 },
        { Name: 'Payable_fee_PG', Label: 'Payable_fee_PG', Code: generateUUID(), "Group ID": 500, "Institute ID": 684, "Gilec ID": 8138, "Default Amount": 35000 },
        { Name: 'Payable_fee_EMI', Label: 'Payable_fee_EMI', Code: generateUUID(), "Group ID": 500, "Institute ID": 684, "Gilec ID": 8138, "Default Amount": 55000 },
        { Name: 'School Fee', Label: 'School Fee', Code: generateUUID(), "Group ID": 500, "Institute ID": 684, "Gilec ID": 8138, "Default Amount": 60000 }
    ];
    populateFeeMappingRegistry();
    populateAuditLog('Unlock', activeConfigReq.gile || '8138', 'Unlocked configuration setup');
}

function addConfigFeeRow(name = 'Payable_fee_PG', label = 'Payable_fee_PG') {
    const list = document.getElementById('config-sub-rows-list');
    if (!list) return;

    const div = document.createElement('div');
    div.className = 'config-sub-row';
    div.style.cssText = 'background: white; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border); position: relative;';
    div.innerHTML = `
        <button type="button" class="btn-remove-row" onclick="this.closest('.config-sub-row').remove()" style="position: absolute; top: 8px; right: 8px; border:none; background:rgba(239,68,68,0.1); color:#ef4444; padding:2px 8px; border-radius:4px; cursor:pointer; font-weight:700;">×</button>
        <div class="form-row">
            <div class="form-group"><label>Name *</label><input type="text" class="cfg-fee-name" value="${name}" required></div>
            <div class="form-group"><label>Label *</label><input type="text" class="cfg-fee-label" value="${label}" required></div>
            <div class="form-group"><label>Description</label><input type="text" class="cfg-fee-desc" value="${label} for institute"></div>
        </div>
        <div class="form-row" style="margin-top: 8px;">
            <div class="form-group"><label>Due Date</label><input type="date" class="cfg-fee-duedate" value="2026-07-01"></div>
            <div class="form-group"><label>Default Amount</label><input type="text" class="cfg-fee-amount" value="50000"></div>
            <div class="form-group"><label>Tax Rate (%)</label><input type="number" step="0.1" class="cfg-fee-taxrate" value="18.0"></div>
        </div>
    `;
    list.appendChild(div);
}

function switchAdminModule(mod) {
    document.querySelectorAll('.admin-subnav-bar button').forEach(btn => {
        btn.className = 'btn btn-secondary btn-sm';
    });
    const activeBtn = document.getElementById(`admin-mod-btn-${mod}`);
    if (activeBtn) activeBtn.className = 'btn btn-primary btn-sm';

    if (mod === 'configurator') {
        document.getElementById('admin-flow-steps').style.display = '';
        document.querySelector('#admin-tab .grid-3-col').style.display = '';
    } else if (mod === 'institutes') {
        switchTab('institutes');
        showToast('🏫 Switched to Active Institutes Directory');
    } else if (mod === 'webhooks') {
        switchTab('inst-api');
        showToast('🔑 Switched to API & Webhook Management');
    } else if (mod === 'support') {
        switchTab('support');
        showToast('🎧 Switched to Support Desk');
    }
}

window.switchAdminModule = switchAdminModule;
window.selectAdminRequest = selectAdminRequest;
window.toggleGroupRow = toggleGroupRow;
window.redirectToFms = redirectToFms;
window.switchTab = switchTab;
window.populateInstituteTable = populateInstituteTable;


