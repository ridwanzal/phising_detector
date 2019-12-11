<div class="ph_section_one">
  <div class="container">
    <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <li>Task History</li>
              </ul>
              <ul style="float:right;">
                        <form method="POST" action="<?php echo base_url('deletealltask'); ?>">
                            <!-- <button class="btn btn-outline-secondary" style="width:100%;background:#3B9174;color:#fff;font-weight:bold;padding:20px;font-size:20px;border : 3px solid #3B9174; position:relative; left:-2px;" id="analyze" name="submit_analyze" type="button"><i style="position:relative;top:6px;" data-feather="rotate-ccw"></i>&nbsp;&nbsp;Analyze Dataset</button> -->
                            <?php if(sizeof($task) > 0){?> <input name="analyze" type="submit" class="btn btn-danger btn-block btn-sm" value="Delete All Task"/> <?php } ?>
                        </form>
              </ul>
              
          </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <?php
                 if(sizeof($task) == 0) {?>
                    <div class="alert alert-info" role="alert">
                            You dont have any task yet.
                    </div>
                <?php }
            ?>
            <?php if(isset($task)) {?>
                <?php foreach($task as $tasklist) { ?>
                        <div class="card" style="margin-bottom:10px;">
                            <div class="card-body">
                                <h5 class="card-title" style="padding-bottom:20px;"><?php echo 'Task id : '.$tasklist->task_id; ?></h5>
                                <h6 class="card-subtitle mb-2 text-muted"><?php echo $tasklist->date_created; ?></h6>
                                <span><?php echo 'Total scanned: '.$tasklist->task_scanned; ?></span>
                                
                                <form method="POST" action="<?php echo base_url('taskdetail '); ?>">
                                    <input type="hidden" name="task_id" value="<?php echo $tasklist->task_id; ?>">
                                    <input style="right:10px;bottom:12px;  width:100px;font-size:13px;position:absolute;" name="analyze" type="submit" class="btn btn-primary btn-sm" value="Show Details"/> 
                                </form>
                            </div>
                        </div>
                <?php } ?> 
            <?php } 
            ?>

        </div>
    </div>
  </div>
</div>