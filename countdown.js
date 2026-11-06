/* ALINKA.VERSE — midnight countdown, local time; original code. */
(() => {
  'use strict';
  const cfg = window.ALINKA_COUNTDOWN_CONFIG || {};
  const byId = id => document.getElementById(id);
  const gate = byId('birthdayGate');
  const film = byId('birthdayFilm');
  const video = byId('birthdayVideo');
  const testMode = new URLSearchParams(location.search).has('test');
  const params = new URLSearchParams(location.search);
  const pad = n => String(n).padStart(2, '0');
  let mode = 'clock';
  let timer = null;
  let target;
  let filmStarted = false;
  let filmErrorTimer = null;
  let testUntil = null;
  let ended = false;

  function nextMidnight(now) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  }
  function configuredMidnight() {
    // A specific calendar day is useful for links sent before the birthday.
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(cfg.targetDate || '').trim());
    if (!match) return nextMidnight(new Date());
    const year = +match[1], month = +match[2], day = +match[3];
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      console.warn('ALINKA: targetDate is invalid, using next midnight.');
      return nextMidnight(new Date());
    }
    return date;
  }
  function updateTestStatus(message) {
    const node = byId('testStatus');
    if (node) node.textContent = message;
  }
  function setClockState(difference) {
    const seconds = Math.max(0, Math.ceil(difference / 1000));
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    byId('countDays').textContent = pad(days);
    byId('countHours').textContent = pad(hours);
    byId('countMinutes').textContent = pad(minutes);
    byId('countSeconds').textContent = pad(secs);
    byId('birthdayGate').querySelector('.countdown-clock').setAttribute('aria-label', `${days} дней ${hours} часов ${minutes} минут ${secs} секунд`);
    byId('gateNow').textContent = new Intl.DateTimeFormat('ru-RU', {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  }
  function stopClock() { if (timer !== null) clearInterval(timer); timer = null; }
  function tick() {
    if (mode !== 'clock') return;
    const ms = (testUntil || target).getTime() - Date.now();
    setClockState(ms);
    if (ms <= 0) startFilm();
  }
  function startCountdown(seconds) {
    stopClock();
    filmStarted = false;
    testUntil = seconds == null ? null : new Date(Date.now() + seconds * 1000);
    mode = 'clock';
    ended = false;
    gate.hidden = false;
    gate.classList.remove('gate-leaving');
    film.hidden = true;
    film.classList.remove('film-visible');
    document.body.classList.add('birthday-locked');
    byId('gateTargetDescription').textContent = testUntil ? `Тестовый отсчёт — ${seconds} секунд` : 'Ровно в 00:00 тебя ждёт сюрприз';
    updateTestStatus(testUntil ? `Тест запущен: через ${seconds} секунд должно открыться видео.` : 'Проверка сброшена. Работает настоящий отсчёт до полуночи.');
    tick();
    timer = setInterval(tick, 200);
  }
  function revealSite() {
    if (ended) return;
    ended = true;
    stopClock();
    clearTimeout(filmErrorTimer);
    mode = 'site';
    video.pause();
    film.hidden = true;
    gate.classList.add('gate-leaving');
    document.body.classList.remove('birthday-locked');
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
    // The original site's book intro is waiting underneath.
    setTimeout(() => { gate.hidden = true; }, 1250);
  }
  function showFilmError() {
    byId('filmLoader').hidden = true;
    byId('filmMessage').hidden = true;
    byId('filmError').hidden = false;
    updateTestStatus('Не удалось открыть видео: проверь файл media/birthday.mp4');
  }
  function setSoundLabel() {
    byId('filmSoundGlyph').textContent = video.muted ? '◌' : '♫';
    byId('filmSoundText').textContent = video.muted ? 'Включить звук' : 'Выключить звук';
    byId('filmSound').setAttribute('aria-label', video.muted ? 'Включить звук видео' : 'Выключить звук видео');
  }
  async function playFilm() {
    if (mode !== 'film') return;
    byId('filmError').hidden = true;
    // Start muted to satisfy browser autoplay policies. Sound can be enabled by touch/click.
    video.muted = true;
    setSoundLabel();
    try {
      await video.play();
      byId('filmLoader').hidden = true;
      byId('filmMessage').hidden = true;
      updateTestStatus('Видео воспроизводится ✓');
    } catch (err) {
      if (mode !== 'film') return;
      byId('filmLoader').hidden = true;
      if (video.error) showFilmError();
      else byId('filmMessage').hidden = false;
      console.warn('ALINKA: user activation required or video unavailable:', err);
    }
  }
  function startFilm() {
    if (filmStarted || mode === 'site') return;
    filmStarted = true;
    mode = 'film';
    stopClock();
    byId('filmLoader').hidden = false;
    byId('filmMessage').hidden = true;
    byId('filmError').hidden = true;
    byId('filmProgressFill').style.width = '0%';
    video.pause();
    video.removeAttribute('src');
    const file = String(cfg.videoFile || 'media/birthday.mp4');
    // Cache bust so replacing the test MP4 is reflected on refresh.
    video.src = file;
    film.hidden = false;
    gate.classList.add('gate-leaving');
    video.load();
    updateTestStatus('Открываем видео: ' + file);
    clearTimeout(filmErrorTimer);
    filmErrorTimer = setTimeout(() => {
      if (mode === 'film' && video.readyState < 2 && !video.error) showFilmError();
    }, 12000);
    playFilm();
  }
  byId('filmSound').addEventListener('click', () => {
    video.muted = !video.muted;
    setSoundLabel();
  });
  byId('filmSkip').addEventListener('click', revealSite);
  byId('filmManualPlay').addEventListener('click', () => {
    video.muted = false;
    setSoundLabel();
    video.play().then(() => byId('filmMessage').hidden = true).catch(showFilmError);
  });
  byId('filmRetry').addEventListener('click', () => { filmStarted = false; startFilm(); });
  video.addEventListener('error', () => { if (mode === 'film') showFilmError(); });
  video.addEventListener('loadeddata', () => { if (mode === 'film') { clearTimeout(filmErrorTimer); byId('filmError').hidden = true; } });
  video.addEventListener('timeupdate', () => {
    if (Number.isFinite(video.duration) && video.duration > 0) byId('filmProgressFill').style.width = `${Math.max(0, Math.min(100, video.currentTime / video.duration * 100))}%`;
  });
  video.addEventListener('ended', () => {
    if (mode !== 'film') return;
    if (cfg.autoOpenSiteAfterVideo === false) {
      byId('filmMessage').hidden = false;
      byId('filmMessage').querySelector('h2').textContent = 'С днём рождения, Алинка! ♡';
      byId('filmMessage').querySelector('p').textContent = 'Теперь открой свою сказку.';
      byId('filmManualPlay').textContent = 'Посмотреть ещё раз ▶';
    } else setTimeout(revealSite, 650);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && mode === 'clock') tick();
  });

  target = configuredMidnight();
  byId('gateTests').hidden = !testMode;
  if (testMode) {
    byId('testCountdown').textContent = `▶ Отсчёт ${cfg.testCountdownSeconds || 10} секунд`;
    byId('testCountdown').addEventListener('click', () => startCountdown(Number(cfg.testCountdownSeconds) || 10));
    byId('testVideoNow').addEventListener('click', () => { filmStarted = false; startFilm(); });
    byId('testSkip').addEventListener('click', revealSite);
    byId('testReset').addEventListener('click', () => { target = configuredMidnight(); startCountdown(null); });
  }

  // The countdown always works in the visitor's device-local time.
  document.body.classList.add('birthday-locked');
  if (testMode && params.get('site') === '1') revealSite();
  else if (testMode && params.get('video') === '1') startFilm();
  else if (testMode && params.has('seconds')) startCountdown(Math.max(1, Number(params.get('seconds')) || 10));
  else startCountdown(null);
})();
