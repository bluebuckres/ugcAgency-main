<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional UGC Content Calendar - 30 Day Planner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 8px;
            font-weight: 700;
        }

        .header p {
            font-size: 16px;
            opacity: 0.95;
        }

        .controls {
            padding: 30px 40px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
        }

        .controls input, .controls select {
            padding: 12px 16px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-size: 14px;
            background: white;
            transition: all 0.3s;
        }

        .controls input:focus, .controls select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .brand-input {
            flex: 1;
            min-width: 250px;
        }

        .month-input {
            min-width: 200px;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
            background: white;
            border: 2px solid #667eea;
            color: #667eea;
        }

        .btn-secondary:hover {
            background: #667eea;
            color: white;
        }

        .main-content {
            padding: 40px;
        }

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #e9ecef;
            overflow-x: auto;
        }

        .tab {
            padding: 12px 24px;
            border: none;
            background: none;
            font-size: 15px;
            font-weight: 600;
            color: #6c757d;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
            white-space: nowrap;
        }

        .tab.active {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .tab:hover {
            color: #667eea;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Calendar Grid */
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 12px;
            margin-bottom: 30px;
        }

        .calendar-day {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 16px;
            min-height: 200px;
            transition: all 0.3s;
            position: relative;
        }

        .calendar-day:hover {
            border-color: #667eea;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .day-header {
            font-size: 11px;
            text-transform: uppercase;
            color: #6c757d;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .day-number {
            font-size: 24px;
            font-weight: 700;
            color: #212529;
            margin-bottom: 12px;
        }

        .content-slot {
            background: white;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            border-left: 4px solid #667eea;
            cursor: pointer;
            transition: all 0.3s;
        }

        .content-slot:hover {
            transform: translateX(4px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .content-type {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 6px;
        }

        .content-platform {
            font-size: 10px;
            color: #6c757d;
        }

        .add-content {
            background: #e9ecef;
            border: 2px dashed #ced4da;
            border-radius: 8px;
            padding: 12px;
            text-align: center;
            color: #6c757d;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 12px;
        }

        .add-content:hover {
            border-color: #667eea;
            color: #667eea;
            background: #f0f4ff;
        }

        /* Content Type Colors */
        .testimonial { border-left-color: #667eea; }
        .demo { border-left-color: #48bb78; }
        .unboxing { border-left-color: #ed8936; }
        .before-after { border-left-color: #9f7aea; }
        .tutorial { border-left-color: #38b2ac; }
        .lifestyle { border-left-color: #ec4899; }

        /* Tracking Table */
        .tracking-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .tracking-table th {
            background: #f8f9fa;
            padding: 16px;
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
            color: #6c757d;
            font-weight: 700;
            border-bottom: 2px solid #e9ecef;
        }

        .tracking-table td {
            padding: 16px;
            border-bottom: 1px solid #e9ecef;
            font-size: 14px;
        }

        .tracking-table tr:hover {
            background: #f8f9fa;
        }

        .tracking-table input, .tracking-table select {
            width: 100%;
            padding: 8px;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            font-size: 13px;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-draft { background: #e9ecef; color: #6c757d; }
        .status-review { background: #fff3cd; color: #856404; }
        .status-approved { background: #d4edda; color: #155724; }
        .status-published { background: #d1ecf1; color: #0c5460; }

        /* Content Mix Chart */
        .content-mix {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .mix-card {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }

        .mix-percentage {
            font-size: 48px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .mix-label {
            font-size: 14px;
            color: #6c757d;
            margin-top: 8px;
        }

        /* Best Times Section */
        .best-times {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
        }

        .best-times h3 {
            font-size: 18px;
            margin-bottom: 16px;
            color: #212529;
        }

        .time-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
        }

        .time-card {
            background: white;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }

        .time-platform {
            font-weight: 700;
            margin-bottom: 8px;
            color: #212529;
        }

        .time-slots {
            font-size: 13px;
            color: #6c757d;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            padding: 24px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h2 {
            font-size: 20px;
            color: #212529;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            color: #6c757d;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 0.3s;
        }

        .close-modal:hover {
            background: #f8f9fa;
            color: #212529;
        }

        .modal-body {
            padding: 24px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #495057;
            margin-bottom: 8px;
        }

        .form-control {
            width: 100%;
            padding: 12px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        textarea.form-control {
            min-height: 100px;
            resize: vertical;
        }

        .platform-checkboxes {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .checkbox-label:hover {
            border-color: #667eea;
            background: #f0f4ff;
        }

        .checkbox-label input:checked + span {
            color: #667eea;
            font-weight: 600;
        }

        @media (max-width: 1200px) {
            .calendar-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 768px) {
            .calendar-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .container {
                border-radius: 0;
            }

            .main-content {
                padding: 20px;
            }

            .header {
                padding: 24px 20px;
            }

            .header h1 {
                font-size: 24px;
            }
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }

            .controls, .btn {
                display: none !important;
            }

            .container {
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎬 Professional UGC Content Calendar</h1>
            <p>30-Day Strategic Planning & Performance Tracking System</p>
        </div>

        <div class="controls">
            <input type="text" class="brand-input" id="brandName" placeholder="Enter Your Brand Name" value="">
            <input type="month" class="month-input" id="monthSelect">
            <button class="btn btn-secondary" onclick="fillSampleData()">📝 Fill Sample Data</button>
            <button class="btn btn-primary" onclick="window.print()">📥 Download PDF</button>
        </div>

        <div class="main-content">
            <div class="tabs">
                <button class="tab active" onclick="switchTab('calendar')">📅 Calendar View</button>
                <button class="tab" onclick="switchTab('tracking')">📊 Content Tracker</button>
                <button class="tab" onclick="switchTab('strategy')">🎯 Strategy Guide</button>
            </div>

            <!-- Calendar Tab -->
            <div id="calendar" class="tab-content active">
                <div class="calendar-grid" id="calendarGrid">
                    <!-- Generated by JS -->
                </div>
            </div>

            <!-- Tracking Tab -->
            <div id="tracking" class="tab-content">
                <table class="tracking-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Content Type</th>
                            <th>Creator</th>
                            <th>Platform</th>
                            <th>Hook/Theme</th>
                            <th>Status</th>
                            <th>Views</th>
                            <th>Eng. Rate</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody id="trackingBody">
                        <!-- Generated by JS -->
                    </tbody>
                </table>
            </div>

            <!-- Strategy Tab -->
            <div id="strategy" class="tab-content">
                <h2 style="margin-bottom: 20px; color: #212529;">📈 UGC Content Strategy Framework</h2>

                <div class="content-mix">
                    <div class="mix-card">
                        <div class="mix-percentage">40%</div>
                        <div class="mix-label">Testimonials & Reviews</div>
                    </div>
                    <div class="mix-card">
                        <div class="mix-percentage">30%</div>
                        <div class="mix-label">Product Demos</div>
                    </div>
                    <div class="mix-card">
                        <div class="mix-percentage">20%</div>
                        <div class="mix-label">Unboxing Videos</div>
                    </div>
                    <div class="mix-card">
                        <div class="mix-percentage">10%</div>
                        <div class="mix-label">Lifestyle Content</div>
                    </div>
                </div>

                <div class="best-times">
                    <h3>⏰ Best Posting Times by Platform</h3>
                    <div class="time-grid">
                        <div class="time-card">
                            <div class="time-platform">📱 TikTok</div>
                            <div class="time-slots">9-11 AM, 7-9 PM</div>
                        </div>
                        <div class="time-card" style="border-left-color: #48bb78;">
                            <div class="time-platform">📸 Instagram Reels</div>
                            <div class="time-slots">12-2 PM, 6-9 PM</div>
                        </div>
                        <div class="time-card" style="border-left-color: #ed8936;">
                            <div class="time-platform">▶️ YouTube Shorts</div>
                            <div class="time-slots">2-4 PM, 8-10 PM</div>
                        </div>
                        <div class="time-card" style="border-left-color: #9f7aea;">
                            <div class="time-platform">💼 Meta Ads</div>
                            <div class="time-slots">Always-on (optimized)</div>
                        </div>
                    </div>
                </div>

                <div style="background: white; border: 2px solid #e9ecef; border-radius: 12px; padding: 24px;">
                    <h3 style="margin-bottom: 16px; color: #212529;">💡 Pro Tips for UGC Success</h3>
                    <ul style="line-height: 1.8; color: #495057;">
                        <li><strong>Hook Formula:</strong> First 3 seconds = Stop the scroll. Use pattern interrupt or bold statement</li>
                        <li><strong>Authenticity wins:</strong> Raw, unpolished content often outperforms highly produced videos</li>
                        <li><strong>Test & iterate:</strong> Run 3-5 variants of each concept, double down on winners</li>
                        <li><strong>Rights management:</strong> Always secure usage rights for paid advertising</li>
                        <li><strong>Batch filming:</strong> Have creators film 3-5 pieces at once for consistency</li>
                        <li><strong>Platform-specific:</strong> Vertical 9:16 for TikTok/Reels, captions always ON</li>
                        <li><strong>CTA placement:</strong> Voice CTA at 5-7 seconds, text CTA throughout</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Adding Content -->
    <div class="modal" id="contentModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Content</h2>
                <button class="close-modal" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                <form id="contentForm">
                    <input type="hidden" id="contentDate">
                    
                    <div class="form-group">
                        <label class="form-label">Content Type</label>
                        <select class="form-control" id="contentType">
                            <option value="testimonial">Testimonial/Review</option>
                            <option value="demo">Product Demo</option>
                            <option value="unboxing">Unboxing</option>
                            <option value="before-after">Before/After</option>
                            <option value="tutorial">Tutorial/How-To</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Creator Name</label>
                        <input type="text" class="form-control" id="creatorName" placeholder="@creatorhandle">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Platform(s)</label>
                        <div class="platform-checkboxes">
                            <label class="checkbox-label">
                                <input type="checkbox" value="TikTok"> <span>TikTok</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="Reels"> <span>Reels</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="YouTube"> <span>YouTube</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="Meta Ads"> <span>Meta Ads</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Hook/Key Message</label>
                        <textarea class="form-control" id="hookMessage" placeholder="What's the opening hook? What problem does it solve?"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Post Time</label>
                        <input type="time" class="form-control" id="postTime" value="09:00">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select class="form-control" id="contentStatus">
                            <option value="draft">Draft - Planning</option>
                            <option value="review">In Review</option>
                            <option value="approved">Approved - Ready</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%;">Save Content</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Initialize
        const contentData = {};
        const today = new Date();
        document.getElementById('monthSelect').value = today.toISOString().substring(0, 7);

        function initCalendar() {
            const monthInput = document.getElementById('monthSelect').value;
            const [year, month] = monthInput.split('-');
            const firstDay = new Date(year, month - 1, 1);
            const lastDay = new Date(year, month, 0);
            const grid = document.getElementById('calendarGrid');
            grid.innerHTML = '';

            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(year, month - 1, day);
                const dateStr = date.toISOString().split('T')[0];
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                const dayCard = document.createElement('div');
                dayCard.className = 'calendar-day';
                dayCard.innerHTML = `
                    <div class="day-header">${dayName}</div>
                    <div class="day-number">${day}</div>
                    <div id="content-${dateStr}"></div>
                    <div class="add-content" onclick="openModal('${dateStr}')">+ Add Content</div>
                `;
                grid.appendChild(dayCard);
            }

            renderContent();
        }

        function renderContent() {
            Object.keys(contentData).forEach(date => {
                const container = document.getElementById(`content-${date}`);
                if (container) {
                    container.innerHTML = contentData[date].map(content => `
                        <div class="content-slot ${content.type}">
                            <div class="content-type">${content.typeLabel}</div>
                            <div class="content-platform">${content.platforms}</div>
                        </div>
                    `).join('');
                }
            });
            updateTrackingTable();
        }

        function openModal(date) {
            document.getElementById('contentDate').value = date;
            document.getElementById('contentModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('contentModal').classList.remove('active');
            document.getElementById('contentForm').reset();
        }

        document.getElementById('contentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const date = document.getElementById('contentDate').value;
            const type = document.getElementById('contentType').value;
            const typeLabels = {
                'testimonial': 'Testimonial',
                'demo': 'Product Demo',
                'unboxing': 'Unboxing',
                'before-after': 'Before/After',
                'tutorial': 'Tutorial',
                'lifestyle': 'Lifestyle'
            };

            const platforms = Array.from(document.querySelectorAll('.platform-checkboxes input:checked'))
                .map(cb => cb.value)
                .join(', ');

            const content = {
                type: type,
                typeLabel: typeLabels[type],
                creator: document.getElementById('creatorName').value,
                platforms: platforms,
                hook: document.getElementById('hookMessage').value,
                time: document.getElementById('postTime').value,
                status: document.getElementById('contentStatus').value
            };

            if (!contentData[date]) contentData[date] = [];
            contentData[date].push(content);

            renderContent();
            closeModal();
        });

        function updateTrackingTable() {
            const tbody = document.getElementById('trackingBody');
            tbody.innerHTML = '';

            const sortedDates = Object.keys(contentData).sort();
            sortedDates.forEach(date => {
                contentData[date].forEach(content => {
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td>${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td>${content.typeLabel}</td>
                        <td>${content.creator || '-'}</td>
                        <td>${content.platforms || '-'}</td>
                        <td style="max-width: 200px; font-size: 12px;">${content.hook || '-'}</td>
                        <td><span class="status-badge status-${content.status}">${content.status}</span></td>
                        <td><input type="number" placeholder="0" style="width: 80px;"></td>
                        <td><input type="text" placeholder="0%" style="width: 60px;"></td>
                        <td><input type="text" placeholder="$0" style="width: 70px;"></td>
                    `;
                });
            });
        }

        function switchTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }

        function fillSampleData() {
            const monthInput = document.getElementById('monthSelect').value;
            const [year, month] = monthInput.split('-');
            
            const sampleContent = [
                { day: 5, type: 'testimonial', typeLabel: 'Testimonial', creator: '@sarahsmith', platforms: 'TikTok, Reels', hook: 'I was skeptical but this changed everything...', time: '09:00', status: 'published' },
                { day: 7, type: 'demo', typeLabel: 'Product Demo', creator: '@techreview', platforms: 'YouTube, Reels', hook: '3 features you didn\'t know existed', time: '14:00', status: 'approved' },
                { day: 10, type: 'unboxing', typeLabel: 'Unboxing', creator: '@unboxqueen', platforms: 'TikTok', hook: 'Opening the most hyped product of 2025', time: '19:00', status: 'review' },
                { day: 14, type: 'before-after', typeLabel: 'Before/After', creator: '@transformations', platforms: 'Reels, Meta Ads', hook: '30 days later and here are the results...', time: '12:00', status: 'draft' },
                { day: 18, type: 'lifestyle', typeLabel: 'Lifestyle', creator: '@dayinlife', platforms: 'TikTok, YouTube', hook: 'How I use this in my daily routine', time: '07:00', status: 'approved' }
            ];

            sampleContent.forEach(item => {
                const date = `${year}-${month}-${String(item.day).padStart(2, '0')}`;
                if (!contentData[date]) contentData[date] = [];
                contentData[date].push(item);
            });

            renderContent();
            alert('✅ Sample data loaded! Check the calendar and tracking tab.');
        }

        // Click outside modal to close
        document.getElementById('contentModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('contentModal')) {
                closeModal();
            }
        });

        // Initialize on page load and month change
        document.getElementById('monthSelect').addEventListener('change', initCalendar);
        
        // Update brand name in header
        document.getElementById('brandName').addEventListener('input', (e) => {
            const brandName = e.target.value;
            if (brandName) {
                document.querySelector('.header h1').textContent = `🎬 ${brandName} - UGC Content Calendar`;
            } else {
                document.querySelector('.header h1').textContent = '🎬 Professional UGC Content Calendar';
            }
        });

        // Initialize calendar on load
        initCalendar();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });

        // Enhanced print styles
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });

        // Auto-save to localStorage
        function saveData() {
            localStorage.setItem('ugcCalendarData', JSON.stringify(contentData));
            localStorage.setItem('ugcBrandName', document.getElementById('brandName').value);
        }

        function loadData() {
            const saved = localStorage.getItem('ugcCalendarData');
            const savedBrand = localStorage.getItem('ugcBrandName');
            
            if (saved) {
                Object.assign(contentData, JSON.parse(saved));
                renderContent();
            }
            
            if (savedBrand) {
                document.getElementById('brandName').value = savedBrand;
                document.querySelector('.header h1').textContent = `🎬 ${savedBrand} - UGC Content Calendar`;
            }
        }

        // Save data when content changes
        const originalRenderContent = renderContent;
        renderContent = function() {
            originalRenderContent();
            saveData();
        };

        // Load saved data on page load
        loadData();

        // Export functionality
        function exportToCSV() {
            const rows = [['Date', 'Content Type', 'Creator', 'Platform', 'Hook', 'Status', 'Post Time']];
            
            const sortedDates = Object.keys(contentData).sort();
            sortedDates.forEach(date => {
                contentData[date].forEach(content => {
                    rows.push([
                        date,
                        content.typeLabel,
                        content.creator || '',
                        content.platforms || '',
                        content.hook || '',
                        content.status,
                        content.time || ''
                    ]);
                });
            });

            const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${document.getElementById('brandName').value || 'UGC'}-content-calendar.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }

        // Add export button functionality
        document.querySelector('.controls').insertAdjacentHTML('beforeend', 
            '<button class="btn btn-secondary" onclick="exportToCSV()">📊 Export CSV</button>'
        );
    </script>
</body>
</html>