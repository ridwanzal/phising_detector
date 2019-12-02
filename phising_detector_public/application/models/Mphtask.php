
<?php
/* model for user logins*/
class Mphtask extends CI_Model{	
    public function save($data){
        return $this->db->insert('ph_task', $data);
    }
    public function get(){
        return $this->db->get('ph_task')->result();
    }

    public function delete(){
        return $this->db->empty_table('ph_task');
    }
}
?>	