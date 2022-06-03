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
            lebal : $(numberRow).find('#lebal').val(),
            KPI_Name: $(numberRow).find(".drpDwnKpi").val(),
            Troughput_KPI_Name: $(numberRow).find(".drpDwnKpi").val(),

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
            { KPI_Name: 'Actual', lebal: 'Fuel',Troughput_KPI_Name: 'Gal/hr'},
            { KPI_Name: 'Reference', lebal: 'steam',Troughput_KPI_Name: 'INR/hr'},
            { KPI_Name: 'Plant Load', lebal: 'Electricity',Troughput_KPI_Name: 'INR/hr'}
        ];
        var ittrdata = '';
        ittrdata += '<tr>';
        for (const val of tabledata) {
            
            ittrdata += '<td><input class="form-control inputColumnName" id="lebal" type="text" placeholder="Enter Column Name" value="'+ val['lebal'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwndatatype2" type="text" placeholder=""></select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single drpDwndatatype2" type="text" placeholder=""></select></td>';
            
          ittrdata += '</tr>';
          
        }
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
    //   });
  }


  




