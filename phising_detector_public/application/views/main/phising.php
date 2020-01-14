<div class="ph_section_one">
  <div class="container">
      <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <li>Test Phising Dataset </li>
                <?php if(!empty($tasknew)){?><li>Scan</li><?php } ?>
              </ul>
              <a class="nav-link"  href="<?= base_url()?>phishing/testlist"  data-toggle="tooltip" title="Legitimate"><button style="width:170px;" class="btn btn-primary btn-sm float-right">Phishing Test History</button></a>
          </div>
      </div>
      <br/>
          <div class="row">
                  <div class="col-lg-12 col-md-12 col-xs-12 w-100">
                        <h1 class="display-4">Testing - Phising Dataset</h1>
                        <br/>
                            <div class="alert alert-danger" role="alert"  style="padding-top:40px;padding-bottom:40px;padding-left:40px;padding-right:40px;">
                              <h4 class="alert-heading">Phising Offline Dataset</h4>
                              <p>Place your dataset in the given below. Make sure you structure the directory and files based on our structure.</p>
                              <hr>
                              <b><p class="mb-0">.assets/testing/phising/</p></b>
                            </div>
                  </div>
                  <?php if($taskall == null){ ?>
                    <div class="col-lg-12 col-md-12 col-xs-12 w-100">
                      <div class="alert alert-info" role="alert">
                        You don't have data reference. Please train data before testing - go to the page <a href="<?php echo base_url();?>">click this link</a>
                      </div>
                    </div>
                  <?php } ?>
                <?php if($taskall != null){ ?>
                  <div class="col-lg-12 col-md-12 col-xs-6 w-100">
                    <form method="POST" action="<?php echo base_url('phishing/fetch_phishing'); ?>">
                        <div class="form-group">
                            <label>Select Training Task Id</label>
                            <select class="form-control" name="task_id">
                              <?php 
                                  if(isset($taskall)){
                                    foreach($taskall as $item){
                                      ?>
                                          <option value="<?php echo $item->task_id?>"><?php echo 'Task '.$item->task_id?></option>
                                    <? }
                                  }
                              ?>
                            </select>
                        </div>
                        <?php 
                          if(isset($taskall)){?>
                          <div class="form-group">
                            <label for="">Select Testing Sample</label>
                            <select class="form-control" name="dataset_amount">
                              <option value="10">10</option>
                              <option value="100">100</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                          <?php }
                        ?>
                    </div>
                    <div class="col-lg-12 col-md-12 col-xs-6 w-100">
                              <!-- <button class="btn btn-outline-secondary" style="width:100%;background:#3B9174;color:#fff;font-weight:bold;padding:20px;font-size:20px;border : 3px solid #3B9174; position:relative; left:-2px;" id="analyze" name="submit_analyze" type="button"><i style="position:relative;top:6px;" data-feather="rotate-ccw"></i>&nbsp;&nbsp;Analyze Dataset</button> -->
                              <input class="analyzeme" name="runtest" type="submit" class="btn btn-primary btn-block btn-dark" value="Run" style="padding-top:15px; padding-bottom:12px;"/>
                    </div>
                  </form>
              <?php } ?>
            </div>
      <br/>
      <div class=""row>
              <?php if(!empty($schid)){?>
                  <div class="alert alert-primary" role="alert">
                    Scan Success
                    <form method="POST" action="<?php echo base_url('phishing/testlist'); ?>">
                          <input type="hidden" name="task_id" value="<?php echo $schid; ?>">
                          <input type="hidden" name="task_scanned" value="<?php echo $task_scanned; ?>">
                          <input style="right:10px;bottom:12px;  width:100px;font-size:13px;position:absolute;" name="analyze" type="submit" class="btn btn-primary btn-sm" value="Show Details"/> 
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