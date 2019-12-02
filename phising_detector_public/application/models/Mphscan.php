
<?php
/* model for user logins*/
class Mphscan extends CI_Model{	
    public function save_batch($data){
        return $this->db->insert_batch('ph_scan', $data);
    }
    
    
    public function get(){
        return $this->db->get('ph_scan')->result();
    }
}
?>	