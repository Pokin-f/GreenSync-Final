// ===== AREA TYPE REGISTRY =====
// ประเภทพื้นที่ที่กำหนดไว้ล่วงหน้า (เพิ่มได้ไม่จำกัด)
const AREA_TYPES = {
  // พืชไร่ / พืชสวน
  rice:       { label: 'นาข้าว',         icon: '🌾', cat: 'crop',      color: '#1D9E75', fields: ['seedVariety','waterLevel','mulching'] },
  sugarcane:  { label: 'ไร่อ้อย',         icon: '🎋', cat: 'crop',      color: '#2D8A3E', fields: ['variety','fertilizerDate'] },
  fruit:      { label: 'สวนผลไม้',        icon: '🍎', cat: 'crop',      color: '#EF9F27', fields: ['fruitType','treeCount'] },
  vegetable:  { label: 'แปลงผัก',         icon: '🥬', cat: 'crop',      color: '#4CAF7D', fields: ['vegType','plotRows'] },
  mushroom:   { label: 'โรงเพาะเห็ด',     icon: '🍄', cat: 'structure', color: '#8B6914', fields: ['mushroomType','bagCount','humidity'] },
  herb:       { label: 'สวนสมุนไพร',      icon: '🌿', cat: 'crop',      color: '#1D9E75', fields: ['herbType'] },
  // ปศุสัตว์ / สัตว์น้ำ
  chicken:    { label: 'โรงเลี้ยงไก่',    icon: '🐔', cat: 'livestock', color: '#EF9F27', fields: ['chickenType','animalCount','feedType'] },
  pig:        { label: 'คอกหมู',          icon: '🐖', cat: 'livestock', color: '#F4A0A0', fields: ['pigBreed','animalCount'] },
  cow:        { label: 'โรงวัว',          icon: '🐄', cat: 'livestock', color: '#A0784A', fields: ['cowBreed','animalCount'] },
  fish:       { label: 'บ่อปลา',          icon: '🐟', cat: 'livestock', color: '#378ADD', fields: ['fishType','pondSize','waterPH'] },
  shrimp:     { label: 'บ่อกุ้ง',         icon: '🦐', cat: 'livestock', color: '#FF7B54', fields: ['shrimpType','pondSize','waterPH'] },
  // โครงสร้าง
  greenhouse: { label: 'โรงเรือน/กระจก',  icon: '🏗️', cat: 'structure', color: '#5C8DE0', fields: ['cropInside','tempTarget'] },
  storage:    { label: 'โรงเก็บ/โกดัง',   icon: '🏚️', cat: 'structure', color: '#888780', fields: ['storageContent'] },
  solar:      { label: 'แผงโซลาร์',       icon: '☀️', cat: 'structure', color: '#EF9F27', fields: ['panelCount','powerKW'] },
  // Sensor / IoT
  sensor:     { label: 'จุดวัด IoT',       icon: '📡', cat: 'sensor',   color: '#7F77DD', fields: ['sensorTypes','isOnline'] },
  // Custom — สร้างเองได้
  custom:     { label: 'กำหนดเอง',         icon: '⚙️', cat: 'other',    color: '#888780', fields: [] },
};

// Field definitions
const FIELD_DEFS = {
  seedVariety:   { label: 'พันธุ์ข้าว',         type: 'text',   ph: 'เช่น ข้าวหอมมะลิ 105' },
  waterLevel:    { label: 'ระดับน้ำ (ซม.)',      type: 'number', ph: 'เช่น 10' },
  mulching:      { label: 'การจัดการดิน',        type: 'select', opts: ['','ดินเปล่า','ห่มดิน','จุลินทรีย์'] },
  variety:       { label: 'พันธุ์',              type: 'text',   ph: 'เช่น อ้อย KK3' },
  fertilizerDate:{ label: 'วันใส่ปุ๋ยล่าสุด',   type: 'date' },
  fruitType:     { label: 'ชนิดผลไม้',           type: 'text',   ph: 'เช่น มะม่วง ทุเรียน' },
  treeCount:     { label: 'จำนวนต้น',            type: 'number', ph: '0' },
  vegType:       { label: 'ชนิดผัก',             type: 'text',   ph: 'เช่น ผักกาด กวางตุ้ง' },
  plotRows:      { label: 'จำนวนแถว',            type: 'number', ph: '0' },
  mushroomType:  { label: 'ชนิดเห็ด',            type: 'select', opts: ['','เห็ดนางฟ้า','เห็ดหอม','เห็ดเป๋าฮื้อ','เห็ดภูฐาน'] },
  bagCount:      { label: 'จำนวนก้อนเชื้อ',      type: 'number', ph: '0' },
  humidity:      { label: 'ความชื้นเป้าหมาย (%)',type: 'number', ph: 'เช่น 80' },
  herbType:      { label: 'ชนิดสมุนไพร',         type: 'text',   ph: 'เช่น ฟ้าทะลายโจร ขิง' },
  chickenType:   { label: 'ประเภทไก่',           type: 'select', opts: ['','ไก่ไข่','ไก่เนื้อ','ไก่พื้นเมือง'] },
  animalCount:   { label: 'จำนวนสัตว์ (ตัว)',    type: 'number', ph: '0' },
  feedType:      { label: 'ประเภทอาหาร',         type: 'text',   ph: 'เช่น อาหารสำเร็จรูป' },
  pigBreed:      { label: 'พันธุ์หมู',           type: 'text',   ph: 'เช่น ลาร์จไวท์' },
  cowBreed:      { label: 'พันธุ์วัว',           type: 'text',   ph: 'เช่น บราห์มัน' },
  fishType:      { label: 'ชนิดปลา',             type: 'text',   ph: 'เช่น ปลานิล ปลาดุก' },
  pondSize:      { label: 'ขนาดบ่อ (ไร่)',        type: 'number', ph: '0' },
  waterPH:       { label: 'ค่า pH น้ำ',          type: 'number', ph: '7.0', step: '0.1' },
  shrimpType:    { label: 'ชนิดกุ้ง',            type: 'text',   ph: 'เช่น กุ้งขาว' },
  cropInside:    { label: 'พืชภายใน',            type: 'text',   ph: 'เช่น ผักไฮโดร' },
  tempTarget:    { label: 'อุณหภูมิเป้าหมาย (°C)',type: 'number', ph: '25' },
  storageContent:{ label: 'สิ่งที่เก็บ',         type: 'text',   ph: 'เช่น เมล็ดพันธุ์ ปุ๋ย' },
  panelCount:    { label: 'จำนวนแผง',            type: 'number', ph: '0' },
  powerKW:       { label: 'กำลังไฟ (kW)',         type: 'number', ph: '0', step: '0.1' },
  sensorTypes:   { label: 'ประเภทเซ็นเซอร์',     type: 'text',   ph: 'เช่น ความชื้น อุณหภูมิ' },
  isOnline:      { label: 'สถานะ',               type: 'select', opts: ['online','offline','maintenance'] },
};

// ===== STATE =====
let plots = [];
let selectedId = null;
let tool = 'area';
let currentColor = '#1D9E75';
let drawing = false;
let startX, startY, curX, curY;
let nextId = 1;
let currentMode = 'draw';
let pendingPlot = null; // plot waiting for modal confirmation

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrap = canvas.parentElement;

// ===== INIT =====
function resize() {
  canvas.width = wrap.clientWidth;
  canvas.height = wrap.clientHeight;
  render();
}
window.addEventListener('resize', resize);
setTimeout(resize, 100);
buildModalPresets();

// ===== MODE =====
function switchMode(mode) {
  currentMode = mode;
  selectedId = null;
  document.getElementById('tab-draw').classList.toggle('active', mode === 'draw');
  document.getElementById('tab-status').classList.toggle('active', mode === 'status');
  document.getElementById('editor-toolbar').style.display = mode === 'draw' ? 'flex' : 'none';
  document.getElementById('view-draw').style.display = mode === 'draw' ? 'block' : 'none';
  document.getElementById('view-status').style.display = mode === 'status' ? 'block' : 'none';
  if (mode === 'status') {
    document.getElementById('main-layout').classList.add('status-mode');
    setTool('select');
  } else {
    document.getElementById('main-layout').classList.remove('status-mode');
  }
  closeDetail();
  render();
  setTimeout(resize, 350);
}

// ===== TOOL =====
function setTool(t) {
  tool = t;
  ['area','node','select'].forEach(id => {
    const el = document.getElementById('tool-' + id);
    if (el) el.classList.toggle('active', id === t);
  });
  canvas.style.cursor = t === 'select' ? 'default' : 'crosshair';
}

function setColor(el) {
  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  currentColor = el.dataset.c;
}

// ===== CANVAS EVENTS =====
canvas.addEventListener('mousedown', e => {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  if (tool === 'area') {
    drawing = true; startX = x; startY = y; curX = x; curY = y;
  } else if (tool === 'node') {
    const p = {
      id: nextId++, type: 'sensor', areaTypeKey: 'sensor',
      x: x - 15, y: y - 15, w: 30, h: 30,
      color: AREA_TYPES.sensor.color,
      name: 'IoT-' + nextId,
      customIcon: AREA_TYPES.sensor.icon,
      customLabel: AREA_TYPES.sensor.label,
      data: {}
    };
    plots.push(p);
    selectedId = p.id;
    updateList(); openDetail(p); render();
  } else {
    const hit = plots.slice().reverse().find(p => x >= p.x && x <= p.x + p.w && y >= p.y && y <= p.y + p.h);
    selectedId = hit ? hit.id : null;
    document.getElementById('btn-delete').style.display = selectedId ? 'inline-flex' : 'none';
    if (selectedId) openDetail(plots.find(pl => pl.id === selectedId));
    else closeDetail();
    render();
  }
});

canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  const r = canvas.getBoundingClientRect();
  curX = e.clientX - r.left; curY = e.clientY - r.top;
  render();
  const x = Math.min(startX, curX), y = Math.min(startY, curY);
  const w = Math.abs(curX - startX), h = Math.abs(curY - startY);
  ctx.strokeStyle = currentColor; ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]); ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = hexToRgba(currentColor, 0.1); ctx.fillRect(x, y, w, h);
  ctx.setLineDash([]);
});

canvas.addEventListener('mouseup', e => {
  if (!drawing) return;
  drawing = false;
  const r = canvas.getBoundingClientRect();
  curX = e.clientX - r.left; curY = e.clientY - r.top;
  const x = Math.min(startX, curX), y = Math.min(startY, curY);
  const w = Math.abs(curX - startX), h = Math.abs(curY - startY);
  if (w > 20 && h > 20) {
    pendingPlot = { x, y, w, h, color: currentColor };
    openModal();
    document.getElementById('canvas-hint').style.display = 'none';
  }
  render();
});

// ===== RENDER =====
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  plots.forEach(p => {
    const sel = p.id === selectedId;
    const typeInfo = AREA_TYPES[p.areaTypeKey] || {};

    if (p.type === 'sensor') {
      // Node circle
      ctx.beginPath();
      ctx.arc(p.x + 15, p.y + 15, sel ? 14 : 11, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill();
      ctx.strokeStyle = sel ? '#fff' : 'rgba(255,255,255,0.6)';
      ctx.lineWidth = sel ? 2.5 : 1.5; ctx.stroke();
      ctx.font = '13px Arial';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.customIcon || '📡', p.x + 15, p.y + 15);
      ctx.fillStyle = p.color; ctx.font = '10px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(p.name, p.x + 15, p.y + 30);
    } else {
      ctx.fillStyle = sel ? hexToRgba(p.color, 0.32) : hexToRgba(p.color, 0.15);
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = sel ? 2.5 : 1.2;
      ctx.setLineDash([]);
      ctx.strokeRect(p.x, p.y, p.w, p.h);

      // Top-left icon + name
      ctx.font = '18px Arial';
      ctx.fillText(p.customIcon || '🌿', p.x + 8, p.y + 22);
      ctx.fillStyle = p.color;
      ctx.font = `bold 12px -apple-system, sans-serif`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText(p.name, p.x + 8, p.y + p.h - 8);

      // Type label small
      ctx.font = '10px sans-serif';
      ctx.fillStyle = hexToRgba(p.color, 0.75);
      ctx.fillText(p.customLabel || '', p.x + 8, p.y + p.h - 20);

      // Selection glow outline
      if (sel) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(p.x - 3, p.y - 3, p.w + 6, p.h + 6);
        ctx.setLineDash([]);
      }
    }
  });
}

// ===== LIST =====
function updateList() {
  const list = document.getElementById('plot-list');
  const count = plots.length;
  document.getElementById('plot-count').textContent = count;
  document.getElementById('total-areas').textContent = count + ' พื้นที่';

  if (!count) {
    list.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined" style="font-size:36px;color:#bbb">landscape</span><p>ยังไม่มีพื้นที่<br>วาดเพื่อเริ่มต้น</p></div>`;
    return;
  }
  list.innerHTML = plots.map(p => `
    <div class="plot-item ${p.id === selectedId ? 'selected' : ''}" onclick="clickPlot(${p.id})">
      <div class="plot-icon-wrap" style="background:${hexToRgba(p.color,0.15)};color:${p.color}">${p.customIcon || '🌿'}</div>
      <div class="plot-info">
        <div class="plot-name">${p.name}</div>
        <div class="plot-type">${p.customLabel || '—'}</div>
      </div>
    </div>
  `).join('');
}

function clickPlot(id) {
  selectedId = id;
  document.getElementById('btn-delete').style.display = 'inline-flex';
  openDetail(plots.find(p => p.id === id));
  updateList();
  render();
  if (currentMode === 'status') updateDashboard();
}

// ===== DETAIL PANEL =====
function openDetail(p) {
  if (!p) return;
  const typeInfo = AREA_TYPES[p.areaTypeKey] || {};
  document.getElementById('detail-panel').style.display = 'flex';
  document.getElementById('detail-icon').textContent = p.customIcon || '🌿';
  document.getElementById('detail-icon-wrap').style.background = hexToRgba(p.color, 0.15);
  document.getElementById('detail-title').textContent = p.name;
  document.getElementById('detail-type-label').textContent = p.customLabel || '—';
  document.getElementById('inp-name').value = p.name;
  document.getElementById('inp-note').value = p.note || '';

  // Type grid (highlight current)
  buildTypeGrid(p.areaTypeKey);

  // Dynamic fields
  buildDynamicFields(p);
}

function buildTypeGrid(currentKey) {
  const grid = document.getElementById('type-grid');
  grid.innerHTML = Object.entries(AREA_TYPES).map(([key, t]) => `
    <div class="type-chip ${currentKey === key ? 'active' : ''}"
         style="${currentKey===key ? `border-color:${AREA_TYPES[key].color};background:${hexToRgba(AREA_TYPES[key].color,0.12)};color:${AREA_TYPES[key].color}` : ''}"
         onclick="changeAreaType('${key}')">
      <span>${t.icon}</span>${t.label}
    </div>
  `).join('');
}

function changeAreaType(key) {
  const p = plots.find(pl => pl.id === selectedId);
  if (!p) return;
  const typeInfo = AREA_TYPES[key];
  p.areaTypeKey = key;
  p.customIcon = typeInfo.icon;
  p.customLabel = typeInfo.label;
  if (key !== 'custom') p.color = typeInfo.color;
  p.data = {};
  openDetail(p);
  render();
  updateList();
}

function buildDynamicFields(p) {
  const typeInfo = AREA_TYPES[p.areaTypeKey] || { fields: [] };
  const container = document.getElementById('dynamic-fields');
  container.innerHTML = typeInfo.fields.map(fkey => {
    const fd = FIELD_DEFS[fkey] || { label: fkey, type: 'text', ph: '' };
    const val = (p.data && p.data[fkey]) || '';
    if (fd.type === 'select') {
      return `<div class="field-row">
        <label>${fd.label}</label>
        <select onchange="updateData('${fkey}',this.value)">
          ${fd.opts.map(o => `<option value="${o}" ${val===o?'selected':''}>${o||'-- เลือก --'}</option>`).join('')}
        </select>
      </div>`;
    }
    return `<div class="field-row">
      <label>${fd.label}</label>
      <input type="${fd.type}" value="${val}" placeholder="${fd.ph||''}" step="${fd.step||1}"
             oninput="updateData('${fkey}',this.value)"/>
    </div>`;
  }).join('');

  // sensor val field for relevant types
  const needsSensor = ['rice','mushroom','greenhouse','fish','shrimp','chicken'].includes(p.areaTypeKey);
  document.getElementById('row-sensor').style.display = needsSensor ? 'flex' : 'none';
  if (needsSensor) {
    const labels = { rice:'ความชื้นดิน (%)', mushroom:'ความชื้น (%)', greenhouse:'อุณหภูมิ (°C)', fish:'ค่า DO (mg/L)', shrimp:'ค่า DO (mg/L)', chicken:'อุณหภูมิโรงเรือน (°C)' };
    document.getElementById('sensor-label').textContent = labels[p.areaTypeKey] || 'ค่าเซ็นเซอร์';
    document.getElementById('inp-moisture').value = p.sensorVal || '';
  }
}

function updateData(field, val) {
  const p = plots.find(pl => pl.id === selectedId);
  if (p) { if (!p.data) p.data = {}; p.data[field] = val; }
}

function updateField(field, val) {
  const p = plots.find(pl => pl.id === selectedId);
  if (p) p[field] = val;
  if (field === 'name') {
    document.getElementById('detail-title').textContent = val;
    updateList(); render();
  }
}

function saveSelected() {
  const p = plots.find(pl => pl.id === selectedId);
  if (!p) return;
  p.name = document.getElementById('inp-name').value || p.name;
  p.note = document.getElementById('inp-note').value;
  p.sensorVal = document.getElementById('inp-moisture').value;
  document.getElementById('detail-title').textContent = p.name;
  updateList(); render();
  // Flash save confirmation
  const btn = document.querySelector('.save-btn');
  const orig = btn.innerHTML;
  btn.innerHTML = '<span class="material-symbols-outlined icon-small">check_circle</span> บันทึกแล้ว!';
  btn.style.background = '#0F6E56';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1500);
}

function closeDetail() {
  document.getElementById('detail-panel').style.display = 'none';
  document.getElementById('btn-delete').style.display = 'none';
}

// ===== MODAL =====
function buildModalPresets() {
  const container = document.getElementById('modal-presets');
  const groups = {
    'พืชไร่ / พืชสวน': ['rice','sugarcane','fruit','vegetable','mushroom','herb'],
    'ปศุสัตว์ / สัตว์น้ำ': ['chicken','pig','cow','fish','shrimp'],
    'โครงสร้าง / อื่นๆ': ['greenhouse','storage','solar','sensor','custom'],
  };
  container.innerHTML = Object.entries(groups).map(([gname, keys]) => `
    <div class="preset-group">
      <div class="preset-group-label">${gname}</div>
      <div class="preset-chips">
        ${keys.map(k => {
          const t = AREA_TYPES[k];
          return `<div class="preset-chip" data-key="${k}" onclick="selectPreset('${k}')">
            <span class="preset-chip-icon">${t.icon}</span>
            <span class="preset-chip-label">${t.label}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function selectPreset(key) {
  document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
  const chip = document.querySelector(`.preset-chip[data-key="${key}"]`);
  if (chip) chip.classList.add('active');
  const t = AREA_TYPES[key];
  document.getElementById('modal-name').value = t.label + ' ' + (plots.length + 1);
  document.getElementById('modal-icon').value = t.icon;
}

function openModal() {
  // default select first
  document.getElementById('modal-name').value = 'พื้นที่ ' + (plots.length + 1);
  document.getElementById('modal-icon').value = '🌿';
  document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
  document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  pendingPlot = null;
  render();
}

function confirmModal() {
  if (!pendingPlot) return;
  const activeChip = document.querySelector('.preset-chip.active');
  const key = activeChip ? activeChip.dataset.key : 'custom';
  const typeInfo = AREA_TYPES[key] || AREA_TYPES.custom;
  const name = document.getElementById('modal-name').value.trim() || typeInfo.label;
  const icon = document.getElementById('modal-icon').value.trim() || typeInfo.icon;
  const color = key !== 'custom' ? typeInfo.color : pendingPlot.color;

  const p = {
    id: nextId++,
    type: 'area',
    areaTypeKey: key,
    x: pendingPlot.x, y: pendingPlot.y,
    w: pendingPlot.w, h: pendingPlot.h,
    color,
    name,
    customIcon: icon,
    customLabel: typeInfo.label,
    data: {},
    note: '',
    sensorVal: ''
  };

  plots.push(p);
  selectedId = p.id;
  pendingPlot = null;
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('btn-delete').style.display = 'inline-flex';
  updateList(); openDetail(p); render();
}

// ===== STATUS DASHBOARD =====
function updateDashboard() {
  const empty = document.getElementById('status-empty');
  const dash = document.getElementById('status-dashboard');
  if (!selectedId) { empty.style.display = 'block'; dash.style.display = 'none'; return; }
  const p = plots.find(pl => pl.id === selectedId);
  if (!p) return;
  empty.style.display = 'none'; dash.style.display = 'block';

  document.getElementById('dash-icon').textContent = p.customIcon || '🌿';
  document.getElementById('dash-title').textContent = p.name;
  document.getElementById('dash-type-label').textContent = p.customLabel || '—';
  const badge = document.getElementById('dash-badge');
  badge.textContent = p.customLabel || '—';
  badge.style.background = hexToRgba(p.color, 0.15);
  badge.style.color = p.color;
  badge.style.border = `1px solid ${hexToRgba(p.color, 0.3)}`;

  // Build grid cards from data
  const typeInfo = AREA_TYPES[p.areaTypeKey] || { fields: [] };
  const grid = document.getElementById('dash-grid');
  const cards = [];

  // Always show sensor val if exists
  if (p.sensorVal) {
    const sensorLabels = { rice:'ความชื้นดิน', mushroom:'ความชื้น', greenhouse:'อุณหภูมิ', fish:'ค่า DO', shrimp:'ค่า DO', chicken:'อุณหภูมิ' };
    const unit = ['greenhouse','chicken'].includes(p.areaTypeKey) ? '°C' : ['fish','shrimp'].includes(p.areaTypeKey) ? 'mg/L' : '%';
    cards.push({ label: sensorLabels[p.areaTypeKey]||'เซ็นเซอร์', value: p.sensorVal + unit, color: p.color });
  }

  typeInfo.fields.forEach(fkey => {
    const fd = FIELD_DEFS[fkey] || {};
    const val = p.data && p.data[fkey];
    if (val) cards.push({ label: fd.label || fkey, value: val, color: '#555' });
  });

  if (!cards.length) cards.push({ label: 'บันทึก', value: p.note || 'ยังไม่มีข้อมูล', color: '#888' });

  grid.innerHTML = cards.map(c => `
    <div class="dash-card">
      <div class="dash-label">${c.label}</div>
      <div class="dash-value" style="color:${c.color}">${c.value}</div>
    </div>
  `).join('');
}

// ===== UTILS =====
function hexToRgba(hex, alpha) {
  const clean = hex.replace('#','');
  const r = parseInt(clean.slice(0,2),16), g = parseInt(clean.slice(2,4),16), b = parseInt(clean.slice(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function deleteSelected() {
  plots = plots.filter(p => p.id !== selectedId);
  selectedId = null;
  document.getElementById('btn-delete').style.display = 'none';
  closeDetail();
  updateList(); render();
}

function clearAll() {
  if (!plots.length) return;
  if (confirm('ล้างแผนที่ทั้งหมด?')) {
    plots = []; selectedId = null;
    document.getElementById('btn-delete').style.display = 'none';
    closeDetail(); updateList(); resize();
  }
}

function togglePump() {
  const btn = document.getElementById('btn-pump');
  btn.classList.toggle('active');
  btn.innerHTML = btn.classList.contains('active')
    ? '<span class="material-symbols-outlined">stop_circle</span> ปิดระบบ'
    : '<span class="material-symbols-outlined">power_settings_new</span> สั่งงานระบบ';
}

// Override switchMode to trigger dashboard update in status mode
const _origSwitch = switchMode;
canvas.addEventListener('click', () => {
  if (currentMode === 'status' && selectedId) updateDashboard();
});