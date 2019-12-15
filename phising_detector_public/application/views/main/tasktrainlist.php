<div class="ph_section_one" style="overflow-x:hidden;">
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="">Home</a></li>
                <li><a href="<?php echo base_url('train/task')?>">Train Task List (<?php echo $taskid; ?>)</a></li>
                <li>Scan Results</li>
              </ul>
          </div>
      </div>
      <br/>
  </div>
  <div class="row" style="padding:20px;font-size:14px;">
            <div class="col-lg-6 col-md-6 col-xs-12">
                <br/>
                <div class="alert alert-danger" role="alert">
                     <b>Phising Features List</b>
                </div>
                <h4>HTML Features </h4>
                <br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Alert
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_alert[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Login 
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_login[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Empty Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_empty_link[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML File Size
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_length[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Inconsistency
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_isconsist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Library
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_jslist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Embedded
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_str_embed[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        External Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_extlist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Redirect
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_redirect[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Iframe
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_iframe[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML Mouse over
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_mouseove[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML Favicon
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_favicon[0]->count?></span>
                    </li>
                </ul>
                <br/>
                <h4>URL Features</h4>
                </br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Non SSL
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_urlprotocol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Favicon
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_favicon[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Standard Port
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_urlstdport[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Symbol
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_urlsymbol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subdomain
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_urlsubdomain[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        URL Length
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_url_len[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Total Dot
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_urldot_total[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Sensitive Character
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_url_senschar[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Brandinfo
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $ph_count_html_favicon[0]->count?></span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-6 col-md-6 col-xs-12">
                <br/>
                <div class="alert alert-success" role="alert">
                    <b>Legitimate Features List</b>
                </div>
                <h4>HTML Features </h4>
                <br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Alert
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_alert[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Login 
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_login[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Empty Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_empty_link[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML File Size
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_length[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Inconsistency
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_isconsist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Library
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_jslist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Embedded
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_str_embed[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        External Link
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_extlist[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Redirect
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_redirect[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Iframe
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_iframe[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML Mouse Over
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_mouseove[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        HTML Favicon
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_favicon[0]->count?></span>
                    </li>
                </ul>
                <br/>
                <h4>URL Features</h4>
                </br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Non SSL
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_urlprotocol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Favicon
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_favicon[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Standard Port
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_urlstdport[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Symbol
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_urlsymbol[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subdomain
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_urlsubdomain[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        URL Length
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_url_len[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Total Dot
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_urldot_total[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Sensitive Character
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_url_senschar[0]->count?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Brandinfo
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $le_count_html_favicon[0]->count?></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" style="padding:20px;font-size:13.5px;">
                <div class="col-lg-12 col-md-12 col-xs-12">
                    <h4>Score Features</h4>
                    <br/>
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
                            <th>Favicon</th>
                            <th>Alert</th>
                            <th>Login</th>
                            <th>Empty Link</th>
                            <th>HTML Length</th>
                            <th>Consistency</th>
                            <th>Javascript</th>
                            <th>Embed</th>
                            <th>External Link</th>
                            <th>Redirect</th>
                            <th>Iframe</th>
                            <th>Mouseover</th>
                            <th>Pop Up</th>
                            <th>Favicon</th>
                        </tr>
                            </thead>        
                            <tbody>
                                <?php if(isset($ph_train)) {?>
                                <?php foreach($ph_train as $ph_train) { ?>
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
                                    <td><?php echo $ph_train->url_favicon; ?></td>
                                    <td><?php echo $ph_train->html_alert; ?></td>
                                    <td><?php echo $ph_train->html_login; ?></td>
                                    <td><?php echo $ph_train->html_empty_link; ?></td>
                                    <td><?php echo $ph_train->html_length; ?></td>
                                    <td><?php echo $ph_train->html_is_consist; ?></td>
                                    <td><?php echo $ph_train->html_js_list; ?></td>
                                    <td><?php echo $ph_train->html_string_embed; ?></td>
                                    <td><?php echo $ph_train->html_link_external_list; ?></td>
                                    <td><?php echo $ph_train->html_redirect; ?></td>
                                    <td><?php echo $ph_train->html_iframe; ?></td>
                                    <td><?php echo $ph_train->html_mouseover; ?></td>
                                    <td><?php echo $ph_train->html_popup; ?></td>
                                    <td><?php echo $ph_train->html_favicon; ?></td>
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
          "buttons": [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });

        $('#table2').addClass('no-wrap');
        $('#table2').DataTable({
          "responsive" : true,
          "buttons": [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });

        $('#table3').addClass('no-wrap');
        $('#table3').DataTable({
          "responsive" : true,
          "buttons": [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });



        $('#table4').addClass('no-wrap');
        $('#table4').DataTable({
          "responsive" : true,
          "buttons": [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ],
          "pagingType": "full_numbers",
          "paging": true,
          "lengthMenu": [10, 25, 50, 75, 100],
        });


    }); 
</script>