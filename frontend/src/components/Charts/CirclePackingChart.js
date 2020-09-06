import D3blackbox from 'd3blackbox';
import * as d3 from 'd3';

const CirclePackingChart = D3blackbox((anchor, props, state) => {
  const { width, height, data, wrapperId, styles } = props;

  if (data === undefined || data === null) return;

  const MAX_CIRCLES_AMOUNT = 14;
  if (data.length > MAX_CIRCLES_AMOUNT) {
    data.length = MAX_CIRCLES_AMOUNT;
  }

  const maxValue = Math.max(...data.map(d => d.value), 0);

  const svg = d3.select(anchor.current);
  svg.datum(data);

  const size = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, maxValue * 7]);

  const Tooltip = d3.select(`#${wrapperId}`)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('background-color', 'white')
    .style('color', 'black')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'absolute')
    .style('z-index', '10');

  const mouseover = function (d) {
    Tooltip.style('opacity', 1);
    d3.select(this)
      .style('fill', '#006395')
      .style('opacity', 1);
  };
  const mousemove = function (d) {
    Tooltip.html(d?.name || 'none')
      .style('left', `${d3.event.pageX + 20}px`)
      .style('top', `${d3.event.pageY}px`)
      .style('font-size', '15px');
  };
  const mouseleave = function (d) {
    Tooltip.style('opacity', 0);
    d3.select(this)
      .style('fill', styles?.circlesColor || '#676767')
      .style('opacity', 0.8);
  };

  const node = svg.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', d => size(d?.value || 0))
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', styles?.circlesColor || '#676767')
    .style('fill-opacity', 0.8)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);

  const simulation = d3.forceSimulation()
    .force('center', d3.forceCenter().x(width / 2).y(height / 2))
    .force('charge', d3.forceManyBody().strength(5))
    .force('collide', d3.forceCollide().strength(0.2).radius(d => size(d?.value || 0))
      .iterations(1))
    .force('collision', d3.forceCollide().radius(d => size(d?.value || 0)));
  simulation.nodes(data)
    .on('tick', d => {
      node
        .attr('cx', d => d?.x)
        .attr('cy', d => d?.y);
    });
});

export default CirclePackingChart;
