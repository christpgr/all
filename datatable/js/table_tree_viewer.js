jQuery(document).ready(function($) {	var table;
	$('#demo').html( "<table cellpadding='0' cellspacing='0' border='0' class='display' id='example'></table>");
	function drawTable(tableData) {
		table = $('#example').dataTable({
			'data': tableData, 
			'language' : {
				"sEmptyTable": "Տվյալները բացակայում են",
				"sProcessing": "Կատարվում է...",
				"sInfoThousands":  ",",
				"sLengthMenu": "Ցուցադրել _MENU_ արդյունքներ մեկ էջում",
				"sLoadingRecords": "Բեռնվում է ...",
				"sZeroRecords": "Հարցմանը համապատասխանող արդյունքներ չկան",
				"sInfo": "Ցուցադրված են _START_-ից _END_ արդյունքները ընդհանուր _TOTAL_-ից",
				"sInfoEmpty": "Արդյունքներ գտնված չեն",
				"sInfoFiltered": "(ֆիլտրվել է ընդհանուր _MAX_ արդյունքներից)",
				"sInfoPostFix":  "",
				"sSearch": "Փնտրել",
				"oPaginate": {
					"sFirst": "Առաջին էջ",
					"sPrevious": "Նախորդ էջ",
					"sNext": "Հաջորդ էջ",
					"sLast": "Վերջին էջ"
				},
				"oAria": {
					"sSortAscending":  ": ակտիվացրեք աճման կարգով դասավորելու համար",
					"sSortDescending": ": ակտիվացրեք նվազման կարգով դասավորելու համար"
				}
			},
			'columns': [
				{ 'title': 'Գնման ենթակա  ապրանքներ, աշխատանքներ և ծառայությունների խմբեր' }, 
				{ 'title': 'Գնման ենթակա ապրանքներ, աշխատանքներ և ծառայություններ' }, 
				{ 'title': 'Չափման միավորը' }, 
				{ 'title': 'Ամբողջ քանակը (ծավալը)'}, 
				{ 'title': 'Գումարը'}
			],
			"columnDefs": [
				{ "visible": false, "targets": 0 }
			],
			"order": [[ 0, 'asc' ]],
			"displayLength": 25,
			"drawCallback": function ( settings ) {
				var api = this.api();
				var rows = api.rows( {page:'current'} ).nodes();
				var last=null;
				api.column(0, {page:'current'} ).data().each( function ( group, i ) {
					var amount= api.rows({ page: 'current' }).data()[i][5];
					if ( last !== group ) {
						$(rows).eq( i ).before(
							'<tr class="group"><td colspan="3">'+group+'<td colspan="2">' + amount + '</td></td></tr>'
							);
						last = group;
					}
				});
			}
		}); 
		$('#example tbody').on( 'click', 'tr.group', function () {
			var currentOrder = table.order()[0];
			if ( currentOrder[0] === 0 && currentOrder[1] === 'asc' ) {
				table.order( [ 0, 'desc' ] ).draw();
			} else {
				table.order( [ 0, 'asc' ] ).draw();
			}
		});
	} 
	var tableData = dataSet[0];
	drawTable(tableData);
	$('#tree').treeview('collapseAll',  {
		silent: true}); 
	$('#tree').treeview({
		data: tree,
		onNodeSelected: function(event, data) {
			if (data && data.id !== undefined) {
				table.fnDestroy();
				drawTable(dataSet[data.id])
			}
		}		
	});
});