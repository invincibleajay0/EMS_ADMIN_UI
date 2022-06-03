$(document).ready(function () {

    $('.js-example-basic-single').select2( {
        tags: true
    });
    getUnitNames();
    getKPINames();
    getUom();
    getDate();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('#type').val();
    var unit = $('#drpdownUnitName').val();
  var deleteData =  {
        unitName : unit,
        type: type
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/admin/unit/feedplant/deleteFeedPlantDetails",
     
  }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
  })
    $(this).closest('tr').remove();
 });
 
 
  // on change
  $("#drpdownUnitName").on('change', function () {
    getDate();
});
});
// append option to select

var unitNameDataS;
var unitNameData;
var kpiData;

function getUserRole(callback) {
    var kpiData;
    $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/common/getKPINames",
        
       
    }).done(function (data) {
        kpiData=data;
        
        $.each(data, function (i, item) {
        $('.drpDwnKpi').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName 
        }));
         
       
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
        });
        callback(kpiData);
    });
         
}

function getUom() {
    var data=[
        {
            "keyUom": "gcal/hr",
            "valueUom": "gcal/hr"
        },
        {
            "keyUom": "ton/hr",
            "valueUom": "ton/hr"
        }
    ]
    $.each(data, function (i, item) {
        $('.drpdownUom').append($('<option>', { 
            value: item.valueUom,
            text : item.keyUom ,
        }));
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });
    uomData = data
}

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
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });
    unitNameData = data
})
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
    
    cell1.innerHTML = '<input class="form-control lebal" type="number" id="lebal" value=""/>';
    cell2.innerHTML = '<input class="form-control type" id="type" type="text" value=""/>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi ">'+kpiData+'</select>';
    cell4.innerHTML = '<input class="form-control uom" id="uom" value=""/>';
    cell5.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
   
}



 // save table

function saveTable() {
    var unitName = document.getElementById("drpdownUnitName").value;
    // var mode = document.getElementById("drpdownUOM").value;
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('#type').val()!=undefined){
        const dataObj = {
            unitFeedPlantPkModel:{
                unitName:$('#drpdownUnitName').val(),
                type : $(numberRow).find('#type').val(),
            },
            serialNo : $(numberRow).find('#lebal').val(),
            kpiName: $(numberRow).find(".drpDwnKpi").val(),
            uom : $(numberRow).find(".uom").val(),
            

        }
        rowsdata.push(dataObj);
    }
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
        data: JSON.stringify(rowsdata),
         
        url: "http://localhost:8091/admin/unit/feedplant/addFeedPlantDetails",
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
    var unitName = {unitName: $('#drpdownUnitName').val()}
    console.log(unitName,'unitName');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(unitName),
         
        url: "http://localhost:8091/admin/unit/feedplant/getFeedPlantDetails",
    }).done(function (data) {
       
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of data) {
            
            ittrdata += '<td><input class="form-control lebal" type="number" id="lebal"  value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><input class="form-control type" id="type" value="'+ val['unitFeedPlantPkModel']['type'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['kpiName'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><input class="form-control uom" id="uom"  value="'+ val['uom'] +'"/></td>';
            ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
          
          ittrdata += '</tr>';
          
        }
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
      });
    });
  }



 
