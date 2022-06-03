$(document).ready(function () {

    getKPINames();
    getUnitNames();
    getDate();
    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    $(this).closest('tr').remove();
 });

 $("#datatablesSimple1").on('click','#deleteRow',function(){
    var unitName =  $(this).closest('tr').find('.drpDwndatatype1').val();
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "DELETE",
      url: "http://localhost:8091/admin/unit/GHGEcart/deleteTECCardDetails/"+unitName,
     
    }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
    })

    });

});

var kpiData;
var unitOption;
var unitOptionS;

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


// append option to select
function getUnitNames() {
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getUnitNames",
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {

        unitOption+='<option value="'+item.unitValue+'">'+item.unitName + '</option>';
        unitOptionS+='<option value="'+item.unitValue+'">'+item.unitName + '</option>##';
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
    cell1.innerHTML = '<select class="form-control js-example-basic-single drpDwndatatype1"  placeholder="">'+unitOption+'</select>';
    cell2.innerHTML = '<input class="form-control" id="inputColumnName2" type="text" placeholder="Enter Label name"/>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwndatatype" placeholder="">'+kpiData+'</select>';
    cell4.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
  
   $('.js-example-basic-single').select2();
}


  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('.drpDwndatatype1').val() != undefined){
        const dataObj = {
            unitName : $(numberRow).find('.drpDwndatatype1').val(),
            lable : $(numberRow).find('#inputColumnName2').val(),
            kpiName: $(numberRow).find(".drpDwndatatype").val()
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
         
        url: "http://localhost:8091/admin/unit/GHGEcart/addTECCardDetails",
    }).done(function (data) {
       alert(data);
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
     $.ajax({
        headers: {
           "Content-Type": "application/json"
         },
         method: "GET",
         url: "http://localhost:8091/admin/unit/GHGEcart/getTECCardDetails",
       }).done(function (data) {
        var array1 = unitOptionS.split('##');
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of data) {
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwndatatype1" type="text" placeholder="">';
            
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['unitName']){
                    ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
                }else{
                  ittrdata+= array1[i];
                }
                
            }
            
          ittrdata+='</select></td>';
          ittrdata += '<td><input class="form-control" id="inputColumnName2" type="text" placeholder="Enter Column Name" value="'+ val['lable'] +'"/></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single drpDwndatatype" type="text" placeholder="">';
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
