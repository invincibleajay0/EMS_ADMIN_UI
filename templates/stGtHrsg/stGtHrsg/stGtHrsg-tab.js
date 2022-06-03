$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  getPageType();
 getKPINames();
 getDate();
 
 // on change
 $("#drpdownUnitName").on('change', function () {
    $("#drpdownType").empty();
    getPageType();
    getDate();
});

$("#drpdownType").on('change', function () {
    getDate();
});

    $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('#lebal').val();
    var uoms =  $('#drpdownType').val();
    var unit = $('#drpdownUnitName').val();
    var deleteData =  {
        pageName : unit,
        type: uoms,
        label:type
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/ems/euip/stgthrsg/graph/deleteDonutDetails",
     
    }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
    })

    });
});


var kpiData;
// append option to select
function getPageType() {
    var pageName = $('#drpdownUnitName').val();
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getstgt/"+pageName,
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {
        $('#drpdownType').append($('<option>', { 
            value: item.embedded.type,
            text : item.embedded.type ,
        }));
    });
    
});
}

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

// add row

function addRow() {
    const table = document.getElementById("datatablebody");
   
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    cell1.innerHTML = '<input class="form-control" id="lebal" value=""/>';
    cell2.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi " id="actual">'+kpiData+'</select>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi " id="design">'+kpiData+'</select>';
    cell4.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi " id="CUPS">'+kpiData+'</select>';
    cell5.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
   
}





  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if( $(numberRow).find('#lebal').val()!=undefined){
        const dataObj = {
            embeddded:{
                pageName : $('#drpdownUnitName').val(),
                type : $('#drpdownType').val(),
                label : $(numberRow).find('#lebal').val(),
            },
            actual : $(numberRow).find('#actual').val(),
            design: $(numberRow).find("#design").val(),
            capacity_Utilization :$(numberRow).find("#CUPS").val(),
        }
        rowsdata.push(dataObj);
        }
    }

    console.log(rowsdata,'rowsdata');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(rowsdata),
         
        url: "http://localhost:8091/ems/euip/stgthrsg/graph/add",
    }).done(function (data) {
      var status = data;
      if (status == "success") {
        alert("Record Save Sucessfully!");
        getDate();
      }
      if (status == "error") {
        alert("Error occurs");
      } 
        
    })
}

  // data render in table
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

  function getDate() {

    getUserRole(function(kpiData)
    { 
        var unitName = {pageName: $('#drpdownUnitName').val() ,type: $('#drpdownType').val()}
   
     $.ajax({
         headers: {
             "Content-Type": "application/json",
         },
       method: "POST",
         data: JSON.stringify(unitName),
         
         url: "http://localhost:8091/ems/euip/stgthrsg/graph/get",
     }).done(function (data) {
        
        var ittrdata = '';
        for (const val of data) {
            ittrdata += '<tr>';
            ittrdata += '<td><input class="form-control" id="lebal"   value="'+ val['embeddded']['label'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi actual" id="actual">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['actual'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi design" id="design">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['design'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi" id="CUPS">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['capacity_Utilization'])
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
    });
  }




