$(function () {
  $(".place_input").keydown(function (e) {
    $(this).dropdown("show");
    console.log("searching");
    let id = $(this).attr("id");
    let input = $(this);
    let dropdown = input.closest(".dropdown");
    let menu = dropdown.find(".list-group");
    let loader = dropdown.find(".loader");
    loader.show();
    let query = e.target.value;
    $.ajax({
      method: "POST",
      url: "/api/google/autocomplete",
      data: { query },
      success: function (res) {
        menu.empty();
        loader.hide();
        if (res.length != 0) {
          for (var i = 0; i < res.length; i++) {
            menu.append(makeplacesListItem(res[i], id));
          }
        } else {
          menu.append("<p>No Results Found</p>");
        }
      },
    });
  });
  $(".place_wrapper").on("mouseover", ".list-group-item-action", function () {
    $(this).addClass("active");
  });
  $(".place_wrapper").on("mouseout", ".list-group-item-action", function () {
    $(this).removeClass("active");
  });
  $(".place_wrapper").on("click", ".place-item", function () {
    let place_id = $(this).attr("data-place-id");
    let place_description = $(this).attr("data-place-description");
    let input_id = $(this).attr("data-input-id");
    console.log(input_id);
    $(`#${input_id}`).val(place_description);
    $(`#${input_id}_place_id`).val(place_id);
  });
  $("#quotations").on("click", ".btnBook", book);
});
function makeplacesListItem(data, id) {
  return `<li class="list-group-item  list-group-item-action place-item" data-place-id="${data.place_id}" data-place-description="${data.description}" data-input-id="${id}">${data.description}</li>`;
}

$(function () {
  $("#fromtimepicker").datetimepicker({
    // viewMode: "years"
    sideBySide: true,
    locale: "en-GB",
    minDate: moment(),
    format: "DD/MM/YYYY HH:mm",
    widgetPositioning: {
      horizontal: "right",
      vertical: "top",
    },
  });
  $("#fromtimepicker input").val(moment().format("DD/MM/YYYY HH:mm"));
  $("#totimepicker").datetimepicker({
    // viewMode: "years"
    sideBySide: true,
    locale: "en-GB",
    minDate: moment(),
    format: "DD/MM/YYYY HH:mm",
    widgetPositioning: {
      horizontal: "right",
      vertical: "top",
    },
  });
  $("#totimepicker input").val(moment().format("DD/MM/YYYY HH:mm"));

  $(".nav-tabs a.onewaytab").on("shown.bs.tab", function () {
    $("#returnpickupdiv").hide();
    $("#isReturn").val("0");
  });
  $(".nav-tabs a.returntab").on("shown.bs.tab", function () {
    $("#returnpickupdiv").show();
    $("#isReturn").val("1");
  });
  $("#btnGetQuotes").click();
  setDummyData();
  setTimeout(() => {
    // $("#btnGetQuotes").click();
  }, 1);
});
function setDummyData() {
  $("#from").val("Slough Station, Slough, UK");
  $("#from_place_id").val("ChIJq1arfcp6dkgRYVocPLV6oDo");
  $("#to").val("Heathrow Airport (LHR), Longford, UK");
  $("#to_place_id").val("ChIJ6W3FzTRydkgRZ0H2Q1VT548");
}
function getQuotationData() {
  let from_desc = $("#from").val();
  let from_place_id = $("#from_place_id").val();
  let to_desc = $("#to").val();
  let to_place_id = $("#to_place_id").val();
  return {
    from_desc,
    from_place_id,
    to_desc,
    to_place_id,
    carSize: $("#carSize").val(),
    startTime: getFromStartTime(),
  };
}
$(function () {
  $("#btnGetQuotes").click(function () {
    $("#fetching").show();
    $("#quotations").html("");
    $.ajax({
      method: "post",
      url: "/api/public/bookings/quotations",
      data: getQuotationData(),
      success: function (result) {
        $("#quotations").html("");
        if (result.quotations.length > 0) {
          $("#quotations").append(`<div class="col-6 text-center">
          <img src="${result.quotations[0].quotation.staticmap}" class = "img-responsive" width = "100%"/>
        </div`);
          $("#quotations").append(
            `<div class="col-6"><div class="row qrow"></div></div>`
          );
          result.quotations.forEach((quote) => {
            console.log(quote);
            try {
              $("#quotations .qrow").append(`<div class="col-6 text-center">
          <i class="fa fa-car fa-5x m-b-10"></i>
          <button class="btn btn-info btn-sm btnBook" company-id="${quote.company._id}">Book ${quote.quotation.totalPrice} &pound;</button>
          <h3>${quote.company.details.name}</h3>
            
          </div>`);
            } catch (err) {
              console.log(err);
            }
          });
        } else {
          $("#quotations").html("");
          $("#quotations").append(
            `<div class="col-3 text-center">No Quotations Can Be Found for given addresses</div>`
          );
        }
      },
      error: function (res) {
        console.log(res.responseJSON);
      },
      complete: function () {
        $("#fetching").hide();
      },
    });
  });
});
function getFromStartTime() {
  let time = $("#fromtimepicker").data().date;
  if (!time) time = moment().format();
  else time = moment(time, "DD/MM/YYYY HH:mm").format();
  return time;
}
function getToStartTime() {
  let totime = $("#totimepicker").data().date;
  if (!totime) totime = moment().format();
  else totime = moment(time, "DD/MM/YYYY HH:mm").format();
  return totime;
}
function book() {
  let company_id = $(this).attr("company-id");
  $.ajax({
    method: "post",
    url: "/api/public/bookings/book/" + company_id,
    data: getQuotationData(),
    success: function (result) {
      console.log(result.startTime);
      // window.location.href = `/mybookings/${result._id}`;
    },
    error: function (res) {
      console.log(res);
    },
  });
  console.log(company_id);
}
