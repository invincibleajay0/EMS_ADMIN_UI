

$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    let id =  $(this).closest('tr').find('.unitName').val();
  console.log( id );
  $.ajax({
    headers: {
        "Content-Type": "application/json",
    },
    method: "DELETE",
    url: "http://localhost:8091/admin/unit/horizontal/deleteSpeedMeterDetails/"+id,
    }).done(function (data) {
        console.log(data)
        $(this).closest('tr').remove();
        getDate();
    })
     
 });
    getUnitNames();
    getKPINames();
    getDate();
 
});
var unitNameData='';
var kpiData='';
var unitNameDataS='';
var kpiDataS='';
// window.onload = function() {
//      unitNameData='';
//         kpiData='';
//         unitNameDataS='';
//         kpiDataS='';
//     getColorcode();
//     getOperator();
//     getDate();
// }


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


function getUnitNames() {
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getUnitNames",
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {
        unitNameData+='<option value="'+item.unitValue+'">'+item.unitName + '</option>';
        unitNameDataS+='<option value="'+item.unitValue+'">'+item.unitName + '</option>##';  
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
            kpiDataS+='<option value="'+item.kpiValue+'">'+item.kpiName + '</option>##';  
        }
       });
       console.log(kpiDataS);
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
    cell1.innerHTML = '<select class="form-control unitName">'+unitNameData+'</select>';
    cell2.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi actual">'+kpiData+'</select>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi reference">'+kpiData+'</select>';
    cell4.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
   
   
}


  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('.unitName').val()!=undefined){
        const dataObj = {
            unitName : $(numberRow).find('.unitName').val(),
            actual : $(numberRow).find('.actual').val(),
            reference: $(numberRow).find(".reference").val()
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
        url: "http://localhost:8091/admin/unit/horizontal/addSpeedMeterDetails",
    }).done(function (data) {
      var status = data;
      if (status == "success") {
        alert("Data Save Sucessfully!");
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
         url: "http://localhost:8091/admin/unit/horizontal/getSpeedMeterDetail",
       }).done(function (tabledata) {
       
        var ittrdata = '';
        var array = unitNameDataS.split('##');
        
        for (const val of tabledata) {
            ittrdata += '<tr>';
          ittrdata += '<td><select class="form-control unitName">';
            for(let i=0; i<array.length;i++ ){
                  
                let result = array[i].substring(array[i].indexOf('"')+1,array[i].indexOf('">'));
                
                if(result == val['unitName']){
                    ittrdata+='<option selected="selected" '+array[i].substring(array[i].indexOf('value'));
                }else{
                  ittrdata+= array[i];
                }
                
            }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single actual">';
          for (const kpiD of kpiData) {
            if(kpiD['kpiValue'] == val['actual'])
             ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
            else 
             ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
             }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single reference">';
          for (const kpiD of kpiData) {
            if(kpiD['kpiValue'] == val['reference'])
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

