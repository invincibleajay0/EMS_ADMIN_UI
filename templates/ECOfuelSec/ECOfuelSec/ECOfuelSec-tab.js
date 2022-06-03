$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    $(this).closest('tr').remove();
 });
 getKPINames();
 getDeviation();
 getColor();
 getUom();
 getDate();
 
 // on change
 $("#drpdownUom").on('change', function () {
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

function getUom() {
   
       var data=[
        {
            "unitName": "MT/MT of Crude",
            "unitValue": "MT/MT of Crude"
        },
        {
            "unitName": "Gcal/MT of Crude",
            "unitValue": "Gcal/MT of Crude"
        }
    ]
    $.each(data, function (i, item) {
        $('#drpdownUom').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
        }));
      
    });
}

function getColor() {
    var data=[
     {
         "colorKey": "red",
         "colorValue": "red"
     },
     {
         "colorKey": "green",
         "colorValue": "green"
     }
 ]
 $.each(data, function (i, item) {
     $('.colorData').append($('<option>', { 
         value: item.colorKey,
         text : item.colorValue ,
     }));
    // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
 });
 colorData = data
}

function getDeviation() {
    //$.ajax({
        // method: "GET",
        // url: "http://localhost:8091/admin/common/getUnitNames",
       
   // }).done(function (data) {
       var data=[
        {
            "devKey": "sec-ref",
            "DevValue": "sec-ref"
        },
        {
            "devKey": "ref-sec",
            "DevValue": "ref-sec"
        }
    ]
    $.each(data, function (i, item) {
        $('.deviationData').append($('<option>', { 
            value: item.devKey,
            text : item.DevValue ,
        }));
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });
    deviationData = data
}

// save table

function saveTable() {
    
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        const dataObj = {
                uom:$('#drpdownUom').val(),
                lebal : $(numberRow).find('.lebal').val(),
                actual : $(numberRow).find('.actual').val(),
                reference : $(numberRow).find('.reference').val(),
                deviation : $(numberRow).find('.deviation').val(),
                positive : $(numberRow).find('.positive').val(),
                negative : $(numberRow).find('.negative').val(),

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
         
        url: "http://localhost:8090/ems/eco/fuel/addcartdetails",
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
    var unitName = {unit: $('#drpdownUom').val()}
    console.log(unitName,'unitName');
    // $.ajax({
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     data: unitName,
         
    //     url: "http://localhost:8090/ems/eco/fuel/getcartdetails",
    // }).done(function (data) {
        var tabledata = [
            {
                "uom": "INR/hr",
                "label": "Fuel",
                "actual": "Fuel",
                "reference": "Fuel",
                "deviation": "Fuel",
                "positive": "red",
                "negative": "green"
            },
            {
                "uom": "INR",
                "label": "Fuel",
                "actual": "kj",
                "reference": "hvjh",
                "deviation": "jkjoh",
                "positive": "red",
                "negative": "green"
            }
        ];        
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of tabledata) {
            ittrdata += '<td><input style="width: fit-content" class="form-control uom" type="text" value="'+ $('#drpdownUom').val()+'"/></td>';
            ittrdata += '<td><input style="width: fit-content" class="form-control lebal" type="text" value="'+ $('#drpdownUom').val()+'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single actual" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['actual'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single reference" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['reference'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select style="width: fit-content" class="form-control deviation">'
            for (const DD of deviationData) {
                if(DD['devKey'] == val['deviation'])
                 ittrdata += '<option value='+DD['devKey']+' selected>'+DD['DevValue']+'</option>';
                else 
                 ittrdata += '<option value='+DD['devKey']+'>'+DD['DevValue']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select style="width: fit-content" class="form-control positive">'
            for (const DD of colorData) {
                if(DD['colorKey'] == val['positive'])
                 ittrdata += '<option value='+DD['colorKey']+' selected>'+DD['colorValue']+'</option>';
                else 
                 ittrdata += '<option value='+DD['colorKey']+'>'+DD['colorValue']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select style="width: fit-content" class="form-control negative">'
            for (const DD of colorData) {
                if(DD['colorKey'] == val['negative'])
                 ittrdata += '<option value='+DD['colorKey']+' selected>'+DD['colorValue']+'</option>';
                else 
                 ittrdata += '<option value='+DD['colorKey']+'>'+DD['colorValue']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '</tr>';
          
        }
       
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
    //   });
  }





