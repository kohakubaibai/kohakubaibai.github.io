function init() {

	/* ── Data ──────────────────────────────────────────────────────────── */
	const ZONE_NAMES = {
		A: "舊站特區", B: "就藝會區", C: "美術館區", D: "北町區",
		E: "臨海區", F: "美學館區", G: "總圖區", H: "衛星展區"
	};
	const ALL_ZONES = ["A", "B", "C", "D", "E", "F", "G", "H"];
	const ALL_TIMES = ["09:00", "10:30", "14:00", "15:30"];

	const DATA = { zone: {}, venue: {} };
	ALL_ZONES.forEach(z => {
		const venues = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => z + n);
		DATA.zone[z] = { venues, times: ALL_TIMES };
		venues.forEach(v => { DATA.venue[v] = { zone: z, times: ALL_TIMES }; });
	});
	const ALL_VENUES = ALL_ZONES.flatMap(z => [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => z + n));

	const selZ = document.getElementById('sel-zone');
	const selV = document.getElementById('sel-venue');
	const selT = document.getElementById('sel-time');

	/* ── Helpers ───────────────────────────────────────────────────────── */

	// Rebuild <option> list; show only options in allowedValues; preserve selection if still valid
	function filterSelect(sel, allItems, allowedValues, labelFn) {
		const prev = sel.value;
		sel.innerHTML = '<option value="" disabled>　</option>';
		allItems.forEach(val => {
			if (!allowedValues.includes(val)) return;   // simply omit non-allowed options
			const opt = document.createElement('option');
			opt.value = val;
			opt.textContent = labelFn ? labelFn(val) : val;
			if (val === prev) opt.selected = true;
			sel.appendChild(opt);
		});
		// If previous value no longer in list, reset
		if (!allowedValues.includes(prev)) sel.value = '';
		// Auto-select if only one option
		if (allowedValues.length === 1) sel.value = allowedValues[0];
	}

	const zoneLabel = z => z + ' ' + ZONE_NAMES[z];

	/* ── Initial population ────────────────────────────────────────────── */
	filterSelect(selZ, ALL_ZONES, ALL_ZONES, zoneLabel);
	filterSelect(selV, ALL_VENUES, ALL_VENUES, null);
	filterSelect(selT, ALL_TIMES, ALL_TIMES, null);

	/* ── Cascade: Zone → Venue → Time ─────────────────────────────────── */

	// Zone changed → filter venues to that zone; recalc time from zone level
	selZ.addEventListener('change', () => {
		const z = selZ.value;
		filterSelect(selV, ALL_VENUES, DATA.zone[z].venues, null);
		const times = selV.value ? DATA.venue[selV.value].times : DATA.zone[z].times;
		filterSelect(selT, ALL_TIMES, times, null);
	});

	// Venue changed → narrow zone to single match; update time to venue level
	selV.addEventListener('change', () => {
		const v = selV.value;
		const z = DATA.venue[v].zone;
		filterSelect(selZ, ALL_ZONES, [z], zoneLabel);   // only the matching zone remains
		filterSelect(selT, ALL_TIMES, DATA.venue[v].times, null);
	});

	/* ── Datepicker ────────────────────────────────────────────────────── */
	$('#datepicker').datepicker({
		format: 'yyyy-mm-dd',
		autoHide: true,
		startDate: new Date(),
	})
	// .on('pick.datepicker', function () {
	// 	const d = $(this).datepicker('getDate', true);
	// 	$(this).attr('data-date', d);
	// 	// Reset all three cascade selects
	// 	filterSelect(selZ, ALL_ZONES, ALL_ZONES, zoneLabel);
	// 	filterSelect(selV, ALL_VENUES, ALL_VENUES, null);
	// 	filterSelect(selT, ALL_TIMES, ALL_TIMES, null);
	// });

	/* ── Email validation ────────────────────────────────────────────────────── */
	const emailRule = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;


	/* ── Submit ────────────────────────────────────────────────────────── */
	document.querySelector('#submit').addEventListener('click', function () {

	});

}
init();
