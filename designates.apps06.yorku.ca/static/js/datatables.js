$(function() {
  $("#designates").DataTable({
    language: { "zeroRecords": "No designates found." },
    responsive: true,
    destroy: true,
    ordering: true,
    paging: true,
    searching: true,
  });
});