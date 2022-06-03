$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    $(this).closest('tr').remove();
 });
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
});
// append option to select
function getKPINames() {
    //$.ajax({
        // method: "GET",
        // url: "http://localhost:8091/admin/common/getKPINames",
       
   // }).done(function (data) {
       var data= [
        {
            "kpiName": "UNITOVERVIEW_EQUIPMENTEOVERVIEW_TABLE_PT_202A_STACK_TEMP_(oC)",
            "kpiValue": "UNITOVERVIEW_EQUIPMENTEOVERVIEW_TABLE_PT_202A_STACK_TEMP_(oC)"
        },
        {
            "kpiName": "EMS_NWD_FROM_1UB_BFW_02_OPT",
            "kpiValue": "EMS_NWD_FROM_1UB_BFW_02_OPT"
        },
        {
            "kpiName": "CPPTPSO_BOILER_ACTUALVHP1",
            "kpiValue": "CPPTPSO_BOILER_ACTUALVHP1"
        },
        {
            "kpiName": "ELOO_PTA_PROCESS_FURNACE_TABLE_FUEL_OIL_CONSUMPTION_FURNACE_F1_550_ACTUAL",
            "kpiValue": "ELOO_PTA_PROCESS_FURNACE_TABLE_FUEL_OIL_CONSUMPTION_FURNACE_F1_550_ACTUAL"
        }]
    
        $.each(data, function (i, item) {
        $('.drpDwnKpi').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName ,
        }));
         
        
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });
    kpiData = data; 
  //  });

}

function getUnitNames() {
    //$.ajax({
        // method: "GET",
        // url: "http://localhost:8091/admin/common/getUnitNames",
       
   // }).done(function (data) {
       var data=[
        {
            "unitName": "FCCU",
            "unitValue": "FCCU"
        },
        {
            "unitName": "AVU2",
            "unitValue": "AVU2"
        }
    ]
    $.each(data, function (i, item) {
        $('#drpdownUnitName').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
        }));
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });
    unitNameData = data
}

function getModeNames() {
    //$.ajax({
        // method: "GET",
        // url: "http://localhost:8091/admin/common/getUnitNames",
       
   // }).done(function (data) {
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
    console.log('hii');
   
    const table = document.getElementById("datatablesSimple1");
    const table1 = document.getElementById("datatablebody");
    const lastrow = table1.rows[table1.rows.length - 1];
    // console.log(lastrow);
    const lstrow = $(lastrow).find('td')[0];
    const lstrow1 = $(lastrow).find('td')[1];
    
    
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    cell1.innerHTML = '<input class="form-control serialNo" type="text" value=""/>';
    cell2.innerHTML = '<input class="form-control type" value=""/>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi sec"></select>';
    cell4.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
    getUnitNames();
    getKPINames();
   
}





  // save table

function saveTable() {
    var unitName = document.getElementById("drpdownUnitName").value;
    var mode = document.getElementById("drpdownUOM").value;
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        const dataObj = {
            unitSteamCBUPKModel:{
                unitName:$('#drpdownUnitName').val(),
                mode:$('#drpdownUOM').val(),
                lebal : $(numberRow).find('#lebal').val(),
            },
            Serial_No : $(numberRow).find('#serialNo').val(),
           
            KPI_Name: $(numberRow).find(".drpDwnKpi").val(),

        }
        rowsdata.push(dataObj);
    }

    // var data = {
    //     Unit_Name : unitName  , Table_data : rowsdata
    // }
    console.log(rowsdata,'rowsdata');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: rowsdata,
         
        url: "http://localhost:8091/admin/home/asec/addColorRangeDetails",
    }).done(function (data) {
      var status = data.status;
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
    var unitName = {unit: $('#drpdownUnitName').val() ,mode: $('#drpdownUOM').val()}
    console.log(unitName,'unitName');
    // $.ajax({
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     data: unitName,
         
    //     url: "http://localhost:8091/admin/unit/scbu/getDonutDetails",
    // }).done(function (data) {
        var tabledata = [{
            "unitSteamCBUPKModel":{
                "unitName":"AVU1",
                "label" : "HP"
            },
            "serialNo":1,
            "kpiName":"Test kpi name"
        },
        {
            "unitSteamCBUPKModel":{
                "unitName":"AVU1",
                "label" : "MP"
            },
            "serialNo":2,
            "kpiName":"Test kpi name"
        }
        ];
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of tabledata) {
            ittrdata += '<td><input class="form-control " id="serialNo" type="text"  value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><input class="form-control " id="lebal" type="text" value="'+ val['unitSteamCBUPKModel']['label'] +'"/></td>';
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
    //   });
  }




