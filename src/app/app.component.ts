import { ICRain } from './ICRain';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as $ from 'jquery';
import * as d3Scale from 'd3-scale';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jsonData: ICRain[] = [
    {
      Year: 1990,
      Precipitation: 2190672
    },
    {
      Year: 1995,
      Precipitation: 2399888
    },
    {
      Year: 1996,
      Precipitation: 2599285
    },
    {
      Year: 1997,
      Precipitation: 1945543
    },
    {
      Year: 1998,
      Precipitation: 2501223
    },
    {
      Year: 1999,
      Precipitation: 2897358
    },
    {
      Year: 2000,
      Precipitation: 2529872
    },
    {
      Year: 2001,
      Precipitation: 2059180
    },
    {
      Year: 2002,
      Precipitation: 2044818
    },
    {
      Year: 2003,
      Precipitation: 2263478
    },
    {
      Year: 2004,
      Precipitation: 2154068
    },
    {
      Year: 2005,
      Precipitation: 2467871
    },
    {
      Year: 2006,
      Precipitation: 2509840
    },
    {
      Year: 2007,
      Precipitation: 2492041
    },
    {
      Year: 2008,
      Precipitation: 2545813
    }
  ];
  //function call starts here


  ngOnInit(): void {
    //when the component loads

    let circleAttributes = {
      cx: function (data, index) {
        console.log(data);
        return index * (2008 - data.Year);
      },
      cy: function (data, index) {
        return data.Precipitation - 19455;//temp varaiable reoplace eith the domain and range mapper
      },
      fill: function () { return '#354232'; },
      r: 31
    };//not used now find a way to do  

    let scaleX = d3.scaleLinear().domain([1990, 2008]).range([10, 3000]);
    let scaleY = d3.scaleLinear().domain([1945543, 2897358]).range([1800, 10]);
    let line1, line2;
    this.lineDraw(scaleX, scaleY);
    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    d3.select('svg').append('g')
      .selectAll("circle")
      .data(this.jsonData)
      .enter()
      .append("circle")
      .attr("cx", function (data, index) {
        return scaleX(data.Year);
      })
      .attr("cy", function (data, index) {
        return scaleY(data.Precipitation);
      })
      .attr("r", 7).style('fill', '#354232')
      .on('mouseover', function (d) {
        d3.select(this).style("stroke", "red").style("stroke-width", 4).style('fill', 'white');

        line1 = d3.select('svg').append("line")          // attach a line
          .style("stroke-dasharray", (20))
          .style("stroke", "black")  // colour the line
          .attr("x1", parseFloat(this.cx.baseVal.value))     // x position of the first end of the line
          .attr("y1", 0)      // y position of the first end of the line
          .attr("x2", parseFloat(this.cx.baseVal.value))     // x position of the second end of the line
          .attr("y2", 3000);

        line2 = d3.select('svg').append("line")          // attach a line
          .style("stroke-dasharray", (20))
          .style("stroke", "black")  // colour the line
          .attr("x1", 0)     // x position of the first end of the line
          .attr("y1", parseFloat(this.cy.baseVal.value))      // y position of the first end of the line
          .attr("x2", 4000)     // x position of the second end of the line
          .attr("y2", parseFloat(this.cy.baseVal.value))

      })
      .on('mouseout', function (d) {
        d3.select(this).style("stroke", "none").style('fill', "#354232");
        line1.remove();
        line2.remove();
      }).on('click', function (this) {
        div.html(`<text style="color:red;" id="m">I love SVG!</text>`)
          .style("left", (d3.event.pageX + 50) + "px")
          .style("top", (d3.event.pageY - 50) + "px")
          .style("opacity",1);

      });
    let axisX = d3.axisBottom(scaleX);
    axisX.tickArguments([this.jsonData.length])
    d3.select('svg').append("g")
      .attr("transform", "translate(0,1800)")
      .call(axisX);
    let axisY = d3.axisRight(scaleY);
    axisY.tickArguments([this.jsonData.length])
    d3.select('svg').append("g")
      .attr("transform", "translate(10,0)")
      .call(axisY);
  }
  lineDraw(scaleX, scaleY) {
    let lineFunction = (data) => {
      console.log('hello');
      console.log(data)
      d3.line().x(scaleX(data.Year)).y(scaleY(data.Precipitation)).curve(d3.curveMonotoneX);
      console.log('hello');
    };
    d3.select('svg')
      .data(this.jsonData)
      .append("path")
      .attr("d", function (data) {
        d3.line().x(scaleX(data.Year)).y(scaleY(data.Precipitation)).curve(d3.curveMonotoneX)
      })
      .attr("stroke", "orange")
      .attr("stroke-width", 6)
      .attr("fill", "none");






  }


}


/*
        $("#exampleModal").css("left", (d3.event.pageX) + "px")
          .css("top", (d3.event.pageY - 28) + "px")
          .css("opacity", 1)
          $( "#tooltip" ).trigger( "click" );


        console.log('triggered the modal');


        */