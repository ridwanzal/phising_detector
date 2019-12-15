
<?php
/* model for user logins*/
class Mphschedule extends CI_Model{	
    public $table_task = 'ph_schedule';

    public function save($data){
        return $this->db->insert($this->table_task, $data);
    }
    public function get(){
        return $this->db->get($this->table_task)->result();
    }

    public function delete($type){ 
        $this->db->where('sch_type', $type);
        $delete = $this->db->delete($this->table_task); 
        return $delete;
    }

    public function delete_id($id, $type){
        $this->db->where('sch_id', $id);
        $this->db->where('sch_type', $type);
        $delete = $this->db->delete($this->table_task); 
        return $delete;
    }
}
?>	