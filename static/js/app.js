
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Promise Pending
const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);

var nameList = [];
var metaDataList = [];
var optionsData=[];
var selectedValue;

//Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
dataPromise.then(function(data) {
  //console.log(data.names);
   nameList = data.names
  //console.log(nameList);
  //console.log(data.samples[0].id);

// Store the valus and text for dropdown in a list of dictionaries
  optionsData = nameList.map(function(item,index)
  {
    return {'value':parseInt(item),'text': item }
  });
  //console.log(optionsData)
  

  // Load the dropdown with list of ids from name list,

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

      // Call updateData() when a change takes place to the DOM
     d3.selectAll("#selDataset").on("change", updateData);

     function updateData()
     {
        let dropdownMenu = d3.select("#selDataset");
         // Assign the value of the dropdown menu option to a variable
        selectedId = dropdownMenu.property("value");
        console.log(selectedId);
        loadMetadata(selectedId);
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

  //Read the required data for the horizontal bar chrt
//   let idValue = data.samples[0].id;
//   let otu_idsValue = data.samples[0].otu_ids;
  //console.log(otu_idsValue)
  
  
  // Create the Bubble chart

});



