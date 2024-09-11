// DOMContentLoaded ensures the DOM is fully loaded before running the scripts
document.addEventListener('DOMContentLoaded', () => {
    // Element references for navigation and sections
    const homeNav = document.getElementById('homeNav');
    const medicalDataNav = document.getElementById('medicalDataNav');
    const medicalLogsNav = document.getElementById('medicalLogsNav');
    const profileNav = document.getElementById('profileNav');
    const homeSection = document.getElementById('homeSection');
    const medicalDataSection = document.getElementById('medicalDataSection');
    const medicalLogsSection = document.getElementById('medicalLogsSection');
    const personalDetailsSection = document.getElementById('personalDetailsSection');
    const searchBar = document.getElementById('searchBar');
    const medicalDataContainer = document.getElementById('medicalDataContainer');
    const medicalLogsContainer = document.getElementById('medicalLogsContainer');
    // Sample data for medical logs and medical data
    const logs = [
        { date: '2024-09-01', user: 'Dr. Doe', action: 'Viewed data' },
        { date: '2024-09-03', hospital: 'Health Clinic', action: 'Updated data' }
    ];

    const medicalData = [
        {
            hospital: 'City Hospital',
            diagnosis: 'Pneumonia',
            physician: 'Dr. John Doe',
            date: '2024-08-15',
            regNo: 'CH1234',
            place: 'City Center',
            history: 'Patient presented with fever and cough for 3 days.',
            treatment: 'Antibiotics and respiratory support',
            surgery: {
                type: null,
                duration: null,
                outcome: null,
            },
            hospitalized: {
                duration: '2 weeks',
                reason: 'Severe pneumonia',
                ward: 'Ward 5',
                bedNo: 'B12',
            },
            prescription: 'Amoxicillin, 500mg for 7 days',
            bills: 'Hospital bill - $5000',
            labResults: 'Blood test, X-ray results showing lung infection',
        },
        {
            hospital: 'Central Clinic',
            diagnosis: 'Appendicitis',
            physician: 'Dr. Jane Smith',
            date: '2024-07-10',
            regNo: 'CC5678',
            place: 'Main Street',
            history: 'Severe abdominal pain for 2 days.',
            treatment: 'Surgery to remove appendix',
            surgery: {
                type: 'Appendectomy',
                duration: '2 hours',
                outcome: 'Successful',
            },
            hospitalized: {
                duration: '5 days',
                reason: 'Post-surgery recovery',
                ward: 'Ward 3',
                bedNo: 'A5',
            },
            prescription: 'Painkillers, antibiotics',
            bills: 'Surgery bill - $3000',
            labResults: 'Blood test, Ultrasound showing inflamed appendix',
        }
    ];

    if (!homeSection || !medicalDataSection || !medicalLogsSection || !personalDetailsSection) {
        console.error('One or more sections are missing in the HTML.');
        return;  // Exit the script if the elements are missing
    }

    // Function to highlight active navigation link
    function highlightActiveLink(activeElement) {
        document.querySelector('nav a.active').classList.remove('active');
        activeElement.classList.add('active');
    }

    // Profile redirection event
    profileNav.addEventListener('click', () => {
        homeSection.style.display = 'none';
        medicalDataSection.style.display = 'none';
        medicalLogsSection.style.display = 'none';
        personalDetailsSection.style.display = 'block'; // Show profile section
    });

    // Home navigation event
    homeNav.addEventListener('click', () => {
        homeSection.style.display = 'block';
        medicalLogsSection.style.display = 'none';
        medicalDataSection.style.display = 'none';
        personalDetailsSection.style.display ='none';
        highlightActiveLink(homeNav);
    });

    // Medical logs navigation event
    medicalLogsNav.addEventListener('click', () => {
        homeSection.style.display = 'none';
        medicalLogsSection.style.display = 'block';
        medicalDataSection.style.display = 'none';
        personalDetailsSection.style.display ='none';
        highlightActiveLink(medicalLogsNav);
        loadMedicalLogs();
    });

    // Medical data navigation event
    medicalDataNav.addEventListener('click', () => {
        homeSection.style.display = 'none';
        medicalLogsSection.style.display = 'none';
        medicalDataSection.style.display = 'block';
        personalDetailsSection.style.display ='none';
        highlightActiveLink(medicalDataNav);
        loadMedicalData(medicalData);
    });

    // Search functionality for medical data
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = medicalData.filter(data => 
            data.hospital.toLowerCase().includes(searchTerm) ||
            data.diagnosis.toLowerCase().includes(searchTerm) ||
            data.physician.toLowerCase().includes(searchTerm) ||
            data.date.toLowerCase().includes(searchTerm)
        );
        loadMedicalData(filteredData);
    });

    // Function to load medical logs
    function loadMedicalLogs() {
        medicalLogsContainer.innerHTML = ''; // Clear previous logs
        logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.classList.add('log-item');
            logItem.innerHTML = `
                <p><strong>Date:</strong> ${log.date}</p>
                <p><strong>User:</strong> ${log.user || 'N/A'}</p>
                <p><strong>Hospital:</strong> ${log.hospital || 'N/A'}</p>
                <p><strong>Action:</strong> ${log.action}</p>
            `;
            medicalLogsContainer.appendChild(logItem);
        });

        const allergiesList = document.getElementById('allergiesList');
    allergiesList.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-details')) {
            const details = event.target.closest('.allergy-item').querySelector('.allergy-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        }
    });

    }

    // Function to load medical data
    function loadMedicalData(data) {
        medicalDataContainer.innerHTML = ''; // Clear previous data

        data.forEach((entry, index) => {
            const medicalSummary = document.createElement('div');
            medicalSummary.classList.add('medical-summary');
            medicalSummary.innerHTML = `
                <p><strong>Hospital:</strong> ${entry.hospital}</p>
                <p><strong>Diagnosis:</strong> ${entry.diagnosis}</p>
                <p><strong>Physician:</strong> ${entry.physician}</p>
                <p><strong>Date:</strong> ${entry.date}</p>
                <a class="view-details" id="viewDetails${index}">View Details</a>
                <div class="medical-details" id="medicalDetails${index}" style="display:none;">
                    <p><strong>History of Present Illness:</strong> ${entry.history}</p>
                    <p><strong>Treatment:</strong> ${entry.treatment}</p>
                    <p><strong>Bills:</strong> ${entry.bills}</p>
                    <p><strong>Lab Results:</strong> ${entry.labResults}</p>

                    <!-- Medical History Table -->
                    <h3>Medical History</h3>
                    <table class="medical-history-table">
                        <tr>
                            <th>History of Present Illness</th>
                            <td>${entry.history}</td>
                        </tr>
                        <tr>
                            <th>Treatment Undergone</th>
                            <td>${entry.treatment}</td>
                        </tr>
                        <tr>
                            <th>Physician Name</th>
                            <td>${entry.physician}</td>
                        </tr>
                        <tr>
                            <th>Name of Hospital</th>
                            <td>${entry.hospital}</td>
                        </tr>
                        <tr>
                            <th>Place</th>
                            <td>${entry.place}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>${entry.date}</td>
                        </tr>
                        <tr>
                            <th>Reg No</th>
                            <td>${entry.regNo}</td>
                        </tr>
                    </table>

                    <!-- Hospitalization Details Table -->
                    <h3>Hospitalization Details</h3>
                    <table class="hospitalization-table">
                        <tr>
                            <th>Hospitalized Duration</th>
                            <td>${entry.hospitalized.duration}</td>
                        </tr>
                        <tr>
                            <th>Reason for Hospitalization</th>
                            <td>${entry.hospitalized.reason}</td>
                        </tr>
                        <tr>
                            <th>Ward/Bed No</th>
                            <td>${entry.hospitalized.ward}, ${entry.hospitalized.bedNo}</td>
                        </tr>
                        <tr>
                            <th>Treatment Undergone</th>
                            <td>${entry.treatment}</td>
                        </tr>
                    </table>

                    ${entry.surgery.type ? `
                    <!-- Surgery Details Table -->
                    <h3>Surgery Details</h3>
                    <table class="surgery-table">
                        <tr>
                            <th>Surgery Type</th>
                            <td>${entry.surgery.type}</td>
                        </tr>
                        <tr>
                            <th>Surgery Duration</th>
                            <td>${entry.surgery.duration}</td>
                        </tr>
                        <tr>
                            <th>Surgery Outcome</th>
                            <td>${entry.surgery.outcome}</td>
                        </tr>
                        <tr>
                            <th>Diagnosis for Surgery</th>
                            <td>${entry.diagnosis}</td>
                        </tr>
                        <tr>
                            <th>Bed No</th>
                            <td>${entry.hospitalized.bedNo}</td>
                        </tr>
                    </table>
                    ` : ''}
                    

                    <!-- Documents Upload Section -->
                    <div class="upload-section">
                        <label for="prescriptionUpload${index}">Prescription</label>
                        <div class="file-upload-info">
                            <div class="file-list">
                                <div class="file-item">
                                    <span class="file-name">prescription1_${index}.pdf</span>
                                    <button class="view-file">View</button>
  
                                </div>
                                <div class="file-item">
                                    <span class="file-name">prescription2_${index}.pdf</span>
                                    <button class="view-file">View</button>
                                </div>
                            </div>
                        </div>

                        <label for="labUpload${index}">Lab Results</label>
                        <div class="file-upload-info">
                            <div class="file-list">
                                <div class="file-item">
                                    <span class="file-name">lab_result1_${index}.pdf</span>
                                    <button class="view-file">View</button>

                                </div>
                            </div>
            
                        </div>

                        <label for="attachmentUpload${index}">Attachments</label>
                        <input type="file" id="attachmentUpload${index}" multiple>
                    </div>
                </div>
            `;

            // Toggle details visibility on click
            medicalSummary.querySelector(`#viewDetails${index}`).addEventListener('click', () => {
                const details = document.getElementById(`medicalDetails${index}`);
                details.style.display = details.style.display === 'block' ? 'none' : 'block';
            });

            // Add event listeners for the new buttons
            medicalSummary.querySelectorAll('.view-file').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const fileName = e.target.closest('.file-item').querySelector('.file-name').textContent;
                    console.log(`Viewing ${fileName}`);
                });
            });

            medicalSummary.querySelectorAll('.delete-file').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const fileName = e.target.closest('.file-item').querySelector('.file-name').textContent;
                    console.log(`Deleting ${fileName}`);
                    e.target.closest('.file-item').remove();
                });
            });

            medicalSummary.querySelectorAll('.add-file').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const fileList = e.target.closest('.file-upload-info').querySelector('.file-list');
                    const newFileItem = document.createElement('div');
                    newFileItem.classList.add('file-item');
                    newFileItem.innerHTML = `
                        <span class="file-name">new_file.pdf</span>
                        <button class="view-file">View</button>
                        <button class="delete-file">Delete</button>
                    `;
                    fileList.appendChild(newFileItem);
                });
            });

            medicalDataContainer.appendChild(medicalSummary);
        });
    }

    // SDC toggle functionality
    document.getElementById('sdcToggle').addEventListener('change', function() {
        const sdcStatus = this.checked ? 'Enabled' : 'Disabled';
        console.log('SDC Card Access:', sdcStatus);
    });

    // Medicines and hospitals data
    const medicines = [
        { name: 'Lemon tea', details: 'Lemon tea for healthy digestion' },
        { name: 'Marshmallow root', details: 'Heat some water with it' }
    ];

    const hospitals = [
        { name: 'Acme Hospital', lastVisit: 'June 15, 2023' },
        { name: 'Mercy Hospital', lastVisit: 'April 20, 2023' }
    ];

    // Populate medicines dynamically
    const medicineContainer = document.getElementById('medicineContainer');
    medicines.forEach(medicine => {
        const medicineDiv = document.createElement('div');
        medicineDiv.classList.add('medicine-card');
        medicineDiv.innerHTML = `
            <h4>${medicine.name}</h4>
            <p>${medicine.details}</p>
        `;
        medicineContainer.appendChild(medicineDiv);
    });

    // Populate hospitals dynamically
    const hospitalContainer = document.getElementById('hospitalContainer');
    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.classList.add('hospital-card');
        hospitalDiv.innerHTML = `
            <h4>${hospital.name}</h4>
            <p>Last visit: ${hospital.lastVisit}</p>
        `;
        hospitalContainer.appendChild(hospitalDiv);
    });

    // Function to generate a random SDC code
function generateSDCCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sdcCode = '';
    for (let i = 0; i < 8; i++) {
        sdcCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sdcCode;
}



    function getValidity() {
        const validityPeriod = 15; // minutes
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + validityPeriod);
        return `Valid until ${expiryDate.toLocaleTimeString()}`;
    }
    
    document.getElementById('generateCodeBtn').addEventListener('click', () => {
        const sdcCode = generateSDCCode();
        const validity = getValidity();
    
        document.getElementById('sdcCode').textContent = sdcCode;
        document.getElementById('codeValidity').textContent = validity;
        document.getElementById('sdcCodeContainer').style.display = 'block';
    });

});
