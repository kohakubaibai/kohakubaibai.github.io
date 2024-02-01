// Our data source for first line
let line1Data = [
	[0, .5],
	[.1, .4],
	[.2, .3],
	[.3, .25],
	[.4, .45],
	[.5, .6],
	[.6, .7],
	[.7, .4],
	[.8, .22],
	[.9, .1],
	[1, .15],
  ];
  let line2Data = [
	[0, .7],
	[.1, .8],
	[.2, .75],
	[.3, .5],
	[.4, .3],
	[.5, .35],
	[.6, .42],
	[.7, .7],
	[.8, .75],
	[.9, .65],
	[1, .55],
  ];
  
  // Generate an svg path 
  function generateSvgPath(data, colorClass) {
	let svgPath = `<path class="chart-line ${colorClass}" d="`
	let startCP;
	let endCP;
	data.forEach((dot, i) => {
	  if (i !== 0) {
		startCP = controlPoint(data[i - 1], data[i - 2], dot);
		endCP = controlPoint(dot, data[i - 1], data[i + 1], true);
	  }
	  svgPath += i === 0 ? 'M ' : 'C ';
	  svgPath += i === 0 ? `${dot[0]},${dot[1]} ` : `${startCP.x},${startCP.y} ${endCP.x},${endCP.y} ${dot[0]},${dot[1]} `
	})
	// Close the chart for filling color
	svgPath += `L 158 158 L 0 158 L ${data[0][0]},${data[0][1]} "></path>`
	return svgPath;
  }
  
  // Get length and angle between two points
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const line = (pointA, pointB) => {
	const lengthX = pointB[0] - pointA[0]
	const lengthY = pointB[1] - pointA[1]
	return {
	  length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
	  angle: Math.atan2(lengthY, lengthX)
	}
  }
  
  // Get a control point for curve line
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const controlPoint = (current, previous, next, reverse) => {
	const p = previous || current
	const n = next || current
	const smoothing = 0.15
	const o = line(p, n)
	const angle = o.angle + (reverse ? Math.PI : 0)
	const length = o.length * smoothing
	const x = current[0] + Math.cos(angle) * length
	const y = current[1] + Math.sin(angle) * length
	return {x, y};
  }
  
  const addLineToSVG = (data, color) => {
	 // scale the data
	data = data.map(item => [item[0] * 158, item[1] * 158]);
	let line = generateSvgPath(data, color);
	$('#chart-container').append(line);
	$('#chart-container').html($('#chart-container').html());
	  // append doesn't refresh svg, this is why:
	// https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
  }
  
  $(document).ready(async ()=>{
	addLineToSVG(line1Data, 'primary');
	addLineToSVG(line2Data, 'secondary');
  })
  
  const wait = (forSecond) => {
	return new Promise((resolve, reject) => {
	  setTimeout(()=>{resolve(true)}, forSecond * 1000);
	})
  }