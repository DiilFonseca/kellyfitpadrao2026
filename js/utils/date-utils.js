/* ============================================================
   KellyFit Padrao 2026 — Date Utilities
   ============================================================ */
const DateUtils = {
  today() {
    return new Date().toISOString().split('T')[0];
  },

  todayKey() {
    return new Date().toDateString();
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  },

  formatDateFull(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  },

  formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  },

  getWeekKey(date) {
    const d = date || new Date();
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d - jan1) / 86400000);
    const week = Math.ceil((days + jan1.getDay() + 1) / 7);
    return d.getFullYear() + '-W' + String(week).padStart(2, '0');
  },

  getWeekDates(weekKey) {
    const [year, weekStr] = weekKey.split('-W');
    const jan1 = new Date(parseInt(year), 0, 1);
    const dayOfWeek = jan1.getDay();
    const startDate = new Date(jan1);
    startDate.setDate(jan1.getDate() + (parseInt(weekStr) - 1) * 7 - dayOfWeek + 1);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  },

  getDayName(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'short' });
  },

  getDayNameFull(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'long' });
  },

  daysUntil(dateStr) {
    const target = new Date(dateStr);
    const now = new Date();
    return Math.ceil((target - now) / (24 * 60 * 60 * 1000));
  },

  daysBetween(date1, date2) {
    return Math.abs(Math.ceil((new Date(date2) - new Date(date1)) / (24 * 60 * 60 * 1000)));
  },

  addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  },

  isToday(dateStr) {
    return dateStr === this.today();
  },

  getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  },

  getLast14Days() {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }
};
