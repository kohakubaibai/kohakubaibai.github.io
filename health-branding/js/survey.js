$(function(){
	// Prevent initial scroll on page load if there's a hash
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, 1);

	// Function to activate tab without scrolling
	function activateTab(tabId) {
		tabId = tabId || 'sex';
		const cleanTabId = tabId.replace('#', '');
		const tabText = $(`.tab-option[data-tab="${cleanTabId}"]`).text();

		$(`.tab-option[data-tab="${cleanTabId}"]`).addClass('active');

		// Update header text
		$('.selected-tab').text(tabText);

		// Show selected content
		$('.tab-content').removeClass('active');
		$(`#${cleanTabId}`).addClass('active');

		$('.tab-view').removeClass(function(index, className) {
			// Remove any class that starts with 'is-'
			return (className.match(/(^|\s)is-\S+/g) || []).join(' ');
		});

		// Add the new class to tab-view
		$('.tab-view').addClass('is-' + cleanTabId);

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
		const initialHash = location.hash.replace('#', '') || 'sex';
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