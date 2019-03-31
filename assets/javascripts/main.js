$(document).ready(function() {
  $("#my-table").DataTable({
    scrollY: 500,
    scrollX: true,
    scrollCollapse: true,
    paging: false,
    autoWidth: false,
    responsive: true,
    columnDefs: [
      { width: "300px", class: "fixed-col", targets: [0] },
      { width: "150px", class: "cell", targets: ["_all"] }
    ],
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Arama...",
      info: "Toplam _PAGE_ - _PAGES_",
      zeroRecords: "Hiçbir eşleşen kayıt bulunamadı",
      infoEmpty: "Kayıt bulunamadı",
      infoFiltered: "(Filtrelenen _MAX_ kayıt)"
  }
  });

  $('.name').tooltipster({
		side: 'right',
		contentAsHTML: true,
    interactive: true,
    minWidth: 300
	});
});
