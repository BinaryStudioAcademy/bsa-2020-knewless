import D3blackbox from 'd3blackbox';
import * as d3 from 'd3';

const DonutChart = D3blackbox((anchor, props, state) => {
  function donutChart() {
    let width;
    let height;
    let margin = { top: 100, right: 10, bottom: 100, left: 10 };
    let colour = d3.scaleOrdinal(d3.schemeCategory10);
    let variable;
    let category;
    let padAngle;
    const floatFormat = d3.format('.2r');
    let cornerRadius;
    const percentFormat = d3.format(',.2%');

    function chart(selection) {
      selection.each(data => {
        const radius = Math.min(width, height) / 2;

        const pie = d3
          .pie()
          .value(d => floatFormat(d[variable]))
          .sort(null);

        const arc = d3
          .arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.6 * 1.6)
          .cornerRadius(cornerRadius)
          .padAngle(padAngle);

        const svg = selection
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        svg.append('g').attr('class', 'slices');

        const path = svg
          .select('.slices')
          .datum(data)
          .selectAll('path')
          .data(pie)
          .enter()
          .append('path')
          .attr('fill', d => colour(d.data[category]))
          .attr('d', arc);

        d3.selectAll('.labelName text, .slices path').call(toolTip);

        function toolTip(selection) {
          selection.on('mouseenter', data => {
            svg
              .append('text')
              .attr('class', 'toolCircle')
              .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
              .html(toolTipHTML(data)) // add text to the circle.
              .style('font-size', '20px')
              .style('fill', '#ffffff')
              .style('text-anchor', 'middle'); // centres text in tooltip

            svg
              .append('circle')
              .attr('class', 'toolCircle')
              .attr('r', radius * 0.55 * 1.5) // radius of tooltip circle
              .style('fill', colour(data.data[category])) // colour based on category mouse is over
              .style('fill-opacity', 0.35);
          });
          selection.on('mouseout', () => {
            d3.selectAll('.toolCircle').remove();
          });
        }

        function toolTipHTML(data) {
          let tip = '';
          let i = 0;

          for (const key in data.data) {
            const value = !isNaN(parseFloat(data.data[key]))
              ? percentFormat(data.data[key])
              : data.data[key];

            if (i === 0) {
              tip += `<tspan x="0">${key}: ${value}</tspan>`;
            } else {
              tip += `<tspan x="0" dy="1.2em">${key}: ${value}</tspan>`;
            }
            i += 1;
          }
          return tip;
        }
      });
    }
    let radius;
    chart.width = function (value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
    };

    chart.height = function (value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
    };

    chart.margin = function (value) {
      if (!arguments.length) return margin;
      margin = value;
      return chart;
    };

    chart.radius = function (value) {
      if (!arguments.length) return radius;
      radius = value;
      return chart;
    };

    chart.padAngle = function (value) {
      if (!arguments.length) return padAngle;
      padAngle = value;
      return chart;
    };

    chart.cornerRadius = function (value) {
      if (!arguments.length) return cornerRadius;
      cornerRadius = value;
      return chart;
    };

    chart.colour = function (value) {
      if (!arguments.length) return colour;
      colour = value;
      return chart;
    };

    chart.variable = function (value) {
      if (!arguments.length) return variable;
      variable = value;
      return chart;
    };

    chart.category = function (value) {
      if (!arguments.length) return category;
      category = value;
      return chart;
    };

    return chart;
  }
  const donut = donutChart()
    .width(300)
    .height(150)
    .cornerRadius(5)
    .padAngle(0.015)
    .variable('Courses')
    .category('Path');

  d3.select(anchor.current)
    .datum(props.data)
    .call(donut);
});

export default DonutChart;
