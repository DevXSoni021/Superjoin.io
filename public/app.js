// API Base URL
const API_BASE = window.location.origin;
let autoRefreshInterval = null;
let lastDataHash = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
    loadSheetInfo();
    fetchData();
    startAutoRefresh();
});

function initializeDashboard() {
    addLog('Dashboard initialized', 'info');
    updateStatus('connecting');
}

function setupEventListeners() {
    // Forms
    document.getElementById('add-data-form').addEventListener('submit', handleAddData);
    document.getElementById('delete-data-form').addEventListener('submit', handleDeleteData);
    
    // Buttons
    document.getElementById('refresh-btn').addEventListener('click', fetchData);
    document.getElementById('clear-log-btn').addEventListener('click', clearLog);
    
    // Auto-refresh toggle
    document.getElementById('auto-refresh').addEventListener('change', (e) => {
        if (e.target.checked) {
            startAutoRefresh();
        } else {
            stopAutoRefresh();
        }
    });
}

async function loadSheetInfo() {
    try {
        const response = await fetch(`${API_BASE}/api/dashboard/sheet-info`);
        const data = await response.json();
        
        if (data.sheetId) {
            document.getElementById('sheet-id-display').textContent = data.sheetId;
            document.getElementById('sheet-link').href = `https://docs.google.com/spreadsheets/d/${data.sheetId}/edit`;
        }
    } catch (error) {
        console.error('Error loading sheet info:', error);
    }
}

async function fetchData() {
    try {
        const response = await fetch(`${API_BASE}/api/dashboard/products`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        updateStatus('online');
        displayData(data);
        updateLastUpdate();
        updateTotalRecords(data.length);
        
        // Check for changes
        const currentHash = JSON.stringify(data);
        if (currentHash !== lastDataHash && lastDataHash !== '') {
            addLog('Data updated!', 'success');
        }
        lastDataHash = currentHash;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        updateStatus('offline');
        addLog(`Error: ${error.message}`, 'error');
        displayError('Failed to load data. Please check your connection.');
    }
}

function displayData(data) {
    const container = document.getElementById('data-container');
    
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No data synced yet</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #999;">
                    Add data using the form above or edit your Google Sheet
                </p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.map(item => `
        <div class="data-item">
            <div class="data-item-header">
                <span class="data-item-id">ID: ${item.id}</span>
                <span class="data-item-meta">Row ${item.row_num} • ${item.sheet_name}</span>
            </div>
            <div class="data-item-meta" style="margin-bottom: 10px;">
                Source: ${item.source || 'Unknown'} • 
                Updated: ${new Date(item.timestamp).toLocaleString()}
            </div>
            <div class="data-item-content">
                <strong>Data:</strong>
                <div style="margin-top: 8px;">
                    ${Array.isArray(item.row_data) 
                        ? item.row_data.map((cell, idx) => 
                            `<span style="display: inline-block; padding: 4px 8px; margin: 2px; background: #e5e7eb; border-radius: 4px;">${cell || '(empty)'}</span>`
                          ).join('')
                        : JSON.stringify(item.row_data)
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function displayError(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <p>${message}</p>
        </div>
    `;
}

async function handleAddData(e) {
    e.preventDefault();
    
    const sheetName = document.getElementById('sheet-name').value;
    const rowNum = parseInt(document.getElementById('row-num').value);
    const rowDataStr = document.getElementById('row-data').value;
    
    // Parse comma-separated values
    const rowData = rowDataStr.split(',').map(val => val.trim());
    
    try {
        addLog(`Adding data to ${sheetName}, row ${rowNum}...`, 'info');
        
        const response = await fetch(`${API_BASE}/api/test/add-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheetName,
                row: rowNum,
                rowData
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            addLog(`✅ Data added successfully!`, 'success');
            document.getElementById('add-data-form').reset();
            document.getElementById('sheet-name').value = sheetName; // Keep sheet name
            setTimeout(fetchData, 500); // Refresh data
        } else {
            throw new Error(result.error || 'Failed to add data');
        }
    } catch (error) {
        addLog(`❌ Error: ${error.message}`, 'error');
    }
}

async function handleDeleteData(e) {
    e.preventDefault();
    
    const sheetName = document.getElementById('delete-sheet-name').value;
    const rowNum = parseInt(document.getElementById('delete-row-num').value);
    
    if (!confirm(`Are you sure you want to delete row ${rowNum} from ${sheetName}?`)) {
        return;
    }
    
    try {
        addLog(`Deleting row ${rowNum} from ${sheetName}...`, 'info');
        
        const response = await fetch(`${API_BASE}/api/test/delete-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheetName,
                row: rowNum
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            addLog(`✅ Row deleted successfully!`, 'success');
            document.getElementById('delete-data-form').reset();
            document.getElementById('delete-sheet-name').value = sheetName; // Keep sheet name
            setTimeout(fetchData, 500); // Refresh data
        } else {
            throw new Error(result.error || 'Failed to delete data');
        }
    } catch (error) {
        addLog(`❌ Error: ${error.message}`, 'error');
    }
}

function updateStatus(status) {
    const statusEl = document.getElementById('db-status');
    statusEl.className = `status-badge ${status}`;
    
    const statusText = {
        'online': 'Connected',
        'offline': 'Disconnected',
        'connecting': 'Connecting...'
    };
    
    statusEl.textContent = statusText[status] || status;
}

function updateLastUpdate() {
    document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
}

function updateTotalRecords(count) {
    document.getElementById('total-records').textContent = count;
}

function addLog(message, type = 'info') {
    const logContainer = document.getElementById('activity-log');
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `<span class="log-time">[${time}]</span>${message}`;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 50 entries
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

function clearLog() {
    document.getElementById('activity-log').innerHTML = '';
    addLog('Log cleared', 'info');
}

function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        if (document.getElementById('auto-refresh').checked) {
            fetchData();
        }
    }, 5000); // Refresh every 5 seconds
    
    addLog('Auto-refresh enabled (5s interval)', 'info');
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    addLog('Auto-refresh disabled', 'info');
}
