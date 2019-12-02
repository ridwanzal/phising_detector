<div class="ph_section_one">
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="#">Home</a></li>
                <li><a href="<?php echo base_url('task')?>">Task History</a></li>
                <li>Scan Results</li>
              </ul>
          </div>
      </div>
      <br/>
  </div>
  <div class="row" style="padding:20px;">
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
                          <td title="<?php echo $tasklist->dataset_url; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_url, 0, 90)."..."; ?></td>
                          <td title="<?php echo $tasklist->dataset_html_file; ?>" style="color:#3c70a4;"><?php echo substr($tasklist->dataset_html_file, 0, 40).""; ?></td>
                          <td><?php echo $tasklist->date_created; ?></td>
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
    }); 
</script>