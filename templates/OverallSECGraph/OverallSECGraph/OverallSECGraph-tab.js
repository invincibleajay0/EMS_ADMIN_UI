$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    $(this).closest('tr').remove();
 });
 getDate();
 getUserRole();
});
// append option to select
function getUserRole() {
    //$.ajax({
        // method: "GET",
        // url: "http://localhost:8090/EMSPro/alldata",
       
   // }).done(function (data) {
       var items= [{
           value:"Kpi1",
           text:"Kpi 1",
       },
       {
        value:"Kpi2",
        text:"Kpi 2"
    },
    {
        value:"Kpi3",
        text:"Kpi 3"
    },
    {
        value:"Kpi4",
        text:"Kpi 4"
    }]
    $.each(items, function (i, item) {
        $('.drpDwndatatype2').append($('<option>', { 
            value: item.value,
            text : item.text ,
        }));
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });

    var items1= [{
        value:"fccu",
        text:"fccu",
    },
    {
     value:"Avu1",
     text:"Avu1"
 },
 {
     value:"Avu2",
     text:"Avu2"
 },
 {
     value:"Bsvi",
     text:"Bsvi"
 }]
 $.each(items1, function (i, item) {
     $('.drpDwnKpi').append($('<option>', { 
         value: item.value,
         text : item.text ,
     }));
    // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
 });
        
  //  });

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
            UOM : $(numberRow).find('#serialNo').val(),
            Type : $(numberRow).find('td:eq(0)').text(),
            lebal : $(numberRow).find('#lebal').val(),
            KPI_Name: $(numberRow).find(".drpDwnKpi").val(),

        }
        rowsdata.push(dataObj);
    }

    var data = {
        Unit_Name : unitName  , Table_data : rowsdata
    }
    console.log(data,'rowsdata');
}

  // data render in table

  function getDate() {
    // $.ajax({
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
    //     },
    //     method: "GET",
    //     url: "http://localhost:8090/EMSPro/auth/ManualEntry/getData",
    //   }).done(function (data) {
        var tabledata = [
            { Type: 'Actual', lebal: 'Fuel',Serial_No: 'Gal/hr'},
            { Type: 'Reference', lebal: 'steam',Serial_No: 'INR/hr'},
            { Type: 'Plant Load', lebal: 'Electricity',Serial_No: 'INR/hr'}
        ];
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of tabledata) {
            
            ittrdata += '<td>'+ val['Type'] +'</td>';
            ittrdata += '<td><input class="form-control inputColumnName" id="lebal" type="text" placeholder="Enter Column Name" value="'+ val['lebal'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwnKpi" type="text" placeholder=""></select></td>';
            ittrdata += '<td><input class="form-control inputColumnName" id="serialNo" type="text" placeholder="Enter Column Name" value="'+ val['Serial_No'] +'"/></td>';
          
          ittrdata += '</tr>';
          
        }
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
    //   });
  }




