<div class="ph_section_one">
  <div class="container">
    <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 w-50">
              <ul class="breadcrumbs">
                <li><a href="<?php echo base_url()?>">Home</a></li>
                <li><a href="<?php echo base_url('phishing')?>">TEST PHISING DATASET</a></li>
                <li>Phishing Test List</li>
              </ul>
              <!-- <ul style="float:right;">
                        <form method="POST" action="<?php echo base_url('phishing/deletealltask'); ?>">
                            <?php if(sizeof($task) > 0){?> <input name="analyze" type="submit" class="btn btn-danger btn-block btn-sm" value="Delete All Task"/> <?php } ?>
                        </form>
              </ul> -->
              
          </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <?php
                 if(sizeof($task) == 0) {?>
                    <div class="alert alert-info" role="alert">
                            You dont have any test yet.
                    </div>
                <?php }
            ?>
            <?php if(isset($task)) {?>
                <?php foreach($task as $tasklist) { ?>
                        <div class="card" style="margin-bottom:10px;">
                            <div class="card-body">
                                <h5 class="card-title" style="padding-bottom:20px;"><?php echo 'Schedule id : '.$tasklist->sch_id; ?></h5>
                                <h6 class="card-subtitle mb-2 text-muted"><?php echo $tasklist->date_created; ?></h6>
                                <span><?php echo 'Test data scanned: '.$tasklist->sch_scanned; ?></span>
                                
                                <form method="POST" action="<?php echo base_url('phishing/result'); ?>">
                                <input type="hidden" name="task_id" value="<?php echo $tasklist->task_id; ?>">
                                    <input type="hidden" name="sch_id" value="<?php echo $tasklist->sch_id; ?>">
                                    <input type="hidden" name="task_scanned" value="<?php echo $tasklist->sch_scanned; ?>">
                                    <input style="right:10px;bottom:12px;  width:100px;font-size:13px;position:absolute;" name="analyze" type="submit" class="btn btn-primary btn-sm" value="Show Details"/> 
                                </form>
                                <form method="POST" action="<?php echo base_url('phishing/deletetask'); ?>">
                                    <input type="hidden" name="sch_id" value="<?php echo $tasklist->sch_id; ?>">
                                    <input type="hidden" name="task_scanned" value="<?php echo $tasklist->sch_scanned; ?>">
                                    <input style="right:120px;bottom:12px;  width:100px;font-size:13px;position:absolute;" name="analyze" type="submit" class="btn btn-danger btn-sm" value="Delete Task"/> 
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