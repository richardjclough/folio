var gl_resolution_threshold = 900,
	gl_left_color = '#9fdb3a',
	gl_right_color = '#ee6677',
	gl_less_zero = '#9fdb3a',
	gl_equal_zero = '#c4c5c5',
	gl_greater_zero = '#ee6677',
	gl_gradient = {
		linearGradient: {x1: 1, x2: 0, y1: 0, y2: 0},
		stops: [[0, gl_left_color], [1, gl_right_color]]
	},
	gl_radar_options = {
		tooltips: {
			callbacks: {
				labelColor: function(tooltipItem, chart) {
					return {
						borderColor: 'rgb(255, 0, 0)',
						backgroundColor: 'rgb(255, 0, 0)'
					}
				}
			}
		},
		responsive: true,
		maintainAspectRatio: true,
		legend: {
			display: false,
		},
		scale: {
			gridLines: {
				display:false,
			},
			ticks: {
				min: -25,
				max: 100,
				stepSize: 10,
				display:false,
			}
		}
	},
	gl_bell_curve_set1 = [0.0002096354086567899, 0.0006228207530004774, 0.0017699440341499457, 0.004811206705419294, 0.012509689230918634, 0.03111265325851383, 0.07401599809377891, 0.16842717870437032, 0.3666036384824539, 0.7632721055766831, 1.5200575614785456, 2.8956008818334933, 5.2761288052161435, 9.195812372560408, 15.330730058999666, 24.44745159664857, 37.29085802831682, 54.408804125679914, 75.9336030718742, 101.36706174601971, 129.43678923780348, 158.0944513824498, 184.7028289477681, 206.40893339969753, 220.6385806865156, 225.59654471679002, 220.6385806865156, 206.40893339969753, 184.7028289477681, 158.0944513824498, 129.43678923780348, 101.36706174601971, 75.9336030718742, 54.408804125679914, 37.29085802831682, 24.44745159664857, 15.330730058999666, 9.195812372560408, 5.2761288052161435, 2.8956008818334933, 1.5200575614785456, 0.7632721055766831, 0.3666036384824539, 0.16842717870437032, 0.07401599809377891, 0.03111265325851383, 0.012509689230918634, 0.004811206705419294, 0.0017699440341499457, 0.0006228207530004774, 0.0002096354086567899],
	gl_bell_curve_set2 = [2.6881120397507757e-12, 3.1150774336750777e-11, 3.2663361628725507e-10, 3.0990134666079697e-9, 2.6604591781776762e-8, 2.0666183793450394e-7, 0.000001452561493672004, 0.000009238028945234901, 0.00005316118608926716, 0.00027680922355576774, 0.001304178403049095, 0.005559861880408282, 0.021446753164635825, 0.07485652386860904, 0.23641134292586402, 0.6755811384349092, 1.7468566753027408, 4.087027721137959, 8.65223775354552, 16.57371467925192, 28.72644098508654, 45.052027442675424, 63.931870142233564, 82.09014619900805, 95.37514284457856, 100.26513098524, 95.37514284457856, 82.09014619900805, 63.931870142233564, 45.052027442675424, 28.72644098508654, 16.57371467925192, 8.65223775354552, 4.087027721137959, 1.7468566753027408, 0.6755811384349092, 0.23641134292586402, 0.07485652386860904, 0.021446753164635825, 0.005559861880408282, 0.001304178403049095, 0.00027680922355576774, 0.00005316118608926716, 0.000009238028945234901, 0.000001452561493672004, 2.0666183793450394e-7, 2.6604591781776762e-8, 3.0990134666079697e-9, 3.2663361628725507e-10, 3.1150774336750777e-11, 2.6881120397507757e-12];

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomFloats(min, max, howmany) {
	var values = []
	for (var i=0; i<howmany; i++) {
		values.push(getRandomFloat(min, max))
	}
	return values
}

function getRulerAssessmentColor(value) {
	if (value < 0)
		return gl_less_zero;
	else if (value == 0)
		return gl_equal_zero;
	else
		return gl_greater_zero;
}

function renderRulerSmall(chart, responsive, label_left, label_right, pre_score, post_score) {
	var renderer = chart.renderer,
		plotTop = 10,
		plotLeft = 15,
		containerWidth = chart.containerWidth - plotLeft * 2;

	// draw ruler
	var ruler_pos = {
		x: plotLeft,
		y: plotTop,
		width: containerWidth,
		height: 15
	};
	if (typeof(chart.ruler) == 'undefined') {
		chart.ruler = renderer.rect(ruler_pos.x, ruler_pos.y, ruler_pos.width, ruler_pos.height)
			.attr({
				fill: gl_gradient,
				r: 7
			})
			.add();
	}
	chart.ruler.attr(ruler_pos);

	// draw left label
	var label_left_args = {
		x: ruler_pos.x,
		y: ruler_pos.y + 25
	}
	if (typeof(chart.label_left) == 'undefined') {
		chart.label_left = renderer.label(label_left, label_left_args.x, label_left_args.y)
			.css({
				color: gl_right_color,
				fontWeight: 'bold',
				fontSize: '10px'
			})
			.add();
	}
	chart.label_left.attr(label_left_args);

	// draw right label
	var label_right_args = {
		x: null,
		y: ruler_pos.y + 25
	}
	if (typeof(chart.label_right) == 'undefined') {
		chart.label_right = renderer.label(label_right, label_right_args.x, label_right_args.y)
			.css({
				color: gl_left_color,
				fontWeight: 'bold',
				fontSize: '10px'
			})
			.add();
	}
	chart.label_right.attr(label_right_args);
	chart.label_right.attr({
		x: containerWidth + plotLeft - chart.label_right.width
	});

	var xAxis_unit = ruler_pos.width / 54;

	// draw pre
	if (pre_score != null) {
		var pre_bullet_pos = {
			x: ruler_pos.x + (
				(pre_score > 0) ? (27 - pre_score) * xAxis_unit : (Math.abs(pre_score) + 27) * xAxis_unit
			),
			y: ruler_pos.y + 8,
			r: 12
		}
		if (typeof(chart.pre_bullet) == 'undefined') {
			chart.pre_bullet = renderer.circle(pre_bullet_pos.x, pre_bullet_pos.y, pre_bullet_pos.r)
				.attr({
					fill: getRulerAssessmentColor(pre_score),
					stroke: '#fff',
					'stroke-width': 3
				})
				.add();
		}
		chart.pre_bullet.attr(pre_bullet_pos);
	}

	// draw post
	if (post_score != null) {
		var post_bullet_pos = {
			x: ruler_pos.x + (
				(post_score > 0) ? (27 - post_score) * xAxis_unit : (Math.abs(post_score) + 27) * xAxis_unit
			) - 12,
			y: ruler_pos.y - 4,
			width: 24,
			height: 24
		}
		if (typeof(chart.post_bullet) == 'undefined') {
			chart.post_bullet = renderer.rect(post_bullet_pos.x, post_bullet_pos.y, post_bullet_pos.width, post_bullet_pos.height)
				.attr({
					fill: getRulerAssessmentColor(post_score),
					stroke: '#fff',
					'stroke-width': 3
				})
				.add();
		}
		chart.post_bullet.attr(post_bullet_pos);
	}
}

function renderRulerBig(chart, responsive, score_key, label_left, label_right, pre_score, post_score) {
	var renderer = chart.renderer,
		plotTop = chart.plotTop,
		plotLeft = chart.plotLeft,
		plotWidth = chart.plotWidth,
		plotHeight = chart.plotHeight,
		containerHeight = chart.containerHeight,
		offsetTopBottom = 90,
		offsetLeftRight = plotWidth * 100 / 1280;

	// draw ruler
	var ruler_pos = {
		x: plotLeft + offsetLeftRight,
		y: plotTop + offsetTopBottom,
		width: plotWidth - plotLeft - 2 * offsetLeftRight,
		height: 15
	};
	if (typeof(chart.ruler) == 'undefined') {
		chart.ruler = renderer.rect(ruler_pos.x, ruler_pos.y, ruler_pos.width, ruler_pos.height)
			.attr({
				fill: gl_gradient,
				r: 7
			})
			.add();
	}
	chart.ruler.attr(ruler_pos);

	// draw left label
	var label_left_pos = {
		x: (plotWidth < gl_resolution_threshold) ? ruler_pos.x : ruler_pos.x - 85,
		y: (plotWidth < gl_resolution_threshold) ? ruler_pos.y - 20 : ruler_pos.y - 2
	}
	if (typeof(chart.label_left) == 'undefined') {
		chart.label_left = renderer.label(label_left, label_left_pos.x, label_left_pos.y)
			.css({
				color: gl_right_color,
				fontWeight: 'bold',
			})
			.add();
	}
	chart.label_left.attr(label_left_pos);

	// draw right label
	var label_right_pos = {
		x: (plotWidth < gl_resolution_threshold) ? ruler_pos.x + ruler_pos.width - 60 : ruler_pos.x + ruler_pos.width + 10,
		y: (plotWidth < gl_resolution_threshold) ? ruler_pos.y - 20 : ruler_pos.y - 2
	}
	if (typeof(chart.label_right) == 'undefined') {
		chart.label_right = renderer.label(label_right, label_right_pos.x, label_right_pos.y)
			.css({
				color: gl_left_color,
				fontWeight: 'bold',
			})
			.add();
	}
	chart.label_right.attr(label_right_pos);
	chart.label_right.attr({x: chart.label_right.x + 60 - chart.label_right.width});

	// draw xAxis values
	var xAxis_labels = ['27', '18', '\u00A09', '\u00A00', '-9', '-18', '-27'],
		xAxis_line_pos = {
			x: ruler_pos.x,
			y: ruler_pos.y + 20,
			width: 1,
			height: 10
		},
		xAxis_label_pos = {
			x: ruler_pos.x - 8,
			y: ruler_pos.y + 30
		}
		xAxis_unit = ruler_pos.width / 54,
		xAxis_gap = xAxis_unit * 9;
	for (var i=0; i < xAxis_labels.length; i++ ) {
		var	xAxis_line_id = 'xAxis_line' + i,
			xAxis_label_id = 'xAxis_label' + i;

		// draw line
		if (typeof(chart[xAxis_line_id]) == 'undefined') {
			chart[xAxis_line_id] = renderer.rect(xAxis_line_pos.x, xAxis_line_pos.y, xAxis_line_pos.width, xAxis_line_pos.height)
				.attr({
					fill: '#999'
				})
				.add();
		}
		chart[xAxis_line_id].attr(xAxis_line_pos);

		// draw label
		if (typeof(chart[xAxis_label_id]) == 'undefined') {
			chart[xAxis_label_id] = renderer.label(xAxis_labels[i], xAxis_label_pos.x, xAxis_label_pos.y)
				.css({
					fontSize: '10px',
					color: '#666'
				})
				.add();
		}
		chart[xAxis_label_id].attr(xAxis_label_pos);

		// shift to the left by gap
		xAxis_line_pos.x += xAxis_gap;
		xAxis_label_pos.x += xAxis_gap;
	}

	// draw pre
	if (pre_score != null) {
		var pre_bullet_pos = {
			x: ruler_pos.x + (
				(pre_score > 0) ? (27 - pre_score) * xAxis_unit : (Math.abs(pre_score) + 27) * xAxis_unit
			),
			y: ruler_pos.y + 8,
			r: 12
		};
		if (typeof(chart.pre_bullet) == 'undefined') {
			chart.pre_bullet = renderer.circle(pre_bullet_pos.x, pre_bullet_pos.y, pre_bullet_pos.r)
				.attr({
					fill: getRulerAssessmentColor(pre_score),
					stroke: '#fff',
					'stroke-width': 3
				})
				.add();
		}
		chart.pre_bullet.attr(pre_bullet_pos);

		var pre_tooltip_pos = {
			x: pre_bullet_pos.x,
			y: 10
		};
		if (typeof(chart.pre_tooltip) == 'undefined') {
			chart.pre_tooltip = renderer.label($('#swan_pre_' + score_key + '_tooltip').html(), pre_tooltip_pos.x, pre_tooltip_pos.y, 'callout', pre_bullet_pos.x, pre_bullet_pos.y)
				.css({
					color: '#f5f4f4'
				})
				.attr({
					fill: '#f5f4f4',
					stroke: '#D5D4D4',
					'stroke-width': 2,
					padding: 10,
					r: 10,
					zIndex: 6,
					useHTML: true,
					align: 'center',
				})
				.add();
			chart.pre_tooltip_text = renderer.text($('#swan_pre_' + score_key + '_tooltip').html(), pre_tooltip_pos.x, pre_tooltip_pos.y + 30)
				.css({
					color: '#666'
				})
				.attr({
					zIndex: 7,
					useHTML: true,
					align: 'center'
				})
				.add();
		}
		if (pre_score > 0) {
			pre_tooltip_pos.anchorX = pre_tooltip_pos.x;
			pre_tooltip_pos.x = Math.max(pre_tooltip_pos.x, chart.pre_tooltip.getBBox().width / 2 + 20);
		} else if (pre_score < 0) {
			pre_tooltip_pos.anchorX = pre_tooltip_pos.x;
			pre_tooltip_pos.x = Math.min(pre_tooltip_pos.x, chart.containerWidth - chart.pre_tooltip.getBBox().width / 2 - 20);
		}
		chart.pre_tooltip.attr(pre_tooltip_pos);
		chart.pre_tooltip_text.attr({x: pre_tooltip_pos.x, y: pre_tooltip_pos.y + 30});
	}

	// draw post
	if (post_score != null) {
		var post_bullet_pos = {
			x: ruler_pos.x + (
				(post_score > 0) ? (27 - post_score) * xAxis_unit : (Math.abs(post_score) + 27) * xAxis_unit
			) - 12,
			y: ruler_pos.y - 4,
			width: 24,
			height: 24
		};
		if (typeof(chart.post_bullet) == 'undefined') {
			chart.post_bullet = renderer.rect(post_bullet_pos.x, post_bullet_pos.y, post_bullet_pos.width, post_bullet_pos.height)
				.attr({
					fill: getRulerAssessmentColor(post_score),
					stroke: '#fff',
					'stroke-width': 3
				})
				.add();
		}
		chart.post_bullet.attr(post_bullet_pos);

		var post_tooltip_pos = {
			x: post_bullet_pos.x + 12,
			y: 155
		};
		if (typeof(chart.post_tooltip) == 'undefined') {
			chart.post_tooltip = renderer.label($('#swan_post_' + score_key + '_tooltip').html(), post_tooltip_pos.x, post_tooltip_pos.y, 'callout', post_bullet_pos.x + 12, post_bullet_pos.y)
				.css({
					color: '#f5f4f4'
				})
				.attr({
					fill: '#f5f4f4',
					stroke: '#D5D4D4',
					'stroke-width': 2,
					padding: 10,
					r: 10,
					zIndex: 6,
					useHTML: true,
					align: 'center',
				})
				.add();
			chart.post_tooltip_text = renderer.text($('#swan_post_' + score_key + '_tooltip').html(), post_tooltip_pos.x, post_tooltip_pos.y + 30)
				.css({
					color: '#666'
				})
				.attr({
					zIndex: 7,
					useHTML: true,
					align: 'center'
				})
				.add();
		}
		if (post_score > 0) {
			post_tooltip_pos.anchorX = post_tooltip_pos.x;
			post_tooltip_pos.x = Math.max(post_tooltip_pos.x, chart.post_tooltip.getBBox().width / 2 + 20);
		} else if (post_score < 0) {
			post_tooltip_pos.anchorX = post_tooltip_pos.x;
			post_tooltip_pos.x = Math.min(post_tooltip_pos.x, chart.containerWidth - chart.post_tooltip.getBBox().width / 2 - 20);
		}
		chart.post_tooltip.attr(post_tooltip_pos);
		chart.post_tooltip_text.attr({x: post_tooltip_pos.x, y: post_tooltip_pos.y + 30});
	}
}

function renderRadarChart(chart_id, chart_dataset, bg_img_url, line_tention) {
	var ctx = document.getElementById(chart_id).getContext('2d');
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0);

		var fillPattern = ctx.createPattern(img, 'repeat');

		var data = {
			labels: new Array(chart_dataset.length).fill(''),
			datasets: [{
				backgroundColor: fillPattern,
				lineTension: line_tention,
				data: chart_dataset
			}]
		};

		var chart = new Chart(chart_id, {
			type: 'radar',
			data: data,
			options: gl_radar_options
		});

		return chart;
	};
	img.src = bg_img_url;
}

function renderRadarChartEx(chart_id, chart_dataset_pre, chart_dataset_post, bg_img_url, line_tention) {
	var ctx = document.getElementById(chart_id).getContext('2d');
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0);

		var fillPattern = ctx.createPattern(img, 'repeat');

		var data = {
			labels: new Array(chart_dataset_pre.length).fill(''),
			datasets: [
				{
					backgroundColor: 'rgb(255, 255, 255 , 0.2)',
					lineTension: line_tention,
					data: chart_dataset_pre
				},
				{
					backgroundColor: fillPattern,
					lineTension: line_tention,
					data: chart_dataset_post,
					fill: true
				}
			]
		};

		var chart = new Chart(chart_id, {
			type: 'radar',
			data: data,
			options: gl_radar_options
		});

		return chart;
	};
	img.src = bg_img_url;
}

function renderRadarChartDemo(chart_id, bg_img_url, line_tention) {
	var ctx = document.getElementById(chart_id).getContext('2d');
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0);

		var fillPattern = ctx.createPattern(img, 'repeat');

		var data = {
			labels: ['', '', ''],
			datasets: [{
				backgroundColor: fillPattern,
				lineTension: line_tention,
				data: getRandomFloats(0, 97, 3)
			}]
		};

		var chart = new Chart(chart_id, {
			type: 'radar',
			data: data,
			options: gl_radar_options
		});

		setInterval(
			function () {
				chart.data.datasets.forEach(function(dataset) {
					dataset.data = getRandomFloats(0, 97, 3);
				});
				chart.update();
			},
			2000
		);

		return chart;
	};
	img.src = bg_img_url;
}

function renderBellCurve(chart, yAxis_max, responsive, pre_score, post_score) {
	var renderer = chart.renderer,
		plotTop = chart.plotTop,
		plotLeft = chart.plotLeft,
		plotWidth = chart.plotWidth,
		plotHeight = chart.plotHeight,
		xAxis = chart.xAxis[0],
		categories = xAxis.categories,
		intervalWidth = xAxis.transA,
		resolution_md_threshold = 670,
		resolution_sm_threshold = 480
		legend_is_small = ((plotWidth >= resolution_md_threshold) || !responsive),
		legend_fontSize = (legend_is_small && !responsive) ? '8px': '12px',
		legend_height = (legend_is_small && !responsive) ? 20: legend_is_small ? 30 : 40,
		legend_y_offset = (legend_is_small && !responsive) ? 13: legend_is_small ? 20 : 17,
		bubble_fontSize = (legend_is_small && !responsive) ? '13px': '20px',
		pre_score_height = yAxis_max - 10,
		post_score_height = yAxis_max - ((legend_is_small && !responsive) ? 73: 90);

	if (plotWidth >= resolution_sm_threshold) {
		var box_pos = {
				x: 0,
				y: 0,
				width: plotLeft + intervalWidth * 11 / 2,
				height: legend_height
			},
			box_text = legend_is_small ? 'Extremely below': 'Extremely<br>below';
		// Extremely below
		if (typeof(chart.box_extremely_below) == 'undefined') {
			chart.box_extremely_below = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#dc485a', zIndex: 9})
				.add();
			chart.txt_extremely_below = renderer.text(box_text, box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_extremely_below.attr(box_pos);
		chart.txt_extremely_below.attr({text: box_text})
		chart.txt_extremely_below.attr({x: box_pos.x + (box_pos.width - chart.txt_extremely_below.getBBox().width) / 2})
		// Far below
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 10;
		if (typeof(chart.box_far_below) == 'undefined') {
			chart.box_far_below = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#ee6677', zIndex: 9})
				.add();
			chart.txt_far_below = renderer.text('Far below', box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_far_below.attr(box_pos);
		chart.txt_far_below.attr({x: box_pos.x + (box_pos.width - chart.txt_far_below.getBBox().width) / 2})
		// Below
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 5;
		if (typeof(chart.box_below) == 'undefined') {
			chart.box_below = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#f394a0', zIndex: 9})
				.add();
			chart.txt_below = renderer.text('Below', box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_below.attr(box_pos);
		chart.txt_below.attr({x: box_pos.x + (box_pos.width - chart.txt_below.getBBox().width) / 2})
		// Slightly below
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 5;
		box_text = legend_is_small ? 'Slightly below': 'Slightly<br>below';
		if (typeof(chart.box_slightly_below) == 'undefined') {
			chart.box_slightly_below = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#ffe6e9', zIndex: 9})
				.add();
			chart.txt_slightly_below = renderer.text(box_text, box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#ee6677', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_slightly_below.attr(box_pos);
		chart.txt_slightly_below.attr({text: box_text})
		chart.txt_slightly_below.attr({x: box_pos.x + (box_pos.width - chart.txt_slightly_below.getBBox().width) / 2})
		// Slightly above
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 5;
		box_text = legend_is_small ? 'Slightly above': 'Slightly<br>above';
		if (typeof(chart.box_slightly_above) == 'undefined') {
			chart.box_slightly_above = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#ebffca', zIndex: 9})
				.add();
			chart.txt_slightly_above = renderer.text(box_text, box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#9fdb3a', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_slightly_above.attr(box_pos);
		chart.txt_slightly_above.attr({text: box_text})
		chart.txt_slightly_above.attr({x: box_pos.x + (box_pos.width - chart.txt_slightly_above.getBBox().width) / 2})
		// Above
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 5;
		if (typeof(chart.box_above) == 'undefined') {
			chart.box_above = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#afe458', zIndex: 9})
				.add();
			chart.txt_above = renderer.text('Above', box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_above.attr(box_pos);
		chart.txt_above.attr({x: box_pos.x + (box_pos.width - chart.txt_above.getBBox().width) / 2})
		// Far above
		box_pos.x += box_pos.width;
		box_pos.width = intervalWidth * 10;
		if (typeof(chart.box_far_above) == 'undefined') {
			chart.box_far_above = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#9fdb3a', zIndex: 9})
				.add();
			chart.txt_far_above = renderer.text('Far above', box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_far_above.attr(box_pos);
		chart.txt_far_above.attr({x: box_pos.x + (box_pos.width - chart.txt_far_above.getBBox().width) / 2})
		// Extremely above
		box_pos.x += box_pos.width;
		box_pos.width = plotLeft + intervalWidth * 6;
		box_text = legend_is_small ? 'Extremely above': 'Extremely<br>above';
		if (typeof(chart.box_extremely_above) == 'undefined') {
			chart.box_extremely_above = renderer.rect(box_pos.x, box_pos.y, box_pos.width, box_pos.height)
				.attr({fill: '#89cc13', zIndex: 9})
				.add();
			chart.txt_extremely_above = renderer.text(box_text, box_pos.x + 20, box_pos.y + legend_y_offset)
				.attr({zIndex: 10, useHTML: true})
				.css({color: '#fff', fontWeight: 'bold', fontSize: legend_fontSize})
				.add()
		}
		chart.box_extremely_above.attr(box_pos);
		chart.txt_extremely_above.attr({text: box_text})
		chart.txt_extremely_above.attr({x: box_pos.x + (box_pos.width - chart.txt_extremely_above.getBBox().width) / 2})
	} else {
		if (typeof(chart.box_extremely_below) != 'undefined') {
			chart.box_extremely_below.destroy();
			delete chart.box_extremely_below;
			chart.txt_extremely_below.destroy();
			delete chart.txt_extremely_below;
		}
		if (typeof(chart.box_far_below) != 'undefined') {
			chart.box_far_below.destroy();
			delete chart.box_far_below;
			chart.txt_far_below.destroy();
			delete chart.txt_far_below;
		}
		if (typeof(chart.box_below) != 'undefined') {
			chart.box_below.destroy();
			delete chart.box_below;
			chart.txt_below.destroy();
			delete chart.txt_below;
		}
		if (typeof(chart.box_slightly_below) != 'undefined') {
			chart.box_slightly_below.destroy();
			delete chart.box_slightly_below;
			chart.txt_slightly_below.destroy();
			delete chart.txt_slightly_below;
		}
		if (typeof(chart.box_slightly_above) != 'undefined') {
			chart.box_slightly_above.destroy();
			delete chart.box_slightly_above;
			chart.txt_slightly_above.destroy();
			delete chart.txt_slightly_above;
		}
		if (typeof(chart.box_above) != 'undefined') {
			chart.box_above.destroy();
			delete chart.box_above;
			chart.txt_above.destroy();
			delete chart.txt_above;
		}
		if (typeof(chart.box_far_above) != 'undefined') {
			chart.box_far_above.destroy();
			delete chart.box_far_above;
			chart.txt_far_above.destroy();
			delete chart.txt_far_above;
		}
		if (typeof(chart.box_extremely_above) != 'undefined') {
			chart.box_extremely_above.destroy();
			delete chart.box_extremely_above;
			chart.txt_extremely_above.destroy();
			delete chart.txt_extremely_above;
		}
	}

	// draw pre
	if (pre_score != null) {
		// line
		var bubble_pre_radius = (legend_is_small && !responsive) ? 20: 30,
			bubble_pre_y_text_offset = (legend_is_small && !responsive) ? 5: 8,
			pre_score_pos = Math.max(Math.min(pre_score, 100), 0),
			box_pre_score_pos = {
				x: plotLeft + intervalWidth / 2 + pre_score_pos * intervalWidth / 2 - 1,
				y: plotHeight - pre_score_height + plotTop,
				width: 2,
				height: pre_score_height
			};
		if (typeof(chart.box_pre_score) == 'undefined') {
			chart.box_pre_score = renderer.rect(box_pre_score_pos.x, box_pre_score_pos.y, box_pre_score_pos.width, box_pre_score_pos.height)
				.attr({fill: '#4F5966', zIndex: 99})
				.add();
		}
		chart.box_pre_score.attr(box_pre_score_pos);
		// bubble + text
		var bubble_pre_score_pos = {
			x: box_pre_score_pos.x,
			y: box_pre_score_pos.y,
			r: bubble_pre_radius
		}
		if (typeof(chart.bubble_pre_score) == 'undefined') {
			chart.bubble_pre_score = renderer.circle(bubble_pre_score_pos.x, bubble_pre_score_pos.y, bubble_pre_score_pos.r)
				.attr({fill: '#4F5966', stroke: '#fff', 'stroke-width': 2, zIndex: 999})
				.add()
				.shadow(responsive);
			chart.text_pre_score = renderer.text(pre_score, bubble_pre_score_pos.x + 1, bubble_pre_score_pos.y + bubble_pre_y_text_offset)
				.attr({zIndex: 9999})
				.css({color: '#fff', fontWeight: 'bold', fontSize: bubble_fontSize})
				.add();
		}
		chart.bubble_pre_score.attr(bubble_pre_score_pos);
		chart.text_pre_score
			.attr({x: bubble_pre_score_pos.x - chart.text_pre_score.getBBox().width / 2 + 1, y: bubble_pre_score_pos.y + bubble_pre_y_text_offset})
			.css({fontSize: bubble_fontSize});
		// bullet
		var bullet_pre_score_pos = {
			x: box_pre_score_pos.x + 1,
			y: box_pre_score_pos.y + pre_score_height + 1,
			r: 5
		}
		if (typeof(chart.bullet_pre_score) == 'undefined') {
			chart.bullet_pre_score = renderer.circle(bullet_pre_score_pos.x, bullet_pre_score_pos.y, bullet_pre_score_pos.r)
				.attr({fill: '#4F5966', stroke: '#fff', 'stroke-width': 2, zIndex: 999})
				.add()
				.shadow(responsive);
		}
		chart.bullet_pre_score.attr(bullet_pre_score_pos);
	}

	// draw post
	if (post_score != null) {
		// line
		var bubble_post_length = (legend_is_small && !responsive) ? 40: 60,
			bubble_post_y_text_offset = (legend_is_small && !responsive) ? 5: 8,
			post_score_pos = Math.max(Math.min(post_score, 100), 0),
			box_post_score_pos = {
				x: plotLeft + intervalWidth / 2 + intervalWidth * post_score_pos / 2 - 1,
				y: plotHeight - post_score_height + plotTop,
				width: 2,
				height: post_score_height
			};
		if (typeof(chart.box_post_score) == 'undefined') {
			chart.box_post_score = renderer.rect(box_post_score_pos.x, box_post_score_pos.y, box_post_score_pos.width, box_post_score_pos.height)
				.attr({fill: '#4F5966', zIndex: 99})
				.add();
		}
		chart.box_post_score.attr(box_post_score_pos);
		// bubble + text
		var bubble_post_score_pos = {
			x: box_post_score_pos.x - ((legend_is_small && !responsive) ? 20: 30),
			y: box_post_score_pos.y - 30,
			width: bubble_post_length,
			height: bubble_post_length
		}
		if (typeof(chart.bubble_post_score) == 'undefined') {
			chart.bubble_post_score = renderer.rect(bubble_post_score_pos.x, bubble_post_score_pos.y, bubble_post_score_pos.width, bubble_post_score_pos.height)
				.attr({fill: '#4F5966', stroke: '#fff', 'stroke-width': 2, zIndex: 999})
				.add()
				.shadow(responsive);
			chart.text_post_score = renderer.text(post_score, bubble_post_score_pos.x, bubble_post_score_pos.y + (bubble_post_length / 2) + bubble_post_y_text_offset)
				.attr({zIndex: 9999})
				.css({color: '#fff', fontWeight: 'bold', fontSize: bubble_fontSize})
				.add();
		}
		chart.bubble_post_score.attr(bubble_post_score_pos);
		chart.text_post_score
			.attr({x: bubble_post_score_pos.x + (bubble_post_score_pos.width - chart.text_post_score.getBBox().width) / 2})
			.css({fontSize: bubble_fontSize});
		// bullet
		var bullet_post_score_pos = {
			x: box_post_score_pos.x - 4,
			y: box_post_score_pos.y + post_score_height - 4,
			width: 10,
			height: 10
		}
		if (typeof(chart.bullet_post_score) == 'undefined') {
			chart.bullet_post_score = renderer.rect(bullet_post_score_pos.x, bullet_post_score_pos.y, bullet_post_score_pos.width, bullet_post_score_pos.height)
				.attr({fill: '#4F5966', stroke: '#fff', 'stroke-width': 2, zIndex: 999})
				.add()
				.shadow(responsive);
		}
		chart.bullet_post_score.attr(bullet_post_score_pos);
	}
}

function renderBellCurveFreemium(chart, yAxis_max, responsive, score) {
	var renderer = chart.renderer,
		plotTop = chart.plotTop,
		plotLeft = chart.plotLeft,
		plotWidth = chart.plotWidth,
		plotHeight = chart.plotHeight,
		containerWidth = chart.containerWidth - plotLeft * 2,
		xAxis = chart.xAxis[0],
		categories = xAxis.categories,
		intervalWidth = xAxis.transA,
		resolution_md_threshold = 670,
		resolution_sm_threshold = 480
		legend_is_small = ((plotWidth >= resolution_md_threshold) || !responsive),
		legend_fontSize = (legend_is_small && !responsive) ? '8px': '12px',
		legend_height = (legend_is_small && !responsive) ? 20: legend_is_small ? 30 : 40,
		legend_y_offset = (legend_is_small && !responsive) ? 13: legend_is_small ? 20 : 17,
		bubble_fontSize = (legend_is_small && !responsive) ? '13px': '20px',
		score_height = yAxis_max - 10;

	// legend
/*	var label_left_args = {
		x: plotLeft + 2,
		y: plotHeight + plotTop - 35
	}
	if (typeof(chart.label_left) == 'undefined') {
		chart.label_left = renderer.label('Lower Level of<br>Attention Skills', label_left_args.x, label_left_args.y)
			.css({
				color: gl_right_color,
				fontWeight: 'bold',
				fontSize: '10px'
			})
			.add();
	}
	chart.label_left.attr(label_left_args);

	var label_right_args = {
		x: null,
		y: plotHeight + plotTop - 35
	}
	if (typeof(chart.label_right) == 'undefined') {
		chart.label_right = renderer.label('Higher Level of<br>Attention Skills', label_right_args.x, label_right_args.y)
			.css({
				color: gl_left_color,
				fontWeight: 'bold',
				fontSize: '10px'
			})
			.add();
	}
	chart.label_right.attr(label_right_args);
	chart.label_right.attr({
		x: containerWidth + plotLeft - chart.label_right.width
	});*/

	// line
	var score_pos = Math.max(Math.min(score, 100), 0),
		box_score_pos = {
			x: plotLeft + intervalWidth / 2 + score_pos * intervalWidth / 2 - 1,
			y: plotHeight - score_height + plotTop,
			width: 2,
			height: score_height
		};
	if (typeof(chart.box_score) == 'undefined') {
		chart.box_score = renderer.rect(box_score_pos.x, box_score_pos.y, box_score_pos.width, box_score_pos.height)
			.attr({fill: '#4F5966', zIndex: 99})
			.add();
	}
	chart.box_score.attr(box_score_pos);

	// bubble + text
	var bubble_pos = {
		x: box_score_pos.x,
		y: box_score_pos.y - 30
	}

	if (typeof(chart.bubble) == 'undefined') {
		chart.bubble = renderer.label($('#bell_curve_freemium_bubble').html(), bubble_pos.x, bubble_pos.y)
			.css({
				color: '#4F5966'
			})
			.attr({
				fill: '#4F5966',
				stroke: '#fff',
				'stroke-width': 2,
				padding: 10,
				r: 10,
				zIndex: 101,
				useHTML: true,
				align: 'center',
			})
			.add()
			.shadow(responsive);
		chart.bubble_text = renderer.text($('#bell_curve_freemium_bubble').html(), bubble_pos.x, bubble_pos.y + 25)
			.css({
				color: '#fff'
			})
			.attr({
				zIndex: 101,
				useHTML: true,
				align: 'center'
			})
			.add();
	}
	if (score > 0) {
		bubble_pos.anchorX = bubble_pos.x;
		bubble_pos.x = Math.max(bubble_pos.x, chart.bubble.getBBox().width / 2 + 20);
	} else if (score < 0) {
		bubble_pos.anchorX = bubble_pos.x;
		bubble_pos.x = Math.min(bubble_pos.x, chart.containerWidth - chart.bubble.getBBox().width / 2 - 20);
	}
	chart.bubble.attr(bubble_pos);
	chart.bubble_text.attr({x: bubble_pos.x, y: bubble_pos.y + 25});

	// bullet
	var bullet_score_pos = {
		x: box_score_pos.x + 1,
		y: box_score_pos.y + score_height - 7,
		r: 5
	}
	if (typeof(chart.bullet_score) == 'undefined') {
		chart.bullet_score = renderer.circle(bullet_score_pos.x, bullet_score_pos.y, bullet_score_pos.r)
			.attr({fill: '#4F5966', stroke: '#fff', 'stroke-width': 2, zIndex: 999})
			.add()
			.shadow(responsive);
	}
	chart.bullet_score.attr(bullet_score_pos);
}

function renderRulerFreemium(chart, responsive, score) {
	var renderer = chart.renderer,
		plotTop = chart.plotTop,
		plotLeft = chart.plotLeft,
		plotWidth = chart.plotWidth,
		plotHeight = chart.plotHeight,
		containerHeight = chart.containerHeight,
		offsetTopBottom = 120,
		offsetLeftRight = plotWidth * 100 / 1280;

	// draw ruler
	var ruler_pos = {
		x: plotLeft,
		y: plotTop + offsetTopBottom,
		width: plotWidth,
		height: 15
	};
	if (typeof(chart.ruler) == 'undefined') {
		chart.ruler = renderer.rect(ruler_pos.x, ruler_pos.y, ruler_pos.width, ruler_pos.height)
			.attr({
				fill: gl_gradient,
				r: 7
			})
			.add();
	}
	chart.ruler.attr(ruler_pos);

	var xAxis_unit = ruler_pos.width / 108,
		bullet_pos = {
		x: ruler_pos.x + (
			(score > 0) ? (54 - score) * xAxis_unit : (Math.abs(score) + 54) * xAxis_unit
		),
		y: ruler_pos.y + 8,
		r: 10
	};
	if (typeof(chart.bullet) == 'undefined') {
		chart.bullet = renderer.circle(bullet_pos.x, bullet_pos.y, bullet_pos.r)
			.attr({
				fill: '#4F5966',
				stroke: '#fff',
				'stroke-width': 3,
				zIndex: 100
			})
			.add()
			.shadow(responsive);
	}
	chart.bullet.attr(bullet_pos);

	// bubble + text
	var bubble_pos = {
		x: bullet_pos.x,
		y: 10
	};
	if (typeof(chart.bubble) == 'undefined') {
		chart.bubble = renderer.label($('#swan_ruler_freemium_bubble').html(), bubble_pos.x, bubble_pos.y)
			.css({
				color: '#4F5966'
			})
			.attr({
				fill: '#4F5966',
				stroke: '#fff',
				'stroke-width': 2,
				padding: 10,
				r: 10,
				zIndex: 102,
				useHTML: true,
				align: 'center',
			})
			.add()
			.shadow(responsive);
		chart.bubble_text = renderer.text($('#swan_ruler_freemium_bubble').html(), bubble_pos.x, bubble_pos.y + 25)
			.css({
				color: '#fff'
			})
			.attr({
				zIndex: 103,
				useHTML: true,
				align: 'center'
			})
			.add();
	}
	if (score > 0) {
		bubble_pos.anchorX = bubble_pos.x;
		bubble_pos.x = Math.max(bubble_pos.x, chart.bubble.getBBox().width / 2 + 20);
	} else if (score < 0) {
		bubble_pos.anchorX = bubble_pos.x;
		bubble_pos.x = Math.min(bubble_pos.x, chart.containerWidth - chart.bubble.getBBox().width / 2 - 20);
	}
	chart.bubble.attr(bubble_pos);
	chart.bubble_text.attr({x: bubble_pos.x, y: bubble_pos.y + 25});

	// line
	var score_pos = Math.max(Math.min(score, 100), 0),
		box_score_pos = {
			x: bullet_pos.x - 1,
			y: bubble_pos.y + chart.bubble.getBBox().height,
			width: 2,
			height: bullet_pos.y - bubble_pos.y - chart.bubble.getBBox().height
		};

	if (typeof(chart.box_score) == 'undefined') {
		chart.box_score = renderer.rect(box_score_pos.x, box_score_pos.y, box_score_pos.width, box_score_pos.height)
			.attr({fill: '#4F5966', zIndex: 9})
			.add();
	}
	chart.box_score.attr(box_score_pos);
}


function fPurchaseTrainingChooseLicences(change_quantity_url) {
	$('.bundle_dec, .bundle_inc').click(function() {
		var bundle_id = $(this).attr('data-id'),
			bundle_step = parseInt($(this).attr('data-step'));
		fPurchaseTrainingChooseLicencesUpdateBundle(change_quantity_url, bundle_id, bundle_step);
	});
	$('.bundle_quantity').change(function () {
		var bundle_id = $(this).attr('id').substr(-1);
		fPurchaseTrainingChooseLicencesUpdateBundle(change_quantity_url, bundle_id, 0);
	});
	$('.bundle_quantity').trigger('focusout');
}

function fPurchaseTrainingChooseLicencesDisableAll() {
	$('#btnPurchase')
		.html('Please wait <em class="fa fa-spinner fa-spin"></em>')
		.attr('disabled', 'disabled');
	$('.bundle_dec, .bundle_inc, .bundle_quantity')
		.attr('disabled', 'disabled');
}

function fPurchaseTrainingChooseLicencesEnableAll(data) {
	$('#btnPurchase')
		.html(data.wizard_btn + ' <em class="fas fa-angle-right ml-3"></em>')
		.attr('disabled', false);
	$('.bundle_dec, .bundle_inc, .bundle_quantity').attr('disabled', false);
}

function fPurchaseTrainingChooseLicencesUpdateBundle(change_quantity_url, bundle_id, bundle_step) {
	var bundle_quantity_ctrl = $('#id_bundle_quantity_' + bundle_id),
		bundle_quantity_val = parseInt(bundle_quantity_ctrl.val()),
		bundle_quantity_val_new = bundle_quantity_val,
		bundle_body_ctrl = $('#bundle_body_' + bundle_id);;

	fPurchaseTrainingChooseLicencesDisableAll();

	bundle_body_ctrl.html('<em class="fa fa-spinner fa-spin"></em>');

	if (isNaN(bundle_quantity_val)) {
		bundle_quantity_val = 1;
	}
	bundle_quantity_val_new = bundle_quantity_val + bundle_step;
	if (bundle_quantity_val_new < 1) {
		bundle_quantity_val_new = 1;
	}

	$.post(
		change_quantity_url + '?callback=?',
		{
			bundle_id: bundle_id,
			bundle_quantity: bundle_quantity_val_new,
			csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
		},
		function(data) {
			bundle_quantity_ctrl.val(bundle_quantity_val_new);
			bundle_body_ctrl.html(data.bundle_body);

			fPurchaseTrainingChooseLicencesEnableAll(data);
		}
	);
}

function fPurchaseBaseCheckoutDisableAll() {
	$('#btnPurchase')
		.html('Please wait <em class="fa fa-spinner fa-spin"></em>')
		.attr('disabled', 'disabled');
}

function fPurchaseBaseCheckoutEnableAll(data) {
	$('#btnPurchase')
		.html(data.wizard_btn + ' <em class="fas fa-angle-right ml-3"></em>')
		.attr('disabled', false);
}

function fPurchaseBaseCheckout(apply_discount_code_url, remove_discount_code_url) {
	$('#discount-code-ex-button').click(function() {
		fPurchaseBaseCheckoutDisableAll();
		var order_widget_ctrl = $('#checkout_order_widget'),
			discount_code = $('#id_discount_code_ex').val();
		order_widget_ctrl.html('<em class="fa fa-spinner fa-spin"></em>');
		$.post(
			apply_discount_code_url + '?callback=?',
			{
				discount_code: discount_code,
				csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
			},
			function(data) {
				fPurchaseBaseCheckoutEnableAll(data);
				order_widget_ctrl.html(data.widget);
			}
		);
	});
	$('#remove-discount-link').click(function() {
		fPurchaseBaseCheckoutDisableAll();
		var order_widget_ctrl = $('#checkout_order_widget');
		order_widget_ctrl.html('<em class="fa fa-spinner fa-spin"></em>');
		$.post(
			remove_discount_code_url + '?callback=?',
			{
				csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
			},
			function(data) {
				fPurchaseBaseCheckoutEnableAll(data);
				order_widget_ctrl.html(data.widget);
			}
		);
	});
	$('#btnNewCard').click(function() {
		$('#frmNewCard').show();
		$('#btnNewCardLink').hide();
		$('html, body').animate({
			scrollTop: $('#frmNewCard').offset().top - 70
		}, 1500);
		$('.cards').each(function(i,e){
			$(e).parents('.cards_box').removeClass('box-teal');
		});
		$('#id_cards_0').parents('.cards_box').addClass('box-teal');
		$('#id_cards_0').prop('checked', true);
	});
	$('.cards').click(function() {
		$('.cards').each(function(i,e){
			$(e).parents('.cards_box').removeClass('box-teal');
		});
		$(this).parents('.cards_box').addClass('box-teal');
	});
}
