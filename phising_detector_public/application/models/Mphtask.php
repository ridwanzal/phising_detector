
<?php
/* model for user logins*/
class Mphtask extends CI_Model{	
    public $table_task = 'ph_task';

    public function save($data){
        return $this->db->insert($this->table_task, $data);
    }
    public function get(){
        return $this->db->get($this->table_task)->result();
    }

    public function delete(){
        return $this->db->empty_table($this->table_task);
    }

    public function delete_id($id){
        $this->db->where('task_id', $id);
        $delete = $this->db->delete($this->table_task); 
        return $delete;
    }
}
?>	