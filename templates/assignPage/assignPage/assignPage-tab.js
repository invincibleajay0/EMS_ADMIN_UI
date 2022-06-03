

$(document).ready(function () {

    $('.js-example-basic-single').select2({
        tags: true
    });
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    let id =  $(this).closest('tr').find('.unitName').val();
  console.log( id );
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8091/admin/home/unit/"+id,
}).done(function (data) {
    console.log(data)
    $(this).closest('tr').remove();
    
    getDate();
})
  $(this).closest('tr').remove();
 });

 getStatuscode();
 getUserRoles();
 getDate();
 
});

var globalSelect;
var statusData;
// append option to select

function getStatuscode() {
       var data= [
        {
            statusKey: true,
            statusValue: "True"
        },
        {
            statusKey: false,
            statusValue: "False"
        }
    ]
    $.each(data, function (i, item) {
        $('.statusDataToSet').append($('<option>', { 
            value: item.statusKey,
            text : item.statusValue 
        }));
    });
     statusData = data;
    
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

function getUserRoles() {
    
    $.ajax({
         method: "GET",
         async:false,
         url: "http://localhost:8091/admin/common/getKPINames",

    }).done(function (data) {
        globalSelect = '';
        
        $.each(data, function (i, item) {

            globalSelect+='<option value='+item.kpiValue+'>'+item.kpiName + '</option>'  


        $('.drpDwndatatype').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName 
        }));
         
       
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
        });
       
    });
         
}

// add row

function addRow() {
    
   
    const table1 = document.getElementById("datatablebody");
   
    var row = table1.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    
    cell1.innerHTML = '<input class="form-control serialNo" id="serialNo" type="text"/>';
    cell2.innerHTML = '<input class="form-control unitName" id="unitName" type="text"/>';
    cell3.innerHTML = '<input class="form-control lebal" id="lebal" type="text"/>';
    cell4.innerHTML = '<select class="form-control js-example-basic-single drpDwndatatype" type="text">'+globalSelect+'</select>';
    cell5.innerHTML  = '<select class="form-control statusData"><option value="true">True</option><option value="false">False</option></select>';
    cell6.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
  
 
   
}


  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('.serialNo').val()!=undefined){
          const dataObj = {
            serialNo : $(numberRow).find('.serialNo').val(),
            unitName : $(numberRow).find('.unitName').val(),
            label: $(numberRow).find(".lebal").val(),
            kpiName: $(numberRow).find(".drpDwndatatype").val(),
            status: $(numberRow).find(".statusData").val()
        }
        
        rowsdata.push(dataObj);
        }
        
    }
    const postdata = JSON.stringify(rowsdata);
    console.log(postdata,'rowsdata');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: postdata,
         
        url: "http://localhost:8091/admin/home/unit/add",
    }).done(function (data) {
      var tata=data;
      if (tata == "sucess") {
        alert("Data Save Sucessfully!");
      }
      if (tata == "error") {
        alert("Error occurs");
      } 
        
    })
}

  // data render in table

  function getDate() {
    getUserRole(function(kpiData)
    {
     $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/home/unit",
       }).done(function (data) {
       
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of data) {
            var selectedKpi = val['kpiName'];
            var selectedStatus = val['status'];
            ittrdata += '<td><input class="form-control serialNo" id="serialNo" type="number" value="'+ val['serialNo'] +'"/></td>';
          ittrdata += '<td><input class="form-control unitName" id="unitName" type="text" value="'+ val['unitName'] +'"/></td>';
          ittrdata += '<td><input class="form-control lebal" id="lebal" type="text" value="'+ val['label'] +'"/></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single drpDwndatatype" name="customer">';
          for (const kpiD of kpiData) {
            if(kpiD['kpiValue'] == selectedKpi)
             ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
            else 
             ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
             }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control statusData">'
          for (const SD of statusData) {
            if(SD['statusKey'] == selectedStatus)
             ittrdata += '<option value='+SD['statusKey']+' selected>'+SD['statusValue']+'</option>';
            else 
             ittrdata += '<option value='+SD['statusKey']+'>'+SD['statusValue']+'</option>';
             }
          ittrdata +='</select></td>';
          ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
          ittrdata += '</tr>';
        }
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
       });

    });
  }
  


