<div class="ph_section_one" style="overflow-x:hidden;">
  <div class="container">
      <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <li><a href="<?php echo base_url()?>legitimate">Test Legimtimate Dataset</a></li>
                <li><a href="<?php echo base_url()?>legitimate/testlist">Legtitimate Test List</a></li>
                <li>Scan Results</li>
              </ul>
          </div>
      </div>
      <br/>
  </div>

  <!-- -->
  <div class="row" style="padding:20px;font-size:14px;">
            <div class="col-lg-6 col-md-6 col-xs-12">
                <br/>
                <h6>HTML Features </h6>
                <br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Login 
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_login[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Empty Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_empty_link[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML File Size
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_length[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Inconsistency
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_isconsist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Library
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_jslist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        External Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_extlist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Redirect
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_redirect[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Iframe
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_iframe[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML Favicon
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_favicon[0]->count?></span>
                    </li>
                </ul>
            </div>
            <!-- -->
            <div class="col-lg-6 col-md-6 col-xs-12">
                <br/>
                <h6>URL Features</h6>
                </br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Non SSL
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urlprotocol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Standard Port
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urlstdport[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Symbol
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urlsymbol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subdomain
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urlsubdomain[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        URL Length
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_url_len[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Total Dot
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urldot_total[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Sensitive Character
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_url_senschar[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Brandinfo
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_urlprotocol[0]->count?></span>
                    </li>
                </ul>
            </div>
        </div> 
        <div class="row" style="padding:20px;font-size:13.5px;">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <br/>
            <h4>Result</h4>
            <br/>
            <table id="table3" class="table table-striped table-bordered responsive nowrap">
            <thead>
                <tr>
                    <th>sc_legitimate_test_id</th>
                    <th>URL/URI</th>
                    <th>Score</th>
                    <th>Threshold (0.0)</th>
                    <th>Threshold (0.3)</th>
                    <th>Threshold (0.5)</th>

                </tr>
                    </thead>        
                    <tbody>
                        <?php if(isset($score_testing)) {?>
                        <?php foreach($score_testing as $score_testing) { ?>
                            <tr>
                            <td><?php echo $score_testing->sc_legitimate_test_id; ?></td>
                            <td style="color:#274984;"><?php echo $score_testing->dataset_url; ?></td>
                            <td><?php echo $score_testing->score; ?></td>
                            <td><?php echo $score_testing->threshold1; ?></td>
                            <td><?php echo $score_testing->threshold2; ?></td>
                            <td><?php echo $score_testing->threshold3; ?></td>
                            </tr>
                            <?php } ?> 
                        <?php } ?>
                    </tbody>
            </table>
        </div>
    </div>
    <!-- -->

 <h4 style="padding:20px;">Train Score Features References</h4>
 <div class="row" style="padding:20px;font-size:13.5px;">
                <div class="col-lg-12 col-md-12 col-xs-12">
                    <table id="table2" class="table table-striped table-bordered responsive nowrap">
                    <thead>
                        <tr>
                            <th>Tr Id</th>
                            <th>Task Id</th>
                            <th>Non-SSL</th>
                            <th>Port-80</th>
                            <th>Symbol</th>
                            <th>Subdomain</th>
                            <th>URL-len</th>
                            <th>Dot</th>
                            <th>Sensitive</th>
                            <th>Brand</th>
                            <th>Login</th>
                            <th>Empty Link</th>
                            <th>HTML Length</th>
                            <th>Consistency</th>
                            <th>Javascript</th>
                            <th>External Link</th>
                            <th>Redirect</th>
                            <th>Iframe</th>
                            <th>Favicon</th>
                        </tr>
                            </thead>        
                            <tbody>
                                <?php if(isset($score_train)) {?>
                                <?php foreach($score_train as $ph_train) { ?>
                                    <tr>
                                    <td style="background:#ececec;"><?php echo $ph_train->train_id; ?></td>
                                    <td style="background:#ececec;"><?php echo $ph_train->task_id; ?></td>
                                    <td><?php echo $ph_train->url_protocol; ?></td>
                                    <td><?php echo $ph_train->url_standard_port; ?></td>
                                    <td><?php echo $ph_train->url_symbol; ?></td>
                                    <td><?php echo $ph_train->url_subdomain; ?></td>
                                    <td><?php echo $ph_train->url_length; ?></td>
                                    <td><?php echo $ph_train->url_dot_total; ?></td>
                                    <td><?php echo $ph_train->url_sensitive_char; ?></td>
                                    <td><?php echo $ph_train->url_brandinfo; ?></td>
                                    <td><?php echo $ph_train->html_login; ?></td>
                                    <td><?php echo $ph_train->html_empty_link; ?></td>
                                    <td><?php echo $ph_train->html_length; ?></td>
                                    <td><?php echo $ph_train->html_is_consist; ?></td>
                                    <td><?php echo $ph_train->html_js_list; ?></td>
                                    <td><?php echo $ph_train->html_link_external_list; ?></td>
                                    <td><?php echo $ph_train->html_redirect; ?></td>
                                    <td><?php echo $ph_train->html_iframe; ?></td>
                                    <td><?php echo $ph_train->html_favicon; ?></td>
                                    </tr>
                                    <?php } ?> 
                                <?php } ?>
                            </tbody>
                    </table>
                </div>
            </div>
 <h4 style="padding:20px;">Features Detection</h4>
    <div class="row" style="padding:20px;font-size:13.5px;">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <table id="table4" class="table table-striped table-bordered responsive nowrap">
            <thead>
                <tr>
                    <th>Sc_Id</th>
                    <th>Sch_Id</th>
                    <th>-SSL</th>
                    <th>80</th>
                    <th>Symbol</th>
                    <th>Sdomain</th>
                    <th>URLlen</th>
                    <th>Dot</th>
                    <th>Char-s</th>
                    <th>Brand</th>
                    <th>Login</th>
                    <th>Empty</th>
                    <th>Len</th>
                    <th>Consist</th>
                    <th>JS</th>
                    <th>Ext-link</th>
                    <th>Redirect</th>
                    <th>Iframe</th>
                    <th>Favicon</th>
                </tr>
                    </thead>        
                    <tbody>
                        <?php if(isset($features)) {?>
                        <?php foreach($features as $feature_item) { ?>
                            <tr>
                            <td style="background:#ececec;"><?php echo $feature_item->sc_legitimate_test_id; ?></td>
                            <td style="background:#ececec;"><?php echo $feature_item->sch_id; ?></td>
                            <td><?php echo $feature_item->url_protocol; ?></td>
                            <td><?php echo $feature_item->url_standard_port; ?></td>
                            <td><?php echo $feature_item->url_symbol; ?></td>
                            <td><?php echo $feature_item->url_subdomain; ?></td>
                            <td><?php echo $feature_item->url_length; ?></td>
                            <td><?php echo $feature_item->url_dot_total; ?></td>
                            <td><?php echo $feature_item->url_sensitive_char; ?></td>
                            <td><?php echo $feature_item->url_brandinfo; ?></td>
                            <td><?php echo $feature_item->html_login; ?></td>
                            <td><?php echo $feature_item->html_empty_link; ?></td>
                            <td><?php echo $feature_item->html_length; ?></td>
                            <td><?php echo $feature_item->html_is_consist; ?></td>
                            <td><?php echo $feature_item->html_js_list; ?></td>
                            <td><?php echo $feature_item->html_link_external_list; ?></td>
                            <td><?php echo $feature_item->html_redirect; ?></td>
                            <td><?php echo $feature_item->html_iframe; ?></td>
                            <td><?php echo $feature_item->html_favicon; ?></td>
                            </tr>
                            <?php } ?> 
                        <?php } ?>
                    </tbody>
            </table>
        </div>
    </div>

    
</div>
<script>
   $(document).ready(function(){
        // execute data tables
        $('#table1').addClass('no-wrap');
        $('#table1').DataTable({
          "responsive" : true,
          "dom": 'Bfrtip',
          "buttons": [
            {
                extend: 'excel',
                messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                messageBottom: null
            },
            {
                extend: 'print',
                messageTop: function () {
                    printCounter++;
 
                    if ( printCounter === 1 ) {
                        return 'This is the first time you have printed this document.';
                    }
                    else {
                        return 'You have printed this document '+printCounter+' times';
                    }
                },
                messageBottom: null
            }
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });

        $('#table2').addClass('no-wrap');
        $('#table2').DataTable({
          "responsive" : true,
          "dom": 'Bfrtip',
          "buttons": [
            'copy',
            'csv',
            {
                extend: 'excel',
                text: 'Save current page',
                exportOptions: {
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                messageBottom: null
            },
            {
                extend: 'print',
                messageTop: function () {
                    printCounter++;
 
                    if ( printCounter === 1 ) {
                        return 'This is the first time you have printed this document.';
                    }
                    else {
                        return 'You have printed this document '+printCounter+' times';
                    }
                },
                messageBottom: null
            }
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });

        $('#table3').addClass('no-wrap');
        $('#table3').DataTable({
          "responsive" : true,
          "dom": 'Bfrtip',
          "buttons": [
            'copy',
            'csv',
            {
                extend: 'excel',
                text: 'Save current page',
                exportOptions: {
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                messageBottom: null
            },
            {
                extend: 'print',
                messageTop: function () {
                    printCounter++;
 
                    if ( printCounter === 1 ) {
                        return 'This is the first time you have printed this document.';
                    }
                    else {
                        return 'You have printed this document '+printCounter+' times';
                    }
                },
                messageBottom: null
            }
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });



        $('#table4').addClass('no-wrap');
        $('#table4').DataTable({
          "responsive" : true,
          "dom": 'Bfrtip',
          "buttons": [
            'copy',
            'csv',
            {
                extend: 'excel',
                text: 'Save current page',
                exportOptions: {
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                messageBottom: null
            },
            {
                extend: 'print',
                messageTop: function () {
                    printCounter++;
 
                    if ( printCounter === 1 ) {
                        return 'This is the first time you have printed this document.';
                    }
                    else {
                        return 'You have printed this document '+printCounter+' times';
                    }
                },
                messageBottom: null
            }
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });

    }); 
</script>