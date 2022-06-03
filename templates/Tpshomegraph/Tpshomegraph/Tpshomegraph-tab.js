$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    $(this).closest('tr').remove();
 });
 $("#drpdownUnitName").on('change', function () {
    getDate();
});

getKPINames()
 getDate();
 
});
// append option to select
var kpiData1;
function getKPINames() {
    $.ajax({
        method: "GET",
         url: "http://localhost:8091/admin/common/getKPINames",
       
    }).done(function (data) {
       $.each(data, function (i, item) {
           if(item.kpiValue != undefined && item.kpiValue !=""){
            kpiData1+='<option value="'+item.kpiValue+'">'+item.kpiName + '</option>';
            }
       });
    });
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



  // save table

function saveTable() {
    var unitName = document.getElementById("drpdownUnitName").value;
    // var mode = document.getElementById("drpdownUOM").value;
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        const dataObj = {
            type: $('#drpdownUnitName').val(),
            serialNo : $(numberRow).find('.serialNo').val(),
            label: $(numberRow).find("#lebal").val(),
            actual: $(numberRow).find(".actual").val(),
            design : $(numberRow).find(".design").val(),
            uom : $(numberRow).find("#uom").val()

        }
        rowsdata.push(dataObj);
    }

    
    // console.log(data,'rowsdata');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(rowsdata),
         
        url: "http://localhost:8091/ems/tps/graph/addGraphDetails",
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
        var unitName =  $('#drpdownUnitName').val()
   
     $.ajax({
         headers: {
             "Content-Type": "application/json",
         },
       method: "GET",
         
         url: "http://localhost:8091/ems/tps/graph/"+unitName,
     }).done(function (data) {
        var tabledata = data;
        console.log(tabledata,'tabledata');
        var ittrdata = '';
        ittrdata += '<tr>';
        if (tabledata == null) {
            ittrdata += '<td><input class="form-control serialNo" id="serialNo" type="text"  value=""/></td>';
            ittrdata += '<td><input class="form-control " id="lebal" type="text" value=""/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single actual">'+kpiData1+ '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single design">'+kpiData1+'</select></td>';
            ittrdata += '<td><input class="form-control " id="uom" type="text" value=""/></td>';
        } else {
                ittrdata += '<td><input class="form-control serialNo" id="serialNo" type="text"  value="'+ tabledata['serialNo'] +'"/></td>';
                ittrdata += '<td><input class="form-control " id="lebal" type="text" value="'+ tabledata['label'] +'"/></td>';
                ittrdata += '<td><select class="form-control js-example-basic-single actual">'
                for (const kpiD of kpiData) {
                    if(kpiD['kpiValue'] == tabledata['actual'])
                     ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                    else 
                     ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                     }
                ittrdata += '</select></td>';
                ittrdata += '<td><select class="form-control js-example-basic-single design">'
                for (const kpiD of kpiData) {
                    if(kpiD['kpiValue'] == tabledata['design'])
                     ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                    else 
                     ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                     }
                ittrdata += '</select></td>';
                ittrdata += '<td><input class="form-control " id="uom" type="text" value="'+tabledata['uom'] +'"/></td>';
       
          
        }
        ittrdata += '</tr>';
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
      });
    });
  }


  




