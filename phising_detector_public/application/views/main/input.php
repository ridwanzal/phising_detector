<div class="ph_section_one">
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <?php if(!empty($tasknew)){?><li>Scan</li><?php } ?>
              </ul>
          </div>
      </div>
      <br/>
      <div class="row">
              <div class="col-lg-12 col-md-12 col-xs-6 w-100">
                        <h1 class="display-4">Train Data</h1>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-6 w-100">
                        <hr class="my-4">
                        <div class="alert alert-danger" role="alert"  style="padding-top:40px;padding-bottom:40px;padding-left:40px;padding-right:40px;">
                        <img width="90" style="margin-bottom:40px;" src="<?php echo base_url()?>/assets/img/rootkit.svg"/>
                          <h4 class="alert-heading">Phising Offline Dataset</h4>
                          <p>Place your dataset in the given below. Make sure you structure the directory and files based on our structure.</p>
                          <hr>
                          <b><p class="mb-0">.assets/phising/</p></b>
                        </div>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-6 w-100">
                        <hr class="my-4">
                        <div class="alert alert-success" role="alert" style="padding-top:40px;padding-bottom:40px;padding-left:40px;padding-right:40px;">
                        <img width="90" style="margin-bottom:40px;" src="<?php echo base_url()?>/assets/img/cyber-security.svg"/>
                          <h4 class="alert-heading">Legitimate Offline Dataset</h4>
                          <p>Place your dataset in the given below. Make sure you structure the directory and files based on our structure.</p>
                          <hr>
                          <b><p class="mb-0">.assets/legitimate/</p></b>
                        </div>
              </div>
              <div class="col-lg-12 col-md-12 col-xs-6 w-100">
                <form method="POST" action="<?php echo base_url('train/fetchraw'); ?>">
                        <div class="form-group">
                          <label for="">Select dataset amount</label>
                          <select class="form-control" name="dataset_amount">
                            <option value="10">10</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      <!-- <button class="btn btn-outline-secondary" style="width:100%;background:#3B9174;color:#fff;font-weight:bold;padding:20px;font-size:20px;border : 3px solid #3B9174; position:relative; left:-2px;" id="analyze" name="submit_analyze" type="button"><i style="position:relative;top:6px;" data-feather="rotate-ccw"></i>&nbsp;&nbsp;Analyze Dataset</button> -->
                      <input class="analyzeme" name="analyze" type="submit" class="btn btn-primary btn-block btn-dark" value="Analyze" style="padding-top:15px; padding-bottom:12px;"/>
                </form>
              </div>
      </div>
      <br/>
      <div class=""row>
              <?php if(!empty($taskid)){?>
                  <div class="alert alert-primary" role="alert">
                    Scan Success
                    <form method="POST" action="<?php echo base_url('train/result'); ?>">
                          <input type="hidden" name="task_id" value="<?php echo $taskid; ?>">
                          <input type="hidden" name="task_scanned" value="<?php echo $task_scanned; ?>">
                          <input style="right:10px;bottom:12px;  width:100px;font-size:13px;position:absolute;" name="analyze" type="submit" class="btn btn-primary btn-sm" id="train_submit" value="Show Details"/> 
                      </form>
                  </div>
              <?php } ?>
      </div>
      <br/>
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