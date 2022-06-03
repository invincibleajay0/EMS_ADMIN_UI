$(document).ready(function () {

    $('.js-example-basic-single').select2(
        {
            tags: true
        }
    );
    getUnitNames();
    getKPINames();
    getDate();

    //on Change dropdown
    $("#drpdownUnitName").on('change', function () {
        getDate();
    });

  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('#lebal').val();
    var unit = $('#drpdownUnitName').val();
    var deleteData =  {
        unitName : unit,
        label: type
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "DELETE",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/admin/unit/steambalance/deleteTableDetails",
     
  }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
  })
 });

 
});
// append option to select



var unitNameDataS;
var unitNameData;
var kpiData;




function getUnitNames() {
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getUnitNames",
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {
        unitNameData+='<option value="'+item.unitValue+'">'+item.unitName + '</option>';
        unitNameDataS+='<option value="'+item.unitValue+'">'+item.unitName + '</option>##';  
        $('#drpdownUnitName').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
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
    cell1.innerHTML = '<input class="form-control serialNo" id="serialNo" type="text" value=""/>';
    cell2.innerHTML = '<input class="form-control lebal" id="lebal" value=""/>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single actual" id="actual">'+kpiData+'</select>';
    cell4.innerHTML = '<select class="form-control js-example-basic-single reference" id="reference" >'+kpiData+'</select>';
    cell5.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
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
function checkempty(){
var table = $('#datatablesSimple1').DataTable();

if ( ! table.data().any() ) {
    alert( 'Empty table' );
}
}
  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('#serialNo').val()!=undefined){
        const dataObj = {
            unitSteamBalancePKModel : {
                unitName : $('#drpdownUnitName').val(),
                label : $(numberRow).find('#lebal').val(),
            },
            serialNo : $(numberRow).find('#serialNo').val(),
            actual : $(numberRow).find('#actual').val(),
            reference: $(numberRow).find("#reference").val(),
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
        
        url: "http://localhost:8091/admin/unit/steambalance/addTableDetails",
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
        const dataObj = {
            unitName : $('#drpdownUnitName').val()}
    
    $.ajax({
         headers: {
            "Content-Type": "application/json",
       },

         method: "POST",
         data: JSON.stringify(dataObj),
         url: "http://localhost:8091/admin/unit/steambalance/getTableDetails",
     }).done(function (data) {
        
        var ittrdata = ''; 
        for (const val of data) {
            ittrdata += '<tr>';
            ittrdata += '<td><input style="width: fit-content" class="form-control serialNo" id="serialNo" type="number" value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><input style="width: fit-content" class="form-control lebal" id="lebal" value="'+ val['unitSteamBalancePKModel']['label'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single actual" id="actual" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['actual'])
                 ittrdata += '<option value="'+kpiD['kpiValue']+'" selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value="'+kpiD['kpiValue']+'">'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single reference" id="reference" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['reference'])
                 ittrdata += '<option value="'+kpiD['kpiValue']+'" selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value="'+kpiD['kpiValue']+'">'+kpiD['kpiName']+'</option>';
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
 


