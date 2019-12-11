
<?php
/* model for user logins*/
class Mphurl extends CI_Model{	
    public function save_batch($data){
        return $this->db->insert_batch('ph_url_info', $data);
    }
}
?>	