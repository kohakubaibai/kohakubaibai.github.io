	var ctxSex = $("#chart-sex");
	var myChart = new Chart(ctxSex, {
	    type: 'doughnut',
	    data: {
	        labels: ["男", "女"],
	        datasets: [{
	            data: [25.5, 74.5],
	            backgroundColor: [
	                '#58AAB3',
	                '#CEE2E5'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxMarriage = $("#chart-marriage");
	var myChart = new Chart(ctxMarriage, {
	    type: 'doughnut',
	    data: {
	        labels: ["已婚", "未婚/單身"],
	        datasets: [{
	            data: [68.2, 31.8],
	            backgroundColor: [
	                '#FF9B53',
	                '#FFC121'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxAge = $("#chart-age");
	var myChart = new Chart(ctxAge, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"25歲以下",
	        	"25歲~35歲",
	        	"36歲~45歲",
	        	"46歲~55歲",
	        	"56歲~64歲",
	        	"65歲以上"
	        ],
	        datasets: [{
	            data: [1.0, 6.3, 17.3, 30.4, 30.6, 14.4],
	            backgroundColor: [
	                '#7F573A',
	                '#A56D45',
	                '#D2966A',
	                '#E6C7B0',
	                '#EFDCCD',
	                '#F8EFE7'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxChild = $("#chart-child");
	var myChart = new Chart(ctxChild, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"有",
	        	"無"
	        ],
	        datasets: [{
	            data: [65.2, 34.8],
	            backgroundColor: [
	                '#B5A092',
	                '#DFD7D1'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxIncome = $("#chart-income");
	var myChart = new Chart(ctxIncome, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"5萬以下",
	        	"5～8萬",
	        	"8～12萬",
	        	"12萬~15萬",
	        	"15萬以上"
	        ],
	        datasets: [{
	            data: [27.7, 29.6, 22.3, 9.1, 11.2],
	            backgroundColor: [
	                '#0071E3',
	                '#3B90E5',
	                '#70ACE7',
	                '#A0C4E9',
	                '#C4D7E8'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxQ1 = $("#chart-q1");
	var myChart = new Chart(ctxQ1, {
	    type: 'bar',
	    data: {
	        labels: [
	        	"非常重要",
	        	"重要",
	        	"普通",
	        	"不重要",
	        	"非常不重要"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [31.2, 46.6, 19.4, 2.5, 0.3],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	                '#E2F5E3'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						display: false
					}
				}]
			}
	    }
	});

	var ctxQ2 = $("#chart-q2");
	var myChart = new Chart(ctxQ2, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F",
	        	"G",
	        	"H",
				"I"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [76.8, 46.9, 34.1, 33.7, 20.5, 18.7, 15.2, 13.1, 0.6],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ3 = $("#chart-q3");
	var myChart = new Chart(ctxQ3, {
	    type: 'bar',
	    data: {
	        labels: [
	        	"非常重要",
	        	"重要",
	        	"普通",
	        	"不重要",
	        	"非常不重要"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [54.4, 39.7, 5.2, 0.6, 0.2],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	                '#E2F5E3'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ4 = $("#chart-q4");
	var myChart = new Chart(ctxQ4, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"有",
	        	"沒有"
	        ],
	        datasets: [{
	            data: [69.8, 30.2],
	            backgroundColor: [
	                '#3DB943',
	                '#9EDCA1',
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	// var ctxQ5 = $("#chart-q5");
	// var myChart = new Chart(ctxQ5, {
	//     type: 'radar',
	//     data: {
	//         labels: [
	//         	"1",
	//         	"2",
	//         	"3",
	//         	"4",
	//         	"5",
	//         	"6",
	//         ],
	//         datasets: [{
	//         	label: '分布比率',
	//             data: [27.9, 5.9, 26.3, 35.7, 3.0, 1.2],
	//             backgroundColor: 'rgba(119, 206, 123, 0.8)',
	//             borderColor: '#77CE7B',
	//             borderWidth: 1
	//         }]
	//     },
	//     options: {
	//     	responsive: true,
	//     }
	// });
	var ctxQ5 = $("#chart-q5");
	var myChart = new Chart(ctxQ5, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"吃速食或外賣",
	        	"隨便吃點零食解決",
	        	"挑選簡單又健康的輕食",
	        	"儘量自己煮簡單的家常菜",
				"有時會忘記吃飯",
				"其他"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [27.9, 5.9, 26.3, 35.7, 3.0, 1.2],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	                '#E2F5E3',
					'#EDFDEE'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ6 = $("#chart-q6");
	var myChart = new Chart(ctxQ6, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"是，經常感覺不均衡",
	        	"偶爾感覺有點不均衡",
	        	"不太確定",
	        	"否，我的飲食習慣很均衡",
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [26.8, 55.2, 6.8, 11.2],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ7 = $("#chart-q7");
	var myChart = new Chart(ctxQ7, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [39.3, 46.6, 69.3, 7.0, 9.1, 0.5],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ8 = $("#chart-q8");
	var myChart = new Chart(ctxQ8, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"非常願意購買",
	        	"可能會嘗試購買",
	        	"不確定，需更多了解",
	        	"不願意購買"
	        ],
	        datasets: [{
	            data: [15.8, 53.4, 27.5, 3.2],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ9 = $("#chart-q9");
	var myChart = new Chart(ctxQ9, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F",
	        	"G"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [ 59.1, 25.1, 18.5, 38.2, 49.0, 43.3, 0.7],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ10 = $("#chart-q10");
	var myChart = new Chart(ctxQ10, {
	    type: 'bar',
	    data: {
	        labels: [
	        	"1",
	        	"2",
	        	"3",
	        	"4",
	        	"5",
	        	"6",
	        	"7"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [19.3, 29.7, 10.7, 11.9, 13.9, 12.6, 1.7],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ11 = $("#chart-q11");
	var myChart = new Chart(ctxQ11, {
	    type: 'bar',
	    data: {
	        labels: [
	        	"0~999元",
				"1,000~2,999元",
				"3,000~5,999元",
				"6,000~9,999元",
				"10,000元以上",
				"其他"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [26.6, 54.4, 15.7, 1.9, 1.1, 0.2],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	                '#E2F5E3',
					'#EDFDEE'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ12 = $("#chart-q12");
	var myChart = new Chart(ctxQ12, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"是",
	        	"否"
	        ],
	        datasets: [{
	            data: [88.0, 12.0],
	            backgroundColor: [
	                '#3DB943',
	                '#9EDCA1'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ13 = $("#chart-q13");
	var myChart = new Chart(ctxQ13, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F",
	        	"G",
				"H",
	        	"I",
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [60.3, 49.6, 17.8, 34.6, 21.5, 57.5, 44.7, 27.7, 2.3],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ14 = $("#chart-q14");
	var myChart = new Chart(ctxQ14, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F",
	        	"G",
				"H",
	        	"I",
	        	"J",
	        	"K",
	        	"L",
	        	"M",
	        	"N",
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [43.1, 33.6, 29.6, 9.5, 10.3, 14.1, 11.9, 31.9, 43.3, 48.3, 39.0, 57.3, 21.7, 4.0],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ15 = $("#chart-q15");
	var myChart = new Chart(ctxQ15, {
		type: 'bar',
	    data: {
	        labels: [
	        	"0~999元",
				"1,000~2,999元",
				"3,000~5,999元",
				"6,000~9,999元",
				"10,000元以上",
				"其他"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [27.2, 51.3, 16.8, 2.7, 1.1, 0.9],
	            backgroundColor: [
	                '#3DB943',
	                '#77CE7B',
	                '#9EDCA1',
	                '#BBE7BD',
	                '#E2F5E3',
					'#EDFDEE'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ16 = $("#chart-q16");
	var myChart = new Chart(ctxQ16, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"A",
	        	"B",
	        	"C",
	        	"D",
	        	"E",
	        	"F",
	        	"G",
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [52.3, 29.2, 2.3, 55.4, 28.2, 8.1,5.8 ],
	            backgroundColor: 'rgba(119, 206, 123, 0.8)',
	            borderColor: '#77CE7B',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});