	var ctxSex = $("#chart-sex");
	var myChart = new Chart(ctxSex, {
	    type: 'doughnut',
	    data: {
	        labels: ["男", "女"],
	        datasets: [{
	            data: [26.1, 73.9],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894'
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
	            data: [68.3, 31.7],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894'
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
	            data: [1.5,8.3,23.7,31.8,24.1,10.5],
	            backgroundColor: [
	                '#009944',
	                '#9ac532',
	                '#f78894',
	                '#13b5b1',
	                '#f9b139',
	                '#fff100'
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
	            data: [65.0,35.0],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894'
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
	            data: [24.8,30.2,25.3,9.2,10.4],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139'
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
	            data: [33.9,44.1,19.3,2.1,0.6],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
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
	        	"H"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [79.7,54.7,47.5,46.2,28.5,27.5,26.8,22.1],
	            backgroundColor: [
	                'rgba(75,192,192,0.5)'
	            ],
	            borderColor: [
	                'rgba(75,192,192,1)'
	            ],	           
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
	            data: [56.8,37.7,4.7,0.6,0.2],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139'
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
	        	"是",
	        	"否"
	        ],
	        datasets: [{
	            data: [89.0,11.0],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894'
	            ],           
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxQ5 = $("#chart-q5");
	var myChart = new Chart(ctxQ5, {
	    type: 'bar',
	    data: {
	        labels: [
	        	'網購平台',
				'量販超市',
				'便利超商',
				'有機店',
				'百貨公司',
				'傳統市場'
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [52.0,86.7,30.7,31.2,15.3,45.3,2.1 ],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139',
	                '#fff100'
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
	        	"運動",
				"保健品",
				"飲食控制",
				"其他"
	        ],
	        datasets: [{
	            data: [30.7,29.6,38.7,0.9],
	            backgroundColor: [
	                '#009944',
	                '#9ac532',
	                '#f78894',
	                '#13b5b1'
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
				"E"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [46.5,8.3,76.4,34.3,33.1],         
	            backgroundColor: [
	                'rgba(75,192,192,0.5)'
	            ],
	            borderColor: [
	                'rgba(75,192,192,1)'
	            ],	        
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

/* 綜合兩種不同形式比較(條形VS線形)
	var ctxQ8 = $("#chart-q8");
	var myChart = new Chart(ctxQ8, {
	    type: 'bar',
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
				"J"
	        ],
	        datasets: [{
	        	type: 'bar',
	        	label: '增加',
	            data: [60.6,53.2,19.7,14.5,15.3,11.9,14.3,1.9,8.1,4.6],
	            backgroundColor: 'rgba(255, 159, 64, 0.2)',           
	            borderWidth: 1
	        },{
	        	type: 'line',
				label: '減少 分布比率',
				data: [4.5,6.5,6.1,25.8,11.2,16.4,18.8,43.3,19.2,15.5],
				borderColor: 'rgba(75,192,192,1)',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});
*/
	
	var ctxQ8 = $("#chart-q8");
	var myChart = new Chart(ctxQ8, {
	    type: 'bar',
	    data: {
	        labels: [
	        	"0~999元",
				"1,000~2,999元",
				"3,000~5,999元",
				"6,000~9,999元",
				"10,000元以上"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [39.0,45.1,12.3,1.6,0.7],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139'
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
				"G",
				"H"
	        ],
	        datasets: [{
	            label: '分布比率',
	            data: [63.9,46.6,20.8,40.0,24.0,59.4,49.6,31.4],         
	            backgroundColor: [
	                'rgba(75,192,192,0.5)'
	            ],
	            borderColor: [
	                'rgba(75,192,192,1)'
	            ],	         
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

	var ctxQ10 = $("#chart-q10");
	var myChart = new Chart(ctxQ10, {
	    type: 'doughnut',
	    data: {
	        labels: [
	        	"是",
	        	"否"
	        ],
	        datasets: [{
	            data: [84.1,15.9],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894'
	            ],           
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});


	var ctxQ11 = $("#chart-q11");
	var myChart = new Chart(ctxQ11, {
	    type: 'radar',
	    data: {
	        labels: [
	        	"1",
	        	"2",
	        	"3",
	        	"4",
	        	"5",
	        	"6",
	        	"7",
	        	"8",
	        	"9"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [64.4,48.3,42.6,18.5,18.9,22.4,19.4,40.1,59.0],
	            backgroundColor: [
	                'rgba(75,192,192,0.5)'
	            ],
	            borderColor: [
	                'rgba(75,192,192,1)'
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
		type: 'bar',
	    data: {
	        labels: [
	        	"0~999元",
				"1,000~2,999元",
				"3,000~5,999元",
				"6,000~9,999元",
				"10,000元以上"
	        ],
	        datasets: [{
	        	label: '分布比率',
	            data: [29.6,48.7,17.9,2.5,1.3],
	            backgroundColor: [
	                '#B5495B',
	                '#f78894',
	                '#86C166',
	                '#13b5b1',
	                '#f9b139'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    }
	});

/* 橫條分區 年齡VS同意與否
	var ctxQ13 = $("#chart-q13");
	var myChart = new Chart(ctxQ13, {
	    type: 'horizontalBar',
	    data: {
	        labels: [
	        	"25歲以下",
				"25歲~34歲",
				"35歲~44歲",
				"45歲~54歲",
				"55歲~64歲",
				"65歲以上"
	        ],
	        datasets: [{
	        	label: '不同意',
	            data: [4.2,4.9,2.3,3.8,4.1,6.3],
	            stack: 'Stack 0',
	            backgroundColor: '#B5495B',
	            borderWidth: 1
	        },{
	        	label: '無意見',
	            data: [16.6,17.7,18.6,25.5,31.9,31.3],
	            stack: 'Stack 0',
	            backgroundColor: '#f78894',
	            borderWidth: 1
	        },{
	        	label: '同意',
	            data: [79.2,77.4,79.0,70.7,64.0,62.4],
	            stack: 'Stack 0',
	            backgroundColor: '#f78894',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive: true,
	    	scales: {
		      xAxes: {
		        stacked: true,
		      },
		      yAxes: {
		        stacked: true
		      }
		    }
	    }
	});

*/