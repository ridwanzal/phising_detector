<div class="ph_section_one">
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="#">Home</a></li>
                <?php if(!empty($tasknew)){?><li>Scan</li><?php } ?>
              </ul>
          </div>
      </div>
      <br/>
      <div class="row">
              <div class="col-lg-12 col-md-12 col-xs-12 w-100">
                        <h1 class="display-4">Welcome to Phishing Analyzer</h1>
                        <p class="lead"></p>
                        <hr class="my-4">
                        <div class="alert alert-success" role="alert">
                          <h4 class="alert-heading">Offline Dataset</h4>
                          <p>Place your dataset in the given below. Make sure you structure the directory and files based on our structure.</p>
                          <hr>
                          <p class="mb-0">.assets/phising/</p>
                        </div>
                      <form method="POST" action="<?php echo base_url('fetchraw'); ?>">
                            <!-- <button class="btn btn-outline-secondary" style="width:100%;background:#3B9174;color:#fff;font-weight:bold;padding:20px;font-size:20px;border : 3px solid #3B9174; position:relative; left:-2px;" id="analyze" name="submit_analyze" type="button"><i style="position:relative;top:6px;" data-feather="rotate-ccw"></i>&nbsp;&nbsp;Analyze Dataset</button> -->
                            <input class="analyzeme" name="analyze" type="submit" class="btn btn-primary btn-block btn-dark" value="Analyze" style="padding-top:15px; padding-bottom:12px;"/>
                      </form>
              </div>
      </div>
      <br/>
      <div class="row">
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
                              <td ><?php echo $tasklist->sc_id; ?></td>
                              <td><?php echo $tasklist->task_id; ?></td>
                              <td title="<?php echo $tasklist->dataset_url; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_url, 0, 30)."..."; ?></td>
                              <td title="<?php echo $tasklist->dataset_html_file; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_html_file, 0, 30)."..."; ?></td>
                              <td><?php echo $tasklist->date_created; ?></td>
                            </tr>
                            <?php } ?> 
                        <?php } ?>
                      </tbody>
              </table>
          </div>
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
    }); 
</script>