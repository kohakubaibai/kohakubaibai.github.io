$(function(){

	// Function to activate tab without scrolling
	function activateTab(tabId) {
		tabId = tabId || '';
		const cleanTabId = tabId.replace('#', '');
		const tabText = $(`.tab-option[data-tab="${cleanTabId}"]`).text();

		if(tabId == '') {
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
		} else {
			$(`#${cleanTabId}`).addClass('fade').delay(200).fadeIn(200);
		}

		// Update URL without scrolling
		history.replaceState(null, null, `#${cleanTabId}`);
	}

	// Handle clicks on links that point to tabs
	$('.btn--category').on('click', function(e) {
		const href = $(this).attr('href');
		const isTabLink = href.includes('#ctg');

		// If it's a tab link
		if(isTabLink) {
			const [pagePath, hash] = href.split('#');
			const currentPage = window.location.pathname.split('/').pop();
			const targetPage = pagePath.split('/').pop();

			// If linking to current page's tab
			if(!pagePath || pagePath === '' || currentPage === targetPage) {
				e.preventDefault();
				activateTab(hash);
			}
			// If linking to different page, let it navigate but store the tab
			else {
				sessionStorage.setItem('targetTab', hash);
			}
		}
	});

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