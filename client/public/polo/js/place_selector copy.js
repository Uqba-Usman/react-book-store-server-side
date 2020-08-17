$(function() {
  $(".places").hide();
  $(".placeselector input").keydown(function(e) {
    let id = $(this).attr("id");
    let query = e.target.value;
    if (query && query.length > 2) {
      let placesList = $(`#${id}-places`);
      placesList.show();
      $.ajax({
        method: "POST",
        url: "/api/google/autocomplete",
        data: { query },
        success: function(res) {
          placesList.empty();
          for (var i = 0; i < res.length; i++) {
            placesList.find(".places-list").append(makeplacesListItem(res[i]));
          }
        }
      });
    }
  });
  $(".placeselector").on("click", ".list-group-item", function() {
    $(this)
      .closest(".places")
      .hide();
  });
  $(".placeselector").on("mouseover", ".list-group-item-action", function() {
    $(this).addClass("active");
  });
  $(".placeselector").on("mouseout", ".list-group-item-action", function() {
    $(this).removeClass("active");
  });
});

function makeplacesListItem(data) {
  return `<a class="list-group-item  list-group-item-action" href="#">${data.description}</a>`;
}
