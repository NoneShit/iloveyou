/* ALINKA.VERSE — a personal, unofficial fan tribute.
   Original site code and interactions. Character names and externally linked artwork
   are the property of their respective owners: see THIRD_PARTY_NOTICES.md.
*/
'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const worlds = [
 {id:'monster',title:'Monster High',subtitle:'Школа, где быть собой — суперсила',char:'Дракулаура, Фрэнки, Клодин, Лагуна, Клео',glyph:'🦇',accent:'#dd79ae',dark:'#3b224c',owner:'Mattel',img:'https://clipart-library.com/2023/41-418551_lagoona-blue-from-monster-high-hd-png-download.png',source:'https://clipart-library.com/clipart/lagoona-cliparts-41.htm',wish:'Будь такой же яркой, непохожей ни на кого и бесстрашно прекрасной. В тебе нет ни одной черты, которую нужно прятать. Твоя уникальность — твоя магия.'},
 {id:'winx',title:'Winx Club',subtitle:'Верь в магию внутри себя',char:'Блум, Стелла, Флора, Муза, Текна, Лейла',glyph:'🧚',accent:'#ef9ac7',dark:'#794580',owner:'Rainbow S.p.A.',img:'https://2.bp.blogspot.com/-EwMEgGxnL1k/U1Fvq_8e8fI/AAAAAAAAA4Y/QqC7-XjW1ZM/s1600/Love2_Group_1280x1024-1.jpg',source:'https://naminyni.blogspot.com/p/was-ist-winx-club.html',wish:'Пусть твои мечты однажды станут крыльями. Пусть рядом будут люди, с которыми даже самая сложная битва превращается в приключение. И помни: самая сильная магия — в тебе.'},
 {id:'pony',title:'My Little Pony',subtitle:'Дружба — это магия',char:'Твайлайт, Пинки Пай, Флаттершай, Рэйнбоу Дэш, Рарити, Эпплджек',glyph:'🦄',accent:'#bd9afb',dark:'#5b3b89',owner:'Hasbro',img:'https://commons.wikimedia.org/wiki/Special:FilePath/My_Little_Pony_characters.png',source:'https://commons.wikimedia.org/wiki/File:My_Little_Pony_characters.png',wish:'Пусть твоя жизнь будет раскрашена всеми цветами радуги. Желаю тебе друзей, с которыми можно смеяться до слёз, быть собой без страха и творить маленькие чудеса каждый день.'},
 {id:'princess',title:'Disney Princesses',subtitle:'Твоя история — только твоя',char:'Рапунцель, Ариэль, Белль, Тиана, Жасмин, Золушка',glyph:'👑',accent:'#f4cba8',dark:'#88627f',owner:'The Walt Disney Company',img:'https://s3.stroi-news.ru/img/kartinki-disneevskikh-printsess-1.jpg',source:'https://stroi-news.ru/articles/kartinki-disneevskih-princess/',wish:'Принцессой делает не корона, а то, как ты умеешь любить, мечтать и не сдаваться. Пусть твоя собственная сказка будет ещё красивее любой истории на экране.'},
 {id:'stitch',title:'Lilo & Stitch',subtitle:'Охана — значит семья',char:'Лило, Стич, Нани, Ангел',glyph:'🌺',accent:'#7ec9d5',dark:'#30516c',owner:'The Walt Disney Company',img:'https://i.pinimg.com/originals/f0/a2/9c/f0a29cb02cdac1519ee8e215b20575d5.png',source:'https://www.pinterest.com/pin/638033472191925144/',wish:'Желаю тебе людей, с которыми можно быть самой смешной, самой странной и самой настоящей. Пусть тебя всегда находят, обнимают и никогда не оставляют одну.'},
 {id:'spies',title:'Totally Spies!',subtitle:'Три подруги. Тысяча приключений.',char:'Сэм, Кловер, Алекс',glyph:'💄',accent:'#f37eb1',dark:'#822e65',owner:'Banijay / Zodiak Kids (права могут различаться)',img:'https://intheirownleague.com/wp-content/uploads/2020/08/totally-spies.jpg?w=1024',source:'https://intheirownleague.com/2020/08/08/top-10-animated-female-action-heroes/',wish:'Пусть в жизни будет больше ярких выходов, спонтанных поездок, верных подруг и моментов, когда хочется сказать: «Вот это приключение!» А стиль пусть всегда будет твоим.'},
 {id:'everafter',title:'Ever After High',subtitle:'Сама выбирай свою судьбу',char:'Рэйвен Квин, Эппл Уайт, Мэдлин Хэттер, Брайар Бьюти',glyph:'📖',accent:'#de93c6',dark:'#5e2b70',owner:'Mattel',img:'https://www.youloveit.ru/uploads/gallery/main/654/youloveit_ru_ever_after_high_kartinki129.jpg',source:'https://www.youloveit.ru/gallery/ever_after_high_kartinki/103357-ever-after-high-82.html',wish:'Никто не имеет права писать твою историю вместо тебя. Выбирай мечту, меняй сценарий, перечёркивай скучные правила — и будь счастливой в своей версии «долго и счастливо».'},
 {id:'gravity',title:'Gravity Falls',subtitle:'Странности делают мир интереснее',char:'Мэйбл, Диппер, Пухля, Стэн, Венди',glyph:'🌲',accent:'#e6b17a',dark:'#655075',owner:'The Walt Disney Company',img:'https://papik.pro/izobr/uploads/posts/2023-03/1679410245_papik-pro-p-graviti-folz-kartina-10.jpg',source:'https://papik.pro/izobr/kartiny/24797-graviti-folz-kartina-49-foto.html',wish:'Пусть ты никогда не теряешь любопытства. Сохрани привычку находить чудеса в странных мелочах и смеяться так искренне, как умеет только Мэйбл.'},
 {id:'spongebob',title:'SpongeBob',subtitle:'Самое смешное — впереди',char:'Губка Боб, Патрик, Сэнди, Сквидвард',glyph:'🫧',accent:'#ffe085',dark:'#647995',owner:'Nickelodeon / Paramount',img:'https://commons.wikimedia.org/wiki/Special:FilePath/SpongeBob_SquarePants_character_montage.png',source:'https://commons.wikimedia.org/wiki/File:SpongeBob_SquarePants_character_montage.png',wish:'Желаю, чтобы в твоей жизни всегда были поводы смеяться от души, друзья для самых глупых шуток и воскресенья, когда всё прекрасно просто потому, что оно есть.'},
 {id:'powerpuff',title:'Powerpuff Girls',subtitle:'Сахар, специи и всё чудесное',char:'Цветик, Пузырёк, Пестик',glyph:'💗',accent:'#f5a8c6',dark:'#814869',owner:'Cartoon Network / Warner Bros. Discovery',img:'https://s.animeanime.jp/imgs/p/64XVvff3mD9cFhi_PU1_DqGg_6ytrq_oqaqr/88869.jpg?zoom=spacing',source:'https://animeanime.jp/article/2016/06/16/29029.html',wish:'Ты можешь быть нежной и сильной одновременно. Ты можешь спасать свой мир в красивом платье. И пусть тебе всегда хватает сил выбирать себя.'},
 {id:'kim',title:'Kim Possible',subtitle:'Для тебя нет невыполнимого',char:'Ким, Рон, Руфус',glyph:'🕶️',accent:'#a9d87c',dark:'#3e6855',owner:'The Walt Disney Company',img:'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak%3D/v3/t/assets/p9152550_b_v8_aa.jpg',source:'https://www.rottentomatoes.com/tv/kim_possible/s04',wish:'Не бойся ставить себе большие цели. Ты способна на куда большее, чем иногда думаешь. Мир большой — и в нём обязательно найдётся место для твоих невероятных побед.'},
 {id:'witch',title:'W.I.T.C.H.',subtitle:'Пять сердец. Одна магия.',char:'Уилл, Ирма, Тарани, Корнелия, Хай Лин',glyph:'🌙',accent:'#bd93b7',dark:'#494073',owner:'The Walt Disney Company / другие правообладатели адаптации',img:'https://www.meer.com/attachments/8886169a71934c7062734eb70662a91af72fad9c/store/fill/1090/818/57047bce8f6a1d50847e525a29a8d6aeb08eb13d33c3b28ff1d034298d5e/Witch-the-cartoon-2004-Each-girl-has-a-power-associated-with-one-of-the-four-elements-except.jpg',source:'https://www.meer.com/en/71752-w-dot-i-t-dot-c-h',wish:'Пусть в тебе всегда горит твоя стихия. Иногда мир кажется слишком сложным, но внутри тебя столько тепла, храбрости и красоты, что ты справишься.'},
 {id:'ladybug',title:'Miraculous',subtitle:'Быть героиней можно каждый день',char:'Леди Баг, Супер-Кот, Маринетт, Адриан',glyph:'🐞',accent:'#fb869f',dark:'#69365d',owner:'Miraculous Corp. / правообладатели франшизы',img:'https://www.youloveit.ru/uploads/gallery/main/836/youloveit_ru_miraculous_ladybug_pictures_5.jpg',source:'https://www.youloveit.ru/gallery/miraculous_tales_of_ladybug_and_cat_noir/120142-ledi-bag-i-super-kot-i-marinet-i-adrian.html',wish:'Пусть в твоём сердце всегда будет место для сумасшедших влюблённостей, смелых поступков и секретов со счастливым концом. Ты уже главная героиня.'},
 {id:'barbie',title:'Barbie',subtitle:'Ты можешь быть кем угодно',char:'Принцесса Аннелиза, Эрика и сказочные героини',glyph:'🎀',accent:'#f4b2d4',dark:'#a05283',owner:'Mattel',img:'https://www.rikrek.com/data/movies/pictures/125834/1024/BtkoXFhMaLFFIZvy8YZ4lFijIeY.jpg',source:'https://www.rikrek.com/de/film/barbie-als-die-prinzessin-und-das-dorfmaedchen/125834/',wish:'Ты можешь быть нежной, амбициозной, смешной, серьёзной, творческой — любой. И тебе никогда не придётся выбирать только одну версию себя.'},
 {id:'adventure',title:'Adventure Time',subtitle:'Время новых историй',char:'Финн, Джейк, Бубльгум, Марселин, БиМО',glyph:'⚔️',accent:'#f4c184',dark:'#5a537e',owner:'Cartoon Network / Warner Bros. Discovery',img:'https://www.empireposter.de/media/image/product/194345/lg/adventure-time-poster-collage_1.png',source:'https://www.empireposter.de/Adventure-Time-Poster-Collage_1',wish:'Желаю тебе приключений, которые однажды станут любимыми историями, и таких друзей, с которыми даже обычная прогулка превращается в нечто легендарное.'},
 {id:'frozen',title:'Frozen',subtitle:'Сияй. Не прячь своё сердце.',char:'Эльза, Анна, Олаф',glyph:'❄️',accent:'#add7f5',dark:'#426783',owner:'The Walt Disney Company',img:'https://www.youloveit.com/uploads/posts/2017-08/1503136273_youloveit_com_disney_frozen_new_pictures_2018_1107.jpg',source:'https://www.youloveit.com/cartoons/131-disney-frozen-new-official-pictures-for-2017-2018-including-some-olafs-frozen-adventure-images.html',wish:'Пусть тебе никогда не придётся уменьшать себя, чтобы кому-то было удобно. Смей мечтать громко, любить искренне и сиять так сильно, как хочется.'},
 {id:'tangled',title:'Tangled',subtitle:'Следуй за своими фонариками',char:'Рапунцель, Юджин, Паскаль, Максимус',glyph:'🏮',accent:'#f6ce8a',dark:'#72508a',owner:'The Walt Disney Company',img:'https://www.mundiario.com/asset/thumbnail%2C1280%2C720%2Ccenter%2Ccenter/media/mundiario/images/2017/02/18/2017021815122616063.jpg',source:'https://www.mundiario.com/articulo/cultura/disney-prepara-live-action-enredados/20200219054423175986.html',wish:'Пусть однажды перед тобой зажгутся тысячи фонариков — тысячи маленьких доказательств, что всё, о чём ты мечтаешь, может оказаться настоящим.'},
 {id:'tomjerry',title:'Tom & Jerry',subtitle:'Смех — тоже настоящее чудо',char:'Том и Джерри',glyph:'🐭',accent:'#e9b18e',dark:'#466078',owner:'Warner Bros. Entertainment',img:'https://clipart-library.com/images/gceA9aX6i.jpg',source:'https://clipart-library.com/clipart/gceA9aX6i.htm',wish:'Желаю тебе побольше лёгкости. Чтобы можно было дурачиться, ошибаться, смеяться над собой и всё равно знать: в твоём мире тебя очень любят.'}
];
const reasons = [
 'Потому что твоя улыбка делает даже обычный день особенным.',
 'Потому что ты умеешь превращать мелочи в воспоминания.',
 'Потому что в тебе столько тепла, что им можно согреть зиму.',
 'Потому что ты красивая даже тогда, когда сама этого не замечаешь.',
 'Потому что с тобой хочется смеяться над полнейшей ерундой.',
 'Потому что ты можешь быть нежной и невероятно сильной.',
 'Потому что у тебя есть свои милые странности.',
 'Потому что твои мечты заслуживают исполняться.',
 'Потому что рядом с тобой уютнее быть собой.',
 'Потому что ты не обязана быть похожей ни на кого.',
 'Потому что твоё счастье — действительно важная вещь.',
 'Потому что ты заслуживаешь самых красивых историй.',
 'Потому что твоё сердце умеет чувствовать по-настоящему.',
 'Потому что впереди у тебя столько прекрасного.',
 'Потому что тебе очень идут счастливые глаза.',
 'Потому что даже маленькая ты уже была волшебством.',
 'Потому что тебе можно быть любой — и тебя всё равно будут любить.',
 'Потому что ты — Алинка. И другой такой нет. ♡'
];
const fortunes = [
 'В ближайшей главе жизни тебя ждёт момент, о котором ты будешь вспоминать с улыбкой ещё очень долго.',
 'Одна из твоих самых смелых мечтаний гораздо ближе, чем кажется. Не переставай в неё верить.',
 'Впереди тебя ждут объятия, от которых мир станет тише, а сердце — спокойнее.',
 'Твоя суперсила на этот год: превращать случайные дни в любимые воспоминания.',
 'Скоро ты поймёшь, что всё самое красивое в твоей жизни только-только начинается.',
 'Секретное предсказание: кто-то очень сильно хочет, чтобы ты была счастлива. И этот кто-то рядом. ♡',
 'Вселенная официально разрешает тебе мечтать дерзко, смеяться громко и быть собой на все сто.',
 'Этот год принесёт тебе много маленьких чудес. Главное — не проходить мимо них.'
];
const collected = new Set(safeGet('alinkaverse_stars', []));
let activeWorld = null;
let previousFocus = null;
let secretClicks = 0;
let candlesRemaining = 18;
let lastFortune = -1;
function safeGet(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function safeSet(key, value){try{localStorage.setItem(key,JSON.stringify(value))}catch{/* file:// restrictions; site remains usable */}}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.remove('visible'),3000)}

/* 18 portals */
const worldGrid=$('#worldGrid');
worldGrid.innerHTML=worlds.map((w,i)=>`<button type="button" class="world-card ${collected.has(w.id)?'collected':''}" data-world="${w.id}" style="--cardAccent:${w.accent};--cardDark:${w.dark}" aria-label="Открыть мир ${escapeHTML(w.title)}"><div class="world-fallback">${w.glyph}</div><img src="${escapeHTML(w.img)}" alt="Герои мультфильма ${escapeHTML(w.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"><div class="world-top"><span class="world-number">PORTAL ${String(i+1).padStart(2,'0')}</span><span class="world-check">${collected.has(w.id)?'✓':'✧'}</span></div><div class="world-info"><small>${escapeHTML(w.subtitle)}</small><strong>${escapeHTML(w.title)}</strong><div class="world-prompt"><span>${collected.has(w.id)?'Звёздочка найдена':'Открыть послание'}</span><span class="world-arrow">↗</span></div></div></button>`).join('');
worldGrid.addEventListener('click',event=>{const card=event.target.closest('[data-world]');if(!card)return;openWorld(card.dataset.world)});
function updateProgress(){const n=collected.size;$('#topCollected').textContent=n;$('#progressFill').style.width=`${n/18*100}%`;$('#progressText').textContent=`${n} из 18 открыто`}
updateProgress();
function openWorld(id){const world=worlds.find(w=>w.id===id);if(!world)return;activeWorld=world;$('#worldModalLabel').textContent=`ПОРТАЛ ${String(worlds.indexOf(world)+1).padStart(2,'0')} / 18`;
 $('#worldModalTitle').textContent=world.title;$('#worldModalCharacters').textContent=`Здесь живут: ${world.char}`;$('#worldModalWish').textContent=`«${world.wish}»`;
 const visual=$('#worldModalImage');visual.style.setProperty('--modal-accent',world.accent);visual.innerHTML=`<div class="modal-image-fallback">${world.glyph}</div><img src="${escapeHTML(world.img)}" alt="${escapeHTML(world.title)}" referrerpolicy="no-referrer" onerror="this.remove()">`;
 const btn=$('#collectBtn');btn.textContent=collected.has(id)?'Эта звёздочка уже твоя ✓':'Забрать свою звёздочку ✦';btn.disabled=collected.has(id);openModal('worldModal')}
$('#collectBtn').addEventListener('click',()=>{if(!activeWorld||collected.has(activeWorld.id))return;collected.add(activeWorld.id);safeSet('alinkaverse_stars',[...collected]);updateProgress();const card=$(`[data-world="${activeWorld.id}"]`);if(card){card.classList.add('collected');$('.world-check',card).textContent='✓';$('.world-prompt span:first-child',card).textContent='Звёздочка найдена'};$('#collectBtn').textContent='Эта звёздочка уже твоя ✓';$('#collectBtn').disabled=true;showToast(`✦ Звёздочка из ${activeWorld.title} уже твоя!`);burst(window.innerWidth/2,window.innerHeight/2,48);if(collected.size===18){setTimeout(()=>{closeModal('worldModal');openSecret(true)},850)}});

/* 18 little love notes */
const reasonGrid=$('#reasonsGrid');
reasonGrid.innerHTML=reasons.map((r,i)=>`<button type="button" class="reason-card" data-reason="${i}" aria-label="Открыть причину ${i+1}" aria-pressed="false"><span class="reason-number">${String(i+1).padStart(2,'0')}</span><span class="reason-glyph">${['✧','♡','✦','❀','⋆','♕'][i%6]}</span><span class="reason-hint">нажми, чтобы открыть ↗</span></button>`).join('');
reasonGrid.addEventListener('click',event=>{const card=event.target.closest('[data-reason]');if(!card)return;const id=Number(card.dataset.reason);const flipped=card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(flipped));card.innerHTML=flipped?`<span class="reason-number">${String(id+1).padStart(2,'0')}</span><span class="reason-reveal">${escapeHTML(reasons[id])}</span><span class="reason-hint">♡ для тебя</span>`:`<span class="reason-number">${String(id+1).padStart(2,'0')}</span><span class="reason-glyph">${['✧','♡','✦','❀','⋆','♕'][id%6]}</span><span class="reason-hint">нажми, чтобы открыть ↗</span>`;if(flipped&&id===17){burst(window.innerWidth/2,window.innerHeight/2,34)}});

/* Oracle */
$('#fortuneBtn').addEventListener('click',()=>{let index;do{index=Math.floor(Math.random()*fortunes.length)}while(index===lastFortune&&fortunes.length>1);lastFortune=index;$('#fortuneText').textContent=fortunes[index];$('.fortune-orb-inside').textContent=['✦','✧','♡','☾'][index%4];burst(window.innerWidth/2,window.innerHeight/2,20);if(!reducedMotion){$('.fortune-orb').animate([{transform:'scale(.87) rotate(-8deg)'},{transform:'scale(1.1) rotate(7deg)'},{transform:'scale(1) rotate(0deg)'}],{duration:650,easing:'ease-out'})}});

/* Small personality quiz */
const quizResults={fairy:{title:'Ты — фея свободного сердца 🧚',desc:'У тебя есть то, чему не научит ни одна школа магии: смелость быть настоящей. Твои крылья — это твои мечты.'},princess:{title:'Ты — принцесса собственной истории 👑',desc:'Ты умеешь находить красоту там, где другие её не замечают. Ты сама выбираешь, какой будет твоя сказка.'},rebel:{title:'Ты — легенда своего королевства 💖',desc:'Мир точно не будет скучным, пока в нём есть ты. Создавай свои правила и не бойся сиять.'}};
$('#quizOptions').addEventListener('click',e=>{const button=e.target.closest('[data-result]');if(!button)return;const r=quizResults[button.dataset.result];$('#quizOptions').hidden=true;const result=$('#quizResult');result.innerHTML=`<strong>${escapeHTML(r.title)}</strong>${escapeHTML(r.desc)}<button type="button" id="restartQuiz">Попробовать ещё раз ↻</button>`;result.hidden=false;$('#quizPrompt').textContent='Волшебное зеркало уже знает ответ!';burst(window.innerWidth*.75,window.innerHeight*.5,24)});
$('#quizResult').addEventListener('click',e=>{if(!e.target.closest('#restartQuiz'))return;$('#quizOptions').hidden=false;$('#quizResult').hidden=true;$('#quizPrompt').textContent='Представь: ты попала в волшебное королевство. Что сделаешь первым делом?'});

/* 18 tiny candles */
const candleHolder=$('#candles');
candleHolder.innerHTML=Array.from({length:18},(_,i)=>`<button class="candle" type="button" data-candle="${i}" aria-label="Задуть свечу ${i+1}"><span class="flame"></span></button>`).join('');
function extinguish(candle){if(candle.classList.contains('out'))return;candle.classList.add('out');candle.disabled=true;candlesRemaining--;$('#candleStatus').textContent=candlesRemaining?`Свечей горит: ${candlesRemaining}`:'Все 18 свечей погасли. Желание услышано! ♡';const box=candle.getBoundingClientRect();burst(box.left+box.width/2,box.top,9);if(candlesRemaining===0)finishCake()}
function finishCake(){showToast('Твоё желание уже летит к звёздам ✨');burst(window.innerWidth*.5,window.innerHeight*.43,130);setTimeout(()=>burst(window.innerWidth*.3,window.innerHeight*.28,95),450);setTimeout(()=>burst(window.innerWidth*.7,window.innerHeight*.27,95),800);$('#blowAll').textContent='Зажечь ещё раз ✧';$('#blowAll').dataset.relight='yes'}
candleHolder.addEventListener('click',e=>{const b=e.target.closest('[data-candle]');if(b)extinguish(b)});
$('#blowAll').addEventListener('click',()=>{if($('#blowAll').dataset.relight==='yes'){$$('.candle').forEach(b=>{b.disabled=false;b.classList.remove('out')});candlesRemaining=18;$('#candleStatus').textContent='Свечей горит: 18';$('#blowAll').dataset.relight='';$('#blowAll').textContent='Задуть все разом ✨';return}$$('.candle:not(.out)').forEach(extinguish)});

/* Dialogs */
function openModal(id){previousFocus=document.activeElement;const m=$('#'+id);m.classList.add('active');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>$('.modal-close',m)?.focus(),40)}
function closeModal(id){const m=$('#'+id);m.classList.remove('active');m.setAttribute('aria-hidden','true');if(!$('.modal.active'))document.body.classList.remove('modal-open');if(previousFocus?.focus)previousFocus.focus()}
$$('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal.active').forEach(m=>closeModal(m.id));if(e.key==='Tab'){const m=$('.modal.active');if(!m)return;const nodes=$$('button:not([disabled]),a[href]',m).filter(x=>x.getClientRects().length);if(!nodes.length)return;const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
$('#openLetter').addEventListener('click',()=>{openModal('letterModal');burst(window.innerWidth/2,window.innerHeight/2,35)});
$('#letterFireworks').addEventListener('click',()=>{burst(window.innerWidth*.3,window.innerHeight*.4,75);setTimeout(()=>burst(window.innerWidth*.7,window.innerHeight*.5,75),350)});
$('#shareBtn').addEventListener('click',async()=>{try{if(navigator.share&&location.protocol!=='file:'){await navigator.share({title:'Алинка, с 18-летием! ✨',text:'Я приготовил для тебя маленькую сказочную вселенную.',url:location.href})}else if(navigator.clipboard&&location.protocol!=='file:'){await navigator.clipboard.writeText(location.href);showToast('Ссылка скопирована ♡')}else{showToast('Поделись папкой сайта или опубликуй её онлайн, чтобы получить ссылку ♡')}}catch(e){if(e.name!=='AbortError')showToast('Не получилось поделиться — можно отправить ссылку вручную')}});

/* Easter eggs */
function openSecret(completed=false){$('#secretTitle').textContent=completed?'Ты собрала все 18 звёзд!':'Тсс… ты нашла тайну!';$('.secret-panel p').textContent=completed?'Все 18 миров открыты, но самое главное чудо не в них. Самое главное — что ты есть. Пусть твои следующие 18 лет будут ещё ярче, теплее и счастливее, чем все сказки вместе.':'Даже если весь мир вдруг перестанет верить в сказки, я всё равно буду верить в твою. Потому что в ней есть ты. И это самое настоящее чудо.';openModal('secretModal');burst(window.innerWidth/2,window.innerHeight/2,65)}
$('#heroSurprise').addEventListener('click',()=>{burst(window.innerWidth*.42,window.innerHeight*.38,48);showToast('Сюрприз: ты — самое красивое чудо этого мира! ♡')});
let secretSequence='';document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.key.length!==1)return;secretSequence=(secretSequence+e.key.toLowerCase()).slice(-9);if(secretSequence.includes('алинка')||secretSequence.includes('alinka')){secretSequence='';openSecret()}});
$('.footer-heart').addEventListener('click',()=>{secretClicks++;if(secretClicks>=3){secretClicks=0;openSecret()}else if(secretClicks===1)showToast('Ты заметила сердечко… а если ещё раз? ♡')});$('.footer-heart').setAttribute('title','Здесь прячется тайна');$('.footer-heart').setAttribute('role','button');$('.footer-heart').setAttribute('tabindex','0');$('.footer-heart').setAttribute('aria-label','Секретное сердечко');$('.footer-heart').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('.footer-heart').click()}});

/* Entrance */
document.body.classList.add('intro-active');
$('#enterBtn').addEventListener('click',()=>{$('#intro').classList.add('hidden');document.body.classList.remove('intro-active');burst(window.innerWidth/2,window.innerHeight/2,110);showToast('Добро пожаловать в свою сказку, Алинка! ✦');setTimeout(()=>$('#intro').remove(),1300)});

/* Scroll appearance */
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});$$('.reveal').forEach(el=>observer.observe(el))}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}

/* Ambient synth score: original short arpeggio, no third-party recordings. No autoplay. */
let audioContext, musicTimer, melodyIndex=0;
const melody=[0,4,7,11,12,7,4,7,2,5,9,12,14,9,5,9,-1,2,7,11,12,7,2,7,-3,0,4,7,12,7,4,0];
const frequencies=melody.map(step=>261.6256*Math.pow(2,step/12));
function playNote(freq){if(!audioContext)return;const now=audioContext.currentTime;const osc=audioContext.createOscillator();const gain=audioContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,now);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.037,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.5);osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+.52)}
function stopMusic(){clearInterval(musicTimer);musicTimer=null;$('#soundBtn').classList.remove('sound-on');$('#soundBtn').setAttribute('aria-label','Включить музыку');$('#soundBtn').title='Включить музыку'}
$('#soundBtn').addEventListener('click',async()=>{if(musicTimer){stopMusic();return}try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();await audioContext.resume();playNote(frequencies[melodyIndex++%frequencies.length]);musicTimer=setInterval(()=>playNote(frequencies[melodyIndex++%frequencies.length]),405);$('#soundBtn').classList.add('sound-on');$('#soundBtn').setAttribute('aria-label','Выключить музыку');$('#soundBtn').title='Выключить музыку';showToast('Волшебная мелодия включена ✧')}catch{showToast('Этот браузер не разрешил включить музыку')}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&musicTimer)stopMusic()});

/* Starfield + celebratory particles */
const canvas=$('#particles');const ctx=canvas.getContext('2d');const sparks=[];const ambient=[];let vw=innerWidth,vh=innerHeight,lastTime=0;
function resize(){vw=innerWidth;vh=innerHeight;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(vw*dpr);canvas.height=Math.round(vh*dpr);canvas.style.width=vw+'px';canvas.style.height=vh+'px';ctx.setTransform(dpr,0,0,dpr,0,0);ambient.length=0;if(!reducedMotion){for(let i=0;i<Math.min(65,Math.floor(vw*vh/12500));i++)ambient.push({x:Math.random()*vw,y:Math.random()*vh,r:Math.random()*1.7+.4,t:Math.random()*6.28,s:Math.random()*.4+.18})}}
window.addEventListener('resize',resize,{passive:true});resize();
function burst(x,y,count=30){if(reducedMotion||!ctx)return;const colors=['#ffdfab','#ffd5e9','#c9afff','#fff8f0','#f5aac2'];for(let i=0;i<Math.min(count,170);i++){let angle=Math.random()*Math.PI*2;let speed=Math.random()*5.5+1.2;sparks.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-1.7,r:Math.random()*3+1.4,life:1,decay:Math.random()*.014+.009,c:colors[Math.floor(Math.random()*colors.length)],shape:Math.random()>.78})}if(sparks.length>480)sparks.splice(0,sparks.length-480)}
function frame(time){if(!ctx||reducedMotion)return;const dt=Math.min((time-lastTime)/16.67||1,2);lastTime=time;ctx.clearRect(0,0,vw,vh);for(const s of ambient){s.t+=.016*s.s*dt;s.y-=.09*s.s*dt;if(s.y<0)s.y=vh;ctx.globalAlpha=.12+.43*(.5+.5*Math.sin(s.t));ctx.fillStyle='#ffe9da';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.075*dt;p.vx*=.995;p.life-=p.decay*dt;if(p.life<=0){sparks.splice(i,1);continue}ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.c;if(p.shape){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(time/500+p.x);ctx.fillRect(-p.r/2,-p.r*2,p.r,p.r*4);ctx.fillRect(-p.r*2,-p.r/2,p.r*4,p.r);ctx.restore()}else{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}}ctx.globalAlpha=1;requestAnimationFrame(frame)}
if(!reducedMotion)requestAnimationFrame(frame);
if(matchMedia('(pointer:fine)').matches){const halo=$('#cursorHalo');window.addEventListener('pointermove',e=>{halo.style.left=e.clientX+'px';halo.style.top=e.clientY+'px'},{passive:true})}
