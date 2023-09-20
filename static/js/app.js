
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Promise Pending
const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);

var nameList = [];
var metaDataList = [];
var optionsData=[];


//Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
dataPromise.then(function(data) {    
    //console.log(data.names);
   nameList = data.names
  //console.log(nameList);
  
// Store the valus and text for dropdown in a list of dictionaries
  optionsData = nameList.map(function(item)
  {
    return {'value':parseInt(item),'text': item }
  });
  //console.log(optionsData)
  
  // Load the dropdown with list of ids from name list
  var selectTag = d3.select("select");
  var options = selectTag.selectAll('option').data(optionsData);

      options.enter()
      .append('option')
      .attr('value', function(d) {
        return d.value;
      })
      .text(function(d) {
        return d.text;
      });

      //Initialize the metadata and charts with default
      //console.log("Default " + optionsData[0].text )
      loadMetadata(optionsData[0].value);
      plotCharts(optionsData[0].value);

    // Call updateData() when ID is changed
     d3.selectAll("#selDataset").on("change", updateData);

     function updateData()
     {
        let dropdownMenu = d3.select("#selDataset");
         // Assign the value of the dropdown menu option to a variable
        let selectedId = dropdownMenu.property("value");
        console.log(selectedId);
        loadMetadata(selectedId);
        plotCharts(selectedId);
     }

    //Read and load the metadata for selected individual
    function loadMetadata(selectedValue)
     {
        var metaDataText ="";
        metaDataList = data.metadata
        for (let cnt = 0; cnt < metaDataList.length; cnt ++)
        {
            // Compare the selected name id with the metadata 
            if(metaDataList[cnt].id == selectedValue)
            {
                // Display the results in Demographic Info section
                //console.log(metaDataList[cnt])                
                let selectedMetadata = metaDataList[cnt]
                Object.keys(selectedMetadata).forEach(function(key) {
                    //console.log(key + ":" + selectedMetadata[key]);                    
                    metaDataText = metaDataText + key + ":" + selectedMetadata[key] + "\n "                    
                 });
                 //console.log(metaDataText)                
                d3.select("#sample-metadata").text(metaDataText);               
            }            
        }                
     }

    // Create the horizontal bar chart for selected individual - may be a function
     function plotCharts(selectedValue)
     {
        //Read the required data for the horizontal barchart
        let sampleList = data.samples;
        //console.log(sampleList);
        for (let s =0; s < sampleList.length; s++ )
        {
            if(sampleList[s].id == selectedValue )
            {
                //console.log(sampleList[s]);
                let selectedSampleList = sampleList[s];
                //let sample_values = selectedSampleList.sample_values.slice(0,10).reverse();
                //let otu_labels = selectedSampleList.otu_labels.slice(0,10).reverse();
                let otu_ids = selectedSampleList.otu_ids.map(item=> "OTU " + item)                
                // console.log(otu_ids);

                // Data for Bar Graph
                    let barData = [{
                        x: selectedSampleList.sample_values.slice(0,10).reverse(),
                        y: otu_ids.slice(0,10).reverse(),
                        text: selectedSampleList.otu_labels.slice(0,10).reverse(),
                        name: "OTUs",
                        type: "bar",
                        orientation: "h",
                        width: 0.8
                    }];
                    
                    // Data array
                    //let data = [trace1];
                    
                    // Apply a title to the layout
                    let layout = {
                        title: "Top 10 OTUs for " + selectedValue.toString(),                      
                        margin: {
                            l: 100,
                            r: 100,
                            t: 100,
                            b: 100
                          }
                    };
                    
                    // Render the plot to the div tag with id "bar"
                    Plotly.newPlot("bar", barData, layout);

                    // Create the Bubble chart
                    //Data for Bubble chart
                    let trace1 = {
                        x: selectedSampleList.otu_ids,
                        y: selectedSampleList.sample_values,
                        text: selectedSampleList.otu_labels,
                        mode: 'markers',
                        marker: {
                          color: selectedSampleList.otu_ids,
                          size: selectedSampleList.sample_values
                        }
                      };
                      
                      let bubbleData = [trace1];
                      
                      let bubbleLayout = {
                        title: 'Bubble Chart for '+ selectedValue.toString(),
                        xaxis: { title:
                                    { text: "OTU ID"}},
                        showlegend: false,
                        height: 500,
                        width: 800
                      };
                      
                      Plotly.newPlot('bubble', bubbleData, bubbleLayout);  

            }
        }
     }  
  
});



