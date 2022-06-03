$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  getColorcode();
 getKPINames();
 getUnitNames();
 getModeNames();
 getDate();
 
 // on change
 $("#drpdownUnitName").on('change', function () {
    getDate();
});

$("#drpdownUOM").on('change', function () {
    getDate();
});

    $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('#lebal').val();
    var uoms =  $('#drpdownUOM').val();
    var unit = $('#drpdownUnitName').val();
    var deleteData =  {
        unitName : unit,
        uom: uoms,
        label:type
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/admin/unit/ecbu/deleteDonutDetails",
     
    }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
    })

    });
});

var colorDataOption;
var colorDataOptionS;
var kpiData;
// append option to select
function getUnitNames() {
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getUnitNames",
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {
        $('#drpdownUnitName').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
        }));
    });
    
});
}
function getColorcode() {
    $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/home/asec/getColor",
       
    }).done(function (data) {
      
    $.each(data, function (i, item) {
      colorDataOption+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>' ;
      colorDataOptionS+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>##' ;
       
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

function getModeNames() {
    var data=[
        {
            "unitName": "Gcal/hr",
            "unitValue": "Gcal/hr"
        },
        {
            "unitName": "INR/hr",
            "unitValue": "INR/hr"
        }
    ]
    $.each(data, function (i, item) {
        $('#drpdownUOM').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
        }));
      
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
    
    cell1.innerHTML = '<input class="form-control serialNo" type="text" value=""/>';
    cell2.innerHTML = '<input class="form-control" id="lebal" value=""/>';
    cell3.innerHTML = '<select class="form-control positive">'+colorDataOption+'</select>';
    cell4.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi sec">'+kpiData+'</select>';
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
            donutPkcontent:{
                unitName:$('#drpdownUnitName').val(),
                uom:$('#drpdownUOM').val(),
                label : $(numberRow).find('#lebal').val(),
            },
            serialNo : $(numberRow).find('.serialNo').val(),
            kpiName: $(numberRow).find(".drpDwnKpi").val(),
            labelColor: $(numberRow).find(".positive").val(),

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
         
        url: "http://localhost:8091/admin/unit/ecbu/addDonutDetails",
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
        var unitName = {unitName: $('#drpdownUnitName').val() ,uom: $('#drpdownUOM').val()}
   
     $.ajax({
         headers: {
             "Content-Type": "application/json",
         },
       method: "POST",
         data: JSON.stringify(unitName),
         
         url: "http://localhost:8091/admin/unit/ecbu/getDonutDetails",
     }).done(function (data) {
        
        var ittrdata = '';
        var array1 = colorDataOptionS.split('##');
        for (const val of data) {
            ittrdata += '<tr>';
            ittrdata += '<td><input class="form-control serialNo" id="serialNo" type="text"  value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><input class="form-control " id="lebal" type="text" value="'+ val['donutPkcontent']['label'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single positive">'
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['labelColor']){
                    ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
                }else{
                  ittrdata+= array1[i];
                }
                
            }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['kpiName'])
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




