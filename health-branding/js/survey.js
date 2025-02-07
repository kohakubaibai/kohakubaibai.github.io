$(function(){

	// Function to activate tab without scrolling
	function activateTab(tabId) {
		tabId = tabId || '';
		const cleanTabId = tabId.replace('#', '');
		const tabText = $(`.tab-option[data-tab="${cleanTabId}"]`).text();

		if(tabId == '') {
			$('.tab-option').eq(0).addClass('active');
		} else if (tabId == 'ctgtag' || tabId == 'cause') {
			$('.tab-option').eq(0).addClass('active');
		} else {
			$(`.tab-option[data-tab="${cleanTabId}"]`).addClass('active');
			// Update header text
			$('.selected-tab').text(tabText);
		}

		// Show selected content
		$('.tab-content').removeClass('fade').fadeOut(200);

		if(tabId == '') {
			$('.tab-content').eq(0).addClass('fade').delay(200).fadeIn(200);
		} else if (tabId == 'ctgtag' || tabId == 'cause') {
			$('.tab-content').eq(0).addClass('fade').delay(200).fadeIn(200);
		} else {
			$(`#${cleanTabId}`).addClass('fade').delay(200).fadeIn(200);
		}

		$('.tab-view').removeClass(function(index, className) {
			// Remove any class that starts with 'is-'
			return (className.match(/(^|\s)is-\S+/g) || []).join(' ');
		});

		// Add the new class to tab-view
		if(tabId == '') {
			$('.tab-view').addClass('is-sex');
		} else if (tabId == 'ctgtag') {
			$('.tab-view').addClass('is-sex');
		} else {
			$('.tab-view').addClass('is-' + cleanTabId);
		}

		// Update URL without scrolling
		history.replaceState(null, null, `#${cleanTabId}`);
	}

	// Check for stored tab on page load
	const storedTab = sessionStorage.getItem('targetTab');
	if(storedTab) {
		activateTab(storedTab);
		sessionStorage.removeItem('targetTab');
	} else {
		// Initialize first tab without scrolling
		const initialHash = location.hash.replace('#', '') || '';
		activateTab(initialHash);
	}

	// Check if device is mobile
	var mobileW = 996;

	// Toggle dropdown
	$('.tab-header').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active')
		$('.tab-options').slideToggle(200);
		$('.arrow').toggleClass('up');
	});

	// Handle tab selection
	$('.tab-option').on('click', function(e) {
		e.preventDefault();
		const tabId = $(this).data('tab');

		// Hide dropdown
		if($(window).outerWidth(true) <= mobileW) {
			$('.tab-options').slideUp(200);
		}
		$('.tab-header').removeClass('active');
		$('.arrow').removeClass('up');
		$(this).addClass('active').siblings().removeClass('active');

		activateTab(tabId);
	});

	// Close dropdown when clicking outside
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.tab-select').length) {
			if($(window).outerWidth(true) <= mobileW) {
				$('.tab-options').slideUp(200);
			}
			$('.tab-header').removeClass('active');
			$('.arrow').removeClass('up');
		}
	});

	// Handle resize events
	let resizeTimer;
	$(window).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			// Re-check mobile/desktop state after resize
			if (!$(window).outerWidth(true) <= mobileW && location.hash.includes('ctg')) {
				// If switched to desktop, allow normal scroll behavior
				const hash = location.hash;
				history.replaceState(null, null, hash);
				// Let the browser handle the scroll naturally
			}
		}, 250);
	});
});