<div class="ph_section_one" >
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <li><a href="<?php echo base_url('task')?>">Task ( <?php echo $taskid;?> )</a></li>
                <li>Scan Results</li>
              </ul>
          </div>
      </div>
      <br/>
  </div>
  <div class="row" style="padding:20px;font-size:14px;">
            <div class="col-lg-6 col-md-6 col-xs-12">
                <br/>
                <h6>HTML Features </h6>
                <br/>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        JS Alert
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_alert[0]->count?></span>
                    </li>
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
                        JS Embedded
                        <span class="badge badge-warning badge-pill" style="font-size:15px;"><?echo $count_html_str_embed[0]->count?></span>
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
                        Favicon
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
<br/>
<h4 style="padding:20px;">Web Page Score</h4>
<div class="row" style="padding:20px;font-size:13.5px;">
<div class="col-lg-12 col-md-12 col-xs-12">
<table id="table4" class="table table-striped table-bordered responsive nowrap">
    <thead>
        <tr>
            <th>Scan Id</th>
            <th>Task Id</th>
            <th>Score</th>
        </tr>
            </thead>        
            <tbody>
            <?php if(isset($web_page_score)) {?>
                <?php foreach($web_page_score as $score) { ?>
                <tr>
                    <td><?php echo $score->sc_id; ?></td>
                    <td><?php echo $score->task_id; ?></td>
                    <td><?php echo $score->score; ?>     
                        &nbsp;
                        <?php 
                            if($score->score >= 0.5){ ?>
                                    <span class="badge badge-warning badge-pill" style="font-size:13px;"><?echo "Phising"?></span>
                            <?php }else{ ?>
                                <span class="badge badge-success badge-pill" style="font-size:13px;"><?echo "Legitimate"?></span>
                            <?php } ?>
                    </td>
                </tr>
                <?php } ?> 
            <?php } ?>
            </tbody>
    </table>
</div>
</div>
  <br/>
  <h4 style="padding:20px;">Scan Info Summary</h4>
  <div class="row" style="padding:20px;font-size:13.5px;">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <table id="table1" class="table table-striped table-bordered responsive nowrap">
          <thead>
              <tr>
                  <th>Scan Id</th>
                  <th>Task Id</th>
                  <th>Link URL</th>
                  <th>HTML File</th>
                  <th>Tanggal ditambahkan</th>
              </tr>
                  </thead>        
                  <tbody>
                    <?php if(isset($tasknew)) {?>
                      <?php foreach($tasknew as $tasklist) { ?>
                        <tr>
                          <td style="background:#ececec;"><?php echo $tasklist->sc_id; ?></td>
                          <td style="background:#ececec;"><?php echo $tasklist->task_id; ?></td>
                          <td title="<?php echo $tasklist->dataset_url; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_url, 0, 110)."..."; ?></td>
                          <td title="<?php echo $tasklist->dataset_html_file; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_html_file, 0, 40).""; ?></td>
                          <td><?php echo $tasklist->date_created; ?></td>
                        </tr>
                        <?php } ?> 
                    <?php } ?>
                  </tbody>
          </table>
      </div>
  </div>
  <br/>
  <h4 style="padding:20px;">URL Features</h4>
  <div class="row" style="padding:20px;font-size:13.5px;">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <table id="table2" class="table table-striped table-bordered responsive nowrap">
          <thead>
              <tr>
                  <th>Scan Id</th>
                  <th>Task Id</th>
                  <th>Non SSL</th>
                  <th>Port 80</th>
                  <th>Symbol</th>
                  <th>Use Subdomain</th>
                  <th>URL Length</th>
                  <th>Total dot</th>
                  <th>Sensitive Char</th>
                  <th>Brand Info</th>
                  <th>Favicon</th>
              </tr>
                  </thead>        
                  <tbody>
                    <?php if(isset($feature_url)) {?>
                      <?php foreach($feature_url as $feature_item) { ?>
                        <tr>
                          <td style="background:#ececec;"><?php echo $feature_item->sc_id; ?></td>
                          <td style="background:#ececec;"><?php echo $feature_item->task_id; ?></td>
                          <td><?php echo $feature_item->url_protocol; ?></td>
                          <td><?php echo $feature_item->url_standard_port; ?></td>
                          <td><?php echo $feature_item->url_symbol; ?></td>
                          <td><?php echo $feature_item->url_subdomain; ?></td>
                          <td><?php echo $feature_item->url_length; ?></td>
                          <td><?php echo $feature_item->url_dot_total; ?></td>
                          <td><?php echo $feature_item->url_sensitive_char; ?></td>
                          <td><?php echo $feature_item->url_brandinfo; ?></td>
                          <td><?php echo $feature_item->url_favicon; ?></td>
                        </tr>
                        <?php } ?> 
                    <?php } ?>
                  </tbody>
          </table>
      </div>
  </div>
  <br/>
  <h4 style="padding:20px;">HTML Features</h4>
  <div class="row" style="padding:20px;font-size:13.5px;">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <table id="table3" class="table table-striped table-bordered responsive nowrap">
          <thead>
              <tr>
                  <th>Sc_Id</th>
                  <th>Task_Id</th>
                  <th>Alert</th>
                  <th>Login</th>
                  <th>Empty Link</th>
                  <th>HTML Length</th>
                  <th>Page Consistency</th>
                  <th>Javascript</th>
                  <th>String Embed</th>
                  <th>External Link</th>
                  <th>Redirect</th>
                  <th>Iframe</th>
                  <th>Mouse Over</th>
                  <th>Pop Up</th>
                  <th>Favicon</th>
              </tr>
                  </thead>        
                  <tbody>
                    <?php if(isset($feature_html)) {?>
                      <?php foreach($feature_html as $feature_item) { ?>
                        <tr>
                          <td style="background:#ececec;"><?php echo $feature_item->sc_id; ?></td>
                          <td style="background:#ececec;"><?php echo $feature_item->task_id; ?></td>
                          <td><?php echo $feature_item->html_alert; ?></td>
                          <td><?php echo $feature_item->html_login; ?></td>
                          <td><?php echo $feature_item->html_empty_link; ?></td>
                          <td><?php echo $feature_item->html_length; ?></td>
                          <td><?php echo $feature_item->html_is_consist; ?></td>
                          <td><?php echo $feature_item->html_js_list; ?></td>
                          <td><?php echo $feature_item->html_string_embed; ?></td>
                          <td><?php echo $feature_item->html_link_external_list; ?></td>
                          <td><?php echo $feature_item->html_redirect; ?></td>
                          <td><?php echo $feature_item->html_iframe; ?></td>
                          <td><?php echo $feature_item->html_mouseover; ?></td>
                          <td><?php echo $feature_item->html_popup; ?></td>
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