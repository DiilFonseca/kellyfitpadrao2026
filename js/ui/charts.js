/* ============================================================
   KellyFit Padrao 2026 — SVG Charts Engine
   ============================================================ */
const Charts = {

  // ---- Line Chart ----
  renderLine(container, data, options) {
    if (!container || !data || !data.length) { container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">Sem dados ainda</p>'; return; }
    const opt = Object.assign({ width: container.offsetWidth || 400, height: 200, color: 'var(--primary-500)', gradient: true, dots: true, label: '' }, options || {});
    const pad = { top: 20, right: 16, bottom: 40, left: 40 };
    const W = opt.width - pad.left - pad.right;
    const H = opt.height - pad.top - pad.bottom;

    const vals = data.map(d => d.value);
    const minV = Math.min(...vals);
    const maxV = Math.max(...vals);
    const range = maxV - minV || 1;

    const sx = (i) => pad.left + (i / (data.length - 1 || 1)) * W;
    const sy = (v) => pad.top + H - ((v - minV) / range) * H;

    const pts = data.map((d, i) => ({ x: sx(i), y: sy(d.value), ...d }));
    const path = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
    const areaPath = `${path} L${pts[pts.length - 1].x},${pad.top + H} L${pts[0].x},${pad.top + H} Z`;

    const gid = 'grad-' + Math.random().toString(36).substr(2, 6);
    let svgHTML = `<svg class="chart-svg" viewBox="0 0 ${opt.width} ${opt.height}" aria-label="${opt.label}" role="img">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--primary-500)" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="var(--primary-500)" stop-opacity="0"/>
        </linearGradient>
      </defs>`;

    // Grid lines
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const y = pad.top + (H / gridCount) * i;
      const v = maxV - (range / gridCount) * i;
      svgHTML += `<line class="chart-grid-line" x1="${pad.left}" y1="${y}" x2="${pad.left + W}" y2="${y}"/>`;
      svgHTML += `<text class="chart-axis-label" x="${pad.left - 6}" y="${y + 4}" text-anchor="end">${v.toFixed(1)}</text>`;
    }

    // X labels (show max 7)
    const step = Math.max(1, Math.floor(data.length / 7));
    pts.forEach((p, i) => {
      if (i % step === 0 || i === data.length - 1) {
        svgHTML += `<text class="chart-axis-label" x="${p.x}" y="${pad.top + H + 16}" text-anchor="middle">${data[i].label || ''}</text>`;
      }
    });

    if (opt.gradient) svgHTML += `<path class="chart-area" d="${areaPath}" fill="url(#${gid})"/>`;
    svgHTML += `<path class="chart-line" d="${path}" stroke="var(--primary-500)"/>`;

    if (opt.dots) {
      pts.forEach((p, i) => {
        svgHTML += `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="4" fill="var(--primary-500)" data-idx="${i}"/>`;
      });
    }
    svgHTML += '</svg>';

    container.innerHTML = svgHTML;
    this._bindLinTooltip(container, pts, data, opt);
  },

  _bindLinTooltip(container, pts, data, opt) {
    const dots = container.querySelectorAll('.chart-dot');
    let tooltip = null;

    dots.forEach((dot, i) => {
      dot.addEventListener('mouseenter', (e) => {
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'chart-tooltip';
          container.style.position = 'relative';
          container.appendChild(tooltip);
        }
        const p = pts[i];
        tooltip.innerHTML = `<div class="tooltip-label">${data[i].label || ''}</div><div class="tooltip-value">${data[i].value}${opt.unit || ''}</div>`;
        tooltip.style.left = (p.x + 10) + 'px';
        tooltip.style.top = (p.y - 20) + 'px';
        tooltip.style.opacity = '1';
      });
      dot.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.style.opacity = '0';
      });
    });
  },

  // ---- Bar Chart ----
  renderBar(container, data, options) {
    if (!container || !data || !data.length) { container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">Sem dados</p>'; return; }
    const opt = Object.assign({ width: container.offsetWidth || 400, height: 180, colors: ['var(--primary-500)', 'var(--secondary-500)', 'var(--accent-500)'], label: '' }, options || {});
    const pad = { top: 16, right: 8, bottom: 36, left: 44 };
    const W = opt.width - pad.left - pad.right;
    const H = opt.height - pad.top - pad.bottom;
    const maxV = Math.max(...data.map(d => d.value)) || 1;
    const barW = Math.max(8, W / data.length - 6);

    let svgHTML = `<svg class="chart-svg" viewBox="0 0 ${opt.width} ${opt.height}" aria-label="${opt.label}" role="img">`;

    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const y = pad.top + (H / gridCount) * i;
      const v = maxV - (maxV / gridCount) * i;
      svgHTML += `<line class="chart-grid-line" x1="${pad.left}" y1="${y}" x2="${pad.left + W}" y2="${y}"/>`;
      svgHTML += `<text class="chart-axis-label" x="${pad.left - 6}" y="${y + 4}" text-anchor="end">${Math.round(v)}</text>`;
    }

    data.forEach((d, i) => {
      const x = pad.left + (i / data.length) * W + (W / data.length - barW) / 2;
      const bH = Math.max(2, (d.value / maxV) * H);
      const y = pad.top + H - bH;
      const color = Array.isArray(opt.colors) ? opt.colors[i % opt.colors.length] : opt.colors;
      svgHTML += `<rect class="chart-bar" x="${x}" y="${y}" width="${barW}" height="${bH}" fill="${color}" rx="4" data-idx="${i}" data-val="${d.value}"/>`;
      svgHTML += `<text class="chart-axis-label" x="${x + barW / 2}" y="${pad.top + H + 16}" text-anchor="middle">${d.label || ''}</text>`;
    });

    svgHTML += '</svg>';
    container.innerHTML = svgHTML;
    this._bindBarTooltip(container, data, opt);
  },

  _bindBarTooltip(container, data, opt) {
    container.style.position = 'relative';
    let tooltip = null;
    container.querySelectorAll('.chart-bar').forEach((bar) => {
      bar.addEventListener('mouseenter', (e) => {
        if (!tooltip) { tooltip = document.createElement('div'); tooltip.className = 'chart-tooltip'; container.appendChild(tooltip); }
        const i = parseInt(bar.getAttribute('data-idx'));
        tooltip.innerHTML = `<div class="tooltip-label">${data[i].label}</div><div class="tooltip-value">${data[i].value}${opt.unit || ''}</div>`;
        const rect = bar.getBoundingClientRect();
        const pRect = container.getBoundingClientRect();
        tooltip.style.left = (rect.left - pRect.left + rect.width / 2 - 50) + 'px';
        tooltip.style.top = (rect.top - pRect.top - 50) + 'px';
        tooltip.style.opacity = '1';
      });
      bar.addEventListener('mouseleave', () => { if (tooltip) tooltip.style.opacity = '0'; });
    });
  },

  // ---- Ring / Donut Chart ----
  renderRing(container, segments, options) {
    const opt = Object.assign({ size: 120, strokeWidth: 14 }, options || {});
    const R = (opt.size / 2) - opt.strokeWidth;
    const cx = opt.size / 2;
    const circ = 2 * Math.PI * R;
    const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

    let offset = 0;
    let svgHTML = `<svg class="chart-svg" width="${opt.size}" height="${opt.size}" viewBox="0 0 ${opt.size} ${opt.size}" role="img" aria-label="Grafico de macros">`;
    svgHTML += `<circle class="ring-track" cx="${cx}" cy="${cx}" r="${R}"/>`;

    segments.forEach(seg => {
      const pct = seg.value / total;
      const dash = pct * circ;
      svgHTML += `<circle class="ring-fill" cx="${cx}" cy="${cx}" r="${R}" stroke="${seg.color}"
        stroke-dasharray="${dash} ${circ - dash}"
        stroke-dashoffset="${-offset * circ + circ / 4}"
        style="transform-origin:${cx}px ${cx}px"/>`;
      offset += pct;
    });

    if (options && options.centerText) {
      svgHTML += `<text class="ring-center-text" x="${cx}" y="${cx - 4}" text-anchor="middle" fill="var(--text-primary)" font-size="16">${options.centerText}</text>`;
      svgHTML += `<text class="ring-center-label" x="${cx}" y="${cx + 14}" text-anchor="middle">${options.centerLabel || ''}</text>`;
    }
    svgHTML += '</svg>';
    container.innerHTML = svgHTML;
  },

  // ---- Radial Progress ----
  renderRadial(container, value, max, color, size) {
    size = size || 80;
    color = color || 'var(--primary-500)';
    const R = size / 2 - 8;
    const circ = 2 * Math.PI * R;
    const pct = Math.min(value / (max || 1), 1);
    const dash = pct * circ;

    container.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="radial-track" cx="${size / 2}" cy="${size / 2}" r="${R}" stroke-width="8"/>
      <circle class="radial-fill" cx="${size / 2}" cy="${size / 2}" r="${R}" stroke="${color}" stroke-width="8"
        stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${circ / 4}"
        style="transform-origin:${size / 2}px ${size / 2}px"/>
    </svg>`;
  }
};
