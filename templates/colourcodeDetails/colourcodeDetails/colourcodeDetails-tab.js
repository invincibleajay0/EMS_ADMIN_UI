$(document).ready(function () {

  $('.js-example-basic-single').select2({
    tags: true
  });
// delete row
$("#datatablesSimple1").on('click','#deleteRow',function(){
  let id =  $(this).closest('tr').find('.SrNo').val();
  console.log( id );
  $.ajax({
    headers: {
        "Content-Type": "application/json",
    },
    method: "DELETE",
     
    url: "http://localhost:8091/admin/home/asec/"+id,
}).done(function (data) {
  var status = data;
  if (status == "success") {
    alert("Record Save Sucessfully!");
    $(this).closest('tr').remove();
    getDate();
  }
  if (status == "error") {
    alert("Error occurs");
  } 
   
})
  $(this).closest('tr').remove();
});
getColorcode();
getOperator();
getDate();

});


window.onload = function() {
  getColorcode();
  getOperator();
  getDate();
}

var colorDataOption;
var colorDataOptionS;
var conditionDataOption;
var conditionDataOptionS;
// append option to select
function getColorcode() {
  $.ajax({
       method: "GET",
       url: "http://localhost:8091/admin/home/asec/getColor",
     
  }).done(function (data) {
    
  $.each(data, function (i, item) {
    colorDataOption+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>' ;
    colorDataOptionS+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>##' ;
     
  });

  colorData = data;
});
}

function getOperator() {
  $.ajax({
      method: "GET",
      url: "http://localhost:8091/admin/home/asec/getOperator",
     
 }).done(function (data) {
  
  $.each(data, function (i, item) {
    conditionDataOption+='<option value="'+item.operatorKey+'">'+item.operatorValue + '</option>';  
    conditionDataOptionS+='<option value="'+item.operatorKey+'">'+item.operatorValue + '</option>##';  
      
  });

  
});
}


function getColorcodeC(callback) {
  var colorData;
  $.ajax({
       method: "GET",
       url: "http://localhost:8091/admin/home/asec/getColor",
     
  }).done(function (data) {
    colorData=data;
  });
  callback(colorData);
}

function getOperatorC(callback) {
  var conditionData;
  $.ajax({
      method: "GET",
      url: "http://localhost:8091/admin/home/asec/getOperator",
     
 }).done(function (data) {
  conditionData=data;
});
callback(conditionData);
}

// add row
function addRow() {
    
  if ( document.getElementById("ERRORtblconfig").innerHTML != "") {
      document.getElementById("ERRORtblconfig").innerHTML= "";
  }
  const table = document.getElementById("datatablesSimple1");
  const table1 = document.getElementById("datatablebody");
  const lastrow = table1.rows[table1.rows.length - 1];
  // console.log(lastrow);
  const lstrow = $(lastrow).find('td')[0];
  const lstrow1 = $(lastrow).find('td')[1];
  // console.log(lstrow);
  const columnName = $(lstrow).find('#inputColumnName').val();
  const dataTypedrpdown = $(lstrow1).find('#drpDwndatatype').val();
  // console.log(columnName);
  // console.log(dataTypedrpdown);
 if (columnName == "" ||  dataTypedrpdown == "") {
     document.getElementById("ERRORtblconfig").innerHTML= 'Column name and Data type should not contain blank space and hyphen sign';
 } else {
  var row = table1.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = '<input class="form-control SrNo" id="Sr.No" type="number"/>';
  cell2.innerHTML = '<input class="form-control RangeFrom" id="Range_From" type="number"/>';
  cell3.innerHTML = '<select class="form-control condition" type="text" placeholder="">'+conditionDataOption+'</select>';
  cell4.innerHTML	= '<input class="form-control RangeTo" id="Range_To" type="number"/>'
  cell5.innerHTML = '<select class="form-control Color_code" type="text">'+colorDataOption+'</select>';
  cell6.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
 }

}




// save table

function saveTable() {
  console.log('hii');
  var tabledata = document.getElementById("datatablebody");
  var rowsdata = [];
  for ( i =0; i <= tabledata.rows.length-1; i++) {
      const numberRow = $(tabledata).find('tr')[i];
      const dataObj = {
        serialNo : $(numberRow).find('.SrNo').val(),
        fromRange : $(numberRow).find('.RangeFrom').val(),
        condition: $(numberRow).find(".condition").val(),
        toRange: $(numberRow).find(".RangeTo").val(),
        colorCode: $(numberRow).find(".Color_code").val()
      }
      rowsdata.push(dataObj);
  }
  console.log(rowsdata,'rowsdata');
  $.ajax({
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
    data:JSON.stringify(rowsdata) ,
     
    url: "http://localhost:8091/admin/home/asec/addColorRangeDetails",
}).done(function (data) {
  var status = data;
  if (status == "success") {
    alert("Record Save Sucessfully!");
  }
  if (status == "error") {
    alert("Error occurs");
  } 
    
})
}

// data render in table

function getDate() {
 
  

  $.ajax({
      
      method: "GET",
      url: "http://localhost:8091/admin/home/asec/getColorRangeDetails",
    }).done(function (tabledata) {

      var ittrdata = '';
      var array = conditionDataOptionS.split('##');
      var array1 = colorDataOptionS.split('##');  
      for (const val of tabledata) {
        ittrdata += '<tr>';
        var selectedValue = val['colorCode'];
        var selectedCondition = val['condition'];
        ittrdata += '<td><input class="form-control SrNo" id="Sr.No" type="number" placeholder="Enter Column Name" value="'+ val['serialNo'] +'"/></td>';
        ittrdata += '<td><input class="form-control RangeFrom" id="Range_From" type="number" placeholder="Enter Column Name" value="'+ val['fromRange'] +'"/></td>';
        ittrdata += '<td><select class="form-control condition">';
        
        for(let i=0; i<array.length;i++ ){

          let result = array[i].substring(array[i].indexOf('"')+1,array[i].indexOf('">'));
          if(result == selectedCondition){
            ittrdata+='<option selected="selected"'+array[i].substring(array[i].indexOf('value'));
          }else{
            ittrdata+= array[i];
          }
          
        }
        ittrdata +='</select></td>';
        ittrdata += '<td><input class="form-control RangeTo" id="Range_To" type="number" value="'+ val['toRange'] +'"/></td>';
        ittrdata += '<td><select class="form-control Color_code">';
        for(let i=0; i<array1.length;i++ ){

          let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
          if(result == selectedValue){
            ittrdata+='<option selected="selected"'+array1[i].substring(array1[i].indexOf('value'));
          }else{
            ittrdata+= array1[i];
          }
          
        }
        ittrdata +='</select></td>';
        ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
        ittrdata += '</tr>';


      }

      document.getElementById("datatablebody").innerHTML = ittrdata;
     
    });
  
}

function tableRender(tabledata) {
 
  getColorcodeC(function(colorData)
  {
    console.log("colorData",colorData);
    getOperatorC(function(conditionData)
    {
      console.log("conditionData",conditionData);
      var ittrdata = '';
      ittrdata += '<tr>';

      for (const val of tabledata) {
        
        var selectedValue = val['colorCode'];
        var selectedCondition = val['condition'];
        ittrdata += '<td><input class="form-control SrNo" id="Sr.No" type="number" placeholder="Enter Column Name" value="'+ val['serialNo'] +'"/></td>';
        ittrdata += '<td><input class="form-control RangeFrom" id="Range_From" type="number" placeholder="Enter Column Name" value="'+ val['fromRange'] +'"/></td>';
        ittrdata += '<td><select class="form-control condition">';
        for (const conditiond of conditionData) {
          if(conditiond['operatorKey'] == selectedCondition)
           ittrdata += '<option value='+conditiond['operatorKey']+' selected>'+conditiond['operatorValue']+'</option>';
          else 
           ittrdata += '<option value='+conditiond['operatorKey']+'>'+conditiond['operatorValue']+'</option>';
           }
        ittrdata += '</select></td>';
        ittrdata += '<td><input class="form-control RangeTo" id="Range_To" type="number" value="'+ val['toRange'] +'"/></td>';
        ittrdata += '<td><select class="form-control Color_code">';
        for (const cd of colorDatas) {
            if(cd['colorKey'] ==selectedValue)
             ittrdata += '<option value='+cd['colorKey']+' selected>'+cd['colorValue']+'</option>';
            else 
             ittrdata += '<option value='+cd['colorKey']+'>'+cd['colorValue']+'</option>';
        }
        
        ittrdata +='</select></td>';
        ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
        ittrdata += '</tr>';
      }

    });   
  });  
  

  document.getElementById("datatablebody").innerHTML = ittrdata;
}


