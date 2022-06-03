$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('.type').val();
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "DELETE",
      url: "http://localhost:8091/ems/euip/graph/"+type,
     
    }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
    })

    });
 getKPINames();
 getType()
 getDate();
});
// append option to select
var typeDataOption;
var typeDataOptionS;
var kpiData;

function getKPINames() {
  $.ajax({
      method: "GET",
       url: "http://localhost:8091/admin/common/getKPINames",
     
  }).done(function (data) {
     $.each(data, function (i, item) {
         if(item.kpiValue != undefined && item.kpiValue !=""){
          kpiData+='<option value="'+item.kpiValue+'">'+item.kpiName + '</option>';
          }
     });
  });
}

function getType() {
  // $.ajax({
  //      method: "GET",
  //      url: "http://localhost:8091/admin/home/asec/getColor",
     
  // }).done(function (data) {

  var data = [
    {
      value : "VHP1",
      text : "VHP1"
  },
  {
    value : "VHP2",
    text : "VHP2"
},
{
  value : "VHP3",
  text : "VHP3"
},
{
  value : "UB1",
  text : "UB1"
},
{
  value : "UB2",
  text : "UB2"
},
]
    
  $.each(data, function (i, item) {
    typeDataOption+='<option value="'+item.value+'">'+item.text + '</option>' ;
    typeDataOptionS+='<option value="'+item.value+'">'+item.text + '</option>##' ;
     
  });
// });
}

function getUserRole(callback) {
  var kpiData;
  $.ajax({
       method: "GET",
       url: "http://localhost:8091/admin/common/getKPINames",
      
     
  }).done(function (data) {
      kpiData=data;
      
      $.each(data, function (i, item) {
      $('.drpDwndatatype').append($('<option>', { 
          value: item.kpiValue,
          text : item.kpiName 
      }));
       
     
     // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
      });
      callback(kpiData);
  });
       
}
 // add row

function addRow() {
  const table = document.getElementById("datatablebody");
 
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  
  cell1.innerHTML = '<select class="form-control type">'+typeDataOption+'</select>';
  cell2.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi actual">'+kpiData+'</select>';
  cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi design">'+kpiData+'</select>';
  cell4.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi rfg">'+kpiData+'</select>';
  cell5.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi fo">'+kpiData+'</select>';
  cell6.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
  $('.js-example-basic-single').select2();
 
}
  // save table

function saveTable() {
    // var unitName = document.getElementById("drpdownUnitName").value;
    // var mode = document.getElementById("drpdownUOM").value;
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if( $(numberRow).find('.type').val()!=undefined){
        const dataObj = {
          type : $(numberRow).find('.type').val(),
          actual : $(numberRow).find('.actual').val(),
            design: $(numberRow).find(".design").val(),
            rfg: $(numberRow).find(".rfg").val(),
            fo: $(numberRow).find('.fo').val()

        }
        rowsdata.push(dataObj);
      }
    }
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(rowsdata),
       
      url: "http://localhost:8091/ems/euip/graph/addCart",
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
    getUserRole(function(kpiData)
    { 
     $.ajax({
         headers: {
             "Content-Type": "application/json",
         },
       method: "GET",
         url: "http://localhost:8091/ems/euip/graph/get",
     }).done(function (data) {
        var ittrdata = '';
        var array1 = typeDataOptionS.split('##');
        ittrdata += '<tr>';
        for (const val of data) {
          ittrdata += '<td><select class="form-control type">'
          for(let i=0; i<array1.length;i++ ){
                
              let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
              
              if(result == val['type']){
                  ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
              }else{
                ittrdata+= array1[i];
              }
              
          }
          ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single actual">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['actual'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single design">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['design'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single rfg">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['rfg'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single fo">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['fo'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
          ittrdata += '</tr>';
          
        }
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
      });
    })
  }


  




