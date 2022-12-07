<script>
  import * as d3 from 'd3';
	import { claim_element, xlink_attr } from 'svelte/internal';

  let me;

  const data = [
    { name: 'nut', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'sweet', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'cream', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'fruit', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'grass', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'pepper', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'wood', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'soil', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'leather', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'toast', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'coffee', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
    { name: 'chocolate', 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', total: 9 },
  ];

  const width = 100;
  const height = 100;
  const innerRadius = 80;
  const outerRadius = 90;
  const x = d3.scaleBand()
    .domain(data.map((d) => d.name));
  const y = d3.scaleRadial()
    .domain([0, d3.max(data, (d) => d.total)])
    .range([innerRadius, outerRadius]);
  const z = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  const xAxis = (g) => g
    .attr('text-anchor', 'middle')
    .call((g) => g.selectAll('g'))
      .data(data)
      .join(g)
        .attr('transform', (g) => `
          rotate(${((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call((g) => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call((g) => g.append("text")
            .attr("transform", (d) => (x(d.name) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                ? "rotate(90)translate(0,16)"
                : "rotate(-90)translate(0,-9)")
            .text((d) => d.State));
  const yAxis = (g) => g
      .attr("text-anchor", "middle")
      .call((g) => g.append("text")
          .attr("y", (d) => -y(y.ticks(5).pop()))
          .attr("dy", "-1em")
          .text("Population"))
      .call((g) => g.selectAll("g")
        .data(y.ticks(5).slice(1))
        .join("g")
          .attr("fill", "none")
          .call((g) => g.append("circle")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.5)
              .attr("r", y))
          .call((g) => g.append("text")
              .attr("y", (d) => -y(d))
              .attr("dy", "0.35em")
              .attr("stroke", "#fff")
              .attr("stroke-width", 5)
              .text(y.tickFormat(5, "s"))
          .clone(true)
              .attr("fill", "#000")
              .attr("stroke", "none")));

  const arc = d3.arc()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(d.data.name))
    .endAngle((d) => x(d.data.name) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  const render = () => {
    const s = d3.select(me)
      .attr('width', '100px')
      .attr('height', '100px');
    
    s.append('g')
      .data(d3.stack().keys(data.columns.slice(1))(data))
      .join('g')
        .attr('fill', (d) => z(d.key))
      .selectAll('path')
      .data((d) => d)
      .join('path')
        .attr('d', arc);
    
    s.append('g')
      .call(xAxis);
    
    s.append('g')
      .call(yAxis);
    
    console.log('render', s);

    return s.node();
  }
</script>

<style>
  svg {
    aspect-ratio: 1 / 1;

    background-color: aqua;
  }
</style>

<svg bind:this={me}>
  {render()}
</svg>